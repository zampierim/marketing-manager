const fs = require('fs');

// --- 1. MODIFY INDEX.HTML ---
let html = fs.readFileSync('index.html', 'utf8');

// We will insert the <div id="ideas-campaign-playbook"> container right before the ending </div> of view-ideias-mes.
const targetEnding = `</div>
      </div>
      
      <!-- VIEW: BANCO GERAL -->`;

const replacementEnding = `<!-- Guia Editorial do Mês Centralizado -->
        <div id="ideas-campaign-playbook" style="margin-top: 24px;">
          <!-- Renderizado dinamicamente via JS -->
        </div>
      </div>
      </div>
      
      <!-- VIEW: BANCO GERAL -->`;

if (html.includes(targetEnding)) {
  html = html.replace(targetEnding, replacementEnding);
  console.log("index.html updated with ideas-campaign-playbook container.");
} else {
  // CRLF check
  const targetEndingCRLF = targetEnding.replace(/\n/g, '\r\n');
  const replacementEndingCRLF = replacementEnding.replace(/\n/g, '\r\n');
  if (html.includes(targetEndingCRLF)) {
    html = html.replace(targetEndingCRLF, replacementEndingCRLF);
    console.log("index.html updated with ideas-campaign-playbook container (CRLF).");
  } else {
    console.error("Could not find the end of view-ideias-mes block in index.html!");
    process.exit(1);
  }
}

fs.writeFileSync('index.html', html, 'utf8');

// --- 2. MODIFY APP.JS ---
let code = fs.readFileSync('app.js', 'utf8');

// Let's add the monthly campaign playbooks dataset to monthlyStrategyProfiles.
// We will modify the monthlyStrategyProfiles definitions in app.js.
// We'll write a patcher script to replace the monthlyStrategyProfiles object in app.js with the complete guides.

const oldProfilesDeclaration = `const monthlyStrategyProfiles = {`;
const oldProfilesEndMarker = `window.renderIdeasStrategy = function() {`;

const startIdx = code.indexOf(oldProfilesDeclaration);
const endIdx = code.indexOf(oldProfilesEndMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find monthlyStrategyProfiles in app.js!");
  process.exit(1);
}

