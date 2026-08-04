const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf-8');

// --- 1. SETEMBRO IDEAS ---
const setIdeas = [
  { id: 'sep-01', title: 'O teste de 2 minutos que revela a maturidade do seu departamento fiscal.', usageCount: 0, series: 'Diagnóstico da Maturidade' },
  { id: 'sep-02', title: '5 sintomas de que sua operação cresceu, mas seus processos não.', usageCount: 0, series: 'Diagnóstico da Maturidade' },
  { id: 'sep-03', title: 'Sua equipe trabalha com processos ou com improviso?', usageCount: 0, series: 'Diagnóstico da Maturidade' },
  { id: 'sep-04', title: 'Quanto do seu dia é estratégia e quanto é apagar incêndios?', usageCount: 0, series: 'Diagnóstico da Maturidade' },
  { id: 'sep-05', title: 'O que empresas Nível 1 fazem todos os dias sem perceber.', usageCount: 0, series: 'Diagnóstico da Maturidade' },
  { id: 'sep-06', title: 'Você mede produtividade ou apenas entrega obrigações?', usageCount: 0, series: 'Diagnóstico da Maturidade' },
  { id: 'sep-07', title: 'Como descobrir o gargalo invisível da operação fiscal.', usageCount: 0, series: 'Diagnóstico da Maturidade' },
  { id: 'sep-08', title: 'Os 10 sinais de uma empresa fiscalmente madura.', usageCount: 0, series: 'Diagnóstico da Maturidade' },
  { id: 'sep-09', title: 'O erro de diagnóstico que faz empresas investirem na ferramenta errada.', usageCount: 0, series: 'Diagnóstico da Maturidade' },
  { id: 'sep-10', title: 'Se sua equipe sair de férias amanhã, a operação continua?', usageCount: 0, series: 'Diagnóstico da Maturidade' },
  
  { id: 'sep-11', title: 'Como desenhar um processo fiscal inteligente.', usageCount: 0, series: 'Processos' },
  { id: 'sep-12', title: 'O fluxo perfeito do XML.', usageCount: 0, series: 'Processos' },
  { id: 'sep-13', title: 'Por que processos manuais criam novos erros.', usageCount: 0, series: 'Processos' },
  { id: 'sep-14', title: 'Como eliminar retrabalho sem contratar mais pessoas.', usageCount: 0, series: 'Processos' },
  { id: 'sep-15', title: 'O verdadeiro custo da falta de padronização.', usageCount: 0, series: 'Processos' },
  { id: 'sep-16', title: 'Quanto tempo sua equipe perde procurando informações?', usageCount: 0, series: 'Processos' },
  { id: 'sep-17', title: 'Todo processo deveria responder esta pergunta.', usageCount: 0, series: 'Processos' },
  { id: 'sep-18', title: 'Sua empresa documenta conhecimento?', usageCount: 0, series: 'Processos' },
  { id: 'sep-19', title: 'O que empresas maduras nunca deixam depender de uma pessoa.', usageCount: 0, series: 'Processos' },
  { id: 'sep-20', title: 'Checklist da padronização fiscal.', usageCount: 0, series: 'Processos' },
  
  { id: 'sep-21', title: 'Como ganhar duas horas por dia sem aumentar a equipe.', usageCount: 0, series: 'Produtividade' },
  { id: 'sep-22', title: 'O que realmente consome tempo no departamento fiscal.', usageCount: 0, series: 'Produtividade' },
  { id: 'sep-23', title: 'Produtividade não significa trabalhar mais.', usageCount: 0, series: 'Produtividade' },
  { id: 'sep-24', title: 'Onde sua equipe desperdiça energia.', usageCount: 0, series: 'Produtividade' },
  { id: 'sep-25', title: 'Como empresas maduras priorizam tarefas.', usageCount: 0, series: 'Produtividade' },
  { id: 'sep-26', title: 'O ciclo do retrabalho.', usageCount: 0, series: 'Produtividade' },
  { id: 'sep-27', title: 'A rotina invisível que rouba produtividade.', usageCount: 0, series: 'Produtividade' },
  { id: 'sep-28', title: 'Quanto custa interromper um analista fiscal?', usageCount: 0, series: 'Produtividade' },
  { id: 'sep-29', title: 'O mito da equipe sobrecarregada.', usageCount: 0, series: 'Produtividade' },
  { id: 'sep-30', title: 'As tarefas que deveriam deixar de existir.', usageCount: 0, series: 'Produtividade' },
  
  { id: 'sep-31', title: 'Dados ruins geram decisões ruins.', usageCount: 0, series: 'Dados' },
  { id: 'sep-32', title: 'Qualidade do dado vale mais que quantidade.', usageCount: 0, series: 'Dados' },
  { id: 'sep-33', title: 'O dado mais importante que ninguém acompanha.', usageCount: 0, series: 'Dados' },
  { id: 'sep-34', title: 'Sua empresa confia nos próprios números?', usageCount: 0, series: 'Dados' },
  { id: 'sep-35', title: 'Como transformar informação em decisão.', usageCount: 0, series: 'Dados' },
  { id: 'sep-36', title: 'Quem é dono dos dados fiscais?', usageCount: 0, series: 'Dados' },
  { id: 'sep-37', title: 'O custo de um cadastro errado.', usageCount: 0, series: 'Dados' },
  { id: 'sep-38', title: 'Como limpar uma base fiscal.', usageCount: 0, series: 'Dados' },
  { id: 'sep-39', title: 'O ciclo da qualidade dos dados.', usageCount: 0, series: 'Dados' },
  { id: 'sep-40', title: 'Dados organizados aceleram crescimento.', usageCount: 0, series: 'Dados' },
  
  { id: 'sep-41', title: 'O novo papel do gestor fiscal.', usageCount: 0, series: 'Liderança' },
  { id: 'sep-42', title: 'Como apresentar indicadores para a diretoria.', usageCount: 0, series: 'Liderança' },
  { id: 'sep-43', title: 'O Fiscal pode influenciar decisões estratégicas?', usageCount: 0, series: 'Liderança' },
  { id: 'sep-44', title: 'As competências do gestor fiscal moderno.', usageCount: 0, series: 'Liderança' },
  { id: 'sep-45', title: 'Como formar uma equipe de alta performance.', usageCount: 0, series: 'Liderança' },
  { id: 'sep-46', title: 'O que os melhores líderes fiscais fazem diferente.', usageCount: 0, series: 'Liderança' },
  { id: 'sep-47', title: 'O departamento fiscal pode gerar vantagem competitiva?', usageCount: 0, series: 'Liderança' },
  { id: 'sep-48', title: 'Como criar uma cultura de melhoria contínua.', usageCount: 0, series: 'Liderança' },
  { id: 'sep-49', title: 'A pergunta que todo gestor deveria fazer toda semana.', usageCount: 0, series: 'Liderança' },
  { id: 'sep-50', title: 'O que significa liderar um departamento fiscal em 2030.', usageCount: 0, series: 'Liderança' }
];

