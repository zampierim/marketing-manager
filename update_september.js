const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const startMarker = 'let defaultPosts = [';
const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf('];\n\nlet posts = [];', startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find defaultPosts array boundaries");
  process.exit(1);
}

const jsonStr = code.substring(startIndex + 'let defaultPosts = '.length, endIndex + 1);

let postsArr = [];
try {
  postsArr = JSON.parse(jsonStr);
} catch (e) {
  console.error("Failed to parse defaultPosts JSON", e);
  process.exit(1);
}

// Remove all old September posts, except commemoratives. Wait, I'll just remove all September and re-add commemoratives as part of this exact schedule if they align, or just preserve commemorative flag on them.
// The user actually mapped out the commemoratives (07/09 Independência, 15/09 Dia do Cliente, 22/09 Dia do Contador). I will replace all September posts.
postsArr = postsArr.filter(p => !p.date.startsWith('2026-09'));

const newSeptemberPosts = [
  // SEMANA 1
  {id: 9001, date: "2026-09-02", status: "rascunho", tag: "Maturidade Fiscal", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Qual é o nível da sua operação fiscal?\nNem toda empresa está no mesmo nível de maturidade fiscal. Você sabe onde a sua está?\n• Nível 1 — Operação Manual\n• Nível 2 — Controle Inicial\n• Nível 3 — Inteligência Preventiva\n• Nível 4 — Estratégia Total\nEm qual nível você acredita que sua empresa está hoje?", topic: "Gestão Fiscal Estratégica"},
  {id: 9002, date: "2026-09-02", status: "rascunho", tag: "Maturidade Fiscal", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Qual é o nível da sua operação fiscal?\nNem toda empresa está no mesmo nível de maturidade fiscal. Você sabe onde a sua está?\n• Nível 1 — Operação Manual\n• Nível 2 — Controle Inicial\n• Nível 3 — Inteligência Preventiva\n• Nível 4 — Estratégia Total\nEm qual nível você acredita que sua empresa está hoje?", topic: "Gestão Fiscal Estratégica"},
  {id: 9003, date: "2026-09-03", status: "rascunho", tag: "Planejamento", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Setembro será o mês da Maturidade Fiscal.\nDurante este mês vamos mostrar como empresas evoluem seus processos fiscais através de organização, indicadores, tecnologia e auditoria preventiva.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 9004, date: "2026-09-03", status: "rascunho", tag: "Maturidade Fiscal", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O que é Maturidade Fiscal?\nO conceito, os quatro níveis, como identificar seu estágio, principais gargalos e próximos passos.", topic: "Gestão Fiscal Estratégica"},
  {id: 9005, date: "2026-09-04", status: "rascunho", tag: "Sua Empresa", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Sua empresa realmente é madura?\nTer um ERP não significa ter maturidade fiscal.\nMaturidade significa: Processos padronizados, Dados confiáveis, Auditoria preventiva, Indicadores, Automação.\nQual desses pilares sua empresa ainda precisa desenvolver?", topic: "Gestão Fiscal Estratégica"},
  {id: 9006, date: "2026-09-04", status: "rascunho", tag: "Sua Empresa", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Sua empresa realmente é madura?\nTer um ERP não significa ter maturidade fiscal.\nMaturidade significa: Processos padronizados, Dados confiáveis, Auditoria preventiva, Indicadores, Automação.\nQual desses pilares sua empresa ainda precisa desenvolver?", topic: "Gestão Fiscal Estratégica"},

  // SEMANA 2
  {id: 9007, date: "2026-09-07", status: "publicado", tag: "Independência", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Processos vencem tecnologia. Uma empresa só conquista independência operacional quando seus processos não dependem de improviso.\nSua operação depende de pessoas ou de processos?", title: "Independência do Brasil", commemorative: true, topic: "Produtividade do Departamento Fiscal"},
  {id: 9008, date: "2026-09-07", status: "publicado", tag: "Independência", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Processos vencem tecnologia. Uma empresa só conquista independência operacional quando seus processos não dependem de improviso.\nSua operação depende de pessoas ou de processos?", title: "Independência do Brasil", commemorative: true, topic: "Produtividade do Departamento Fiscal"},
  {id: 9009, date: "2026-09-08", status: "rascunho", tag: "Checklist", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Sua empresa possui: Fluxo documentado, Padronização, Revisão, Responsáveis definidos e Indicadores?", topic: "Produtividade Interna"},
  {id: 9010, date: "2026-09-08", status: "rascunho", tag: "Processos", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Por que processos importam mais do que tecnologia?", topic: "Produtividade do Departamento Fiscal"},
  {id: 9011, date: "2026-09-09", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Seu ERP é suficiente?\nMostrar a diferença entre: ERP x Gestão Fiscal x Auditoria.\nVocê já confundiu essas funções?", topic: "ERP e Integrações"},
  {id: 9012, date: "2026-09-09", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Seu ERP é suficiente?\nMostrar a diferença entre: ERP x Gestão Fiscal x Auditoria.\nVocê já confundiu essas funções?", topic: "ERP e Integrações"},
  {id: 9013, date: "2026-09-10", status: "rascunho", tag: "Dica SAAM", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Dica da Semana: Pequenas padronizações eliminam grandes retrabalhos.", topic: "Dicas de Utilização"},
  {id: 9014, date: "2026-09-10", status: "rascunho", tag: "Padronização", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como padronizar processos fiscais.", topic: "Produtividade Interna"},
  {id: 9015, date: "2026-09-11", status: "rascunho", tag: "Retrabalho", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Onde nasce o retrabalho?\nCadastros inconsistentes, XML faltando, conferência manual, integração incompleta.", topic: "Automação Fiscal"},
  {id: 9016, date: "2026-09-11", status: "rascunho", tag: "Retrabalho", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Onde nasce o retrabalho?\nCadastros inconsistentes, XML faltando, conferência manual, integração incompleta.", topic: "Automação Fiscal"},

  // SEMANA 3
  {id: 9017, date: "2026-09-14", status: "rascunho", tag: "KPIs", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Os KPIs que todo departamento fiscal deveria acompanhar.\nInconsistências, tempo de processamento, XML capturados, rejeições, retrabalho.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9018, date: "2026-09-14", status: "rascunho", tag: "KPIs", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Os KPIs que todo departamento fiscal deveria acompanhar.\nInconsistências, tempo de processamento, XML capturados, rejeições, retrabalho.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9019, date: "2026-09-15", status: "publicado", tag: "Dia do Cliente", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Mensagem de agradecimento. Mostrar como os clientes evoluíram ao longo do ano.", title: "Dia do Cliente", commemorative: true, topic: "Comunidade SAAM"},
  {id: 9020, date: "2026-09-15", status: "rascunho", tag: "Indicadores", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como indicadores transformam a gestão fiscal.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9021, date: "2026-09-16", status: "rascunho", tag: "Medir", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O que medir primeiro?", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9022, date: "2026-09-16", status: "rascunho", tag: "Medir", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "O que medir primeiro?", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9023, date: "2026-09-17", status: "rascunho", tag: "Boas Práticas", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Como criar uma rotina baseada em indicadores.", topic: "Produtividade Interna"},
  {id: 9024, date: "2026-09-17", status: "rascunho", tag: "KPIs", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como criar KPIs fiscais.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9025, date: "2026-09-18", status: "rascunho", tag: "Trabalho", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Você mede ou apenas trabalha?", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9026, date: "2026-09-18", status: "rascunho", tag: "Trabalho", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Você mede ou apenas trabalha?", topic: "Inteligência Fiscal, Dados e Analytics"},

  // SEMANA 4
  {id: 9027, date: "2026-09-21", status: "rascunho", tag: "Fiscal Protagonista", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O Fiscal protagonista: Como o profissional fiscal pode influenciar decisões estratégicas.", topic: "Gestão Fiscal Estratégica"},
  {id: 9028, date: "2026-09-21", status: "rascunho", tag: "Fiscal Protagonista", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "O Fiscal protagonista: Como o profissional fiscal pode influenciar decisões estratégicas.", topic: "Gestão Fiscal Estratégica"},
  {id: 9029, date: "2026-09-22", status: "publicado", tag: "Dia do Contador", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Especial Dia do Contador: Mensagem valorizando o papel do contador como parceiro estratégico da gestão fiscal.", title: "Dia do Contador", commemorative: true, topic: "Comunidade SAAM"},
  {id: 9030, date: "2026-09-22", status: "rascunho", tag: "Liderança", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O novo gestor fiscal: Como a liderança fiscal evoluiu nos últimos anos.", topic: "Gestão Fiscal Estratégica"},
  {id: 9031, date: "2026-09-23", status: "rascunho", tag: "Futuro", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "O futuro pertence aos dados.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9032, date: "2026-09-23", status: "rascunho", tag: "Futuro", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "O futuro pertence aos dados.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9033, date: "2026-09-24", status: "rascunho", tag: "Checklist", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Checklist semanal: Os hábitos das equipes fiscais de alta performance.", topic: "Produtividade Interna"},
  {id: 9034, date: "2026-09-24", status: "rascunho", tag: "Dados", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como usar dados para tomar decisões fiscais.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9035, date: "2026-09-25", status: "rascunho", tag: "Liderança", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Você lidera ou apenas executa?\nA maturidade fiscal não é medida pelo volume de obrigações, mas pela capacidade de transformar dados em decisões.\nQual será o próximo passo da sua empresa?", topic: "Gestão Fiscal Estratégica"},
  {id: 9036, date: "2026-09-25", status: "rascunho", tag: "Liderança", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Você lidera ou apenas executa?\nA maturidade fiscal não é medida pelo volume de obrigações, mas pela capacidade de transformar dados em decisões.\nQual será o próximo passo da sua empresa?", topic: "Gestão Fiscal Estratégica"},

  // ENCERRAMENTO SETEMBRO
  {id: 9037, date: "2026-09-28", status: "rascunho", tag: "O Próximo Nível", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O próximo nível começa agora.\nRetomar os quatro níveis da Maturidade Fiscal e mostrar que a evolução é contínua.", topic: "Gestão Fiscal Estratégica"},
  {id: 9038, date: "2026-09-28", status: "rascunho", tag: "O Próximo Nível", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "O próximo nível começa agora.\nRetomar os quatro níveis da Maturidade Fiscal e mostrar que a evolução é contínua.", topic: "Gestão Fiscal Estratégica"},
  {id: 9039, date: "2026-09-29", status: "rascunho", tag: "Resumo", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Resumo do mês: Os principais aprendizados sobre maturidade fiscal e um convite para preparar a equipe para o tema de outubro: 'A Inteligência que Gera Resultados'.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 9040, date: "2026-09-29", status: "rascunho", tag: "Aprendizados", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O que aprendemos sobre Maturidade Fiscal: Retrospectiva dos principais conceitos trabalhados ao longo de setembro.", topic: "Gestão Fiscal Estratégica"},
  {id: 9041, date: "2026-09-30", status: "rascunho", tag: "Processo", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Maturidade não é um destino. É um processo.\nEmpresas maduras criam processos, medem resultados e tomam decisões com inteligência.", topic: "Gestão Fiscal Estratégica"},
  {id: 9042, date: "2026-09-30", status: "rascunho", tag: "Processo", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Maturidade não é um destino. É um processo.\nEmpresas maduras criam processos, medem resultados e tomam decisões com inteligência.", topic: "Gestão Fiscal Estratégica"}
];

postsArr.push(...newSeptemberPosts);
postsArr.sort((a, b) => a.date.localeCompare(b.date));

const newJsonStr = JSON.stringify(postsArr, null, 2);

const newCode = code.substring(0, startIndex + 'let defaultPosts = '.length) + 
                newJsonStr + 
                code.substring(endIndex + 1);

// Bump local storage version to v7
const finalCode = newCode.replace(/saam_marketing_posts_v6/g, 'saam_marketing_posts_v7');

fs.writeFileSync('app.js', finalCode);
console.log('September successfully replaced and storage bumped to v7.');
