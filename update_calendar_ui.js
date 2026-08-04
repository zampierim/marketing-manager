const fs = require('fs');

let appjs = fs.readFileSync('app.js', 'utf-8');

const createPostCardReplacement = `function createPostCard(post) {
  const card = document.createElement("div");
  card.className = "post-card";
  
  const imgUrl = post.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80";

  let iconSvg = '';
  if(post.destiny === 'WhatsApp') {
    iconSvg = \`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>\`;
  } else if(post.destiny === 'YouTube') {
    iconSvg = \`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>\`;
  } else if(post.destiny === 'Blog') {
    iconSvg = \`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>\`;
  } else { 
    iconSvg = \`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>\`;
  }

  card.innerHTML = \`
    <div class="post-card-image">
      <img src="\${imgUrl}" alt="\${post.tag}">
      <div class="status-dot status-\${post.status}" title="Clique para avançar status" data-post-id="\${post.id}"></div>
      <div class="post-card-info" style="display: flex; align-items: center;">
        <span class="post-tag" style="display: flex; align-items: center;">\${iconSvg}\${post.tag}</span>
      </div>
    </div>
  \`;
  
  const dot = card.querySelector(".status-dot");
  dot.addEventListener("click", (e) => {
    e.stopPropagation();
    let idx = statusCycle.indexOf(post.status);
    let nextStatus = statusCycle[(idx + 1) % statusCycle.length];
    
    post.status = nextStatus;
    renderCalendar();
    renderList();
  });
  
  return card;
}`;

const renderListReplacement = `function renderList() {
  postListEl.innerHTML = "";
  
  const sortedPosts = getFilteredPosts().sort((a, b) => new Date(a.date) - new Date(b.date));
  
  if (sortedPosts.length === 0) {
    postListEl.innerHTML = "<p class='placeholder-text'>Nenhum criativo cadastrado.</p>";
    return;
  }
  
  let currentWeekGroup = "";
  
  function getWeekName(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    if(d.getMonth() !== 7 || d.getFullYear() !== 2026) return "Outros"; // Only handle August 2026 for now
    const day = d.getDate();
    if(day >= 3 && day <= 9) return "Semana 1: O MUNDO MUDOU";
    if(day >= 10 && day <= 16) return "Semana 2: O PROBLEMA";
    if(day >= 17 && day <= 23) return "Semana 3: EXISTE UM NOVO JEITO";
    if(day >= 24 && day <= 31) return "Semana 4: COMO A SAAM PENSA";
    return "Outros";
  }
  
  sortedPosts.forEach(post => {
    const d = new Date(post.date + "T00:00:00");
    
    const weekGroup = getWeekName(post.date);
    if (weekGroup !== currentWeekGroup) {
      currentWeekGroup = weekGroup;
      const header = document.createElement("div");
      header.className = "list-month-header";
      header.style = "background: #F1F5F9; color: #334155; padding: 12px 16px; margin: 24px 0 12px 0; border-radius: 8px; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; border-left: 4px solid #6366F1;";
      header.innerHTML = \`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> \${currentWeekGroup}\`;
      postListEl.appendChild(header);
    }
    
    const imgUrl = post.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80";
    const dayStr = String(d.getDate()).padStart(2,"0");
    const weekDay = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][d.getDay()];

    let iconSvg = '';
    if(post.destiny === 'WhatsApp') {
      iconSvg = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>\`;
    } else if(post.destiny === 'YouTube') {
      iconSvg = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>\`;
    } else if(post.destiny === 'Blog') {
      iconSvg = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>\`;
    } else { 
      iconSvg = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>\`;
    }

    const item = document.createElement("div");
    item.className = "list-item";
    item.innerHTML = \`
      <div class="list-date-block">
        <span class="day">\${dayStr}</span>
        <span class="weekday">\${weekDay}</span>
      </div>
      <img src="\${imgUrl}" class="list-item-thumb">
      <div class="list-item-content">
        <h4 class="list-item-title" style="display: flex; align-items: center;">\${iconSvg}\${post.tag}</h4>
        <p class="list-item-caption">\${post.caption || "Sem legenda..."}</p>
      </div>
      <div class="list-item-actions">
        <select class="list-status-select status-\${post.status}">
          <option value="rascunho" \${post.status==='rascunho'?'selected':''}>Rascunho</option>
          <option value="analise" \${post.status==='analise'?'selected':''}>Em Análise</option>
          <option value="aprovado" \${post.status==='aprovado'?'selected':''}>Aprovado</option>
          <option value="agendado" \${post.status==='agendado'?'selected':''}>Agendado</option>
          <option value="publicado" \${post.status==='publicado'?'selected':''}>Publicado</option>
        </select>
      </div>
    \`;
    
    const selectBox = item.querySelector(".list-status-select");
    selectBox.addEventListener("click", (e) => e.stopPropagation());
    selectBox.addEventListener("change", (e) => {
      post.status = e.target.value;
      selectBox.className = \`list-status-select status-\${e.target.value}\`;
      renderCalendar();
    });

    item.addEventListener("click", () => openModal(post));
    postListEl.appendChild(item);
  });
}`;

appjs = appjs.replace(/function createPostCard\(post\) \{[\s\S]*?return card;\n\}/, createPostCardReplacement);
appjs = appjs.replace(/function renderList\(\) \{[\s\S]*?\}\n\}\n\nprevMonthBtn/, renderListReplacement + '\n\nprevMonthBtn');

fs.writeFileSync('app.js', appjs, 'utf-8');
console.log("UI scripts updated.");
