// image-files.js - Guarda a imagem ORIGINAL de cada criativo para download em alta qualidade.
// O calendário continua usando a versão leve (dentro do post). O original vai, de preferência,
// para a hospedagem da Hostinger (files/upload.php, id "hst:AAAA/MM/arquivo"). Se a Hostinger
// não responder, fica no Firebase: marketing_image_files/{id} (dados do arquivo) e
// marketing_image_files/{id}/chunks/{n} (conteúdo em base64, em partes abaixo de 1 MB).
// Em qualquer dos dois, só é lido quando alguém clica em baixar.

(function () {
  const HOSTINGER_FILES = "https://marketing.saamauditoria.com.br/files/";
  const HOSTINGER_PREFIX = "hst:";
  let hostingerOffline = false; // depois de uma falha de conexão, usa o Firebase até recarregar a página

  const COLLECTION = "marketing_image_files";
  const CHUNK_SIZE = 900000; // caracteres base64 por documento
  const KEEP_ORIGINAL_UP_TO = 2.5 * 1024 * 1024; // até 2,5 MB guarda o arquivo exatamente como veio
  const MAX_SIDE = 2160; // acima disso, regrava em JPEG 92% com no máximo 2160 px no maior lado

  const blobToBase64 = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

  const loadImage = (blob) => new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Imagem inválida")); };
    img.src = url;
  });

  const canvasToBlob = (canvas, quality) => new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));

  // Arquivos grandes demais viram um JPEG de alta qualidade; os demais ficam intactos.
  async function prepareOriginal(file) {
    if (file.size <= KEEP_ORIGINAL_UP_TO) {
      return { blob: file, name: file.name || "imagem", type: file.type || "application/octet-stream", reencoded: false };
    }
    const img = await loadImage(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    let blob = null;
    for (const quality of [0.92, 0.88, 0.84, 0.8]) {
      blob = await canvasToBlob(canvas, quality);
      if (blob && blob.size <= KEEP_ORIGINAL_UP_TO * 1.6) break;
    }
    const base = (file.name || "imagem").replace(/\.[^.]+$/, "");
    return { blob, name: `${base}.jpg`, type: "image/jpeg", reencoded: true };
  }

  async function saveToHostinger(file, postId) {
    const body = new FormData();
    body.append("file", file, file.name || "imagem");
    body.append("name", file.name || "imagem");
    body.append("postId", String(postId));
    const response = await fetch(HOSTINGER_FILES + "upload.php", { method: "POST", body });
    if (!response.ok) {
      const error = new Error(`Hostinger respondeu ${response.status}`);
      error.status = response.status;
      throw error;
    }
    const data = await response.json();
    return HOSTINGER_PREFIX + data.id;
  }

  async function save(file, postId) {
    if (!hostingerOffline) {
      try {
        return await saveToHostinger(file, postId);
      } catch (error) {
        // Sem conexão ou página inexistente: a Hostinger ainda não está no ar.
        if (!error.status || error.status === 404) hostingerOffline = true;
        console.warn("Original não foi para a Hostinger; guardando no Firebase:", error);
      }
    }
    return saveToFirebase(file, postId);
  }

  async function saveToFirebase(file, postId) {
    const prepared = await prepareOriginal(file);
    const base64 = await blobToBase64(prepared.blob);
    const chunkCount = Math.max(1, Math.ceil(base64.length / CHUNK_SIZE));
    const id = `${postId}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const ref = window.db.collection(COLLECTION).doc(id);

    await Promise.all(Array.from({ length: chunkCount }, (_, index) =>
      ref.collection("chunks").doc(String(index)).set({ data: base64.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE) })
    ));
    // Os dados do arquivo só são gravados depois de todas as partes, então um arquivo listado está sempre completo.
    await ref.set({
      postId: String(postId),
      name: prepared.name,
      type: prepared.type,
      size: prepared.blob.size,
      originalSize: file.size,
      reencoded: prepared.reencoded,
      chunkCount,
      createdAt: Date.now(),
    });
    return id;
  }

  const isHostinger = (id) => typeof id === "string" && id.startsWith(HOSTINGER_PREFIX);
  const hostingerUrl = (id, inline = false) =>
    `${HOSTINGER_FILES}download.php?f=${encodeURIComponent(id.slice(HOSTINGER_PREFIX.length))}${inline ? "&inline=1" : ""}`;

  async function toBlob(id) {
    if (isHostinger(id)) {
      const response = await fetch(hostingerUrl(id));
      if (!response.ok) throw new Error("Arquivo original não encontrado");
      const match = /filename="([^"]+)"/.exec(response.headers.get("Content-Disposition") || "");
      return { blob: await response.blob(), name: match ? match[1] : "imagem" };
    }
    const ref = window.db.collection(COLLECTION).doc(id);
    const meta = await ref.get();
    if (!meta.exists) throw new Error("Arquivo original não encontrado");
    const info = meta.data();
    const chunks = await Promise.all(Array.from({ length: info.chunkCount }, (_, index) =>
      ref.collection("chunks").doc(String(index)).get()
    ));
    const base64 = chunks.map((chunk) => (chunk.exists ? chunk.data().data : "")).join("");
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
    return { blob: new Blob([bytes], { type: info.type }), name: info.name };
  }

  function triggerDownload(href, name) {
    const link = document.createElement("a");
    link.href = href;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  // Baixa o original; sem original (posts antigos ou imagem por link), baixa o que existir.
  async function download(source, fallbackName = "imagem-post.jpg") {
    if (source instanceof Blob) {
      const url = URL.createObjectURL(source);
      triggerDownload(url, source.name || fallbackName);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      return;
    }
    if (source && isHostinger(source.fileId)) {
      // A Hostinger já entrega como download, com o nome original (vem no cabeçalho da resposta).
      triggerDownload(hostingerUrl(source.fileId), "");
      return;
    }
    if (source && source.fileId) {
      try {
        if (typeof showToast === "function") showToast("Preparando a imagem original…", "success");
        const { blob, name } = await toBlob(source.fileId);
        const url = URL.createObjectURL(blob);
        triggerDownload(url, name);
        setTimeout(() => URL.revokeObjectURL(url), 10000);
        return;
      } catch (error) {
        console.warn("Original indisponível, baixando a versão salva:", error);
      }
    }
    const fallback = source && source.fallbackUrl;
    if (!fallback) return;
    if (fallback.startsWith("data:")) triggerDownload(fallback, fallbackName);
    else window.open(fallback, "_blank", "noopener"); // links externos (Drive, Canva) abrem na fonte
  }

  async function remove(id) {
    if (!id) return;
    if (isHostinger(id)) {
      try {
        const body = new FormData();
        body.append("f", id.slice(HOSTINGER_PREFIX.length));
        await fetch(HOSTINGER_FILES + "delete.php", { method: "POST", body });
      } catch (error) {
        console.warn("Não foi possível apagar o original antigo na Hostinger:", error);
      }
      return;
    }
    const ref = window.db.collection(COLLECTION).doc(id);
    try {
      const meta = await ref.get();
      const count = meta.exists ? meta.data().chunkCount : 0;
      await ref.delete();
      await Promise.all(Array.from({ length: count }, (_, index) => ref.collection("chunks").doc(String(index)).delete()));
    } catch (error) {
      console.warn("Não foi possível apagar o original antigo:", error);
    }
  }

  // Apaga os originais que o post deixou de usar (imagem trocada, slide removido, post excluído).
  function removeUnused(previousIds, currentIds) {
    const keep = new Set((currentIds || []).filter(Boolean));
    (previousIds || []).filter((id) => id && !keep.has(id)).forEach(remove);
  }

  window.ImageFiles = { save, download, remove, removeUnused, toBlob };
})();