const ideasStr = 'window.ideasData = ' + JSON.stringify(setIdeas, null, 2) + ';';
appJs = appJs.replace(/window\.ideasData\s*=\s*\[[\s\S]*?\];/, ideasStr);


// --- 2. OCTOBER POSTS ---
const octPosts = [
  // Capítulo 1
  { id: 'oct-01', date: '2026-10-01', channel: 'Instagram', format: 'Reels', theme: 'DADOS QUE FALAM', title: 'O ativo mais valioso da sua empresa pode estar no departamento fiscal.', status: 'Idea', audience: 'Lead Frio' },
  { id: 'oct-02', date: '2026-10-02', channel: 'LinkedIn', format: 'Carrossel', theme: 'DADOS QUE FALAM', title: '5 dados fiscais que toda diretoria deveria acompanhar.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'oct-03', date: '2026-10-02', channel: 'WhatsApp', format: 'Mensagem', theme: 'DADOS QUE FALAM', title: 'Insight da Semana: "Dados fiscais só têm valor quando se transformam em decisões."', status: 'Idea', audience: 'Base' },

  // Capítulo 2
  { id: 'oct-05', date: '2026-10-05', channel: 'LinkedIn', format: 'Radar Fiscal', theme: 'PERFORMANCE', title: 'Como a qualidade dos dados impacta a competitividade das empresas.', status: 'Idea', audience: 'Todos' },
  { id: 'oct-06', date: '2026-10-06', channel: 'Instagram', format: 'Reels', theme: 'PERFORMANCE', title: 'Quanto custa uma hora de retrabalho no departamento fiscal?', status: 'Idea', audience: 'Lead Frio' },
  { id: 'oct-07', date: '2026-10-07', channel: 'LinkedIn', format: 'KPI da Semana', theme: 'PERFORMANCE', title: 'Tempo médio de fechamento: por que ele importa?', status: 'Idea', audience: 'Lead Quente' },
  { id: 'oct-08', date: '2026-10-08', channel: 'Blog', format: 'Artigo', theme: 'PERFORMANCE', title: 'Os KPIs que transformam o departamento fiscal em uma área estratégica.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'oct-09', date: '2026-10-09', channel: 'LinkedIn', format: 'O Número Invisível', theme: 'PERFORMANCE', title: 'Quantas inconsistências sua equipe evita antes da transmissão?', status: 'Idea', audience: 'Todos' },
  { id: 'oct-10', date: '2026-10-09', channel: 'WhatsApp', format: 'Checklist', theme: 'PERFORMANCE', title: 'Checklist: "Os 5 KPIs que toda equipe fiscal deveria acompanhar."', status: 'Idea', audience: 'Base' },

  // Capítulo 3
  { id: 'oct-13', date: '2026-10-13', channel: 'Instagram', format: 'Reels', theme: 'DECISÕES BASEADAS EM DADOS', title: 'O Fiscal ainda informa o passado ou já ajuda a construir o futuro?', status: 'Idea', audience: 'Lead Frio' },
  { id: 'oct-14', date: '2026-10-14', channel: 'LinkedIn', format: 'Carrossel', theme: 'DECISÕES BASEADAS EM DADOS', title: 'Da informação à decisão: como transformar relatórios em estratégia.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'oct-15', date: '2026-10-15', channel: 'Blog', format: 'Artigo', theme: 'DECISÕES BASEADAS EM DADOS', title: 'Por que empresas orientadas por dados crescem mais rápido.', status: 'Idea', audience: 'Todos' },
  { id: 'oct-16', date: '2026-10-16', channel: 'Blog', format: 'Artigo', theme: 'DECISÕES BASEADAS EM DADOS', title: 'Como criar uma cultura orientada por indicadores fiscais.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'oct-17', date: '2026-10-16', channel: 'WhatsApp', format: 'Dica', theme: 'DECISÕES BASEADAS EM DADOS', title: 'Dica da Semana: "Todo indicador precisa gerar uma ação. Se não gera, é apenas um número."', status: 'Idea', audience: 'Base' },

  // Capítulo 4
  { id: 'oct-19', date: '2026-10-19', channel: 'LinkedIn', format: 'Radar Fiscal', theme: 'RESULTADOS REAIS', title: 'O que empresas de alta performance fazem diferente.', status: 'Idea', audience: 'Todos' },
  { id: 'oct-20', date: '2026-10-20', channel: 'YouTube', format: 'Vídeo', theme: 'RESULTADOS REAIS', title: 'Por Dentro do SAAM: Soluções focadas em resultados, não apenas funcionalidades.', status: 'Idea', audience: 'Cliente' },
  { id: 'oct-21', date: '2026-10-21', channel: 'YouTube', format: 'Case', theme: 'RESULTADOS REAIS', title: 'Como uma empresa reduziu retrabalho ao reorganizar processos fiscais.', status: 'Idea', audience: 'Cliente' },
  { id: 'oct-22', date: '2026-10-22', channel: 'LinkedIn', format: 'Carrossel', theme: 'RESULTADOS REAIS', title: 'Antes x Depois: como medir a evolução da operação fiscal.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'oct-23', date: '2026-10-23', channel: 'Blog', format: 'Artigo', theme: 'RESULTADOS REAIS', title: 'ROI da Inteligência Fiscal: como medir o retorno da evolução.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'oct-24', date: '2026-10-23', channel: 'WhatsApp', format: 'Pergunta', theme: 'RESULTADOS REAIS', title: 'Pergunta da Semana: "Se você economizasse 10 horas, onde investiria esse tempo?"', status: 'Idea', audience: 'Base' },

  // Capítulo 5
  { id: 'oct-26', date: '2026-10-26', channel: 'Instagram', format: 'Reels', theme: 'MOTOR DE CRESCIMENTO', title: 'O futuro pertence às empresas que decidem com dados.', status: 'Idea', audience: 'Todos' },
  { id: 'oct-27', date: '2026-10-27', channel: 'LinkedIn', format: 'Carrossel', theme: 'MOTOR DE CRESCIMENTO', title: 'Os 7 hábitos das equipes fiscais de alta performance.', status: 'Idea', audience: 'Lead Frio' },
  { id: 'oct-28', date: '2026-10-28', channel: 'LinkedIn', format: 'Mito', theme: 'MOTOR DE CRESCIMENTO', title: 'Fiscal ou Ficção? "O Fiscal existe apenas para cumprir obrigações."', status: 'Idea', audience: 'Todos' },
  { id: 'oct-29', date: '2026-10-29', channel: 'Blog', format: 'Artigo', theme: 'MOTOR DE CRESCIMENTO', title: 'Como transformar indicadores em vantagem competitiva.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'oct-30', date: '2026-10-30', channel: 'YouTube', format: 'Manifesto', theme: 'MOTOR DE CRESCIMENTO', title: 'A Inteligência que Gera Resultados: por que medir é o primeiro passo.', status: 'Idea', audience: 'Todos' }
];

// Append October posts to window.posts
let postsMatch = appJs.match(/window\.posts\s*=\s*\[([\s\S]*?)\];/);
if (postsMatch) {
    let postsContent = postsMatch[1];
    let newPostsContent = postsContent;
    if (newPostsContent.trim().length > 0) {
        newPostsContent += ',\n';
    }
    newPostsContent += octPosts.map(p => JSON.stringify(p)).join(',\n');
    appJs = appJs.replace(postsMatch[0], `window.posts = [\n${newPostsContent}\n];`);
}

// Add October to window.seasons
let seasonsMatch = appJs.match(/window\.seasons\s*=\s*\{([\s\S]*?)\};/);
if (seasonsMatch) {
    let seasonsContent = seasonsMatch[1];
    let newSeasonsContent = seasonsContent;
    if (newSeasonsContent.trim().length > 0) {
        newSeasonsContent += ',\n';
    }
    let octSeason = `
  '2026-10': {
    theme: 'OUTUBRO 2026: A INTELIGÊNCIA QUE GERA RESULTADOS',
    banner: \`
      <div style="background: linear-gradient(135deg, #7C2D12 0%, #EA580C 100%); color: #FFF; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 25px -5px rgba(234,88,12,0.3);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
            🟢 Temporada 3 • A INTELIGÊNCIA QUE GERA RESULTADOS
          </span>
          <span style="font-size: 11px; font-weight: 700; opacity: 0.9;">OUTUBRO 2026</span>
        </div>
        <h2 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 800;">A inteligência que gera resultados.</h2>
        <p style="margin: 0; font-size: 15px; opacity: 0.9; line-height: 1.5; max-width: 800px;">
          O verdadeiro valor da tecnologia não está na automação. Está na capacidade de transformar informação em vantagem competitiva.
        </p>
      </div>
    \`,
    weekMap: {
      'DADOS QUE FALAM': { label: 'Semana 1: DADOS QUE FALAM', color: '#10B981' },
      'PERFORMANCE': { label: 'Semana 2: PERFORMANCE', color: '#3B82F6' },
      'DECISÕES BASEADAS EM DADOS': { label: 'Semana 3: DECISÕES', color: '#8B5CF6' },
      'RESULTADOS REAIS': { label: 'Semana 4: RESULTADOS', color: '#F59E0B' },
      'MOTOR DE CRESCIMENTO': { label: 'Semana 5: LIDERANÇA E CRESCIMENTO', color: '#DC2626' }
    }
  }
`;
    newSeasonsContent += octSeason;
    appJs = appJs.replace(seasonsMatch[0], `window.seasons = {${newSeasonsContent}};`);
}

fs.writeFileSync('app.js', appJs, 'utf-8');
console.log('App.js updated successfully with Ideas and October Calendar.');
