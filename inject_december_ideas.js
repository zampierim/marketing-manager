const fs = require('fs');

const decIdeas = [
  { id: 'dec-i01', title: 'As empresas que terão um bom 2027 começaram a se organizar agora.', usageCount: 0, series: 'Planejamento 2027' },
  { id: 'dec-i02', title: 'O planejamento fiscal que ninguém faz em dezembro.', usageCount: 0, series: 'Planejamento 2027' },
  { id: 'dec-i03', title: 'Como construir um Plano Fiscal para 2027.', usageCount: 0, series: 'Planejamento 2027' },
  { id: 'dec-i04', title: 'As primeiras decisões que sua empresa deveria tomar antes da virada.', usageCount: 0, series: 'Planejamento 2027' },
  { id: 'dec-i05', title: 'O que revisar antes de iniciar um novo exercício fiscal.', usageCount: 0, series: 'Planejamento 2027' },
  { id: 'dec-i06', title: 'Seu departamento tem um plano ou apenas um calendário de obrigações?', usageCount: 0, series: 'Planejamento 2027' },
  { id: 'dec-i07', title: 'Os cinco pilares de uma operação preparada para 2027.', usageCount: 0, series: 'Planejamento 2027' },
  { id: 'dec-i08', title: 'Como começar janeiro sem apagar incêndios.', usageCount: 0, series: 'Planejamento 2027' },
  { id: 'dec-i09', title: 'O primeiro indicador que você deve acompanhar em 2027.', usageCount: 0, series: 'Planejamento 2027' },
  { id: 'dec-i10', title: 'A pergunta que toda liderança deveria responder antes do Ano Novo.', usageCount: 0, series: 'Planejamento 2027' },

  { id: 'dec-i11', title: 'O que 2026 ensinou ao departamento fiscal.', usageCount: 0, series: 'Retrospectiva Inteligente' },
  { id: 'dec-i12', title: 'As maiores transformações do Fiscal neste ano.', usageCount: 0, series: 'Retrospectiva Inteligente' },
  { id: 'dec-i13', title: 'Cinco aprendizados que sua empresa não pode esquecer.', usageCount: 0, series: 'Retrospectiva Inteligente' },
  { id: 'dec-i14', title: 'Quais processos mais evoluíram em 2026?', usageCount: 0, series: 'Retrospectiva Inteligente' },
  { id: 'dec-i15', title: 'O que mudou na forma de fazer auditoria.', usageCount: 0, series: 'Retrospectiva Inteligente' },
  { id: 'dec-i16', title: 'As tendências que deixaram de ser tendência.', usageCount: 0, series: 'Retrospectiva Inteligente' },
  { id: 'dec-i17', title: 'O maior erro cometido pelas empresas em 2026.', usageCount: 0, series: 'Retrospectiva Inteligente' },
  { id: 'dec-i18', title: 'Se pudéssemos voltar para janeiro, o que faríamos diferente?', usageCount: 0, series: 'Retrospectiva Inteligente' },
  { id: 'dec-i19', title: 'As decisões que geraram os melhores resultados.', usageCount: 0, series: 'Retrospectiva Inteligente' },
  { id: 'dec-i20', title: 'O que você leva de 2026 para 2027?', usageCount: 0, series: 'Retrospectiva Inteligente' },

  { id: 'dec-i21', title: 'O próximo nível da maturidade fiscal.', usageCount: 0, series: 'Evolução Contínua' },
  { id: 'dec-i22', title: 'Como continuar evoluindo no próximo ano.', usageCount: 0, series: 'Evolução Contínua' },
  { id: 'dec-i23', title: 'Os hábitos das equipes que evoluem continuamente.', usageCount: 0, series: 'Evolução Contínua' },
  { id: 'dec-i24', title: 'O que separar entre urgência e prioridade.', usageCount: 0, series: 'Evolução Contínua' },
  { id: 'dec-i25', title: 'Sua operação ficou melhor este ano?', usageCount: 0, series: 'Evolução Contínua' },
  { id: 'dec-i26', title: 'Como evitar repetir os mesmos erros.', usageCount: 0, series: 'Evolução Contínua' },
  { id: 'dec-i27', title: 'A evolução não termina no fechamento do ano.', usageCount: 0, series: 'Evolução Contínua' },
  { id: 'dec-i28', title: 'O que uma operação madura faz diferente em dezembro.', usageCount: 0, series: 'Evolução Contínua' },
  { id: 'dec-i29', title: 'Como transformar aprendizados em melhorias reais.', usageCount: 0, series: 'Evolução Contínua' },
  { id: 'dec-i30', title: 'O ciclo de melhoria contínua aplicado ao Fiscal.', usageCount: 0, series: 'Evolução Contínua' },

  { id: 'dec-i31', title: 'As principais tendências fiscais para 2027.', usageCount: 0, series: 'Tendências para 2027' },
  { id: 'dec-i32', title: 'Como a Inteligência Artificial continuará transformando o Fiscal.', usageCount: 0, series: 'Tendências para 2027' },
  { id: 'dec-i33', title: 'O papel das APIs no próximo ano.', usageCount: 0, series: 'Tendências para 2027' },
  { id: 'dec-i34', title: 'O que esperar da Reforma Tributária em 2027.', usageCount: 0, series: 'Tendências para 2027' },
  { id: 'dec-i35', title: 'Os processos que tendem a desaparecer.', usageCount: 0, series: 'Tendências para 2027' },
  { id: 'dec-i36', title: 'As habilidades que os profissionais fiscais precisarão desenvolver.', usageCount: 0, series: 'Tendências para 2027' },
  { id: 'dec-i37', title: 'O futuro da auditoria preventiva.', usageCount: 0, series: 'Tendências para 2027' },
  { id: 'dec-i38', title: 'Como a tecnologia mudará a rotina das equipes.', usageCount: 0, series: 'Tendências para 2027' },
  { id: 'dec-i39', title: 'O que empresas de alta performance farão diferente em 2027.', usageCount: 0, series: 'Tendências para 2027' },
  { id: 'dec-i40', title: 'O Fiscal do futuro será mais estratégico do que operacional.', usageCount: 0, series: 'Tendências para 2027' },

  { id: 'dec-i41', title: 'O que aprendemos com nossos clientes em 2026.', usageCount: 0, series: 'Clientes e Comunidade' },
  { id: 'dec-i42', title: 'Os recursos do SAAM que mais geraram resultados este ano.', usageCount: 0, series: 'Clientes e Comunidade' },
  { id: 'dec-i43', title: 'As dúvidas mais frequentes dos clientes em 2026.', usageCount: 0, series: 'Clientes e Comunidade' },
  { id: 'dec-i44', title: 'Cinco histórias que marcaram nosso ano.', usageCount: 0, series: 'Clientes e Comunidade' },
  { id: 'dec-i45', title: 'Como nossos clientes evoluíram durante o ano.', usageCount: 0, series: 'Clientes e Comunidade' },
  { id: 'dec-i46', title: 'Obrigado por fazer parte da evolução do Fiscal.', usageCount: 0, series: 'Clientes e Comunidade' },
  { id: 'dec-i47', title: 'Quais melhorias você gostaria de ver no SAAM em 2027?', usageCount: 0, series: 'Clientes e Comunidade' },
  { id: 'dec-i48', title: 'Nosso compromisso para o próximo ano.', usageCount: 0, series: 'Clientes e Comunidade' },
  { id: 'dec-i49', title: 'O que estamos construindo para o futuro da Inteligência Fiscal.', usageCount: 0, series: 'Clientes e Comunidade' },
  { id: 'dec-i50', title: '2027 começa hoje. Qual será o primeiro passo da sua empresa?', usageCount: 0, series: 'Clientes e Comunidade' }
];

