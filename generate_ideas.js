const fs = require('fs');

const rawData = [
  { theme: "Inteligência Fiscal", routine: "Estratégia", title: "O Fiscal virou estrategista." },
  { theme: "Inteligência Fiscal", routine: "Dados", title: "O maior ativo do Fiscal são os dados." },
  { theme: "Inteligência Fiscal", routine: "Estratégia", title: "O ERP não enxerga tudo." },
  { theme: "Inteligência Fiscal", routine: "Auditoria preventiva", title: "Auditoria começa antes da transmissão." },
  { theme: "Inteligência Fiscal", routine: "Estratégia", title: "O novo perfil do Analista Fiscal." },
  { theme: "Inteligência Fiscal", routine: "Tecnologia", title: "IA muda mais processos do que pessoas." },
  { theme: "Inteligência Fiscal", routine: "Integrações", title: "O Fiscal conversa cada vez mais com o financeiro." },
  { theme: "Inteligência Fiscal", routine: "Dados", title: "Quem domina dados domina impostos." },
  { theme: "Inteligência Fiscal", routine: "Fechamento fiscal", title: "O fechamento fiscal está mudando." },
  { theme: "Inteligência Fiscal", routine: "Estratégia", title: "Como será o Fiscal em 2030." },
  
  { theme: "Reforma Tributária", routine: "Compliance", title: "O maior erro das empresas sobre a Reforma." },
  { theme: "Reforma Tributária", routine: "Compliance", title: "A Reforma muda processos antes de mudar impostos." },
  { theme: "Reforma Tributária", routine: "Compliance", title: "Empresas preparadas começaram em 2025." },
  { theme: "Reforma Tributária", routine: "Compliance", title: "O custo operacional da Reforma." },
  { theme: "Reforma Tributária", routine: "Compliance", title: "O fim dos controles paralelos." },
  { theme: "Reforma Tributária", routine: "XML não encontrado", title: "O papel do XML." },
  { theme: "Reforma Tributária", routine: "Qualidade dos dados", title: "Dados ruins geram decisões ruins." },
  { theme: "Reforma Tributária", routine: "Compliance", title: "Sua empresa está preparada?" },
  { theme: "Reforma Tributária", routine: "Fechamento fiscal", title: "O que muda na rotina diária." },
  { theme: "Reforma Tributária", routine: "Compliance", title: "Checklist da Reforma." },

  { theme: "XML", routine: "XML não encontrado", title: "O XML perdido que gera dor meses depois." },
  { theme: "XML", routine: "XML não encontrado", title: "Quanto custa um XML ausente?" },
  { theme: "XML", routine: "Organização documental", title: "O ciclo completo do XML." },
  { theme: "XML", routine: "XML inconsistente", title: "Onde as empresas erram." },
  { theme: "XML", routine: "Dados", title: "XML não é arquivo, é informação." },

  { theme: "ERP", routine: "Parametrização", title: "O ERP faz exatamente aquilo que foi desenvolvido para fazer." },
  { theme: "ERP", routine: "Auditoria preventiva", title: "O ERP não audita." },
  { theme: "ERP", routine: "Integrações", title: "Onde termina o ERP." },
  { theme: "ERP", routine: "Integrações", title: "O mito do ERP perfeito." },
  { theme: "ERP", routine: "Integrações", title: "ERP + Auditoria Inteligente." },

  { theme: "SPED", routine: "Cruzamentos", title: "O SPED revela problemas antigos." },
  { theme: "SPED", routine: "Auditoria preventiva", title: "Antes de transmitir, audite." },
  { theme: "SPED", routine: "Auditoria preventiva", title: "O erro que só aparece depois." },
  { theme: "SPED", routine: "Cruzamentos", title: "PVA não identifica tudo." },
  { theme: "SPED", routine: "Fechamento fiscal", title: "Como reduzir retrabalho." },

  { theme: "APIs e Integrações", routine: "Integrações", title: "O poder da integração." },
  { theme: "APIs e Integrações", routine: "Dados", title: "Dados em tempo real." },
  { theme: "APIs e Integrações", routine: "Captura automática", title: "APIs eliminam atividades repetitivas." },
  { theme: "APIs e Integrações", routine: "Integrações", title: "Integrações inteligentes." },
  { theme: "APIs e Integrações", routine: "Dados", title: "O futuro é conectado." },

  { theme: "Casos Reais", routine: "Auditoria preventiva", title: "Uma multa evitada." },
  { theme: "Casos Reais", routine: "XML não encontrado", title: "Um XML recuperado." },
  { theme: "Casos Reais", routine: "Fechamento fiscal", title: "Um fechamento antecipado." },
  { theme: "Casos Reais", routine: "Integrações", title: "Uma integração bem feita." },
  { theme: "Casos Reais", routine: "Estratégia", title: "Como uma empresa ganhou produtividade." },

  { theme: "Posicionamento", routine: "Estratégia", title: "O Fiscal não pode ser apenas operacional." },
  { theme: "Posicionamento", routine: "Qualidade dos dados", title: "O futuro pertence aos dados limpos." },
  { theme: "Posicionamento", routine: "Auditoria preventiva", title: "Empresas maduras auditam antes." },
  { theme: "Posicionamento", routine: "Tecnologia", title: "A tecnologia não elimina pessoas, elimina desperdícios." },
  { theme: "Posicionamento", routine: "Estratégia", title: "A SAAM acredita que Inteligência Fiscal é vantagem competitiva." }
];

