const fs = require('fs');

const decPosts = [
  // Capítulo 1
  { id: 'dec-01', date: '2026-12-01', channel: 'Instagram', format: 'Reels', theme: 'O QUE 2026 NOS ENSINOU', title: '2026 mudou o Fiscal para sempre. O que aprendemos?', status: 'Idea', audience: 'Todos' },
  { id: 'dec-02', date: '2026-12-02', channel: 'LinkedIn', format: 'Carrossel', theme: 'O QUE 2026 NOS ENSINOU', title: 'Os 10 maiores aprendizados fiscais de 2026.', status: 'Idea', audience: 'Lead Frio' },
  { id: 'dec-03', date: '2026-12-03', channel: 'LinkedIn', format: 'Mito', theme: 'O QUE 2026 NOS ENSINOU', title: 'Fiscal ou Ficção? "2027 será apenas uma continuação de 2026."', status: 'Idea', audience: 'Todos' },
  { id: 'dec-04', date: '2026-12-04', channel: 'Blog', format: 'Artigo', theme: 'O QUE 2026 NOS ENSINOU', title: 'Como as empresas mais preparadas encerram o ano.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'dec-04-whats', date: '2026-12-04', channel: 'WhatsApp', format: 'Reflexão', theme: 'O QUE 2026 NOS ENSINOU', title: 'Reflexão da Semana: "As empresas que mais evoluíram em 2026 foram aquelas que aprenderam mais rápido."', status: 'Idea', audience: 'Base' },

  // Capítulo 2
  { id: 'dec-07', date: '2026-12-07', channel: 'LinkedIn', format: 'Radar Fiscal', theme: 'REVISAR ANTES DE PLANEJAR', title: 'Radar Fiscal SAAM: As mudanças que exigirão atenção em 2027.', status: 'Idea', audience: 'Todos' },
  { id: 'dec-08', date: '2026-12-08', channel: 'Instagram', format: 'Reels', theme: 'REVISAR ANTES DE PLANEJAR', title: 'Os processos que você não deveria levar para 2027.', status: 'Idea', audience: 'Lead Frio' },
  { id: 'dec-09', date: '2026-12-09', channel: 'LinkedIn', format: 'Carrossel', theme: 'REVISAR ANTES DE PLANEJAR', title: 'Checklist de revisão da operação fiscal antes do fim do ano.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'dec-10', date: '2026-12-10', channel: 'Blog', format: 'Artigo', theme: 'REVISAR ANTES DE PLANEJAR', title: 'Inteligência Fiscal: Por que dezembro é o melhor mês para reorganizar processos.', status: 'Idea', audience: 'Todos' },
  { id: 'dec-11', date: '2026-12-11', channel: 'LinkedIn', format: 'Checklist', theme: 'REVISAR ANTES DE PLANEJAR', title: 'Checklist: 10 verificações obrigatórias antes de iniciar um novo ciclo.', status: 'Idea', audience: 'Cliente' },
  { id: 'dec-11-whats', date: '2026-12-11', channel: 'WhatsApp', format: 'Checklist', theme: 'REVISAR ANTES DE PLANEJAR', title: 'Checklist da Semana: "O que precisa ser corrigido antes de janeiro?"', status: 'Idea', audience: 'Base' },

  // Capítulo 3
  { id: 'dec-14', date: '2026-12-14', channel: 'Instagram', format: 'Reels', theme: 'PLANEJANDO 2027', title: 'As empresas que começam janeiro organizadas fizeram isso em dezembro.', status: 'Idea', audience: 'Lead Frio' },
  { id: 'dec-15', date: '2026-12-15', channel: 'LinkedIn', format: 'Carrossel', theme: 'PLANEJANDO 2027', title: '5 metas fiscais para um departamento de alta performance em 2027.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'dec-16', date: '2026-12-16', channel: 'LinkedIn', format: 'Você Sabia?', theme: 'PLANEJANDO 2027', title: 'Você Sabia? Planejamento reduz retrabalho e aumenta previsibilidade.', status: 'Idea', audience: 'Todos' },
  { id: 'dec-17', date: '2026-12-17', channel: 'Blog', format: 'Artigo', theme: 'PLANEJANDO 2027', title: 'Como montar um plano de evolução fiscal para o próximo ano.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'dec-18', date: '2026-12-18', channel: 'YouTube', format: 'Vídeo', theme: 'PLANEJANDO 2027', title: 'Por Dentro do SAAM: Como ajudamos nossos clientes a se preparar para um novo ciclo.', status: 'Idea', audience: 'Cliente' },
  { id: 'dec-18-whats', date: '2026-12-18', channel: 'WhatsApp', format: 'Pergunta', theme: 'PLANEJANDO 2027', title: 'Pergunta da Semana: "Se pudesse melhorar apenas um processo em 2027, qual seria?"', status: 'Idea', audience: 'Base' },

  // Capítulo 4
  { id: 'dec-21', date: '2026-12-21', channel: 'LinkedIn', format: 'Radar Fiscal', theme: 'O FUTURO COMEÇA AGORA', title: 'Radar Fiscal SAAM: As tendências que devem transformar o Fiscal em 2027.', status: 'Idea', audience: 'Todos' },
  { id: 'dec-22', date: '2026-12-22', channel: 'Instagram', format: 'Reels', theme: 'O FUTURO COMEÇA AGORA', title: 'Não espere janeiro para mudar sua operação.', status: 'Idea', audience: 'Lead Frio' },
  { id: 'dec-23', date: '2026-12-23', channel: 'LinkedIn', format: 'Carrossel', theme: 'O FUTURO COMEÇA AGORA', title: '7 decisões que sua empresa deveria tomar antes do fim do ano.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'dec-24', date: '2026-12-24', channel: 'LinkedIn', format: 'Mensagem', theme: 'O FUTURO COMEÇA AGORA', title: 'Mensagem Institucional: Que 2027 seja um ano de evolução, inteligência e resultados.', status: 'Idea', audience: 'Todos' },
  { id: 'dec-24-whats', date: '2026-12-24', channel: 'WhatsApp', format: 'Mensagem', theme: 'O FUTURO COMEÇA AGORA', title: 'Mensagem de Natal: "Decisões inteligentes e processos mais fortes."', status: 'Idea', audience: 'Base' },

  // Capítulo 5
  { id: 'dec-28', date: '2026-12-28', channel: 'Instagram', format: 'Reels', theme: 'O PRIMEIRO PASSO DE 2027', title: 'O maior erro é achar que o planejamento começa em janeiro.', status: 'Idea', audience: 'Todos' },
  { id: 'dec-29', date: '2026-12-29', channel: 'LinkedIn', format: 'Carrossel', theme: 'O PRIMEIRO PASSO DE 2027', title: 'O Plano Fiscal 2027: os 10 primeiros passos.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'dec-30', date: '2026-12-30', channel: 'Blog', format: 'Artigo', theme: 'O PRIMEIRO PASSO DE 2027', title: 'Como empresas de alta performance iniciam um novo ciclo.', status: 'Idea', audience: 'Todos' },
  { id: 'dec-31', date: '2026-12-31', channel: 'YouTube', format: 'Manifesto', theme: 'O PRIMEIRO PASSO DE 2027', title: 'Manifesto SAAM: O futuro não começa amanhã. Ele começa nas decisões de hoje.', status: 'Idea', audience: 'Todos' }
];

let appJs = fs.readFileSync('app.js', 'utf-8');

// 1. Update window.posts
const postsMatch = appJs.match(/window\.posts\s*=\s*\[([\s\S]*?)\];/);
if (postsMatch) {
    let postsContent = postsMatch[1];
    if (postsContent.trim().length > 0) {
        postsContent += ',\\n';
    }
    postsContent += decPosts.map(p => JSON.stringify(p)).join(',\\n');
    appJs = appJs.replace(postsMatch[0], 'window.posts = [\\n' + postsContent + '\\n];');
}

// 2. Update window.seasons
const seasonsMatch = appJs.match(/window\.seasons\s*=\s*\\{([\\s\\S]*?)\\};/);
if (seasonsMatch) {
    let seasonsContent = seasonsMatch[1];
    if (seasonsContent.trim().length > 0) {
        seasonsContent += ',\\n';
    }
    const decSeason = [
  "  '2026-12': {",
  "    theme: 'DEZEMBRO 2026: O ANO EM QUE O FISCAL DECIDE O FUTURO',",
  "    banner: `",
  "      <div style=\"background: linear-gradient(135deg, #BE185D 0%, #DB2777 100%); color: #FFF; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 25px -5px rgba(219,39,119,0.3);\">",
  "        <div style=\"display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;\">",
  "          <span style=\"background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;\">",
  "            🎯 Temporada 5 • O ANO EM QUE O FISCAL DECIDE O FUTURO",
  "          </span>",
  "          <span style=\"font-size: 11px; font-weight: 700; opacity: 0.9;\">DEZEMBRO 2026</span>",
  "        </div>",
  "        <h2 style=\"margin: 0 0 8px 0; font-size: 26px; font-weight: 800;\">O futuro não é construído em janeiro. Ele começa hoje.</h2>",
  "        <p style=\"margin: 0; font-size: 15px; opacity: 0.9; line-height: 1.5; max-width: 800px;\">",
  "          As empresas que liderarão 2027 não serão as que mais trabalharam em 2026. Serão as que melhor aprenderam com ele.",
  "        </p>",
  "      </div>",
  "    `,",
  "    weekMap: {",
  "      'O QUE 2026 NOS ENSINOU': { label: 'Semana 1: APRENDIZADOS', color: '#10B981' },",
  "      'REVISAR ANTES DE PLANEJAR': { label: 'Semana 2: REVISÃO DE PROCESSOS', color: '#F59E0B' },",
  "      'PLANEJANDO 2027': { label: 'Semana 3: PLANEJAMENTO ESTRATÉGICO', color: '#3B82F6' },",
  "      'O FUTURO COMEÇA AGORA': { label: 'Semana 4: O FUTURO HOJE', color: '#8B5CF6' },",
  "      'O PRIMEIRO PASSO DE 2027': { label: 'Semana 5: O PRIMEIRO PASSO', color: '#DC2626' }",
  "    }",
  "  }"
].join('\\n');
    seasonsContent += decSeason;
    appJs = appJs.replace(seasonsMatch[0], 'window.seasons = {' + seasonsContent + '};');
}

fs.writeFileSync('app.js', appJs, 'utf-8');
console.log('December Calendar added to app.js');
