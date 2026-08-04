const fs = require('fs');

const rawTextPart1 = fs.readFileSync('build_ideas.js', 'utf8').match(/const rawText = `([\s\S]*?)`;/)[1];

const rawTextPart2 = `
===Inteligência Fiscal, Dados e Analytics===
1. Dados fiscais também contam histórias
2. Sua empresa mede o que realmente importa?
3. O indicador que falta no seu departamento fiscal
4. Informação sem análise não gera resultado
5. Como transformar dados em decisões
6. O novo combustível da área fiscal
7. Empresas inteligentes analisam antes de agir
8. Quanto vale um dado confiável?
9. O fiscal deixou de ser operacional
10. Os números revelam muito mais
11. O futuro pertence às empresas orientadas por dados
12. Seu dashboard responde as perguntas certas?
13. Decidir sem dados custa caro
14. A diferença entre enxergar e interpretar
15. O poder escondido nos indicadores fiscais
16. Sua empresa conhece seus próprios números?
17. Dados fiscais podem prever problemas
18. Como criar uma gestão baseada em evidências
19. O fiscal virou centro estratégico
20. O que seus indicadores estão escondendo
21. Inteligência começa com informação organizada
22. A decisão mais importante começa nos dados
23. Como enxergar oportunidades invisíveis
24. Os KPIs que todo gestor deveria acompanhar
25. O fiscal pode prever riscos?
26. Mais dados não significam mais controle
27. Empresas de alta performance medem tudo
28. A inteligência está na interpretação
29. Como transformar relatórios em ação
30. O departamento fiscal precisa de BI?
31. Dados confiáveis aceleram decisões
32. Os melhores gestores acompanham estes indicadores
33. A nova linguagem da gestão fiscal
34. O valor estratégico da informação
35. Como reduzir incertezas usando dados
36. O mapa da performance fiscal
37. O painel que muda decisões
38. O fiscal orientado por indicadores
39. Sua empresa mede produtividade fiscal?
40. O dado certo economiza horas
41. Como antecipar tendências fiscais
42. Inteligência também é velocidade
43. Dados conectados geram vantagem
44. O próximo passo da gestão fiscal
45. O que um dashboard realmente deveria mostrar
46. Indicadores que fazem diferença
47. O fiscal analítico supera o operacional
48. O futuro da inteligência tributária
49. Empresas crescem quando entendem seus dados
50. Informação estratégica gera vantagem competitiva
===Bastidores e Posicionamento da SAAM===
1. O que acontece antes de uma atualização do SAAM
2. Como nasce uma funcionalidade no SAAM
3. Bastidores de quem vive o fiscal todos os dias
4. O que aprendemos ouvindo milhares de usuários
5. Os desafios que inspiram nossas soluções
6. A tecnologia por trás da inteligência fiscal
7. Um dia dentro da equipe SAAM
8. Como pensamos cada atualização
9. O compromisso que existe por trás de cada versão
10. O que move nossa equipe diariamente
11. Desenvolver para o fiscal é diferente
12. A rotina que ninguém vê
13. O trabalho que acontece antes da entrega
14. Como transformamos sugestões em melhorias
15. O que significa inovar no setor fiscal
16. A evolução do SAAM ao longo dos anos
17. Por que ouvimos nossos clientes primeiro
18. As decisões que fazem diferença
19. Como garantimos qualidade em cada atualização
20. O fiscal muda. Nós evoluímos junto.
21. Conheça quem constrói o SAAM
22. O processo por trás da inovação
23. Como funciona nosso desenvolvimento
24. Cada melhoria começa com um problema real
25. O que aprendemos com nossos clientes
26. A história por trás da tecnologia
27. Como transformamos desafios em soluções
28. O diferencial não está apenas no software
29. Pessoas desenvolvendo tecnologia para pessoas
30. O compromisso diário com a evolução
31. O que significa inteligência fiscal para nós
32. A visão que guia cada decisão
33. O mercado mudou. Nós também.
34. Nossa missão vai além do software
35. O que faz uma empresa inovar continuamente
36. O futuro está sendo construído agora
37. Cada atualização tem um propósito
38. Como evoluímos junto com a legislação
39. O conhecimento por trás da tecnologia
40. O valor de escutar quem usa
41. O que existe por trás da tela
42. A cultura que impulsiona inovação
43. O SAAM visto por dentro
44. Como pensamos a experiência do usuário
45. Da necessidade à solução
46. A inovação nasce dos detalhes
47. Mais do que software, conhecimento
48. O compromisso com a excelência fiscal
49. Construindo o futuro da gestão tributária
50. Nossa maior inovação ainda está por vir
===Gestão Fiscal Estratégica===
1. O departamento fiscal deixou de ser suporte
2. O fiscal pode liderar decisões estratégicas
3. Empresas competitivas valorizam o setor fiscal
4. Gestão fiscal é vantagem competitiva
5. O papel do fiscal mudou para sempre
6. O futuro pertence aos gestores estratégicos
7. Como transformar o fiscal em centro de inteligência
8. O impacto da gestão fiscal nos resultados
9. Estratégia também passa pelo fiscal
10. O gestor fiscal do futuro
11. Decisões inteligentes começam no fiscal
12. O valor estratégico da conformidade
13. Sua empresa aproveita todo o potencial do fiscal?
14. O fiscal pode impulsionar crescimento
15. Liderança fiscal faz diferença
16. Como criar uma operação preparada
17. O novo perfil do gestor tributário
18. Gestão eficiente reduz desperdícios
19. O fiscal como aliado da diretoria
20. Empresas líderes investem em inteligência
21. O que separa operações maduras
22. Como tornar o fiscal protagonista
23. O impacto das decisões preventivas
24. O setor fiscal precisa inovar
25. O futuro exige visão estratégica
26. Processos estratégicos geram resultados
27. A maturidade começa na gestão
28. O fiscal nunca foi tão importante
29. Como evoluir sua operação
30. Estratégia reduz riscos
31. Empresas fortes têm gestão forte
32. O fiscal como gerador de valor
33. Liderança baseada em dados
34. O próximo nível da gestão tributária
35. Gestão moderna exige tecnologia
36. Como construir vantagem operacional
37. Planejamento reduz incertezas
38. A gestão começa antes da obrigação
39. O novo cenário da liderança fiscal
40. O fiscal conectado ao negócio
41. Como crescer com segurança
42. Gestão inteligente gera previsibilidade
43. Empresas preparadas antecipam mudanças
44. O futuro pertence aos organizados
45. O fiscal estratégico entrega mais valor
46. A operação ideal existe
47. Como preparar sua empresa para os próximos anos
48. Gestão eficiente começa nos processos
49. O diferencial competitivo está na organização
50. A nova era da gestão fiscal
`;

