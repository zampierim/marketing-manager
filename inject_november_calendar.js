const fs = require('fs');

const novPosts = [
  // Capítulo 1
  { id: 'nov-02', date: '2026-11-02', channel: 'Instagram', format: 'Reels', theme: 'OS RISCOS QUE NINGUÉM ENXERGA', title: 'O maior risco fiscal não é o erro. É o erro que ninguém percebeu ainda.', status: 'Idea', audience: 'Lead Frio' },
  { id: 'nov-03', date: '2026-11-03', channel: 'LinkedIn', format: 'Carrossel', theme: 'OS RISCOS QUE NINGUÉM ENXERGA', title: '7 riscos invisíveis que podem comprometer uma operação fiscal.', status: 'Idea', audience: 'Lead Frio' },
  { id: 'nov-04', date: '2026-11-04', channel: 'LinkedIn', format: 'Mito', theme: 'OS RISCOS QUE NINGUÉM ENXERGA', title: 'Fiscal ou Ficção? "Só grandes empresas precisam de governança fiscal."', status: 'Idea', audience: 'Todos' },
  { id: 'nov-05', date: '2026-11-05', channel: 'Blog', format: 'Artigo', theme: 'OS RISCOS QUE NINGUÉM ENXERGA', title: 'Como identificar riscos antes que eles se transformem em prejuízo.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'nov-06', date: '2026-11-06', channel: 'LinkedIn', format: 'O Erro que Quase Aconteceu', theme: 'OS RISCOS QUE NINGUÉM ENXERGA', title: 'O Erro que Quase Aconteceu: Um processo preventivo evitou uma inconsistência antes da transmissão.', status: 'Idea', audience: 'Todos' },
  { id: 'nov-06-whats', date: '2026-11-06', channel: 'WhatsApp', format: 'Alerta', theme: 'OS RISCOS QUE NINGUÉM ENXERGA', title: 'Alerta da Semana: "Os maiores prejuízos começam com pequenos sinais ignorados."', status: 'Idea', audience: 'Base' },

  // Capítulo 2
  { id: 'nov-09', date: '2026-11-09', channel: 'LinkedIn', format: 'Radar Fiscal', theme: 'AUDITORIA PREVENTIVA', title: 'Radar Fiscal SAAM: As mudanças que exigem operações mais preventivas.', status: 'Idea', audience: 'Todos' },
  { id: 'nov-10', date: '2026-11-10', channel: 'Instagram', format: 'Reels', theme: 'AUDITORIA PREVENTIVA', title: 'Qual a diferença entre conferir e prevenir?', status: 'Idea', audience: 'Lead Frio' },
  { id: 'nov-11', date: '2026-11-11', channel: 'LinkedIn', format: 'Carrossel', theme: 'AUDITORIA PREVENTIVA', title: '5 etapas de uma auditoria preventiva eficiente.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'nov-12', date: '2026-11-12', channel: 'Blog', format: 'Artigo', theme: 'AUDITORIA PREVENTIVA', title: 'Inteligência Fiscal: Por que empresas maduras auditam continuamente.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'nov-13', date: '2026-11-13', channel: 'LinkedIn', format: 'Checklist', theme: 'AUDITORIA PREVENTIVA', title: 'Checklist: Como revisar sua operação antes do fechamento.', status: 'Idea', audience: 'Todos' },
  { id: 'nov-13-whats', date: '2026-11-13', channel: 'WhatsApp', format: 'Checklist', theme: 'AUDITORIA PREVENTIVA', title: 'Checklist Preventivo: "Sua empresa revisa processos antes ou depois dos problemas aparecerem?"', status: 'Idea', audience: 'Base' },

  // Capítulo 3
  { id: 'nov-16', date: '2026-11-16', channel: 'Instagram', format: 'Reels', theme: 'PREVISIBILIDADE', title: 'O que empresas previsíveis fazem diferente?', status: 'Idea', audience: 'Lead Frio' },
  { id: 'nov-17', date: '2026-11-17', channel: 'LinkedIn', format: 'Carrossel', theme: 'PREVISIBILIDADE', title: 'Os indicadores que mostram quando algo está prestes a dar errado.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'nov-18', date: '2026-11-18', channel: 'LinkedIn', format: 'Você Sabia?', theme: 'PREVISIBILIDADE', title: 'Você Sabia? Toda inconsistência deixa sinais antes de acontecer.', status: 'Idea', audience: 'Todos' },
  { id: 'nov-19', date: '2026-11-19', channel: 'Blog', format: 'Artigo', theme: 'PREVISIBILIDADE', title: 'Como construir uma operação fiscal previsível.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'nov-20', date: '2026-11-20', channel: 'YouTube', format: 'Vídeo', theme: 'PREVISIBILIDADE', title: 'Por Dentro do SAAM: Como pensamos soluções voltadas para prevenção e monitoramento contínuo.', status: 'Idea', audience: 'Cliente' },
  { id: 'nov-20-whats', date: '2026-11-20', channel: 'WhatsApp', format: 'Pergunta', theme: 'PREVISIBILIDADE', title: 'Pergunta da Semana: "Sua operação identifica riscos antes que eles virem problemas?"', status: 'Idea', audience: 'Base' },

  // Capítulo 4
  { id: 'nov-23', date: '2026-11-23', channel: 'LinkedIn', format: 'Radar Fiscal', theme: 'GOVERNANÇA', title: 'Radar Fiscal SAAM: Governança fiscal: tendência ou necessidade?', status: 'Idea', audience: 'Todos' },
  { id: 'nov-24', date: '2026-11-24', channel: 'Instagram', format: 'Reels', theme: 'GOVERNANÇA', title: 'Governança não é burocracia. É proteção para o negócio.', status: 'Idea', audience: 'Lead Frio' },
  { id: 'nov-25', date: '2026-11-25', channel: 'LinkedIn', format: 'Carrossel', theme: 'GOVERNANÇA', title: 'Os pilares de uma operação fiscal segura.', status: 'Idea', audience: 'Lead Quente' },
  { id: 'nov-26', date: '2026-11-26', channel: 'Blog', format: 'Artigo', theme: 'GOVERNANÇA', title: 'Inteligência Fiscal: Como compliance fortalece decisões estratégicas.', status: 'Idea', audience: 'Todos' },
  { id: 'nov-27', date: '2026-11-27', channel: 'YouTube', format: 'Case', theme: 'GOVERNANÇA', title: 'Caso Real: Como uma empresa evitou riscos ao revisar processos antes da entrega.', status: 'Idea', audience: 'Cliente' },
  { id: 'nov-27-whats', date: '2026-11-27', channel: 'WhatsApp', format: 'Reflexão', theme: 'GOVERNANÇA', title: 'Reflexão da Semana: "Empresas maduras não evitam apenas multas. Elas protegem decisões."', status: 'Idea', audience: 'Base' },

  // Capítulo 5
  { id: 'nov-30', date: '2026-11-30', channel: 'YouTube', format: 'Manifesto', theme: 'PREPARANDO 2027', title: 'Reels + Manifesto: A melhor forma de começar 2027 é terminar 2026 com uma operação previsível.', status: 'Idea', audience: 'Todos' }
];

let appJs = fs.readFileSync('app.js', 'utf-8');

// 1. Update window.posts
const postsMatch = appJs.match(/window\.posts\s*=\s*\[([\s\S]*?)\];/);
if (postsMatch) {
    let postsContent = postsMatch[1];
    if (postsContent.trim().length > 0) {
        postsContent += ',\n';
    }
    postsContent += novPosts.map(p => JSON.stringify(p)).join(',\n');
    appJs = appJs.replace(postsMatch[0], 'window.posts = [\n' + postsContent + '\n];');
}

// 2. Update window.seasons
const seasonsMatch = appJs.match(/window\.seasons\s*=\s*\{([\s\S]*?)\};/);
if (seasonsMatch) {
    let seasonsContent = seasonsMatch[1];
    if (seasonsContent.trim().length > 0) {
        seasonsContent += ',\n';
    }
    const novSeason = [
  "  '2026-11': {",
  "    theme: 'NOVEMBRO 2026: O FISCAL QUE ANTECIPA O FUTURO',",
  "    banner: `",
  "      <div style=\"background: linear-gradient(135deg, #3730A3 0%, #4F46E5 100%); color: #FFF; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 25px -5px rgba(79,70,229,0.3);\">",
  "        <div style=\"display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;\">",
  "          <span style=\"background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;\">",
  "            🛡️ Temporada 4 • O FISCAL QUE ANTECIPA O FUTURO",
  "          </span>",
  "          <span style=\"font-size: 11px; font-weight: 700; opacity: 0.9;\">NOVEMBRO 2026</span>",
  "        </div>",
  "        <h2 style=\"margin: 0 0 8px 0; font-size: 26px; font-weight: 800;\">A melhor auditoria é a que evita o problema antes dele existir.</h2>",
  "        <p style=\"margin: 0; font-size: 15px; opacity: 0.9; line-height: 1.5; max-width: 800px;\">",
  "          A verdadeira Inteligência Fiscal não está em corrigir erros rapidamente. Está em impedir que eles aconteçam, através de governança e gestão de riscos.",
  "        </p>",
  "      </div>",
  "    `,",
  "    weekMap: {",
  "      'OS RISCOS QUE NINGUÉM ENXERGA': { label: 'Semana 1: CONSCIÊNCIA DE RISCO', color: '#DC2626' },",
  "      'AUDITORIA PREVENTIVA': { label: 'Semana 2: PREVENÇÃO', color: '#F59E0B' },",
  "      'PREVISIBILIDADE': { label: 'Semana 3: DADOS PREDITIVOS', color: '#3B82F6' },",
  "      'GOVERNANÇA': { label: 'Semana 4: GOVERNANÇA', color: '#10B981' },",
  "      'PREPARANDO 2027': { label: 'Semana 5: PLANEJAMENTO 2027', color: '#8B5CF6' }",
  "    }",
  "  }"
].join('\\n');
    seasonsContent += novSeason;
    appJs = appJs.replace(seasonsMatch[0], 'window.seasons = {' + seasonsContent + '};');
}

fs.writeFileSync('app.js', appJs, 'utf-8');
console.log('November Calendar added to app.js');
