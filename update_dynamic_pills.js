const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace the hardcoded pills with just the Audience toggle and an empty container for sub-pills
const newIdeasPills = `<div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center;">
          <button class="filter-pill active" onclick="filterAudience('Todos')" id="btn-aud-todos">Todos (665)</button>
          <button class="filter-pill" onclick="filterAudience('Externo')" id="btn-aud-externo">Externo (Atração)</button>
          <button class="filter-pill" onclick="filterAudience('Interno')" id="btn-aud-interno">Interno (Clientes)</button>
        </div>
        <div id="dynamic-series-pills" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
          <!-- Pilhas de categorias (Pilares) geradas via JS -->
        </div>`;

// Find `#ideias-pills-container` and replace its inner HTML. We can just replace the whole div.
// Note: We need to be careful with regex matching multi-line HTML.
const startIdx = html.indexOf('<div class="filter-pill-group" id="ideias-pills-container">');
if (startIdx !== -1) {
    const endIdx = html.indexOf('</div>', html.indexOf('</button>', startIdx + 100) + 100);
    // actually, let's just use string replace using the known static string we injected previously.
    const oldPillsStr = html.substring(startIdx, html.indexOf('</div>', startIdx + 100) + 7);
    
    // Instead of risking a bad substring, let's just do a regex replace
    html = html.replace(/<div class="filter-pill-group" id="ideias-pills-container">[\s\S]*?<\/div>\s*<\/div>/, 
        '<div class="filter-pill-group" id="ideias-pills-container" style="flex-direction: column; align-items: flex-start;">\n' + newIdeasPills + '\n</div></div>');
    
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('index.html updated with dynamic pill container.');
}

// 2. Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');

const dynamicPillsLogic = `
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
`;

if (!appJs.includes('renderDynamicPills')) {
    // Append to app.js
    appJs += '\\n\\n// --- DYNAMIC PILLS LOGIC ---\\n' + dynamicPillsLogic;
    fs.writeFileSync('app.js', appJs, 'utf8');
    console.log('app.js updated with dynamic pills logic.');
}

// 3. Make sure the proxy for renderIdeiasGeral handles 'Todos' logic from filterGeral properly.
// `filterGeral` sets `currentTheme`. `renderIdeiasGeral` filters by `currentTheme`.
// We already patched `renderIdeiasGeral` to filter by `window.currentAudience`. That's perfect.
