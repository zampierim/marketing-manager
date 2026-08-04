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

// Remove all old October posts
postsArr = postsArr.filter(p => !p.date.startsWith('2026-10'));

const newOctoberPosts = [
  // SEMANA 1
  {id: 10001, date: "2026-10-05", status: "publicado", tag: "KPIs", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Você mede faturamento. Mas mede a eficiência do seu Fiscal?\nTempo de processamento, Erros encontrados, Retrabalho, Documentos processados, Qualidade dos dados, Tempo de resposta.\nQual indicador sua empresa acompanha hoje?", title: "Dia das Micro e Pequenas Empresas", commemorative: true, topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10002, date: "2026-10-05", status: "publicado", tag: "KPIs", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Você mede faturamento. Mas mede a eficiência do seu Fiscal?\nTempo de processamento, Erros encontrados, Retrabalho, Documentos processados, Qualidade dos dados, Tempo de resposta.\nQual indicador sua empresa acompanha hoje?", title: "Dia das Micro e Pequenas Empresas", commemorative: true, topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10003, date: "2026-10-06", status: "rascunho", tag: "Planejamento", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Planejamento de Outubro: Neste mês vamos mostrar como departamentos fiscais transformam processos em resultados através de indicadores, produtividade e inteligência.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 10004, date: "2026-10-06", status: "rascunho", tag: "Indicadores", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Indicadores que geram resultados: O que é KPI, os KPIs mais importantes, como acompanhar e erros comuns.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10005, date: "2026-10-07", status: "rascunho", tag: "Retrabalho", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Quanto custa o retrabalho?\nVocê sabe quanto tempo sua equipe perde corrigindo erros? Retrabalho custa tempo, dinheiro, produtividade e energia.\nQuanto retrabalho existe hoje na sua empresa?", topic: "Automação Fiscal"},
  {id: 10006, date: "2026-10-07", status: "rascunho", tag: "Retrabalho", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Quanto custa o retrabalho?\nVocê sabe quanto tempo sua equipe perde corrigindo erros? Retrabalho custa tempo, dinheiro, produtividade e energia.\nQuanto retrabalho existe hoje na sua empresa?", topic: "Automação Fiscal"},
  {id: 10007, date: "2026-10-08", status: "rascunho", tag: "Dica SAAM", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Dica da Semana: Não tente acelerar processos ruins. Melhore o processo primeiro.", topic: "Produtividade Interna"},
  {id: 10008, date: "2026-10-08", status: "rascunho", tag: "Custo Oculto", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O custo invisível do Fiscal.", topic: "Auditoria Fiscal"},
  {id: 10009, date: "2026-10-09", status: "rascunho", tag: "Produtividade", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Produtividade Inteligente:\nTrabalhar muito × Gerar resultados.", topic: "Produtividade do Departamento Fiscal"},
  {id: 10010, date: "2026-10-09", status: "rascunho", tag: "Produtividade", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Produtividade Inteligente:\nTrabalhar muito × Gerar resultados.", topic: "Produtividade do Departamento Fiscal"},

  // SEMANA 2
  {id: 10011, date: "2026-10-12", status: "rascunho", tag: "Dashboard", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O Dashboard ideal para o Fiscal:\nQuais indicadores um gestor deveria acompanhar diariamente.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10012, date: "2026-10-12", status: "rascunho", tag: "Dashboard", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "O Dashboard ideal para o Fiscal:\nQuais indicadores um gestor deveria acompanhar diariamente.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10013, date: "2026-10-13", status: "rascunho", tag: "Checklist", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Checklist: Sua empresa acompanha Retrabalho, Erros, Tempo, Performance e Qualidade?", topic: "Produtividade Interna"},
  {id: 10014, date: "2026-10-13", status: "rascunho", tag: "Dashboards", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como construir dashboards úteis.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10015, date: "2026-10-14", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Você mede produtividade?\n'Produtividade é quantidade de trabalho' = Ficção.\nProdutividade é gerar mais valor com menos desperdício.", topic: "Produtividade do Departamento Fiscal"},
  {id: 10016, date: "2026-10-14", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Você mede produtividade?\n'Produtividade é quantidade de trabalho' = Ficção.\nProdutividade é gerar mais valor com menos desperdício.", topic: "Produtividade do Departamento Fiscal"},
  {id: 10017, date: "2026-10-15", status: "publicado", tag: "Dia do Professor", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Mensagem valorizando quem compartilha conhecimento e capacita equipes.", title: "Dia do Professor", commemorative: true, topic: "Comunidade SAAM"},
  {id: 10018, date: "2026-10-15", status: "rascunho", tag: "Performance", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Alta Performance Fiscal.", topic: "Produtividade do Departamento Fiscal"},
  {id: 10019, date: "2026-10-16", status: "publicado", tag: "Ciência e Tecnologia", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Tecnologia não substitui estratégia.\nComo IA, APIs e automação potencializam resultados quando existem processos bem estruturados.", title: "Dia da Ciência e Tecnologia", commemorative: true, topic: "Automação Fiscal"},
  {id: 10020, date: "2026-10-16", status: "publicado", tag: "Ciência e Tecnologia", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Tecnologia não substitui estratégia.\nComo IA, APIs e automação potencializam resultados quando existem processos bem estruturados.", title: "Dia da Ciência e Tecnologia", commemorative: true, topic: "Automação Fiscal"},

  // SEMANA 3
  {id: 10021, date: "2026-10-19", status: "rascunho", tag: "Dados", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Gestão baseada em dados:\nComo dados geram decisões melhores.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10022, date: "2026-10-19", status: "rascunho", tag: "Dados", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Gestão baseada em dados:\nComo dados geram decisões melhores.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10023, date: "2026-10-20", status: "rascunho", tag: "Alerta Semanal", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Alerta semanal: Os números contam histórias. Mas alguém precisa interpretá-las.", topic: "Dicas de Utilização"},
  {id: 10024, date: "2026-10-20", status: "rascunho", tag: "Decisões", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Dados que geram decisões.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10025, date: "2026-10-21", status: "rascunho", tag: "Valor", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "O Fiscal que entrega valor:\nO departamento fiscal influencia caixa, compliance, riscos e estratégia.", topic: "Gestão Fiscal Estratégica"},
  {id: 10026, date: "2026-10-21", status: "rascunho", tag: "Valor", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "O Fiscal que entrega valor:\nO departamento fiscal influencia caixa, compliance, riscos e estratégia.", topic: "Gestão Fiscal Estratégica"},
  {id: 10027, date: "2026-10-22", status: "rascunho", tag: "Boas Práticas", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Como criar uma cultura de indicadores.", topic: "Produtividade Interna"},
  {id: 10028, date: "2026-10-22", status: "rascunho", tag: "Custos", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como reduzir custos ocultos.", topic: "Auditoria Fiscal"},
  {id: 10029, date: "2026-10-23", status: "rascunho", tag: "Não Medir", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Quanto custa não medir?\nO impacto financeiro da falta de indicadores.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10030, date: "2026-10-23", status: "rascunho", tag: "Não Medir", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Quanto custa não medir?\nO impacto financeiro da falta de indicadores.", topic: "Inteligência Fiscal, Dados e Analytics"},

  // SEMANA 4
  {id: 10031, date: "2026-10-26", status: "rascunho", tag: "Alta Performance", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Empresas de alta performance fazem isso:\nHábitos de operações fiscais maduras: Medem, Automatizam, Padronizam, Auditam, Melhoram continuamente.", topic: "Gestão Fiscal Estratégica"},
  {id: 10032, date: "2026-10-26", status: "rascunho", tag: "Alta Performance", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Empresas de alta performance fazem isso:\nHábitos de operações fiscais maduras: Medem, Automatizam, Padronizam, Auditam, Melhoram continuamente.", topic: "Gestão Fiscal Estratégica"},
  {id: 10033, date: "2026-10-27", status: "rascunho", tag: "Resumo", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Resumo do mês: Os principais indicadores e aprendizados apresentados durante outubro.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 10034, date: "2026-10-27", status: "rascunho", tag: "Futuro", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O futuro da gestão fiscal: Como departamentos fiscais se tornarão áreas cada vez mais estratégicas.", topic: "Gestão Fiscal Estratégica"},
  {id: 10035, date: "2026-10-28", status: "rascunho", tag: "Antes x Depois", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Antes x Depois:\nComparar uma operação sem indicadores com uma operação orientada por dados.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10036, date: "2026-10-28", status: "rascunho", tag: "Antes x Depois", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Antes x Depois:\nComparar uma operação sem indicadores com uma operação orientada por dados.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10037, date: "2026-10-29", status: "rascunho", tag: "Planejamento", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Planejamento de Novembro:\nApresentação do próximo tema: 'O Fiscal que Antecipa o Futuro'.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 10038, date: "2026-10-29", status: "rascunho", tag: "Inteligência", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Performance e Inteligência: Como indicadores, tecnologia e pessoas constroem operações fiscais de alta performance.", topic: "Produtividade do Departamento Fiscal"},
  {id: 10039, date: "2026-10-30", status: "rascunho", tag: "Manifesto", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "Performance não é o destino. É o resultado de decisões inteligentes.\nEmpresas de alta performance medem, aprendem e evoluem continuamente.", topic: "Gestão Fiscal Estratégica"},
  {id: 10040, date: "2026-10-30", status: "rascunho", tag: "Manifesto", destiny: "linkedin", author: "SAAM Editorial", format: "Imagem", caption: "Performance não é o destino. É o resultado de decisões inteligentes.\nEmpresas de alta performance medem, aprendem e evoluem continuamente.", topic: "Gestão Fiscal Estratégica"}
];

postsArr.push(...newOctoberPosts);
postsArr.sort((a, b) => a.date.localeCompare(b.date));

const newJsonStr = JSON.stringify(postsArr, null, 2);

const newCode = code.substring(0, startIndex + 'let defaultPosts = '.length) + 
                newJsonStr + 
                code.substring(endIndex + 1);

// Bump local storage version to v8
const finalCode = newCode.replace(/saam_marketing_posts_v7/g, 'saam_marketing_posts_v8');

fs.writeFileSync('app.js', finalCode);
console.log('October successfully replaced and storage bumped to v8.');
