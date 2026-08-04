const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const startMarker = 'let defaultPosts = [';
const startIndex = code.indexOf(startMarker);
let endIndex = code.indexOf('];\nlet posts = [];', startIndex);
if (endIndex === -1) {
  endIndex = code.indexOf('];\r\nlet posts = [];', startIndex);
}
if (endIndex === -1) {
  endIndex = code.indexOf('];\n\nlet posts = [];', startIndex);
}

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

// Remove all old November posts
postsArr = postsArr.filter(p => !p.date.startsWith('2026-11'));

const newNovemberPosts = [
  // SEMANA 1
  {id: 11001, date: "2026-11-02", status: "rascunho", tag: "Alerta Fiscal SAAM", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Os riscos invisíveis da operação fiscal:\nOs maiores problemas fiscais começam com pequenos erros ignorados diariamente.\nQual desses riscos existe hoje na sua empresa?", topic: "Auditoria Fiscal"},
  {id: 11002, date: "2026-11-02", status: "rascunho", tag: "Alerta Fiscal SAAM", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Os riscos invisíveis da operação fiscal:\nOs maiores problemas fiscais começam com pequenos erros ignorados diariamente.\nQual desses riscos existe hoje na sua empresa?", topic: "Auditoria Fiscal"},
  {id: 11003, date: "2026-11-03", status: "rascunho", tag: "Planejamento", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Planejamento do mês: Neste mês vamos mostrar como empresas reduzem riscos através de auditoria preventiva, governança e monitoramento contínuo.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 11004, date: "2026-11-03", status: "rascunho", tag: "Riscos Ocultos", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como identificar riscos ocultos antes que eles virem problemas.", topic: "Auditoria Fiscal"},
  {id: 11005, date: "2026-11-04", status: "rascunho", tag: "Erro Futuro", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "O erro que ainda não aconteceu:\nO maior risco da sua empresa pode ser justamente aquele que ainda não apareceu.\nSua empresa identifica riscos ou apenas corrige consequências?", topic: "Compliance e Gestão de Riscos"},
  {id: 11006, date: "2026-11-04", status: "rascunho", tag: "Erro Futuro", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "O erro que ainda não aconteceu:\nO maior risco da sua empresa pode ser justamente aquele que ainda não apareceu.\nSua empresa identifica riscos ou apenas corrige consequências?", topic: "Compliance e Gestão de Riscos"},
  {id: 11007, date: "2026-11-05", status: "rascunho", tag: "Dica SAAM", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Dica da Semana: Quem revisa processos regularmente encontra pequenos erros antes que eles se transformem em grandes problemas.", topic: "Produtividade Interna"},
  {id: 11008, date: "2026-11-05", status: "rascunho", tag: "Gestão Preventiva", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Gestão preventiva: por que agir antes custa menos.", topic: "Gestão Fiscal Estratégica"},
  {id: 11009, date: "2026-11-06", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Sua empresa é preventiva ou reativa?\nEmpresa que reage × Empresa que antecipa.", topic: "Gestão Fiscal Estratégica"},
  {id: 11010, date: "2026-11-06", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Sua empresa é preventiva ou reativa?\nEmpresa que reage × Empresa que antecipa.", topic: "Gestão Fiscal Estratégica"},

  // SEMANA 2
  {id: 11011, date: "2026-11-09", status: "rascunho", tag: "Auditoria Preventiva", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Auditoria preventiva muda tudo:\nConferir antes, Corrigir antes, Validar antes, Transmitir com segurança.", topic: "Auditoria Fiscal"},
  {id: 11012, date: "2026-11-09", status: "rascunho", tag: "Auditoria Preventiva", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Auditoria preventiva muda tudo:\nConferir antes, Corrigir antes, Validar antes, Transmitir com segurança.", topic: "Auditoria Fiscal"},
  {id: 11013, date: "2026-11-10", status: "rascunho", tag: "Checklist Preventivo", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Checklist Preventivo:\nXML conferidos, Cadastros revisados, Integrações funcionando, SPED validado, Indicadores acompanhados.", topic: "Produtividade Interna"},
  {id: 11014, date: "2026-11-10", status: "rascunho", tag: "Prevenir Erros", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como prevenir erros antes da transmissão.", topic: "Auditoria Fiscal"},
  {id: 11015, date: "2026-11-11", status: "rascunho", tag: "Conferir x Prevenir", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Conferir ou prevenir?\nA diferença entre revisar depois e prevenir antes.", topic: "Auditoria Fiscal"},
  {id: 11016, date: "2026-11-11", status: "rascunho", tag: "Conferir x Prevenir", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Conferir ou prevenir?\nA diferença entre revisar depois e prevenir antes.", topic: "Auditoria Fiscal"},
  {id: 11017, date: "2026-11-12", status: "publicado", tag: "Qualidade", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Mensagem: Qualidade dos dados não é detalhe. É a base de toda operação fiscal confiável.", title: "Dia Mundial da Qualidade", commemorative: true, topic: "Comunidade SAAM"},
  {id: 11018, date: "2026-11-12", status: "rascunho", tag: "Qualidade dos Dados", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Qualidade dos dados: o primeiro passo para uma auditoria eficiente.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 11019, date: "2026-11-13", status: "rascunho", tag: "Checklists", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O poder dos checklists:\nComo pequenas conferências evitam grandes problemas.", topic: "Produtividade do Departamento Fiscal"},
  {id: 11020, date: "2026-11-13", status: "rascunho", tag: "Checklists", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "O poder dos checklists:\nComo pequenas conferências evitam grandes problemas.", topic: "Produtividade do Departamento Fiscal"},

  // SEMANA 3
  {id: 11021, date: "2026-11-16", status: "rascunho", tag: "Prever Problemas", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Como prever problemas antes do fechamento:\nIndicadores de risco.", topic: "Compliance e Gestão de Riscos"},
  {id: 11022, date: "2026-11-16", status: "rascunho", tag: "Prever Problemas", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Como prever problemas antes do fechamento:\nIndicadores de risco.", topic: "Compliance e Gestão de Riscos"},
  {id: 11023, date: "2026-11-17", status: "rascunho", tag: "Painel Semanal", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Painel da Semana:\nOs indicadores que merecem atenção antes do encerramento do mês.", topic: "Dicas de Utilização"},
  {id: 11024, date: "2026-11-17", status: "rascunho", tag: "Indicadores de Risco", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Indicadores de risco que todo gestor fiscal deveria acompanhar.", topic: "Compliance e Gestão de Riscos"},
  {id: 11025, date: "2026-11-18", status: "rascunho", tag: "Sinais", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Todo erro deixa sinais:\nInconsistências surgem muito antes da obrigação ser entregue.", topic: "Auditoria Fiscal"},
  {id: 11026, date: "2026-11-18", status: "rascunho", tag: "Sinais", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Todo erro deixa sinais:\nInconsistências surgem muito antes da obrigação ser entregue.", topic: "Auditoria Fiscal"},
  {id: 11027, date: "2026-11-19", status: "rascunho", tag: "Monitoramento", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Boas práticas:\nComo criar uma rotina semanal de monitoramento.", topic: "Produtividade Interna"},
  {id: 11028, date: "2026-11-19", status: "rascunho", tag: "Previsibilidade", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como construir uma operação previsível.", topic: "Gestão Fiscal Estratégica"},
  {id: 11029, date: "2026-11-20", status: "rascunho", tag: "Monitorar x Reagir", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Monitorar ou reagir? (Fiscal ou Ficção?)\nPorque monitoramento reduz riscos.", topic: "Gestão Fiscal Estratégica"},
  {id: 11030, date: "2026-11-20", status: "rascunho", tag: "Monitorar x Reagir", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Monitorar ou reagir? (Fiscal ou Ficção?)\nPorque monitoramento reduz riscos.", topic: "Gestão Fiscal Estratégica"},

  // SEMANA 4
  {id: 11031, date: "2026-11-23", status: "rascunho", tag: "Governança", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Governança fiscal gera segurança:\nProcessos, Padrões, Responsabilidades, Indicadores, Auditoria.", topic: "Gestão Fiscal Estratégica"},
  {id: 11032, date: "2026-11-23", status: "rascunho", tag: "Governança", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Governança fiscal gera segurança:\nProcessos, Padrões, Responsabilidades, Indicadores, Auditoria.", topic: "Gestão Fiscal Estratégica"},
  {id: 11033, date: "2026-11-24", status: "rascunho", tag: "Resumo", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Resumo do mês:\nOs principais aprendizados sobre prevenção, auditoria e governança.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 11034, date: "2026-11-24", status: "rascunho", tag: "Governança Prática", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Governança fiscal na prática:\nComo estruturar uma operação preparada para crescer.", topic: "Gestão Fiscal Estratégica"},
  {id: 11035, date: "2026-11-25", status: "rascunho", tag: "Compliance", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Compliance gera valor:\nFortalece decisões, protege a empresa e aumenta a confiança.", topic: "Compliance e Gestão de Riscos"},
  {id: 11036, date: "2026-11-25", status: "rascunho", tag: "Compliance", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Compliance gera valor:\nFortalece decisões, protege a empresa e aumenta a confiança.", topic: "Compliance e Gestão de Riscos"},
  {id: 11037, date: "2026-11-26", status: "rascunho", tag: "Planejamento", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Planejamento de Dezembro:\nApresentação do próximo tema: 'O Ano em que o Fiscal Decide o Futuro'.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 11038, date: "2026-11-26", status: "rascunho", tag: "Compliance Estratégico", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Compliance estratégico:\nComo transformar conformidade em vantagem competitiva.", topic: "Compliance e Gestão de Riscos"},
  {id: 11039, date: "2026-11-27", status: "publicado", tag: "Black Friday", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Sua operação está preparada para o aumento das vendas?\nEmissão de documentos, captura de XML, integração com ERP, validação, auditoria preventiva.", title: "Black Friday", commemorative: true, topic: "XML e Documentos Fiscais"},
  {id: 11040, date: "2026-11-27", status: "publicado", tag: "Black Friday", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Sua operação está preparada para o aumento das vendas?\nEmissão de documentos, captura de XML, integração com ERP, validação, auditoria preventiva.", title: "Black Friday", commemorative: true, topic: "XML e Documentos Fiscais"},
  {id: 11041, date: "2026-11-30", status: "rascunho", tag: "Manifesto", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "O futuro pertence às empresas que antecipam.\nEmpresas maduras não esperam erros. Monitoram continuamente. Transformam prevenção em estratégia.", topic: "Gestão Fiscal Estratégica"},
  {id: 11042, date: "2026-11-30", status: "rascunho", tag: "Manifesto", destiny: "linkedin", author: "SAAM Editorial", format: "Imagem", caption: "O futuro pertence às empresas que antecipam.\nEmpresas maduras não esperam erros. Monitoram continuamente. Transformam prevenção em estratégia.", topic: "Gestão Fiscal Estratégica"}
];

postsArr.push(...newNovemberPosts);
postsArr.sort((a, b) => a.date.localeCompare(b.date));

const newJsonStr = JSON.stringify(postsArr, null, 2);

const newCode = code.substring(0, startIndex + 'let defaultPosts = '.length) + 
                newJsonStr + 
                code.substring(endIndex + 1);

// We find the current storage key and replace it with a new one (v11 to be safe)
const finalCode = newCode.replace(/saam_marketing_posts_v\d+/g, 'saam_marketing_posts_v11');

fs.writeFileSync('app.js', finalCode);
console.log('November replaced successfully, storage bumped to v11.');
