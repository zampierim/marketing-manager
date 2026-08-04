const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// The array starts at `const defaultPosts = [` and ends at `];` before `let posts = [];`
const startMarker = 'const defaultPosts = [';
const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf('];\n\nlet posts = [];', startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find defaultPosts array boundaries");
  process.exit(1);
}

const jsonStr = code.substring(startIndex + 'const defaultPosts = '.length, endIndex + 1);

let postsArr = [];
try {
  postsArr = JSON.parse(jsonStr);
} catch (e) {
  console.error("Failed to parse defaultPosts JSON", e);
  process.exit(1);
}

// Filter out all non-commemorative August posts
postsArr = postsArr.filter(p => !(p.date.startsWith('2026-08') && !p.commemorative));

// Remove old commemorative August posts to avoid duplicates, we will re-insert them exactly
postsArr = postsArr.filter(p => !p.date.startsWith('2026-08'));

// Define new August posts
const newAugustPosts = [
  // SEMANA 1
  {id: 8001, date: "2026-08-03", status: "rascunho", tag: "O Futuro do Fiscal", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Enquanto muita gente ainda trabalha como em 2018… o mercado fiscal já entrou em uma nova era.\nIA, Reforma Tributária, APIs, Automação, Dados.\nTudo mudou. Menos a forma como muitas empresas ainda trabalham.\nQual dessas mudanças mais impactou sua rotina?", topic: "Inteligência Fiscal"},
  {id: 8002, date: "2026-08-03", status: "rascunho", tag: "O Futuro do Fiscal", destiny: "linkedin", author: "SAAM Editorial", format: "Vídeo", caption: "Enquanto muita gente ainda trabalha como em 2018… o mercado fiscal já entrou em uma nova era.\nIA, Reforma Tributária, APIs, Automação, Dados.\nTudo mudou. Menos a forma como muitas empresas ainda trabalham.\nQual dessas mudanças mais impactou sua rotina?", topic: "Inteligência Fiscal"},
  {id: 8003, date: "2026-08-04", status: "rascunho", tag: "Boas-vindas", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Agosto será o mês do Futuro do Fiscal. Durante este mês vamos compartilhar conteúdos sobre Inteligência Fiscal, automação, tendências e Reforma Tributária. Nossa missão é ajudar sua equipe a evoluir antes das grandes mudanças do mercado.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 8004, date: "2026-08-04", status: "rascunho", tag: "Carreira", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O Novo Papel do Profissional Fiscal: Como o Fiscal evoluiu, o impacto da tecnologia, o fim do operacional e o futuro da carreira.", topic: "Gestão Fiscal Estratégica"},
  {id: 8005, date: "2026-08-05", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "ERP resolve todos os problemas fiscais? Ficção. ERP organiza processos, mas não substitui auditoria e não encontra todos os erros. Por isso empresas maduras trabalham com uma camada de auditoria. Você concorda?", topic: "ERP e Integrações"},
  {id: 8006, date: "2026-08-05", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "ERP resolve todos os problemas fiscais? Ficção. ERP organiza processos, mas não substitui auditoria e não encontra todos os erros. Por isso empresas maduras trabalham com uma camada de auditoria. Você concorda?", topic: "ERP e Integrações"},
  {id: 8007, date: "2026-08-06", status: "rascunho", tag: "Dica SAAM", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Dica da Semana: Você sabe onde estão todos os XMLs da sua empresa? Se a resposta não for 'sim', existe um risco operacional que merece atenção.", topic: "XML e Documentos Fiscais"},
  {id: 8008, date: "2026-08-06", status: "rascunho", tag: "Reforma Tributária", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como a Reforma Tributária muda a operação fiscal: Não é apenas uma lei, é mudança operacional, dados, auditoria e tecnologia.", topic: "Reforma Tributária"},
  {id: 8009, date: "2026-08-07", status: "rascunho", tag: "Radar Fiscal SAAM", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "A IA vai substituir o Fiscal? Todo mundo pergunta isso. Mas a IA não vai substituir o Fiscal, vai substituir tarefas repetitivas. Você usaria IA na sua rotina?", topic: "Automação Fiscal"},
  {id: 8010, date: "2026-08-07", status: "rascunho", tag: "Radar Fiscal SAAM", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "A IA vai substituir o Fiscal? Todo mundo pergunta isso. Mas a IA não vai substituir o Fiscal, vai substituir tarefas repetitivas. Você usaria IA na sua rotina?", topic: "Automação Fiscal"},

  // SEMANA 2
  {id: 8011, date: "2026-08-10", status: "rascunho", tag: "O mundo mudou", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O maior erro é pensar como em 2020. O mercado mudou.", topic: "Gestão Fiscal Estratégica"},
  {id: 8012, date: "2026-08-10", status: "rascunho", tag: "O mundo mudou", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "O maior erro é pensar como em 2020. O mercado mudou.", topic: "Gestão Fiscal Estratégica"},
  {id: 8013, date: "2026-08-11", status: "rascunho", tag: "Checklist", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Sua empresa está preparada para a Reforma Tributária? XML organizado, ERP integrado, Auditoria preventiva, SPED validado.", topic: "Reforma Tributária"},
  {id: 8014, date: "2026-08-11", status: "publicado", tag: "Dia do Advogado", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "ERP x Auditoria: Quem faz o quê? Como a integração entre as áreas Fiscal e Jurídica fortalece a conformidade e reduz riscos.", title: "Dia do Advogado", commemorative: true, topic: "Compliance e Gestão de Riscos"},
  {id: 8015, date: "2026-08-12", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "Fiscal ou Ficção? 'ERP encontra todos os erros.'", topic: "ERP e Integrações"},
  {id: 8016, date: "2026-08-13", status: "rascunho", tag: "Dica SAAM", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Dica rápida: Como reduzir retrabalho fiscal operando com inteligência.", topic: "Produtividade Interna"},
  {id: 8017, date: "2026-08-13", status: "rascunho", tag: "Inteligência Fiscal", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O que é Inteligência Fiscal na prática?", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 8018, date: "2026-08-14", status: "rascunho", tag: "O Futuro", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "Você está preparado para 2027?", topic: "Reforma Tributária"},

  // SEMANA 3
  {id: 8019, date: "2026-08-17", status: "rascunho", tag: "Custo", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Quanto custa um XML perdido?", topic: "XML e Documentos Fiscais"},
  {id: 8020, date: "2026-08-18", status: "rascunho", tag: "Alerta Operacional", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Alerta operacional da semana: Revise seus lotes de envio.", topic: "Dicas de Utilização"},
  {id: 8021, date: "2026-08-18", status: "rascunho", tag: "Inconsistências", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como evitar inconsistências fiscais de ponta a ponta.", topic: "Auditoria Fiscal"},
  {id: 8022, date: "2026-08-19", status: "rascunho", tag: "Erro Oculto", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O erro que ninguém percebe e que custa caro no fim do mês.", topic: "Auditoria Fiscal"},
  {id: 8023, date: "2026-08-20", status: "rascunho", tag: "Integrações", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Dica: A força das Integrações Inteligentes do SAAM.", topic: "ERP e Integrações"},
  {id: 8024, date: "2026-08-20", status: "rascunho", tag: "Dados Limpos", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Por que dados limpos importam mais do que nunca no cenário atual.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 8025, date: "2026-08-21", status: "rascunho", tag: "Fiscal Estratégico", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "O Fiscal virou estratégico.", topic: "Gestão Fiscal Estratégica"},

  // SEMANA 4
  {id: 8026, date: "2026-08-24", status: "rascunho", tag: "Maturidade Fiscal", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Os 4 níveis da maturidade fiscal.", topic: "Gestão Fiscal Estratégica"},
  {id: 8027, date: "2026-08-25", status: "rascunho", tag: "Checklist", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Checklist de fechamento: garanta os 4 níveis em sua rotina.", topic: "Produtividade Interna"},
  {id: 8028, date: "2026-08-25", status: "rascunho", tag: "Operacional", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como sair do operacional e focar na estratégia da empresa.", topic: "Produtividade do Departamento Fiscal"},
  {id: 8029, date: "2026-08-26", status: "rascunho", tag: "Maturidade Fiscal", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "Em qual nível de maturidade fiscal sua empresa está?", topic: "Gestão Fiscal Estratégica"},
  {id: 8030, date: "2026-08-27", status: "rascunho", tag: "Boas Práticas", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Boas práticas da semana para a nova era da auditoria.", topic: "Auditoria Fiscal"},
  {id: 8031, date: "2026-08-27", status: "rascunho", tag: "Nova Era", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "A Nova Era da Auditoria Fiscal: O que você precisa saber.", topic: "Auditoria Fiscal"},
  {id: 8032, date: "2026-08-28", status: "rascunho", tag: "O Futuro", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "O futuro começa hoje. Manifesto de encerramento do mês da Inteligência Fiscal.", topic: "Gestão Fiscal Estratégica"},
  
  // Re-adding the Dia do Blog
  {id: 8033, date: "2026-08-31", status: "publicado", tag: "Dia do Blog", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Divulgar conteúdos técnicos e fortalecer o blog da SAAM.", title: "Dia do Blog", commemorative: true, topic: "Comunidade SAAM"}
];

// Append the new august posts to the array
postsArr.push(...newAugustPosts);

// Sort posts by date for better readability in JSON (optional, but clean)
postsArr.sort((a, b) => a.date.localeCompare(b.date));

const newJsonStr = JSON.stringify(postsArr, null, 2);

const newCode = code.substring(0, startIndex + 'const defaultPosts = '.length) + 
                newJsonStr + 
                code.substring(endIndex + 1);

// Bump local storage version to v6 to force reload
const finalCode = newCode.replace(/saam_marketing_posts_v5/g, 'saam_marketing_posts_v6');

fs.writeFileSync('app.js', finalCode);
console.log('August successfully replaced and storage bumped to v6.');
