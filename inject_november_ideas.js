const fs = require('fs');

const novIdeas = [
  { id: 'nov-i01', title: 'Os 7 riscos fiscais que ninguém percebe até ser tarde.', usageCount: 0, series: 'Riscos Invisíveis' },
  { id: 'nov-i02', title: 'O erro que sua operação pode estar cometendo todos os dias.', usageCount: 0, series: 'Riscos Invisíveis' },
  { id: 'nov-i03', title: 'Quanto custa ignorar pequenos sinais?', usageCount: 0, series: 'Riscos Invisíveis' },
  { id: 'nov-i04', title: 'O maior risco fiscal pode não estar onde você imagina.', usageCount: 0, series: 'Riscos Invisíveis' },
  { id: 'nov-i05', title: 'Como identificar uma operação vulnerável em 5 minutos.', usageCount: 0, series: 'Riscos Invisíveis' },
  { id: 'nov-i06', title: 'Os riscos que um ERP sozinho não consegue enxergar.', usageCount: 0, series: 'Riscos Invisíveis' },
  { id: 'nov-i07', title: 'O perigo de confiar apenas no fechamento do mês.', usageCount: 0, series: 'Riscos Invisíveis' },
  { id: 'nov-i08', title: '5 sinais de que sua empresa trabalha de forma reativa.', usageCount: 0, series: 'Riscos Invisíveis' },
  { id: 'nov-i09', title: 'Como um pequeno cadastro pode gerar um grande problema.', usageCount: 0, series: 'Riscos Invisíveis' },
  { id: 'nov-i10', title: 'Sua empresa identifica riscos ou apenas corrige consequências?', usageCount: 0, series: 'Riscos Invisíveis' },

  { id: 'nov-i11', title: 'Auditoria preventiva: por onde começar?', usageCount: 0, series: 'Auditoria Preventiva' },
  { id: 'nov-i12', title: 'Por que revisar depois da transmissão já é tarde?', usageCount: 0, series: 'Auditoria Preventiva' },
  { id: 'nov-i13', title: 'As etapas de uma auditoria inteligente.', usageCount: 0, series: 'Auditoria Preventiva' },
  { id: 'nov-i14', title: 'O que revisar antes do SPED?', usageCount: 0, series: 'Auditoria Preventiva' },
  { id: 'nov-i15', title: 'Como criar uma rotina preventiva semanal.', usageCount: 0, series: 'Auditoria Preventiva' },
  { id: 'nov-i16', title: 'O checklist que toda equipe deveria seguir antes do fechamento.', usageCount: 0, series: 'Auditoria Preventiva' },
  { id: 'nov-i17', title: 'Os erros que poderiam ter sido evitados.', usageCount: 0, series: 'Auditoria Preventiva' },
  { id: 'nov-i18', title: 'O que uma auditoria realmente protege?', usageCount: 0, series: 'Auditoria Preventiva' },
  { id: 'nov-i19', title: 'Conferir ou prevenir: qual é a diferença?', usageCount: 0, series: 'Auditoria Preventiva' },
  { id: 'nov-i20', title: 'Sua auditoria encontra erros ou evita problemas?', usageCount: 0, series: 'Auditoria Preventiva' },

  { id: 'nov-i21', title: 'O que é governança fiscal na prática?', usageCount: 0, series: 'Governança' },
  { id: 'nov-i22', title: 'Governança não é burocracia.', usageCount: 0, series: 'Governança' },
  { id: 'nov-i23', title: 'Os pilares de uma operação fiscal segura.', usageCount: 0, series: 'Governança' },
  { id: 'nov-i24', title: 'Quem é responsável pela qualidade dos dados?', usageCount: 0, series: 'Governança' },
  { id: 'nov-i25', title: 'Como criar processos que sobrevivem à troca de pessoas.', usageCount: 0, series: 'Governança' },
  { id: 'nov-i26', title: 'O risco de processos sem documentação.', usageCount: 0, series: 'Governança' },
  { id: 'nov-i27', title: 'Por que empresas maduras criam padrões.', usageCount: 0, series: 'Governança' },
  { id: 'nov-i28', title: 'Governança começa antes da tecnologia.', usageCount: 0, series: 'Governança' },
  { id: 'nov-i29', title: 'Como reduzir dependência de conhecimento individual.', usageCount: 0, series: 'Governança' },
  { id: 'nov-i30', title: 'Os hábitos das empresas que raramente enfrentam crises fiscais.', usageCount: 0, series: 'Governança' },

  { id: 'nov-i31', title: 'Como prever problemas antes do fechamento.', usageCount: 0, series: 'Previsibilidade' },
  { id: 'nov-i32', title: 'Todo erro deixa sinais. Você sabe identificá-los?', usageCount: 0, series: 'Previsibilidade' },
  { id: 'nov-i33', title: 'Os indicadores que mostram quando algo vai dar errado.', usageCount: 0, series: 'Previsibilidade' },
  { id: 'nov-i34', title: 'O Fiscal pode prever riscos?', usageCount: 0, series: 'Previsibilidade' },
  { id: 'nov-i35', title: 'Como transformar alertas em decisões.', usageCount: 0, series: 'Previsibilidade' },
  { id: 'nov-i36', title: 'A diferença entre monitorar e reagir.', usageCount: 0, series: 'Previsibilidade' },
  { id: 'nov-i37', title: 'O futuro da auditoria será preditivo?', usageCount: 0, series: 'Previsibilidade' },
  { id: 'nov-i38', title: 'Como construir uma operação previsível.', usageCount: 0, series: 'Previsibilidade' },
  { id: 'nov-i39', title: 'O que empresas inteligentes fazem antes das obrigações.', usageCount: 0, series: 'Previsibilidade' },
  { id: 'nov-i40', title: 'A prevenção custa menos do que a correção.', usageCount: 0, series: 'Previsibilidade' },

  { id: 'nov-i41', title: 'Compliance é proteção, não burocracia.', usageCount: 0, series: 'Compliance e Segurança' },
  { id: 'nov-i42', title: '5 práticas simples que fortalecem sua governança fiscal.', usageCount: 0, series: 'Compliance e Segurança' },
  { id: 'nov-i43', title: 'Como reduzir riscos sem aumentar a equipe.', usageCount: 0, series: 'Compliance e Segurança' },
  { id: 'nov-i44', title: 'O que acontece quando processos não são revisados.', usageCount: 0, series: 'Compliance e Segurança' },
  { id: 'nov-i45', title: 'Os controles internos que toda empresa deveria ter.', usageCount: 0, series: 'Compliance e Segurança' },
  { id: 'nov-i46', title: 'Como criar uma cultura preventiva.', usageCount: 0, series: 'Compliance e Segurança' },
  { id: 'nov-i47', title: 'O papel da liderança na gestão de riscos fiscais.', usageCount: 0, series: 'Compliance e Segurança' },
  { id: 'nov-i48', title: 'Sua empresa está preparada para uma auditoria externa?', usageCount: 0, series: 'Compliance e Segurança' },
  { id: 'nov-i49', title: 'Os erros mais comuns encontrados em auditorias fiscais.', usageCount: 0, series: 'Compliance e Segurança' },
  { id: 'nov-i50', title: 'A pergunta que toda empresa deveria fazer antes de transmitir qualquer obrigação.', usageCount: 0, series: 'Compliance e Segurança' }
];

