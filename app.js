const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// Navigation logic
const pageHome = document.getElementById("page-home");
const pageCalendario = document.getElementById("page-calendario");
const pageIdeias = document.getElementById("page-ideias");
const pageRotinas = document.getElementById("page-rotinas");
const pageCampanhas = document.getElementById("page-campanhas");
const pageExcelencia = document.getElementById("page-excelencia");
const pageColaboracao = document.getElementById("page-colaboracao");

const btnTabCalendario = document.getElementById("btn-tab-calendario");
const btnTabIdeias = document.getElementById("btn-tab-ideias");
const btnTabCampanhas = document.getElementById("btn-tab-campanhas");
const btnTabRotinas = document.getElementById("btn-tab-rotinas");
const btnTabExcelencia = document.getElementById("btn-tab-excelencia");
const btnTabColaboracao = document.getElementById("btn-tab-colaboracao");
const backBtns = document.querySelectorAll(".back-btn[data-target='home']");

function showPage(pageEl) {
  pageHome.classList.add("hidden");
  pageCalendario.classList.add("hidden");
  pageIdeias.classList.add("hidden");
  pageRotinas.classList.add("hidden");
  if(pageCampanhas) pageCampanhas.classList.add("hidden");
  if(pageExcelencia) pageExcelencia.classList.add("hidden");
  if(pageColaboracao) pageColaboracao.classList.add("hidden");
  const pId = document.getElementById("page-identidade");
  if(pId) pId.classList.add("hidden");
  pageEl.classList.remove("hidden");
}

btnTabCalendario.addEventListener("click", () => {
  requirePassword(() => {
    showPage(pageCalendario);
    renderCalendar();
    renderList();
  });
});

let pendingPasswordCallback = null;

function requirePassword(callback) {
  if (sessionStorage.getItem("saam_unlocked") === "true") {
    callback();
    return;
  }
  pendingPasswordCallback = callback;
  const modal = document.getElementById("password-modal");
  const input = document.getElementById("password-input");
  input.value = "";
  modal.style.display = "flex";
  setTimeout(() => input.focus(), 50);
}
window.requirePassword = requirePassword;

// Setup password modal listeners
setTimeout(() => {
  const pModal = document.getElementById("password-modal");
  const pBtnCancel = document.getElementById("password-cancel");
  const pBtnSubmit = document.getElementById("password-submit");
  const pInput = document.getElementById("password-input");

  if (pModal) {
    function submitPassword() {
      const pass = pInput.value;
      if (pass === "marketing@saam") {
        sessionStorage.setItem("saam_unlocked", "true");
        if (typeof showToast === 'function') {
          showToast('Acesso liberado!', 'success');
        }
        pModal.style.display = "none";
        if (pendingPasswordCallback) {
          pendingPasswordCallback();
          pendingPasswordCallback = null;
        }
      } else {
        if (typeof showToast === 'function') {
          showToast('Senha incorreta.', 'error');
        } else {
          alert("Senha incorreta.");
        }
        pInput.value = "";
        pInput.focus();
      }
    }

    pBtnCancel.addEventListener("click", () => {
      pModal.style.display = "none";
      pendingPasswordCallback = null;
    });

    pBtnSubmit.addEventListener("click", submitPassword);

    pInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        submitPassword();
      } else if (e.key === "Escape") {
        pModal.style.display = "none";
        pendingPasswordCallback = null;
      }
    });
  }
}, 100);

btnTabIdeias.addEventListener("click", () => {
  requirePassword(() => {
    showPage(pageIdeias);
  });
});

if (btnTabCampanhas) {
  btnTabCampanhas.addEventListener("click", () => {
    requirePassword(() => {
      showPage(pageCampanhas);
    });
  });
}

if (btnTabRotinas) {
  btnTabRotinas.addEventListener("click", () => {
    requirePassword(() => {
      showPage(pageRotinas);
      renderRoutinesList();
    });
  });
}

if (btnTabColaboracao) {
  btnTabColaboracao.addEventListener("click", () => {
    showPage(pageColaboracao);
    if(typeof renderSugestoes === 'function') renderSugestoes();
  });
}

const btnAddInternalComm = document.getElementById("btn-add-internal-comm");
if (btnAddInternalComm) {
  btnAddInternalComm.addEventListener("click", () => {
    const today = new Date();
    // Format YYYY-MM-DD local time
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    
    // openModal(post, prefilledDate, prefilledIdeaId, prefilledType)
    openModal(null, dateStr, "", "Interno");
  });
}

if (btnTabExcelencia) {
  btnTabExcelencia.addEventListener("click", () => {
    requirePassword(() => {
      showPage(pageExcelencia);
      if (typeof switchGuiaSection === 'function') {
        switchGuiaSection('capitulos');
      }
      if (typeof backToChapterIndex === 'function') {
        backToChapterIndex();
      }
      if (typeof loadCompetitors === 'function') {
        loadCompetitors();
      }
    });
  });
}
backBtns.forEach(btn => {
  btn.addEventListener("click", () => showPage(pageHome));
});

// Mock inicial de posts (Calendário Populado 2026 - O FUTURO DO FISCAL JÁ COMEÇOU)
let defaultPosts = [];

