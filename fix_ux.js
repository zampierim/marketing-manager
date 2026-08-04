const fs = require('fs');

// 1. Update style.css
let css = fs.readFileSync('style.css', 'utf-8');

// Fix calendar day aspect ratio
css = css.replace(/aspect-ratio: 3\/4;/g, 'min-height: 120px; /* removed strict aspect-ratio */');

// Add toast styles
if (!css.includes('.saam-toast')) {
    css += `

/* ---------- UX Toast Notification ---------- */
.toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.saam-toast {
  background: #0F172A;
  color: #FFFFFF;
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  transform: translateX(120%);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.saam-toast.show {
  transform: translateX(0);
}
.saam-toast.success { border-left: 4px solid #10B981; }
.saam-toast.error { border-left: 4px solid #EF4444; }
`;
}
fs.writeFileSync('style.css', css, 'utf-8');


// 2. Update index.html
let html = fs.readFileSync('index.html', 'utf-8');
// Fix routine filters class (add btn-routine-filter so app.js picks it up)
html = html.replace(
  /<button class="filter-pill( active)?" data-filter="(.*?)">(.*?)<\/button>/g, 
  '<button class="filter-pill btn-routine-filter$1" data-filter="$2">$3</button>'
);
// Make sure toast container exists
if (!html.includes('id="toast-container"')) {
    html = html.replace('</body>', '<div id="toast-container" class="toast-container"></div>\n</body>');
}
fs.writeFileSync('index.html', html, 'utf-8');


// 3. Update app.js
let appJs = fs.readFileSync('app.js', 'utf-8');

// The new logic to append
const appendedLogic = `

// --- UX FIXES AND ENHANCEMENTS ---

// Toast System
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = \`saam-toast \${type}\`;
    
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

`;

if (!appJs.includes('--- UX FIXES AND ENHANCEMENTS ---')) {
    appJs += appendedLogic;
    fs.writeFileSync('app.js', appJs, 'utf-8');
}

console.log("UX Fixes applied successfully.");
