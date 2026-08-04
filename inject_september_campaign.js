const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const sepRegex = /<!-- PRÓXIMO MÊS: SETEMBRO \(ACCORDION\) -->[\s\S]*?(?=<!-- PRÓXIMO MÊS: OUTUBRO \(ACCORDION\) -->)/;

const newSeptemberHtml = `<!-- PRÓXIMO MÊS: SETEMBRO (ACCORDION) -->
      <details style="background: var(--bg); border: 1px solid var(--hairline); border-radius: 16px; border-left: 6px solid #059669; margin-bottom: 24px; overflow: hidden; box-shadow: var(--shadow-md);" class="campaign-accordion">
        <summary style="padding: 24px 28px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; list-style: none; outline: none; background: #FFFFFF;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span class="pill-badge" style="background: rgba(16,185,129,0.2); color: #047857; border: 1px solid #10B981; margin-bottom: 8px;">🟢 Próxima Temporada Mestre</span>
              <span style="font-size: 12px; font-weight: 700; color: var(--ink-soft);">GUIA EDITORIAL DE MARCA SAAM</span>
            </div>
            <h3 style="color: #0F172A; margin: 0; font-size: 24px; font-weight: 800; font-family: 'Manrope', sans-serif;">SETEMBRO 2026: A NOVA ERA DA MATURIDADE FISCAL</h3>
          </div>
          <div style="display: flex; align-items: center; gap: 14px;">
            <span style="background: #059669; color: #FFF; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 800; letter-spacing: 0.5px;">PROGRESSÃO DE NARRATIVA</span>
            <svg class="chevron" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </summary>
        
        <div style="padding: 28px; border-top: 1px solid var(--hairline); background: #F8FAFC;">
          
          <!-- Manifesto Hero Banner -->
          <div class="guia-brand-hero" style="background: linear-gradient(135deg, #064E3B 0%, #047857 100%);">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #6EE7B7; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
              <span>🚀 Manifesto de Marca SAAM — Setembro</span>
            </div>
            <h3 style="color: #FFF; font-size: 20px; margin: 0 0 10px 0; font-weight: 800;">"Empresas não evoluem porque compram tecnologia. Elas evoluem porque desenvolvem maturidade."</h3>
            <p style="font-size: 15px; line-height: 1.6; color: #D1FAE5; margin: 0;">
              Agosto mostrou que o mundo fiscal mudou. Setembro mostra <strong>quem está preparado para liderar essa mudança</strong>. A SAAM acredita que a maturidade fiscal não é um destino. Ela é construída todos os dias. Vamos ensinar como construir um departamento fiscal de alta performance.
            </p>
            <div class="guia-brand-quote" style="background: rgba(255, 255, 255, 0.1); border-left: 4px solid #34D399; color: #A7F3D0;">
              ⚡ <strong>Missão de Setembro:</strong> Fazer o mercado compreender que a maturidade fiscal será o maior diferencial competitivo das empresas nos próximos anos. Fazer o profissional pensar: <em>"Minha empresa está evoluindo... ou apenas sobrevivendo?"</em>
            </div>
          </div>

          <!-- Matriz de Mudança de Percepção (DE -> PARA) -->
          <div style="margin-bottom: 28px;">
            <h4 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 800; color: #0F172A;">🔄 A Mudança de Percepção Desejada (DE ➔ PARA)</h4>
            <div class="playbook-grid-2">
              <div class="guia-brand-card">
                <div style="font-weight: 800; font-size: 13px; color: #991B1B; margin-bottom: 8px;">❌ O Mercado Pensa Hoje:</div>
                <ul style="margin: 0; padding-left: 16px; font-size: 13px; color: #7F1D1D; line-height: 1.6;">
                  <li>Cumprimos todas as obrigações.</li>
                  <li>Nosso ERP resolve nossos processos.</li>
                  <li>Nossa equipe trabalha bem e entrega no prazo.</li>
                  <li>Auditoria acontece quando necessário.</li>
                  <li>Automação significa ganhar velocidade.</li>
                </ul>
              </div>
              <div class="guia-brand-card">
                <div style="font-weight: 800; font-size: 13px; color: #065F46; margin-bottom: 8px;">✅ O Mercado Passará a Pensar com a SAAM:</div>
                <ul style="margin: 0; padding-left: 16px; font-size: 13px; color: #047857; line-height: 1.6;">
                  <li>Cumprir obrigações é apenas o básico.</li>
                  <li>Processos maduros valem mais que sistemas caros.</li>
                  <li>ERP precisa de Inteligência Fiscal.</li>
                  <li>Auditoria começa antes da transmissão. Qualidade de dados reduz riscos.</li>
                  <li>Maturidade gera produtividade. O Fiscal deve participar da estratégia.</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- A Matriz dos 3 Públicos Alvo -->
          <div style="margin-bottom: 28px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <h4 style="margin: 0; font-size: 16px; font-weight: 800; color: #0F172A;">🎯 Os 3 Públicos (Cada conteúdo tem um destino)</h4>
              <span class="pill-badge" style="background: rgba(16,185,129,0.2); color: #047857; border: 1px solid #10B981; margin-bottom: 8px;">Segmentação de Setembro</span>
            </div>
            <div class="playbook-grid-3">
              
              <div class="guia-brand-card">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <strong style="color: #1E40AF; font-size: 14px;">① LEAD FRIO</strong>
                </div>
                <p style="font-size: 12.5px; color: #475569; margin: 0 0 10px 0;"><strong>Descobrindo a realidade:</strong> Nunca parou para medir a maturidade fiscal. Compra conhecimento antes da tecnologia.</p>
                <div style="font-size: 12px; color: #1E3A8A; background: #EFF6FF; padding: 6px; border-radius: 6px;"><strong>Objetivo:</strong> "Nossa empresa ainda trabalha dessa forma."</div>
                <div style="font-size: 11px; color: #64748B; margin-top: 6px;">Séries: Você Sabia?, Fiscal ou Ficção, Erros Invisíveis, Diagnóstico Fiscal.</div>
              </div>

              <div class="guia-brand-card">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <strong style="color: #EA580C; font-size: 14px;">② LEAD QUENTE</strong>
                </div>
                <p style="font-size: 12.5px; color: #475569; margin: 0 0 10px 0;"><strong>Evoluindo processos:</strong> Já sabe que precisa melhorar, agora procura um método e caminho estruturado.</p>
                <div style="font-size: 12px; color: #9A3412; background: #FFF7ED; padding: 6px; border-radius: 6px;"><strong>Objetivo:</strong> "A SAAM não vende sistema, ensina como evoluir."</div>
                <div style="font-size: 11px; color: #64748B; margin-top: 6px;">Séries: Escada da Maturidade, KPI Fiscal, ERP x Processo, Frameworks SAAM.</div>
              </div>

              <div class="guia-brand-card">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <strong style="color: #059669; font-size: 14px;">③ CLIENTE BASE</strong>
                </div>
                <p style="font-size: 12.5px; color: #475569; margin: 0 0 10px 0;"><strong>Evolução contínua:</strong> Não quer funcionalidades, quer evoluir e se orgulhar. Sempre há um próximo nível.</p>
                <div style="font-size: 12px; color: #064E3B; background: #ECFDF5; padding: 6px; border-radius: 6px;"><strong>Objetivo:</strong> "Ainda posso extrair muito mais da plataforma."</div>
                <div style="font-size: 11px; color: #64748B; margin-top: 6px;">Séries: Evolução do Cliente, Por Dentro do SAAM, Roadmap, Casos Reais.</div>
              </div>

            </div>
          </div>
          
          <!-- MAPA DE EVOLUÇÃO FISCAL SAAM -->
          <div style="background: #F0FDF4; border: 1px solid #BBF7D0; padding: 24px; border-radius: 16px; margin-bottom: 28px;">
             <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 800; color: #166534;">🌟 Nova Propriedade Intelectual: O Mapa de Evolução Fiscal SAAM</h4>
             <p style="margin: 0 0 16px 0; font-size: 14px; color: #15803D;">Se agosto apresentou o Índice, setembro apresenta <strong>o caminho para subir de nível</strong>. Todo conteúdo responde: <em>Qual é o próximo passo da sua empresa?</em></p>
             
             <div class="guia-brand-grid-4">
                <div style="background: #FFF; padding: 16px; border-radius: 10px; border-left: 4px solid #DC2626; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                   <strong style="color: #DC2626; display: block; margin-bottom: 4px;">NÍVEL 1: Sobrevivência</strong>
                   <ul style="margin: 0 0 10px 0; padding-left: 16px; font-size: 12px; color: #475569;">
                      <li>Muito retrabalho</li>
                      <li>XML descentralizado</li>
                      <li>Equipe apagando incêndios</li>
                   </ul>
                   <div style="font-size: 11px; font-weight: 800; color: #991B1B; background: #FEE2E2; padding: 6px; border-radius: 4px;">Próximo passo: Padronizar processos.</div>
                </div>
                
                <div style="background: #FFF; padding: 16px; border-radius: 10px; border-left: 4px solid #F59E0B; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                   <strong style="color: #F59E0B; display: block; margin-bottom: 4px;">NÍVEL 2: Organização</strong>
                   <ul style="margin: 0 0 10px 0; padding-left: 16px; font-size: 12px; color: #475569;">
                      <li>Processos documentados</li>
                      <li>XML organizado</li>
                      <li>Menos retrabalho</li>
                   </ul>
                   <div style="font-size: 11px; font-weight: 800; color: #B45309; background: #FEF3C7; padding: 6px; border-radius: 4px;">Próximo passo: Automatizar auditorias.</div>
                </div>
                
                <div style="background: #FFF; padding: 16px; border-radius: 10px; border-left: 4px solid #3B82F6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                   <strong style="color: #3B82F6; display: block; margin-bottom: 4px;">NÍVEL 3: Inteligência</strong>
                   <ul style="margin: 0 0 10px 0; padding-left: 16px; font-size: 12px; color: #475569;">
                      <li>Auditoria antes da transmissão</li>
                      <li>KPIs e Indicadores</li>
                      <li>Dados confiáveis</li>
                   </ul>
                   <div style="font-size: 11px; font-weight: 800; color: #1D4ED8; background: #DBEAFE; padding: 6px; border-radius: 4px;">Próximo passo: Dados viram estratégia.</div>
                </div>
                
                <div style="background: #FFF; padding: 16px; border-radius: 10px; border-left: 4px solid #10B981; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                   <strong style="color: #10B981; display: block; margin-bottom: 4px;">NÍVEL 4: Alta Performance</strong>
                   <ul style="margin: 0 0 10px 0; padding-left: 16px; font-size: 12px; color: #475569;">
                      <li>Fiscal participa da diretoria</li>
                      <li>Integrações inteligentes</li>
                      <li>Vantagem competitiva</li>
                   </ul>
                   <div style="font-size: 11px; font-weight: 800; color: #047857; background: #D1FAE5; padding: 6px; border-radius: 4px;">O Ápice da Operação.</div>
                </div>
             </div>
          </div>

          <!-- Jornada Editorial Semanal -->
          <h4 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 800; color: #0F172A;">📖 A Jornada de Setembro em 4 Capítulos</h4>
          <div class="guia-brand-grid-4">
            <div class="guia-brand-card-old" style="border-top: 4px solid #10B981;">
              <span style="font-size: 11px; font-weight: 800; color: #10B981; text-transform: uppercase;">Capítulo 1 — Semana 1</span>
              <h4 style="margin: 4px 0 6px 0; font-size: 15px; color: #0F172A;">DIAGNÓSTICO</h4>
              <p style="font-size: 12.5px; color: #475569; margin: 0 0 8px 0;">Fazer as empresas entenderem onde estão. Gargalos, checklist, sintomas imaturos.</p>
              <div style="font-size: 11px; color: #047857; font-weight: 600;">"Nunca analisei meu departamento assim."</div>
            </div>
            <div class="guia-brand-card-old" style="border-top: 4px solid #3B82F6;">
              <span style="font-size: 11px; font-weight: 800; color: #3B82F6; text-transform: uppercase;">Capítulo 2 — Semana 2</span>
              <h4 style="margin: 4px 0 6px 0; font-size: 15px; color: #0F172A;">PROCESSOS</h4>
              <p style="font-size: 12.5px; color: #475569; margin: 0 0 8px 0;">Maturidade nasce da padronização. Fluxos, ERP, robôs, XML.</p>
              <div style="font-size: 11px; color: #1D4ED8; font-weight: 600;">"Nosso problema não é tecnologia. É processo."</div>
            </div>
            <div class="guia-brand-card-old" style="border-top: 4px solid #8B5CF6;">
              <span style="font-size: 11px; font-weight: 800; color: #8B5CF6; text-transform: uppercase;">Capítulo 3 — Semana 3</span>
              <h4 style="margin: 4px 0 6px 0; font-size: 15px; color: #0F172A;">PERFORMANCE</h4>
              <p style="font-size: 12.5px; color: #475569; margin: 0 0 8px 0;">Como empresas maduras trabalham. Dashboards, qualidade de dados e KPIs.</p>
              <div style="font-size: 11px; color: #6D28D9; font-weight: 600;">"Existe um jeito muito melhor de operar."</div>
            </div>
            <div class="guia-brand-card-old" style="border-top: 4px solid #F59E0B;">
              <span style="font-size: 11px; font-weight: 800; color: #F59E0B; text-transform: uppercase;">Capítulo 4 — Semana 4</span>
              <h4 style="margin: 4px 0 6px 0; font-size: 15px; color: #0F172A;">LIDERANÇA</h4>
              <p style="font-size: 12.5px; color: #475569; margin: 0 0 8px 0;">Posicionar o Fiscal na estratégia. Gestor fiscal, dados, diretoria e IA.</p>
              <div style="font-size: 11px; color: #B45309; font-weight: 600;">"O Fiscal pode ser estratégico para a empresa."</div>
            </div>
          </div>
          
          <!-- As Regras de Ouro (O Que NÃO Fazer) -->
          <div style="background: #FEF2F2; border: 1px solid #FECACA; padding: 20px; border-radius: 14px; margin-top: 28px;">
            <h4 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 800; color: #991B1B;">🚫 As Regras de Ouro de Setembro (O que NUNCA MAIS faremos)</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 13px; color: #7F1D1D;">
              <div>
                <strong>❌ Proibido em Nossas Redes:</strong>
                <ul style="margin: 4px 0 0 0; padding-left: 16px; line-height: 1.5;">
                  <li>"Conheça nossa nova funcionalidade." / "Veja essa atualização."</li>
                  <li>"Agora temos integração." / "Mais uma rotina disponível."</li>
                </ul>
              </div>
              <div>
                <strong>✅ A Regra Infalível de Publicação:</strong>
                <div style="background: #FFF; border: 1px solid #FCA5A5; padding: 10px; border-radius: 8px; margin-top: 4px; font-weight: 600; color: #991B1B;">
                  Nível atual ➜ Mostramos o gargalo ➜ Ensinamos como evoluir ➜ Mostramos como a SAAM acelera.
                </div>
              </div>
            </div>
            
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px dashed #FCA5A5;">
               <strong style="color: #7F1D1D; display: block; margin-bottom: 6px;">🎯 Novo CTA: Pare de falar do sistema.</strong>
               <em>"Descubra seu próximo nível"</em> • <em>"Avalie sua operação"</em> • <em>"Qual é o próximo passo da sua empresa?"</em>
            </div>
          </div>

        </div>
      </details>
`;

html = html.replace(sepRegex, newSeptemberHtml + '\n');
fs.writeFileSync('index.html', html, 'utf-8');
console.log('September campaign injected successfully');