let appJs = fs.readFileSync('app.js', 'utf-8');

// Append December Ideas
let ideasMatch = appJs.match(/window\.ideasData\s*=\s*\[([\s\S]*?)\];/);
if (ideasMatch) {
    let ideasContent = ideasMatch[1];
    if (ideasContent.trim().length > 0) {
        ideasContent += ',\\n';
    }
    ideasContent += decIdeas.map(i => JSON.stringify(i)).join(',\\n');
    appJs = appJs.replace(ideasMatch[0], 'window.ideasData = [\\n' + ideasContent + '\\n];');
}

fs.writeFileSync('app.js', appJs, 'utf-8');

// Update index.html pills to include December categories
let html = fs.readFileSync('index.html', 'utf-8');
const filterRegex = /<button class="filter-pill" onclick="filterGeral\('Compliance e Segurança'\)">Compliance e Segurança<\/button>/;
const appendFilters = `
<button class="filter-pill" onclick="filterGeral('Compliance e Segurança')">Compliance e Segurança</button>
<button class="filter-pill" style="border-left: 2px solid #BE185D; padding-left: 10px;" onclick="filterGeral('Planejamento 2027')">Planejamento 2027</button>
<button class="filter-pill" onclick="filterGeral('Retrospectiva Inteligente')">Retrospectiva Inteligente</button>
<button class="filter-pill" onclick="filterGeral('Evolução Contínua')">Evolução Contínua</button>
<button class="filter-pill" onclick="filterGeral('Tendências para 2027')">Tendências para 2027</button>
<button class="filter-pill" onclick="filterGeral('Clientes e Comunidade')">Clientes e Comunidade</button>
`;
html = html.replace(filterRegex, appendFilters);
fs.writeFileSync('index.html', html, 'utf-8');

console.log('December ideas added to app.js and index.html updated');