const detailedProfilesCode = `const monthlyStrategyProfiles = {
  7: { // August
    name: "Agosto 2026",
    theme: "O Futuro do Fiscal Já Começou",
    opportunity: "Provocar o mercado a entender que o fiscal mudou: de emissor de guias para setor estratégico e de inteligência. Toda publicação deve reforçar o 'Índice de Maturidade Fiscal' e instigar o público a questionar o próprio nível de maturidade.",
    proportions: { educacional: 40, conversao: 30, retencao: 20, institucional: 10 },
    labels: { educacional: "Maturidade (Atração)", conversao: "Autoridade (Venda)", retencao: "Adoção (Clientes)", institucional: "Manifesto (Branding)" },
    motivos: {
      educacional: "Atrair novos leads (público frio) e criar demanda. Mostrar que a contabilidade tradicional ficou no passado.",
      conversao: "Convencer o lead quente de que a SAAM tem o método definitivo para alcançar o nível estratégico.",
      retencao: "Fazer o cliente usar o sistema no máximo. Divulgar checklists de fechamento e alertas de impostos.",
      institucional: "Celebrar o Dia do Contador e humanizar o time. Fortalecer a comunidade de pioneiros fiscais."
    },
    exemplos: {
      educacional: "Explique a diferença entre faturar muito e tener maturidade fiscal. Detalhe como a falta de processos organizados gera retrabalho oculto nas equipes.",
      conversao: "Apresente o Diagnóstico de Maturidade Fiscal e faça um convite claro: 'Descubra grátis se o seu departamento fiscal está no nível Reativo ou Estratégico'.",
      retencao: "Passo a passo rápido: 'Como usar a Auditoria de Entradas do SAAM para fechar o SPED de forma limpa'. Indique a rotina 1.1.2 do sistema.",
      institucional: "Mostre o time de suporte da SAAM em ação e reforce: 'Por trás de toda grande automação, existe uma equipe dedicada a garantir a sua tranquilidade'."
    },
    playbook: {
      objetivo: "Explicar o Índice de Maturidade Fiscal e provar que o fiscal moderno não é burocrático, mas estratégico.",
      percepcao: "A audiência deve sentir que continuar gerindo o fiscal de forma reativa e manual é um risco insustentável.",
      propriedade: "Índice de Maturidade Fiscal (IMF) SAAM",
      jornada: [
        { semana: "Semana 1", titulo: "O Diagnóstico", foco: "Provocar o público com o teste de nível fiscal da empresa (Reativo, Preventivo ou Estratégico)." },
        { semana: "Semana 2", titulo: "Os Gargalos Ocultos", foco: "Expor as maiores dores das equipes (XMLs perdidos, digitação manual, falta de relatórios)." },
        { semana: "Semana 3", titulo: "Automação Preventiva", foco: "Demonstrar como a plataforma SAAM atua de forma preventiva antes da transmissão oficial." },
        { semana: "Semana 4", titulo: "Maturidade na Prática", foco: "Exemplos reais de ROI e tempo economizado com a automação." }
      ],
      series: [
        { nome: "Radar Fiscal", objetivo: "Alertas legislativos rápidos e atualizações do SPED." },
        { nome: "Erro que custa caro", objetivo: "Mostrar erros comuns de preenchimento e suas respectivas multas." },
        { nome: "Fiscal ou Ficção?", objetivo: "Mitos e verdades do universo tributário brasileiro." }
      ]
    }
  },
  8: { // September
    name: "Setembro 2026",
    theme: "A Nova Era da Maturidade Fiscal",
    opportunity: "Oportunidade de transição: Ensinar o público a subir os degraus de maturidade usando o 'Diagnóstico'. Foco em segmentar o público por suas dores específicas em cada nível da jornada.",
    proportions: { educacional: 40, conversao: 30, retencao: 20, institucional: 10 },
    labels: { educacional: "Diagnóstico (Atração)", conversao: "Processos (Venda)", retencao: "Sucesso (Clientes)", institucional: "Cultura (Branding)" },
    motivos: {
      educacional: "Apresentar a Escada da Maturidade Fiscal e incentivar as empresas a avaliarem sua operação.",
      conversao: "Mostrar o impacto financeiro da maturidade no caixa. Foco em otimização de processos fiscais.",
      retencao: "Tutoriais da Base de Rotinas. Facilitar a vida do cliente mostrando atalhos e automações de cruzamentos.",
      institucional: "Divulgar bastidores da equipe de tecnologia do SAAM. Conexão humana de alto nível."
    },
    exemplos: {
      educacional: "Explique o impacto prático de um cadastro de produtos desorganizado no cálculo de impostos de fornecedores. Mostre o conceito de higienização de base.",
      conversao: "Mostre a facilidade da parametrização automática do SAAM frente aos sistemas tradicionais: 'Reduza a parametrização de dias para minutos'.",
      retencao: "Vídeo rápido ensinando o cliente a configurar a captura automática de XMLs de Notas de Serviço (NFS-e) na plataforma.",
      institucional: "Compartilhe fotos do último treinamento da equipe de desenvolvimento do SAAM com a legenda: 'Evoluindo a inteligência da plataforma para simplificar sua rotina'."
    },
    playbook: {
      objetivo: "Subir degraus na Escada de Maturidade Fiscal. Foco operacional em parametrização e higienização de cadastros.",
      percepcao: "A audiência deve entender que para sair do reativo, é obrigatório higienizar a base e parametrizar regras.",
      propriedade: "A Escada da Maturidade Fiscal",
      jornada: [
        { semana: "Semana 1", titulo: "Módulo Higienização", foco: "Como corrigir cadastros de fornecedores e produtos para evitar impostos a maior." },
        { semana: "Semana 2", titulo: "Módulo Parametrização", foco: "Mostrar como configurar regras fiscais complexas de ICMS e IPI de forma automática." },
        { semana: "Semana 3", titulo: "Auditoria Preventiva", foco: "Automação de cruzamentos entre notas fiscais recebidas e emitidas." },
        { semana: "Semana 4", titulo: "Dashboard de Controle", foco: "Como o CFO usa o painel SAAM para monitorar riscos fiscais em tempo real." }
      ],
      series: [
        { nome: "Método SAAM", objetivo: "Tutoriais explicativos de como usar as ferramentas nativas." },
        { nome: "Radar Fiscal", objetivo: "Alertas rápidos sobre novas portarias e prazos estaduais." }
      ]
    }
  },
  9: { // October
    name: "Outubro 2026",
    theme: "A Inteligência que Gera Resultados",
    opportunity: "Combater a percepção de burocracia. O fiscal não é custo, é gerador de performance e valor corporativo. Mostrar números expressivos de tempo economizado por equipes que usam SAAM.",
    proportions: { educacional: 40, conversao: 30, retencao: 20, institucional: 10 },
    labels: { educacional: "Performance & KPIs", conversao: "Geração de Valor", retencao: "Base & Rotinas", institucional: "Cultura & Sucesso" },
    motivos: {
      educacional: "Educar sobre indicadores fiscais e metas de performance que diferenciam operações comuns de operações de excelência.",
      conversao: "Compartilhar cases de sucesso e ROI prático. Provar a redução de horas manuais em conferências.",
      retencao: "Dicas semanais para otimizar as conferências mensais. Adoção profunda das rotinas de parametrização.",
      institucional: "Mostrar a cultura de excelência da SAAM, prêmios, novidades corporativas e eventos do setor."
    },
    exemplos: {
      educacional: "Explique como a Reforma Tributária mudará a exigência de dados em tempo real (Split Payment). O cadastro de produtos se tornará o dado mais valioso.",
      conversao: "Estudo de Caso real: 'Como a Indústria X automatizou a validação de XMLs e economizou R$ 45.000 em multas evitadas no primeiro mês'.",
      retencao: "Guia prático para os usuários do sistema: 'Configurando alertas automáticos de inconsistência no seu dashboard do SAAM'.",
      institucional: "Depoimento do Diretor de Operações sobre a conquista de conformidade da marca em eventos do setor fiscal."
    },
    playbook: {
      objetivo: "Provar que maturidade fiscal gera retorno sobre o investimento (ROI) e performance operacional.",
      percepcao: "O fiscal deve ser visto como uma área de inteligência de negócios estratégica, não um centro de custos passivo.",
      propriedade: "Indicadores de Performance Fiscal (IPF)",
      jornada: [
        { semana: "Semana 1", titulo: "Auditoria em 30 segundos", foco: "Demonstrar a velocidade de conferência do SAAM versus o método manual tradicional." },
        { semana: "Semana 2", titulo: "ROI do Tempo", foco: "Mostrar como o SAAM economiza até 80 horas de trabalho manual das equipes." },
        { semana: "Semana 3", titulo: "Casos de Sucesso", foco: "Publicar depoimentos e cases reais de clientes que eliminaram retrabalho." },
        { semana: "Semana 4", titulo: "Valor de Negócio", foco: "Como os dados fiscais ajudam o CEO e o Diretor a tomarem decisões de expansão." }
      ],
      series: [
        { nome: "Cases SAAM", objetivo: "Depoimentos de contadores e CFOs sobre o uso da plataforma." },
        { nome: "Radar Fiscal", objetivo: "Atualizações de Split Payment e Reforma Tributária." }
      ]
    }
  },
  10: { // November
    name: "Novembro 2026",
    theme: "O Fiscal que Antecipa o Futuro",
    opportunity: "Mudar a conversa para prevenção e governança. Mostrar que empresas maduras evitam o incêndio antes dele acontecer.",
    proportions: { educacional: 40, conversao: 30, retencao: 20, institucional: 10 },
    labels: { educacional: "Prevenção (Riscos)", conversao: "Governança (Venda)", retencao: "Sucesso (Clientes)", institucional: "Branding (Cultura)" },
    motivos: {
      educacional: "Conscientizar sobre os maiores erros fiscais ocultos que geram multas pesadas. Ensinar a prever e auditar antes do envio.",
      conversao: "Apresentar a Matriz de Previsibilidade Fiscal e o Método P.R.E.V.E.R. como diferenciais inigualáveis do SAAM.",
      retencao: "Foco total na auditoria preventiva interna e parametrizações complexas para fechamentos trimestrais sem sustos.",
      institucional: "Campanhas institucionais e depoimentos de grandes contadores sobre o alívio de operar com segurança."
    },
    exemplos: {
      educacional: "Quais são as divergências invisíveis entre SPED e ECF que acionam o radar da Receita? Explique o cruzamento preventivo.",
      conversao: "Demonstre como o SAAM simula a fiscalização da Receita Federal na base do cliente antes da transmissão oficial dos dados.",
      retencao: "Checklist trimestral de validação de alíquotas de impostos retidos na fonte utilizando a rotina de cruzamentos do sistema.",
      institucional: "Post humanizado: 'Profissional fiscal, você merece ir para casa no horário normal. Deixe as validações repetitivas com o SAAM'."
    },
    playbook: {
      objetivo: "Posicionar o SAAM como a camada preventiva que evita multas fiscais antes da transmissão dos dados.",
      percepcao: "A audiência deve sentir a tranquilidade de operar com previsibilidade, eliminando o estresse dos fechamentos.",
      propriedade: "Método P.R.E.V.E.R. & Matriz de Previsibilidade",
      jornada: [
        { semana: "Semana 1", titulo: "Identificação do Risco", foco: "Quais inconsistências a Receita Federal encontra primeiro por cruzamento de robôs." },
        { semana: "Semana 2", titulo: "Prevenção de Multas", foco: "Demonstrar a simulação preventiva de malha fiscal do SAAM na base operacional." },
        { semana: "Semana 3", titulo: "Previsibilidade de Caixa", foco: "Como impostos retidos incorretamente afetam o fluxo financeiro da empresa." },
        { semana: "Semana 4", titulo: "Governança de Dados", foco: "O papel do compliance e da segurança da informação na transmissão de obrigações." }
      ],
      series: [
        { nome: "Método PREVER", objetivo: "Explicar os 6 pilares de validação do IVS." },
        { nome: "Radar Fiscal", objetivo: "Resumos legislativos semanais e orientações preventivas." }
      ]
    }
  },
  11: { // December
    name: "Dezembro 2026",
    theme: "O Ano em que o Fiscal Decide o Futuro",
    opportunity: "Planejamento e Virada. Oportunidade perfeita de apelo emocional e pragmático: o encerramento de um ciclo e a preparação para o próximo ano fiscal (Reforma Tributária 2027). A SAAM ajuda a fechar o ano em paz.",
    proportions: { educacional: 30, conversao: 40, retencao: 20, institucional: 10 },
    labels: { educacional: "Retrospectiva 2026", conversao: "Plano 2027 (Venda)", retencao: "Agradecimento (Base)", institucional: "Virada (Branding)" },
    motivos: {
      educacional: "Fazer uma retrospectiva das principais mudanças de 2026. Analisar o que mudou na maturidade fiscal nacional.",
      conversao: "Lançamento do Plano Fiscal 2027 da SAAM. Incentivar fechamento de contratos para iniciar o ano novo com segurança.",
      retencao: "Agradecer a base de clientes ativos pela parceria. Tutoriais de encerramento de exercício fiscal.",
      institucional: "Mensagens humanas de boas festas, retrospectiva interna da equipe SAAM e votos de um 2027 de paz e controle."
    },
    exemplos: {
      educacional: "As principais mudanças na legislação fiscal que entram em vigor dia 1º de Janeiro. Como se antecipar para não começar o ano com erros.",
      conversao: "Campanha 'Virada Fiscal SAAM': 'Contrate a inteligência fiscal da SAAM agora e não pague mensalidade até o encerramento do inventário'.",
      retencao: "Instruções passo a passo sobre como realizar a exportação anual de dados históricos e inventário no encerramento de ciclo do SAAM.",
      institucional: "Vídeo comemorativo de agradecimento de toda a equipe SAAM: 'Obrigado por nos escolher para cuidar da inteligência fiscal da sua empresa'."
    },
    playbook: {
      objetivo: "Estimular o planejamento do ano novo fiscal e a contratação do SAAM para iniciar 2027 com governança.",
      percepcao: "Começar o ano fiscal sem um sistema de validação automática é assumir um risco perigoso na Reforma Tributária.",
      propriedade: "Plano Fiscal 2027 SAAM",
      jornada: [
        { semana: "Semana 1", titulo: "Retrospectiva Fiscal", foco: "Os principais fatos tributários de 2026 e o que aprendemos sobre maturidade." },
        { semana: "Semana 2", titulo: "Planejamento 2027", foco: "Como estruturar o orçamento e os sistemas para as regras da reforma." },
        { semana: "Semana 3", titulo: "Inventário de Estoques", foco: "A importância de conferir o inventário no SPED antes da virada do ano." },
        { semana: "Semana 4", titulo: "Virada de Ciclo", foco: "Mensagem de agradecimento aos contadores e votos de um ano novo com total controle." }
      ],
      series: [
        { nome: "Plano 2027", objetivo: "Direcionamentos práticos de transição de regimes tributários." },
        { nome: "Radar Fiscal", objetivo: "Plantão de dúvidas sobre as novas regras que passam a valer em Janeiro." }
      ]
    }
  }
};
`;

