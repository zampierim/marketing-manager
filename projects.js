// projects.js - Real-time Firestore Cloud Sync for Projects & Processes

document.addEventListener("DOMContentLoaded", () => {
  const pageProjetos = document.getElementById("page-projetos");
  const pageHome = document.getElementById("page-home");
  const btnOpenProjetos = document.getElementById("btn-open-projetos");

  // Navigation (Password Protected)
  if (btnOpenProjetos) {
    btnOpenProjetos.addEventListener("click", () => {
      const openPage = () => {
        document.querySelectorAll(".app > div[id^='page-']").forEach(p => p.classList.add("hidden"));
        if (pageProjetos) pageProjetos.classList.remove("hidden");
        renderProjects();
        renderProcesses();
      };

      if (sessionStorage.getItem("saam_unlocked") === "true") {
        openPage();
      } else {
        if (typeof window.requirePassword === 'function') {
          window.requirePassword(openPage);
        } else {
          openPage();
        }
      }
    });
  }

  // Back button inside Projetos page
  const backBtns = document.querySelectorAll("#page-projetos .back-btn");
  backBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      pageProjetos.classList.add("hidden");
      pageHome.classList.remove("hidden");
    });
  });

    // Default seed projects matching user board
  const defaultProjects = [
    { id: 101, title: "Estruturação Linkedin", description: "", status: "backlog" },
    { id: 102, title: "Mapeamento de Eventos", description: "Grupos empresariais, distribuidores, ERPs, atacadistas, pós-graduação (auditores)", status: "backlog" },
    { id: 103, title: "Lead Magnet (Ímã de Leads)", description: "Conteúdo de valor -> Formulário -> Captura do lead -> Nutrição -> Conversão", status: "backlog" },
    { id: 104, title: "Reestruturação instagram", description: "Destaques, biografia..", status: "in_progress" },
    { id: 105, title: "Vídeo demonstrativo - Site", description: "vídeo para o site novo", status: "in_progress" },
    { id: 106, title: "Plataforma Marketing", description: "", status: "in_progress" },
    { id: 107, title: "Squad - Boletim Informativo (PO)", description: "", status: "done" }
  ];

  const defaultProcesses = [
    { id: 201, title: "Material para grupo de informativo", frequency: "Semanal: Ter, Qui", days: ["Ter", "Qui"], notes: "" },
    { id: 202, title: "Acompanhar métricas - ADS", frequency: "Diário", days: [], notes: "" },
    { id: 203, title: "Material para redes sociais", frequency: "Semanal", days: [], notes: "" },
    { id: 204, title: "Auxilio com material para o comercial", frequency: "Mensal", days: [], notes: "" },
    { id: 205, title: "Criação e publicação de artigos - Blog", frequency: "Semanal", days: [], notes: "" }
  ];

  // State Management (Local + Cloud)
  let projects = [];
  try {
    const savedProj = localStorage.getItem("saam_projects");
    projects = savedProj ? JSON.parse(savedProj) : defaultProjects;
  } catch(e) {
    projects = defaultProjects;
  }

  let processes = [];
  try {
    const savedProc = localStorage.getItem("saam_processes");
    processes = savedProc ? JSON.parse(savedProc) : defaultProcesses;
  } catch(e) {
    processes = defaultProcesses;
  }

  function saveLocal() {
    try {
      localStorage.setItem("saam_projects", JSON.stringify(projects));
      localStorage.setItem("saam_processes", JSON.stringify(processes));
    } catch(e) {}
  }

  // Firestore Real-Time Sync
  function initFirestoreProjectsSync() {
    if (typeof firebase === 'undefined' || !firebase.apps.length) {
      setTimeout(initFirestoreProjectsSync, 200);
      return;
    }
    const firestore = firebase.firestore();

    // 1. Sync Projects
    firestore.collection("marketing_projects").onSnapshot((snapshot) => {
      if (!snapshot.empty) {
        const cloudProjects = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data && data.id && data.title) cloudProjects.push(data);
        });
        if (cloudProjects.length > 0) {
          projects = cloudProjects;
          saveLocal();
          renderProjects();
        }
      } else {
        // Seed initial projects to cloud once
        const batch = firestore.batch();
        defaultProjects.forEach(p => {
          batch.set(firestore.collection("marketing_projects").doc(p.id.toString()), p);
        });
        batch.commit().catch(e => console.warn("Seed projects error:", e));
        projects = defaultProjects;
        saveLocal();
        renderProjects();
      }
    }, err => {
      console.warn("Projects sync note:", err);
      renderProjects();
    });

    // 2. Sync Processes / Routines
    firestore.collection("marketing_processes").onSnapshot((snapshot) => {
      if (!snapshot.empty) {
        const cloudProcesses = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data && data.id && data.title) cloudProcesses.push(data);
        });
        if (cloudProcesses.length > 0) {
          processes = cloudProcesses;
          saveLocal();
          renderProcesses();
        }
      } else {
        // Seed initial processes to cloud once
        const batch = firestore.batch();
        defaultProcesses.forEach(p => {
          batch.set(firestore.collection("marketing_processes").doc(p.id.toString()), p);
        });
        batch.commit().catch(e => console.warn("Seed processes error:", e));
        processes = defaultProcesses;
        saveLocal();
        renderProcesses();
      }
    }, err => {
      console.warn("Processes sync note:", err);
      renderProcesses();
    });
  }

  initFirestoreProjectsSync();

  // Cloud Persistence Helpers
  async function saveProjectToCloud(proj) {
    const idx = projects.findIndex(p => p.id === proj.id);
    if (idx > -1) {
      projects[idx] = proj;
    } else {
      projects.push(proj);
    }
    saveLocal();
    renderProjects();
    try {
      if (typeof firebase !== 'undefined' && firebase.apps.length) {
        await firebase.firestore().collection("marketing_projects").doc(proj.id.toString()).set(proj);
      }
    } catch(e) { console.error("Error saving project to cloud:", e); }
  }

  async function deleteProjectFromCloud(id) {
    const idInt = parseInt(id);
    projects = projects.filter(p => p.id !== idInt);
    saveLocal();
    renderProjects();
    try {
      if (typeof firebase !== 'undefined' && firebase.apps.length) {
        await firebase.firestore().collection("marketing_projects").doc(id.toString()).delete();
      }
    } catch(e) { console.error("Error deleting project from cloud:", e); }
  }

  async function saveProcessToCloud(proc) {
    const idx = processes.findIndex(p => p.id === proc.id);
    if (idx > -1) {
      processes[idx] = proc;
    } else {
      processes.push(proc);
    }
    saveLocal();
    renderProcesses();
    try {
      if (typeof firebase !== 'undefined' && firebase.apps.length) {
        await firebase.firestore().collection("marketing_processes").doc(proc.id.toString()).set(proc);
      }
    } catch(e) { console.error("Error saving process to cloud:", e); }
  }

  async function deleteProcessFromCloud(id) {
    const idInt = parseInt(id);
    processes = processes.filter(p => p.id !== idInt);
    saveLocal();
    renderProcesses();
    try {
      if (typeof firebase !== 'undefined' && firebase.apps.length) {
        await firebase.firestore().collection("marketing_processes").doc(id.toString()).delete();
      }
    } catch(e) { console.error("Error deleting process from cloud:", e); }
  }

  // Modals functionality
  const projectModal = document.getElementById("project-modal");
  const processModal = document.getElementById("process-modal");
  
  document.getElementById("btn-add-project")?.addEventListener("click", () => {
    if(window.requirePassword) {
      window.requirePassword(() => {
        document.getElementById("project-form").reset();
        document.getElementById("project-id").value = "";
        if (document.getElementById("project-link")) {
          document.getElementById("project-link").value = "";
        }
        document.getElementById("project-modal-title").textContent = "Novo Projeto";
        document.getElementById("btn-delete-project").style.display = "none";
        projectModal.classList.remove("hidden");
      });
    }
  });

  document.getElementById("btn-add-process")?.addEventListener("click", () => {
    if(window.requirePassword) {
      window.requirePassword(() => {
        document.getElementById("process-form").reset();
        document.getElementById("process-id").value = "";
        
        const freqSelect = document.getElementById("process-frequency");
        if(freqSelect) freqSelect.dispatchEvent(new Event("change"));

        document.getElementById("process-modal-title").textContent = "Novo Processo";
        document.getElementById("btn-delete-process").style.display = "none";
        processModal.classList.remove("hidden");
      });
    }
  });

  document.querySelectorAll(".close-project-modal").forEach(btn => {
    btn.addEventListener("click", () => projectModal.classList.add("hidden"));
  });

  document.querySelectorAll(".close-process-modal").forEach(btn => {
    btn.addEventListener("click", () => processModal.classList.add("hidden"));
  });

  // Project Form Submit
  document.getElementById("project-form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (sessionStorage.getItem("saam_unlocked") !== "true") {
      if (window.requirePassword) {
        window.requirePassword(() => {
          document.getElementById("project-form").dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        });
      }
      return;
    }

    const idVal = document.getElementById("project-id").value;
    const newProject = {
      id: idVal ? parseInt(idVal) : Date.now(),
      title: document.getElementById("project-title").value,
      description: document.getElementById("project-description").value,
      link: document.getElementById("project-link") ? document.getElementById("project-link").value.trim() : "",
      status: document.getElementById("project-status").value
    };

    saveProjectToCloud(newProject);
    projectModal.classList.add("hidden");
    if(typeof showToast === 'function') showToast('✅ Projeto salvo na nuvem!', 'success');
  });

  // Dynamic UI toggling for Process Frequency
  const freqSelect = document.getElementById("process-frequency");
  const weeklyDays = document.getElementById("weekly-days-selector");
  const monthlyDays = document.getElementById("monthly-days-selector");

  freqSelect?.addEventListener("change", (e) => {
    if (e.target.value === "Semanal") {
      weeklyDays.style.display = "block";
      monthlyDays.style.display = "none";
    } else if (e.target.value === "Mensal") {
      weeklyDays.style.display = "none";
      monthlyDays.style.display = "block";
    } else {
      weeklyDays.style.display = "none";
      monthlyDays.style.display = "none";
    }
  });

  // Process Form Submit
  document.getElementById("process-form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (sessionStorage.getItem("saam_unlocked") !== "true") {
      if (window.requirePassword) {
        window.requirePassword(() => {
          document.getElementById("process-form").dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        });
      }
      return;
    }

    const idVal = document.getElementById("process-id").value;
    let freqValue = document.getElementById("process-frequency").value;
    if (freqValue === "Semanal") {
      const checkedDays = Array.from(document.querySelectorAll('input[name="week_days"]:checked')).map(cb => cb.value);
      if (checkedDays.length > 0) {
        freqValue = `Semanal: ${checkedDays.join(", ")}`;
      }
    } else if (freqValue === "Mensal") {
      const monthInput = document.getElementById("process-month-days").value;
      if (monthInput.trim() !== "") {
        freqValue = `Mensal: ${monthInput.trim()}`;
      }
    }

    const newProcess = {
      id: idVal ? parseInt(idVal) : Date.now(),
      title: document.getElementById("process-title").value,
      frequency: freqValue
    };

    saveProcessToCloud(newProcess);
    processModal.classList.add("hidden");
    if(typeof showToast === 'function') showToast('✅ Processo salvo na nuvem!', 'success');
  });

  // Delete Buttons
  document.getElementById("btn-delete-project")?.addEventListener("click", () => {
    if (sessionStorage.getItem("saam_unlocked") !== "true") {
      if (window.requirePassword) {
        window.requirePassword(() => {
          document.getElementById("btn-delete-project").click();
        });
      }
      return;
    }
    if(confirm("Excluir este projeto?")) {
      const idVal = document.getElementById("project-id").value;
      deleteProjectFromCloud(idVal);
      projectModal.classList.add("hidden");
      if(typeof showToast === 'function') showToast('Projeto excluído.', 'success');
    }
  });

  document.getElementById("btn-delete-process")?.addEventListener("click", () => {
    if (sessionStorage.getItem("saam_unlocked") !== "true") {
      if (window.requirePassword) {
        window.requirePassword(() => {
          document.getElementById("btn-delete-process").click();
        });
      }
      return;
    }
    if(confirm("Excluir este processo?")) {
      const idVal = document.getElementById("process-id").value;
      deleteProcessFromCloud(idVal);
      processModal.classList.add("hidden");
      if(typeof showToast === 'function') showToast('Processo excluído.', 'success');
    }
  });

  // Rendering Functions
  window.editProject = function(id) {
    const proj = projects.find(p => p.id === id);
    if(proj) {
      document.getElementById("project-id").value = proj.id;
      document.getElementById("project-title").value = proj.title;
      document.getElementById("project-description").value = proj.description || "";
      if (document.getElementById("project-link")) {
        document.getElementById("project-link").value = proj.link || "";
      }
      document.getElementById("project-status").value = proj.status;
      document.getElementById("project-modal-title").textContent = "Editar Projeto";
      document.getElementById("btn-delete-project").style.display = "block";
      projectModal.classList.remove("hidden");
    }
  };

  window.editProcess = function(id) {
    const proc = processes.find(p => p.id === id);
    if(proc) {
      document.getElementById("process-id").value = proc.id;
      document.getElementById("process-title").value = proc.title;
      
      const freqSelect = document.getElementById("process-frequency");
      const monthDaysInput = document.getElementById("process-month-days");
      const weekCheckboxes = document.querySelectorAll('input[name="week_days"]');
      
      weekCheckboxes.forEach(cb => cb.checked = false);
      monthDaysInput.value = "";
      
      const freq = proc.frequency || "Diário";
      if (freq.startsWith("Semanal:")) {
        freqSelect.value = "Semanal";
        const daysStr = freq.replace("Semanal:", "").trim();
        const daysArr = daysStr.split(",").map(s => s.trim());
        weekCheckboxes.forEach(cb => {
          if (daysArr.includes(cb.value)) cb.checked = true;
        });
      } else if (freq.startsWith("Mensal:")) {
        freqSelect.value = "Mensal";
        monthDaysInput.value = freq.replace("Mensal:", "").trim();
      } else {
        let optExists = Array.from(freqSelect.options).some(opt => opt.value === freq);
        freqSelect.value = optExists ? freq : "Diário";
      }
      
      freqSelect.dispatchEvent(new Event('change'));
      document.getElementById("process-modal-title").textContent = "Editar Processo";
      document.getElementById("btn-delete-process").style.display = "block";
      document.getElementById("process-modal").classList.remove("hidden");
    }
  };

  // Move project status with password protection
  function moveProjectToStatus(projectId, targetStatus) {
    const applyMove = () => {
      const proj = projects.find(p => p.id === projectId);
      if (proj && proj.status !== targetStatus) {
        proj.status = targetStatus;
        saveProjectToCloud(proj);
        if (typeof showToast === 'function') {
          const statusLabels = { 'backlog': 'Backlog', 'in_progress': 'Em Andamento', 'done': 'Finalizado' };
          showToast(`✅ Movido para ${statusLabels[targetStatus] || targetStatus}!`, 'success');
        }
      }
    };

    if (sessionStorage.getItem("saam_unlocked") === "true") {
      applyMove();
    } else {
      if (window.requirePassword) {
        window.requirePassword(applyMove);
      }
    }
  }

  // Setup Drag and Drop on Kanban Columns
  function setupKanbanDropZone(container, targetStatus) {
    if (!container) return;

    container.ondragover = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      container.style.background = "rgba(37, 99, 235, 0.06)";
      container.style.border = "2px dashed #3B82F6";
      container.style.borderRadius = "8px";
    };

    container.ondragleave = (e) => {
      container.style.background = "";
      container.style.border = "";
      container.style.borderRadius = "";
    };

    container.ondrop = (e) => {
      e.preventDefault();
      container.style.background = "";
      container.style.border = "";
      container.style.borderRadius = "";

      const rawId = e.dataTransfer.getData("text/plain");
      if (rawId) {
        const projId = parseInt(rawId);
        moveProjectToStatus(projId, targetStatus);
      }
    };
  }

  function renderProjects() {
    const containerInProgress = document.getElementById("projects-in-progress");
    const containerBacklog = document.getElementById("projects-backlog");
    const containerDone = document.getElementById("projects-done");

    if(!containerInProgress || !containerBacklog || !containerDone) return;

    containerInProgress.innerHTML = "";
    containerBacklog.innerHTML = "";
    containerDone.innerHTML = "";

    // Setup drop zones for each column
    setupKanbanDropZone(containerBacklog, "backlog");
    setupKanbanDropZone(containerInProgress, "in_progress");
    setupKanbanDropZone(containerDone, "done");

    projects.forEach(p => {
      const el = document.createElement("div");
      el.className = "project-card";
      el.draggable = true;
      el.style = "background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px 16px; border-radius: 8px; cursor: grab; transition: all 0.2s; user-select: none; position: relative;";
      
      let descHtml = "";
      if (p.description) {
        descHtml = `<div style="font-size: 12px; color: #64748B; margin-top: 6px; white-space: pre-wrap; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${p.description}</div>`;
      }

      let linkHtml = "";
      if (p.link) {
        linkHtml = `
          <div style="margin-top: 8px;">
            <a href="${p.link}" target="_blank" onclick="event.stopPropagation();" style="display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 700; color: #2563EB; background: #EFF6FF; border: 1px solid #BFDBFE; padding: 4px 10px; border-radius: 6px; text-decoration: none; transition: background 0.2s;" onmouseover="this.style.background='#DBEAFE'" onmouseout="this.style.background='#EFF6FF'" title="Abrir link do projeto: ${p.link}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Acessar Link
            </a>
          </div>
        `;
      }
      
      el.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
          <div style="font-size: 14px; font-weight: 700; color: #0F172A; flex: 1;">${p.title}</div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" style="cursor: grab; flex-shrink: 0; margin-top: 2px;"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
        </div>
        ${descHtml}
        ${linkHtml}
      `;

      // Drag Events
      el.ondragstart = (e) => {
        e.dataTransfer.setData("text/plain", p.id);
        e.dataTransfer.effectAllowed = "move";
        el.style.opacity = "0.4";
        el.style.cursor = "grabbing";
      };

      el.ondragend = () => {
        el.style.opacity = "1";
        el.style.cursor = "grab";
      };

      el.onmouseover = () => { el.style.background = "#F1F5F9"; el.style.borderColor = "#CBD5E1"; el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; };
      el.onmouseout = () => { el.style.background = "#F8FAFC"; el.style.borderColor = "#E2E8F0"; };
      el.onclick = () => editProject(p.id);

      if(p.status === "in_progress") {
        el.style.borderLeft = "4px solid #3B82F6";
        containerInProgress.appendChild(el);
      } else if (p.status === "backlog") {
        el.style.borderLeft = "4px solid #94A3B8";
        containerBacklog.appendChild(el);
      } else if (p.status === "done") {
        el.style.borderLeft = "4px solid #10B981";
        containerDone.appendChild(el);
      }
    });

    if(containerInProgress.children.length === 0) containerInProgress.innerHTML = '<div style="color: #94A3B8; font-size: 13px; font-style: italic; padding: 12px; border: 1px dashed #CBD5E1; border-radius: 8px; text-align: center;">Arraste um card para cá.</div>';
    if(containerBacklog.children.length === 0) containerBacklog.innerHTML = '<div style="color: #94A3B8; font-size: 13px; font-style: italic; padding: 12px; border: 1px dashed #CBD5E1; border-radius: 8px; text-align: center;">Arraste um card para cá.</div>';
    if(containerDone.children.length === 0) containerDone.innerHTML = '<div style="color: #94A3B8; font-size: 13px; font-style: italic; padding: 12px; border: 1px dashed #CBD5E1; border-radius: 8px; text-align: center;">Arraste um card para cá.</div>';
  }

  function renderProcesses() {
    const container = document.getElementById("processes-list");
    if(!container) return;

    container.innerHTML = "";
    
    if (!processes || processes.length === 0) {
      container.innerHTML = '<div style="color: #94A3B8; font-size: 13px; font-style: italic;">Nenhuma rotina cadastrada.</div>';
      return;
    }

    processes.forEach(p => {
      const el = document.createElement("div");
      el.style = "background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px 16px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: all 0.2s;";
      
      let freqColor = "#64748B";
      let freqBg = "#F1F5F9";
      if (p.frequency === "Diário") { freqColor = "#059669"; freqBg = "#D1FAE5"; }
      else if (p.frequency && p.frequency.startsWith("Semanal")) { freqColor = "#2563EB"; freqBg = "#DBEAFE"; }
      else if (p.frequency && p.frequency.startsWith("Mensal")) { freqColor = "#D97706"; freqBg = "#FEF3C7"; }

      el.innerHTML = `
        <div style="color: #64748B;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l-3.32 3.32"/></svg></div>
        <div style="font-size: 14px; font-weight: 700; color: #0F172A; flex: 1;">${p.title}</div>
        <div style="font-size: 11px; font-weight: 700; color: ${freqColor}; background: ${freqBg}; padding: 4px 8px; border-radius: 4px;">${p.frequency || "Diário"}</div>
      `;
      el.onmouseover = () => { el.style.background = "#F1F5F9"; el.style.borderColor = "#CBD5E1"; };
      el.onmouseout = () => { el.style.background = "#F8FAFC"; el.style.borderColor = "#E2E8F0"; };
      el.onclick = () => editProcess(p.id);
      
      container.appendChild(el);
    });
  }

  // Initial render on boot
  renderProjects();
  renderProcesses();
});
