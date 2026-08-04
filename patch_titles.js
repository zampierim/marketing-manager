const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const titleMap = {
  // AGOSTO
  8001: "O FUTURO DO FISCAL JÁ COMEÇOU",
  8002: "O FUTURO DO FISCAL JÁ COMEÇOU",
  8003: "Planejamento do Mês: O Futuro do Fiscal",
  8004: "O Novo Papel do Profissional Fiscal",
  8005: "Fiscal ou Ficção? ERP resolve tudo",
  8006: "Fiscal ou Ficção? ERP resolve tudo",
  8007: "Você sabe onde estão seus XMLs?",
  8008: "Como a Reforma Tributária muda a operação fiscal",
  8009: "A IA vai substituir o Fiscal?",
  8010: "A IA vai substituir o Fiscal?",
  8011: "O mercado mudou",
  8012: "O mercado mudou",
  8013: "Sua empresa está preparada para a Reforma?",
  8014: "ERP x Auditoria: Quem faz o quê?", // Dia do Advogado
  8015: "Fiscal ou Ficção? ERP encontra todos os erros",
  8016: "Como reduzir retrabalho fiscal",
  8017: "O que é Inteligência Fiscal na prática?",
  8018: "Você está preparado para 2027?",
  8019: "Quanto custa um XML perdido?",
  8020: "Revise seus lotes de envio",
  8021: "Como evitar inconsistências fiscais",
  8022: "O erro que custa caro",
  8023: "Integrações Inteligentes",
  8024: "Por que dados limpos importam?",
  8025: "O Fiscal virou estratégico",
  8026: "Os 4 níveis da maturidade fiscal",
  8027: "Checklist de fechamento",
  8028: "Como sair do operacional",
  8029: "Em qual nível sua empresa está?",
  8030: "A nova era da auditoria",
  8031: "A Nova Era da Auditoria Fiscal",
  8032: "O futuro começa hoje",
  8033: "Dia do Blog", // Dia do Blog

  // SETEMBRO
  9001: "Qual é o nível da sua operação fiscal?",
  9002: "Qual é o nível da sua operação fiscal?",
  9003: "A Nova Era da Maturidade Fiscal",
  9004: "Maturidade não se compra. Se constrói.",
  9005: "Sua empresa é realmente madura?",
  9006: "Sua empresa é realmente madura?",
  9007: "Processos vencem tecnologia", // Independência
  9008: "Processos vencem tecnologia",
  9009: "A importância do fluxo documentado",
  9010: "Por que processos importam mais que tecnologia?",
  9011: "Seu ERP é suficiente?",
  9012: "Seu ERP é suficiente?",
  9013: "Padronizações eliminam retrabalhos",
  9014: "Como padronizar processos fiscais",
  9015: "Onde nasce o retrabalho?",
  9016: "Onde nasce o retrabalho?",
  9017: "Os KPIs do departamento fiscal",
  9018: "Os KPIs do departamento fiscal",
  9019: "Como os clientes evoluíram", // Dia do Cliente
  9020: "Como indicadores transformam a gestão fiscal",
  9021: "O que medir primeiro?",
  9022: "O que medir primeiro?",
  9023: "Como criar uma rotina baseada em indicadores",
  9024: "Como criar KPIs fiscais",
  9025: "Você mede ou apenas trabalha?",
  9026: "Você mede ou apenas trabalha?",
  9027: "O Fiscal protagonista",
  9028: "O Fiscal protagonista",
  9029: "O Fiscal do futuro", // Dia do Contador
  9030: "O novo gestor fiscal",
  9031: "O futuro pertence aos dados",
  9032: "O futuro pertence aos dados",
  9033: "Os hábitos de alta performance",
  9034: "Como usar dados",
  9035: "Você lidera ou apenas executa?",
  9036: "Você lidera ou apenas executa?",
  9037: "O próximo nível começa agora",
  9038: "O próximo nível começa agora",
  9039: "Resumo do mês sobre maturidade",
  9040: "O que aprendemos sobre Maturidade Fiscal",
  9041: "Maturidade não é destino. É processo.",
  9042: "Maturidade não é destino. É processo.",

  // OUTUBRO
  10001: "Os KPIs que mudam o jogo", // Dia das Micro e Pequenas Empresas
  10002: "Os KPIs que mudam o jogo",
  10003: "A Inteligência que Gera Resultados",
  10004: "Performance além dos números",
  10005: "O custo real do retrabalho",
  10006: "O custo real do retrabalho",
  10007: "Não tente acelerar processos ruins",
  10008: "O custo invisível da ineficiência",
  10009: "O que é trabalhar melhor?",
  10010: "O que é trabalhar melhor?",
  10011: "O painel de controle perfeito",
  10012: "O painel de controle perfeito",
  10013: "Seus dados estão limpos?",
  10014: "Como transformar dados em decisões",
  10015: "Fiscal ou Ficção? Volume vs. Valor",
  10016: "Fiscal ou Ficção? Volume vs. Valor",
  10017: "A SAAM como empresa que educa", // Dia do Professor
  10018: "Alta performance não é trabalhar mais",
  10019: "Tecnologia + Processo = Inovação", // Dia da Ciência e Tecnologia
  10020: "Tecnologia + Processo = Inovação",
  10021: "A velocidade da decisão",
  10022: "A velocidade da decisão",
  10023: "Monitoramento de resultados",
  10024: "Dados que geram caixa",
  10025: "O Fiscal deixou de ser custo",
  10026: "O Fiscal deixou de ser custo",
  10027: "Cultura de performance",
  10028: "Reduzindo o Custo Brasil",
  10029: "Quanto custa o erro não medido?",
  10030: "Quanto custa o erro não medido?",
  10031: "As empresas maduras fazem assim",
  10032: "As empresas maduras fazem assim",
  10033: "A inteligência gerando resultados",
  10034: "O futuro da gestão estratégica",
  10035: "O antes e depois da inteligência fiscal",
  10036: "O antes e depois da inteligência fiscal",
  10037: "Preparação para Novembro",
  10038: "Inteligência fiscal como vantagem",
  10039: "Resultados provam quem você é",
  10040: "Resultados provam quem você é",

  // NOVEMBRO
  11001: "Os riscos invisíveis da operação fiscal",
  11002: "Os riscos invisíveis da operação fiscal",
  11003: "O Fiscal que Antecipa o Futuro",
  11004: "Como identificar riscos ocultos",
  11005: "O erro que ainda não aconteceu",
  11006: "O erro que ainda não aconteceu",
  11007: "Quem revisa processos previne erros",
  11008: "Por que agir antes custa menos",
  11009: "Sua empresa é preventiva ou reativa?",
  11010: "Sua empresa é preventiva ou reativa?",
  11011: "Auditoria preventiva muda tudo",
  11012: "Auditoria preventiva muda tudo",
  11013: "Checklist da Prevenção",
  11014: "Como prevenir erros antes da transmissão",
  11015: "Conferir ou prevenir?",
  11016: "Conferir ou prevenir?",
  11017: "Qualidade dos dados não é detalhe", // Dia Mundial da Qualidade
  11018: "O primeiro passo para auditoria eficiente",
  11019: "O poder dos checklists",
  11020: "O poder dos checklists",
  11021: "Como prever problemas antes do fechamento",
  11022: "Como prever problemas antes do fechamento",
  11023: "Painel de indicadores de risco",
  11024: "Indicadores que todo gestor deveria acompanhar",
  11025: "Todo erro deixa sinais",
  11026: "Todo erro deixa sinais",
  11027: "Rotina semanal de monitoramento",
  11028: "Como construir uma operação previsível",
  11029: "Monitorar ou reagir?",
  11030: "Monitorar ou reagir?",
  11031: "Governança fiscal gera segurança",
  11032: "Governança fiscal gera segurança",
  11033: "Resumo do mês sobre prevenção",
  11034: "Governança fiscal na prática",
  11035: "Compliance gera valor",
  11036: "Compliance gera valor",
  11037: "O Ano em que o Fiscal Decide o Futuro",
  11038: "Compliance estratégico",
  11039: "Sua operação está preparada para a Black Friday?", // Black Friday
  11040: "Sua operação está preparada para a Black Friday?",
  11041: "O futuro pertence às empresas que antecipam",
  11042: "O futuro pertence às empresas que antecipam"
};

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

if (startIndex !== -1 && endIndex !== -1) {
  const jsonStr = code.substring(startIndex + 'let defaultPosts = '.length, endIndex + 1);
  let postsArr = eval('(' + jsonStr + ')');
  
  // Inject titles
  for (let post of postsArr) {
    if (titleMap[post.id]) {
      post.title = titleMap[post.id];
    }
  }

  const newJsonStr = JSON.stringify(postsArr, null, 2);
  let newCode = code.substring(0, startIndex + 'let defaultPosts = '.length) + 
                  newJsonStr + 
                  code.substring(endIndex);

  // Bump version to v13 so localStorage reloads
  newCode = newCode.replace(/saam_marketing_posts_v\d+/g, 'saam_marketing_posts_v13');
  
  fs.writeFileSync('app.js', newCode);
  console.log("Titles injected successfully. Storage bumped to v13.");
} else {
  console.log("Could not find defaultPosts array to inject titles.");
}
