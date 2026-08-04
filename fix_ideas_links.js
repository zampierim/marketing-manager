const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf-8');

// Add window.planejarIdeia if it doesn't exist
if (!js.includes('window.planejarIdeia')) {
  js += `
window.planejarIdeia = function(ideaId) {
  // Show Calendar page
  showPage(pageCalendario);
  
  // Find the exact date if we want to prefill, or just leave it empty
  // For now just open modal for the idea
  openModal(null, "", ideaId);
};
`;
}

// In createRowCardHTML, we need to update the markup to include the onclick handler for the button.
// and also add the usage badge.
js = js.replace(
  /function createRowCardHTML\(idea, index\) \{([\s\S]*?)return `([\s\S]*?)`;\n\}/,
  \`function createRowCardHTML(idea, index) {
  $1
  
  const usageCount = posts.filter(p => p.ideaId == idea.id).length;
  const badgeHtml = usageCount > 0 
    ? '<span style="background: #FFFBEB; color: #D97706; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 800; border: 1px solid #FEF3C7;">Usado ' + usageCount + 'x</span>'
    : '';

  return \\\`
    <div class="idea-row-card">
      <div style="font-size: 12px; font-weight: 700; color: #94A3B8; width: 24px;">\\\${idxStr}</div>
      <div style="flex: 1;">
        <span style="font-size: 10px; font-weight: 800; color: \\\${borderColor}; letter-spacing: 0.5px;">\\\${idea.tag}</span>
        <h5 style="margin: 4px 0; font-size: 15px; color: #0F172A;">\\\${idea.title}</h5>
        <span style="font-size: 11px; color: #64748B;">Hook: "\\\${idea.hook}"</span>
        <div style="margin-top: 10px; display: flex; align-items: center; gap: 8px;">
          <span style="background: #0F172A; color: #FFF; font-size: 9px; padding: 2px 6px; border-radius: 4px; font-weight: 800;">DESTINO</span>
          <span style="font-size: 11px; color: #475569;">\\\${idea.destiny}</span>
          \\\${badgeHtml}
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid \\\${scoreBg}; display: flex; flex-direction: column; align-items: center; justify-content: center; color: \\\${scoreColor};">
          <span style="font-size: 13px; font-weight: 800; line-height: 1;">\\\${idea.score}</span>
          <span style="font-size: 7px; font-weight: 800;">SCORE</span>
        </div>
        <button onclick="planejarIdeia(\\\${idea.id})" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid #E2E8F0; background: #FFF; color: #475569; display: flex; align-items: center; justify-content: center; cursor: pointer;" title="Planejar no Calendário">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
    </div>
  \\\`;
}\`
);

// In renderIdeiasGeral, update the button to use planejarIdeia and add the usage count.
js = js.replace(
  /html \+\= `([\s\S]*?)`;/,
  \`
    const usageCount = posts.filter(p => p.ideaId == idea.id).length;
    const badgeHtml = usageCount > 0 
      ? '<span style="background: #FFFBEB; color: #D97706; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 800; border: 1px solid #FEF3C7; margin-left: 8px;">Usado ' + usageCount + 'x</span>'
      : '';

    html += \\\`
      <div class="idea-modern-card">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 12px; font-weight: 700; color: #94A3B8;">\\\${idxStr}</span>
            <div style="width: 6px; height: 6px; border-radius: 50%; background: \\\${tagColor};"></div>
          </div>
          <span style="font-size: 10px; font-weight: 800; color: \\\${tagColor}; letter-spacing: 0.5px; text-transform: uppercase;">\\\${idea.tag}</span>
          <h4 style="margin: 8px 0 0 0; font-size: 18px; color: #0F172A; font-weight: 800; line-height: 1.4;">\\\${idea.title}</h4>
        </div>
        
        <div class="idea-footer">
          <div>
             <span style="display: block; font-size: 9px; font-weight: 800; color: #64748B; letter-spacing: 0.5px;">DESTINO</span>
             <div style="display: flex; align-items: center;">
               <span style="font-size: 11px; font-weight: 600; color: #0F172A;">\\\${idea.destiny}</span>
               \\\${badgeHtml}
             </div>
          </div>
          <button onclick="planejarIdeia(\\\${idea.id})" style="background: none; border: none; color: #2563EB; font-size: 13px; font-weight: 800; display: flex; align-items: center; gap: 4px; cursor: pointer;" title="Planejar no Calendário">
            Planejar <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>
    \\\`;\`
);

fs.writeFileSync('app.js', js, 'utf-8');
console.log('Ideias links restored');