const rawTextPart3Interno = `
===Atualizações do SAAM===
* Novidades da versão desta semana
* O que mudou nesta atualização
* Funcionalidade que acabou de chegar
* Melhorias sugeridas pelos clientes
* Correções implementadas
* O que foi otimizado
* Recursos pouco conhecidos
* Próximas novidades
* Evolução da plataforma
* Roadmap do SAAM
===Dicas de Utilização===
* Você usa essa função?
* 3 minutos que economizam 2 horas
* Atalho escondido no SAAM
* Configuração recomendada
* Como automatizar essa rotina
* Recursos esquecidos
* Como ganhar velocidade
* Ajustes inteligentes
* Erros comuns de configuração
* Melhores práticas
===Academia SAAM===
* Aula rápida
* Minuto Fiscal
* Dica da Semana
* Glossário Fiscal
* Como interpretar um erro
* O que significa esse aviso
* Como validar informações
* Sequência ideal da rotina
* Passo a passo
* Tutorial em vídeo
===Reforma Tributária no SAAM===
* Como fazer no SAAM
* Onde fica essa rotina
* O que muda dentro do sistema
* Novos parâmetros
* Como preparar sua empresa
* Demonstração prática
* Configuração recomendada
* Perguntas frequentes
* Casos reais
* Checklist
===Boas Práticas Operacionais===
* Checklist diário
* Checklist semanal
* Checklist mensal
* Rotinas antes do fechamento
* Organização dos XML
* Validação do SPED
* Conferências importantes
* Backup
* Organização fiscal
* Fluxo ideal
===Casos de Sucesso===
* Cliente da semana
* Antes e depois
* Como reduziram horas
* Como eliminaram retrabalho
* História de sucesso
* Depoimento
* Indicadores alcançados
* Resultado obtido
* Processo melhorado
* Evolução do cliente
===Suporte Humanizado===
* Conheça nosso suporte
* Quem respondeu você hoje
* Bastidores
* Como funciona o atendimento
* Tempo médio de resposta
* Equipe especializada
* Curiosidades
* Nosso processo
* Como abrir chamados
* Dicas do suporte
===Comunidade SAAM===
* Cliente destaque
* Empresas que utilizam SAAM
* Eventos
* Lives exclusivas
* Webinars
* Grupo VIP
* Enquetes
* Perguntas frequentes
* Espaço para sugestões
* Novidades da comunidade
===Produtividade Interna===
* Automatize essa rotina
* Pare de fazer isso manualmente
* Faça em poucos cliques
* Ative essa configuração
* Ganhe tempo
* Reduza etapas
* Mais velocidade
* Organização inteligente
* Como simplificar
* Dica rápida
===Inteligência Fiscal Interna===
* Tendências fiscais
* Mudanças na legislação
* Como interpretar novas regras
* Alertas importantes
* Planejamento fiscal
* Gestão baseada em indicadores
* Dicas para gestores
* Indicadores estratégicos
* Como reduzir riscos
* Cenários futuros
===Clube SAAM Premium===
* A dica da semana do CEO
* Bastidores do desenvolvimento
* Funcionalidade antes do lançamento
* Vote na próxima melhoria
* Calendário fiscal do mês
* Materiais exclusivos
* Templates
* Checklists
* Planilhas
* Guias práticos
* Modelos prontos
* Biblioteca fiscal
* Perguntas respondidas por especialistas
* Convites antecipados para eventos
* Conteúdo exclusivo para clientes
`;