let appJs = fs.readFileSync('app.js', 'utf-8');

// Append November Ideas
let ideasMatch = appJs.match(/window\.ideasData\s*=\s*\[([\s\S]*?)\];/);
if (ideasMatch) {
    let ideasContent = ideasMatch[1];
    if (ideasContent.trim().length > 0) {
        ideasContent += ',\\n';
    }
    ideasContent += novIdeas.map(i => JSON.stringify(i)).join(',\\n');
    appJs = appJs.replace(ideasMatch[0], 'window.ideasData = [\\n' + ideasContent + '\\n];');
}

fs.writeFileSync('app.js', appJs, 'utf-8');

// Update index.html pills to include November categories
let html = fs.readFileSync('index.html', 'utf-8');
const filterRegex = /<button class="filter-pill" onclick="filterGeral\('Gestão e Liderança'\)">Gestão \(Out\)<\/button>/;
const appendFilters = `
<button class="filter-pill" onclick="filterGeral('Gestão e Liderança')">Gestão (Out)</button>
<button class="filter-pill" style="border-left: 2px solid #4338CA; padding-left: 10px;" onclick="filterGeral('Riscos Invisíveis')">Riscos Invisíveis</button>
<button class="filter-pill" onclick="filterGeral('Auditoria Preventiva')">Auditoria Preventiva</button>
<button class="filter-pill" onclick="filterGeral('Governança')">Governança (Nov)</button>
<button class="filter-pill" onclick="filterGeral('Previsibilidade')">Previsibilidade</button>
<button class="filter-pill" onclick="filterGeral('Compliance e Segurança')">Compliance e Segurança</button>
`;
html = html.replace(filterRegex, appendFilters);
fs.writeFileSync('index.html', html, 'utf-8');

console.log('November ideas added to app.js and index.html updated');
