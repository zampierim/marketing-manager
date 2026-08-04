const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const octRegex = /<!-- PRÓXIMO MÊS: OUTUBRO \(ACCORDION\) -->[\s\S]*?(?=<\/div>\s*<!-- FOOTER -->|<\/div>\s*<\/div>\s*<script>)/;

const newOctoberHtml = `<!-- PRÓXIMO MÊS: OUTUBRO (ACCORDION) -->
      <details style="background: var(--bg); border: 1px solid var(--hairline); border-radius: 16px; border-left: 6px solid #EA580C; margin-bottom: 24px; overflow: hidden; box-shadow: var(--shadow-sm);" class="campaign-accordion">
        <summary style="padding: 24px 28px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; list-style: none; outline: none; background: #FFFFFF;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span class="pill-badge" style="background: rgba(234,88,12,0.15); color: #C2410C; border: 1px solid #EA580C; margin-bottom: 8px;">🟠 Conclusão do Arco</span>
              <span style="font-size: 12px; font-weight: 700; color: var(--ink-soft);">GUIA EDITORIAL DE MARCA SAAM</span>
            </div>
            <h3 style="color: #0F172A; margin: 0; font-size: 24px; font-weight: 800; font-family: 'Manrope', sans-serif;">OUTUBRO 2026: A INTELIGÊNCIA QUE GERA RESULTADOS</h3>
          </div>
          <div style="display: flex; align-items: center; gap: 14px;">
            <span style="background: #EA580C; color: #FFF; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 800; letter-spacing: 0.5px;">ESTRATÉGIA DE PERFORMANCE</span>
            <svg class="chevron" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </summary>
        
        <div style="padding: 28px; border-top: 1px solid var(--hairline); background: #F8FAFC;">
          
          <!-- Manifesto Hero Banner -->
          <div class="guia-brand-hero" style="background: linear-gradient(135deg, #7C2D12 0%, #9A3412 100%);">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #FDBA74; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
              <span>🔥 Manifesto de Outubro</span>
            </div>
            <h3 style="color: #FFF; font-size: 20px; margin: 0 0 10px 0; font-weight: 800;">"Tecnologia não transforma empresas. Decisões inteligentes transformam."</h3>
            <p style="font-size: 15px; line-height: 1.6; color: #FFEDD5; margin: 0;">
              O departamento fiscal entra em uma nova fase: onde dados deixam de ser registros e passam a orientar decisões. Empresas maduras não trabalham apenas mais rápido, elas trabalham melhor. Porque cada processo gera informação, e toda inteligência gera resultado. O verdadeiro valor da tecnologia não está na automação. Está na capacidade de transformar informação em vantagem competitiva.
            </p>
            <div class="guia-brand-quote" style="background: rgba(255, 255, 255, 0.1); border-left: 4px solid #FB923C; color: #FED7AA;">
              ⚡ <strong>Missão de Outubro:</strong> Fazer o gestor pensar: <em>"Quanto minha empresa deixa de ganhar por não utilizar melhor seus próprios dados?"</em>
            </div>
          </div>

          <!-- Matriz de Mudança de Percepção (DE -> PARA) -->
          <div style="margin-bottom: 28px;">
            <h4 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 800; color: #0F172A;">🔄 A Mudança de Percepção (DE ➔ PARA)</h4>
            <div class="playbook-grid-2">
              <div class="guia-brand-card">
                <div style="font-weight: 800; font-size: 13px; color: #991B1B; margin-bottom: 8px;">❌ O Mercado Pensa Hoje:</div>
                <ul style="margin: 0; padding-left: 16px; font-size: 13px; color: #7F1D1D; line-height: 1.6;">
                  <li>Dados servem apenas para cumprir obrigações.</li>
                  <li>Relatórios ficam arquivados e KPIs são burocracia.</li>
                  <li>O Fiscal informa apenas o que aconteceu (passado).</li>
                  <li>Auditoria evita multas (reativo).</li>
                </ul>
              </div>
              <div class="guia-brand-card">
                <div style="font-weight: 800; font-size: 13px; color: #9A3412; margin-bottom: 8px;">✅ O Mercado Passará a Pensar com a SAAM:</div>
                <ul style="margin: 0; padding-left: 16px; font-size: 13px; color: #C2410C; line-height: 1.6;">
                  <li>Dados orientam decisões e KPIs mostram oportunidades.</li>
                  <li>Indicadores antecipam problemas.</li>
                  <li>O Fiscal influencia crescimento (futuro).</li>
                  <li>Auditoria protege caixa e gera vantagem competitiva.</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- A Matriz dos 3 Públicos Alvo -->
          <div style="margin-bottom: 28px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <h4 style="margin: 0; font-size: 16px; font-weight: 800; color: #0F172A;">🎯 Os 3 Públicos</h4>
              <span class="pill-badge" style="background: rgba(234,88,12,0.15); color: #C2410C; border: 1px solid #EA580C; margin-bottom: 8px;">Segmentação de Outubro</span>
            </div>
            <div class="playbook-grid-3">
              
              <div class="guia-brand-card">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <strong style="color: #1E40AF; font-size: 14px;">① LEAD FRIO</strong>
                </div>
                <p style="font-size: 12.5px; color: #475569; margin: 0 0 10px 0;"><strong>Valor dos Dados:</strong> Nunca pensou no fiscal como inteligência.</p>
                <div style="font-size: 12px; color: #1E3A8A; background: #EFF6FF; padding: 6px; border-radius: 6px;"><strong>Objetivo:</strong> "Nunca imaginei que o Fiscal pudesse gerar tanto valor."</div>
                <div style="font-size: 11px; color: #64748B; margin-top: 6px;">Séries: O Dado que Vale Milhões, Você Está Medindo Isso?</div>
              </div>

              <div class="guia-brand-card">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <strong style="color: #EA580C; font-size: 14px;">② LEAD QUENTE</strong>
                </div>
                <p style="font-size: 12.5px; color: #475569; margin: 0 0 10px 0;"><strong>Dados em Performance:</strong> Já possui processos. Quer resultados.</p>
                <div style="font-size: 12px; color: #9A3412; background: #FFF7ED; padding: 6px; border-radius: 6px;"><strong>Objetivo:</strong> "É exatamente esse tipo de gestão que buscamos."</div>
                <div style="font-size: 11px; color: #64748B; margin-top: 6px;">Séries: KPI da Semana, Dashboard Inteligente, Performance Fiscal.</div>
              </div>

              <div class="guia-brand-card">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <strong style="color: #059669; font-size: 14px;">③ CLIENTE BASE</strong>
                </div>
                <p style="font-size: 12.5px; color: #475569; margin: 0 0 10px 0;"><strong>Extraindo o Máximo:</strong> Utilizar recursos para gerar indicadores reais.</p>
                <div style="font-size: 12px; color: #064E3B; background: #ECFDF5; padding: 6px; border-radius: 6px;"><strong>Objetivo:</strong> "Estamos utilizando apenas parte da solução."</div>
                <div style="font-size: 11px; color: #64748B; margin-top: 6px;">Séries: Painéis Inteligentes, Casos de Performance, Evolução Contínua.</div>
              </div>

            </div>
          </div>
          
          <!-- PROPRIEDADES INTELECTUAIS -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px;">
            <div style="background: #FFF7ED; border: 1px solid #FFEDD5; padding: 24px; border-radius: 16px;">
               <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 800; color: #9A3412;">📊 Painel de Performance Fiscal SAAM</h4>
               <p style="margin: 0 0 16px 0; font-size: 13px; color: #C2410C;">Como medir se sua evolução realmente gera resultados? Todo conteúdo termina com um indicador:</p>
               <ul style="margin: 0; padding-left: 16px; font-size: 12.5px; color: #78350F; line-height: 1.6;">
                  <li><strong>Eficiência:</strong> Tempo médio de fechamento.</li>
                  <li><strong>Qualidade:</strong> Erros antes da transmissão.</li>
                  <li><strong>Produtividade:</strong> Horas economizadas.</li>
                  <li><strong>Segurança:</strong> Inconsistências evitadas.</li>
                  <li><strong>Inteligência:</strong> Indicadores acompanhados pela gestão.</li>
               </ul>
            </div>
            
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 24px; border-radius: 16px;">
               <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 800; color: #0F172A;">💎 Método P.D.R. SAAM</h4>
               <p style="margin: 0 0 16px 0; font-size: 13px; color: #475569;">Metodologia própria da marca que guiará os conteúdos profundos.</p>
               <ul style="margin: 0; padding-left: 16px; font-size: 12.5px; color: #334155; line-height: 1.6;">
                  <li><strong>P — Processar:</strong> Transformar dados operacionais em informações confiáveis.</li>
                  <li><strong>D — Decidir:</strong> Usar indicadores para orientar decisões estratégicas.</li>
                  <li><strong>R — Resultar:</strong> Medir produtividade, segurança, economia e evolução contínua.</li>
               </ul>
            </div>
          </div>

          <!-- Jornada Editorial Semanal -->
          <h4 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 800; color: #0F172A;">📖 A Jornada de Outubro em 4 Capítulos</h4>
          <div class="guia-brand-grid-4">
            <div class="guia-brand-card-old" style="border-top: 4px solid #10B981;">
              <span style="font-size: 11px; font-weight: 800; color: #10B981; text-transform: uppercase;">Capítulo 1</span>
              <h4 style="margin: 4px 0 6px 0; font-size: 15px; color: #0F172A;">DADOS QUE FALAM</h4>
              <p style="font-size: 12.5px; color: #475569; margin: 0 0 8px 0;">Mostrar que o fiscal produz inteligência. Dashboards, Informação, Decisão.</p>
              <div style="font-size: 11px; color: #047857; font-weight: 600;">"Nunca olhamos nossos dados dessa maneira."</div>
            </div>
            <div class="guia-brand-card-old" style="border-top: 4px solid #3B82F6;">
              <span style="font-size: 11px; font-weight: 800; color: #3B82F6; text-transform: uppercase;">Capítulo 2</span>
              <h4 style="margin: 4px 0 6px 0; font-size: 15px; color: #0F172A;">PERFORMANCE</h4>
              <p style="font-size: 12.5px; color: #475569; margin: 0 0 8px 0;">Ensinar como medir eficiência. KPIs, tempo, retrabalho e custos.</p>
              <div style="font-size: 11px; color: #1D4ED8; font-weight: 600;">"Precisamos acompanhar esses indicadores."</div>
            </div>
            <div class="guia-brand-card-old" style="border-top: 4px solid #8B5CF6;">
              <span style="font-size: 11px; font-weight: 800; color: #8B5CF6; text-transform: uppercase;">Capítulo 3</span>
              <h4 style="margin: 4px 0 6px 0; font-size: 15px; color: #0F172A;">DECISÕES</h4>
              <p style="font-size: 12.5px; color: #475569; margin: 0 0 8px 0;">Como dados apoiam gestores. Planejamento, liderança e tendências de IA.</p>
              <div style="font-size: 11px; color: #6D28D9; font-weight: 600;">"O Fiscal pode apoiar decisões estratégicas."</div>
            </div>
            <div class="guia-brand-card-old" style="border-top: 4px solid #F59E0B;">
              <span style="font-size: 11px; font-weight: 800; color: #F59E0B; text-transform: uppercase;">Capítulo 4</span>
              <h4 style="margin: 4px 0 6px 0; font-size: 15px; color: #0F172A;">RESULTADOS</h4>
              <p style="font-size: 12.5px; color: #475569; margin: 0 0 8px 0;">Provar que Inteligência gera valor. ROI, economia de tempo, crescimento.</p>
              <div style="font-size: 11px; color: #B45309; font-weight: 600;">"Agora faz sentido investir em Inteligência Fiscal."</div>
            </div>
          </div>
          
          <!-- As Regras de Ouro (O Que NÃO Fazer) -->
          <div style="background: #FEF2F2; border: 1px solid #FECACA; padding: 20px; border-radius: 14px; margin-top: 28px;">
            <h4 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 800; color: #991B1B;">🚫 As Regras de Ouro de Outubro (O que NUNCA MAIS faremos)</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 13px; color: #7F1D1D;">
              <div>
                <strong>❌ Proibido em Nossas Redes:</strong>
                <ul style="margin: 4px 0 0 0; padding-left: 16px; line-height: 1.5;">
                  <li>"Conheça nosso dashboard." / "Atualizamos os indicadores."</li>
                  <li>"Veja essa tela."</li>
                </ul>
              </div>
              <div>
                <strong>✅ A Regra Infalível de Publicação:</strong>
                <div style="background: #FFF; border: 1px solid #FCA5A5; padding: 10px; border-radius: 8px; margin-top: 4px; font-weight: 600; color: #991B1B;">
                  Existe um indicador ➜ Por que importa ➜ Como interpretar ➜ Como a Inteligência Fiscal SAAM melhora esse resultado.
                </div>
              </div>
            </div>
            
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px dashed #FCA5A5;">
               <strong style="color: #7F1D1D; display: block; margin-bottom: 6px;">🎯 Novo CTA: Provocação Executiva.</strong>
               <em>"Você mede esse indicador?"</em> • <em>"Que decisão tomaria com essa informação?"</em> • <em>"Sua empresa decide com dados ou com suposições?"</em>
            </div>
          </div>

        </div>
      </details>
`;

// Extract just the portion of HTML to replace the October placeholder
// I will just replace the exact match of the placeholder, or if it spans lines, use string matching.
let startIdx = html.indexOf('<!-- PRÓXIMO MÊS: OUTUBRO (ACCORDION) -->');
if (startIdx !== -1) {
    let endIdx = html.indexOf('</div>', startIdx); // We want to replace everything from the start up to the end of that block.
    // Actually the regex method is safer if I constructed it right.
    // The current October placeholder ends with </details>
    // Let's find </details> after startIdx
    let detailsEnd = html.indexOf('</details>', startIdx);
    if(detailsEnd !== -1) {
        let oldHtml = html.substring(startIdx, detailsEnd + 10);
        html = html.replace(oldHtml, newOctoberHtml);
        fs.writeFileSync('index.html', html, 'utf-8');
        console.log('October campaign injected successfully');
    } else {
        console.log('Could not find end of October accordion');
    }
} else {
    console.log('Could not find October placeholder');
}