code = code.substring(0, startIdx) + detailedProfilesCode + code.substring(endIdx);

// --- 3. MODIFY RENDERIDEASSTRATEGY TO RENDER THE PLAYBOOK DYNAMICALLY ---
// We will replace renderIdeasStrategy in app.js to write the dynamic Guia Editorial playbook to the DOM.
// Let's locate the renderIdeasStrategy function start.

const oldRenderFuncStart = `window.renderIdeasStrategy = function() {`;

// Let's search app.js from the oldRenderFuncStart to the end of the file.
// We can find where the renderIdeasStrategy ends by searching for the closing brace before the end of the file, or just replace it.
// Let's see: we viewed renderIdeasStrategy in the previous step (lines 9203-9271).
// Let's replace the entire renderIdeasStrategy function in app.js!

const oldRenderIdeasStrategyCode = `window.renderIdeasStrategy = function() {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  let strat = monthlyStrategyProfiles[month];
  if (year !== 2026 || !strat) {
    strat = {
      name: \`\${monthNames[month]} \${year}\`,
      theme: "Planejamento Editorial Dinâmico",
      opportunity: "Oportunidade Geral: Produzir conteúdo relevante alinhado às necessidades do setor fiscal, focando em segurança, agilidade e inteligência nas rotinas diárias.",
      proportions: { educacional: 40, conversao: 30, retencao: 20, institucional: 10 },
      labels: { educacional: "Educacional (Atração)", conversao: "Vendas (Conversão)", retencao: "Sucesso (Retenção)", institucional: "Branding (Institucional)" },
      motivos: {
        educacional: "Atrair novos leads (público frio) e criar demanda mostrando novas possibilidades.",
        conversao: "Convencer o lead quente de que o SAAM é o software ideal para sua operação.",
        retencao: "Estimular o uso frequente do sistema e reduzir o churn de clientes ativos.",
        institucional: "Humanizar a equipe e gerar engajamento sobre a cultura do SAAM."
      }
    };
  }

  const elSelect = document.getElementById("ideas-month-select");
  const elTitle = document.getElementById("ideas-strat-title");
  const elDesc = document.getElementById("ideas-strat-desc");
  
  if (elSelect) elSelect.value = month;
  if (elTitle) elTitle.textContent = strat.theme;
  if (elDesc) elDesc.innerHTML = \`<strong>Estratégia e Oportunidade do Mês:</strong> \${strat.opportunity}\`;

  const elLbl1 = document.getElementById("ideas-card-label-1");
  const elPct1 = document.getElementById("ideas-card-pct-1");
  const elMot1 = document.getElementById("ideas-card-motivo-1");
  const elEx1 = document.getElementById("ideas-card-ex-1");
  if (elLbl1) elLbl1.textContent = strat.labels.educacional;
  if (elPct1) elPct1.textContent = \`\${strat.proportions.educacional}%\`;
  if (elMot1) elMot1.innerHTML = \`<strong>O Motivo:</strong> \${strat.motivos.educacional}\`;
  if (elEx1) elEx1.textContent = strat.exemplos ? strat.exemplos.educacional : "Exemplo geral de pauta educativa.";

  const elLbl2 = document.getElementById("ideas-card-label-2");
  const elPct2 = document.getElementById("ideas-card-pct-2");
  const elMot2 = document.getElementById("ideas-card-motivo-2");
  const elEx2 = document.getElementById("ideas-card-ex-2");
  if (elLbl2) elLbl2.textContent = strat.labels.conversao;
  if (elPct2) elPct2.textContent = \`\${strat.proportions.conversao}%\`;
  if (elMot2) elMot2.innerHTML = \`<strong>O Motivo:</strong> \${strat.motivos.conversao}\`;
  if (elEx2) elEx2.textContent = strat.exemplos ? strat.exemplos.conversao : "Exemplo geral de pauta comercial.";

  const elLbl3 = document.getElementById("ideas-card-label-3");
  const elPct3 = document.getElementById("ideas-card-pct-3");
  const elMot3 = document.getElementById("ideas-card-motivo-3");
  const elEx3 = document.getElementById("ideas-card-ex-3");
  if (elLbl3) elLbl3.textContent = strat.labels.retencao;
  if (elPct3) elPct3.textContent = \`\${strat.proportions.retencao}%\`;
  if (elMot3) elMot3.innerHTML = \`<strong>O Motivo:</strong> \${strat.motivos.retencao}\`;
  if (elEx3) elEx3.textContent = strat.exemplos ? strat.exemplos.retencao : "Exemplo geral de pauta de base ativa.";

  const elLbl4 = document.getElementById("ideas-card-label-4");
  const elPct4 = document.getElementById("ideas-card-pct-4");
  const elMot4 = document.getElementById("ideas-card-motivo-4");
  const elEx4 = document.getElementById("ideas-card-ex-4");
  if (elLbl4) elLbl4.textContent = strat.labels.institucional;
  if (elPct4) elPct4.textContent = \`\${strat.proportions.institucional}%\`;
  if (elMot4) elMot4.innerHTML = \`<strong>O Motivo:</strong> \${strat.motivos.institucional}\`;
  if (elEx4) elEx4.textContent = strat.exemplos ? strat.exemplos.institucional : "Exemplo geral de postagem institucional.";

  const elSimLbl1 = document.getElementById("sim-lbl-1");
  const elSimLbl2 = document.getElementById("sim-lbl-2");
  const elSimLbl3 = document.getElementById("sim-lbl-3");
  const elSimLbl4 = document.getElementById("sim-lbl-4");
  if (elSimLbl1) elSimLbl1.textContent = \`\${strat.labels.educacional.split(" ")[0]} (\${strat.proportions.educacional}%)\`;
  if (elSimLbl2) elSimLbl2.textContent = \`\${strat.labels.conversao.split(" ")[0]} (\${strat.proportions.conversao}%)\`;
  if (elSimLbl3) elSimLbl3.textContent = \`\${strat.labels.retencao.split(" ")[0]} (\${strat.proportions.retencao}%)\`;
  if (elSimLbl4) elSimLbl4.textContent = \`\${strat.labels.institucional.split(" ")[0]} (\${strat.proportions.institucional}%)\`;

  window.updateIdeasSimulation(strat.proportions);
};`;

