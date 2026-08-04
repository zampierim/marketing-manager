const fs = require('fs');

// 1. Update style.css
let css = fs.readFileSync('style.css', 'utf-8');
css = css.replace(/grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(200px,\s*1fr\)\);/, 'grid-template-columns: repeat(3, 1fr);');
// add responsive rule for .tabs
if (!css.includes('@media (max-width: 900px)')) {
    css += `
@media (max-width: 900px) {
  .tabs { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .tabs { grid-template-columns: 1fr; }
}
`;
}
fs.writeFileSync('style.css', css, 'utf-8');

// 2. Update index.html
let html = fs.readFileSync('index.html', 'utf-8');

// Insert new button at the end of the tabs
const newCard = `
      <button type="button" class="tab-btn" id="btn-tab-identidade">
        <div class="tab-card-top">
          <span class="tab-icon" style="background: rgba(236,72,153,0.15); color: #EC4899;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 6 6 .5-4.5 4 1.5 6-6-3-6 3 1.5-6-4.5-4 6-.5z"/></svg>
          </span>
          <span class="tab-stat" style="background: rgba(236,72,153,0.15); color: #EC4899;">Brand Book</span>
        </div>
        <span class="tab-text">
          <p class="tab-title">Identidade Visual</p>
          <p class="tab-sub">Cores, Logos e Posicionamento</p>
        </span>
        <span class="tab-arrow" style="color: #EC4899;">Abrir
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>
        </span>
      </button>
    </div>
  </div>`;

html = html.replace(/<\/button>\s*<\/div>\s*<\/div>\s*<!-- Página Calendário/, newCard + '\n\n  <!-- Página Calendário');

// Insert the new page for "Identidade Visual"
const newPage = `
  <!-- Página Identidade Visual -->
  <div id="page-identidade" class="hidden">
    <button type="button" class="back-btn" data-target="home">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      Página inicial
    </button>
    
    <div class="page-header">
      <div class="page-icon" style="background: rgba(236,72,153,0.15); color: #EC4899;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 6 6 .5-4.5 4 1.5 6-6-3-6 3 1.5-6-4.5-4 6-.5z"/></svg>
      </div>
      <div>
        <h2>Identidade Visual (Brand Book)</h2>
        <p>Diretrizes de marca, paleta de cores e assets do SAAM.</p>
      </div>
    </div>
    
    <div class="ai-container">
      <div style="background: #FFFFFF; padding: 40px; border-radius: 16px; text-align: center; border: 1px dashed #CBD5E1;">
         <h3 style="color: #64748B;">Módulo de Identidade Visual em Construção</h3>
         <p style="color: #94A3B8;">Em breve, você poderá consultar as diretrizes e baixar assets da marca por aqui.</p>
      </div>
    </div>
  </div>
`;

if (!html.includes('id="page-identidade"')) {
    html = html.replace('<!-- Página Calendário (Escondida por padrão) -->', newPage + '\n  <!-- Página Calendário (Escondida por padrão) -->');
}
fs.writeFileSync('index.html', html, 'utf-8');

// 3. Update app.js
let appJs = fs.readFileSync('app.js', 'utf-8');

const jsNavUpdate = `
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
`;

if (!appJs.includes('btnTabIdentidade')) {
    appJs += '\n' + jsNavUpdate;
    fs.writeFileSync('app.js', appJs, 'utf-8');
}

console.log("6 cards grid and Identidade Visual tab added.");
