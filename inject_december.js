const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const startMarker = 'let defaultPosts = [';
const startIndex = code.indexOf(startMarker);
let endIndex = code.indexOf('];\nlet posts = [];', startIndex);
if (endIndex === -1) endIndex = code.indexOf('];\r\nlet posts = [];', startIndex);
if (endIndex === -1) endIndex = code.indexOf('];\n\nlet posts = [];', startIndex);
if (endIndex === -1) endIndex = code.indexOf('];\r\n\r\nlet posts = [];', startIndex);
if (endIndex === -1) {
  const match = /];\s*let posts = \[\];/.exec(code.substring(startIndex));
  if (match) endIndex = startIndex + match.index;
}

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find defaultPosts array boundaries");
  process.exit(1);
}

const jsonStr = code.substring(startIndex + 'let defaultPosts = '.length, endIndex + 1);
let postsArr = eval('(' + jsonStr + ')');

// Remove existing December posts to avoid duplicates
postsArr = postsArr.filter(p => !p.date.startsWith('2026-12'));

const newDecemberPosts = [
  {id: 12001, date: "2026-12-01", status: "rascunho", tag: "Retrospectiva", destiny: "instagram", format: "Reels", title: "2026 mudou o Fiscal para sempre. O que aprendemos?", caption: "Qual foi a maior mudança para sua empresa?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12002, date: "2026-12-01", status: "rascunho", tag: "Retrospectiva", destiny: "linkedin", format: "Reels", title: "2026 mudou o Fiscal para sempre. O que aprendemos?", caption: "Qual foi a maior mudança para sua empresa?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12003, date: "2026-12-02", status: "rascunho", tag: "Aprendizados", destiny: "instagram", format: "Carrossel", title: "Os 10 maiores aprendizados fiscais de 2026.", caption: "Qual aprendizado mais impactou sua rotina?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12004, date: "2026-12-02", status: "rascunho", tag: "Aprendizados", destiny: "linkedin", format: "Carrossel", title: "Os 10 maiores aprendizados fiscais de 2026.", caption: "Qual aprendizado mais impactou sua rotina?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12005, date: "2026-12-03", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "instagram", format: "Imagem", title: "2027 será apenas uma continuação de 2026.", caption: "Você concorda?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12006, date: "2026-12-03", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "linkedin", format: "Imagem", title: "2027 será apenas uma continuação de 2026.", caption: "Você concorda?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12007, date: "2026-12-04", status: "rascunho", tag: "Blog", destiny: "blog", format: "Texto", title: "Como as empresas mais preparadas encerram o ano.", caption: "Compartilhe com sua equipe.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12008, date: "2026-12-04", status: "rascunho", tag: "Reflexão", destiny: "interno", format: "Texto", title: "As empresas que mais evoluíram em 2026 foram aquelas que aprenderam mais rápido.", caption: "Reflexão da Semana", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},

  {id: 12009, date: "2026-12-07", status: "rascunho", tag: "Radar Fiscal", destiny: "instagram", format: "Imagem", title: "As mudanças que exigirão atenção em 2027.", caption: "Sua empresa já está acompanhando essas mudanças?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12010, date: "2026-12-07", status: "rascunho", tag: "Radar Fiscal", destiny: "linkedin", format: "Imagem", title: "As mudanças que exigirão atenção em 2027.", caption: "Sua empresa já está acompanhando essas mudanças?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12011, date: "2026-12-08", status: "rascunho", tag: "Processos", destiny: "instagram", format: "Reels", title: "Os processos que você não deveria levar para 2027.", caption: "Qual rotina precisa mudar?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12012, date: "2026-12-08", status: "rascunho", tag: "Processos", destiny: "linkedin", format: "Reels", title: "Os processos que você não deveria levar para 2027.", caption: "Qual rotina precisa mudar?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12013, date: "2026-12-09", status: "rascunho", tag: "Checklist", destiny: "instagram", format: "Carrossel", title: "Checklist de revisão da operação fiscal antes do fim do ano.", caption: "Salve para revisar com sua equipe.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12014, date: "2026-12-09", status: "rascunho", tag: "Checklist", destiny: "linkedin", format: "Carrossel", title: "Checklist de revisão da operação fiscal antes do fim do ano.", caption: "Salve para revisar com sua equipe.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12015, date: "2026-12-10", status: "rascunho", tag: "Inteligência Fiscal", destiny: "instagram", format: "Imagem", title: "Por que dezembro é o melhor mês para reorganizar processos.", caption: "Envie para seu gestor.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12016, date: "2026-12-10", status: "rascunho", tag: "Inteligência Fiscal", destiny: "linkedin", format: "Imagem", title: "Por que dezembro é o melhor mês para reorganizar processos.", caption: "Envie para seu gestor.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12017, date: "2026-12-11", status: "rascunho", tag: "Checklist 2027", destiny: "interno", format: "Texto", title: "10 verificações obrigatórias antes de iniciar um novo ciclo.", caption: "Sua empresa já fez todas?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12018, date: "2026-12-11", status: "rascunho", tag: "O que corrigir", destiny: "blog", format: "Texto", title: "O que precisa ser corrigido antes de janeiro?", caption: "Checklist da Semana", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},

  {id: 12019, date: "2026-12-14", status: "rascunho", tag: "Organização", destiny: "instagram", format: "Reels", title: "As empresas que começam janeiro organizadas fizeram isso em dezembro.", caption: "Sua empresa já começou o planejamento?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12020, date: "2026-12-14", status: "rascunho", tag: "Organização", destiny: "linkedin", format: "Reels", title: "As empresas que começam janeiro organizadas fizeram isso em dezembro.", caption: "Sua empresa já começou o planejamento?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12021, date: "2026-12-15", status: "rascunho", tag: "Metas 2027", destiny: "instagram", format: "Carrossel", title: "5 metas fiscais para um departamento de alta performance em 2027.", caption: "Qual será sua prioridade?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12022, date: "2026-12-15", status: "rascunho", tag: "Metas 2027", destiny: "linkedin", format: "Carrossel", title: "5 metas fiscais para um departamento de alta performance em 2027.", caption: "Qual será sua prioridade?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12023, date: "2026-12-16", status: "rascunho", tag: "Você Sabia?", destiny: "instagram", format: "Imagem", title: "Planejamento reduz retrabalho e aumenta previsibilidade.", caption: "Compartilhe com sua equipe.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12024, date: "2026-12-16", status: "rascunho", tag: "Você Sabia?", destiny: "linkedin", format: "Imagem", title: "Planejamento reduz retrabalho e aumenta previsibilidade.", caption: "Compartilhe com sua equipe.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12025, date: "2026-12-17", status: "rascunho", tag: "Plano de Evolução", destiny: "blog", format: "Texto", title: "Como montar um plano de evolução fiscal para o próximo ano.", caption: "Leia o guia completo.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12026, date: "2026-12-18", status: "rascunho", tag: "Bastidores", destiny: "interno", format: "Texto", title: "Como ajudamos nossos clientes a se preparar para um novo ciclo.", caption: "O que você espera melhorar em 2027?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},

  {id: 12027, date: "2026-12-21", status: "rascunho", tag: "Tendências", destiny: "instagram", format: "Imagem", title: "As tendências que devem transformar o Fiscal em 2027.", caption: "Qual tendência você acredita que terá mais impacto?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12028, date: "2026-12-21", status: "rascunho", tag: "Tendências", destiny: "linkedin", format: "Imagem", title: "As tendências que devem transformar o Fiscal em 2027.", caption: "Qual tendência você acredita que terá mais impacto?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12029, date: "2026-12-22", status: "rascunho", tag: "Mudança", destiny: "instagram", format: "Reels", title: "Não espere janeiro para mudar sua operação.", caption: "O futuro começa hoje.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12030, date: "2026-12-22", status: "rascunho", tag: "Mudança", destiny: "linkedin", format: "Reels", title: "Não espere janeiro para mudar sua operação.", caption: "O futuro começa hoje.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12031, date: "2026-12-23", status: "rascunho", tag: "Decisões", destiny: "instagram", format: "Carrossel", title: "7 decisões que sua empresa deveria tomar antes do fim do ano.", caption: "Salve este conteúdo para revisar com a equipe.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12032, date: "2026-12-23", status: "rascunho", tag: "Decisões", destiny: "linkedin", format: "Carrossel", title: "7 decisões que sua empresa deveria tomar antes do fim do ano.", caption: "Salve este conteúdo para revisar com a equipe.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12033, date: "2026-12-24", status: "publicado", tag: "Mensagem Institucional", destiny: "instagram", format: "Imagem", title: "Que 2027 seja um ano de evolução, inteligência e resultados.", caption: "Boas Festas!", commemorative: true, topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12034, date: "2026-12-24", status: "publicado", tag: "Mensagem Institucional", destiny: "linkedin", format: "Imagem", title: "Que 2027 seja um ano de evolução, inteligência e resultados.", caption: "Boas Festas!", commemorative: true, topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12035, date: "2026-12-24", status: "publicado", tag: "Feliz Natal", destiny: "interno", format: "Texto", title: "Feliz Natal!", caption: "Que o próximo ano seja marcado por decisões mais inteligentes, processos mais fortes e uma evolução contínua. Feliz Natal!", commemorative: true, topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},

  {id: 12036, date: "2026-12-28", status: "rascunho", tag: "Planejamento", destiny: "instagram", format: "Reels", title: "O maior erro é achar que o planejamento começa em janeiro.", caption: "O que sua empresa já preparou?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12037, date: "2026-12-28", status: "rascunho", tag: "Planejamento", destiny: "linkedin", format: "Reels", title: "O maior erro é achar que o planejamento começa em janeiro.", caption: "O que sua empresa já preparou?", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12038, date: "2026-12-29", status: "rascunho", tag: "Plano Fiscal 2027", destiny: "instagram", format: "Carrossel", title: "O Plano Fiscal 2027: os 10 primeiros passos.", caption: "Salve para consultar em janeiro.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12039, date: "2026-12-29", status: "rascunho", tag: "Plano Fiscal 2027", destiny: "linkedin", format: "Carrossel", title: "O Plano Fiscal 2027: os 10 primeiros passos.", caption: "Salve para consultar em janeiro.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12040, date: "2026-12-30", status: "rascunho", tag: "Alta Performance", destiny: "instagram", format: "Imagem", title: "Como empresas de alta performance iniciam um novo ciclo.", caption: "Compartilhe com sua liderança.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12041, date: "2026-12-30", status: "rascunho", tag: "Alta Performance", destiny: "linkedin", format: "Imagem", title: "Como empresas de alta performance iniciam um novo ciclo.", caption: "Compartilhe com sua liderança.", topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12042, date: "2026-12-31", status: "publicado", tag: "Manifesto SAAM", destiny: "instagram", format: "Vídeo", title: "O futuro não começa amanhã. Ele começa nas decisões que você toma hoje.", caption: "Qual será o primeiro passo da sua empresa em 2027?", commemorative: true, topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"},
  {id: 12043, date: "2026-12-31", status: "publicado", tag: "Manifesto SAAM", destiny: "linkedin", format: "Vídeo", title: "O futuro não começa amanhã. Ele começa nas decisões que você toma hoje.", caption: "Qual será o primeiro passo da sua empresa em 2027?", commemorative: true, topic: "O Ano em que o Fiscal Decide o Futuro", author: "SAAM Editorial"}
];

postsArr.push(...newDecemberPosts);
postsArr.sort((a, b) => a.date.localeCompare(b.date));

const newJsonStr = JSON.stringify(postsArr, null, 2);
let newCode = code.substring(0, startIndex + 'let defaultPosts = '.length) + 
                newJsonStr + 
                code.substring(endIndex + 1);

newCode = newCode.replace(/saam_marketing_posts_v\d+/g, 'saam_marketing_posts_v14');

fs.writeFileSync('app.js', newCode);
console.log("December injected successfully. Storage bumped to v14.");
