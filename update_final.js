const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const startMarker = 'let defaultPosts = [';
const startIndex = code.indexOf(startMarker);
let endIndex = code.indexOf('];\nlet posts = [];', startIndex);
if (endIndex === -1) endIndex = code.indexOf('];\r\nlet posts = [];', startIndex);
if (endIndex === -1) endIndex = code.indexOf('];\n\nlet posts = [];', startIndex);
if (endIndex === -1) endIndex = code.indexOf('];\r\n\r\nlet posts = [];', startIndex);
if (endIndex === -1) {
  // Try regex
  const match = /];\s*let posts = \[\];/.exec(code.substring(startIndex));
  if (match) endIndex = startIndex + match.index;
}

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find defaultPosts array boundaries");
  process.exit(1);
}

const jsonStr = code.substring(startIndex + 'let defaultPosts = '.length, endIndex + 1);

let postsArr = [];
try {
  postsArr = eval('(' + jsonStr + ')');
} catch (e) {
  console.error("Failed to parse defaultPosts JSON", e);
  process.exit(1);
}

// Remove old Aug, Sep, Oct, Nov posts
postsArr = postsArr.filter(p => !p.date.startsWith('2026-08') && !p.date.startsWith('2026-09') && !p.date.startsWith('2026-10') && !p.date.startsWith('2026-11'));

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
  {id: 8011, date: "2026-08-10", status: "rascunho", tag: "O mundo mudou", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O maior erro é pensar como em 2020. O mercado mudou.", topic: "Gestão Fiscal Estratégica"},
  {id: 8012, date: "2026-08-10", status: "rascunho", tag: "O mundo mudou", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "O maior erro é pensar como em 2020. O mercado mudou.", topic: "Gestão Fiscal Estratégica"},
  {id: 8013, date: "2026-08-11", status: "rascunho", tag: "Checklist", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Sua empresa está preparada para a Reforma Tributária? XML organizado, ERP integrado, Auditoria preventiva, SPED validado.", topic: "Reforma Tributária"},
  {id: 8014, date: "2026-08-11", status: "publicado", tag: "Dia do Advogado", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "ERP x Auditoria: Quem faz o quê? Como a integração entre as áreas Fiscal e Jurídica fortalece a conformidade e reduz riscos.", title: "Dia do Advogado", commemorative: true, topic: "Compliance e Gestão de Riscos"},
  {id: 8015, date: "2026-08-12", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "Fiscal ou Ficção? 'ERP encontra todos os erros.'", topic: "ERP e Integrações"},
  {id: 8016, date: "2026-08-13", status: "rascunho", tag: "Dica SAAM", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Dica rápida: Como reduzir retrabalho fiscal operando com inteligência.", topic: "Produtividade Interna"},
  {id: 8017, date: "2026-08-13", status: "rascunho", tag: "Inteligência Fiscal", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O que é Inteligência Fiscal na prática?", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 8018, date: "2026-08-14", status: "rascunho", tag: "O Futuro", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "Você está preparado para 2027?", topic: "Reforma Tributária"},
  {id: 8019, date: "2026-08-17", status: "rascunho", tag: "Custo", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Quanto custa um XML perdido?", topic: "XML e Documentos Fiscais"},
  {id: 8020, date: "2026-08-18", status: "rascunho", tag: "Alerta Operacional", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Alerta operacional da semana: Revise seus lotes de envio.", topic: "Dicas de Utilização"},
  {id: 8021, date: "2026-08-18", status: "rascunho", tag: "Inconsistências", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como evitar inconsistências fiscais de ponta a ponta.", topic: "Auditoria Fiscal"},
  {id: 8022, date: "2026-08-19", status: "rascunho", tag: "Erro Oculto", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O erro que ninguém percebe e que custa caro no fim do mês.", topic: "Auditoria Fiscal"},
  {id: 8023, date: "2026-08-20", status: "rascunho", tag: "Integrações", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Dica: A força das Integrações Inteligentes do SAAM.", topic: "ERP e Integrações"},
  {id: 8024, date: "2026-08-20", status: "rascunho", tag: "Dados Limpos", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Por que dados limpos importam mais do que nunca no cenário atual.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 8025, date: "2026-08-21", status: "rascunho", tag: "Fiscal Estratégico", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "O Fiscal virou estratégico.", topic: "Gestão Fiscal Estratégica"},
  {id: 8026, date: "2026-08-24", status: "rascunho", tag: "Maturidade Fiscal", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Os 4 níveis da maturidade fiscal.", topic: "Gestão Fiscal Estratégica"},
  {id: 8027, date: "2026-08-25", status: "rascunho", tag: "Checklist", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Checklist de fechamento: garanta os 4 níveis em sua rotina.", topic: "Produtividade Interna"},
  {id: 8028, date: "2026-08-25", status: "rascunho", tag: "Operacional", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como sair do operacional e focar na estratégia da empresa.", topic: "Produtividade do Departamento Fiscal"},
  {id: 8029, date: "2026-08-26", status: "rascunho", tag: "Maturidade Fiscal", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "Em qual nível de maturidade fiscal sua empresa está?", topic: "Gestão Fiscal Estratégica"},
  {id: 8030, date: "2026-08-27", status: "rascunho", tag: "Boas Práticas", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Boas práticas da semana para a nova era da auditoria.", topic: "Auditoria Fiscal"},
  {id: 8031, date: "2026-08-27", status: "rascunho", tag: "Nova Era", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "A Nova Era da Auditoria Fiscal: O que você precisa saber.", topic: "Auditoria Fiscal"},
  {id: 8032, date: "2026-08-28", status: "rascunho", tag: "O Futuro", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "O futuro começa hoje. Manifesto de encerramento do mês da Inteligência Fiscal.", topic: "Gestão Fiscal Estratégica"},
  {id: 8033, date: "2026-08-31", status: "publicado", tag: "Dia do Blog", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Divulgar conteúdos técnicos e fortalecer o blog da SAAM.", title: "Dia do Blog", commemorative: true, topic: "Comunidade SAAM"}
];

const newSeptemberPosts = [
  {id: 9001, date: "2026-09-02", status: "rascunho", tag: "Maturidade Fiscal", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Qual é o nível da sua operação fiscal?\nNível 1 a Nível 4.", topic: "Gestão Fiscal Estratégica"},
  {id: 9002, date: "2026-09-02", status: "rascunho", tag: "Maturidade Fiscal", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Qual é o nível da sua operação fiscal?\nNível 1 a Nível 4.", topic: "Gestão Fiscal Estratégica"},
  {id: 9003, date: "2026-09-03", status: "rascunho", tag: "Planejamento", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Setembro será o mês da Maturidade Fiscal.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 9004, date: "2026-09-03", status: "rascunho", tag: "Maturidade Fiscal", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O que é Maturidade Fiscal?", topic: "Gestão Fiscal Estratégica"},
  {id: 9005, date: "2026-09-04", status: "rascunho", tag: "Sua Empresa", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Sua empresa realmente é madura?", topic: "Gestão Fiscal Estratégica"},
  {id: 9006, date: "2026-09-04", status: "rascunho", tag: "Sua Empresa", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Sua empresa realmente é madura?", topic: "Gestão Fiscal Estratégica"},
  {id: 9007, date: "2026-09-07", status: "publicado", tag: "Independência", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Processos vencem tecnologia.", title: "Independência do Brasil", commemorative: true, topic: "Produtividade do Departamento Fiscal"},
  {id: 9008, date: "2026-09-07", status: "publicado", tag: "Independência", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Processos vencem tecnologia.", title: "Independência do Brasil", commemorative: true, topic: "Produtividade do Departamento Fiscal"},
  {id: 9009, date: "2026-09-08", status: "rascunho", tag: "Checklist", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Sua empresa possui Fluxo documentado?", topic: "Produtividade Interna"},
  {id: 9010, date: "2026-09-08", status: "rascunho", tag: "Processos", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Por que processos importam mais do que tecnologia?", topic: "Produtividade do Departamento Fiscal"},
  {id: 9011, date: "2026-09-09", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Seu ERP é suficiente?", topic: "ERP e Integrações"},
  {id: 9012, date: "2026-09-09", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Seu ERP é suficiente?", topic: "ERP e Integrações"},
  {id: 9013, date: "2026-09-10", status: "rascunho", tag: "Dica SAAM", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Pequenas padronizações eliminam grandes retrabalhos.", topic: "Dicas de Utilização"},
  {id: 9014, date: "2026-09-10", status: "rascunho", tag: "Padronização", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como padronizar processos fiscais.", topic: "Produtividade Interna"},
  {id: 9015, date: "2026-09-11", status: "rascunho", tag: "Retrabalho", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Onde nasce o retrabalho?", topic: "Automação Fiscal"},
  {id: 9016, date: "2026-09-11", status: "rascunho", tag: "Retrabalho", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Onde nasce o retrabalho?", topic: "Automação Fiscal"},
  {id: 9017, date: "2026-09-14", status: "rascunho", tag: "KPIs", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Os KPIs que todo departamento fiscal deveria acompanhar.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9018, date: "2026-09-14", status: "rascunho", tag: "KPIs", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Os KPIs que todo departamento fiscal deveria acompanhar.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9019, date: "2026-09-15", status: "publicado", tag: "Dia do Cliente", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Mensagem de agradecimento. Mostrar como os clientes evoluíram.", title: "Dia do Cliente", commemorative: true, topic: "Comunidade SAAM"},
  {id: 9020, date: "2026-09-15", status: "rascunho", tag: "Indicadores", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como indicadores transformam a gestão fiscal.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9021, date: "2026-09-16", status: "rascunho", tag: "Medir", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O que medir primeiro?", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9022, date: "2026-09-16", status: "rascunho", tag: "Medir", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "O que medir primeiro?", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9023, date: "2026-09-17", status: "rascunho", tag: "Boas Práticas", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Como criar uma rotina baseada em indicadores.", topic: "Produtividade Interna"},
  {id: 9024, date: "2026-09-17", status: "rascunho", tag: "KPIs", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como criar KPIs fiscais.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9025, date: "2026-09-18", status: "rascunho", tag: "Trabalho", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Você mede ou apenas trabalha?", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9026, date: "2026-09-18", status: "rascunho", tag: "Trabalho", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Você mede ou apenas trabalha?", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9027, date: "2026-09-21", status: "rascunho", tag: "Fiscal Protagonista", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O Fiscal protagonista.", topic: "Gestão Fiscal Estratégica"},
  {id: 9028, date: "2026-09-21", status: "rascunho", tag: "Fiscal Protagonista", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "O Fiscal protagonista.", topic: "Gestão Fiscal Estratégica"},
  {id: 9029, date: "2026-09-22", status: "publicado", tag: "Dia do Contador", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Especial Dia do Contador.", title: "Dia do Contador", commemorative: true, topic: "Comunidade SAAM"},
  {id: 9030, date: "2026-09-22", status: "rascunho", tag: "Liderança", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O novo gestor fiscal.", topic: "Gestão Fiscal Estratégica"},
  {id: 9031, date: "2026-09-23", status: "rascunho", tag: "Futuro", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "O futuro pertence aos dados.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9032, date: "2026-09-23", status: "rascunho", tag: "Futuro", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "O futuro pertence aos dados.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9033, date: "2026-09-24", status: "rascunho", tag: "Checklist", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Os hábitos de alta performance.", topic: "Produtividade Interna"},
  {id: 9034, date: "2026-09-24", status: "rascunho", tag: "Dados", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como usar dados.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 9035, date: "2026-09-25", status: "rascunho", tag: "Liderança", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Você lidera ou apenas executa?", topic: "Gestão Fiscal Estratégica"},
  {id: 9036, date: "2026-09-25", status: "rascunho", tag: "Liderança", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Você lidera ou apenas executa?", topic: "Gestão Fiscal Estratégica"},
  {id: 9037, date: "2026-09-28", status: "rascunho", tag: "O Próximo Nível", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O próximo nível começa agora.", topic: "Gestão Fiscal Estratégica"},
  {id: 9038, date: "2026-09-28", status: "rascunho", tag: "O Próximo Nível", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "O próximo nível começa agora.", topic: "Gestão Fiscal Estratégica"},
  {id: 9039, date: "2026-09-29", status: "rascunho", tag: "Resumo", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Resumo do mês sobre maturidade fiscal.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 9040, date: "2026-09-29", status: "rascunho", tag: "Aprendizados", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O que aprendemos sobre Maturidade Fiscal.", topic: "Gestão Fiscal Estratégica"},
  {id: 9041, date: "2026-09-30", status: "rascunho", tag: "Processo", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Maturidade não é um destino. É um processo.", topic: "Gestão Fiscal Estratégica"},
  {id: 9042, date: "2026-09-30", status: "rascunho", tag: "Processo", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Maturidade não é um destino. É um processo.", topic: "Gestão Fiscal Estratégica"}
];

const newOctoberPosts = [
  {id: 10001, date: "2026-10-05", status: "publicado", tag: "KPIs", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Você mede a eficiência do seu Fiscal?", title: "Dia das Micro e Pequenas Empresas", commemorative: true, topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10002, date: "2026-10-05", status: "publicado", tag: "KPIs", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Você mede a eficiência do seu Fiscal?", title: "Dia das Micro e Pequenas Empresas", commemorative: true, topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10003, date: "2026-10-06", status: "rascunho", tag: "Planejamento", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Planejamento de Outubro.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 10004, date: "2026-10-06", status: "rascunho", tag: "Indicadores", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Indicadores que geram resultados.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10005, date: "2026-10-07", status: "rascunho", tag: "Retrabalho", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Quanto custa o retrabalho?", topic: "Automação Fiscal"},
  {id: 10006, date: "2026-10-07", status: "rascunho", tag: "Retrabalho", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Quanto custa o retrabalho?", topic: "Automação Fiscal"},
  {id: 10007, date: "2026-10-08", status: "rascunho", tag: "Dica SAAM", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Não tente acelerar processos ruins.", topic: "Produtividade Interna"},
  {id: 10008, date: "2026-10-08", status: "rascunho", tag: "Custo Oculto", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O custo invisível do Fiscal.", topic: "Auditoria Fiscal"},
  {id: 10009, date: "2026-10-09", status: "rascunho", tag: "Produtividade", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Produtividade Inteligente.", topic: "Produtividade do Departamento Fiscal"},
  {id: 10010, date: "2026-10-09", status: "rascunho", tag: "Produtividade", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Produtividade Inteligente.", topic: "Produtividade do Departamento Fiscal"},
  {id: 10011, date: "2026-10-12", status: "rascunho", tag: "Dashboard", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O Dashboard ideal para o Fiscal.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10012, date: "2026-10-12", status: "rascunho", tag: "Dashboard", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "O Dashboard ideal para o Fiscal.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10013, date: "2026-10-13", status: "rascunho", tag: "Checklist", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Checklist: Sua empresa acompanha Erros?", topic: "Produtividade Interna"},
  {id: 10014, date: "2026-10-13", status: "rascunho", tag: "Dashboards", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como construir dashboards úteis.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10015, date: "2026-10-14", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Você mede produtividade?", topic: "Produtividade do Departamento Fiscal"},
  {id: 10016, date: "2026-10-14", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Você mede produtividade?", topic: "Produtividade do Departamento Fiscal"},
  {id: 10017, date: "2026-10-15", status: "publicado", tag: "Dia do Professor", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Mensagem valorizando conhecimento.", title: "Dia do Professor", commemorative: true, topic: "Comunidade SAAM"},
  {id: 10018, date: "2026-10-15", status: "rascunho", tag: "Performance", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Alta Performance Fiscal.", topic: "Produtividade do Departamento Fiscal"},
  {id: 10019, date: "2026-10-16", status: "publicado", tag: "Ciência e Tecnologia", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Tecnologia não substitui estratégia.", title: "Dia da Ciência e Tecnologia", commemorative: true, topic: "Automação Fiscal"},
  {id: 10020, date: "2026-10-16", status: "publicado", tag: "Ciência e Tecnologia", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Tecnologia não substitui estratégia.", title: "Dia da Ciência e Tecnologia", commemorative: true, topic: "Automação Fiscal"},
  {id: 10021, date: "2026-10-19", status: "rascunho", tag: "Dados", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Gestão baseada em dados.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10022, date: "2026-10-19", status: "rascunho", tag: "Dados", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Gestão baseada em dados.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10023, date: "2026-10-20", status: "rascunho", tag: "Alerta Semanal", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Alerta semanal sobre números.", topic: "Dicas de Utilização"},
  {id: 10024, date: "2026-10-20", status: "rascunho", tag: "Decisões", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Dados que geram decisões.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10025, date: "2026-10-21", status: "rascunho", tag: "Valor", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "O Fiscal que entrega valor.", topic: "Gestão Fiscal Estratégica"},
  {id: 10026, date: "2026-10-21", status: "rascunho", tag: "Valor", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "O Fiscal que entrega valor.", topic: "Gestão Fiscal Estratégica"},
  {id: 10027, date: "2026-10-22", status: "rascunho", tag: "Boas Práticas", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Cultura de indicadores.", topic: "Produtividade Interna"},
  {id: 10028, date: "2026-10-22", status: "rascunho", tag: "Custos", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como reduzir custos ocultos.", topic: "Auditoria Fiscal"},
  {id: 10029, date: "2026-10-23", status: "rascunho", tag: "Não Medir", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Quanto custa não medir?", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10030, date: "2026-10-23", status: "rascunho", tag: "Não Medir", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Quanto custa não medir?", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10031, date: "2026-10-26", status: "rascunho", tag: "Alta Performance", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Empresas de alta performance fazem isso.", topic: "Gestão Fiscal Estratégica"},
  {id: 10032, date: "2026-10-26", status: "rascunho", tag: "Alta Performance", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Empresas de alta performance fazem isso.", topic: "Gestão Fiscal Estratégica"},
  {id: 10033, date: "2026-10-27", status: "rascunho", tag: "Resumo", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Resumo do mês sobre outubro.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 10034, date: "2026-10-27", status: "rascunho", tag: "Futuro", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "O futuro da gestão fiscal.", topic: "Gestão Fiscal Estratégica"},
  {id: 10035, date: "2026-10-28", status: "rascunho", tag: "Antes x Depois", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Antes x Depois.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10036, date: "2026-10-28", status: "rascunho", tag: "Antes x Depois", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Antes x Depois.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 10037, date: "2026-10-29", status: "rascunho", tag: "Planejamento", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Planejamento de Novembro.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 10038, date: "2026-10-29", status: "rascunho", tag: "Inteligência", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Performance e Inteligência.", topic: "Produtividade do Departamento Fiscal"},
  {id: 10039, date: "2026-10-30", status: "rascunho", tag: "Manifesto", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "Performance não é o destino. É o resultado de decisões inteligentes.", topic: "Gestão Fiscal Estratégica"},
  {id: 10040, date: "2026-10-30", status: "rascunho", tag: "Manifesto", destiny: "linkedin", author: "SAAM Editorial", format: "Imagem", caption: "Performance não é o destino. É o resultado de decisões inteligentes.", topic: "Gestão Fiscal Estratégica"}
];

const newNovemberPosts = [
  // SEMANA 1
  {id: 11001, date: "2026-11-02", status: "rascunho", tag: "Alerta Fiscal SAAM", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Os riscos invisíveis da operação fiscal.", topic: "Auditoria Fiscal"},
  {id: 11002, date: "2026-11-02", status: "rascunho", tag: "Alerta Fiscal SAAM", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Os riscos invisíveis da operação fiscal.", topic: "Auditoria Fiscal"},
  {id: 11003, date: "2026-11-03", status: "rascunho", tag: "Planejamento", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Planejamento do mês.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 11004, date: "2026-11-03", status: "rascunho", tag: "Riscos Ocultos", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como identificar riscos ocultos antes que eles virem problemas.", topic: "Auditoria Fiscal"},
  {id: 11005, date: "2026-11-04", status: "rascunho", tag: "Erro Futuro", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "O erro que ainda não aconteceu.", topic: "Compliance e Gestão de Riscos"},
  {id: 11006, date: "2026-11-04", status: "rascunho", tag: "Erro Futuro", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "O erro que ainda não aconteceu.", topic: "Compliance e Gestão de Riscos"},
  {id: 11007, date: "2026-11-05", status: "rascunho", tag: "Dica SAAM", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Dica da Semana: Quem revisa processos regularmente encontra pequenos erros.", topic: "Produtividade Interna"},
  {id: 11008, date: "2026-11-05", status: "rascunho", tag: "Gestão Preventiva", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Gestão preventiva: por que agir antes custa menos.", topic: "Gestão Fiscal Estratégica"},
  {id: 11009, date: "2026-11-06", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Sua empresa é preventiva ou reativa?", topic: "Gestão Fiscal Estratégica"},
  {id: 11010, date: "2026-11-06", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Sua empresa é preventiva ou reativa?", topic: "Gestão Fiscal Estratégica"},

  // SEMANA 2
  {id: 11011, date: "2026-11-09", status: "rascunho", tag: "Auditoria Preventiva", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Auditoria preventiva muda tudo.", topic: "Auditoria Fiscal"},
  {id: 11012, date: "2026-11-09", status: "rascunho", tag: "Auditoria Preventiva", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Auditoria preventiva muda tudo.", topic: "Auditoria Fiscal"},
  {id: 11013, date: "2026-11-10", status: "rascunho", tag: "Checklist Preventivo", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Checklist Preventivo.", topic: "Produtividade Interna"},
  {id: 11014, date: "2026-11-10", status: "rascunho", tag: "Prevenir Erros", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como prevenir erros antes da transmissão.", topic: "Auditoria Fiscal"},
  {id: 11015, date: "2026-11-11", status: "rascunho", tag: "Conferir x Prevenir", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Conferir ou prevenir?", topic: "Auditoria Fiscal"},
  {id: 11016, date: "2026-11-11", status: "rascunho", tag: "Conferir x Prevenir", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Conferir ou prevenir?", topic: "Auditoria Fiscal"},
  {id: 11017, date: "2026-11-12", status: "publicado", tag: "Qualidade", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Mensagem: Qualidade dos dados não é detalhe.", title: "Dia Mundial da Qualidade", commemorative: true, topic: "Comunidade SAAM"},
  {id: 11018, date: "2026-11-12", status: "rascunho", tag: "Qualidade dos Dados", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Qualidade dos dados.", topic: "Inteligência Fiscal, Dados e Analytics"},
  {id: 11019, date: "2026-11-13", status: "rascunho", tag: "Checklists", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "O poder dos checklists.", topic: "Produtividade do Departamento Fiscal"},
  {id: 11020, date: "2026-11-13", status: "rascunho", tag: "Checklists", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "O poder dos checklists.", topic: "Produtividade do Departamento Fiscal"},

  // SEMANA 3
  {id: 11021, date: "2026-11-16", status: "rascunho", tag: "Prever Problemas", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Como prever problemas antes do fechamento.", topic: "Compliance e Gestão de Riscos"},
  {id: 11022, date: "2026-11-16", status: "rascunho", tag: "Prever Problemas", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Como prever problemas antes do fechamento.", topic: "Compliance e Gestão de Riscos"},
  {id: 11023, date: "2026-11-17", status: "rascunho", tag: "Painel Semanal", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Painel da Semana.", topic: "Dicas de Utilização"},
  {id: 11024, date: "2026-11-17", status: "rascunho", tag: "Indicadores de Risco", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Indicadores de risco.", topic: "Compliance e Gestão de Riscos"},
  {id: 11025, date: "2026-11-18", status: "rascunho", tag: "Sinais", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Todo erro deixa sinais.", topic: "Auditoria Fiscal"},
  {id: 11026, date: "2026-11-18", status: "rascunho", tag: "Sinais", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Todo erro deixa sinais.", topic: "Auditoria Fiscal"},
  {id: 11027, date: "2026-11-19", status: "rascunho", tag: "Monitoramento", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Boas práticas de monitoramento.", topic: "Produtividade Interna"},
  {id: 11028, date: "2026-11-19", status: "rascunho", tag: "Previsibilidade", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Como construir uma operação previsível.", topic: "Gestão Fiscal Estratégica"},
  {id: 11029, date: "2026-11-20", status: "rascunho", tag: "Monitorar x Reagir", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Monitorar ou reagir?", topic: "Gestão Fiscal Estratégica"},
  {id: 11030, date: "2026-11-20", status: "rascunho", tag: "Monitorar x Reagir", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Monitorar ou reagir?", topic: "Gestão Fiscal Estratégica"},

  // SEMANA 4
  {id: 11031, date: "2026-11-23", status: "rascunho", tag: "Governança", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Governança fiscal gera segurança.", topic: "Gestão Fiscal Estratégica"},
  {id: 11032, date: "2026-11-23", status: "rascunho", tag: "Governança", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Governança fiscal gera segurança.", topic: "Gestão Fiscal Estratégica"},
  {id: 11033, date: "2026-11-24", status: "rascunho", tag: "Resumo", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Resumo do mês sobre governança.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 11034, date: "2026-11-24", status: "rascunho", tag: "Governança Prática", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Governança fiscal na prática.", topic: "Gestão Fiscal Estratégica"},
  {id: 11035, date: "2026-11-25", status: "rascunho", tag: "Compliance", destiny: "instagram", author: "SAAM Editorial", format: "Reels", caption: "Compliance gera valor.", topic: "Compliance e Gestão de Riscos"},
  {id: 11036, date: "2026-11-25", status: "rascunho", tag: "Compliance", destiny: "linkedin", author: "SAAM Editorial", format: "Reels", caption: "Compliance gera valor.", topic: "Compliance e Gestão de Riscos"},
  {id: 11037, date: "2026-11-26", status: "rascunho", tag: "Planejamento", destiny: "interno", author: "SAAM Editorial", format: "Texto", caption: "Planejamento de Dezembro.", topic: "Bastidores e Posicionamento da SAAM"},
  {id: 11038, date: "2026-11-26", status: "rascunho", tag: "Compliance Estratégico", destiny: "blog", author: "SAAM Editorial", format: "Texto", caption: "Compliance estratégico.", topic: "Compliance e Gestão de Riscos"},
  {id: 11039, date: "2026-11-27", status: "publicado", tag: "Black Friday", destiny: "instagram", author: "SAAM Editorial", format: "Carrossel", caption: "Sua operação está preparada para o aumento das vendas?", title: "Black Friday", commemorative: true, topic: "XML e Documentos Fiscais"},
  {id: 11040, date: "2026-11-27", status: "publicado", tag: "Black Friday", destiny: "linkedin", author: "SAAM Editorial", format: "Carrossel", caption: "Sua operação está preparada para o aumento das vendas?", title: "Black Friday", commemorative: true, topic: "XML e Documentos Fiscais"},
  {id: 11041, date: "2026-11-30", status: "rascunho", tag: "Manifesto", destiny: "instagram", author: "SAAM Editorial", format: "Imagem", caption: "O futuro pertence às empresas que antecipam.", topic: "Gestão Fiscal Estratégica"},
  {id: 11042, date: "2026-11-30", status: "rascunho", tag: "Manifesto", destiny: "linkedin", author: "SAAM Editorial", format: "Imagem", caption: "O futuro pertence às empresas que antecipam.", topic: "Gestão Fiscal Estratégica"}
];

postsArr.push(...newAugustPosts);
postsArr.push(...newSeptemberPosts);
postsArr.push(...newOctoberPosts);
postsArr.push(...newNovemberPosts);

postsArr.sort((a, b) => a.date.localeCompare(b.date));

const newJsonStr = JSON.stringify(postsArr, null, 2);

const newCode = code.substring(0, startIndex + 'let defaultPosts = '.length) + 
                newJsonStr + 
                code.substring(endIndex);

const finalCode = newCode.replace(/saam_marketing_posts_v\d+/g, 'saam_marketing_posts_v12');

fs.writeFileSync('app.js', finalCode);
console.log('All months (Aug-Nov) successfully replaced and storage bumped to v12.');
