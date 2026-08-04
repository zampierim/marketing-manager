const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const commemorativePosts = [
  {id: 801, date: "2026-08-11", status: "publicado", tag: "Dia do Advogado", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "Relacionar Fiscal, Tributário e gestão de riscos.", title: "Dia do Advogado", commemorative: true},
  {id: 802, date: "2026-08-31", status: "publicado", tag: "Dia do Blog", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Divulgar conteúdos técnicos e fortalecer o blog da SAAM.", title: "Dia do Blog", commemorative: true},
  {id: 803, date: "2026-09-07", status: "publicado", tag: "Independência", destiny: "linkedin", author: "SAAM Editorial", format: "Imagem", caption: "Criar paralelo com independência operacional, automação e maturidade fiscal.", title: "Independência do Brasil", commemorative: true},
  {id: 804, date: "2026-09-15", status: "publicado", tag: "Dia do Cliente", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Melhor data do semestre para fortalecer relacionamento, cases e depoimentos.", title: "Dia do Cliente", commemorative: true},
  {id: 805, date: "2026-09-22", status: "publicado", tag: "Dia do Contador", destiny: "linkedin", author: "SAAM Editorial", format: "Vídeo", caption: "Uma das datas mais importantes para o público da SAAM. Excelente para homenagens e conteúdo técnico.", title: "Dia do Contador", commemorative: true},
  {id: 806, date: "2026-10-05", status: "publicado", tag: "PMEs", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Mostrar que gestão fiscal inteligente também é essencial para PMEs.", title: "Dia das Micro e Pequenas Empresas", commemorative: true},
  {id: 807, date: "2026-10-15", status: "publicado", tag: "Dia do Professor", destiny: "linkedin", author: "SAAM Editorial", format: "Texto", caption: "Posicionar a SAAM como empresa que educa o mercado.", title: "Dia do Professor", commemorative: true},
  {id: 808, date: "2026-10-16", status: "publicado", tag: "Ciência e Tecnologia", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "Data perfeita para falar de IA, APIs, automação e inovação fiscal.", title: "Dia da Ciência e Tecnologia", commemorative: true},
  {id: 809, date: "2026-11-12", status: "publicado", tag: "Qualidade", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Conectar qualidade dos dados com auditoria, compliance e prevenção de erros.", title: "Dia Mundial da Qualidade", commemorative: true},
  {id: 810, date: "2026-11-27", status: "publicado", tag: "Black Friday", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "Conteúdo sobre riscos fiscais, emissão de documentos e aumento do volume operacional.", title: "Black Friday", commemorative: true},
  {id: 811, date: "2026-12-10", status: "publicado", tag: "Direitos Humanos", destiny: "linkedin", author: "SAAM Editorial", format: "Texto", caption: "Abordar ética, transparência e compliance.", title: "Dia Internacional dos Direitos Humanos", commemorative: true},
  {id: 812, date: "2026-12-25", status: "publicado", tag: "Natal", destiny: "instagram", author: "SAAM Editorial", format: "Vídeo", caption: "Mensagem institucional de agradecimento a clientes, parceiros e equipe.", title: "Natal", commemorative: true},
  {id: 813, date: "2026-12-31", status: "publicado", tag: "Réveillon", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Manifesto de encerramento e planejamento para 2027.", title: "Réveillon", commemorative: true}
];

// Insert posts into defaultPosts before the last closing bracket of the array
const postsStr = commemorativePosts.map(p => "  " + JSON.stringify(p)).join(",\n") + "\n];";
code = code.replace(/\];\s+let posts = \[\];/g, ",\n" + postsStr + "\nlet posts = [];");

// Bump localStorage v4 to v5
code = code.replace(/saam_marketing_posts_v4/g, 'saam_marketing_posts_v5');

// Update styling of commemorative cards
const oldHtml = `<div class="post-card-image" style="background: linear-gradient(135deg, #E11D48 0%, #9F1239 100%); display: flex; align-items: center; justify-content: center; height: 100%;">`;
const newHtml = `<div class="post-card-image" style="background: linear-gradient(135deg, #E11D48 0%, #9F1239 100%); display: flex; align-items: center; justify-content: center; height: 100%; border: 2px solid #FCD34D; box-shadow: inset 0 0 0 2px #E11D48, 0 0 10px rgba(245, 158, 11, 0.4); box-sizing: border-box;">`;
code = code.replace(oldHtml, newHtml);

fs.writeFileSync('app.js', code);
console.log('Commemorative posts added, storage bumped to v5, styling updated.');
