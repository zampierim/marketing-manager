const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const injection = `
function generateMiniBriefing(title) {
  if(!title) return '';
  const idea = window.ideasData.find(i => i.title.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(i.title.toLowerCase()));
  if(idea) {
    let focus = idea.audience === 'Externo' ? 'Atração de novos leads (Topo/Meio de Funil)' : 'Retenção, Educação e Customer Success (Fundo de Funil)';
    return '🎯 PILAR ESTRATÉGICO: ' + idea.series + '\\n👥 PÚBLICO-ALVO: ' + idea.audience + ' - ' + focus + '\\n📱 CANAL RECOMENDADO: ' + idea.destiny + '\\n\\n💡 DIRECIONAMENTO: Desenvolva o conteúdo focando em resolver a dor principal relacionada a "' + idea.title + '".';
  }
  return '💡 DIRECIONAMENTO: Desenvolva o conteúdo com foco na dor principal do cliente, mostrando como o SAAM traz inteligência fiscal e produtividade.';
}
`;

// Add the function at the end
code += '\n' + injection;

// In openModal, after setting values, populate caption if empty
code = code.replace('document.getElementById("post-caption").value = post.caption;', 'document.getElementById("post-caption").value = post.caption || generateMiniBriefing(post.tag);');

// For new posts, we can auto-fill when the user types the title (tag)
// We will add an event listener to 'post-tag' in the global scope
code += `
document.addEventListener('DOMContentLoaded', () => {
  const tagInput = document.getElementById('post-tag');
  if(tagInput) {
    tagInput.addEventListener('change', (e) => {
      const captionEl = document.getElementById('post-caption');
      if(captionEl && !captionEl.value.includes('DIRECIONAMENTO')) {
         captionEl.value = generateMiniBriefing(e.target.value) + '\\n\\n' + captionEl.value;
      }
    });
  }
});
`;

fs.writeFileSync('app.js', code);
console.log('Briefing logic added');