const specialDates = [
  {"id": 99001, "date": "2026-07-31", "tag": "Data Comemorativa", "title": "Aniversário de Anápolis", "destiny": "interno", "destinies": ["interno", "instagram"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99002, "date": "2026-08-09", "tag": "Data Comemorativa", "title": "Dia dos Pais", "destiny": "interno", "destinies": ["interno", "instagram"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99003, "date": "2026-08-18", "tag": "Data Comemorativa", "title": "Aniversário SISAUDCON", "destiny": "interno", "destinies": ["interno", "instagram"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99004, "date": "2026-08-18", "tag": "Data Comemorativa", "title": "Dia do Estagiário", "destiny": "interno", "destinies": ["interno"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99005, "date": "2026-09-01", "tag": "Data Comemorativa", "title": "Setembro Amarelo - Prevenção ao Suicídio", "destiny": "interno", "destinies": ["interno", "instagram"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99006, "date": "2026-09-09", "tag": "Data Comemorativa", "title": "Dia do Administrador", "destiny": "interno", "destinies": ["interno"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99007, "date": "2026-09-13", "tag": "Data Comemorativa", "title": "Dia Mundial do Programador", "destiny": "interno", "destinies": ["interno"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99008, "date": "2026-09-15", "tag": "Data Comemorativa", "title": "Dia do Cliente", "destiny": "interno", "destinies": ["interno", "instagram"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99009, "date": "2026-09-22", "tag": "Data Comemorativa", "title": "Dia do Contador", "destiny": "interno", "destinies": ["interno", "instagram", "cliente"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99010, "date": "2026-10-01", "tag": "Data Comemorativa", "title": "Outubro Rosa - Prevenção ao Câncer de Mama", "destiny": "interno", "destinies": ["interno", "instagram"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99011, "date": "2026-10-01", "tag": "Data Comemorativa", "title": "Dia do Vendedor", "destiny": "interno", "destinies": ["interno"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99012, "date": "2026-11-01", "tag": "Data Comemorativa", "title": "Novembro Azul - Prevenção ao Câncer de Prostata", "destiny": "interno", "destinies": ["interno", "instagram"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99013, "date": "2026-12-01", "tag": "Data Comemorativa", "title": "Dezembro Laranja - Prevenção ao Câncer de Pele", "destiny": "interno", "destinies": ["interno", "instagram"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99014, "date": "2026-12-25", "tag": "Data Comemorativa", "title": "Natal", "destiny": "interno", "destinies": ["interno", "instagram", "cliente"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99015, "date": "2026-12-31", "tag": "Data Comemorativa", "title": "Ano Novo", "destiny": "interno", "destinies": ["interno", "instagram", "cliente"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true},
  {"id": 99016, "date": "2026-08-31", "tag": "Data Comemorativa", "title": "Dia do Blog", "destiny": "interno", "destinies": ["interno", "blog"], "primaryDestiny": "interno", "status": "aprovado", "author": "Marketing", "format": "Lembrete", "commemorative": true}
];

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgnrSTxs_wdffNrJobhv6gw4yDUh4j7Mw",
  authDomain: "marketingmanager-d718d.firebaseapp.com",
  projectId: "marketingmanager-d718d",
  storageBucket: "marketingmanager-d718d.firebasestorage.app",
  messagingSenderId: "728211183091",
  appId: "1:728211183091:web:64aac4baae91ee64cb6e86",
  measurementId: "G-7HZ11LSRZC"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let posts = [];
let isLoadingCloud = true;

// FORCED RESET: Ensure exact special dates and purge duplicates
const specialTitles = [
  "Aniversário de Anápolis", "Dia dos Pais", "Aniversário SISAUDCON", 
  "Dia do Estagiário", "Setembro Amarelo", "Setembro Amarelo - Prevenção ao Suicídio",
  "Dia do Administrador", "Dia Mundial do Programador", "Dia do Cliente",
  "Dia do Contador", "Outubro Rosa", "Outubro Rosa - Prevenção ao Câncer de Mama",
  "Dia do Vendedor", "Novembro Azul", "Novembro Azul - Prevenção ao Câncer de Prostata",
  "Dezembro Laranja", "Dezembro Laranja - Prevenção ao Câncer de Pele", 
  "Natal", "Ano Novo", "Dia do Blog"
];

// 1. FAST LOCAL LOAD (Optimistic UI)
try {
  const saved = localStorage.getItem('saam_marketing_posts_v14');
  if (saved) {
    posts = JSON.parse(saved);
  } else {
    posts = [];
  }
} catch(e) {
  posts = [];
}

// FIX CORRUPTED COMMEMORATIVE POSTS
let corruptedFixed = false;
posts.forEach(p => {
  if (specialTitles.includes(p.title) && !p.commemorative) {
    p.commemorative = true;
    corruptedFixed = true;
  }
});
if (corruptedFixed) {
  localStorage.setItem('saam_marketing_posts_v14', JSON.stringify(posts));
}

// Add missing special dates without wiping existing ones
specialDates.forEach(sd => {
  if (!posts.find(p => p.id === sd.id || (p.title === sd.title && p.date === sd.date))) {
    posts.push(sd);
  }
});

// 2. REAL-TIME CLOUD SYNC
function initCloudSync() {
  const postsRef = db.collection("marketing_posts");
  
  // Migration logic (run once)
  const oldDocRef = db.collection("marketing").doc("calendar");
  oldDocRef.get().then(docSnap => {
    if (docSnap.exists) {
      const oldPosts = docSnap.data().posts || [];
      const batch = db.batch();
      oldPosts.forEach(p => {
        batch.set(postsRef.doc(p.id.toString()), p);
      });
      batch.commit().then(() => {
        oldDocRef.delete();
      });
    }
  });

  postsRef.onSnapshot((snapshot) => {
    const cloudPosts = [];
    snapshot.forEach(doc => cloudPosts.push(doc.data()));
    
    posts = cloudPosts;
    
    // FIX CORRUPTED COMMEMORATIVE POSTS
    posts.forEach(p => {
      if (specialTitles.includes(p.title) && !p.commemorative) {
        p.commemorative = true;
      }
    });

    specialDates.forEach(sd => {
      if (!posts.find(p => p.id === sd.id || (p.title === sd.title && p.date === sd.date))) {
        posts.push(sd);
        postsRef.doc(sd.id.toString()).set(sd);
      }
    });
    
    localStorage.setItem('saam_marketing_posts_v14', JSON.stringify(posts));
    
    renderCalendar();
    renderList();
  }, (error) => {
    console.error("Firebase sync error", error);
  });
}

async function savePostToCloud(post) {
  try {
    localStorage.setItem('saam_marketing_posts_v14', JSON.stringify(posts));
    if (typeof showToast === 'function') {
      showToast('Salvando...', 'success');
    }
    await db.collection("marketing_posts").doc(post.id.toString()).set(post);
  } catch(e) {
    console.error('Erro ao salvar post na nuvem:', e);
    if (typeof showToast === 'function') {
      showToast('Erro ao salvar na nuvem.', 'error');
    }
  }
}

async function deletePostFromCloud(id) {
  try {
    localStorage.setItem('saam_marketing_posts_v14', JSON.stringify(posts));
    await db.collection("marketing_posts").doc(id.toString()).delete();
  } catch(e) {
    console.error('Erro ao excluir post na nuvem:', e);
  }
}

let currentDate = new Date(2026, 7, 1); // Agosto 2026

const calendarDaysEl = document.getElementById("calendar-days");
const currentMonthYearEl = document.getElementById("current-month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

const modal = document.getElementById("edit-modal");
const btnAdd = document.getElementById("btn-add");
const btnCancel = document.getElementById("btn-cancel");
const btnCloseModal = document.getElementById("close-modal-top");
const form = document.getElementById("post-form");
const postListEl = document.getElementById("post-list");

// Ordem dos status para troca rápida
const statusCycle = ["rascunho", "analise", "aprovado", "agendado", "publicado"];

// Filter elements
const searchInput = document.getElementById("search");
const filterDestiny = document.getElementById("filter-destiny");
const filterIdea = document.getElementById("filter-idea");

function isEditorial(p) {
  if (p.commemorative) return true;
  const dests = Array.isArray(p.destinies) && p.destinies.length > 0 ? p.destinies : (p.destiny ? [p.destiny] : []);
  if (dests.length === 0) return true;
  return !dests.every(d => d === "interno" || d === "cliente");
}

function getFilteredPosts() {
  let filtered = posts.filter(isEditorial);
  const term = searchInput ? searchInput.value.toLowerCase() : "";
  const destiny = filterDestiny ? filterDestiny.value : "";
  const idea = filterIdea ? filterIdea.value : "";
  
  if (term) {
    filtered = filtered.filter(p => p.tag.toLowerCase().includes(term) || (p.caption && p.caption.toLowerCase().includes(term)));
  }
  if (destiny) {
    filtered = filtered.filter(p => {
      if (destiny === "ambos") return true;
      // Check new destinies array first, fallback to old destiny string
      const dests = Array.isArray(p.destinies) ? p.destinies : (p.destiny ? [p.destiny] : []);
      return dests.includes(destiny) || p.destiny === "ambos";
    });
  }
  if (idea) {
    filtered = filtered.filter(p => p.ideaId == idea);
  }
  return filtered;
}

[searchInput, filterDestiny, filterIdea].forEach(el => {
  if (el) {
    el.addEventListener("input", () => {
      renderCalendar();
      renderList();
    });
    el.addEventListener("change", () => {
      renderCalendar();
      renderList();
    });
  }
});

function renderCalendar() {
  if(typeof renderSeasonBanner === 'function') renderSeasonBanner();
  if(typeof renderIdeasStrategy === 'function') renderIdeasStrategy();
  calendarDaysEl.innerHTML = "";
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  currentMonthYearEl.textContent = `${monthNames[month]} ${year}`;
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-day empty-day";
    calendarDaysEl.appendChild(emptyCell);
  }
  
  const today = new Date();
  const editorialCount = posts.filter(isEditorial).length;
  document.getElementById("menu-stat-criativos").textContent = `${editorialCount} criativos`;
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.className = "calendar-day";
    
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      dayCell.classList.add("today");
    }
    
    const dayDateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const filteredPosts = getFilteredPosts();
    const dayPosts = filteredPosts.filter(p => p.date === dayDateString);
    
    if (dayPosts.length > 0) {
      dayCell.classList.add("has-post");
      const tag = dayPosts[0].tag;
      if (tag === "Radar Fiscal") dayCell.classList.add("bg-radar-fiscal");
      else if (tag === "Erro que custa caro") dayCell.classList.add("bg-erro-caro");
      else if (tag === "Fiscal ou Ficção") dayCell.classList.add("bg-ficcao");
      else if (tag === "Inteligência Fiscal") dayCell.classList.add("bg-inteligencia");
      else if (tag === "Você Sabia?") dayCell.classList.add("bg-voce-sabia");
      else if (tag === "Por Dentro do SAAM") dayCell.classList.add("bg-por-dentro");
      else dayCell.classList.add("bg-posicionamento"); // Fallback
    }
    
    const dayNumber = document.createElement("div");
    dayNumber.className = "day-number";
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);
    
    if (dayPosts.length > 0) {
      // Sort so commemorative posts come first
      dayPosts.sort((a, b) => (b.commemorative ? 1 : 0) - (a.commemorative ? 1 : 0));
      
      const post = dayPosts[0];
      const card = createPostCard(post);
      dayCell.appendChild(card);
    }
    
    dayCell.addEventListener("click", (e) => {
      // Se clicou na bolinha de status, não abre o modal
      if (e.target.classList.contains("status-dot") || e.target.closest(".quick-status-menu")) return;
      
      if (dayPosts.length > 0) openModal(dayPosts[0]);
      else openModal(null, dayDateString);
    });
    
    calendarDaysEl.appendChild(dayCell);
  }
}

function createPostCard(post) {
  const card = document.createElement("div");
  card.className = "post-card";
  
  const imgUrl = post.image || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' style='background:%23F8FAFC;'><rect width='400' height='400' fill='%23F8FAFC'/><path d='M150 250l30-40 40 50 60-80 50 100H100z' fill='%23E2E8F0'/><circle cx='160' cy='160' r='20' fill='%23E2E8F0'/></svg>";

  let iconSvg = '';
  if(post.destiny === 'WhatsApp') {
    iconSvg = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;
  } else if(post.destiny === 'YouTube') {
    iconSvg = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`;
  } else if(post.destiny === 'Blog') {
    iconSvg = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`;
  } else { 
    iconSvg = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`;
  }

  let destinyBadge = '';
  const destinyLabel = post.destiny || '';
  // Support both single string and array of destinies
  const destinyArr = Array.isArray(post.destinies) ? post.destinies : (destinyLabel ? [destinyLabel] : []);
  const primaryDest = post.primaryDestiny || destinyArr[0] || destinyLabel || '';

  const destinyColors = {
    'insta-feed': { bg: 'linear-gradient(135deg,#F56040,#C13584)', label: 'INSTA FEED' },
    'insta-story': { bg: 'linear-gradient(135deg,#C13584,#833AB4)', label: 'INSTA STORY' },
    'instagram': { bg: 'linear-gradient(135deg,#F56040,#C13584)', label: 'INSTA FEED' },
    'linkedin': { bg: '#0A66C2', label: 'LINKEDIN' },
    'interno': { bg: '#26428B', label: 'INTERNO / CLIENTE' },
    'blog': { bg: '#F59E0B', label: 'BLOG' },
    'cliente': { bg: '#26428B', label: 'INTERNO / CLIENTE' },
  };

  if (destinyArr.length > 0) {
    const badges = destinyArr.map(d => {
      const cfg = destinyColors[d] || destinyColors['instagram'];
      const isPrimary = d === primaryDest;
      const star = isPrimary ? '⭐ ' : '';
      const bgStyle = cfg.bg.includes('gradient') ? `background:${cfg.bg}` : `background:${cfg.bg}`;
      return `<span style="display:inline-block;${bgStyle};color:#fff;font-size:8px;font-weight:800;padding:2px 6px;border-radius:8px;letter-spacing:0.04em;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.2);${isPrimary ? 'border:1px solid #FCD34D;' : ''}">${star}${cfg.label}</span>`;
    });
    destinyBadge = `<div style="position:absolute;top:6px;left:50%;transform:translateX(-50%);z-index:11;display:flex;gap:3px;flex-wrap:wrap;justify-content:center;max-width:95%;">${badges.join('')}</div>`;
  } else {
    // Fallback for old posts with single destiny string
    const cfg = destinyColors[destinyLabel] || destinyColors['instagram'];
    const bgStyle = cfg.bg.includes('gradient') ? `background:${cfg.bg}` : `background:${cfg.bg}`;
    destinyBadge = `<span style="position:absolute;top:8px;left:50%;transform:translateX(-50%);z-index:11;${bgStyle};color:#fff;font-size:9px;font-weight:800;padding:2px 8px;border-radius:10px;letter-spacing:0.04em;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.25);">${cfg.label}</span>`;
  }

  let cardHTML = ``;
  if (post.commemorative && !post.image) {
    cardHTML = `
      <div class="post-card-image" style="background: linear-gradient(135deg, #E11D48 0%, #9F1239 100%); display: flex; align-items: center; justify-content: center; height: 100%; border: 2px solid #FCD34D; box-shadow: inset 0 0 0 2px #E11D48, 0 0 10px rgba(245, 158, 11, 0.4); box-sizing: border-box;">
        <h4 style="color: #FFF; font-size: 14px; font-weight: 800; text-align: center; margin: 0 10px; z-index: 1;">📅 ${post.title}</h4>
        <div class="status-dot status-${post.status}" title="Clique para avançar status" data-post-id="${post.id}"></div>
        <div class="post-card-info" style="display: flex; align-items: center; justify-content: center; width: 100%;">
          <span class="post-tag" style="background: #FFF; color: #E11D48; border: 1px solid #FFF;">${iconSvg}DATA COMEMORATIVA</span>
        </div>
      </div>
    `;
  } else {
    cardHTML = `
      <div class="post-card-image">
        <img src="${imgUrl}" alt="${post.tag}">
        ${destinyBadge}
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.85) 100%); pointer-events: none; border-radius: 8px;"></div>
        <h4 style="position: absolute; bottom: 26px; left: 6px; right: 6px; color: #FFF; font-size: 12px; font-weight: 700; text-align: left; margin: 0; z-index: 2; text-shadow: 0 1px 3px rgba(0,0,0,0.9); line-height: 1.25; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${post.title || post.tag}</h4>

        <div class="status-dot status-${post.status}" title="Clique para avançar status" data-post-id="${post.id}"></div>
        <div class="post-card-info" style="display: flex; align-items: center; z-index: 2; position: relative;">
          <span class="post-tag" style="display: flex; align-items: center;">${iconSvg}${post.tag}</span>
        </div>
      </div>
    `;
  }

  card.innerHTML = cardHTML;
  
  const dot = card.querySelector(".status-dot");
  dot.addEventListener("click", (e) => {
    e.stopPropagation();
    if (sessionStorage.getItem("saam_unlocked") !== "true") {
      requirePassword(() => {
        let idx = statusCycle.indexOf(post.status);
        let nextStatus = statusCycle[(idx + 1) % statusCycle.length];
        post.status = nextStatus;
        savePostToCloud(post);
        renderCalendar();
        renderList();
      });
      return;
    }
    let idx = statusCycle.indexOf(post.status);
    let nextStatus = statusCycle[(idx + 1) % statusCycle.length];
    post.status = nextStatus;
    savePostToCloud(post);
    renderCalendar();
    renderList();
  });
  
  return card;
}

function getStatusName(status) {
  const map = {
    rascunho: "Rascunho",
    analise: "Em Análise",
    aprovado: "Aprovado",
    agendado: "Agendado",
    publicado: "Publicado"
  };
  return map[status] || status;
}

function renderList() {
  postListEl.innerHTML = "";
  
  let currentPosts = getFilteredPosts();
  // Filter list by the currently viewed month!
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  currentPosts = currentPosts.filter(p => {
    const d = new Date(p.date + "T00:00:00");
    return d.getMonth() === month && d.getFullYear() === year;
  });
  
  const sortedPosts = currentPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  if (sortedPosts.length === 0) {
    postListEl.innerHTML = "<p class='placeholder-text'>Nenhum criativo cadastrado para este mês.</p>";
    return;
  }
  
  let currentWeekGroup = "";
  let lastRenderedDate = "";
  
  function getWeekName(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    const m = d.getMonth();
    const y = d.getFullYear();
    const day = d.getDate();
    
    if(m === 7 && y === 2026) { // AGOSTO
      if(day >= 1 && day <= 9) return "Semana 1";
      if(day >= 10 && day <= 16) return "Semana 2";
      if(day >= 17 && day <= 23) return "Semana 3";
      if(day >= 24 && day <= 31) return "Semana 4";
    }
    if(m === 8 && y === 2026) { // SETEMBRO
      if(day >= 1 && day <= 6) return "Semana 1";
      if(day >= 7 && day <= 13) return "Semana 2";
      if(day >= 14 && day <= 20) return "Semana 3";
      if(day >= 21 && day <= 30) return "Semana 4";
    }
    return "Outros";
  }
  
  sortedPosts.forEach(post => {
    const d = new Date(post.date + "T00:00:00");
    
    const weekGroup = getWeekName(post.date);
    if (weekGroup !== currentWeekGroup) {
      currentWeekGroup = weekGroup;
      
      const themeColor = d.getMonth() === 8 ? "#059669" : "#26428B";
      
      const header = document.createElement("div");
      header.className = "list-month-header";
      header.style = `background: #F8FAFC; color: #1E293B; padding: 12px 16px; margin: 24px 0 12px 0; border-radius: 8px; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; border-left: 4px solid ${themeColor}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);`;
      header.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${themeColor}" stroke-width="2.5" style="margin-right: 8px;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> ${currentWeekGroup}`;
      postListEl.appendChild(header);
    }
    
    const imgUrl = post.image || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' style='background:%23F8FAFC;'><rect width='400' height='400' fill='%23F8FAFC'/><path d='M150 250l30-40 40 50 60-80 50 100H100z' fill='%23E2E8F0'/><circle cx='160' cy='160' r='20' fill='%23E2E8F0'/></svg>";
    const dayStr = String(d.getDate()).padStart(2,"0");
    const weekDay = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][d.getDay()];

    let iconSvg = '';
    if(post.destiny === 'WhatsApp') {
      iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;
    } else if(post.destiny === 'YouTube') {
      iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`;
    } else if(post.destiny === 'Blog') {
      iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`;
    } else { 
      iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`;
    }

    const isSameDate = post.date === lastRenderedDate;
    lastRenderedDate = post.date;

    if (!isSameDate || !window.currentDayGroupEl) {
      window.currentDayGroupEl = document.createElement("div");
      window.currentDayGroupEl.className = "day-group";
      window.currentDayGroupEl.style = "display: flex; align-items: stretch; margin-bottom: 12px;";
      
      window.currentDayGroupEl.innerHTML = `
        <div class="list-date-block" style="padding-top: 16px; margin-right: 12px; border: none; padding-right: 0;">
          <span class="day">${dayStr}</span>
          <span class="weekday">${weekDay}</span>
        </div>
        <div class="day-posts" style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px;"></div>
      `;
      postListEl.appendChild(window.currentDayGroupEl);
    }

    const item = document.createElement("div");
    item.className = "list-item";
    item.style.marginBottom = "0"; // Override margin
    item.innerHTML = `
      <img src="${imgUrl}" class="list-item-thumb">
      <div class="list-item-content">
        <h4 class="list-item-title" style="display: flex; align-items: center;">${iconSvg}${post.title || post.tag}</h4>
        <p class="list-item-caption">${post.caption || "Sem legenda..."}</p>
      </div>
      <div class="list-item-actions">
        <select class="list-status-select status-${post.status}">
          <option value="rascunho" ${post.status==='rascunho'?'selected':''}>Rascunho</option>
          <option value="analise" ${post.status==='analise'?'selected':''}>Em Análise</option>
          <option value="aprovado" ${post.status==='aprovado'?'selected':''}>Aprovado</option>
          <option value="agendado" ${post.status==='agendado'?'selected':''}>Agendado</option>
          <option value="publicado" ${post.status==='publicado'?'selected':''}>Publicado</option>
        </select>
      </div>
    `;
    
    const selectBox = item.querySelector(".list-status-select");
    selectBox.addEventListener("click", (e) => e.stopPropagation());
    selectBox.addEventListener("change", (e) => {
      post.status = e.target.value;
      selectBox.className = `list-status-select status-${e.target.value}`;
      renderCalendar();
    });

    item.addEventListener("click", () => openModal(post));
    window.currentDayGroupEl.querySelector('.day-posts').appendChild(item);
  });
  renderInternalComms();
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
  renderList();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
  renderList();
});

const commsPrevBtn = document.getElementById("comms-prev-month");
if(commsPrevBtn) {
  commsPrevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    renderList();
  });
}

const commsNextBtn = document.getElementById("comms-next-month");
if(commsNextBtn) {
  commsNextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    renderList();
  });
}

function renderInternalComms() {
  const commsListEl = document.getElementById("comms-list");
  const monthLabelEl = document.getElementById("comms-month-label");
  if (!commsListEl || !monthLabelEl) return;

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  monthLabelEl.textContent = `${monthNames[month]} ${year}`;

  commsListEl.innerHTML = "";

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekNamesShort = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

  let hasSlots = false;

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const dayOfWeek = dateObj.getDay();

    if (dayOfWeek === 2 || dayOfWeek === 4) { // Terça (2) ou Quinta (4)
      hasSlots = true;
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayStr = String(d).padStart(2, '0');
      const weekDay = weekNamesShort[dayOfWeek];

      const commPosts = posts.filter(p => {
        if (p.date !== dateStr) return false;
        if (p.commemorative) return false;
        return p.destiny === "interno" || (p.destinies && p.destinies.includes("interno")) || p.primaryDestiny === "interno";
      });

      if (commPosts.length > 0) {
        const dayGroupEl = document.createElement("div");
        dayGroupEl.className = "day-group";
        dayGroupEl.style = "display: flex; align-items: stretch; margin-bottom: 12px;";
        dayGroupEl.innerHTML = `
          <div class="list-date-block" style="padding-top: 16px; margin-right: 12px; border: none; padding-right: 0;">
            <span class="day">${dayStr}</span>
            <span class="weekday">${weekDay}</span>
          </div>
          <div class="day-posts" style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px;"></div>
        `;
        commsListEl.appendChild(dayGroupEl);
        const postsContainer = dayGroupEl.querySelector('.day-posts');

        commPosts.forEach(post => {
          const imgUrl = post.image || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' style='background:%23F8FAFC;'><rect width='400' height='400' fill='%23F8FAFC'/><path d='M150 250l30-40 40 50 60-80 50 100H100z' fill='%23E2E8F0'/><circle cx='160' cy='160' r='20' fill='%23E2E8F0'/></svg>";
          const iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
          
          const item = document.createElement("div");
          item.className = "list-item";
          item.style.marginBottom = "0";
          item.innerHTML = `
            <img src="${imgUrl}" class="list-item-thumb">
            <div class="list-item-content">
              <h4 class="list-item-title" style="display: flex; align-items: center;">${iconSvg}${post.title || post.tag}</h4>
              <p class="list-item-caption">${post.caption || "Sem legenda..."}</p>
            </div>
            <div class="list-item-actions">
              <select class="list-status-select status-${post.status}">
                <option value="rascunho" ${post.status==='rascunho'?'selected':''}>Rascunho</option>
                <option value="analise" ${post.status==='analise'?'selected':''}>Em Análise</option>
                <option value="aprovado" ${post.status==='aprovado'?'selected':''}>Aprovado</option>
                <option value="agendado" ${post.status==='agendado'?'selected':''}>Agendado</option>
                <option value="publicado" ${post.status==='publicado'?'selected':''}>Publicado</option>
              </select>
            </div>
          `;

          const selectBox = item.querySelector(".list-status-select");
          selectBox.addEventListener("click", (e) => e.stopPropagation());
          selectBox.addEventListener("change", (e) => {
            post.status = e.target.value;
            selectBox.className = `list-status-select status-${e.target.value}`;
            savePostToCloud(post);
            renderCalendar();
            renderList();
          });

          item.addEventListener("click", () => openModal(post));
          postsContainer.appendChild(item);
        });
      } else {
        const dayGroupEl = document.createElement("div");
        dayGroupEl.className = "day-group";
        dayGroupEl.style = "display: flex; align-items: stretch; margin-bottom: 12px;";
        dayGroupEl.innerHTML = `
          <div class="list-date-block" style="padding-top: 16px; margin-right: 12px; border: none; padding-right: 0;">
            <span class="day">${dayStr}</span>
            <span class="weekday">${weekDay}</span>
          </div>
          <div class="day-posts" style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px;"></div>
        `;
        commsListEl.appendChild(dayGroupEl);
        const postsContainer = dayGroupEl.querySelector('.day-posts');

        const item = document.createElement("div");
        item.className = "list-item";
        item.style.marginBottom = "0";
        item.style.opacity = "0.7";
        item.style.borderStyle = "dashed";
        item.innerHTML = `
          <div class="list-item-thumb" style="background: #F1F5F9; display: flex; align-items: center; justify-content: center;">
            <svg width="24" height="24" fill="none" stroke="#94A3B8" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <div class="list-item-content">
            <h4 class="list-item-title" style="color: #64748B;">Espaço disponível</h4>
            <p class="list-item-caption">Nenhuma comunicação interna programada.</p>
          </div>
          <div class="list-item-actions">
            <span style="font-size: 12px; font-weight: 800; color: #26428B; text-transform: uppercase; padding: 6px 12px; background: rgba(38,66,139,0.1); border-radius: 6px;">Planejar</span>
          </div>
        `;
        item.addEventListener("click", () => {
          openModal({
            date: dateStr,
            destinies: ['interno'],
            primaryDestiny: 'interno',
            status: 'rascunho'
          });
        });
        postsContainer.appendChild(item);
      }
    }
  }

  if (!hasSlots) {
    commsListEl.innerHTML = "<p class='placeholder-text'>Nenhuma terça ou quinta neste período.</p>";
  }
}

/* Modal Logic */
function openModal(post = null, prefilledDate = "", prefilledIdeaId = "", prefilledType = "") {
  if (sessionStorage.getItem("saam_unlocked") !== "true") {
    requirePassword(() => openModal(post, prefilledDate, prefilledIdeaId, prefilledType));
    return;
  }
  form.reset();
  
  populateTopicSelect();

  if (post) {
    document.getElementById("modal-title").textContent = "Editar Criativo";
    document.getElementById("post-id").value = post.id;
    document.getElementById("post-date").value = post.date;
    document.getElementById("post-tag").value = post.tag || "";
    document.getElementById("post-image-data").value = post.image || "";
    document.getElementById("post-image-file").value = "";
    
    const uploadPreview = document.getElementById("upload-preview");
    const uploadPlaceholder = document.getElementById("upload-placeholder");
    const btnDownload = document.getElementById("btn-download-image");
    if (post.image) {
      uploadPreview.src = post.image;
      uploadPreview.classList.remove("hidden");
      uploadPlaceholder.classList.add("hidden");
      if (btnDownload) {
        btnDownload.href = post.image;
        btnDownload.classList.remove("hidden");
      }
    } else {
      uploadPreview.src = "";
      uploadPreview.classList.add("hidden");
      uploadPlaceholder.classList.remove("hidden");
      if (btnDownload) btnDownload.classList.add("hidden");
    }
    
    document.getElementById("post-briefing").value = post.briefing || generateMiniBriefing(post.tag);
    document.getElementById("post-caption").value = post.caption || "";
    document.getElementById("post-author").value = post.author || "";
    document.getElementById("post-comments").value = post.comments || "";
    
    // Set topic
    const topicEl = document.getElementById("post-topic");
    if(topicEl) topicEl.value = post.topic || "";
    
    // Populate and set idea
    populateIdeaSelect();
    populateRoutineSelect();
    document.getElementById("post-idea-link").value = post.ideaId || "";
    document.getElementById("post-routine-link").value = post.routineId || "";
    // Set destinies (multi-select checkboxes)
    const allDestinyCheckboxes = form.querySelectorAll('input[name="post_destiny"]');
    allDestinyCheckboxes.forEach(cb => cb.checked = false);
    const destArr = Array.isArray(post.destinies) ? post.destinies : (post.destiny ? [post.destiny] : []);
    destArr.forEach(d => {
      const cb = form.querySelector(`input[name="post_destiny"][value="${d}"]`);
      if (cb) cb.checked = true;
    });
    const primaryDestEl = document.getElementById("post-primary-destiny");
    if (primaryDestEl) primaryDestEl.value = post.primaryDestiny || destArr[0] || '';
    updateDestinyChipVisuals();
    
    const statusRadio = form.querySelector(`input[name="post_status"][value="${post.status}"]`);
    if(statusRadio) statusRadio.checked = true;

    const btnDelete = document.getElementById("btn-delete");
    if(btnDelete) btnDelete.style.display = "block";

    // Toggle fields based on Internal Comms
    const isInternal = destArr.includes('interno');
    document.getElementById("field-topic").style.display = isInternal ? "none" : "block";
    document.getElementById("field-briefing").style.display = isInternal ? "none" : "block";
    document.getElementById("field-destiny").style.display = isInternal ? "none" : "block";
    document.getElementById("field-author").style.display = isInternal ? "none" : "block";
    document.getElementById("field-comments").style.display = isInternal ? "none" : "block";
    const qaContainer = document.getElementById("field-approval-actions");
    if(qaContainer) qaContainer.style.display = isInternal ? "none" : "flex";
    
    document.getElementById("post-author").required = !isInternal;

  } else {
    document.getElementById("modal-title").textContent = "Novo Criativo";
    document.getElementById("post-id").value = "";
    document.getElementById("post-image-data").value = "";
    document.getElementById("post-image-file").value = "";
    document.getElementById("upload-preview").src = "";
    document.getElementById("upload-preview").classList.add("hidden");
    document.getElementById("upload-placeholder").classList.remove("hidden");
    const btnDownload = document.getElementById("btn-download-image");
    if (btnDownload) btnDownload.classList.add("hidden");
    populateIdeaSelect();
    populateRoutineSelect();
    document.getElementById("post-idea-link").value = prefilledIdeaId || "";
    document.getElementById("post-routine-link").value = "";
    if (prefilledDate) {
      document.getElementById("post-date").value = prefilledDate;
      autoSuggestSeries(prefilledDate);
    }
    
    const btnDelete = document.getElementById("btn-delete");
    if(btnDelete) btnDelete.style.display = "none";

    const isInternal = prefilledType === 'Interno';
    
    const allDestinyCheckboxes = form.querySelectorAll('input[name="post_destiny"]');
    allDestinyCheckboxes.forEach(cb => cb.checked = false);
    if (isInternal) {
      const cb = form.querySelector('input[name="post_destiny"][value="interno"]');
      if (cb) cb.checked = true;
      const primaryDestEl = document.getElementById("post-primary-destiny");
      if (primaryDestEl) primaryDestEl.value = 'interno';
    }
    if (typeof updateDestinyChipVisuals === 'function') updateDestinyChipVisuals();

    document.getElementById("field-topic").style.display = isInternal ? "none" : "block";
    document.getElementById("field-briefing").style.display = isInternal ? "none" : "block";
    document.getElementById("field-destiny").style.display = isInternal ? "none" : "block";
    document.getElementById("field-author").style.display = isInternal ? "none" : "block";
    document.getElementById("field-comments").style.display = isInternal ? "none" : "block";
    const qaContainer = document.getElementById("field-approval-actions");
    if(qaContainer) qaContainer.style.display = isInternal ? "none" : "flex";
    
    document.getElementById("post-author").required = !isInternal;
  }
  modal.classList.remove("hidden");
}

function autoSuggestSeries(dateString) {
  if(!dateString) return;
  // dateString is YYYY-MM-DD
  // Parse with local timezone to avoid shift
  const [year, month, day] = dateString.split("-");
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = dateObj.getDay(); // 0 = Sun, 1 = Mon ...
  
  let suggested = "";
  switch(dayOfWeek) {
    case 1: suggested = "Radar Fiscal SAAM"; break;
    case 2: suggested = "Raio-X do Fiscal"; break;
    case 3: suggested = "Erro que Custa Caro"; break;
    case 4: suggested = "Por Dentro do SAAM"; break;
    case 5: suggested = "Fiscal ou Ficção?"; break;
  }
  
  if(suggested) {
    document.getElementById("post-tag").value = suggested;
  }
}

document.getElementById("post-date").addEventListener("change", (e) => {
  // Only auto-suggest if it's a new post (no ID) to not override existing edits blindly
  if (!document.getElementById("post-id").value) {
    autoSuggestSeries(e.target.value);
  }
});

function populateIdeaSelect() {
  const select = document.getElementById("post-idea-link");
  const filter = document.getElementById("filter-idea");
  
  let optionsHtml = '<option value="">-- Nenhuma ideia vinculada --</option>';
  if (window.ideasData) {
    const grouped = {};
    window.ideasData.forEach(idea => {
      if (!grouped[idea.theme]) grouped[idea.theme] = [];
      grouped[idea.theme].push(idea);
    });
    
    for (const theme in grouped) {
      optionsHtml += `<optgroup label="${theme}">`;
      grouped[theme].forEach(idea => {
        optionsHtml += `<option value="${idea.id}">${idea.tag}: ${idea.title}</option>`;
      });
      optionsHtml += `</optgroup>`;
    }
  }
  
  if(select) select.innerHTML = optionsHtml;
  if(filter) filter.innerHTML = '<option value="">Todas as Ideias</option>' + optionsHtml.replace('<option value="">-- Nenhuma ideia vinculada --</option>', '');
}

function populateTopicSelect() {
  const select = document.getElementById("post-topic");
  if(!select) return;
  
  let html = '<option value="">-- Selecione um tópico --</option>';
  if (typeof routines !== 'undefined') {
    routines.forEach(r => {
      html += `<option value="${r.area}">${r.area}</option>`;
    });
  }
  select.innerHTML = html;
}

// When topic changes, auto-fill briefing suggestions
const postTopicEl = document.getElementById('post-topic');
if (postTopicEl) {
  postTopicEl.addEventListener('change', function() {
    const topic = this.value;
    if (!topic) return;
    const briefingEl = document.getElementById('post-briefing');
    if (briefingEl && !briefingEl.value.trim()) {
      if (typeof routines !== 'undefined') {
        const area = routines.find(r => r.area === topic);
        if (area && area.items && area.items.length > 0) {
          const firstRoutine = area.items[0];
          briefingEl.value = `Referência: ${firstRoutine.name}\n\nO que destacar:\n- ${firstRoutine.otimiza}`;
        }
      }
    }
  });
}

function closeModal() {
  modal.classList.add("hidden");
}

btnAdd.addEventListener("click", () => openModal());
btnCancel.addEventListener("click", closeModal);
btnCloseModal.addEventListener("click", closeModal);

// --- Multi-Destiny: double-click to set primary, visual update ---
function updateDestinyChipVisuals() {
  const primaryVal = document.getElementById("post-primary-destiny").value;
  document.querySelectorAll('.destiny-chip').forEach(chip => {
    const destVal = chip.getAttribute('data-destiny');
    const cb = chip.querySelector('input[type="checkbox"]');
    // Remove previous star
    const existingStar = chip.querySelector('.primary-star');
    if (existingStar) existingStar.remove();
    
    if (destVal === primaryVal && cb && cb.checked) {
      chip.style.boxShadow = '0 0 0 2px #F59E0B, 0 2px 8px rgba(245,158,11,0.3)';
      chip.style.borderColor = '#F59E0B';
      const star = document.createElement('span');
      star.className = 'primary-star';
      star.textContent = '⭐';
      star.style.cssText = 'margin-left: 4px; font-size: 11px;';
      chip.querySelector('span').appendChild(star);
    } else {
      chip.style.boxShadow = '';
      chip.style.borderColor = '';
    }
  });
}

// Double-click on a destiny chip sets it as primary
document.querySelectorAll('.destiny-chip').forEach(chip => {
  chip.addEventListener('dblclick', (e) => {
    e.preventDefault();
    const destVal = chip.getAttribute('data-destiny');
    const cb = chip.querySelector('input[type="checkbox"]');
    // Ensure it's checked
    if (cb && !cb.checked) cb.checked = true;
    document.getElementById("post-primary-destiny").value = destVal;
    updateDestinyChipVisuals();
  });
  // Also update visuals on regular click (checkbox change)
  const cb = chip.querySelector('input[type="checkbox"]');
  if (cb) {
    cb.addEventListener('change', () => {
      const primaryEl = document.getElementById("post-primary-destiny");
      const allChecked = Array.from(form.querySelectorAll('input[name="post_destiny"]:checked')).map(c => c.value);
      // If primary was unchecked, reassign to first checked
      if (!allChecked.includes(primaryEl.value)) {
        primaryEl.value = allChecked[0] || '';
      }
      // If nothing was primary yet, set first checked
      if (!primaryEl.value && allChecked.length > 0) {
        primaryEl.value = allChecked[0];
      }
      updateDestinyChipVisuals();
    });
  }
});

const btnDelete = document.getElementById("btn-delete");
if(btnDelete) {
  btnDelete.addEventListener("click", () => {
    const idVal = document.getElementById("post-id").value;
    if(idVal) {
      if(confirm("Tem certeza que deseja excluir esta publicação?")) {
        const idInt = parseInt(idVal);
        posts = posts.filter(p => p.id !== idInt);
        deletePostFromCloud(idInt);
        closeModal();
        renderCalendar();
        renderList();
        renderIdeasList();
      }
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const idVal = document.getElementById("post-id").value;
  const statusEl = form.querySelector('input[name="post_status"]:checked');
  
  // Collect all checked destinies
  const checkedDestinies = Array.from(form.querySelectorAll('input[name="post_destiny"]:checked')).map(cb => cb.value);
  const primaryDestiny = document.getElementById("post-primary-destiny").value || checkedDestinies[0] || '';
  
  const topicEl = document.getElementById("post-topic");
  const tagValue = document.getElementById("post-tag").value;
  const idInt = idVal ? parseInt(idVal) : Date.now();
  let originalPost = {};
  if (idVal) {
    originalPost = posts.find(p => p.id === idInt) || {};
  }

  const newPost = {
    ...originalPost,
    id: idInt,
    date: document.getElementById("post-date").value,
    status: statusEl ? statusEl.value : "rascunho",
    tag: tagValue,
    title: tagValue, // ensure title is always saved alongside tag
    topic: topicEl ? topicEl.value : "",
    image: document.getElementById("post-image-data").value,
    briefing: document.getElementById("post-briefing").value,
    caption: document.getElementById("post-caption").value,
    destiny: primaryDestiny, // backward compat — primary destiny
    destinies: checkedDestinies, // all selected platforms
    primaryDestiny: primaryDestiny, // explicit primary
    author: document.getElementById("post-author").value,
    comments: document.getElementById("post-comments").value,
    ideaId: document.getElementById("post-idea-link").value || null,
    routineId: document.getElementById("post-routine-link").value || null,
  };
  
  if (idVal) {
    const index = posts.findIndex(p => p.id === newPost.id);
    if (index > -1) {
      posts[index] = newPost;
    }
  } else {
    posts.push(newPost);
  }
  savePostToCloud(newPost);
  
  const isSaveAndNew = e.submitter && e.submitter.id === "btn-save-new";
  
  if (isSaveAndNew) {
    const savedDate = newPost.date;
    const isInternal = newPost.destiny === 'interno';
    openModal(null, savedDate, "", isInternal ? "Interno" : "");
  } else {
    closeModal();
  }
  
  renderCalendar();
  renderList();
  renderIdeasList(); // Re-render to update usage badges
  
  if (typeof showToast === 'function') {
    showToast('✅ Criativo salvo com sucesso!', 'success');
  }
});

const btnApprove = document.getElementById("btn-quick-approve");
if(btnApprove) {
  btnApprove.addEventListener("click", () => {
    const statusRadio = form.querySelector(`input[name="post_status"][value="aprovado"]`);
    if(statusRadio) statusRadio.checked = true;
    
    // Highlight the status chips correctly
    form.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    if(statusRadio) statusRadio.parentElement.classList.add('selected');

    form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  });
}

const btnReject = document.getElementById("btn-quick-reject");
if(btnReject) {
  btnReject.addEventListener("click", () => {
    const statusRadio = form.querySelector(`input[name="post_status"][value="rascunho"]`);
    if(statusRadio) statusRadio.checked = true;
    
    // Highlight the status chips correctly
    form.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    if(statusRadio) statusRadio.parentElement.classList.add('selected');

    form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  });
}

document.getElementById("post-image-file").addEventListener("change", function(e) {
  const file = e.target.files[0];
  const preview = document.getElementById("upload-preview");
  const placeholder = document.getElementById("upload-placeholder");
  
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      // Compress image via canvas to keep localStorage under quota
      const img = new Image();
      img.onload = function() {
        const MAX_W = 600;
        const MAX_H = 600;
        let w = img.width;
        let h = img.height;
        if (w > MAX_W) { h = h * (MAX_W / w); w = MAX_W; }
        if (h > MAX_H) { w = w * (MAX_H / h); h = MAX_H; }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL('image/jpeg', 0.65);
        document.getElementById("post-image-data").value = compressed;
        preview.src = compressed;
        preview.classList.remove("hidden");
        placeholder.classList.add("hidden");
        const btnDownload = document.getElementById("btn-download-image");
        if (btnDownload) {
          btnDownload.href = compressed;
          btnDownload.classList.remove("hidden");
        }
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById("post-image-data").value = "";
    preview.src = "";
    preview.classList.add("hidden");
    placeholder.classList.remove("hidden");
    const btnDownload = document.getElementById("btn-download-image");
    if (btnDownload) btnDownload.classList.add("hidden");
  }
});

let ideas = [
  {
    id: 1, title: "REFORMA TRIBUTÁRIA (TRANSIÇÃO & IMPACTOS)", desc: "A Reforma como palco mestre para as soluções SAAM. Foco em processos, aderência e transição sistêmica sem dor.",
    subideias: [
      {
        nome: "IBS, CBS e cClassTrib na Prática",
        angulos: [
          { id: 102, nome: "O maior erro é achar que ainda dá tempo de esperar", exemplos: ["A Reforma Tributária não começa quando a lei entrar em vigor. Ela começa no saneamento dos seus dados hoje.", "O maior desafio da Reforma não será calcular impostos. Será reestruturar cadastros e integrações."] },
          { id: 104, nome: "O fiscal do futuro", exemplos: ["O profissional fiscal que mais crescerá não é quem trabalha mais horas, mas quem domina a tecnologia da transição antes dos outros."] },
          { id: 1101, nome: "O que muda no operacional?", exemplos: ["Como a SAAM simplifica a transição do ICMS para IBS sem travar a operação.", "Aderência tecnológica sem dor de cabeça no seu ERP."] },
          { id: 1102, nome: "Impacto no Fluxo de Caixa (Split Payment)", exemplos: ["Split Payment: Como a automação previne o travamento de caixa da sua empresa durante a transição.", "Garantindo retenções exatas sem impactar a liquidez diária."] }
        ]
      },
      {
        nome: "Cadastro Tributário e Preparação de Dados",
        angulos: [
          { id: 109, nome: "O cadastro tributário", exemplos: ["Seu cadastro será o ativo mais importante da empresa.", "O erro começou no cadastro em 2024. A multa da Sefaz apareceu 2 anos depois. Storytelling real."] },
          { id: 1103, nome: "Checklist de Preparação", exemplos: ["3 passos sistêmicos para preparar sua base de dados antes do novo formato da Receita.", "Como a auditoria prévia da SAAM limpa seu cadastro tributário."] },
          { id: 1104, nome: "O Custo de Cadastros Antigos", exemplos: ["Cadastros antigos e desatualizados que vão gerar autuações automáticas com a IA do governo."] }
        ]
      }
    ]
  },
  {
    id: 2, title: "O ERP COMO PARCEIRO (AUTOMAÇÃO & LIMITES)", desc: "ERP organiza, Auditoria interpreta, Integração conecta. Mostrando que ERPs e SAAM trabalham juntos.",
    subideias: [
      {
        nome: "Limites do ERP x Camada de Auditoria",
        angulos: [
          { id: 107, nome: "O ERP realmente faz isso?", exemplos: ["Seu ERP garante conformidade fiscal completa? ERP faz gestão de processos, não faz auditoria de inteligência. Trabalham juntos."] },
          { id: 2201, nome: "Integração Inteligente via APIs", exemplos: ["Como potencializar o SAP, TOTVS ou Senior com auditorias prévias da SAAM.", "Por que o ERP roda 10x melhor quando os dados entram sanitizados."] },
          { id: 2202, nome: "Mitos e Verdades de Sistemas", exemplos: ["Mito: 'Meu ERP vai resolver a Reforma sozinho'. Verdade: Você precisa de inteligência fiscal especializada."] }
        ]
      },
      {
        nome: "Estratégia e Visão C-Level",
        angulos: [
          { id: 101, nome: "Radar Fiscal da Semana", exemplos: ["O que mudou na legislação tributária e o que exige a atenção da diretoria nesta semana. (Série semanal)"] },
          { id: 113, nome: "O que aprendemos no mês", exemplos: ["O futuro do fiscal é decidido na prevenção, não na correria do dia 15."] },
          { id: 2203, nome: "Decisões Baseadas em Dados Fiscais", exemplos: ["Como diretores tomam decisões com dados em tempo real, eliminando achismos de fechamentos passados."] }
        ]
      }
    ]
  },
  {
    id: 3, title: "SAAM AUDITORIA & ROBOTIZAÇÃO (NO PRODUTO)", desc: "Soluções SAAM na veia. Funcionalidades do produto resolvendo dores reais de mercado.",
    subideias: [
      {
        nome: "APIs, Conectividade e Robotização PVA",
        angulos: [
          { id: 103, nome: "Quantas integrações manuais sua equipe faz?", exemplos: ["Automação começa quando os sistemas deixam de depender de arquivos planilhados ou exportações manuais."] },
          { id: 112, nome: "Robotização e Transmissão PVA", exemplos: ["Você ainda assina e valida o SPED manualmente de madrugada? Devolvemos noites de sono à equipe."] },
          { id: 3301, nome: "Fim da Exportação em Planilhas", exemplos: ["Conexão contínua sem quebras de arquivo ou dados corrompidos."] }
        ]
      },
      {
        nome: "Edição em Lote e Correção Automática",
        angulos: [
          { id: 106, nome: "Gestor de Notas Eletrônicas", exemplos: ["5 recursos do Gestor de Notas que poucos clientes utilizam para acelerar a rotina."] },
          { id: 3302, nome: "Edição de SPED em Lote", exemplos: ["O desespero do analista alterando arquivos TXT no Bloco de Notas x Edição em lote segura no SAAM."] }
        ]
      }
    ]
  },
  {
    id: 4, title: "GESTÃO DE XML E SPED (DORES REAIS)", desc: "Dores clássicas do mercado fiscal e confrontos de informações.",
    subideias: [
      {
        nome: "O Custo de um XML Perdido ou Desatualizado",
        angulos: [
          { id: 105, nome: "Arquivo Confidencial", exemplos: ["O caso da empresa que achava que tinha todos os XMLs guardados no ERP até a fiscalização bater na porta."] },
          { id: 110, nome: "Quanto custa o processo manual?", exemplos: ["Baixar e conferir XML manualmente: cálculo exato de horas desperdiçadas por mês."] },
          { id: 111, nome: "Mito ou Verdade: Guarda de XML", exemplos: ["Apenas guardar o XML não evita notas canceladas ou frias emitidas contra seu CNPJ."] }
        ]
      },
      {
        nome: "SPED Fiscal e Cruzamentos Invisíveis",
        angulos: [
          { id: 108, nome: "Fiscal ou Ficção: Validador do Governo", exemplos: ["O PVA aprova a estrutura, mas não valida o conteúdo. A diferença entre validar no PVA e auditar no SAAM."] },
          { id: 4401, nome: "O Erro que o PVA não mostra", exemplos: ["Erros semânticos que o validador aceita mas a Receita autua: o confronto invisível entre Bloco K e C100."] },
          { id: 4402, nome: "Prejuízo por CFOP Errado", exemplos: ["Empresa perdeu créditos por CFOP mal configurado nas filiais. Casos práticos da rotina."] }
        ]
      }
    ]
  },
  {
    id: 5, title: "AUDITORIA PREVENTIVA VS REATIVA", desc: "Auditar antes de entregar vale 10x mais do que corrigir depois da autuação.",
    subideias: [
      {
        nome: "Conformidade Prévia e Malha Fina",
        angulos: [
          { id: 501, nome: "O custo invisível do retrabalho", exemplos: ["Quanto custa para a empresa retificar um SPED entregue com erros?"] },
          { id: 502, nome: "SEFAZ com Inteligência Artificial", exemplos: ["A SEFAZ já usa cruzamento em tempo real. Sua empresa ainda audita no mês seguinte?"] }
        ]
      }
    ]
  },
  {
    id: 6, title: "DADOS E HIGIENIZAÇÃO DE CADASTROS", desc: "Saneamento profundo de NCM, CFOP, CST, CSOSN e CEST na origem.",
    subideias: [
      {
        nome: "Qualidade dos Dados na Origem",
        angulos: [
          { id: 601, nome: "O cadastro é a certidão de nascimento do fiscal", exemplos: ["Produto com NCM errado gera tributação errada em toda a cadeia."] },
          { id: 602, nome: "Saneamento Massivo de Produtos", exemplos: ["Como auditar e corrigir milhares de itens de estoque sem parar as vendas."] }
        ]
      }
    ]
  },
  {
    id: 7, title: "PRODUTIVIDADE FISCAL E ROTINA", desc: "Como organizar os processos do departamento para ter tempo estratégico.",
    subideias: [
      {
        nome: "Eficiência de Processos e Gestão do Tempo",
        angulos: [
          { id: 701, nome: "Eliminando 20 horas de digitação manual", exemplos: ["Checklist de automação para liberar o time de tarefas braçais."] },
          { id: 702, nome: "O Checklist de Fechamento Perfeito", exemplos: ["5 conferências obrigatórias antes de apertar o botão de transmissão do SPED."] }
        ]
      }
    ]
  },
  {
    id: 8, title: "INTELIGÊNCIA ARTIFICIAL E FUTURO DO FISCAL", desc: "IA aplicada à rotina tributária sem modismos vazios.",
    subideias: [
      {
        nome: "IA como Co-Piloto do Profissional",
        angulos: [
          { id: 801, nome: "IA não substitui o especialista", exemplos: ["A IA acelera a leitura de inconsistências, mas a interpretação estratégica é humana."] },
          { id: 802, nome: "As novas habilidades do Fiscal Estratégico", exemplos: ["Do analista de digitação ao cientista de dados fiscais."] }
        ]
      }
    ]
  },
  {
    id: 9, title: "CASES E HISTÓRIAS DE TRINCHEIRA", desc: "Resultados reais e depoimentos de quem transformou o setor fiscal.",
    subideias: [
      {
        nome: "Provas de Transformação",
        angulos: [
          { id: 901, nome: "Como a empresa X recuperou R$ 150k em ICMS ST", exemplos: ["Estudo de caso real de restituição automatizada via rotina 1.8.6.2 da SAAM."] },
          { id: 902, nome: "Noites de sono devolvidas à equipe", exemplos: ["Como um grupo de 15 filiais zerou horas extras no fechamento do mês."] }
        ]
      }
    ]
  },
  {
    id: 10, title: "POR DENTRO DA SAAM (BASTIDORES E ROADMAP)", desc: "Relacionamento com clientes, novas APIs e novidades do produto.",
    subideias: [
      {
        nome: "Roadmap e Novidades",
        angulos: [
          { id: 1001, nome: "Por dentro da equipe de tecnologia SAAM", exemplos: ["Como são desenvolvidas as 2.000+ regras de auditoria do sistema."] },
          { id: 1002, nome: "Dicas escondidas da plataforma", exemplos: ["3 atalhos no SAAM que economizam 30 minutos na sua consulta diária."] }
        ]
      }
    ]
  }
];

const btnNovaIdeia = document.getElementById("btn-nova-ideia");
const novaIdeiaForm = document.getElementById("nova-ideia-form");
const btnCancelIdeia = document.getElementById("btn-cancel-ideia");
const btnSaveIdeia = document.getElementById("btn-save-ideia");
const ideiasListEl = document.getElementById("ideias-list");

btnNovaIdeia.addEventListener("click", () => {
  novaIdeiaForm.classList.remove("hidden");
});

btnCancelIdeia.addEventListener("click", () => {
  novaIdeiaForm.classList.add("hidden");
  document.getElementById("new-idea-title").value = "";
  document.getElementById("new-idea-desc").value = "";
});

btnSaveIdeia.addEventListener("click", () => {
  const title = document.getElementById("new-idea-title").value.trim();
  const desc = document.getElementById("new-idea-desc").value.trim();
  if(!title) return alert("Preencha o título!");
  
  ideas.push({
    id: Date.now(),
    title,
    desc
  });
  
  btnCancelIdeia.click();
  renderIdeasList();
});

function oldRenderIdeasList() {
  ideiasListEl.innerHTML = "";
  if (ideas.length === 0) {
    ideiasListEl.innerHTML = "<p>Nenhuma ideia cadastrada.</p>";
    return;
  }
  
  let html = '<div style="display:flex; flex-direction:column; gap:16px;">';
  ideas.forEach((idea, idx) => {
    let nestedHtml = "";
    if (idea.subideias) {
      idea.subideias.forEach(sub => {
        nestedHtml += `<div style="margin-top: 16px; padding-left: 12px; border-left: 2px solid var(--orange);">
          <strong style="color: var(--ink); font-size: 14px;">${sub.nome}</strong>`;
        sub.angulos.forEach(ang => {
          
          // Verifica os posts exatos que usaram ESTE ângulo
          const usedPosts = posts.filter(p => p.ideaId == ang.id);
          let badgesHtml = "";
          if (usedPosts.length > 0) {
            badgesHtml = usedPosts.map(p => {
              const dStr = new Date(p.date + "T00:00:00").toLocaleDateString('pt-BR');
              return `<span style="background: var(--blue-soft); color: var(--blue); padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; display: inline-block; margin-left: 8px;">✅ ${p.tag} (${dStr})</span>`;
            }).join('');
          } else {
            badgesHtml = `<span style="background: var(--surface); color: var(--ink-soft); padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; display: inline-block; margin-left: 8px; cursor: pointer; border: 1px solid var(--hairline);" onclick="openModal(null, '', ${ang.id})" title="Clique para agendar esta ideia">📦 Em Estoque</span>`;
          }

          nestedHtml += `<div style="margin-top: 12px; padding-left: 12px; border-bottom: 1px dashed var(--hairline); padding-bottom: 12px;">
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <em style="color: var(--blue-dark); font-size: 14px; font-weight: bold;">Ângulo: ${ang.nome}</em>
              ${badgesHtml}
            </div>
            <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 13px; color: var(--ink);">`;
          ang.exemplos.forEach(ex => {
            nestedHtml += `<li style="margin-bottom: 4px;">${ex}</li>`;
          });
          nestedHtml += `</ul></div>`;
        });
        nestedHtml += `</div>`;
      });
    }

    html += `
      <div class="idea-card" style="background: var(--bg); border: 1px solid var(--hairline); padding: 16px; border-radius: 12px; cursor: pointer;" onclick="toggleAccordion('idea-body-${idea.id}')">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="margin: 0; font-size: 16px; color: var(--ink);">${idea.title}</h4>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <p style="margin: 8px 0 0 0; color: var(--ink-soft); font-size: 14px; white-space: pre-wrap;">${idea.desc}</p>
        
        <div id="idea-body-${idea.id}" style="display: none; margin-top: 16px; border-top: 1px solid var(--hairline); padding-top: 16px;">
          ${nestedHtml}
        </div>
      </div>
    `;
  });
  html += '</div>';
  ideiasListEl.innerHTML = html;
}

window.toggleAccordion = function(id) {
  const el = document.getElementById(id);
  const icon = document.getElementById(`icon-${id}`);
  
  if (el.style.display === "none" || el.style.display === "") {
    // Para rotinas eu uso display flex
    el.style.display = id.startsWith("routine-area") ? "flex" : "block";
    if(icon) icon.innerHTML = `<polyline points="18 15 12 9 6 15"/>`;
  } else {
    el.style.display = "none";
    if(icon) icon.innerHTML = `<polyline points="6 9 12 15 18 9"/>`;
  }
};

// --- BASE DE ROTINAS ---
const routines = [
  {
    id: 1,
    area: "SPED FISCAL - Importação e Geração",
    items: [
      { id: "1.1.1", name: "1.1.1 - Importar Escrituração", desc: "Permite importação do SPED Fiscal com extensão de texto ou arquivo compactado.", pain: "Lentidão na carga de arquivos grandes gerados pelo ERP.", otimiza: "Elimina a necessidade de descompactar arquivos manualmente.", venda: "Seu sistema trava para importar arquivos pesados? O SAAM importa textos e arquivos compactados rapidamente.", premium: false },
      { id: "1.1.2", name: "1.1.2 - Junção de Arquivos", desc: "Faz junção total ou parcial de SPED. Permite importar de várias competências.", pain: "Trabalhar com arquivos fragmentados de diversas filiais (processo lento e arriscado no bloco de notas).", otimiza: "Unifica operações complexas em minutos de forma segura.", venda: "Junte o SPED de matriz e filiais automaticamente, sem precisar copiar e colar linhas em arquivos de texto.", premium: false },
      { id: "1.2", name: "1.2 - Gerar Escrituração", desc: "Geração do SPED Fiscal com escolha dos blocos que deseja incluir.", pain: "Falta de flexibilidade na geração padrão imposta pelo ERP.", otimiza: "Gera apenas o necessário para as validações específicas.", venda: "Você no controle total de quais blocos gerar para o fisco.", premium: false }
    ]
  },
  {
    id: 2,
    area: "SPED FISCAL - Auditoria e Correções Automáticas",
    items: [
      { id: "1.4.1", name: "1.4.1 - Auditorias Automáticas", desc: "Auditoria com mais de 2000 críticas, exportação de relatórios e análises avançadas de SPED.", pain: "Erros invisíveis (semânticos) que o validador da Receita aprova mas geram multas pesadas depois.", otimiza: "Antecipa autuações e malhas finas validando regras de negócio profundamente.", venda: "O PVA do governo só valida estrutura. O SAAM audita o conteúdo com mais de 2000 regras fiscais pesadas.", premium: false },
      { id: "1.4.2", name: "1.4.2 - Correções Automáticas PVA", desc: "Permite a correção automática de erros críticos apontados pelo PVA, com agrupamentos dos registros.", pain: "Corrigir linha a linha, de forma braçal, os erros apontados pelo programa do governo.", otimiza: "Correção em lote de problemas recorrentes.", venda: "Pare de corrigir erros um por um no validador. Deixe o SAAM resolver os agrupamentos massivamente para você.", premium: false },
      { id: "1.4.13", name: "1.4.13 - Correções Automáticas a partir dos XMLs", desc: "Cruza e corrige automaticamente divergências (NF-e x SPED) baseando-se nos XMLs oficiais importados.", pain: "Divergência entre o documento eletrônico emitido (XML) e o que foi efetivamente escriturado no ERP.", otimiza: "Sincroniza o SPED com a realidade nua e crua da Sefaz.", venda: "O seu SPED não bate com as notas emitidas? Essa rotina puxa a verdade direto do XML e conserta o SPED sozinha.", premium: false },
      { id: "1.4.3", name: "1.4.3 - Geração Automática de reg. Analíticos", desc: "Faz a geração dos registros analíticos de forma automática (Gera C190 de todos os C170).", pain: "Inconsistências matemáticas e tributárias entre o totalizador e os itens da nota.", otimiza: "Garante a amarração perfeita dos impostos na escrituração.", venda: "Acabou a divergência entre os blocos C100, C170 e C190. O SAAM recalcula e gera o analítico com perfeição matemática.", premium: false },
      { id: "1.8.5", name: "1.8.5 - Cálculo Protege", desc: "Cálculo do regime Protege (substituição tributária avançada).", premium: true },
      { id: "1.8.6", name: "1.8.6 - Cálculo ICMS ST", desc: "Cálculo do ICMS Substituição Tributária (ST).", premium: true },
      { id: "1.8.9", name: "1.8.9 - Cálculo DIFAL", desc: "Cálculo do Diferencial de Alíquota (DIFAL).", premium: true },
      { id: "1.8.6.2", name: "1.8.6.2 - Restituição ICMS ST", desc: "Cálculo de restituição de ICMS ST.", premium: true },
      { id: "1.8.14", name: "1.8.14 - Controle Remessa/Retorno", desc: "Gestão de controle de remessas e retornos de documentos fiscais.", premium: true }
    ]
  },
  {
    id: 3,
    area: "SPED FISCAL - Bloco K, Produção e Inventário",
    items: [
      { id: "1.6.7.1", name: "1.6.7.1 - Controle da Produção e Estoque (Bloco K)", desc: "Rotina destinada ao controle total do estoque (K100, K200, K220, K230/K235, K250/K255, K280).", pain: "Complexidade extrema e risco de autuação na amarração entre insumo, produção e estoque final.", otimiza: "Visão holística e organizada de todos os registros da produção.", venda: "Tenha domínio absoluto sobre a rastreabilidade da sua produção e comprove para o fisco que seu Bloco K faz sentido.", premium: false },
      { id: "1.7.5.3", name: "1.7.5.3 - Média de Unitário Entradas x Inventário", desc: "Relatórios e correções de divergências entre o unitário das entradas e o inventário, filtrando por CFOP/produto.", pain: "Superfaturamento ou subfaturamento cego nos itens do inventário.", otimiza: "Amarração de custos exata com o histórico de compras.", venda: "Seu inventário não conversa com o custo de entrada? Essa rotina aponta cirurgicamente onde o valor se perdeu.", premium: false }
    ]
  },
  {
    id: 4,
    area: "SPED FISCAL - Relatórios Avançados e Cruzamentos",
    items: [
      { id: "1.7.1.1.6", name: "1.7.1.1.6 - Divergência ICMS Calculado x Informado", desc: "Gera relatório verificando a diferença entre o ICMS calculado pelo sistema vs ICMS informado no arquivo.", pain: "Pagar imposto a maior por erro de parametrização no ERP.", otimiza: "Pega a falha antes da geração da guia de pagamento.", venda: "Nunca mais pague impostos indevidos por falhas no ERP. Nós recalculamos e mostramos a diferença na hora.", premium: false },
      { id: "1.7.8", name: "1.7.8 - Conferência e Correções de Docs Fiscais", desc: "Conferência, relatórios e correções de erros no SPED integrando os blocos C100, C500, D100 e D500.", pain: "Falta de visão gerencial do volume massivo escriturado (milhões de linhas cegas).", otimiza: "Auditoria preventiva e centralizada em uma única visão.", venda: "O raio-X definitivo da operação. Tudo que entra e sai da empresa é dissecado e auditado antes do envio ao fisco.", premium: false },
      { id: "1.7.3.3", name: "1.7.3.3 - N.F. faltando de acordo com XML", desc: "Visualizar notas do SPED que estão sem XML, e arquivos XML (NF-e) que não foram encontrados dentro do SPED.", pain: "Multas por notas não escrituradas que o fornecedor emitiu contra o CNPJ da empresa.", otimiza: "Cruzamento rápido para identificar passivo oculto.", venda: "O pesadelo do XML faltante acabou. Saiba instantaneamente o que a Sefaz tem que você 'esqueceu' de lançar.", premium: false }
    ]
  },
  {
    id: 5,
    area: "SPED Contribuições (2.0) - Apuração PIS/COFINS",
    items: [
      { id: "2.4.3", name: "2.4.3 - Recalcular bases PIS/COFINS", desc: "Recalcula bases de cálculo para PIS/COFINS a partir de novos parâmetros.", premium: false },
      { id: "2.4.4", name: "2.4.4 - Reduzir ICMS da base de cálculo", desc: "Permite excluir ICMS da base de cálculo do PIS/COFINS.", premium: false },
      { id: "2.7.5", name: "2.7.5 - Gerar arquivo a partir do SPED Fiscal", desc: "Gera o arquivo de contribuições (EFD) a partir dos dados do SPED Fiscal.", premium: false },
      { id: "2.2", name: "2.2 - Robotização PVA", desc: "Automatiza a transmissão PVA para contribuições.", premium: true }
    ]
  },
  {
    id: 6,
    area: "SPED Contábil e ECF (3.0/4.0) - Gestão de ECD e ECF",
    items: [
      { id: "3.0", name: "3.0 - SPED Contábil", desc: "Gestão completa do SPED Contábil.", premium: true },
      { id: "4.0", name: "4.0 - ECF", desc: "Gestão completa da Escrituração Contábil Fiscal.", premium: true },
      { id: "3.4.1", name: "3.4.1 - Auditorias de lançamentos", desc: "Audita lançamentos contábeis cruzando com dados fiscais.", premium: true }
    ]
  },
  {
    id: 7,
    area: "Cruzamento de Informações (10.0)",
    items: [
      { id: "10.1.2", name: "10.1.2 - SPED Fiscal x XML", desc: "Confronta dados do SPED Fiscal com XMLs oficiais.", premium: false },
      { id: "10.4.1", name: "10.4.1 - SPED Fiscal x Contribuições", desc: "Confronta SPED Fiscal com dados de contribuições.", premium: false },
      { id: "10.11.2", name: "10.11.2 - Contábil x Fiscal", desc: "Cruzamento entre dados contábeis e fiscais.", premium: false }
    ]
  },
  {
    id: 8,
    area: "Gerenciamento de XML e Utilitários (8.0/11.0)",
    items: [
      { id: "11.3.2", name: "11.3.2 - Repositório central de notas", desc: "Armazena todas as notas fiscais em um repositório único.", premium: false },
      { id: "11.3.3", name: "11.3.3 - Download de XMLs direto da SEFAZ", desc: "Permite baixar XMLs fiscais diretamente da SEFAZ.", premium: false },
      { id: "11.3.4", name: "11.3.4 - Manifestação do destinatário", desc: "Gerencia a manifestação do destinatário de NF-e.", premium: false },
      { id: "11.7", name: "11.7 - Consulta de NCM/TIPI", desc: "Consulta códigos NCM e TIPI para tributação.", premium: false },
      { id: "11.16.3", name: "11.16.3 - Download XML Contabilista", desc: "Download de XMLs para uso contábil.", premium: true }
    ]
  },
  {
    id: 9,
    area: "Área Gerencial e Configurações (9.0/12.0)",
    items: [
      { id: "9.4", name: "9.4 - Visualizador", desc: "Dashboard avançado para visualização de métricas fiscais.", premium: true },
      { id: "12.3", name: "12.3 - Gestão de Certificados", desc: "Gerencia certificados digitais para assinatura.", premium: true },
      { id: "12.20", name: "12.20 - Gestão de NFS-e", desc: "Configurações e emissão de NFS-e.", premium: true },
      { id: "12.7", name: "12.7 - Cliente do Cliente", desc: "Gestão de clientes de clientes (subcontratantes).", premium: true }
    ]
  }
];

function populateRoutineSelect() {
  const select = document.getElementById("post-routine-link");
  if(!select) return;
  select.innerHTML = '<option value="">-- Nenhuma rotina vinculada --</option>';
  routines.forEach(area => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = area.area;
    area.items.forEach(rt => {
      const opt = document.createElement("option");
      opt.value = rt.id;
      opt.textContent = rt.name;
      optgroup.appendChild(opt);
    });
    select.appendChild(optgroup);
  });
}

const routinesListEl = document.getElementById("routines-list");
const searchRoutinesEl = document.getElementById("search-routines");
let currentRoutineCategory = "all";

function renderRoutinesList(filterText = "") {
  if(!routinesListEl) return;
  routinesListEl.innerHTML = "";
  
  const term = filterText.toLowerCase();
  let totalCount = 0;
  
  routines.forEach(area => {
    // Filtragem por Categoria/Módulo
    let categoryMatch = true;
    if (currentRoutineCategory === "premium") {
      categoryMatch = true;
    } else if (currentRoutineCategory === "sped-fiscal") {
      categoryMatch = area.area.toLowerCase().includes("sped fiscal");
    } else if (currentRoutineCategory === "contrib") {
      categoryMatch = area.area.toLowerCase().includes("contribuições");
    } else if (currentRoutineCategory === "contabil") {
      categoryMatch = area.area.toLowerCase().includes("contábil") || area.area.toLowerCase().includes("ecf");
    } else if (currentRoutineCategory === "cruzamento") {
      categoryMatch = area.area.toLowerCase().includes("cruzamento");
    } else if (currentRoutineCategory === "xml") {
      categoryMatch = area.area.toLowerCase().includes("xml");
    }

    if (!categoryMatch) return;
    
    let filteredItems = area.items.filter(rt => {
      if (currentRoutineCategory === "premium" && !rt.premium) return false;
      
      const matchSearch = !term || 
        rt.name.toLowerCase().includes(term) || 
        rt.desc.toLowerCase().includes(term) || 
        (rt.pain && rt.pain.toLowerCase().includes(term)) ||
        (rt.otimiza && rt.otimiza.toLowerCase().includes(term)) ||
        (rt.venda && rt.venda.toLowerCase().includes(term));
        
      return matchSearch;
    });
    
    if(filteredItems.length > 0) {
      totalCount += filteredItems.length;
      
      const areaBlock = document.createElement("div");
      areaBlock.style.marginBottom = "24px";
      
      // Determine if we should show items (if there's a search term or specific filter)
      const shouldShow = term.length > 0 || currentRoutineCategory !== "all";
      const displayStyle = shouldShow ? "flex" : "none";
      const chevron = shouldShow ? `<polyline points="18 15 12 9 6 15"/>` : `<polyline points="6 9 12 15 18 9"/>`;
      
      // Módulo Header Bar (Sleek Dark Accent, Collapsible)
      areaBlock.innerHTML = `
        <div class="routine-area-header" style="background: #FFFFFF; color: #101B3B; padding: 18px 24px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between; border-left: 6px solid #26428B; border-top: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);" onclick="toggleAccordion('routine-area-${area.id}')" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';">
          <h3 style="margin: 0; font-size: 17px; font-weight: 800; font-family: 'Outfit', sans-serif; color: #0A1C2D;">${area.area}</h3>
          <div style="display: flex; align-items: center; gap: 14px;">
            <span style="background: rgba(38, 66, 139, 0.08); color: #26428B; border: 1px solid rgba(38, 66, 139, 0.15); padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 800; font-family: 'Roboto', sans-serif;">${filteredItems.length} rotinas</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3F77C1" stroke-width="2.5" class="accordion-icon" id="icon-routine-area-${area.id}">${chevron}</svg>
          </div>
        </div>
      `;
      
      const listWrapper = document.createElement("div");
      listWrapper.id = `routine-area-${area.id}`;
      listWrapper.style.display = displayStyle;
      listWrapper.style.flexDirection = "column";
      listWrapper.style.gap = "14px";
      listWrapper.style.marginTop = "14px";
      
      filteredItems.forEach(rt => {
        const itemCard = document.createElement("div");
        itemCard.style.cssText = `
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          border-left: 5px solid ${rt.premium ? "#F59E0B" : "#2563EB"};
          transition: all 0.2s ease;
        `;
        
        const isPremiumBadge = rt.premium 
          ? `<span style="background: #FFF7ED; color: #D97706; border: 1px solid #FDE68A; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">⭐ PREMIUM</span>`
          : `<span style="background: #EFF6FF; color: #2563EB; border: 1px solid #BFDBFE; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700;">🟢 INCLUSO</span>`;

        const painBlock = rt.pain ? `
          <div style="background: #FEF2F2; border: 1px solid #FECACA; padding: 14px; border-radius: 10px; margin-top: 10px;">
            <span style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: #DC2626; display: flex; align-items: center; gap: 4px;">🚨 A Dor de Mercado</span>
            <p style="margin: 4px 0 0 0; color: #7F1D1D; font-size: 13.5px; line-height: 1.4; font-weight: 500;">${rt.pain}</p>
          </div>
        ` : '';

        const otimizaBlock = rt.otimiza ? `
          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; padding: 14px; border-radius: 10px; margin-top: 10px;">
            <span style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: #059669; display: flex; align-items: center; gap: 4px;">⚡ O que Otimiza (ROI de Eficiência)</span>
            <p style="margin: 4px 0 0 0; color: #047857; font-size: 13.5px; line-height: 1.4; font-weight: 500;">${rt.otimiza}</p>
          </div>
        ` : '';

        const vendaBlock = rt.venda ? `
          <div style="background: #EFF6FF; border: 1px solid #BFDBFE; padding: 14px; border-radius: 10px; margin-top: 10px;">
            <span style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: #2563EB; display: flex; align-items: center; gap: 4px;">📣 Argumento de Venda (Pitch para Conteúdo)</span>
            <p style="margin: 4px 0 0 0; color: #1E3A8A; font-size: 13.5px; line-height: 1.5; font-style: italic;">"${rt.venda}"</p>
          </div>
        ` : '';

        itemCard.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
            <h4 style="margin: 0; font-size: 17px; color: #0F172A; font-weight: 800; font-family: 'Manrope', sans-serif;">${rt.name}</h4>
            ${isPremiumBadge}
          </div>
          
          <p style="margin: 0 0 12px 0; color: #334155; font-size: 14px; line-height: 1.5; font-weight: 500;">${rt.desc}</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px;">
            ${painBlock}
            ${otimizaBlock}
            ${vendaBlock}
          </div>
        `;
        
        listWrapper.appendChild(itemCard);
      });
      
      areaBlock.appendChild(listWrapper);
      routinesListEl.appendChild(areaBlock);
    }
  });

  if (totalCount === 0) {
    routinesListEl.innerHTML = `
      <div style="background: #FFFFFF; border: 1px dashed #CBD5E1; padding: 40px; border-radius: 14px; text-align: center; color: #64748B;">
        <p style="margin: 0; font-size: 15px; font-weight: 600;">Nenhuma rotina encontrada para a busca / filtro selecionado.</p>
      </div>
    `;
  }
}

if(searchRoutinesEl) {
  searchRoutinesEl.addEventListener("input", (e) => {
    renderRoutinesList(e.target.value);
  });
}

// Listeners de filtro por pílula (com suporte a TOGGLE OFF / RESET)
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("btn-routine-filter")) {
    const selectedFilter = e.target.getAttribute("data-filter");
    
    if (currentRoutineCategory === selectedFilter && selectedFilter !== "all") {
      // Toggle off -> volta para "all"
      currentRoutineCategory = "all";
      document.querySelectorAll(".btn-routine-filter").forEach(b => b.classList.remove("active"));
      const allBtn = document.querySelector('.btn-routine-filter[data-filter="all"]');
      if (allBtn) allBtn.classList.add("active");
    } else {
      document.querySelectorAll(".btn-routine-filter").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentRoutineCategory = selectedFilter;
    }
    
    const searchText = searchRoutinesEl ? searchRoutinesEl.value : "";
    renderRoutinesList(searchText);
  }
});

// --- LÓGICA INTERATIVA DA CALCULADORA IVS (CAPÍTULO 10) ---
function updateIVSCalculator() {
  let score = 0;
  for (let i = 1; i <= 6; i++) {
    const slider = document.getElementById(`ivs-${i}`);
    const valDisplay = document.getElementById(`val-ivs-${i}`);
    if (slider && valDisplay) {
      const val = parseInt(slider.value) || 0;
      valDisplay.textContent = val;
      score += val;
    }
  }
  
  const scoreDisplay = document.getElementById("ivs-score-display");
  const resultBox = document.getElementById("ivs-result-box");
  const titleEl = document.getElementById("ivs-status-title");
  const descEl = document.getElementById("ivs-status-desc");
  const badgeEl = document.getElementById("ivs-status-badge");
  
  if (scoreDisplay) scoreDisplay.textContent = `${score} / 60`;
  
  if (resultBox && titleEl && descEl && badgeEl) {
    if (score < 40) {
      resultBox.style.background = "#FEF2F2";
      resultBox.style.borderColor = "#FECACA";
      titleEl.style.color = "#991B1B";
      titleEl.textContent = "🔴 REESCREVER CONTEÚDO (Abaixo de 40 Pontos)";
      descEl.style.color = "#7F1D1D";
      descEl.textContent = "Conteúdo raso ou muito genérico. Refaça a abertura com um gancho forte e insira um exemplo/analogia.";
      badgeEl.style.background = "#DC2626";
      badgeEl.textContent = "REESCREVER";
    } else if (score <= 50) {
      resultBox.style.background = "#FFFBEB";
      resultBox.style.borderColor = "#FDE68A";
      titleEl.style.color = "#92400E";
      titleEl.textContent = "🟡 REVISAR CONTEÚDO (40 a 50 Pontos)";
      descEl.style.color = "#78350F";
      descEl.textContent = "Conteúdo aceitável, mas pode evoluir. Reforce o posicionamento interpretativo da SAAM e o CTA.";
      badgeEl.style.background = "#F59E0B";
      badgeEl.textContent = "REVISAR";
    } else if (score <= 55) {
      resultBox.style.background = "#EFF6FF";
      resultBox.style.borderColor = "#BFDBFE";
      titleEl.style.color = "#1E40AF";
      titleEl.textContent = "🟢 APROVADO PARA PUBLICAÇÃO (51 a 55 Pontos)";
      descEl.style.color = "#1E3A8A";
      descEl.textContent = "Excelente nível de profundidade e clareza. Pronto para entrar no calendário editorial!";
      badgeEl.style.background = "#2563EB";
      badgeEl.textContent = "APROVADO";
    } else {
      resultBox.style.background = "#ECFDF5";
      resultBox.style.borderColor = "#A7F3D0";
      titleEl.style.color = "#065F46";
      titleEl.textContent = "⭐ PADRÃO SAAM GOLD (Acima de 55 Pontos)";
      descEl.style.color = "#047857";
      descEl.textContent = "Conteúdo de elite! Aprovado para publicar e recomendado para transformar em Campanha Mestre, Artigo ou Webinar.";
      badgeEl.style.background = "#059669";
      badgeEl.textContent = "SAAM GOLD";
    }
  }
}

document.querySelectorAll(".ivs-slider").forEach(slider => {
  slider.addEventListener("input", updateIVSCalculator);
});

// --- LÓGICA DO CHECKLIST DE EXCELÊNCIA ---
function updateChecklistCounter() {
  const checkboxes = document.querySelectorAll(".excel-check");
  let checkedCount = 0;
  checkboxes.forEach(ch => { if(ch.checked) checkedCount++; });
  const counterEl = document.getElementById("checklist-counter");
  if(counterEl) {
    counterEl.textContent = `${checkedCount} / ${checkboxes.length} Verificados`;
    if(checkedCount === checkboxes.length) {
      counterEl.style.background = "#ECFDF5";
      counterEl.style.color = "#059669";
      counterEl.textContent = "🏆 100% PADRÃO SAAM GOLD VERIFICADO";
    } else {
      counterEl.style.background = "#EFF6FF";
      counterEl.style.color = "#2563EB";
    }
  }
}

document.querySelectorAll(".excel-check").forEach(ch => {
  ch.addEventListener("change", updateChecklistCounter);
});

// --- LÓGICA DE TROCA DE CAPÍTULOS NO PLAYBOOK MESTRE ---
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("btn-playbook-chap")) {
    document.querySelectorAll(".btn-playbook-chap").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    const chapNum = e.target.getAttribute("data-chap");
    
    document.querySelectorAll(".chap-content-section").forEach(sec => sec.classList.remove("active"));
    const activeSec = document.getElementById(`chap-sec-${chapNum}`);
    if(activeSec) activeSec.classList.add("active");
  }
});

// --- LÓGICA DA CALCULADORA IAS (CAPÍTULO 8) ---
function updateIASCalculator() {
  let score = 0;
  for (let i = 1; i <= 5; i++) {
    const slider = document.getElementById(`ias-${i}`);
    const valDisplay = document.getElementById(`val-ias-${i}`);
    if (slider && valDisplay) {
      const val = parseInt(slider.value) || 0;
      valDisplay.textContent = val;
      score += val;
    }
  }
  
  const scoreDisplay = document.getElementById("ias-score-display");
  const resultBox = document.getElementById("ias-result-box");
  
  if (scoreDisplay) scoreDisplay.textContent = `${score} / 25`;
  if (resultBox) {
    if (score < 15) {
      resultBox.style.background = "#FEF2F2";
      resultBox.style.color = "#991B1B";
      resultBox.textContent = "🔴 AUTORIDADE BAIXA — O conteúdo não posiciona a SAAM como referência. Refaça com foco em ensinar.";
    } else if (score <= 20) {
      resultBox.style.background = "#FFFBEB";
      resultBox.style.color = "#92400E";
      resultBox.textContent = "🟡 AUTORIDADE MÉDIA — O conteúdo informa, mas precisa demonstrar mais domínio técnico e visão estratégica.";
    } else {
      resultBox.style.background = "#ECFDF5";
      resultBox.style.color = "#065F46";
      resultBox.textContent = "🏆 ALTA AUTORIDADE CONSTRUÍDA — O conteúdo posiciona a SAAM como referência em Inteligência Fiscal!";
    }
  }
}

document.querySelectorAll(".ias-slider").forEach(slider => {
  slider.addEventListener("input", updateIASCalculator);
});

// Inicializa a primeira página e renderiza
renderCalendar();
renderList();
initCloudSync();
// renderIdeasList removida daqui
showPage(pageHome);


// --- NOVA ESTRUTURA DE IDEIAS ---
window.ideasData = [
  {
    "id": "pilar-ref-1",
    "title": "1. O que muda em 2027 na prática?",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-2",
    "title": "2. Os erros que a Reforma não vai perdoar",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-3",
    "title": "3. Sua operação está preparada para o IBS?",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-4",
    "title": "4. CBS: o que ninguém está discutindo",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-5",
    "title": "5. A Reforma começa antes da lei entrar em vigor",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-6",
    "title": "6. O maior risco não está no imposto",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-7",
    "title": "7. Empresas estão olhando para o lugar errado",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-8",
    "title": "8. O impacto invisível da Reforma Tributária",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-9",
    "title": "9. O fim de vários processos fiscais atuais",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-10",
    "title": "10. Como a Reforma muda seu ERP",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-11",
    "title": "11. O novo papel do departamento fiscal",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-12",
    "title": "12. Sua equipe consegue acompanhar as mudanças?",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-13",
    "title": "13. Quanto custa não se preparar?",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-14",
    "title": "14. O maior desafio será operacional",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-15",
    "title": "15. O que muda na emissão de documentos?",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-16",
    "title": "16. O futuro da manifestação fiscal",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-17",
    "title": "17. Como evitar caos na transição",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-18",
    "title": "18. A nova rotina das empresas",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-19",
    "title": "19. Quem começa agora sai na frente",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-20",
    "title": "20. O efeito dominó da Reforma",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-21",
    "title": "21. Como reduzir riscos desde hoje",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-22",
    "title": "22. A Reforma já mudou seu planejamento",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-23",
    "title": "23. O impacto no fechamento fiscal",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-24",
    "title": "24. A nova era da conformidade",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-25",
    "title": "25. O que sua empresa precisa revisar",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-26",
    "title": "26. Cinco processos que vão mudar",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-27",
    "title": "27. O erro que milhares vão cometer",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-28",
    "title": "28. Como preparar sua equipe",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-29",
    "title": "29. Os primeiros sinais de problema",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-30",
    "title": "30. Empresas que ignorarem isso pagarão caro",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-31",
    "title": "31. O verdadeiro desafio da Reforma",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-32",
    "title": "32. O fiscal nunca mais será igual",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-33",
    "title": "33. A tecnologia será obrigatória",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-34",
    "title": "34. O fim do controle manual",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-35",
    "title": "35. A próxima fiscalização será diferente",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-36",
    "title": "36. Como criar uma operação preparada",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-37",
    "title": "37. A Reforma exige velocidade",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-38",
    "title": "38. O novo cenário tributário",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-39",
    "title": "39. Quem ainda usa planilhas corre risco",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-40",
    "title": "40. O antes e depois da Reforma",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-41",
    "title": "41. Sua empresa conseguirá acompanhar?",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-42",
    "title": "42. O futuro chegou ao fiscal",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-43",
    "title": "43. Como simplificar a adaptação",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-44",
    "title": "44. As empresas mais preparadas já começaram",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-45",
    "title": "45. O impacto na auditoria fiscal",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-46",
    "title": "46. O que revisar imediatamente",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-47",
    "title": "47. O mapa da adaptação tributária",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-48",
    "title": "48. Onde estão os maiores riscos",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-49",
    "title": "49. Como transformar obrigação em vantagem",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-ref-50",
    "title": "50. O próximo passo começa agora",
    "usageCount": 0,
    "series": "Reforma Tributária",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-51",
    "title": "1. Seu XML está realmente seguro?",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-52",
    "title": "2. O documento que pode custar milhares",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-53",
    "title": "3. Você recebe todos os XML?",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-54",
    "title": "4. O perigo das notas esquecidas",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-55",
    "title": "5. Manifestar ou assumir o risco?",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-56",
    "title": "6. Quanto custa perder um XML?",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-57",
    "title": "7. O ciclo completo do documento fiscal",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-58",
    "title": "8. Como evitar notas desconhecidas",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-59",
    "title": "9. O problema começa antes da escrituração",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-60",
    "title": "10. XML perdido, problema garantido",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-61",
    "title": "11. O que acontece quando falta um XML",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-62",
    "title": "12. Empresas ainda fazem isso manualmente",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-63",
    "title": "13. O controle que poucos possuem",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-64",
    "title": "14. Onde nascem os maiores erros fiscais",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-65",
    "title": "15. Como automatizar o recebimento",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-66",
    "title": "16. A importância da manifestação",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-67",
    "title": "17. XML não é apenas um arquivo",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-68",
    "title": "18. O risco das notas não localizadas",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-69",
    "title": "19. Como centralizar documentos fiscais",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-70",
    "title": "20. O erro invisível do departamento fiscal",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-71",
    "title": "21. Seu fornecedor enviou mesmo?",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-72",
    "title": "22. Controle fiscal começa aqui",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-73",
    "title": "23. A rotina que pode ser automatizada",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-74",
    "title": "24. O fim da busca manual",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-75",
    "title": "25. O impacto de um XML perdido",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-76",
    "title": "26. O segredo das empresas organizadas",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-77",
    "title": "27. O que fazer quando falta um documento",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-78",
    "title": "28. Auditoria começa pelo XML",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-79",
    "title": "29. Como reduzir inconsistências",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-80",
    "title": "30. Mais segurança documental",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-81",
    "title": "31. O futuro do armazenamento fiscal",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-82",
    "title": "32. Receber XML nunca foi tão importante",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-83",
    "title": "33. Você confia no seu processo?",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-84",
    "title": "34. Como evitar surpresas fiscais",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-85",
    "title": "35. O caminho do XML até a auditoria",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-86",
    "title": "36. Documentos sob controle",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-87",
    "title": "37. Gestão inteligente de XML",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-88",
    "title": "38. Erros começam na origem",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-89",
    "title": "39. O primeiro passo da conformidade",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-90",
    "title": "40. O custo da desorganização",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-91",
    "title": "41. Centralize antes que seja tarde",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-92",
    "title": "42. Sua empresa encontra qualquer XML?",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-93",
    "title": "43. O que toda empresa deveria monitorar",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-94",
    "title": "44. Automatização que gera segurança",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-95",
    "title": "45. O risco oculto dos documentos",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-96",
    "title": "46. Como ganhar produtividade",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-97",
    "title": "47. Menos buscas, mais controle",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-98",
    "title": "48. O documento que ninguém percebe",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-99",
    "title": "49. A base da inteligência fiscal",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-xml-100",
    "title": "50. O novo padrão de gestão documental",
    "usageCount": 0,
    "series": "XML e Documentos Fiscais",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-101",
    "title": "1. O SPED ainda consome horas?",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-102",
    "title": "2. Como eliminar retrabalho no SPED",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-103",
    "title": "3. O erro que trava sua entrega",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-104",
    "title": "4. O verdadeiro custo do SPED manual",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-105",
    "title": "5. SPED não precisa ser complicado",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-106",
    "title": "6. Antes de transmitir, confira isso",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-107",
    "title": "7. Como reduzir inconsistências",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-108",
    "title": "8. O impacto de uma validação",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-109",
    "title": "9. O futuro do SPED",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-110",
    "title": "10. Menos tempo, mais precisão",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-111",
    "title": "11. O PVA ainda é gargalo?",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-112",
    "title": "12. Automatização muda tudo",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-113",
    "title": "13. O segredo das entregas rápidas",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-114",
    "title": "14. Cinco erros frequentes",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-115",
    "title": "15. Como acelerar conferências",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-116",
    "title": "16. Sua equipe perde quanto tempo?",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-117",
    "title": "17. O ciclo ideal do SPED",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-118",
    "title": "18. Auditoria antes da transmissão",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-119",
    "title": "19. Evite rejeições",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-120",
    "title": "20. O fim do trabalho repetitivo",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-121",
    "title": "21. SPED inteligente",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-122",
    "title": "22. Conferência automática",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-123",
    "title": "23. A diferença entre revisar e confiar",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-124",
    "title": "24. O problema está na origem",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-125",
    "title": "25. Como reduzir riscos fiscais",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-126",
    "title": "26. Entregas sem estresse",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-127",
    "title": "27. Mais segurança na transmissão",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-128",
    "title": "28. Automatizar vale a pena?",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-129",
    "title": "29. O novo jeito de validar arquivos",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-130",
    "title": "30. O erro que ninguém vê",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-131",
    "title": "31. SPED mais rápido",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-132",
    "title": "32. Como evitar multas",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-133",
    "title": "33. O poder da robotização",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-134",
    "title": "34. Menos cliques, mais resultado",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-135",
    "title": "35. Sua rotina pode ser melhor",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-136",
    "title": "36. O tempo perdido no fiscal",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-137",
    "title": "37. Processos inteligentes",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-138",
    "title": "38. O futuro das obrigações",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-139",
    "title": "39. Como ganhar escala",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-140",
    "title": "40. O próximo nível do SPED",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-141",
    "title": "41. PVA sem sofrimento",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-142",
    "title": "42. Conferências em minutos",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-143",
    "title": "43. Automatização na prática",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-144",
    "title": "44. O ganho operacional",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-145",
    "title": "45. Erros evitáveis",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-146",
    "title": "46. Mais produtividade fiscal",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-147",
    "title": "47. Como simplificar entregas",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-148",
    "title": "48. O fiscal moderno",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-149",
    "title": "49. SPED sem retrabalho",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-spe-150",
    "title": "50. Sua operação preparada",
    "usageCount": 0,
    "series": "SPED e Obrigações Acessórias",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-151",
    "title": "1. O trabalho repetitivo acabou",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-152",
    "title": "2. Quanto custa um clique manual?",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-153",
    "title": "3. Automatizar é sobreviver",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-154",
    "title": "4. O fiscal precisa de robôs?",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-155",
    "title": "5. O futuro já chegou",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-156",
    "title": "6. Sua equipe produz ou repete?",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-157",
    "title": "7. A nova geração do departamento fiscal",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-158",
    "title": "8. IA no setor fiscal funciona?",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-159",
    "title": "9. Processos inteligentes",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-160",
    "title": "10. Menos tarefas. Mais estratégia.",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-161",
    "title": "11. Como economizar horas por semana",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-162",
    "title": "12. Automação sem complicação",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-163",
    "title": "13. O fim das rotinas repetitivas",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-164",
    "title": "14. Robôs também fazem auditoria",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-165",
    "title": "15. Como ganhar escala",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-166",
    "title": "16. A produtividade escondida",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-167",
    "title": "17. Automatização começa aqui",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-168",
    "title": "18. O tempo virou ativo",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-169",
    "title": "19. A evolução do fiscal",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-170",
    "title": "20. Empresas rápidas erram menos",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-171",
    "title": "21. Inteligência aplicada ao fiscal",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-172",
    "title": "22. O próximo passo da tecnologia",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-173",
    "title": "23. Automatizar é reduzir risco",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-174",
    "title": "24. Como eliminar gargalos",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-175",
    "title": "25. O futuro da conformidade",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-176",
    "title": "26. O fiscal estratégico",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-177",
    "title": "27. Sua operação pode acelerar",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-178",
    "title": "28. O impacto da IA",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-179",
    "title": "29. Menos operação, mais análise",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-180",
    "title": "30. Ganhe tempo todos os dias",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-181",
    "title": "31. Processos sem intervenção",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-182",
    "title": "32. O robô não esquece",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-183",
    "title": "33. O novo padrão operacional",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-184",
    "title": "34. Eficiência que aparece",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-185",
    "title": "35. Como crescer sem aumentar equipe",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-186",
    "title": "36. O segredo da escalabilidade",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-187",
    "title": "37. Automatização inteligente",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-188",
    "title": "38. Da rotina à estratégia",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-189",
    "title": "39. O fiscal conectado",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-190",
    "title": "40. Tecnologia que trabalha",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-191",
    "title": "41. O ganho invisível",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-192",
    "title": "42. Mais resultado operacional",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-193",
    "title": "43. O futuro é automático",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-194",
    "title": "44. Reduza tarefas repetidas",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-195",
    "title": "45. Eficiência começa nos processos",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-196",
    "title": "46. A empresa inteligente automatiza",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-197",
    "title": "47. O próximo nível da gestão",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-198",
    "title": "48. Como trabalhar melhor",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-199",
    "title": "49. O fiscal do futuro",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aut-200",
    "title": "50. Sua vantagem competitiva",
    "usageCount": 0,
    "series": "Automação Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-201",
    "title": "1. A auditoria começa muito antes da fiscalização",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-202",
    "title": "2. O erro que sua conferência não encontrou",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-203",
    "title": "3. O que uma auditoria revela em minutos",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-204",
    "title": "4. Sua empresa descobriria esse erro sozinha?",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-205",
    "title": "5. Pequenas inconsistências, grandes consequências",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-206",
    "title": "6. O fiscal conferiu. Mas auditou?",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-207",
    "title": "7. Onde os erros realmente aparecem",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-208",
    "title": "8. Auditoria não serve apenas para fiscalizações",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-209",
    "title": "9. Como identificar falhas antes do Fisco",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-210",
    "title": "10. O custo de confiar apenas na conferência manual",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-211",
    "title": "11. Empresas maduras auditam continuamente",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-212",
    "title": "12. A diferença entre conferir e validar",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-213",
    "title": "13. O risco escondido nos detalhes",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-214",
    "title": "14. Quanto tempo sua equipe perde revisando?",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-215",
    "title": "15. Como reduzir inconsistências antes da entrega",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-216",
    "title": "16. Auditoria preventiva vale mais que correção",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-217",
    "title": "17. O problema nem sempre está no SPED",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-218",
    "title": "18. A origem dos erros fiscais",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-219",
    "title": "19. O processo que reduz multas",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-220",
    "title": "20. A auditoria que acontece todos os dias",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-221",
    "title": "21. O que sua empresa ainda não monitora",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-222",
    "title": "22. Como criar uma cultura de validação",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-223",
    "title": "23. O verdadeiro papel da auditoria fiscal",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-224",
    "title": "24. Empresas inteligentes validam antes",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-225",
    "title": "25. A fiscalização está cada vez mais digital",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-226",
    "title": "26. A auditoria mudou completamente",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-227",
    "title": "27. O risco invisível da operação",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-228",
    "title": "28. Sua empresa identifica divergências rapidamente?",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-229",
    "title": "29. Auditoria é velocidade",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-230",
    "title": "30. O novo padrão das empresas organizadas",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-231",
    "title": "31. A prevenção custa menos",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-232",
    "title": "32. Como evitar retrabalho fiscal",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-233",
    "title": "33. A auditoria que economiza horas",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-234",
    "title": "34. Erros pequenos geram grandes impactos",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-235",
    "title": "35. Como transformar dados em segurança",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-236",
    "title": "36. Sua operação suporta uma fiscalização hoje?",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-237",
    "title": "37. A diferença está na validação",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-238",
    "title": "38. Auditoria inteligente começa aqui",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-239",
    "title": "39. Como reduzir riscos diariamente",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-240",
    "title": "40. O que os melhores departamentos fazem diferente",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-241",
    "title": "41. Não espere uma fiscalização acontecer",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-242",
    "title": "42. Sua empresa consegue provar tudo?",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-243",
    "title": "43. Auditoria automatizada faz diferença?",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-244",
    "title": "44. O controle começa antes da entrega",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-245",
    "title": "45. Como aumentar a confiabilidade fiscal",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-246",
    "title": "46. O ciclo da auditoria moderna",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-247",
    "title": "47. Empresas preparadas auditam continuamente",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-248",
    "title": "48. Como identificar padrões de erro",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-249",
    "title": "49. Auditoria virou vantagem competitiva",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-aud-250",
    "title": "50. Segurança fiscal começa na conferência",
    "usageCount": 0,
    "series": "Auditoria Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-251",
    "title": "1. Compliance fiscal não é burocracia",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-252",
    "title": "2. O risco que ninguém acompanha",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-253",
    "title": "3. Empresas organizadas pagam menos erros",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-254",
    "title": "4. O preço da falta de conformidade",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-255",
    "title": "5. O compliance começa nos processos",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-256",
    "title": "6. Sua empresa sabe onde estão os riscos?",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-257",
    "title": "7. Como construir uma operação confiável",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-258",
    "title": "8. O erro mais comum na gestão fiscal",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-259",
    "title": "9. Conformidade exige informação",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-260",
    "title": "10. O novo padrão das grandes empresas",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-261",
    "title": "11. Risco fiscal pode ser previsto",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-262",
    "title": "12. O que torna uma operação segura",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-263",
    "title": "13. Compliance virou estratégia",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-264",
    "title": "14. Como reduzir exposição fiscal",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-265",
    "title": "15. Gestão de riscos na prática",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-266",
    "title": "16. Empresas maduras monitoram constantemente",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-267",
    "title": "17. O risco mora na rotina",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-268",
    "title": "18. Quanto custa uma falha operacional?",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-269",
    "title": "19. Como antecipar problemas",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-270",
    "title": "20. Conformidade sem complicação",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-271",
    "title": "21. O fiscal moderno pensa em risco",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-272",
    "title": "22. O impacto da organização",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-273",
    "title": "23. Processos confiáveis geram tranquilidade",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-274",
    "title": "24. O primeiro passo do compliance",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-275",
    "title": "25. Segurança começa nos dados",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-276",
    "title": "26. O controle que evita problemas",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-277",
    "title": "27. Empresas resilientes fazem isso",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-278",
    "title": "28. A diferença entre cumprir e controlar",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-279",
    "title": "29. Como reduzir vulnerabilidades",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-280",
    "title": "30. O mapa dos riscos fiscais",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-281",
    "title": "31. Você monitora os indicadores certos?",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-282",
    "title": "32. O futuro do compliance",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-283",
    "title": "33. Menos reação, mais prevenção",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-284",
    "title": "34. O que pode comprometer sua operação",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-285",
    "title": "35. Compliance também gera produtividade",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-286",
    "title": "36. Como evitar surpresas fiscais",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-287",
    "title": "37. A importância da rastreabilidade",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-288",
    "title": "38. Processos sólidos evitam crises",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-289",
    "title": "39. O novo perfil do gestor fiscal",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-290",
    "title": "40. Compliance é confiança",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-291",
    "title": "41. Como fortalecer sua operação",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-292",
    "title": "42. Toda empresa tem riscos ocultos",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-293",
    "title": "43. O controle inteligente faz diferença",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-294",
    "title": "44. Gestão eficiente reduz incertezas",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-295",
    "title": "45. O próximo nível da conformidade",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-296",
    "title": "46. Empresas preparadas erram menos",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-297",
    "title": "47. Segurança operacional importa",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-298",
    "title": "48. O compliance do futuro",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-299",
    "title": "49. Risco também pode ser automatizado",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-com-300",
    "title": "50. Conformidade começa hoje",
    "usageCount": 0,
    "series": "Compliance e Gestão de Riscos",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-301",
    "title": "1. Seu ERP conversa com o fiscal?",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-302",
    "title": "2. O problema pode estar na integração",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-303",
    "title": "3. Quando sistemas não se entendem",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-304",
    "title": "4. Integração elimina retrabalho",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-305",
    "title": "5. O ERP sozinho não resolve tudo",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-306",
    "title": "6. Dados desconectados geram problemas",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-307",
    "title": "7. Como integrar sem complicação",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-308",
    "title": "8. O impacto de uma integração eficiente",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-309",
    "title": "9. Sua equipe ainda exporta planilhas?",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-310",
    "title": "10. Informação precisa circular",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-311",
    "title": "11. ERP integrado reduz erros",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-312",
    "title": "12. Quanto tempo você perde importando arquivos?",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-313",
    "title": "13. O fluxo ideal de informações",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-314",
    "title": "14. Sistemas conectados produzem mais",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-315",
    "title": "15. Integração gera produtividade",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-316",
    "title": "16. Como evitar duplicidade de dados",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-317",
    "title": "17. O custo da desconexão",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-318",
    "title": "18. O departamento fiscal precisa conversar",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-319",
    "title": "19. O futuro é integrado",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-320",
    "title": "20. Dados em tempo real fazem diferença",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-321",
    "title": "21. Menos importação manual",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-322",
    "title": "22. Como conectar toda operação",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-323",
    "title": "23. O segredo está na integração",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-324",
    "title": "24. Seu ERP entrega tudo que precisa?",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-325",
    "title": "25. Integração inteligente começa aqui",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-326",
    "title": "26. O fiscal precisa de dados confiáveis",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-327",
    "title": "27. Automatizar começa pela integração",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-328",
    "title": "28. Empresas conectadas crescem mais",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-329",
    "title": "29. O fluxo perfeito de informações",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-330",
    "title": "30. Como reduzir erros operacionais",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-331",
    "title": "31. Integrações evitam retrabalho",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-332",
    "title": "32. O caminho da informação",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-333",
    "title": "33. ERP sem integração limita resultados",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-334",
    "title": "34. Mais conexão, menos esforço",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-335",
    "title": "35. O futuro da gestão fiscal",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-336",
    "title": "36. Integração acelera processos",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-337",
    "title": "37. Como simplificar operações",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-338",
    "title": "38. A evolução dos sistemas fiscais",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-339",
    "title": "39. Dados centralizados fazem diferença",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-340",
    "title": "40. Integração gera controle",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-341",
    "title": "41. Sua empresa ainda trabalha isolada?",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-342",
    "title": "42. Conecte processos, não problemas",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-343",
    "title": "43. O fiscal precisa de integração",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-344",
    "title": "44. Menos arquivos, mais produtividade",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-345",
    "title": "45. Toda empresa deveria integrar",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-346",
    "title": "46. O impacto da automação integrada",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-347",
    "title": "47. Integração reduz riscos",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-348",
    "title": "48. Como criar um fluxo inteligente",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-349",
    "title": "49. O novo padrão operacional",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-erp-350",
    "title": "50. Tudo começa pela conexão",
    "usageCount": 0,
    "series": "ERP e Integrações",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-351",
    "title": "1. Onde seu departamento perde mais tempo?",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-352",
    "title": "2. A rotina fiscal pode ser muito mais rápida",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-353",
    "title": "3. O maior ladrão de produtividade",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-354",
    "title": "4. Como ganhar horas todos os dias",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-355",
    "title": "5. Sua equipe trabalha ou procura arquivos?",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-356",
    "title": "6. O fiscal moderno produz diferente",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-357",
    "title": "7. Menos tarefas repetidas",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-358",
    "title": "8. O segredo da alta performance fiscal",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-359",
    "title": "9. Como eliminar desperdícios operacionais",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-360",
    "title": "10. Sua rotina pode ser simplificada",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-361",
    "title": "11. O tempo virou indicador estratégico",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-362",
    "title": "12. Empresas produtivas fazem isso",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-363",
    "title": "13. A eficiência começa na organização",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-364",
    "title": "14. O fiscal precisa de processos",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-365",
    "title": "15. Como acelerar entregas",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-366",
    "title": "16. A produtividade está nos detalhes",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-367",
    "title": "17. O trabalho invisível da equipe fiscal",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-368",
    "title": "18. Quanto vale uma hora economizada?",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-369",
    "title": "19. Como reduzir atividades manuais",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-370",
    "title": "20. Mais análise, menos operação",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-371",
    "title": "21. O fiscal estratégico já mudou",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-372",
    "title": "22. Equipes produtivas seguem padrões",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-373",
    "title": "23. O impacto da automação",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-374",
    "title": "24. A rotina ideal existe",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-375",
    "title": "25. Como produzir mais sem aumentar equipe",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-376",
    "title": "26. Produtividade é previsibilidade",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-377",
    "title": "27. O novo modelo operacional",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-378",
    "title": "28. O tempo não pode ser desperdiçado",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-379",
    "title": "29. Como organizar melhor o fiscal",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-380",
    "title": "30. Empresas eficientes medem processos",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-381",
    "title": "31. Onde estão os gargalos?",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-382",
    "title": "32. O ciclo da produtividade",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-383",
    "title": "33. Processos inteligentes entregam mais",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-384",
    "title": "34. Sua equipe merece ferramentas melhores",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-385",
    "title": "35. O fiscal precisa evoluir",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-386",
    "title": "36. Como reduzir tempo operacional",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-387",
    "title": "37. A rotina pode ser diferente",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-388",
    "title": "38. O novo perfil das equipes fiscais",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-389",
    "title": "39. Produtividade gera segurança",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-390",
    "title": "40. Como eliminar tarefas repetitivas",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-391",
    "title": "41. O futuro do departamento fiscal",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-392",
    "title": "42. Mais velocidade, menos esforço",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-393",
    "title": "43. A eficiência está nos processos",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-394",
    "title": "44. Equipes inteligentes automatizam",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-395",
    "title": "45. O impacto da organização",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-396",
    "title": "46. Como transformar produtividade em resultado",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-397",
    "title": "47. O fiscal nunca teve tanta tecnologia",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-398",
    "title": "48. O próximo passo da eficiência",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-399",
    "title": "49. Sua equipe pode produzir muito mais",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-pro-400",
    "title": "50. A evolução começa hoje",
    "usageCount": 0,
    "series": "Produtividade do Departamento Fiscal",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-401",
    "title": "1. Dados fiscais também contam histórias",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-402",
    "title": "2. Sua empresa mede o que realmente importa?",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-403",
    "title": "3. O indicador que falta no seu departamento fiscal",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-404",
    "title": "4. Informação sem análise não gera resultado",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-405",
    "title": "5. Como transformar dados em decisões",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-406",
    "title": "6. O novo combustível da área fiscal",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-407",
    "title": "7. Empresas inteligentes analisam antes de agir",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-408",
    "title": "8. Quanto vale um dado confiável?",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-409",
    "title": "9. O fiscal deixou de ser operacional",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-410",
    "title": "10. Os números revelam muito mais",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-411",
    "title": "11. O futuro pertence às empresas orientadas por dados",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-412",
    "title": "12. Seu dashboard responde as perguntas certas?",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-413",
    "title": "13. Decidir sem dados custa caro",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-414",
    "title": "14. A diferença entre enxergar e interpretar",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-415",
    "title": "15. O poder escondido nos indicadores fiscais",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-416",
    "title": "16. Sua empresa conhece seus próprios números?",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-417",
    "title": "17. Dados fiscais podem prever problemas",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-418",
    "title": "18. Como criar uma gestão baseada em evidências",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-419",
    "title": "19. O fiscal virou centro estratégico",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-420",
    "title": "20. O que seus indicadores estão escondendo",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-421",
    "title": "21. Inteligência começa com informação organizada",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-422",
    "title": "22. A decisão mais importante começa nos dados",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-423",
    "title": "23. Como enxergar oportunidades invisíveis",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-424",
    "title": "24. Os KPIs que todo gestor deveria acompanhar",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-425",
    "title": "25. O fiscal pode prever riscos?",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-426",
    "title": "26. Mais dados não significam mais controle",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-427",
    "title": "27. Empresas de alta performance medem tudo",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-428",
    "title": "28. A inteligência está na interpretação",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-429",
    "title": "29. Como transformar relatórios em ação",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-430",
    "title": "30. O departamento fiscal precisa de BI?",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-431",
    "title": "31. Dados confiáveis aceleram decisões",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-432",
    "title": "32. Os melhores gestores acompanham estes indicadores",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-433",
    "title": "33. A nova linguagem da gestão fiscal",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-434",
    "title": "34. O valor estratégico da informação",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-435",
    "title": "35. Como reduzir incertezas usando dados",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-436",
    "title": "36. O mapa da performance fiscal",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-437",
    "title": "37. O painel que muda decisões",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-438",
    "title": "38. O fiscal orientado por indicadores",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-439",
    "title": "39. Sua empresa mede produtividade fiscal?",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-440",
    "title": "40. O dado certo economiza horas",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-441",
    "title": "41. Como antecipar tendências fiscais",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-442",
    "title": "42. Inteligência também é velocidade",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-443",
    "title": "43. Dados conectados geram vantagem",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-444",
    "title": "44. O próximo passo da gestão fiscal",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-445",
    "title": "45. O que um dashboard realmente deveria mostrar",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-446",
    "title": "46. Indicadores que fazem diferença",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-447",
    "title": "47. O fiscal analítico supera o operacional",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-448",
    "title": "48. O futuro da inteligência tributária",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-449",
    "title": "49. Empresas crescem quando entendem seus dados",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-int-450",
    "title": "50. Informação estratégica gera vantagem competitiva",
    "usageCount": 0,
    "series": "Inteligência Fiscal, Dados e Analytics",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-451",
    "title": "1. O que acontece antes de uma atualização do SAAM",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-452",
    "title": "2. Como nasce uma funcionalidade no SAAM",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-453",
    "title": "3. Bastidores de quem vive o fiscal todos os dias",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-454",
    "title": "4. O que aprendemos ouvindo milhares de usuários",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-455",
    "title": "5. Os desafios que inspiram nossas soluções",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-456",
    "title": "6. A tecnologia por trás da inteligência fiscal",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-457",
    "title": "7. Um dia dentro da equipe SAAM",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-458",
    "title": "8. Como pensamos cada atualização",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-459",
    "title": "9. O compromisso que existe por trás de cada versão",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-460",
    "title": "10. O que move nossa equipe diariamente",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-461",
    "title": "11. Desenvolver para o fiscal é diferente",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-462",
    "title": "12. A rotina que ninguém vê",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-463",
    "title": "13. O trabalho que acontece antes da entrega",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-464",
    "title": "14. Como transformamos sugestões em melhorias",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-465",
    "title": "15. O que significa inovar no setor fiscal",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-466",
    "title": "16. A evolução do SAAM ao longo dos anos",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-467",
    "title": "17. Por que ouvimos nossos clientes primeiro",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-468",
    "title": "18. As decisões que fazem diferença",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-469",
    "title": "19. Como garantimos qualidade em cada atualização",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-470",
    "title": "20. O fiscal muda. Nós evoluímos junto.",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-471",
    "title": "21. Conheça quem constrói o SAAM",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-472",
    "title": "22. O processo por trás da inovação",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-473",
    "title": "23. Como funciona nosso desenvolvimento",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-474",
    "title": "24. Cada melhoria começa com um problema real",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-475",
    "title": "25. O que aprendemos com nossos clientes",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-476",
    "title": "26. A história por trás da tecnologia",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-477",
    "title": "27. Como transformamos desafios em soluções",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-478",
    "title": "28. O diferencial não está apenas no software",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-479",
    "title": "29. Pessoas desenvolvendo tecnologia para pessoas",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-480",
    "title": "30. O compromisso diário com a evolução",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-481",
    "title": "31. O que significa inteligência fiscal para nós",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-482",
    "title": "32. A visão que guia cada decisão",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-483",
    "title": "33. O mercado mudou. Nós também.",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-484",
    "title": "34. Nossa missão vai além do software",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-485",
    "title": "35. O que faz uma empresa inovar continuamente",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-486",
    "title": "36. O futuro está sendo construído agora",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-487",
    "title": "37. Cada atualização tem um propósito",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-488",
    "title": "38. Como evoluímos junto com a legislação",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-489",
    "title": "39. O conhecimento por trás da tecnologia",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-490",
    "title": "40. O valor de escutar quem usa",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-491",
    "title": "41. O que existe por trás da tela",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-492",
    "title": "42. A cultura que impulsiona inovação",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-493",
    "title": "43. O SAAM visto por dentro",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-494",
    "title": "44. Como pensamos a experiência do usuário",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-495",
    "title": "45. Da necessidade à solução",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-496",
    "title": "46. A inovação nasce dos detalhes",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-497",
    "title": "47. Mais do que software, conhecimento",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-498",
    "title": "48. O compromisso com a excelência fiscal",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-499",
    "title": "49. Construindo o futuro da gestão tributária",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-bas-500",
    "title": "50. Nossa maior inovação ainda está por vir",
    "usageCount": 0,
    "series": "Bastidores e Posicionamento da SAAM",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-501",
    "title": "1. O departamento fiscal deixou de ser suporte",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-502",
    "title": "2. O fiscal pode liderar decisões estratégicas",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-503",
    "title": "3. Empresas competitivas valorizam o setor fiscal",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-504",
    "title": "4. Gestão fiscal é vantagem competitiva",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-505",
    "title": "5. O papel do fiscal mudou para sempre",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-506",
    "title": "6. O futuro pertence aos gestores estratégicos",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-507",
    "title": "7. Como transformar o fiscal em centro de inteligência",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-508",
    "title": "8. O impacto da gestão fiscal nos resultados",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-509",
    "title": "9. Estratégia também passa pelo fiscal",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-510",
    "title": "10. O gestor fiscal do futuro",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-511",
    "title": "11. Decisões inteligentes começam no fiscal",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-512",
    "title": "12. O valor estratégico da conformidade",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-513",
    "title": "13. Sua empresa aproveita todo o potencial do fiscal?",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-514",
    "title": "14. O fiscal pode impulsionar crescimento",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-515",
    "title": "15. Liderança fiscal faz diferença",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-516",
    "title": "16. Como criar uma operação preparada",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-517",
    "title": "17. O novo perfil do gestor tributário",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-518",
    "title": "18. Gestão eficiente reduz desperdícios",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-519",
    "title": "19. O fiscal como aliado da diretoria",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-520",
    "title": "20. Empresas líderes investem em inteligência",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-521",
    "title": "21. O que separa operações maduras",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-522",
    "title": "22. Como tornar o fiscal protagonista",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-523",
    "title": "23. O impacto das decisões preventivas",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-524",
    "title": "24. O setor fiscal precisa inovar",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-525",
    "title": "25. O futuro exige visão estratégica",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-526",
    "title": "26. Processos estratégicos geram resultados",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-527",
    "title": "27. A maturidade começa na gestão",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-528",
    "title": "28. O fiscal nunca foi tão importante",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-529",
    "title": "29. Como evoluir sua operação",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-530",
    "title": "30. Estratégia reduz riscos",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-531",
    "title": "31. Empresas fortes têm gestão forte",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-532",
    "title": "32. O fiscal como gerador de valor",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-533",
    "title": "33. Liderança baseada em dados",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-534",
    "title": "34. O próximo nível da gestão tributária",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-535",
    "title": "35. Gestão moderna exige tecnologia",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-536",
    "title": "36. Como construir vantagem operacional",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-537",
    "title": "37. Planejamento reduz incertezas",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-538",
    "title": "38. A gestão começa antes da obrigação",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-539",
    "title": "39. O novo cenário da liderança fiscal",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-540",
    "title": "40. O fiscal conectado ao negócio",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-541",
    "title": "41. Como crescer com segurança",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-542",
    "title": "42. Gestão inteligente gera previsibilidade",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-543",
    "title": "43. Empresas preparadas antecipam mudanças",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-544",
    "title": "44. O futuro pertence aos organizados",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-545",
    "title": "45. O fiscal estratégico entrega mais valor",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-546",
    "title": "46. A operação ideal existe",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-547",
    "title": "47. Como preparar sua empresa para os próximos anos",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-548",
    "title": "48. Gestão eficiente começa nos processos",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-549",
    "title": "49. O diferencial competitivo está na organização",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-ges-550",
    "title": "50. A nova era da gestão fiscal",
    "usageCount": 0,
    "series": "Gestão Fiscal Estratégica",
    "audience": "Externo"
  },
  {
    "id": "pilar-atu-551",
    "title": "* Novidades da versão desta semana",
    "usageCount": 0,
    "series": "Atualizações do SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-atu-552",
    "title": "* O que mudou nesta atualização",
    "usageCount": 0,
    "series": "Atualizações do SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-atu-553",
    "title": "* Funcionalidade que acabou de chegar",
    "usageCount": 0,
    "series": "Atualizações do SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-atu-554",
    "title": "* Melhorias sugeridas pelos clientes",
    "usageCount": 0,
    "series": "Atualizações do SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-atu-555",
    "title": "* Correções implementadas",
    "usageCount": 0,
    "series": "Atualizações do SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-atu-556",
    "title": "* O que foi otimizado",
    "usageCount": 0,
    "series": "Atualizações do SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-atu-557",
    "title": "* Recursos pouco conhecidos",
    "usageCount": 0,
    "series": "Atualizações do SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-atu-558",
    "title": "* Próximas novidades",
    "usageCount": 0,
    "series": "Atualizações do SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-atu-559",
    "title": "* Evolução da plataforma",
    "usageCount": 0,
    "series": "Atualizações do SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-atu-560",
    "title": "* Roadmap do SAAM",
    "usageCount": 0,
    "series": "Atualizações do SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-dic-561",
    "title": "* Você usa essa função?",
    "usageCount": 0,
    "series": "Dicas de Utilização",
    "audience": "Interno"
  },
  {
    "id": "pilar-dic-562",
    "title": "* 3 minutos que economizam 2 horas",
    "usageCount": 0,
    "series": "Dicas de Utilização",
    "audience": "Interno"
  },
  {
    "id": "pilar-dic-563",
    "title": "* Atalho escondido no SAAM",
    "usageCount": 0,
    "series": "Dicas de Utilização",
    "audience": "Interno"
  },
  {
    "id": "pilar-dic-564",
    "title": "* Configuração recomendada",
    "usageCount": 0,
    "series": "Dicas de Utilização",
    "audience": "Interno"
  },
  {
    "id": "pilar-dic-565",
    "title": "* Como automatizar essa rotina",
    "usageCount": 0,
    "series": "Dicas de Utilização",
    "audience": "Interno"
  },
  {
    "id": "pilar-dic-566",
    "title": "* Recursos esquecidos",
    "usageCount": 0,
    "series": "Dicas de Utilização",
    "audience": "Interno"
  },
  {
    "id": "pilar-dic-567",
    "title": "* Como ganhar velocidade",
    "usageCount": 0,
    "series": "Dicas de Utilização",
    "audience": "Interno"
  },
  {
    "id": "pilar-dic-568",
    "title": "* Ajustes inteligentes",
    "usageCount": 0,
    "series": "Dicas de Utilização",
    "audience": "Interno"
  },
  {
    "id": "pilar-dic-569",
    "title": "* Erros comuns de configuração",
    "usageCount": 0,
    "series": "Dicas de Utilização",
    "audience": "Interno"
  },
  {
    "id": "pilar-dic-570",
    "title": "* Melhores práticas",
    "usageCount": 0,
    "series": "Dicas de Utilização",
    "audience": "Interno"
  },
  {
    "id": "pilar-aca-571",
    "title": "* Aula rápida",
    "usageCount": 0,
    "series": "Academia SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-aca-572",
    "title": "* Minuto Fiscal",
    "usageCount": 0,
    "series": "Academia SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-aca-573",
    "title": "* Dica da Semana",
    "usageCount": 0,
    "series": "Academia SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-aca-574",
    "title": "* Glossário Fiscal",
    "usageCount": 0,
    "series": "Academia SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-aca-575",
    "title": "* Como interpretar um erro",
    "usageCount": 0,
    "series": "Academia SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-aca-576",
    "title": "* O que significa esse aviso",
    "usageCount": 0,
    "series": "Academia SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-aca-577",
    "title": "* Como validar informações",
    "usageCount": 0,
    "series": "Academia SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-aca-578",
    "title": "* Sequência ideal da rotina",
    "usageCount": 0,
    "series": "Academia SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-aca-579",
    "title": "* Passo a passo",
    "usageCount": 0,
    "series": "Academia SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-aca-580",
    "title": "* Tutorial em vídeo",
    "usageCount": 0,
    "series": "Academia SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-ref-581",
    "title": "* Como fazer no SAAM",
    "usageCount": 0,
    "series": "Reforma Tributária no SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-ref-582",
    "title": "* Onde fica essa rotina",
    "usageCount": 0,
    "series": "Reforma Tributária no SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-ref-583",
    "title": "* O que muda dentro do sistema",
    "usageCount": 0,
    "series": "Reforma Tributária no SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-ref-584",
    "title": "* Novos parâmetros",
    "usageCount": 0,
    "series": "Reforma Tributária no SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-ref-585",
    "title": "* Como preparar sua empresa",
    "usageCount": 0,
    "series": "Reforma Tributária no SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-ref-586",
    "title": "* Demonstração prática",
    "usageCount": 0,
    "series": "Reforma Tributária no SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-ref-587",
    "title": "* Configuração recomendada",
    "usageCount": 0,
    "series": "Reforma Tributária no SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-ref-588",
    "title": "* Perguntas frequentes",
    "usageCount": 0,
    "series": "Reforma Tributária no SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-ref-589",
    "title": "* Casos reais",
    "usageCount": 0,
    "series": "Reforma Tributária no SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-ref-590",
    "title": "* Checklist",
    "usageCount": 0,
    "series": "Reforma Tributária no SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-boa-591",
    "title": "* Checklist diário",
    "usageCount": 0,
    "series": "Boas Práticas Operacionais",
    "audience": "Interno"
  },
  {
    "id": "pilar-boa-592",
    "title": "* Checklist semanal",
    "usageCount": 0,
    "series": "Boas Práticas Operacionais",
    "audience": "Interno"
  },
  {
    "id": "pilar-boa-593",
    "title": "* Checklist mensal",
    "usageCount": 0,
    "series": "Boas Práticas Operacionais",
    "audience": "Interno"
  },
  {
    "id": "pilar-boa-594",
    "title": "* Rotinas antes do fechamento",
    "usageCount": 0,
    "series": "Boas Práticas Operacionais",
    "audience": "Interno"
  },
  {
    "id": "pilar-boa-595",
    "title": "* Organização dos XML",
    "usageCount": 0,
    "series": "Boas Práticas Operacionais",
    "audience": "Interno"
  },
  {
    "id": "pilar-boa-596",
    "title": "* Validação do SPED",
    "usageCount": 0,
    "series": "Boas Práticas Operacionais",
    "audience": "Interno"
  },
  {
    "id": "pilar-boa-597",
    "title": "* Conferências importantes",
    "usageCount": 0,
    "series": "Boas Práticas Operacionais",
    "audience": "Interno"
  },
  {
    "id": "pilar-boa-598",
    "title": "* Backup",
    "usageCount": 0,
    "series": "Boas Práticas Operacionais",
    "audience": "Interno"
  },
  {
    "id": "pilar-boa-599",
    "title": "* Organização fiscal",
    "usageCount": 0,
    "series": "Boas Práticas Operacionais",
    "audience": "Interno"
  },
  {
    "id": "pilar-boa-600",
    "title": "* Fluxo ideal",
    "usageCount": 0,
    "series": "Boas Práticas Operacionais",
    "audience": "Interno"
  },
  {
    "id": "pilar-cas-601",
    "title": "* Cliente da semana",
    "usageCount": 0,
    "series": "Casos de Sucesso",
    "audience": "Interno"
  },
  {
    "id": "pilar-cas-602",
    "title": "* Antes e depois",
    "usageCount": 0,
    "series": "Casos de Sucesso",
    "audience": "Interno"
  },
  {
    "id": "pilar-cas-603",
    "title": "* Como reduziram horas",
    "usageCount": 0,
    "series": "Casos de Sucesso",
    "audience": "Interno"
  },
  {
    "id": "pilar-cas-604",
    "title": "* Como eliminaram retrabalho",
    "usageCount": 0,
    "series": "Casos de Sucesso",
    "audience": "Interno"
  },
  {
    "id": "pilar-cas-605",
    "title": "* História de sucesso",
    "usageCount": 0,
    "series": "Casos de Sucesso",
    "audience": "Interno"
  },
  {
    "id": "pilar-cas-606",
    "title": "* Depoimento",
    "usageCount": 0,
    "series": "Casos de Sucesso",
    "audience": "Interno"
  },
  {
    "id": "pilar-cas-607",
    "title": "* Indicadores alcançados",
    "usageCount": 0,
    "series": "Casos de Sucesso",
    "audience": "Interno"
  },
  {
    "id": "pilar-cas-608",
    "title": "* Resultado obtido",
    "usageCount": 0,
    "series": "Casos de Sucesso",
    "audience": "Interno"
  },
  {
    "id": "pilar-cas-609",
    "title": "* Processo melhorado",
    "usageCount": 0,
    "series": "Casos de Sucesso",
    "audience": "Interno"
  },
  {
    "id": "pilar-cas-610",
    "title": "* Evolução do cliente",
    "usageCount": 0,
    "series": "Casos de Sucesso",
    "audience": "Interno"
  },
  {
    "id": "pilar-sup-611",
    "title": "* Conheça nosso suporte",
    "usageCount": 0,
    "series": "Suporte Humanizado",
    "audience": "Interno"
  },
  {
    "id": "pilar-sup-612",
    "title": "* Quem respondeu você hoje",
    "usageCount": 0,
    "series": "Suporte Humanizado",
    "audience": "Interno"
  },
  {
    "id": "pilar-sup-613",
    "title": "* Bastidores",
    "usageCount": 0,
    "series": "Suporte Humanizado",
    "audience": "Interno"
  },
  {
    "id": "pilar-sup-614",
    "title": "* Como funciona o atendimento",
    "usageCount": 0,
    "series": "Suporte Humanizado",
    "audience": "Interno"
  },
  {
    "id": "pilar-sup-615",
    "title": "* Tempo médio de resposta",
    "usageCount": 0,
    "series": "Suporte Humanizado",
    "audience": "Interno"
  },
  {
    "id": "pilar-sup-616",
    "title": "* Equipe especializada",
    "usageCount": 0,
    "series": "Suporte Humanizado",
    "audience": "Interno"
  },
  {
    "id": "pilar-sup-617",
    "title": "* Curiosidades",
    "usageCount": 0,
    "series": "Suporte Humanizado",
    "audience": "Interno"
  },
  {
    "id": "pilar-sup-618",
    "title": "* Nosso processo",
    "usageCount": 0,
    "series": "Suporte Humanizado",
    "audience": "Interno"
  },
  {
    "id": "pilar-sup-619",
    "title": "* Como abrir chamados",
    "usageCount": 0,
    "series": "Suporte Humanizado",
    "audience": "Interno"
  },
  {
    "id": "pilar-sup-620",
    "title": "* Dicas do suporte",
    "usageCount": 0,
    "series": "Suporte Humanizado",
    "audience": "Interno"
  },
  {
    "id": "pilar-com-621",
    "title": "* Cliente destaque",
    "usageCount": 0,
    "series": "Comunidade SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-com-622",
    "title": "* Empresas que utilizam SAAM",
    "usageCount": 0,
    "series": "Comunidade SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-com-623",
    "title": "* Eventos",
    "usageCount": 0,
    "series": "Comunidade SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-com-624",
    "title": "* Lives exclusivas",
    "usageCount": 0,
    "series": "Comunidade SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-com-625",
    "title": "* Webinars",
    "usageCount": 0,
    "series": "Comunidade SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-com-626",
    "title": "* Grupo VIP",
    "usageCount": 0,
    "series": "Comunidade SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-com-627",
    "title": "* Enquetes",
    "usageCount": 0,
    "series": "Comunidade SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-com-628",
    "title": "* Perguntas frequentes",
    "usageCount": 0,
    "series": "Comunidade SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-com-629",
    "title": "* Espaço para sugestões",
    "usageCount": 0,
    "series": "Comunidade SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-com-630",
    "title": "* Novidades da comunidade",
    "usageCount": 0,
    "series": "Comunidade SAAM",
    "audience": "Interno"
  },
  {
    "id": "pilar-pro-631",
    "title": "* Automatize essa rotina",
    "usageCount": 0,
    "series": "Produtividade Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-pro-632",
    "title": "* Pare de fazer isso manualmente",
    "usageCount": 0,
    "series": "Produtividade Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-pro-633",
    "title": "* Faça em poucos cliques",
    "usageCount": 0,
    "series": "Produtividade Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-pro-634",
    "title": "* Ative essa configuração",
    "usageCount": 0,
    "series": "Produtividade Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-pro-635",
    "title": "* Ganhe tempo",
    "usageCount": 0,
    "series": "Produtividade Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-pro-636",
    "title": "* Reduza etapas",
    "usageCount": 0,
    "series": "Produtividade Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-pro-637",
    "title": "* Mais velocidade",
    "usageCount": 0,
    "series": "Produtividade Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-pro-638",
    "title": "* Organização inteligente",
    "usageCount": 0,
    "series": "Produtividade Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-pro-639",
    "title": "* Como simplificar",
    "usageCount": 0,
    "series": "Produtividade Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-pro-640",
    "title": "* Dica rápida",
    "usageCount": 0,
    "series": "Produtividade Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-int-641",
    "title": "* Tendências fiscais",
    "usageCount": 0,
    "series": "Inteligência Fiscal Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-int-642",
    "title": "* Mudanças na legislação",
    "usageCount": 0,
    "series": "Inteligência Fiscal Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-int-643",
    "title": "* Como interpretar novas regras",
    "usageCount": 0,
    "series": "Inteligência Fiscal Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-int-644",
    "title": "* Alertas importantes",
    "usageCount": 0,
    "series": "Inteligência Fiscal Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-int-645",
    "title": "* Planejamento fiscal",
    "usageCount": 0,
    "series": "Inteligência Fiscal Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-int-646",
    "title": "* Gestão baseada em indicadores",
    "usageCount": 0,
    "series": "Inteligência Fiscal Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-int-647",
    "title": "* Dicas para gestores",
    "usageCount": 0,
    "series": "Inteligência Fiscal Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-int-648",
    "title": "* Indicadores estratégicos",
    "usageCount": 0,
    "series": "Inteligência Fiscal Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-int-649",
    "title": "* Como reduzir riscos",
    "usageCount": 0,
    "series": "Inteligência Fiscal Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-int-650",
    "title": "* Cenários futuros",
    "usageCount": 0,
    "series": "Inteligência Fiscal Interna",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-651",
    "title": "* A dica da semana do CEO",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-652",
    "title": "* Bastidores do desenvolvimento",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-653",
    "title": "* Funcionalidade antes do lançamento",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-654",
    "title": "* Vote na próxima melhoria",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-655",
    "title": "* Calendário fiscal do mês",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-656",
    "title": "* Materiais exclusivos",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-657",
    "title": "* Templates",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-658",
    "title": "* Checklists",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-659",
    "title": "* Planilhas",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-660",
    "title": "* Guias práticos",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-661",
    "title": "* Modelos prontos",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-662",
    "title": "* Biblioteca fiscal",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-663",
    "title": "* Perguntas respondidas por especialistas",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-664",
    "title": "* Convites antecipados para eventos",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  },
  {
    "id": "pilar-clu-665",
    "title": "* Conteúdo exclusivo para clientes",
    "usageCount": 0,
    "series": "Clube SAAM Premium",
    "audience": "Interno"
  }
];

window.currentGeralTheme = 'Todos';

window.switchIdeasTab = function(tab) {
  document.getElementById('tab-btn-mes').classList.remove('active');
  document.getElementById('tab-btn-geral').classList.remove('active');
  document.getElementById('view-ideias-mes').classList.add('hidden');
  document.getElementById('view-ideias-geral').classList.add('hidden');
  
  document.getElementById('tab-btn-' + tab).classList.add('active');
  document.getElementById('view-ideias-' + tab).classList.remove('hidden');
  
  if (tab === 'mes' && typeof renderIdeasStrategy === 'function') {
    renderIdeasStrategy();
  }
};

window.filterGeral = function(theme) {
  window.currentGeralTheme = theme;
  const pills = document.querySelectorAll('#ideias-pills-container .filter-pill');
  pills.forEach(p => p.classList.remove('active'));
  
  // Encontra a pill pelo texto (forma simples)
  pills.forEach(p => {
    if(p.textContent.includes(theme)) p.classList.add('active');
  });
  
  document.getElementById('geral-theme-title').textContent = theme;
  renderIdeiasGeral();
};

window.renderIdeasList = function() {
  // Substitui a função renderIdeasList original para renderizar as duas views simultaneamente.
  renderIdeiasMes();
  renderIdeiasGeral();
};

function renderIdeiasMes() {
  const listLeads = document.getElementById('ideias-list-leads');
  const listBase = document.getElementById('ideias-list-base');
  if(!listLeads || !listBase) return;
  
  let htmlLeads = '';
  let htmlBase = '';
  let countLeads = 1;
  let countBase = 1;
  
  window.ideasData.forEach(idea => {
    if(idea.funnel === "Leads") {
      htmlLeads += createRowCardHTML(idea, countLeads++);
    } else if(idea.funnel === "Base") {
      htmlBase += createRowCardHTML(idea, countBase++);
    }
  });
  
  listLeads.innerHTML = htmlLeads;
  listBase.innerHTML = htmlBase;
}

function createRowCardHTML(idea, index) {
  const idxStr = index.toString().padStart(2, '0');
  const borderColor = idea.funnel === 'Leads' ? '#3B82F6' : '#10B981';
  const scoreColor = idea.funnel === 'Leads' ? '#3B82F6' : '#10B981';
  const scoreBg = idea.funnel === 'Leads' ? '#EFF6FF' : '#ECFDF5';
  
  const usageCount = posts.filter(p => p.ideaId == idea.id).length;
  const badgeHtml = usageCount > 0 
    ? '<span style="background: #FFFBEB; color: #D97706; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 800; border: 1px solid #FEF3C7;">Usado ' + usageCount + 'x</span>'
    : '';

  return `
    <div class="idea-row-card">
      <div style="font-size: 12px; font-weight: 700; color: #94A3B8; width: 24px;">${idxStr}</div>
      <div style="flex: 1;">
        <span style="font-size: 10px; font-weight: 800; color: ${borderColor}; letter-spacing: 0.5px;">${idea.tag}</span>
        <h5 style="margin: 4px 0; font-size: 15px; color: #0F172A;">${idea.title}</h5>
        <span style="font-size: 11px; color: #64748B;">Hook: "${idea.hook}"</span>
        <div style="margin-top: 10px; display: flex; align-items: center; gap: 8px;">
          <span style="background: #0F172A; color: #FFF; font-size: 9px; padding: 2px 6px; border-radius: 4px; font-weight: 800;">DESTINO</span>
          <span style="font-size: 11px; color: #475569;">${idea.destiny}</span>
          ${badgeHtml}
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid ${scoreBg}; display: flex; flex-direction: column; align-items: center; justify-content: center; color: ${scoreColor};">
          <span style="font-size: 13px; font-weight: 800; line-height: 1;">${idea.score}</span>
          <span style="font-size: 7px; font-weight: 800;">SCORE</span>
        </div>
        <button onclick="planejarIdeia(${idea.id})" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid #E2E8F0; background: #FFF; color: #475569; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
    </div>
  `;
}

window.renderIdeiasGeral = function() {
  const container = document.getElementById('ideias-grid-geral');
  const searchEl = document.getElementById('search-ideias-geral');
  const countEl = document.getElementById('geral-theme-count');
  if(!container) return;
  
  const term = searchEl ? searchEl.value.toLowerCase() : '';
  
  let filtered = window.ideasData.filter(idea => {
    let matchTheme = window.currentGeralTheme === 'Todos' || idea.series === window.currentGeralTheme;
    let matchAudience = window.currentAudience === 'Todos' || idea.audience === window.currentAudience;
    let matchTerm = !term || 
      idea.title.toLowerCase().includes(term) || 
      idea.series.toLowerCase().includes(term) || 
      idea.destiny.toLowerCase().includes(term);
      
    const routineEl = document.getElementById('filter-routine-geral');
    const routineTerm = routineEl ? routineEl.value : '';
    let matchRoutine = !routineTerm || idea.routine === routineTerm;
    
    return matchTheme && matchAudience && matchTerm && matchRoutine;
  });

  countEl.textContent = filtered.length + ' ideias';
  const countTodos = document.getElementById('count-todos-ideias');
  if(countTodos) countTodos.textContent = window.ideasData.length;
  
  let html = '';
  filtered.forEach((idea, index) => {
    const idxStr = (index+1).toString().padStart(2, '0');
    const tagColor = idea.series === 'Reforma Tributária' ? '#EA580C' : 
                     idea.series === 'Captura e Organização' ? '#033059' :
                     idea.series === 'SPED Fiscal' ? '#26428B' :
                     idea.series === 'Cruzamento de Dados' ? '#3F77C1' : '#10B981';
    
    const usageCount = posts.filter(p => p.ideaId == idea.id).length;
    const badgeHtml = usageCount > 0 
      ? '<span style="background: #FFFBEB; color: #D97706; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 800; border: 1px solid #FEF3C7; margin-left: 8px;">Usado ' + usageCount + 'x</span>'
      : '';

    // Strip leading numbers from the title
    const cleanTitle = idea.title.replace(/^\d+\.\s*/, '');
    const ideaTag = idea.series || "Ideia";
    const ideaDestiny = idea.audience === 'Interno' ? 'Interno' : 'Redes Sociais';
    
    // Resolve dynamic briefing and copy
    const dynamicDetails = getIdeaCopyAndBriefing(idea);

    html += `
      <div class="idea-modern-card" style="cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); border: 1px solid #E2E8F0; padding: 22px; border-radius: 16px; background: #FFFFFF; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);" onclick="toggleIdeaAccordion(event, 'idea-body-${idea.id}')" onmouseover="this.style.boxShadow='0 12px 20px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)'; this.style.borderColor='#26428B'; this.style.transform='translateY(-2px)';" onmouseout="this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.03)'; this.style.borderColor='#E2E8F0'; this.style.transform='translateY(0)';" title="Clique para expandir o briefing">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 13px; font-weight: 800; color: #94A3B8; font-family: 'Roboto', sans-serif;">${idxStr}</span>
            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${tagColor};"></div>
          </div>
          <span style="font-size: 11px; font-weight: 800; color: ${tagColor}; letter-spacing: 0.5px; text-transform: uppercase; font-family: 'Roboto', sans-serif; display: block; margin-bottom: 8px;">${ideaTag}</span>
          <h4 style="margin: 0; font-size: 17px; color: #0A1C2D; font-weight: 800; line-height: 1.4; font-family: 'Outfit', sans-serif;">${cleanTitle}</h4>
          
          <!-- Expandable Briefing Drawer -->
          <div id="idea-body-${idea.id}" class="idea-body-drawer" style="display: none; margin-top: 16px; border-top: 1px solid var(--hairline); padding-top: 16px;" onclick="event.stopPropagation();">
            <div style="margin-bottom: 12px;">
              <strong style="font-size: 11.5px; color: #26428B; text-transform: uppercase; display: block; margin-bottom: 4px; font-family: 'Roboto', sans-serif;">🎯 Mini Briefing:</strong>
              <p style="margin: 0; font-size: 13px; color: #0A1C2D; line-height: 1.5; font-family: 'Poppins', sans-serif;">${dynamicDetails.briefing}</p>
            </div>
            <div style="background: #FFFBF7; border-left: 4px solid #26428B; padding: 12px; border-radius: 8px; border: 1px solid #FBECD7;">
              <strong style="font-size: 11.5px; color: #26428B; text-transform: uppercase; display: block; margin-bottom: 4px; font-family: 'Roboto', sans-serif;">💬 Como poderia ser falado:</strong>
              <p style="margin: 0; font-size: 13px; color: #033059; line-height: 1.5; font-family: 'Poppins', sans-serif; font-style: italic;">"${dynamicDetails.copy}"</p>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 18px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #F1F5F9; padding-top: 14px;" class="idea-footer" onclick="event.stopPropagation();">
          <div>
             <span style="display: block; font-size: 9px; font-weight: 800; color: #64748B; letter-spacing: 0.5px; text-transform: uppercase; font-family: 'Roboto', sans-serif;">PÚBLICO-ALVO</span>
             <div style="display: flex; align-items: center; margin-top: 2px;">
               <span style="font-size: 12px; font-weight: 700; color: #0A1C2D; font-family: 'Poppins', sans-serif;">${ideaDestiny}</span>
               ${badgeHtml}
             </div>
          </div>
          <button onclick="planejarIdeia('${idea.id}')" style="background: none; border: none; color: #26428B; font-size: 13px; font-weight: 800; display: flex; align-items: center; gap: 4px; cursor: pointer; font-family: 'Roboto', sans-serif;">
            Planejar <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>
    `;
  });
  if (filtered.length === 0) {
    html = '<p style="color: #64748B;">Nenhuma ideia encontrada.</p>';
  }
  
  container.innerHTML = html;
}

// Inicializa a renderização quando o arquivo carrega
setTimeout(() => { renderIdeasList(); }, 500);

window.planejarIdeia = function(ideaId) {
  // Troca para aba de calendário
  showPage(pageCalendario);
  // Abre o modal de edição de post passando o ID da ideia
  openModal(null, "", ideaId);
};




function renderSeasonBanner() {
  const bannerContainer = document.getElementById("season-banner");
  if(!bannerContainer) return;

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  if (month === 7 && year === 2026) {
    // AGOSTO
    bannerContainer.innerHTML = `
      <div class="page-header" style="flex-direction: column; align-items: flex-start; background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); padding: 32px; border-radius: 16px; color: white; margin-bottom: 24px; position: relative; overflow: hidden; box-shadow: 0 10px 25px rgba(30,27,75,0.2); transition: all 0.3s ease;">
        <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: -20px; right: 100px; width: 100px; height: 100px; background: rgba(38, 66, 139,0.2); border-radius: 50%; filter: blur(20px);"></div>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; margin-bottom: 16px; display: inline-block; border: 1px solid rgba(255,255,255,0.1);">AGOSTO 2026</span>
        <h2 style="font-size: 32px; margin: 0 0 12px 0; color: white; letter-spacing: -0.5px;">O Futuro do Fiscal Já Começou</h2>
        <p style="margin: 0; color: #DAEDF4; font-size: 16px; max-width: 700px; line-height: 1.5;">Em agosto, a SAAM não venderá software. Venderá uma nova forma de pensar o departamento fiscal usando o <strong>Índice de Maturidade Fiscal</strong> como fio condutor.</p>
      </div>
    `;
  } else if (month === 8 && year === 2026) {
    // SETEMBRO
    bannerContainer.innerHTML = `
      <div class="page-header" style="flex-direction: column; align-items: flex-start; background: linear-gradient(135deg, #064E3B 0%, #047857 100%); padding: 32px; border-radius: 16px; color: white; margin-bottom: 24px; position: relative; overflow: hidden; box-shadow: 0 10px 25px rgba(6,78,59,0.2); transition: all 0.3s ease;">
        <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: -20px; right: 100px; width: 100px; height: 100px; background: rgba(16,185,129,0.2); border-radius: 50%; filter: blur(20px);"></div>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; margin-bottom: 16px; display: inline-block; border: 1px solid rgba(255,255,255,0.1);">SETEMBRO 2026</span>
        <h2 style="font-size: 32px; margin: 0 0 12px 0; color: white; letter-spacing: -0.5px;">A Nova Era da Maturidade Fiscal</h2>
        <p style="margin: 0; color: #A7F3D0; font-size: 16px; max-width: 700px; line-height: 1.5;">As empresas não serão separadas pelo faturamento, mas pela maturidade dos seus processos. Como subir cada degrau na <strong>Escada da Maturidade Fiscal</strong>.</p>
      </div>
    `;
  } else if (month === 9 && year === 2026) {
    // OUTUBRO
    bannerContainer.innerHTML = `
      <div class="page-header" style="flex-direction: column; align-items: flex-start; background: linear-gradient(135deg, #7C2D12 0%, #EA580C 100%); padding: 32px; border-radius: 16px; color: white; margin-bottom: 24px; position: relative; overflow: hidden; box-shadow: 0 10px 25px rgba(234,88,12,0.2); transition: all 0.3s ease;">
        <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: -20px; right: 100px; width: 100px; height: 100px; background: rgba(245,158,11,0.2); border-radius: 50%; filter: blur(20px);"></div>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; margin-bottom: 16px; display: inline-block; border: 1px solid rgba(255,255,255,0.1);">OUTUBRO 2026</span>
        <h2 style="font-size: 32px; margin: 0 0 12px 0; color: white; letter-spacing: -0.5px;">A Inteligência que Gera Resultados</h2>
        <p style="margin: 0; color: #FFE498; font-size: 16px; max-width: 700px; line-height: 1.5;">O departamento fiscal não é um centro de custo. É uma área estratégica que gera resultados, performance e valor concreto para a empresa.</p>
      </div>
    `;
  } else if (month === 10 && year === 2026) {
    // NOVEMBRO
    bannerContainer.innerHTML = `
      <div class="page-header" style="flex-direction: column; align-items: flex-start; background: linear-gradient(135deg, #101B3B 0%, #26428B 100%); padding: 32px; border-radius: 16px; color: white; margin-bottom: 24px; position: relative; overflow: hidden; box-shadow: 0 10px 25px rgba(38,66,139,0.2); transition: all 0.3s ease;">
        <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: -20px; right: 100px; width: 100px; height: 100px; background: rgba(63,119,193,0.2); border-radius: 50%; filter: blur(20px);"></div>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; margin-bottom: 16px; display: inline-block; border: 1px solid rgba(255,255,255,0.1);">NOVEMBRO 2026</span>
        <h2 style="font-size: 32px; margin: 0 0 12px 0; color: white; letter-spacing: -0.5px;">O Fiscal que Antecipa o Futuro</h2>
        <p style="margin: 0; color: #DAEDF4; font-size: 16px; max-width: 700px; line-height: 1.5;">Empresas de alta performance não trabalham apagando incêndios. Elas evitam que eles aconteçam por meio de prevenção, previsibilidade e governança fiscal.</p>
      </div>
    `;
  } else if (month === 11 && year === 2026) {
    // DEZEMBRO
    bannerContainer.innerHTML = `
      <div class="page-header" style="flex-direction: column; align-items: flex-start; background: linear-gradient(135deg, #0A1C2D 0%, #033059 100%); padding: 32px; border-radius: 16px; color: white; margin-bottom: 24px; position: relative; overflow: hidden; box-shadow: 0 10px 25px rgba(10,28,45,0.2); transition: all 0.3s ease;">
        <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: -20px; right: 100px; width: 100px; height: 100px; background: rgba(63,119,193,0.2); border-radius: 50%; filter: blur(20px);"></div>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; margin-bottom: 16px; display: inline-block; border: 1px solid rgba(255,255,255,0.1);">DEZEMBRO 2026</span>
        <h2 style="font-size: 32px; margin: 0 0 12px 0; color: white; letter-spacing: -0.5px;">O Ano em que o Fiscal Decide o Futuro</h2>
        <p style="margin: 0; color: #DAEDF4; font-size: 16px; max-width: 700px; line-height: 1.5;">Empresas que começam o ano preparadas não têm sorte. Elas planejam, revisam e evoluem antes da virada. É essa visão de longo prazo que a SAAM entrega.</p>
      </div>
    `;
  } else {
    // PADRÃO
    bannerContainer.innerHTML = `
      <div class="page-header" style="background: #FFF; padding: 24px; border-radius: 12px; border: 1px solid #E2E8F0; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <div>
          <h2 style="font-size: 24px; margin: 0 0 4px 0; color: #0F172A;">Calendário Editorial</h2>
          <p style="margin: 0; color: #64748B; font-size: 14px;">Planejamento mensal de publicações.</p>
        </div>
      </div>
    `;
  }
}


// --- UX FIXES AND ENHANCEMENTS ---

// Toast System
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `saam-toast ${type}`;
    
    let icon = type === 'success' 
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
        
    toast.innerHTML = icon + '<span>' + message + '</span>';
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Override filterGeral to handle active states on Idea pills
const _originalFilterGeral = window.filterGeral;
window.filterGeral = function(theme) {
    if (typeof _originalFilterGeral === 'function') {
        _originalFilterGeral(theme);
    }
    
    // Update Active States for the general ideas pills
    const pills = document.querySelectorAll('#ideias-pills-container .filter-pill');
    pills.forEach(p => {
        if (theme === 'Todos') {
            if (p.textContent.startsWith('Todos')) p.classList.add('active');
            else p.classList.remove('active');
        } else {
            if (p.textContent.includes(theme)) p.classList.add('active');
            else p.classList.remove('active');
        }
    });
};

// Handle New Idea Saving
setTimeout(() => {
    const saveBtn = document.getElementById('btn-save-ideia');
    if (saveBtn && !saveBtn.hasAttribute('data-ux-bound')) {
        saveBtn.setAttribute('data-ux-bound', 'true');
        saveBtn.addEventListener('click', () => {
            const titleInput = document.getElementById('new-idea-title');
            const descInput = document.getElementById('new-idea-desc');
            
            if (!titleInput.value) {
                showToast('Preencha o título da ideia', 'error');
                return;
            }
            
            // Add to ideasData
            if (window.ideasData) {
                window.ideasData.unshift({
                    id: 'user-idea-' + Date.now(),
                    title: titleInput.value + (descInput.value ? ' - ' + descInput.value : ''),
                    usageCount: 0,
                    series: 'Geral'
                });
            }
            
            // Close form
            const formContainer = document.getElementById('nova-ideia-form');
            if (formContainer) formContainer.classList.add('hidden');
            
            // Clear inputs
            titleInput.value = '';
            descInput.value = '';
            
            // Re-render if possible
            if (typeof renderIdeiasGeral === 'function') {
                renderIdeiasGeral();
            }
            
            showToast('Ideia salva com sucesso!', 'success');
        });
    }
    
    // Handle Playbook Chapter Tabs
    const playbookTabs = document.querySelectorAll('#playbook-chapter-tabs .btn-playbook-chap');
    const playbookSections = document.querySelectorAll('.chap-content-section');
    
    if (playbookTabs.length > 0) {
        playbookTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // reset active states
                playbookTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                playbookSections.forEach(sec => sec.classList.remove('active'));
                
                const chapId = tab.getAttribute('data-chap');
                const targetSec = document.getElementById('chap-sec-' + chapId);
                if (targetSec) targetSec.classList.add('active');
            });
        });
    }
}, 500);



// Identidade Visual Navigation
const pageIdentidade = document.getElementById("page-identidade");
const btnTabIdentidade = document.getElementById("btn-tab-identidade");

if (btnTabIdentidade) {
  btnTabIdentidade.addEventListener("click", () => {
    // Hide all pages
    const pages = [document.getElementById("page-home"), document.getElementById("page-calendario"), document.getElementById("page-ideias"), document.getElementById("page-rotinas"), document.getElementById("page-campanhas"), document.getElementById("page-excelencia"), pageIdentidade];
    pages.forEach(p => { if (p) p.classList.add("hidden"); });
    pageIdentidade.classList.remove("hidden");
  });
}

// --- DYNAMIC PILLS LOGIC ---

window.currentAudience = 'Todos';

function renderDynamicPills() {
    const container = document.getElementById('dynamic-series-pills');
    if (!container) return;
    
    container.innerHTML = '';
    
    let activeData = window.ideasData;
    if (window.currentAudience !== 'Todos') {
        activeData = window.ideasData.filter(i => i.audience === window.currentAudience);
    }
    
    // Get unique series
    const uniqueSeries = [...new Set(activeData.map(i => i.series))].sort();
    
    uniqueSeries.forEach(series => {
        const btn = document.createElement('button');
        btn.className = 'filter-pill';
        btn.textContent = series;
        if (typeof currentTheme !== 'undefined' && currentTheme === series) {
            btn.classList.add('active');
        }
        btn.onclick = () => {
            // Remove active from all sub pills
            container.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            
            if (typeof filterGeral === 'function') {
                filterGeral(series);
            }
        };
        container.appendChild(btn);
    });
}

window.filterAudience = function(aud) {
    window.currentAudience = aud;
    
    // Update audience pills
    document.getElementById('btn-aud-todos')?.classList.remove('active');
    document.getElementById('btn-aud-externo')?.classList.remove('active');
    document.getElementById('btn-aud-interno')?.classList.remove('active');
    
    if (aud === 'Todos') document.getElementById('btn-aud-todos')?.classList.add('active');
    if (aud === 'Externo') document.getElementById('btn-aud-externo')?.classList.add('active');
    if (aud === 'Interno') document.getElementById('btn-aud-interno')?.classList.add('active');
    
    // Reset series filter
    if (typeof filterGeral === 'function') {
        filterGeral('Todos'); // This resets the inner text search for series
    }
    
    renderDynamicPills();
    
    if (typeof renderIdeiasGeral === 'function') {
        renderIdeiasGeral();
    }
};

// Hook renderDynamicPills into initial load
setTimeout(() => renderDynamicPills(), 1500);

// Proxy for filterGeral if it doesn't already reset properly
const _originalFilterGeral2 = window.filterGeral;
window.filterGeral = function(theme) {
    // Let the original function do its thing
    if (_originalFilterGeral2) {
        _originalFilterGeral2(theme);
    }
    // If 'Todos', remove active from all dynamic pills
    if (theme === 'Todos') {
        const container = document.getElementById('dynamic-series-pills');
        if(container) container.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    }
};


function generateMiniBriefing(title) {
  if(!title) return '';
  const idea = window.ideasData.find(i => i.title.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(i.title.toLowerCase()));
  if(idea) {
    let focus = idea.audience === 'Externo' ? 'Atração de novos leads (Topo/Meio de Funil)' : 'Retenção, Educação e Customer Success (Fundo de Funil)';
    return '🎯 PILAR ESTRATÉGICO: ' + idea.series + '\n👥 PÚBLICO-ALVO: ' + idea.audience + ' - ' + focus + '\n📱 CANAL RECOMENDADO: ' + idea.destiny + '\n\n💡 DIRECIONAMENTO: Desenvolva o conteúdo focando em resolver a dor principal relacionada a "' + idea.title + '".';
  }
  return '💡 DIRECIONAMENTO: Desenvolva o conteúdo com foco na dor principal do cliente, mostrando como o SAAM traz inteligência fiscal e produtividade.';
}

document.addEventListener('DOMContentLoaded', () => {
  const tagInput = document.getElementById('post-tag');
  if(tagInput) {
    tagInput.addEventListener('change', (e) => {
      const briefingEl = document.getElementById('post-briefing');
      if(briefingEl && !briefingEl.value.includes('DIRECIONAMENTO')) {
         briefingEl.value = generateMiniBriefing(e.target.value) + (briefingEl.value ? '\n\n' + briefingEl.value : '');
      }
    });
  }
});

// ==========================================
// --- GUIA DO SAAM ADDITIONAL FUNCTIONS ---
// ==========================================

window.switchGuiaSection = function(section) {
  // Hide all sub sections
  document.querySelectorAll('.guia-sub-section').forEach(sec => sec.style.display = 'none');
  
  // Deactivate all sub tab buttons
  document.querySelectorAll('.btn-guia-tab').forEach(btn => btn.classList.remove('active'));
  
  // Show target sub-section
  const targetSec = document.getElementById('guia-sub-' + section);
  if(targetSec) {
    targetSec.style.display = 'block';
  }
  
  // Activate target button
  const targetBtn = document.getElementById('btn-guia-' + section);
  if(targetBtn) {
    targetBtn.classList.add('active');
  }
  
  if (section === 'concorrencia') {
    window.loadCompetitors();
  }
};

window.openChapter = function(num) {
  // Switch sub section to capitulos
  window.switchGuiaSection('capitulos');
  
  // Hide index hub, show content
  const indexEl = document.getElementById('guia-capitulos-index');
  const contentEl = document.getElementById('guia-capitulos-content');
  if (indexEl) indexEl.style.display = 'none';
  if (contentEl) contentEl.style.display = 'block';
  
  // Switch the chapter tab
  const tabs = document.querySelectorAll('#playbook-chapter-tabs .btn-playbook-chap');
  tabs.forEach(tab => {
    if(tab.getAttribute('data-chap') == num) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  
  // Switch content
  document.querySelectorAll('.chap-content-section').forEach(sec => {
    if(sec.getAttribute('id') === 'chap-sec-' + num) {
      sec.classList.add('active');
    } else {
      sec.classList.remove('active');
    }
  });
};

window.backToChapterIndex = function() {
  const indexEl = document.getElementById('guia-capitulos-index');
  const contentEl = document.getElementById('guia-capitulos-content');
  if (indexEl) indexEl.style.display = 'block';
  if (contentEl) contentEl.style.display = 'none';
};

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    if (typeof showToast === 'function') {
      showToast('Código de cor copiado: ' + text, 'success');
    } else {
      alert('Código de cor copiado: ' + text);
    }
  }).catch(err => {
    if (typeof showToast === 'function') {
      showToast('Falha ao copiar cor', 'error');
    } else {
      alert('Falha ao copiar cor');
    }
  });
};

window.copyTemplate = function(id) {
  let text = '';
  if (id === 1) {
    text = "Enquanto a maioria das empresas ainda trabalha como em [Ano Antigo]... o mercado fiscal já entrou em uma nova era.\n\nNão é mais sobre entregar obrigações. É sobre inteligência. [Problema Comum].\n\nSua empresa está preparada para a virada?";
  } else if (id === 2) {
    text = "Antes do fechamento do mês, certifique-se de validar estes 5 pilares:\n\n☑ [Pilar 1]\n☑ [Pilar 2]\n☑ [Pilar 3]\n\nQual desses hoje é o maior gargalo da sua operação?";
  }
  navigator.clipboard.writeText(text).then(() => {
    if (typeof showToast === 'function') {
      showToast('Modelo copiado para a área de transferência!', 'success');
    } else {
      alert('Modelo copiado!');
    }
  });
};

// Competitors local storage key
const COMP_STORAGE_KEY = 'saam_competitors_v1';

const defaultCompetitors = [
  {
    id: 1,
    name: "ERPs Tradicionais (Totvs, SAP, Senior)",
    strengths: "Fortemente estabelecidos no mercado, gerenciam a contabilidade básica, cadastros centrais e o faturamento.",
    weaknesses: "Falta de auditoria em tempo real, processos manuais de conciliação de XMLs, lentidão na atualização legislativa e dashboards de risco inexistentes.",
    strategy: "Posicionar a SAAM como a 'camada de inteligência' que falta ao ERP. ERP serve para arquivar, a SAAM serve para auditar, prever e agir antes de transmitir."
  },
  {
    id: 2,
    name: "Sistemas Fiscais Legados (Softwares antigos de fechamento)",
    strengths: "Custos baixos, focados apenas no cumprimento de obrigações acessórias básicas.",
    weaknesses: "Interface obsoleta (UX pobre), sem inteligência preventiva, processos demorados e reativos (só encontram o erro quando a multa chega).",
    strategy: "Bater na tecla da 'Maturidade Fiscal' e do tempo desperdiçado. Mostrar que o fiscal moderno precisa de dashboards executivos, APIs rápidas e prevenção total."
  }
];

window.loadCompetitors = function() {
  const container = document.getElementById('concorrentes-list');
  if (!container) return;
  
  let stored = localStorage.getItem(COMP_STORAGE_KEY);
  let comps = [];
  if (stored) {
    try { comps = JSON.parse(stored); } catch(e) { comps = defaultCompetitors; }
  } else {
    comps = defaultCompetitors;
    localStorage.setItem(COMP_STORAGE_KEY, JSON.stringify(comps));
  }
  
  if (comps.length === 0) {
    container.innerHTML = '<div style="text-align: center; color: #94A3B8; padding: 20px;">Nenhum concorrente cadastrado ainda.</div>';
    return;
  }
  
  container.innerHTML = comps.map(c => `
    <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 20px; position: relative;">
      <button type="button" onclick="deleteCompetitor(${c.id})" style="position: absolute; top: 16px; right: 16px; background: none; border: none; color: #EF4444; font-weight: 700; cursor: pointer; font-size: 13px;" title="Remover concorrente">Excluir</button>
      <h4 style="margin: 0 0 12px 0; font-size: 16px; color: #0F172A; font-weight: 800; padding-right: 60px;">🏢 ${c.name}</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 12px;">
        <div>
          <strong style="font-size: 12px; color: #059669; text-transform: uppercase;">Pontos Fortes:</strong>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #475569; line-height: 1.4;">${c.strengths}</p>
        </div>
        <div>
          <strong style="font-size: 12px; color: #DC2626; text-transform: uppercase;">Fraquezas:</strong>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #475569; line-height: 1.4;">${c.weaknesses}</p>
        </div>
      </div>
      <div style="background: #EFF6FF; border-left: 4px solid #3B82F6; padding: 10px 14px; border-radius: 4px;">
        <strong style="font-size: 12px; color: #1D4ED8; text-transform: uppercase;">💡 Contra-ataque Estratégico SAAM:</strong>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #1E40AF; line-height: 1.4; font-weight: 500;">${c.strategy}</p>
      </div>
    </div>
  `).join('');
};

window.deleteCompetitor = function(id) {
  let stored = localStorage.getItem(COMP_STORAGE_KEY);
  if (!stored) return;
  try {
    let comps = JSON.parse(stored);
    comps = comps.filter(c => c.id !== id);
    localStorage.setItem(COMP_STORAGE_KEY, JSON.stringify(comps));
    window.loadCompetitors();
    if (typeof showToast === 'function') {
      showToast('Concorrente removido com sucesso!', 'success');
    }
  } catch(e) {
    console.error(e);
  }
};

// Document load init for competitor form
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const formComp = document.getElementById('form-concorrente');
    if (formComp) {
      formComp.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('conc-name').value;
        const strengths = document.getElementById('conc-strengths').value;
        const weaknesses = document.getElementById('conc-weaknesses').value;
        const strategy = document.getElementById('conc-strategy').value;
        
        let stored = localStorage.getItem(COMP_STORAGE_KEY);
        let comps = [];
        try { comps = JSON.parse(stored) || []; } catch(err) { comps = []; }
        
        const newComp = {
          id: Date.now(),
          name,
          strengths,
          weaknesses,
          strategy
        };
        
        comps.push(newComp);
        localStorage.setItem(COMP_STORAGE_KEY, JSON.stringify(comps));
        
        formComp.reset();
        window.loadCompetitors();
        if (typeof showToast === 'function') {
          showToast('Concorrente cadastrado com sucesso!', 'success');
        }
      });
    }
  }, 1000);
});

// ==============================================
// --- IDEAS PLANNED SIMULATOR FUNCTION ---
// ==============================================
window.updateIdeasSimulation = function() {
  const input = document.getElementById('ideas-sim-total');
  if (!input) return;
  const total = parseInt(input.value) || 0;
  
  const val1 = document.getElementById('sim-val-1');
  const val2 = document.getElementById('sim-val-2');
  const val3 = document.getElementById('sim-val-3');
  const val4 = document.getElementById('sim-val-4');
  
  if (val1) val1.textContent = Math.round(total * 0.4);
  if (val2) val2.textContent = Math.round(total * 0.3);
  if (val3) val3.textContent = Math.round(total * 0.2);
  if (val4) val4.textContent = Math.round(total * 0.1);
};

// ==============================================
// --- DYNAMIC IDEAS MONTHLY STRATEGY PROFILE ---
// ==============================================
const monthlyStrategyProfiles = {
  0: { // January 2027
    name: "Janeiro 2027",
    theme: "O Dado é o Novo Petróleo",
    opportunity: "Preparação absoluta para a Reforma Tributária. Vamos dissecar o Split Payment e as validações sintéticas. O dado (cadastro de produtos e fornecedores) será o novo petróleo do setor fiscal.",
    proportions: { educacional: 40, conversao: 35, retencao: 15, institucional: 10 },
    labels: { educacional: "Transição (Atração)", conversao: "Conformidade (Venda)", retencao: "Parametrização (Base)", institucional: "Visão (Branding)" },
    motivos: {
      educacional: "Explicar o impacto prático do Split Payment nas transações diárias de faturamento.",
      conversao: "Mostrar a urgência de contratar o SAAM antes do início oficial da nova legislação.",
      retencao: "Guiar a base de clientes ativos na higienização profunda de cadastros e regras fiscais.",
      institucional: "Vender a visão de liderança e controle fiscal que a SAAM trará para 2027."
    },
    exemplos: {
      educacional: "Como funciona a retenção imediata de impostos no checkout de pagamento de faturas pelo Split Payment.",
      conversao: "Demonstração prática: Auditoria automatizada da base cadastral para validar campos obrigatórios da Reforma.",
      retencao: "Guia de Higienização de Cadastro de Clientes e Fornecedores utilizando as rotinas inteligentes do SAAM.",
      institucional: "Manifesto SAAM 2027: Lançando as bases de um compliance de dados inabalável para o novo ano."
    },
    playbook: {
      objetivo: "Posicionar a inteligência de dados do SAAM como peça indispensável para a sobrevivência operacional em 2027.",
      percepcao: "Iniciar 2027 com cadastros desorganizados é assumir um risco gravíssimo perante o Split Payment da Reforma.",
      propriedade: "Plano Fiscal 2027 SAAM",
      jornada: [
        { semana: "Semana 1", titulo: "Regras de Transição", foco: "Quais tributos começam a migrar e como funcionará o crédito na prática." },
        { semana: "Semana 2", titulo: "Split Payment", foco: "A liquidação em tempo real e a necessidade de dados de faturamento limpos em segundos." },
        { semana: "Semana 3", titulo: "Higienização de Cadastros", foco: "Como o SAAM automatiza o saneamento das regras de NCM, CST e alíquotas." },
        { semana: "Semana 4", titulo: "Controle Absoluto", foco: "Por que investir em Inteligência Fiscal é a prioridade número 1 do CFO para 2027." }
      ],
      series: [
        { nome: "Plantão Reforma", objetivo: "Análises em vídeo das notas técnicas da SEFAZ sobre o Split Payment." },
        { nome: "Dado Limpo", objetivo: "Dicas de higienização de base e erros comuns de cadastro de produtos." }
      ]
    }
  },
  7: { // August
    name: "Agosto 2026",
    theme: "O Futuro do Fiscal Já Começou",
    opportunity: "Provocar o mercado a entender que o fiscal mudou: de emissor de guias para setor estratégico e de inteligência. Toda publicação deve reforçar o 'Índice de Maturidade Fiscal' e instigar o público a questionar o próprio nível de maturidade.",
    proportions: { educacional: 40, conversao: 30, retencao: 20, institucional: 10 },
    labels: { educacional: "Maturidade (Atração)", conversao: "Autoridade (Venda)", retencao: "Adoção (Clientes)", institucional: "Manifesto (Branding)" },
    motivos: {
      educacional: "Atrair novos leads (público frio) e criar demanda. Mostrar que a contabilidade tradicional ficou no passado.",
      conversao: "Convencer o lead quente de que a SAAM tem o método definitivo para alcançar o nível estratégico.",
      retencao: "Fazer o cliente usar o sistema no máximo. Divulgar checklists de fechamento e alertas de impostos.",
      institucional: "Celebrar o Dia do Contador e humanizar o time. Fortalecer a comunidade de pioneiros fiscais."
    },
    exemplos: {
      educacional: "Explique a diferença entre faturar muito e tener maturidade fiscal. Detalhe como a falta de processos organizados gera retrabalho oculto nas equipes.",
      conversao: "Apresente o Diagnóstico de Maturidade Fiscal e faça um convite claro: 'Descubra grátis se o seu departamento fiscal está no nível Reativo ou Estratégico'.",
      retencao: "Passo a passo rápido: 'Como usar a Auditoria de Entradas do SAAM para fechar o SPED de forma limpa'. Indique a rotina 1.1.2 do sistema.",
      institucional: "Mostre o time de suporte da SAAM em ação e reforce: 'Por trás de toda grande automação, existe uma equipe dedicada a garantir a sua tranquilidade'."
    },
    playbook: {
      objetivo: "Explicar o Índice de Maturidade Fiscal e provar que o fiscal moderno não é burocrático, mas estratégico.",
      percepcao: "A audiência deve sentir que continuar gerindo o fiscal de forma reativa e manual é um risco insustentável.",
      propriedade: "Índice de Maturidade Fiscal (IMF) SAAM",
      jornada: [
        { semana: "Semana 1", titulo: "O Diagnóstico", foco: "Provocar o público com o teste de nível fiscal da empresa (Reativo, Preventivo ou Estratégico)." },
        { semana: "Semana 2", titulo: "Os Gargalos Ocultos", foco: "Expor as maiores dores das equipes (XMLs perdidos, digitação manual, falta de relatórios)." },
        { semana: "Semana 3", titulo: "Automação Preventiva", foco: "Demonstrar como a plataforma SAAM atua de forma preventiva antes da transmissão oficial." },
        { semana: "Semana 4", titulo: "Maturidade na Prática", foco: "Exemplos reais de ROI e tempo economizado com a automação." }
      ],
      series: [
        { nome: "Radar Fiscal", objetivo: "Alertas legislativos rápidos e atualizações do SPED." },
        { nome: "Erro que custa caro", objetivo: "Mostrar erros comuns de preenchimento e suas respectivas multas." },
        { nome: "Fiscal ou Ficção?", objetivo: "Mitos e verdades do universo tributário brasileiro." }
      ]
    }
  },
  8: { // September
    name: "Setembro 2026",
    theme: "A Nova Era da Maturidade Fiscal",
    opportunity: "Oportunidade de transição: Ensinar o público a subir os degraus de maturidade usando o 'Diagnóstico'. Foco em segmentar o público por suas dores específicas em cada nível da jornada.",
    proportions: { educacional: 40, conversao: 30, retencao: 20, institucional: 10 },
    labels: { educacional: "Diagnóstico (Atração)", conversao: "Processos (Venda)", retencao: "Sucesso (Clientes)", institucional: "Cultura (Branding)" },
    motivos: {
      educacional: "Apresentar a Escada da Maturidade Fiscal e incentivar as empresas a avaliarem sua operação.",
      conversao: "Mostrar o impacto financeiro da maturidade no caixa. Foco em otimização de processos fiscais.",
      retencao: "Tutoriais da Base de Rotinas. Facilitar a vida do cliente mostrando atalhos e automações de cruzamentos.",
      institucional: "Divulgar bastidores da equipe de tecnologia do SAAM. Conexão humana de alto nível."
    },
    exemplos: {
      educacional: "Explique o impacto prático de um cadastro de produtos desorganizado no cálculo de impostos de fornecedores. Mostre o conceito de higienização de base.",
      conversao: "Mostre a facilidade da parametrização automática do SAAM frente aos sistemas tradicionais: 'Reduza a parametrização de dias para minutos'.",
      retencao: "Vídeo rápido ensinando o cliente a configurar a captura automática de XMLs de Notas de Serviço (NFS-e) na plataforma.",
      institucional: "Compartilhe fotos do último treinamento da equipe de desenvolvimento do SAAM com a legenda: 'Evoluindo a inteligência da plataforma para simplificar sua rotina'."
    },
    playbook: {
      objetivo: "Subir degraus na Escada de Maturidade Fiscal. Foco operacional em parametrização e higienização de cadastros.",
      percepcao: "A audiência deve entender que para sair do reativo, é obrigatório higienizar a base e parametrizar regras.",
      propriedade: "A Escada da Maturidade Fiscal",
      jornada: [
        { semana: "Semana 1", titulo: "Módulo Higienização", foco: "Como corrigir cadastros de fornecedores e produtos para evitar impostos a maior." },
        { semana: "Semana 2", titulo: "Módulo Parametrização", foco: "Mostrar como configurar regras fiscais complexas de ICMS e IPI de forma automática." },
        { semana: "Semana 3", titulo: "Auditoria Preventiva", foco: "Automação de cruzamentos entre notas fiscais recebidas e emitidas." },
        { semana: "Semana 4", titulo: "Dashboard de Controle", foco: "Como o CFO usa o painel SAAM para monitorar riscos fiscais em tempo real." }
      ],
      series: [
        { nome: "Método SAAM", objetivo: "Tutoriais explicativos de como usar as ferramentas nativas." },
        { nome: "Radar Fiscal", objetivo: "Alertas rápidos sobre novas portarias e prazos estaduais." }
      ]
    }
  },
  9: { // October
    name: "Outubro 2026",
    theme: "A Inteligência que Gera Resultados",
    opportunity: "Combater a percepção de burocracia. O fiscal não é custo, é gerador de performance e valor corporativo. Mostrar números expressivos de tempo economizado por equipes que usam SAAM.",
    proportions: { educacional: 40, conversao: 30, retencao: 20, institucional: 10 },
    labels: { educacional: "Performance & KPIs", conversao: "Geração de Valor", retencao: "Base & Rotinas", institucional: "Cultura & Sucesso" },
    motivos: {
      educacional: "Educar sobre indicadores fiscais e metas de performance que diferenciam operações comuns de operações de excelência.",
      conversao: "Compartilhar cases de sucesso e ROI prático. Provar a redução de horas manuais em conferências.",
      retencao: "Dicas semanais para otimizar as conferências mensais. Adoção profunda das rotinas de parametrização.",
      institucional: "Mostrar a cultura de excelência da SAAM, prêmios, novidades corporativas e eventos do setor."
    },
    exemplos: {
      educacional: "Explique como a Reforma Tributária mudará a exigência de dados em tempo real (Split Payment). O cadastro de produtos se tornará o dado mais valioso.",
      conversao: "Estudo de Caso real: 'Como a Indústria X automatizou a validação de XMLs e economizou R$ 45.000 em multas evitadas no primeiro mês'.",
      retencao: "Guia prático para os usuários do sistema: 'Configurando alertas automáticos de inconsistência no seu dashboard do SAAM'.",
      institucional: "Depoimento do Diretor de Operações sobre a conquista de conformidade da marca em eventos do setor fiscal."
    },
    playbook: {
      objetivo: "Provar que maturidade fiscal gera retorno sobre o investimento (ROI) e performance operacional.",
      percepcao: "O fiscal deve ser visto como uma área de inteligência de negócios estratégica, não um centro de custos passivo.",
      propriedade: "Indicadores de Performance Fiscal (IPF)",
      jornada: [
        { semana: "Semana 1", titulo: "Auditoria em 30 segundos", foco: "Demonstrar a velocidade de conferência do SAAM versus o método manual tradicional." },
        { semana: "Semana 2", titulo: "ROI do Tempo", foco: "Mostrar como o SAAM economiza até 80 horas de trabalho manual das equipes." },
        { semana: "Semana 3", titulo: "Casos de Sucesso", foco: "Publicar depoimentos e cases reais de clientes que eliminaram retrabalho." },
        { semana: "Semana 4", titulo: "Valor de Negócio", foco: "Como os dados fiscais ajudam o CEO e o Diretor a tomarem decisões de expansão." }
      ],
      series: [
        { nome: "Cases SAAM", objetivo: "Depoimentos de contadores e CFOs sobre o uso da plataforma." },
        { nome: "Radar Fiscal", objetivo: "Atualizações de Split Payment e Reforma Tributária." }
      ]
    }
  },
  10: { // November
    name: "Novembro 2026",
    theme: "O Fiscal que Antecipa o Futuro",
    opportunity: "Mudar a conversa para prevenção e governança. Mostrar que empresas maduras evitam o incêndio antes dele acontecer.",
    proportions: { educacional: 40, conversao: 30, retencao: 20, institucional: 10 },
    labels: { educacional: "Prevenção (Riscos)", conversao: "Governança (Venda)", retencao: "Sucesso (Clientes)", institucional: "Branding (Cultura)" },
    motivos: {
      educacional: "Conscientizar sobre os maiores erros fiscais ocultos que geram multas pesadas. Ensinar a prever e auditar antes do envio.",
      conversao: "Apresentar a Matriz de Previsibilidade Fiscal e o Método P.R.E.V.E.R. como diferenciais inigualáveis do SAAM.",
      retencao: "Foco total na auditoria preventiva interna e parametrizações complexas para fechamentos trimestrais sem sustos.",
      institucional: "Campanhas institucionais e depoimentos de grandes contadores sobre o alívio de operar com segurança."
    },
    exemplos: {
      educacional: "Quais são as divergências invisíveis entre SPED e ECF que acionam o radar da Receita? Explique o cruzamento preventivo.",
      conversao: "Demonstre como o SAAM simula a fiscalização da Receita Federal na base do cliente antes da transmissão oficial dos dados.",
      retencao: "Checklist trimestral de validação de alíquotas de impostos retidos na fonte utilizando a rotina de cruzamentos do sistema.",
      institucional: "Post humanizado: 'Profissional fiscal, você merece ir para casa no horário normal. Deixe as validações repetitivas com o SAAM'."
    },
    playbook: {
      objetivo: "Posicionar o SAAM como a camada preventiva que evita multas fiscais antes da transmissão dos dados.",
      percepcao: "A audiência deve sentir a tranquilidade de operar com previsibilidade, eliminando o estresse dos fechamentos.",
      propriedade: "Método P.R.E.V.E.R. & Matriz de Previsibilidade",
      jornada: [
        { semana: "Semana 1", titulo: "Identificação do Risco", foco: "Quais inconsistências a Receita Federal encontra primeiro por cruzamento de robôs." },
        { semana: "Semana 2", titulo: "Prevenção de Multas", foco: "Demonstrar a simulação preventiva de malha fiscal do SAAM na base operacional." },
        { semana: "Semana 3", titulo: "Previsibilidade de Caixa", foco: "Como impostos retidos incorretamente afetam o fluxo financeiro da empresa." },
        { semana: "Semana 4", titulo: "Governança de Dados", foco: "O papel do compliance e da segurança da informação na transmissão de obrigações." }
      ],
      series: [
        { nome: "Método PREVER", objetivo: "Explicar os 6 pilares de validação do IVS." },
        { nome: "Radar Fiscal", objetivo: "Resumos legislativos semanais e orientações preventivas." }
      ]
    }
  },
  11: { // December
    name: "Dezembro 2026",
    theme: "O Ano em que o Fiscal Decide o Futuro",
    opportunity: "Planejamento e Virada. Oportunidade perfeita de apelo emocional e pragmático: o encerramento de um ciclo e a preparação para o próximo ano fiscal (Reforma Tributária 2027). A SAAM ajuda a fechar o ano em paz.",
    proportions: { educacional: 30, conversao: 40, retencao: 20, institucional: 10 },
    labels: { educacional: "Retrospectiva 2026", conversao: "Plano 2027 (Venda)", retencao: "Agradecimento (Base)", institucional: "Virada (Branding)" },
    motivos: {
      educacional: "Fazer uma retrospectiva das principais mudanças de 2026. Analisar o que mudou na maturidade fiscal nacional.",
      conversao: "Lançamento do Plano Fiscal 2027 da SAAM. Incentivar fechamento de contratos para iniciar o ano novo com segurança.",
      retencao: "Agradecer a base de clientes ativos pela parceria. Tutoriais de encerramento de exercício fiscal.",
      institucional: "Mensagens humanas de boas festas, retrospectiva interna da equipe SAAM e votos de um 2027 de paz e controle."
    },
    exemplos: {
      educacional: "As principais mudanças na legislação fiscal que entram em vigor dia 1º de Janeiro. Como se antecipar para não começar o ano com erros.",
      conversao: "Campanha 'Virada Fiscal SAAM': 'Contrate a inteligência fiscal da SAAM agora e não pague mensalidade até o encerramento do inventário'.",
      retencao: "Instruções passo a passo sobre como realizar a exportação anual de dados históricos e inventário no encerramento de ciclo do SAAM.",
      institucional: "Vídeo comemorativo de agradecimento de toda a equipe SAAM: 'Obrigado por nos escolher para cuidar da inteligência fiscal da sua empresa'."
    },
    playbook: {
      objetivo: "Estimular o planejamento do ano novo fiscal e a contratação do SAAM para iniciar 2027 com governança.",
      percepcao: "Começar o ano fiscal sem um sistema de validação automática é assumir um risco perigoso na Reforma Tributária.",
      propriedade: "Plano Fiscal 2027 SAAM",
      jornada: [
        { semana: "Semana 1", titulo: "Retrospectiva Fiscal", foco: "Os principais fatos tributários de 2026 e o que aprendemos sobre maturidade." },
        { semana: "Semana 2", titulo: "Planejamento 2027", foco: "Como estruturar o orçamento e os sistemas para as regras da reforma." },
        { semana: "Semana 3", titulo: "Inventário de Estoques", foco: "A importância de conferir o inventário no SPED antes da virada do ano." },
        { semana: "Semana 4", titulo: "Virada de Ciclo", foco: "Mensagem de agradecimento aos contadores e votos de um ano novo com total controle." }
      ],
      series: [
        { nome: "Plano 2027", objetivo: "Direcionamentos práticos de transição de regimes tributários." },
        { nome: "Radar Fiscal", objetivo: "Plantão de dúvidas sobre as novas regras que passam a valer em Janeiro." }
      ]
    }
  }
};
window.renderIdeasStrategy = function() {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  let strat = monthlyStrategyProfiles[month];
  if (!strat) {
    strat = {
      name: `${monthNames[month]} ${year}`,
      theme: "Planejamento Editorial Dinâmico",
      opportunity: "Oportunidade Geral: Produzir conteúdo relevante alinhado às necessidades do setor fiscal, focando em segurança, agilidade e inteligência nas rotinas diárias.",
      proportions: { educacional: 40, conversao: 30, retencao: 20, institucional: 10 },
      labels: { educacional: "Educacional (Atração)", conversao: "Vendas (Conversão)", retencao: "Sucesso (Retenção)", institucional: "Branding (Institucional)" },
      motivos: {
        educacional: "Atrair novos leads (público frio) e criar demanda mostrando novas possibilidades.",
        conversao: "Convencer o lead quente de que o SAAM é o software ideal para sua operação.",
        retencao: "Estimular o uso frequente do sistema e reduzir o churn de clientes ativos.",
        institucional: "Humanizar a equipe e gerar engajamento sobre a cultura do SAAM."
      }
    };
  }

  const elTitle = document.getElementById("ideas-strat-title");
  const elDesc = document.getElementById("ideas-strat-desc");
  if (elTitle) elTitle.textContent = strat.theme;
  
  const monthColors = {
    0: "#EA580C", // Janeiro 2027 (orange theme)
    7: "#26428B", // Agosto
    8: "#059669", // Setembro
    9: "#EA580C", // Outubro
    10: "#1E3A8A", // Novembro
    11: "#BE185D"  // Dezembro
  };
  const activeColor = monthColors[month] || "#26428B";

  // Update month pills active state (styled as physical folder tabs inside container)
  const pills = document.querySelectorAll(".ideas-month-pill");
  pills.forEach(p => {
    const mVal = parseInt(p.getAttribute("data-month"));
    if (mVal === month) {
      p.classList.add("active");
      p.style.background = "#FFFFFF";
      p.style.color = activeColor;
      p.style.borderColor = "#E2E8F0";
      p.style.borderTop = "4px solid " + activeColor;
      p.style.borderBottom = "1px solid #FFFFFF";
      p.style.padding = "12px 26px";
      p.style.fontWeight = "900";
      p.style.zIndex = "4";
      p.style.marginBottom = "-1px";
    } else {
      p.classList.remove("active");
      p.style.background = "transparent";
      p.style.color = "#64748B";
      p.style.borderColor = "transparent";
      p.style.borderTop = "none";
      p.style.borderBottom = "none";
      p.style.padding = "10px 20px";
      p.style.fontWeight = "700";
      p.style.zIndex = "1";
      p.style.marginBottom = "0";
    }
  });
  if (elDesc) elDesc.innerHTML = `<strong>Estratégia e Oportunidade do Mês:</strong> ${strat.opportunity}`;

  const elLbl1 = document.getElementById("ideas-card-label-1");
  const elPct1 = document.getElementById("ideas-card-pct-1");
  const elMot1 = document.getElementById("ideas-card-motivo-1");
  const elEx1 = document.getElementById("ideas-card-ex-1");
  if (elLbl1) elLbl1.textContent = strat.labels.educacional;
  if (elPct1) elPct1.textContent = `${strat.proportions.educacional}%`;
  if (elMot1) elMot1.innerHTML = `<strong>O Motivo:</strong> ${strat.motivos.educacional}`;
  if (elEx1) elEx1.textContent = strat.exemplos ? strat.exemplos.educacional : "Exemplo geral de pauta educativa.";

  const elLbl2 = document.getElementById("ideas-card-label-2");
  const elPct2 = document.getElementById("ideas-card-pct-2");
  const elMot2 = document.getElementById("ideas-card-motivo-2");
  const elEx2 = document.getElementById("ideas-card-ex-2");
  if (elLbl2) elLbl2.textContent = strat.labels.conversao;
  if (elPct2) elPct2.textContent = `${strat.proportions.conversao}%`;
  if (elMot2) elMot2.innerHTML = `<strong>O Motivo:</strong> ${strat.motivos.conversao}`;
  if (elEx2) elEx2.textContent = strat.exemplos ? strat.exemplos.conversao : "Exemplo geral de pauta comercial.";

  const elLbl3 = document.getElementById("ideas-card-label-3");
  const elPct3 = document.getElementById("ideas-card-pct-3");
  const elMot3 = document.getElementById("ideas-card-motivo-3");
  const elEx3 = document.getElementById("ideas-card-ex-3");
  if (elLbl3) elLbl3.textContent = strat.labels.retencao;
  if (elPct3) elPct3.textContent = `${strat.proportions.retencao}%`;
  if (elMot3) elMot3.innerHTML = `<strong>O Motivo:</strong> ${strat.motivos.retencao}`;
  if (elEx3) elEx3.textContent = strat.exemplos ? strat.exemplos.retencao : "Exemplo geral de pauta de base ativa.";

  const elLbl4 = document.getElementById("ideas-card-label-4");
  const elPct4 = document.getElementById("ideas-card-pct-4");
  const elMot4 = document.getElementById("ideas-card-motivo-4");
  const elEx4 = document.getElementById("ideas-card-ex-4");
  if (elLbl4) elLbl4.textContent = strat.labels.institucional;
  if (elPct4) elPct4.textContent = `${strat.proportions.institucional}%`;
  if (elMot4) elMot4.innerHTML = `<strong>O Motivo:</strong> ${strat.motivos.institucional}`;
  if (elEx4) elEx4.textContent = strat.exemplos ? strat.exemplos.institucional : "Exemplo geral de postagem institucional.";

  const elSimLbl1 = document.getElementById("sim-lbl-1");
  const elSimLbl2 = document.getElementById("sim-lbl-2");
  const elSimLbl3 = document.getElementById("sim-lbl-3");
  const elSimLbl4 = document.getElementById("sim-lbl-4");
  if (elSimLbl1) elSimLbl1.textContent = `${strat.labels.educacional.split(" ")[0]} (${strat.proportions.educacional}%)`;
  if (elSimLbl2) elSimLbl2.textContent = `${strat.labels.conversao.split(" ")[0]} (${strat.proportions.conversao}%)`;
  if (elSimLbl3) elSimLbl3.textContent = `${strat.labels.retencao.split(" ")[0]} (${strat.proportions.retencao}%)`;
  if (elSimLbl4) elSimLbl4.textContent = `${strat.labels.institucional.split(" ")[0]} (${strat.proportions.institucional}%)`;

  window.updateIdeasSimulation(strat.proportions);

  // --- DYNAMICALLY RENDER THE FULL CAMPAIGN GUIA EDITORIAL PLAYBOOK ---
  const playbookContainer = document.getElementById("ideas-campaign-playbook");
  if (playbookContainer) {
    const permanentEl = document.getElementById("campanha-conteudo-permanente");
    
    const monthContentIds = {
      0: "campanha-conteudo-janeiro",
      7: "campanha-conteudo-agosto",
      8: "campanha-conteudo-setembro",
      9: "campanha-conteudo-outubro",
      10: "campanha-conteudo-novembro",
      11: "campanha-conteudo-dezembro"
    };
    const contentId = monthContentIds[month];
    const sourceEl = document.getElementById(contentId);
    
    let permanentHtml = "";
    if (permanentEl) {
      permanentHtml = `
        <details style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; margin-bottom: 24px; overflow: hidden; box-shadow: var(--shadow-sm); outline: none;">
          <summary style="padding: 20px 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; list-style: none; outline: none; background: #F8FAFC;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 16px;">📘</span>
              <strong style="font-size: 15px; color: #0A1C2D; font-family: 'Outfit', sans-serif; text-transform: uppercase; letter-spacing: 0.5px;">Guia de Posicionamento & Marca SAAM (Permanente)</strong>
            </div>
            <span style="font-size: 11px; font-weight: 800; color: #64748B; font-family: 'Roboto', sans-serif; text-transform: uppercase;">Clique para expandir</span>
          </summary>
          <div style="padding: 24px; color: #0F172A; font-family: 'Poppins', sans-serif; border-top: 1px solid #E2E8F0;">
            ${permanentEl.innerHTML}
          </div>
        </details>
      `;
    }

    let monthHtml = "";
    if (month === 0) {
      const janCard = document.getElementById("january-details-card");
      if (janCard) {
        monthHtml = janCard.outerHTML;
      }
    } else if (sourceEl) {
      monthHtml = `
        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 32px; box-shadow: var(--shadow-sm);">
          <div style="border-bottom: 1px solid var(--hairline); padding-bottom: 18px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h4 style="margin: 0; font-size: 20px; color: #0A1C2D; font-weight: 800; font-family: 'Outfit', sans-serif;">📖 Guia Editorial & Planejamento Estratégico (${strat.name})</h4>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748B; font-family: 'Poppins', sans-serif;">Pilares de narrativa, jornadas semanais e séries específicas para este mês.</p>
            </div>
            <span style="background: #DAEDF4; color: #26428B; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 800; font-family: 'Roboto', sans-serif;">CAMPANHA ATIVA</span>
          </div>
          <div style="color: #0F172A; font-family: 'Poppins', sans-serif;" class="playbook-injected-content">
            ${sourceEl.innerHTML}
          </div>
        </div>
      `;
    }
    
    playbookContainer.innerHTML = permanentHtml + monthHtml;
  }
};

// ==============================================
// --- HELPER FUNCTIONS FOR EXPANDABLE IDEAS ---
// ==============================================
window.toggleIdeaAccordion = function(event, id) {
  // Prevent expanding when clicking inside footer or buttons
  if (event.target.closest('.idea-footer') || event.target.closest('button')) {
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  
  if (el.style.display === "none") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
};

window.getIdeaCopyAndBriefing = function(idea) {
  const title = (idea.title || "").toLowerCase();
  const series = (idea.series || "").toLowerCase();
  
  let briefing = "";
  let copy = "";
  
  if (series.includes("reforma")) {
    briefing = "Conscientizar contadores e CFOs sobre o impacto da Reforma Tributária (Split Payment, IBS/CBS) nas operações fiscais do dia a dia, mostrando que a transição exige tecnologia preventiva imediata.";
    copy = "Se você acha que a Reforma Tributária é problema para o futuro, pense de novo. O Split Payment vai exigir validações em segundos. A base de dados da sua empresa está higienizada?";
  } else if (series.includes("captura") || title.includes("xml") || title.includes("nota")) {
    briefing = "Atacar o calcanhar de Aquiles dos recebimentos manuais de arquivos fiscais (XML, CTe, NFS-e). Demonstrar o ganho real de tempo ao automatizar a busca nas prefeituras e SEFAZ.";
    copy = "Sua equipe não precisa cobrar XML de fornecedor por e-mail ou baixar PDFs um por um. Com a captura do SAAM, a nota é emitida e o XML já cai direto no seu dashboard em tempo real.";
  } else if (series.includes("sped") || title.includes("bloco k") || title.includes("inventário")) {
    briefing = "Alertar sobre os riscos de multas no preenchimento de obrigações acessórias como o SPED Fiscal e o Bloco K. Explicar como a Receita cruza dados por robôs.";
    copy = "Errar uma única linha no SPED Fiscal ou registrar o inventário com inconsistência pode gerar multas pesadas para sua empresa. Faça a auditoria prévia preventiva automática.";
  } else if (series.includes("cruzamento") || title.includes("cruzamento") || title.includes("dados")) {
    briefing = "Esclarecer que a fiscalização federal cruza registros de diferentes declarações automaticamente. A solução é cruzar e validar preventivamente antes da transmissão.";
    copy = "A fiscalização não é mais por amostragem. O fisco cruza robô contra robô. Se você não auditar suas obrigações preventivamente, o aviso de divergência será inevitável.";
  } else {
    // Default fallback
    briefing = "Apresentar a inteligência fiscal da plataforma SAAM. Focar em como otimizar a produtividade da equipe fiscal e reduzir o trabalho manual reativo.";
    copy = "Chega de operar no modo reativo apagando incêndios. O departamento fiscal moderno precisa de controle de dados e prevenção. Descubra a inteligência fiscal do SAAM.";
  }
  
  return { briefing, copy };
};

// ==============================================
// --- HELPER FUNCTION TO CHANGE IDEAS MONTH ---
// ==============================================
window.changeIdeasMonth = function(val) {
  const m = parseInt(val);
  if (m === 0) {
    currentDate.setFullYear(2027);
  } else {
    currentDate.setFullYear(2026);
  }
  currentDate.setMonth(m);
  renderCalendar(); // Syncs calendar month
  renderIdeasStrategy(); // Syncs ideas strategy view
};

// Initialize ideasStrategy on load
setTimeout(() => {
  if (typeof renderIdeasStrategy === 'function') {
    renderIdeasStrategy();
  }
}, 1000);

// ==============================================
// --- INTERACTIVE COMPETITOR BENCHMARK UPLOAD ---
// ==============================================
window.triggerCompetitorUpload = function(compId) {
  const input = document.getElementById('upload-input-' + compId);
  if (input) input.click();
};

window.handleCompetitorUpload = function(event, compId) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const zone = document.getElementById('media-zone-' + compId);
      if (zone) {
        zone.innerHTML = `
          <img src="${e.target.result}" style="max-width: 100%; max-height: 200px; border-radius: 8px; object-fit: contain; box-shadow: var(--shadow-sm);" />
          <div style="margin-top: 8px; font-size: 11px; color: #ef4444; font-weight: 700; cursor: pointer; font-family: 'Outfit', sans-serif;" onclick="event.stopPropagation(); window.removeCompetitorImage('${compId}')">Remover Imagem</div>
          <input type="file" id="upload-input-${compId}" accept="image/*" style="display: none;" onchange="window.handleCompetitorUpload(event, '${compId}')">
        `;
        localStorage.setItem('competitor-img-' + compId, e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }
};

window.removeCompetitorImage = function(compId) {
  const zone = document.getElementById('media-zone-' + compId);
  if (zone) {
    zone.innerHTML = `
      <span style="font-size: 20px;">📸</span>
      <strong style="font-size: 12px; color: #475569; font-family: 'Outfit', sans-serif;">Anexar Prints / Feed</strong>
      <span style="font-size: 10.5px; color: #94A3B8; font-family: 'Poppins', sans-serif;">Clique para enviar imagem</span>
      <input type="file" id="upload-input-${compId}" accept="image/*" style="display: none;" onchange="window.handleCompetitorUpload(event, '${compId}')">
    `;
    localStorage.removeItem('competitor-img-' + compId);
  }
};

window.loadCompetitorImages = function() {
  const comps = ['e-auditoria', 'iob-auditor', 'synchro', 'sovos', 'onesource', 'sittax'];
  comps.forEach(compId => {
    const savedImg = localStorage.getItem('competitor-img-' + compId);
    if (savedImg) {
      const zone = document.getElementById('media-zone-' + compId);
      if (zone) {
        zone.innerHTML = `
          <img src="${savedImg}" style="max-width: 100%; max-height: 200px; border-radius: 8px; object-fit: contain; box-shadow: var(--shadow-sm);" />
          <div style="margin-top: 8px; font-size: 11px; color: #ef4444; font-weight: 700; cursor: pointer; font-family: 'Outfit', sans-serif;" onclick="event.stopPropagation(); window.removeCompetitorImage('${compId}')">Remover Imagem</div>
          <input type="file" id="upload-input-${compId}" accept="image/*" style="display: none;" onchange="window.handleCompetitorUpload(event, '${compId}')">
        `;
      }
    }
  });
};

// Hook into startup initialization
setTimeout(() => {
  if (typeof window.loadCompetitorImages === 'function') {
    window.loadCompetitorImages();
  }
  if (typeof renderSugestoes === 'function') {
    renderSugestoes();
  }
}, 1200);

// --- COLABORAÇÃO (SUGESTÕES) MODULE ---
let sugestoes = [];
try {
  const savedSug = localStorage.getItem('saam_marketing_sugestoes_v1');
  if (savedSug) {
    sugestoes = JSON.parse(savedSug);
  }
} catch(e) {
  console.error(e);
}

function saveSugestoes() {
  localStorage.setItem('saam_marketing_sugestoes_v1', JSON.stringify(sugestoes));
}

function renderSugestoes() {
  const listEl = document.getElementById("sugestoes-list");
  const countEl = document.getElementById("sugestoes-count");
  const listExecEl = document.getElementById("sugestoes-executadas-list");
  const countExecEl = document.getElementById("sugestoes-executadas-count");
  if (!listEl) return;
  
  const pendentes = sugestoes.filter(s => !s.executada);
  const executadas = sugestoes.filter(s => s.executada);
  
  const renderList = (arr, container, countContainer, emptyMsg) => {
    if (arr.length === 0) {
      container.innerHTML = `<div style="text-align: center; padding: 40px; color: #64748B; font-size: 14px; background: #F8FAFC; border-radius: 12px; border: 1px dashed #CBD5E1;">${emptyMsg}</div>`;
      if(countContainer) countContainer.textContent = `0 contribuições`;
      return;
    }
    
    // Sort by newest first
    const sorted = [...arr].sort((a,b) => b.id - a.id);
    
    container.innerHTML = sorted.map(s => {
      const dateStr = new Date(s.id).toLocaleDateString('pt-BR', {day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit'});
      let typeColor = '#3B82F6';
      let typeBg = '#EFF6FF';
      if(s.tipo === 'Ideia de Post') { typeColor = '#8B5CF6'; typeBg = '#F5F3FF'; }
      if(s.tipo === 'Feedback Geral') { typeColor = '#F59E0B'; typeBg = '#FFFBEB'; }
      
      const toggleAction = s.executada 
        ? `<span style="margin-left: auto; cursor: pointer; color: #64748B; background: #F1F5F9; padding: 4px 8px; border-radius: 6px; display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600;" onclick="toggleExecutarSugestao(${s.id})" title="Desfazer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> Voltar
           </span>`
        : `<span style="margin-left: auto; cursor: pointer; color: #059669; background: #D1FAE5; padding: 4px 8px; border-radius: 6px; display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600;" onclick="toggleExecutarSugestao(${s.id})" title="Marcar como Executada">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Executar
           </span>`;

      return `
        <div style="background: #FFF; border: 1px solid var(--hairline); border-radius: 12px; padding: 16px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 12px; ${s.executada ? 'opacity: 0.6;' : ''}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <span style="display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; color: ${typeColor}; background: ${typeBg}; margin-bottom: 8px;">${s.tipo}</span>
              <h4 style="margin: 0; font-size: 16px; color: #0F172A;">${s.titulo}</h4>
            </div>
            <span style="font-size: 12px; color: #94A3B8;">${dateStr}</span>
          </div>
          <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.5; white-space: pre-wrap;">${s.desc}</p>
          <div style="border-top: 1px solid #F1F5F9; padding-top: 12px; font-size: 13px; color: #64748B; display: flex; align-items: center; gap: 6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Por <strong style="color:#0F172A;">${s.nome}</strong>
            
            ${toggleAction}
            
            <span style="${s.executada ? 'margin-left: 8px;' : ''} cursor: pointer; color: #EF4444; background: #FEF2F2; padding: 4px 8px; border-radius: 6px; display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600;" onclick="deleteSugestao(${s.id})" title="Deletar sugestão">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Excluir
            </span>
          </div>
        </div>
      `;
    }).join('');
    
    if(countContainer) countContainer.textContent = `${arr.length} contribuiç${arr.length === 1 ? 'ão' : 'ões'}`;
  };

  renderList(pendentes, listEl, countEl, "Ainda não há nenhuma ideia ou feedback pendente por aqui. Seja o primeiro!");
  if (listExecEl) {
    renderList(executadas, listExecEl, countExecEl, "Nenhuma colaboração foi executada ainda.");
  }
}

window.toggleExecutarSugestao = function(id) {
  const sug = sugestoes.find(s => s.id === id);
  if (sug) {
    sug.executada = !sug.executada;
    saveSugestoes();
    renderSugestoes();
  }
};

window.deleteSugestao = function(id) {
  if(confirm("Deseja realmente remover esta contribuição?")) {
    sugestoes = sugestoes.filter(s => s.id !== id);
    saveSugestoes();
    renderSugestoes();
  }
};

const formSugestao = document.getElementById("form-sugestao");
if (formSugestao) {
  formSugestao.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("sugestao-nome").value;
    const tipo = document.getElementById("sugestao-tipo").value;
    const titulo = document.getElementById("sugestao-titulo").value;
    const desc = document.getElementById("sugestao-desc").value;
    
    sugestoes.push({
      id: Date.now(),
      nome, tipo, titulo, desc
    });
    
    saveSugestoes();
    renderSugestoes();
    formSugestao.reset();
    
    if (typeof showToast === 'function') {
      showToast('✅ Contribuição enviada com sucesso!', 'success');
    } else {
      alert("Enviado com sucesso!");
    }
  });
}
