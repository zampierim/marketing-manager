const fs = require('fs');

// 1. COMMEMORATIVE DATES POSTS
const commemPosts = [
  { id: 'com-01', date: '2026-08-15', channel: 'Estratégia', format: 'Data Comemorativa', theme: 'DADOS COMO ATIVO', title: 'Dia da Informática (IA, APIs e ERP)', status: 'Idea', commemorative: true, tag: 'Especial' },
  { id: 'com-02', date: '2026-09-07', channel: 'Estratégia', format: 'Data Comemorativa', theme: 'PROCESSOS', title: 'Independência do Brasil (Independência Operacional)', status: 'Idea', commemorative: true, tag: 'Especial' },
  { id: 'com-03', date: '2026-09-15', channel: 'Estratégia', format: 'Data Comemorativa', theme: 'PERFORMANCE', title: 'Dia do Cliente (Evolução e Cases)', status: 'Idea', commemorative: true, tag: 'Especial' },
  { id: 'com-04', date: '2026-10-05', channel: 'Estratégia', format: 'Data Comemorativa', theme: 'PERFORMANCE', title: 'Dia da Micro e Pequena Empresa (Escalabilidade)', status: 'Idea', commemorative: true, tag: 'Especial' },
  { id: 'com-05', date: '2026-10-15', channel: 'Estratégia', format: 'Data Comemorativa', theme: 'DECISÕES BASEADAS EM DADOS', title: 'Dia do Professor (Educação Fiscal)', status: 'Idea', commemorative: true, tag: 'Especial' },
  { id: 'com-06', date: '2026-10-31', channel: 'Estratégia', format: 'Data Comemorativa', theme: 'RESULTADOS REAIS', title: 'Halloween (Os Maiores Pesadelos Fiscais)', status: 'Idea', commemorative: true, tag: 'Especial' },
  { id: 'com-07', date: '2026-11-27', channel: 'Estratégia', format: 'Data Comemorativa', theme: 'Black Friday', title: 'Black Friday (O prejuízo dos processos ruins)', status: 'Idea', commemorative: true, tag: 'Especial' },
  { id: 'com-08', date: '2026-12-09', channel: 'Estratégia', format: 'Data Comemorativa', theme: 'Dezembro', title: 'Dia contra a Corrupção (Compliance e Governança)', status: 'Idea', commemorative: true, tag: 'Especial' },
  { id: 'com-09', date: '2026-12-24', channel: 'Estratégia', format: 'Data Comemorativa', theme: 'Dezembro', title: 'Natal (Mensagem Institucional)', status: 'Idea', commemorative: true, tag: 'Especial' },
  { id: 'com-10', date: '2026-12-31', channel: 'Estratégia', format: 'Data Comemorativa', theme: 'Dezembro', title: 'Ano Novo (Manifesto da marca)', status: 'Idea', commemorative: true, tag: 'Especial' },
  { id: 'com-11', date: '2027-01-15', channel: 'Estratégia', format: 'Data Comemorativa', theme: 'Janeiro', title: 'Prazo de Planejamento Anual (Organização)', status: 'Idea', commemorative: true, tag: 'Especial' }
];