const funnels = ["Leads", "Base", "Geral"];
const tags = ["ESTRATÉGIA", "TUTORIAL", "ALERTA", "OPINIÃO", "CASE"];
const destinies = ["LinkedIn", "Instagram", "E-mail", "Blog"];

let nextId = 101;
const ideasData = rawData.map((item, i) => {
  return {
    id: nextId++,
    theme: item.theme,
    routine: item.routine,
    funnel: funnels[i % funnels.length],
    title: item.title,
    tag: tags[i % tags.length],
    hook: "Como isso afeta o seu negócio?",
    destiny: destinies[i % destinies.length],
    score: Math.floor(Math.random() * (99 - 85 + 1)) + 85
  };
});

let js = fs.readFileSync('app.js', 'utf-8');

js = js.replace(/window\.ideasData = \[[\s\S]*?\];/, 'window.ideasData = ' + JSON.stringify(ideasData, null, 2) + ';');

const updateLogic = "let filtered = window.ideasData.filter(idea => {\\n" +
"    let matchTheme = window.currentGeralTheme === 'Todos' || idea.theme === window.currentGeralTheme;\\n" +
"    let matchTerm = !term || \\n" +
"      idea.title.toLowerCase().includes(term) || \\n" +
"      idea.tag.toLowerCase().includes(term) || \\n" +
"      idea.destiny.toLowerCase().includes(term);\\n" +
"      \\n" +
"    const routineEl = document.getElementById('filter-routine-geral');\\n" +
"    const routineTerm = routineEl ? routineEl.value : '';\\n" +
"    let matchRoutine = !routineTerm || idea.routine === routineTerm;\\n" +
"    \\n" +
"    return matchTheme && matchTerm && matchRoutine;\\n" +
"  });\\n" +
"\\n" +
"  countEl.textContent = filtered.length + ' ideias';\\n" +
"  const countTodos = document.getElementById('count-todos-ideias');\\n" +
"  if(countTodos) countTodos.textContent = window.ideasData.length;\\n";

js = js.replace(/let filtered = window\.ideasData\.filter\(idea => {[\s\S]*?countEl\.textContent = `\$\{filtered\.length\} ideias`;/, updateLogic);

fs.writeFileSync('app.js', js, 'utf-8');
console.log('ideasData and filters updated in app.js');
