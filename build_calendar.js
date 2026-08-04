const fs = require('fs');

const posts = [
  // SEMANA 1: O MUNDO MUDOU
  { id: 201, date: "2026-08-03", status: "aprovado", tag: "Radar Fiscal SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Os 5 acontecimentos que mostram que o setor fiscal entrou em uma nova era. Você sabe em qual nível sua empresa está?" },
  { id: 202, date: "2026-08-04", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Você sabia que um XML perdido pode comprometer uma auditoria meses depois?" },
  { id: 203, date: "2026-08-04", status: "aprovado", tag: "Carrossel", destiny: "Redes", author: "SAAM Editorial", format: "Imagem", caption: "O Fiscal deixou de ser operacional. Como era antes vs Como está agora. Em qual nível está sua empresa?" },
  { id: 204, date: "2026-08-05", status: "agendado", tag: "Fiscal ou Ficção?", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "A Inteligência Artificial vai acabar com o departamento fiscal. Verdade ou mito?" },
  { id: 205, date: "2026-08-06", status: "rascunho", tag: "Radar Fiscal", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Resumo das notícias fiscais da semana. Fique por dentro!" },
  { id: 206, date: "2026-08-06", status: "aprovado", tag: "Inteligência Fiscal", destiny: "Blog", author: "SAAM Editorial", format: "Artigo", caption: "O Fiscal do Futuro: como a profissão está mudando com a Reforma Tributária." },
  { id: 207, date: "2026-08-07", status: "agendado", tag: "Checklist", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Mini Checklist: O que conferir na primeira semana do mês." },
  { id: 208, date: "2026-08-07", status: "publicado", tag: "Reels", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "O que o mercado ainda não percebeu sobre a Reforma Tributária." },

  // SEMANA 2: O PROBLEMA
  { id: 209, date: "2026-08-10", status: "rascunho", tag: "Radar Fiscal SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Notícias da semana. Os erros deste post são típicos do Nível 1 ou 2 da maturidade fiscal." },
  { id: 210, date: "2026-08-11", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Dica prática: Conferência manual de XML gera passivo invisível." },
  { id: 211, date: "2026-08-11", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "O XML estava correto. O problema era outro. Storytelling de como o problema nasce na operação." },
  { id: 212, date: "2026-08-12", status: "analise", tag: "Fiscal ou Ficção?", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Meu ERP já resolve tudo." },
  { id: 213, date: "2026-08-13", status: "rascunho", tag: "Live", destiny: "YouTube", author: "SAAM Editorial", format: "Live", caption: "Os maiores erros que ainda vemos no mercado." },
  { id: 214, date: "2026-08-13", status: "rascunho", tag: "Radar Fiscal", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Resumo das notícias da semana." },
  { id: 215, date: "2026-08-13", status: "analise", tag: "Inteligência Fiscal", destiny: "Blog", author: "SAAM Editorial", format: "Artigo", caption: "Os custos invisíveis dos processos fiscais manuais." },
  { id: 216, date: "2026-08-14", status: "rascunho", tag: "Checklist", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Mini Checklist: SPED." },
  { id: 217, date: "2026-08-14", status: "rascunho", tag: "Reels", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Por que empresas ainda conferem documentos manualmente?" },

  // SEMANA 3: EXISTE UM NOVO JEITO
  { id: 218, date: "2026-08-17", status: "rascunho", tag: "Radar Fiscal SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Tecnologias que estão mudando o setor. Veja como empresas Nível 3 trabalham." },
  { id: 219, date: "2026-08-18", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Dica prática: Integrar sistemas evita 80% das multas." },
  { id: 220, date: "2026-08-18", status: "rascunho", tag: "Carrossel", destiny: "Redes", author: "SAAM Editorial", format: "Imagem", caption: "Empresas Nível 1 x Empresas Nível 4. Comparação de operação, dados e automação." },
  { id: 221, date: "2026-08-19", status: "rascunho", tag: "Você Sabia?", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Auditar antes da transmissão reduz retrabalho." },
  { id: 222, date: "2026-08-20", status: "rascunho", tag: "Radar Fiscal", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Resumo das notícias da semana." },
  { id: 223, date: "2026-08-20", status: "rascunho", tag: "Inteligência Fiscal", destiny: "Blog", author: "SAAM Editorial", format: "Artigo", caption: "ERP, Auditoria e APIs: por que essas tecnologias precisam trabalhar juntas." },
  { id: 224, date: "2026-08-21", status: "rascunho", tag: "Checklist", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Mini Checklist: Reforma." },
  { id: 225, date: "2026-08-21", status: "rascunho", tag: "Por Dentro do SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Como uma API elimina horas de trabalho." },

  // SEMANA 4: COMO A SAAM PENSA
  { id: 226, date: "2026-08-24", status: "rascunho", tag: "Radar Fiscal SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Manifesto: Por que a SAAM fala tanto sobre Inteligência Fiscal. Qual é o seu plano para alcançar o Nível 4?" },
  { id: 227, date: "2026-08-25", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Dica prática: Planejamento é a chave da Inteligência Fiscal." },
  { id: 228, date: "2026-08-25", status: "rascunho", tag: "Por Dentro do SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Bastidores: Como nasce uma nova rotina." },
  { id: 229, date: "2026-08-26", status: "rascunho", tag: "Case", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Cliente: Como um cliente saiu do Nível 1 para o Nível 3." },
  { id: 230, date: "2026-08-27", status: "rascunho", tag: "Live", destiny: "YouTube", author: "SAAM Editorial", format: "Live", caption: "Como será o departamento fiscal nos próximos cinco anos." },
  { id: 231, date: "2026-08-27", status: "rascunho", tag: "Radar Fiscal", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Resumo das notícias da semana." },
  { id: 232, date: "2026-08-27", status: "rascunho", tag: "Inteligência Fiscal", destiny: "Blog", author: "SAAM Editorial", format: "Artigo", caption: "Como medir a maturidade fiscal da sua empresa." },
  { id: 233, date: "2026-08-28", status: "rascunho", tag: "Checklist", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Mini Checklist: Auditoria." },
  { id: 234, date: "2026-08-28", status: "rascunho", tag: "Por Dentro do SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Manifesto Final: O Futuro do Fiscal Já Começou." }
];

let appjs = fs.readFileSync('app.js', 'utf-8');
appjs = appjs.replace(/let posts = \[[\s\S]*?\];/, 'let posts = ' + JSON.stringify(posts, null, 2) + ';');
fs.writeFileSync('app.js', appjs, 'utf-8');
console.log("Posts updated successfully.");