// 2. OCTOBER IDEAS
const octIdeas = [
  { id: 'oct-i01', title: 'Os 7 KPIs que toda operação fiscal deveria acompanhar.', usageCount: 0, series: 'Indicadores e Performance' },
  { id: 'oct-i02', title: 'Você mede produtividade ou apenas entrega obrigações?', usageCount: 0, series: 'Indicadores e Performance' },
  { id: 'oct-i03', title: 'O indicador que revela se sua equipe vive no retrabalho.', usageCount: 0, series: 'Indicadores e Performance' },
  { id: 'oct-i04', title: 'Como saber se seu departamento fiscal está realmente evoluindo.', usageCount: 0, series: 'Indicadores e Performance' },
  { id: 'oct-i05', title: 'O KPI que pode reduzir multas antes que elas aconteçam.', usageCount: 0, series: 'Indicadores e Performance' },
  { id: 'oct-i06', title: 'Quanto tempo sua equipe perde para fechar um mês fiscal?', usageCount: 0, series: 'Indicadores e Performance' },
  { id: 'oct-i07', title: 'Como construir um dashboard que realmente ajuda na gestão.', usageCount: 0, series: 'Indicadores e Performance' },
  { id: 'oct-i08', title: 'Os números que toda diretoria gostaria de receber do Fiscal.', usageCount: 0, series: 'Indicadores e Performance' },
  { id: 'oct-i09', title: 'Por que medir é mais importante do que automatizar.', usageCount: 0, series: 'Indicadores e Performance' },
  { id: 'oct-i10', title: 'O que um gestor fiscal enxerga em um dashboard que um analista não vê.', usageCount: 0, series: 'Indicadores e Performance' },
  
  { id: 'oct-i11', title: 'Você toma decisões com dados ou com experiência?', usageCount: 0, series: 'Decisões com Dados' },
  { id: 'oct-i12', title: 'Como transformar relatórios em decisões estratégicas.', usageCount: 0, series: 'Decisões com Dados' },
  { id: 'oct-i13', title: '5 perguntas que seus indicadores deveriam responder.', usageCount: 0, series: 'Decisões com Dados' },
  { id: 'oct-i14', title: 'O dado que muda completamente uma decisão.', usageCount: 0, series: 'Decisões com Dados' },
  { id: 'oct-i15', title: 'Informação não gera resultado. Decisão gera.', usageCount: 0, series: 'Decisões com Dados' },
  { id: 'oct-i16', title: 'O erro de interpretar um indicador isoladamente.', usageCount: 0, series: 'Decisões com Dados' },
  { id: 'oct-i17', title: 'Quando um número merece sua atenção?', usageCount: 0, series: 'Decisões com Dados' },
  { id: 'oct-i18', title: 'Como identificar tendências antes que virem problemas.', usageCount: 0, series: 'Decisões com Dados' },
  { id: 'oct-i19', title: 'O Fiscal pode prever riscos?', usageCount: 0, series: 'Decisões com Dados' },
  { id: 'oct-i20', title: 'Dados contam histórias. Você sabe interpretá-las?', usageCount: 0, series: 'Decisões com Dados' },

  { id: 'oct-i21', title: 'Quanto custa uma planilha paralela?', usageCount: 0, series: 'Custo Invisível' },
  { id: 'oct-i22', title: 'O preço de um XML perdido.', usageCount: 0, series: 'Custo Invisível' },
  { id: 'oct-i23', title: 'Quanto custa uma conferência manual?', usageCount: 0, series: 'Custo Invisível' },
  { id: 'oct-i24', title: 'O custo silencioso do retrabalho.', usageCount: 0, series: 'Custo Invisível' },
  { id: 'oct-i25', title: 'Quanto vale uma hora da sua equipe?', usageCount: 0, series: 'Custo Invisível' },
  { id: 'oct-i26', title: 'Os prejuízos que nunca aparecem no balanço.', usageCount: 0, series: 'Custo Invisível' },
  { id: 'oct-i27', title: 'Quanto sua empresa perde esperando informações?', usageCount: 0, series: 'Custo Invisível' },
  { id: 'oct-i28', title: 'O verdadeiro custo de um processo lento.', usageCount: 0, series: 'Custo Invisível' },
  { id: 'oct-i29', title: 'Como pequenos erros geram grandes prejuízos.', usageCount: 0, series: 'Custo Invisível' },
  { id: 'oct-i30', title: 'O custo da falta de integração.', usageCount: 0, series: 'Custo Invisível' },

  { id: 'oct-i31', title: 'O que empresas de alta performance fazem antes do fechamento.', usageCount: 0, series: 'Alta Performance' },
  { id: 'oct-i32', title: 'Como equipes eficientes organizam suas rotinas.', usageCount: 0, series: 'Alta Performance' },
  { id: 'oct-i33', title: 'As 10 características de uma operação fiscal de alta performance.', usageCount: 0, series: 'Alta Performance' },
  { id: 'oct-i34', title: 'Por que produtividade não significa trabalhar mais.', usageCount: 0, series: 'Alta Performance' },
  { id: 'oct-i35', title: 'O segredo das empresas que fecham mais rápido.', usageCount: 0, series: 'Alta Performance' },
  { id: 'oct-i36', title: 'Como eliminar gargalos antes que apareçam.', usageCount: 0, series: 'Alta Performance' },
  { id: 'oct-i37', title: 'O que diferencia empresas eficientes das empresas organizadas.', usageCount: 0, series: 'Alta Performance' },
  { id: 'oct-i38', title: 'A rotina que toda equipe de alta performance possui.', usageCount: 0, series: 'Alta Performance' },
  { id: 'oct-i39', title: 'Quanto tempo uma operação madura economiza por mês?', usageCount: 0, series: 'Alta Performance' },
  { id: 'oct-i40', title: 'Alta performance começa antes da tecnologia.', usageCount: 0, series: 'Alta Performance' },

  { id: 'oct-i41', title: 'O que a diretoria espera do departamento fiscal em 2026.', usageCount: 0, series: 'Gestão e Liderança' },
  { id: 'oct-i42', title: 'Como apresentar resultados fiscais para o CEO.', usageCount: 0, series: 'Gestão e Liderança' },
  { id: 'oct-i43', title: 'O Fiscal deve participar das decisões estratégicas?', usageCount: 0, series: 'Gestão e Liderança' },
  { id: 'oct-i44', title: 'Os relatórios que realmente fazem diferença para a gestão.', usageCount: 0, series: 'Gestão e Liderança' },
  { id: 'oct-i45', title: 'Como um gestor identifica um gargalo em poucos minutos.', usageCount: 0, series: 'Gestão e Liderança' },
  { id: 'oct-i46', title: 'As perguntas que todo líder fiscal deveria fazer semanalmente.', usageCount: 0, series: 'Gestão e Liderança' },
  { id: 'oct-i47', title: 'Como criar uma cultura orientada por indicadores.', usageCount: 0, series: 'Gestão e Liderança' },
  { id: 'oct-i48', title: 'O que muda quando o Fiscal deixa de ser operacional.', usageCount: 0, series: 'Gestão e Liderança' },
  { id: 'oct-i49', title: 'O departamento fiscal pode gerar vantagem competitiva?', usageCount: 0, series: 'Gestão e Liderança' },
  { id: 'oct-i50', title: 'A pergunta que toda empresa deveria responder: "Se amanhã nossa operação dobrar, nossos processos suportam?"', usageCount: 0, series: 'Gestão e Liderança' }
];