let currentCategory = 'Reforma Tributária';
let currentAudience = 'Externo';
let ideas = [];
let idCounter = 1;

function parseBlock(rawText, aud) {
    const lines = rawText.split('\n');
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        if (line.startsWith('===')) {
            currentCategory = line.replace(/===/g, '');
            currentAudience = aud;
            continue;
        }
        
        let title = line.replace(/^\\d+\\.\\s*/, '').replace(/^[*\\-]\\s*/, '').trim();
        if (title) {
            ideas.push({
                id: 'pilar-' + currentCategory.substring(0,3).toLowerCase() + '-' + idCounter++,
                title: title,
                usageCount: 0,
                series: currentCategory,
                audience: currentAudience
            });
        }
    }
}

parseBlock(rawTextPart1, 'Externo');
parseBlock(rawTextPart2, 'Externo');
parseBlock(rawTextPart3Interno, 'Interno');

let appJs = fs.readFileSync('app.js', 'utf-8');

let newIdeasStr = 'window.ideasData = ' + JSON.stringify(ideas, null, 2) + ';';

const startIdx = appJs.indexOf('window.ideasData = [');
if (startIdx !== -1) {
    const endIdx = appJs.indexOf('];', startIdx);
    if (endIdx !== -1) {
        appJs = appJs.substring(0, startIdx) + newIdeasStr + appJs.substring(endIdx + 2);
        fs.writeFileSync('app.js', appJs, 'utf-8');
        console.log('Successfully rebuilt ideasData in app.js. Total ideas:', ideas.length);
    }
}
