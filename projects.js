// projects.js

document.addEventListener("DOMContentLoaded", () => {
  const pageProjetos = document.getElementById("page-projetos");
  const pageHome = document.getElementById("page-home");
  const btnOpenProjetos = document.getElementById("btn-open-projetos");

  // Navigation
  if (btnOpenProjetos) {
    btnOpenProjetos.addEventListener("click", () => {
      // Hide all pages (generic approach based on existing code)
      document.querySelectorAll(".app > div[id^='page-']").forEach(p => p.classList.add("hidden"));
      if (pageProjetos) pageProjetos.classList.remove("hidden");
      renderProjects();
      renderProcesses();
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

  // State Management
  let projects = JSON.parse(localStorage.getItem("saam_projects")) || [];
  let processes = JSON.parse(localStorage.getItem("saam_processes")) || [];

  function saveProjects() {
    localStorage.setItem("saam_projects", JSON.stringify(projects));
  }

  function saveProcesses() {
    localStorage.setItem("saam_processes", JSON.stringify(processes));
  }

  // Modals functionality
  const projectModal = document.getElementById("project-modal");
  const processModal = document.getElementById("process-modal");
  
  document.getElementById("btn-add-project")?.addEventListener("click", () => {
    document.getElementById("project-form").reset();
    document.getElementById("project-id").value = "";
    document.getElementById("project-modal-title").textContent = "Novo Projeto";
    document.getElementById("btn-delete-project").style.display = "none";
    projectModal.classList.remove("hidden");
  });

  document.getElementById("btn-add-process")?.addEventListener("click", () => {
    document.getElementById("process-form").reset();
    document.getElementById("process-id").value = "";
    document.getElementById("process-modal-title").textContent = "Novo Processo";
    document.getElementById("btn-delete-process").style.display = "none";
    processModal.classList.remove("hidden");
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
    const idVal = document.getElementById("project-id").value;
    const newProject = {
      id: idVal ? parseInt(idVal) : Date.now(),
      title: document.getElementById("project-title").value,
      description: document.getElementById("project-description").value,
      status: document.getElementById("project-status").value
    };

    if (idVal) {
      const idx = projects.findIndex(p => p.id === newProject.id);
      if (idx > -1) projects[idx] = newProject;
    } else {
      projects.push(newProject);
    }
    
    saveProjects();
    projectModal.classList.add("hidden");
    renderProjects();
    if(typeof showToast === 'function') showToast('✅ Projeto salvo', 'success');
  });

  // Process Form Submit
  document.getElementById("process-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const idVal = document.getElementById("process-id").value;
    const newProcess = {
      id: idVal ? parseInt(idVal) : Date.now(),
      title: document.getElementById("process-title").value,
      frequency: document.getElementById("process-frequency").value
    };

    if (idVal) {
      const idx = processes.findIndex(p => p.id === newProcess.id);
      if (idx > -1) processes[idx] = newProcess;
    } else {
      processes.push(newProcess);
    }
    
    saveProcesses();
    processModal.classList.add("hidden");
    renderProcesses();
    if(typeof showToast === 'function') showToast('✅ Processo salvo', 'success');
  });

  // Delete Buttons
  document.getElementById("btn-delete-project")?.addEventListener("click", () => {
    if(confirm("Excluir este projeto?")) {
      const idVal = document.getElementById("project-id").value;
      projects = projects.filter(p => p.id !== parseInt(idVal));
      saveProjects();
      projectModal.classList.add("hidden");
      renderProjects();
    }
  });

  document.getElementById("btn-delete-process")?.addEventListener("click", () => {
    if(confirm("Excluir este processo?")) {
      const idVal = document.getElementById("process-id").value;
      processes = processes.filter(p => p.id !== parseInt(idVal));
      saveProcesses();
      processModal.classList.add("hidden");
      renderProcesses();
    }
  });

  // Rendering Functions
  window.editProject = function(id) {
    const proj = projects.find(p => p.id === id);
    if(proj) {
      document.getElementById("project-id").value = proj.id;
      document.getElementById("project-title").value = proj.title;
      document.getElementById("project-description").value = proj.description || "";
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
      document.getElementById("process-frequency").value = proc.frequency || "Diário";
      document.getElementById("process-modal-title").textContent = "Editar Processo";
      document.getElementById("btn-delete-process").style.display = "block";
      processModal.classList.remove("hidden");
    }
  };

  function renderProjects() {
    const containerInProgress = document.getElementById("projects-in-progress");
    const containerBacklog = document.getElementById("projects-backlog");
    const containerDone = document.getElementById("projects-done");

    if(!containerInProgress || !containerBacklog || !containerDone) return;

    containerInProgress.innerHTML = "";
    containerBacklog.innerHTML = "";
    containerDone.innerHTML = "";

    projects.forEach(p => {
      const el = document.createElement("div");
      el.className = "project-card";
      el.style = "background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s;";
      
      let descHtml = "";
      if (p.description) {
        descHtml = `<div style="font-size: 12px; color: #64748B; margin-top: 6px; white-space: pre-wrap; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${p.description}</div>`;
      }
      
      el.innerHTML = `
        <div style="font-size: 14px; font-weight: 700; color: #0F172A;">${p.title}</div>
        ${descHtml}
      `;
      el.onmouseover = () => { el.style.background = "#F1F5F9"; el.style.borderColor = "#CBD5E1"; };
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

    if(containerInProgress.children.length === 0) containerInProgress.innerHTML = '<div style="color: #94A3B8; font-size: 13px; font-style: italic;">Nenhum projeto em andamento.</div>';
    if(containerBacklog.children.length === 0) containerBacklog.innerHTML = '<div style="color: #94A3B8; font-size: 13px; font-style: italic;">Nenhum projeto no backlog.</div>';
    if(containerDone.children.length === 0) containerDone.innerHTML = '<div style="color: #94A3B8; font-size: 13px; font-style: italic;">Nenhum projeto finalizado.</div>';
  }

  function renderProcesses() {
    const container = document.getElementById("processes-list");
    if(!container) return;

    container.innerHTML = "";
    
    if (processes.length === 0) {
      container.innerHTML = '<div style="color: #94A3B8; font-size: 13px; font-style: italic;">Nenhuma rotina cadastrada.</div>';
      return;
    }

    processes.forEach(p => {
      const el = document.createElement("div");
      el.style = "background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px 16px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: all 0.2s;";
      
      let freqColor = "#64748B";
      let freqBg = "#F1F5F9";
      if (p.frequency === "Diário") { freqColor = "#059669"; freqBg = "#D1FAE5"; }
      else if (p.frequency === "Semanal") { freqColor = "#2563EB"; freqBg = "#DBEAFE"; }
      else if (p.frequency === "Mensal") { freqColor = "#D97706"; freqBg = "#FEF3C7"; }

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

});