let appJs = fs.readFileSync('app.js', 'utf-8');

// Append commemorative posts
let postsMatch = appJs.match(/window\.posts\s*=\s*\[([\s\S]*?)\];/);
if (postsMatch) {
    let postsContent = postsMatch[1];
    if (postsContent.trim().length > 0) {
        postsContent += ',\n';
    }
    postsContent += commemPosts.map(p => JSON.stringify(p)).join(',\n');
    appJs = appJs.replace(postsMatch[0], 'window.posts = [\n' + postsContent + '\n];');
}

// Append October Ideas
let ideasMatch = appJs.match(/window\.ideasData\s*=\s*\[([\s\S]*?)\];/);
if (ideasMatch) {
    let ideasContent = ideasMatch[1];
    if (ideasContent.trim().length > 0) {
        ideasContent += ',\n';
    }
    ideasContent += octIdeas.map(i => JSON.stringify(i)).join(',\n');
    appJs = appJs.replace(ideasMatch[0], 'window.ideasData = [\n' + ideasContent + '\n];');
}

fs.writeFileSync('app.js', appJs, 'utf-8');

// Update index.html pills to include October categories
let html = fs.readFileSync('index.html', 'utf-8');
const filterRegex = /<button class="filter-pill" onclick="filterGeral\('Liderança'\)">Liderança<\/button>/;
const appendFilters = `<button class="filter-pill" onclick="filterGeral('Liderança')">Liderança</button>
          <button class="filter-pill" style="border-left: 2px solid #EA580C; padding-left: 10px;" onclick="filterGeral('Indicadores e Performance')">Indicadores (Out)</button>
          <button class="filter-pill" onclick="filterGeral('Decisões com Dados')">Decisões</button>
          <button class="filter-pill" onclick="filterGeral('Custo Invisível')">Custo Invisível</button>
          <button class="filter-pill" onclick="filterGeral('Alta Performance')">Alta Performance</button>
          <button class="filter-pill" onclick="filterGeral('Gestão e Liderança')">Gestão (Out)</button>`;
html = html.replace(filterRegex, appendFilters);
fs.writeFileSync('index.html', html, 'utf-8');

console.log('App and index updated successfully');
