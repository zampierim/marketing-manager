const fs = require('fs');

// --- DADOS PARA AGOSTO ---
const postsAug = [
  // SEMANA 1
  { id: 201, date: "2026-08-03", status: "aprovado", tag: "Radar Fiscal SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Os 5 acontecimentos que mostram que o setor fiscal entrou em uma nova era. Você sabe em qual nível sua empresa está?" },
  { id: 202, date: "2026-08-04", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Você sabia que um XML perdido pode comprometer uma auditoria meses depois?" },
  { id: 203, date: "2026-08-04", status: "aprovado", tag: "Carrossel", destiny: "Redes", author: "SAAM Editorial", format: "Imagem", caption: "O Fiscal deixou de ser operacional. Como era antes vs Como está agora. Em qual nível está sua empresa?" },
  { id: 204, date: "2026-08-05", status: "agendado", tag: "Fiscal ou Ficção?", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "A Inteligência Artificial vai acabar com o departamento fiscal. Verdade ou mito?" },
  { id: 205, date: "2026-08-06", status: "rascunho", tag: "Radar Fiscal", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Resumo das notícias fiscais da semana. Fique por dentro!" },
  { id: 206, date: "2026-08-06", status: "aprovado", tag: "Inteligência Fiscal", destiny: "Blog", author: "SAAM Editorial", format: "Artigo", caption: "O Fiscal do Futuro: como a profissão está mudando com a Reforma Tributária." },
  { id: 207, date: "2026-08-07", status: "agendado", tag: "Checklist", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Mini Checklist: O que conferir na primeira semana do mês." },
  { id: 208, date: "2026-08-07", status: "publicado", tag: "Reels", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "O que o mercado ainda não percebeu sobre a Reforma Tributária." },

  // SEMANA 2
  { id: 209, date: "2026-08-10", status: "rascunho", tag: "Radar Fiscal SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Notícias da semana. Os erros deste post são típicos do Nível 1 ou 2 da maturidade fiscal." },
  { id: 210, date: "2026-08-11", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Dica prática: Conferência manual de XML gera passivo invisível." },
  { id: 211, date: "2026-08-11", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "O XML estava correto. O problema era outro. Storytelling de como o problema nasce na operação." },
  { id: 212, date: "2026-08-12", status: "analise", tag: "Fiscal ou Ficção?", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Meu ERP já resolve tudo." },
  { id: 213, date: "2026-08-13", status: "rascunho", tag: "Live", destiny: "YouTube", author: "SAAM Editorial", format: "Live", caption: "Os maiores erros que ainda vemos no mercado." },
  { id: 214, date: "2026-08-13", status: "rascunho", tag: "Radar Fiscal", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Resumo das notícias da semana." },
  { id: 215, date: "2026-08-13", status: "analise", tag: "Inteligência Fiscal", destiny: "Blog", author: "SAAM Editorial", format: "Artigo", caption: "Os custos invisíveis dos processos fiscais manuais." },
  { id: 216, date: "2026-08-14", status: "rascunho", tag: "Checklist", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Mini Checklist: SPED." },
  { id: 217, date: "2026-08-14", status: "rascunho", tag: "Reels", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Por que empresas ainda conferem documentos manualmente?" },

  // SEMANA 3
  { id: 218, date: "2026-08-17", status: "rascunho", tag: "Radar Fiscal SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Tecnologias que estão mudando o setor. Veja como empresas Nível 3 trabalham." },
  { id: 219, date: "2026-08-18", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Dica prática: Integrar sistemas evita 80% das multas." },
  { id: 220, date: "2026-08-18", status: "rascunho", tag: "Carrossel", destiny: "Redes", author: "SAAM Editorial", format: "Imagem", caption: "Empresas Nível 1 x Empresas Nível 4. Comparação de operação, dados e automação." },
  { id: 221, date: "2026-08-19", status: "rascunho", tag: "Você Sabia?", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Auditar antes da transmissão reduz retrabalho." },
  { id: 222, date: "2026-08-20", status: "rascunho", tag: "Radar Fiscal", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Resumo das notícias da semana." },
  { id: 223, date: "2026-08-20", status: "rascunho", tag: "Inteligência Fiscal", destiny: "Blog", author: "SAAM Editorial", format: "Artigo", caption: "ERP, Auditoria e APIs: por que essas tecnologias precisam trabalhar juntas." },
  { id: 224, date: "2026-08-21", status: "rascunho", tag: "Checklist", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Mini Checklist: Reforma." },
  { id: 225, date: "2026-08-21", status: "rascunho", tag: "Por Dentro do SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Como uma API elimina horas de trabalho." },

  // SEMANA 4
  { id: 226, date: "2026-08-24", status: "rascunho", tag: "Radar Fiscal SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Manifesto: Por que a SAAM fala tanto sobre Inteligência Fiscal. Qual é o seu plano para alcançar o Nível 4?" },
  { id: 227, date: "2026-08-25", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Dica prática: Planejamento é a chave da Inteligência Fiscal." },
  { id: 228, date: "2026-08-25", status: "rascunho", tag: "Por Dentro do SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Bastidores: Como nasce uma nova rotina." },
  { id: 229, date: "2026-08-26", status: "rascunho", tag: "Case", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Cliente: Como um cliente saiu do Nível 1 para o Nível 3." },
  { id: 230, date: "2026-08-27", status: "rascunho", tag: "Live", destiny: "YouTube", author: "SAAM Editorial", format: "Live", caption: "Como será o departamento fiscal nos próximos cinco anos." },
  { id: 231, date: "2026-08-27", status: "rascunho", tag: "Radar Fiscal", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Resumo das notícias da semana." },
  { id: 232, date: "2026-08-27", status: "rascunho", tag: "Inteligência Fiscal", destiny: "Blog", author: "SAAM Editorial", format: "Artigo", caption: "Como medir a maturidade fiscal da sua empresa." },
  { id: 233, date: "2026-08-28", status: "rascunho", tag: "Checklist", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Mini Checklist: Auditoria." },
  { id: 234, date: "2026-08-28", status: "rascunho", tag: "Por Dentro do SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Manifesto Final: O Futuro do Fiscal Já Começou." }
];

// --- DADOS PARA SETEMBRO ---
const postsSep = [
  // SEMANA 1: DIAGNÓSTICO
  { id: 301, date: "2026-09-01", status: "rascunho", tag: "Radar Fiscal SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Como a última atualização da Receita impacta a maturidade fiscal do seu setor? O que define um departamento maduro?" },
  { id: 302, date: "2026-09-01", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Dica: Operação estagnada não é percebida até a primeira autuação chegar. Avalie seus processos." },
  { id: 303, date: "2026-09-02", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Ficção: Empresas maduras não precisam revisar XML. A verdade: elas automatizam a revisão antes da recepção." },
  { id: 304, date: "2026-09-03", status: "rascunho", tag: "Radar Fiscal", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Notícias e reflexões da semana. Qual o maior gargalo invisível hoje?" },
  { id: 305, date: "2026-09-03", status: "rascunho", tag: "Inteligência Fiscal", destiny: "Blog", author: "SAAM Editorial", format: "Artigo", caption: "Cultura orientada por dados: Os sinais de uma operação estagnada e como sair dela." },
  { id: 306, date: "2026-09-04", status: "rascunho", tag: "Por Dentro do SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Bastidores: Como desenvolvemos o nosso Checklist de Maturidade Fiscal com feedbacks dos clientes." },
  { id: 307, date: "2026-09-04", status: "rascunho", tag: "Checklist", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Mini Checklist de Maturidade: Quais ferramentas você tem na sua operação hoje?" },
  
  // SEMANA 2: PROCESSOS
  { id: 308, date: "2026-09-08", status: "rascunho", tag: "Radar Fiscal SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Maturidade nasce da padronização. Analisamos 3 fluxos fiscais eficientes do mercado." },
  { id: 309, date: "2026-09-08", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Falta de padronização na entrada de notas custou R$50k num processo. Nível 2 evitaria isso." },
  { id: 310, date: "2026-09-09", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Ficção: O ERP mede a produtividade do time fiscal. A verdade sobre integrações de auditoria." },
  { id: 311, date: "2026-09-10", status: "rascunho", tag: "Radar Fiscal", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Notícias sobre prazos do SPED e como a padronização salva o fechamento." },
  { id: 312, date: "2026-09-10", status: "rascunho", tag: "Inteligência Fiscal", destiny: "Blog", author: "SAAM Editorial", format: "Artigo", caption: "Processos Inteligentes: Como dominar XML, SPED, ERP e APIs numa única esteira." },
  { id: 313, date: "2026-09-11", status: "rascunho", tag: "Por Dentro do SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Como priorizamos o desenvolvimento de uma nova integração para processos complexos." },
  { id: 314, date: "2026-09-11", status: "rascunho", tag: "Checklist", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Checklist de Padronização: 3 regras de ouro." },

  // SEMANA 3: PERFORMANCE
  { id: 315, date: "2026-09-15", status: "rascunho", tag: "Radar Fiscal SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "Existe um jeito muito melhor de operar. Como as empresas Nível 4 acompanham KPIs." },
  { id: 316, date: "2026-09-15", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Ignorar o tempo de retrabalho na apuração. Nível 3 foca em automação para ganhar 40h/mês." },
  { id: 317, date: "2026-09-16", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Ficção: KPI fiscal serve apenas para grandes empresas. Realidade: quem não mede, não gerencia." },
  { id: 318, date: "2026-09-17", status: "rascunho", tag: "Radar Fiscal", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Notícias da semana: produtividade em pauta." },
  { id: 319, date: "2026-09-17", status: "rascunho", tag: "Inteligência Fiscal", destiny: "Blog", author: "SAAM Editorial", format: "Artigo", caption: "O poder dos KPIs fiscais: Como medir a verdadeira produtividade da equipe." },
  { id: 320, date: "2026-09-18", status: "rascunho", tag: "Por Dentro do SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Como ouvimos os clientes para montar o nosso Dashboard de Performance Fiscal." },
  { id: 321, date: "2026-09-18", status: "rascunho", tag: "Checklist", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "5 KPIs fiscais essenciais para monitorar hoje." },

  // SEMANA 4: LIDERANÇA
  { id: 322, date: "2026-09-22", status: "rascunho", tag: "Radar Fiscal SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Vídeo", caption: "O novo gestor fiscal não fala de guias, fala de estratégia. Como levar dados para a diretoria?" },
  { id: 323, date: "2026-09-22", status: "rascunho", tag: "O Erro que Custou Caro", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "O fiscal não participar das decisões de expansão da empresa. Nível 4 antecipa riscos no M&A." },
  { id: 324, date: "2026-09-23", status: "rascunho", tag: "Fiscal ou Ficção?", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Ficção: Automatizar significa perder o controle da operação. Realidade: IA traz clareza e governança." },
  { id: 325, date: "2026-09-24", status: "rascunho", tag: "Live", destiny: "YouTube", author: "SAAM Editorial", format: "Live", caption: "Inteligência Fiscal na Prática: O Futuro da Liderança Fiscal." },
  { id: 326, date: "2026-09-24", status: "rascunho", tag: "Radar Fiscal", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Resumo da nossa live sobre o futuro do setor e estratégia de IA." },
  { id: 327, date: "2026-09-24", status: "rascunho", tag: "Inteligência Fiscal", destiny: "Blog", author: "SAAM Editorial", format: "Artigo", caption: "Liderança e Governança: Como o gestor fiscal Nível 4 planeja o ano de 2027." },
  { id: 328, date: "2026-09-25", status: "rascunho", tag: "Checklist", destiny: "WhatsApp", author: "SAAM Editorial", format: "Texto", caption: "Checklist final de setembro: Avalie a maturidade do seu time." },
  { id: 329, date: "2026-09-25", status: "rascunho", tag: "Por Dentro do SAAM", destiny: "Redes", author: "SAAM Editorial", format: "Texto", caption: "Manifesto: O caminho está traçado. Descubra o seu próximo nível." }
];

const allPosts = [...postsAug, ...postsSep];

let appjs = fs.readFileSync('app.js', 'utf-8');

// Replace posts array
appjs = appjs.replace(/let posts = \[[\s\S]*?\];/, 'let posts = ' + JSON.stringify(allPosts, null, 2) + ';');

// Add renderSeasonBanner function
const seasonBannerLogic = `
function renderSeasonBanner() {
  const bannerContainer = document.getElementById("season-banner");
  if(!bannerContainer) return;

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  if (month === 7 && year === 2026) {
    // AGOSTO
    bannerContainer.innerHTML = \`
      <div class="page-header" style="flex-direction: column; align-items: flex-start; background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); padding: 32px; border-radius: 16px; color: white; margin-bottom: 24px; position: relative; overflow: hidden; box-shadow: 0 10px 25px rgba(30,27,75,0.2); transition: all 0.3s ease;">
        <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: -20px; right: 100px; width: 100px; height: 100px; background: rgba(99,102,241,0.2); border-radius: 50%; filter: blur(20px);"></div>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; margin-bottom: 16px; display: inline-block; border: 1px solid rgba(255,255,255,0.1);">AGOSTO 2026</span>
        <h2 style="font-size: 32px; margin: 0 0 12px 0; color: white; letter-spacing: -0.5px;">O Futuro do Fiscal Já Começou</h2>
        <p style="margin: 0; color: #C7D2FE; font-size: 16px; max-width: 700px; line-height: 1.5;">Em agosto, a SAAM não venderá software. Venderá uma nova forma de pensar o departamento fiscal usando o <strong>Índice de Maturidade Fiscal</strong> como fio condutor.</p>
      </div>
    \`;
  } else if (month === 8 && year === 2026) {
    // SETEMBRO
    bannerContainer.innerHTML = \`
      <div class="page-header" style="flex-direction: column; align-items: flex-start; background: linear-gradient(135deg, #064E3B 0%, #047857 100%); padding: 32px; border-radius: 16px; color: white; margin-bottom: 24px; position: relative; overflow: hidden; box-shadow: 0 10px 25px rgba(6,78,59,0.2); transition: all 0.3s ease;">
        <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: -20px; right: 100px; width: 100px; height: 100px; background: rgba(16,185,129,0.2); border-radius: 50%; filter: blur(20px);"></div>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; margin-bottom: 16px; display: inline-block; border: 1px solid rgba(255,255,255,0.1);">SETEMBRO 2026</span>
        <h2 style="font-size: 32px; margin: 0 0 12px 0; color: white; letter-spacing: -0.5px;">A Nova Era da Maturidade Fiscal</h2>
        <p style="margin: 0; color: #A7F3D0; font-size: 16px; max-width: 700px; line-height: 1.5;">As empresas não serão separadas pelo faturamento, mas pela maturidade dos seus processos. Como subir cada degrau na <strong>Escada da Maturidade Fiscal</strong>.</p>
      </div>
    \`;
  } else {
    // PADRÃO
    bannerContainer.innerHTML = \`
      <div class="page-header" style="background: #FFF; padding: 24px; border-radius: 12px; border: 1px solid #E2E8F0; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <div>
          <h2 style="font-size: 24px; margin: 0 0 4px 0; color: #0F172A;">Calendário Editorial</h2>
          <p style="margin: 0; color: #64748B; font-size: 14px;">Planejamento mensal de publicações.</p>
        </div>
      </div>
    \`;
  }
}
`;

if(!appjs.includes("function renderSeasonBanner")) {
  appjs += "\n\n" + seasonBannerLogic;
}

// Ensure renderSeasonBanner is called in renderCalendar
if(!appjs.includes("renderSeasonBanner();")) {
  appjs = appjs.replace(/function renderCalendar\(\) \{/, "function renderCalendar() {\n  if(typeof renderSeasonBanner === 'function') renderSeasonBanner();");
}

// --- Replace createPostCard and renderList ---
const createPostCardReplacement = `function createPostCard(post) {
  const card = document.createElement("div");
  card.className = "post-card";
  
  const imgUrl = post.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80";

  let iconSvg = '';
  if(post.destiny === 'WhatsApp') {
    iconSvg = \`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>\`;
  } else if(post.destiny === 'YouTube') {
    iconSvg = \`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>\`;
  } else if(post.destiny === 'Blog') {
    iconSvg = \`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>\`;
  } else { 
    iconSvg = \`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>\`;
  }

  card.innerHTML = \`
    <div class="post-card-image">
      <img src="\${imgUrl}" alt="\${post.tag}">
      <div class="status-dot status-\${post.status}" title="Clique para avançar status" data-post-id="\${post.id}"></div>
      <div class="post-card-info" style="display: flex; align-items: center;">
        <span class="post-tag" style="display: flex; align-items: center;">\${iconSvg}\${post.tag}</span>
      </div>
    </div>
  \`;
  
  const dot = card.querySelector(".status-dot");
  dot.addEventListener("click", (e) => {
    e.stopPropagation();
    let idx = statusCycle.indexOf(post.status);
    let nextStatus = statusCycle[(idx + 1) % statusCycle.length];
    post.status = nextStatus;
    renderCalendar();
    renderList();
  });
  
  return card;
}`;

const renderListReplacement = `function renderList() {
  postListEl.innerHTML = "";
  
  let currentPosts = getFilteredPosts();
  // Filter list by the currently viewed month!
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  currentPosts = currentPosts.filter(p => {
    const d = new Date(p.date + "T00:00:00");
    return d.getMonth() === month && d.getFullYear() === year;
  });
  
  const sortedPosts = currentPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  if (sortedPosts.length === 0) {
    postListEl.innerHTML = "<p class='placeholder-text'>Nenhum criativo cadastrado para este mês.</p>";
    return;
  }
  
  let currentWeekGroup = "";
  
  function getWeekName(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    const m = d.getMonth();
    const y = d.getFullYear();
    const day = d.getDate();
    
    if(m === 7 && y === 2026) { // AGOSTO
      if(day >= 1 && day <= 9) return "Semana 1: O MUNDO MUDOU";
      if(day >= 10 && day <= 16) return "Semana 2: O PROBLEMA";
      if(day >= 17 && day <= 23) return "Semana 3: EXISTE UM NOVO JEITO";
      if(day >= 24 && day <= 31) return "Semana 4: COMO A SAAM PENSA";
    }
    if(m === 8 && y === 2026) { // SETEMBRO
      if(day >= 1 && day <= 6) return "Semana 1: DIAGNÓSTICO";
      if(day >= 7 && day <= 13) return "Semana 2: PROCESSOS";
      if(day >= 14 && day <= 20) return "Semana 3: PERFORMANCE";
      if(day >= 21 && day <= 30) return "Semana 4: LIDERANÇA";
    }
    return "Outros";
  }
  
  sortedPosts.forEach(post => {
    const d = new Date(post.date + "T00:00:00");
    
    const weekGroup = getWeekName(post.date);
    if (weekGroup !== currentWeekGroup) {
      currentWeekGroup = weekGroup;
      
      const themeColor = d.getMonth() === 8 ? "#059669" : "#6366F1";
      
      const header = document.createElement("div");
      header.className = "list-month-header";
      header.style = \`background: #F8FAFC; color: #1E293B; padding: 12px 16px; margin: 24px 0 12px 0; border-radius: 8px; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; border-left: 4px solid \${themeColor}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);\`;
      header.innerHTML = \`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="\${themeColor}" stroke-width="2.5" style="margin-right: 8px;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> \${currentWeekGroup}\`;
      postListEl.appendChild(header);
    }
    
    const imgUrl = post.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80";
    const dayStr = String(d.getDate()).padStart(2,"0");
    const weekDay = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][d.getDay()];

    let iconSvg = '';
    if(post.destiny === 'WhatsApp') {
      iconSvg = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>\`;
    } else if(post.destiny === 'YouTube') {
      iconSvg = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>\`;
    } else if(post.destiny === 'Blog') {
      iconSvg = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>\`;
    } else { 
      iconSvg = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>\`;
    }

    const item = document.createElement("div");
    item.className = "list-item";
    item.innerHTML = \`
      <div class="list-date-block">
        <span class="day">\${dayStr}</span>
        <span class="weekday">\${weekDay}</span>
      </div>
      <img src="\${imgUrl}" class="list-item-thumb">
      <div class="list-item-content">
        <h4 class="list-item-title" style="display: flex; align-items: center;">\${iconSvg}\${post.tag}</h4>
        <p class="list-item-caption">\${post.caption || "Sem legenda..."}</p>
      </div>
      <div class="list-item-actions">
        <select class="list-status-select status-\${post.status}">
          <option value="rascunho" \${post.status==='rascunho'?'selected':''}>Rascunho</option>
          <option value="analise" \${post.status==='analise'?'selected':''}>Em Análise</option>
          <option value="aprovado" \${post.status==='aprovado'?'selected':''}>Aprovado</option>
          <option value="agendado" \${post.status==='agendado'?'selected':''}>Agendado</option>
          <option value="publicado" \${post.status==='publicado'?'selected':''}>Publicado</option>
        </select>
      </div>
    \`;
    
    const selectBox = item.querySelector(".list-status-select");
    selectBox.addEventListener("click", (e) => e.stopPropagation());
    selectBox.addEventListener("change", (e) => {
      post.status = e.target.value;
      selectBox.className = \`list-status-select status-\${e.target.value}\`;
      renderCalendar();
    });

    item.addEventListener("click", () => openModal(post));
    postListEl.appendChild(item);
  });
}`;

appjs = appjs.replace(/function createPostCard\(post\) \{[\s\S]*?return card;\n\}/, createPostCardReplacement);
appjs = appjs.replace(/function renderList\(\) \{[\s\S]*?\}\n\nprevMonthBtn/, renderListReplacement + '\n\nprevMonthBtn');

fs.writeFileSync('app.js', appjs, 'utf-8');
console.log("Calendar seasons updated successfully.");
