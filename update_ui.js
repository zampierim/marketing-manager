const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Ideas Pills
const newIdeasPills = `<button class="filter-pill active" onclick="filterGeral('Todos')">Todos (400)</button>
          <button class="filter-pill" onclick="filterAudience('Externo')">Externo</button>
          <button class="filter-pill" onclick="filterAudience('Interno')">Interno</button>
          <span style="border-left: 1px solid var(--hairline); height: 24px; margin: 0 4px;"></span>
          <button class="filter-pill" onclick="filterGeral('Reforma Tributária')">Reforma Tributária</button>
          <button class="filter-pill" onclick="filterGeral('XML')">XML e Documentos</button>
          <button class="filter-pill" onclick="filterGeral('SPED')">SPED e Obrigações</button>
          <button class="filter-pill" onclick="filterGeral('Automação')">Automação Fiscal</button>
          <button class="filter-pill" onclick="filterGeral('Auditoria')">Auditoria Fiscal</button>
          <button class="filter-pill" onclick="filterGeral('Compliance')">Compliance e Gestão</button>
          <button class="filter-pill" onclick="filterGeral('ERP')">ERP e Integrações</button>
          <button class="filter-pill" onclick="filterGeral('Produtividade')">Produtividade</button>`;

html = html.replace(/<div class="filter-pill-group" id="ideias-pills-container">[\s\S]*?<\/div>/, '<div class="filter-pill-group" id="ideias-pills-container">\n' + newIdeasPills + '\n</div>');

// 2. Update Routine Pills
const newRoutinePills = `<button class="filter-pill btn-routine-filter active" data-filter="all">Todas</button>
          <button class="filter-pill btn-routine-filter" data-filter="Rotina Mensal">Rotina Mensal</button>
          <button class="filter-pill btn-routine-filter" data-filter="Cadastros">Cadastros</button>
          <button class="filter-pill btn-routine-filter" data-filter="Auditoria">Auditoria</button>
          <button class="filter-pill btn-routine-filter" data-filter="Cruzamentos">Cruzamentos</button>
          <button class="filter-pill btn-routine-filter" data-filter="Planejamento">Planejamento</button>`;
html = html.replace(/<div class="filter-pill-group" id="routine-filter-pills">[\s\S]*?<\/div>/, '<div class="filter-pill-group" id="routine-filter-pills">\n' + newRoutinePills + '\n</div>');

// 3. Remove "Vincular a uma Ideia Base" from Modal
html = html.replace(/<div class="form-group">\s*<label[^>]*>Vincular a uma Ideia Base.*?<\/select>\s*<\/div>/s, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('HTML updated.');

// 4. Update CSS for calendar image aspect ratio
let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('.card-img { aspect-ratio: 3/4;')) {
    css += `\n\n/* User requested 3:4 aspect ratio for calendar image */\n.card-img {\n  aspect-ratio: 3/4;\n  object-fit: cover;\n}\n`;
    fs.writeFileSync('style.css', css, 'utf8');
}
console.log('CSS updated.');

// 5. Update app.js logic
let appJs = fs.readFileSync('app.js', 'utf8');

// Inject Audience filtering logic
const audienceLogic = `
window.currentAudience = 'Todos';
window.filterAudience = function(aud) {
    window.currentAudience = aud;
    
    // Update pills visual state
    const pills = document.querySelectorAll('#ideias-pills-container .filter-pill');
    pills.forEach(p => {
        if (p.textContent === aud) p.classList.add('active');
        else if (p.textContent === 'Externo' || p.textContent === 'Interno') p.classList.remove('active');
        
        if (aud !== 'Todos' && p.textContent.startsWith('Todos')) p.classList.remove('active');
        if (aud === 'Todos' && p.textContent.startsWith('Todos')) p.classList.add('active');
    });
    
    if (typeof renderIdeiasGeral === 'function') {
        renderIdeiasGeral();
    }
};
`;

if (!appJs.includes('window.currentAudience')) {
    appJs += audienceLogic;
}

// We need to patch renderIdeiasGeral to respect currentAudience.
// Since replacing complex functions is risky, we'll redefine it at the bottom.
// First, extract the existing renderIdeiasGeral body using regex or string manipulation.
// Actually, it's easier to just append a proxy around renderIdeiasGeral.
const proxyRender = `
setTimeout(() => {
    const _originalRenderIdeiasGeral = window.renderIdeiasGeral;
    window.renderIdeiasGeral = function(searchTerm = "") {
        // Temporarily filter window.ideasData if audience is not 'Todos'
        const originalData = window.ideasData;
        if (window.currentAudience !== 'Todos') {
            window.ideasData = originalData.filter(idea => idea.audience === window.currentAudience);
        }
        
        // Let the original function do its rendering (it uses window.ideasData)
        if (_originalRenderIdeiasGeral) {
            _originalRenderIdeiasGeral(searchTerm);
        }
        
        // Restore
        window.ideasData = originalData;
    };
}, 1000);
`;

if (!appJs.includes('Temporarily filter window.ideasData')) {
    appJs += proxyRender;
    fs.writeFileSync('app.js', appJs, 'utf8');
}
console.log('app.js updated.');