const newRenderIdeasStrategyCode = `window.renderIdeasStrategy = function() {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  let strat = monthlyStrategyProfiles[month];
  if (year !== 2026 || !strat) {
    strat = {
      name: \`\${monthNames[month]} \${year}\`,
      theme: "Planejamento Editorial Dinâmico",
      opportunity: "Oportunidade Geral: Produzir conteúdo relevante alinhado às necessidades do setor fiscal, focando em segurança, agilidade e inteligência nas rotinas diárias.",
      proportions: { educacional: 40, conversao: 30, retencao: 20, institucional: 10 },
      labels: { educacional: "Educacional (Atração)", conversao: "Vendas (Conversão)", retencao: "Sucesso (Retenção)", institucional: "Branding (Institucional)" },
      motivos: {
        educacional: "Atrair novos leads (público frio) e criar demanda mostrando novas possibilidades.",
        conversao: "Convencer o lead quente de que o SAAM é o software ideal para sua operação.",
        retencao: "Estimular o uso frequente do sistema e reduzir o churn de clientes ativos.",
        institucional: "Humanizar a equipe e gerar engajamento sobre a cultura do SAAM."
      }
    };
  }

  const elSelect = document.getElementById("ideas-month-select");
  const elTitle = document.getElementById("ideas-strat-title");
  const elDesc = document.getElementById("ideas-strat-desc");
  
  if (elSelect) elSelect.value = month;
  if (elTitle) elTitle.textContent = strat.theme;
  if (elDesc) elDesc.innerHTML = \`<strong>Estratégia e Oportunidade do Mês:</strong> \${strat.opportunity}\`;

  const elLbl1 = document.getElementById("ideas-card-label-1");
  const elPct1 = document.getElementById("ideas-card-pct-1");
  const elMot1 = document.getElementById("ideas-card-motivo-1");
  const elEx1 = document.getElementById("ideas-card-ex-1");
  if (elLbl1) elLbl1.textContent = strat.labels.educacional;
  if (elPct1) elPct1.textContent = \`\${strat.proportions.educacional}%\`;
  if (elMot1) elMot1.innerHTML = \`<strong>O Motivo:</strong> \${strat.motivos.educacional}\`;
  if (elEx1) elEx1.textContent = strat.exemplos ? strat.exemplos.educacional : "Exemplo geral de pauta educativa.";

  const elLbl2 = document.getElementById("ideas-card-label-2");
  const elPct2 = document.getElementById("ideas-card-pct-2");
  const elMot2 = document.getElementById("ideas-card-motivo-2");
  const elEx2 = document.getElementById("ideas-card-ex-2");
  if (elLbl2) elLbl2.textContent = strat.labels.conversao;
  if (elPct2) elPct2.textContent = \`\${strat.proportions.conversao}%\`;
  if (elMot2) elMot2.innerHTML = \`<strong>O Motivo:</strong> \${strat.motivos.conversao}\`;
  if (elEx2) elEx2.textContent = strat.exemplos ? strat.exemplos.conversao : "Exemplo geral de pauta comercial.";

  const elLbl3 = document.getElementById("ideas-card-label-3");
  const elPct3 = document.getElementById("ideas-card-pct-3");
  const elMot3 = document.getElementById("ideas-card-motivo-3");
  const elEx3 = document.getElementById("ideas-card-ex-3");
  if (elLbl3) elLbl3.textContent = strat.labels.retencao;
  if (elPct3) elPct3.textContent = \`\${strat.proportions.retencao}%\`;
  if (elMot3) elMot3.innerHTML = \`<strong>O Motivo:</strong> \${strat.motivos.retencao}\`;
  if (elEx3) elEx3.textContent = strat.exemplos ? strat.exemplos.retencao : "Exemplo geral de pauta de base ativa.";

  const elLbl4 = document.getElementById("ideas-card-label-4");
  const elPct4 = document.getElementById("ideas-card-pct-4");
  const elMot4 = document.getElementById("ideas-card-motivo-4");
  const elEx4 = document.getElementById("ideas-card-ex-4");
  if (elLbl4) elLbl4.textContent = strat.labels.institucional;
  if (elPct4) elPct4.textContent = \`\${strat.proportions.institucional}%\`;
  if (elMot4) elMot4.innerHTML = \`<strong>O Motivo:</strong> \${strat.motivos.institucional}\`;
  if (elEx4) elEx4.textContent = strat.exemplos ? strat.exemplos.institucional : "Exemplo geral de postagem institucional.";

  const elSimLbl1 = document.getElementById("sim-lbl-1");
  const elSimLbl2 = document.getElementById("sim-lbl-2");
  const elSimLbl3 = document.getElementById("sim-lbl-3");
  const elSimLbl4 = document.getElementById("sim-lbl-4");
  if (elSimLbl1) elSimLbl1.textContent = \`\${strat.labels.educacional.split(" ")[0]} (\${strat.proportions.educacional}%)\`;
  if (elSimLbl2) elSimLbl2.textContent = \`\${strat.labels.conversao.split(" ")[0]} (\${strat.proportions.conversao}%)\`;
  if (elSimLbl3) elSimLbl3.textContent = \`\${strat.labels.retencao.split(" ")[0]} (\${strat.proportions.retencao}%)\`;
  if (elSimLbl4) elSimLbl4.textContent = \`\${strat.labels.institucional.split(" ")[0]} (\${strat.proportions.institucional}%)\`;

  window.updateIdeasSimulation(strat.proportions);

  // --- DYNAMICALLY RENDER THE FULL CAMPAIGN GUIA EDITORIAL PLAYBOOK ---
  const playbookContainer = document.getElementById("ideas-campaign-playbook");
  if (playbookContainer) {
    if (strat.playbook) {
      const p = strat.playbook;
      
      // Build journey rows
      const journeyRows = p.jornada.map(j => \`
        <div style="display: flex; gap: 16px; align-items: flex-start; padding: 12px 0; border-bottom: 1px dashed #E2E8F0;">
          <span style="background: rgba(38,66,139,0.12); color: #26428B; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 800; font-family: 'Roboto', sans-serif; white-space: nowrap;">\${j.semana}</span>
          <div>
            <strong style="font-size: 13.5px; color: #0A1C2D; font-family: 'Outfit', sans-serif; display: block;">\${j.titulo}</strong>
            <p style="margin: 2px 0 0 0; font-size: 12.5px; color: #64748B; font-family: 'Poppins', sans-serif; line-height: 1.4;">\${j.foco}</p>
          </div>
        </div>
      \`).join('');

      // Build fixed series
      const seriesBlocks = p.series.map(s => \`
        <div style="background: #F8F6F7; border: 1px solid #CBD5E1; padding: 12px 14px; border-radius: 8px;">
          <strong style="font-size: 13px; color: #26428B; font-family: 'Roboto', sans-serif; display: block; text-transform: uppercase;">🎬 \${s.nome}</strong>
          <span style="font-size: 12px; color: #475569; font-family: 'Poppins', sans-serif; display: block; margin-top: 2px; line-height: 1.4;">\${s.objetivo}</span>
        </div>
      \`).join('');

      playbookContainer.innerHTML = \`
        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 28px; box-shadow: var(--shadow-sm);">
          <div style="border-bottom: 1px solid var(--hairline); padding-bottom: 14px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <h4 style="margin: 0; font-size: 18px; color: #0A1C2D; font-weight: 800; font-family: 'Outfit', sans-serif;">📖 Guia Editorial de Marca SAAM (\${strat.name})</h4>
              <span style="background: #DAEDF4; color: #26428B; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; font-family: 'Roboto', sans-serif;">CAMPANHA ATIVA</span>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 20px;">
            <!-- DNA e Objetivos -->
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div style="background: #FFFBF7; border: 1px solid #FBECD7; padding: 16px; border-radius: 10px;">
                <strong style="font-size: 12px; color: #26428B; text-transform: uppercase; font-family: 'Roboto', sans-serif; display: block; margin-bottom: 6px;">🎯 Objetivo da Campanha</strong>
                <p style="margin: 0; font-size: 13.5px; color: #033059; line-height: 1.5; font-family: 'Poppins', sans-serif;">\${p.objetivo}</p>
              </div>
              
              <div style="background: #FFFBF7; border: 1px solid #FBECD7; padding: 16px; border-radius: 10px;">
                <strong style="font-size: 12px; color: #26428B; text-transform: uppercase; font-family: 'Roboto', sans-serif; display: block; margin-bottom: 6px;">✨ Percepção Desejada</strong>
                <p style="margin: 0; font-size: 13.5px; color: #033059; line-height: 1.5; font-family: 'Poppins', sans-serif; font-style: italic;">"\${p.percepcao}"</p>
              </div>

              <div>
                <strong style="font-size: 12px; color: #0A1C2D; text-transform: uppercase; font-family: 'Roboto', sans-serif; display: block; margin-bottom: 8px;">🎬 Séries Recomendadas do Mês</strong>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                  \${seriesBlocks}
                </div>
              </div>
            </div>

            <!-- Jornada Semanal -->
            <div style="background: #F8F6F7; border: 1px solid #CBD5E1; padding: 20px; border-radius: 12px;">
              <strong style="font-size: 12px; color: #0A1C2D; text-transform: uppercase; font-family: 'Roboto', sans-serif; display: block; margin-bottom: 12px; border-bottom: 1px solid #CBD5E1; padding-bottom: 6px;">📅 Jornada e Focos Semanais</strong>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                \${journeyRows}
              </div>
            </div>
          </div>
        </div>
      \`;
    } else {
      playbookContainer.innerHTML = '';
    }
  }
};`;

if (code.includes(oldRenderIdeasStrategyCode)) {
  code = code.replace(oldRenderIdeasStrategyCode, newRenderIdeasStrategyCode);
  console.log("app.js renderIdeasStrategy successfully updated with dynamic playbook compiler.");
} else {
  // CRLF check
  const oldRenderIdeasStrategyCodeCRLF = oldRenderIdeasStrategyCode.replace(/\n/g, '\r\n');
  const newRenderIdeasStrategyCodeCRLF = newRenderIdeasStrategyCode.replace(/\n/g, '\r\n');
  if (code.includes(oldRenderIdeasStrategyCodeCRLF)) {
    code = code.replace(oldRenderIdeasStrategyCodeCRLF, newRenderIdeasStrategyCodeCRLF);
    console.log("app.js renderIdeasStrategy successfully updated with dynamic playbook compiler (CRLF).");
  } else {
    console.error("Could not find oldRenderIdeasStrategyCode block in app.js!");
    process.exit(1);
  }
}

fs.writeFileSync('app.js', code, 'utf8');
console.log("app.js successfully patched with detailed guides!");
