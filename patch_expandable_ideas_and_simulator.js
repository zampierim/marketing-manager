const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// --- 1. REPLACE SIMULATOR BLOCK IN INDEX.HTML ---
const startSimMarker = '<!-- Simulador Interativo de Metas de Posts -->';
const endSimMarker = '</div>\n      </div>\n      \n      <!-- VIEW: BANCO GERAL -->'; // Matches the end of view-ideias-mes block

const startSimIndex = html.indexOf(startSimMarker);
const endSimIndex = html.indexOf(endSimMarker);

if (startSimIndex === -1 || endSimIndex === -1) {
  console.error("Could not locate simulator boundaries in index.html");
  process.exit(1);
}

const newSimulatorHtml = `<!-- Simulador Interativo de Metas de Posts Redesenhado -->
        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 32px; box-shadow: var(--shadow-sm); margin-top: 24px;">
          <div style="border-bottom: 1px solid var(--hairline); padding-bottom: 18px; margin-bottom: 24px;">
            <h4 style="margin: 0 0 6px 0; font-size: 20px; color: #0A1C2D; font-weight: 800; font-family: 'Outfit', sans-serif;">🧮 Calculadora de Distribuição Editorial do Mês</h4>
            <p style="margin: 0; font-size: 13.5px; color: #64748B; font-family: 'Poppins', sans-serif;">Ajuste o número de publicações mensais estimadas e veja como distribuir os temas no funil de marketing da SAAM:</p>
          </div>

          <div style="display: flex; gap: 32px; align-items: flex-start; flex-wrap: wrap;">
            <!-- Controles -->
            <div style="flex: 1; min-width: 250px; background: #F8F6F7; padding: 24px; border-radius: 12px; border: 1px solid #CBD5E1;">
              <label style="font-size: 13px; font-weight: 800; color: #0A1C2D; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 10px; font-family: 'Roboto', sans-serif;">Meta de Publicações no Mês</label>
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <input type="number" id="ideas-sim-total" value="20" min="1" max="100" oninput="updateIdeasSimulation()" style="width: 90px; padding: 12px 16px; border-radius: 8px; border: 1px solid #CBD5E1; font-weight: 800; font-size: 20px; text-align: center; color: #0A1C2D; outline: none; background: #FFF;">
                <span style="font-size: 15px; font-weight: 700; color: #26428B; font-family: 'Roboto', sans-serif;">Posts Totais</span>
              </div>
              <p style="margin: 0; font-size: 12.5px; color: #475569; line-height: 1.5; font-family: 'Poppins', sans-serif;">
                👉 <strong>Regra recomendada:</strong> Para marcas B2B de tecnologia e inteligência fiscal como o SAAM, o ideal é manter uma constância de pelo menos 12 a 20 publicações por mês (2 a 4 posts por semana) distribuídos equilibradamente.
              </p>
            </div>

            <!-- Resultados Explicativos -->
            <div style="flex: 2; min-width: 350px; display: flex; flex-direction: column; gap: 16px;">
              
              <!-- Atração -->
              <div style="display: flex; align-items: center; gap: 16px; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px;">
                <div style="background: #DAEDF4; min-width: 60px; height: 60px; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <strong style="font-size: 24px; color: #26428B; font-family: 'Outfit', sans-serif; line-height: 1;" id="sim-val-1">8</strong>
                  <span style="font-size: 9px; font-weight: 800; color: #26428B; font-family: 'Roboto', sans-serif;">POSTS</span>
                </div>
                <div style="flex: 1;">
                  <strong style="font-size: 14px; color: #0A1C2D; font-family: 'Outfit', sans-serif; display: block;" id="sim-lbl-1">Atração (40%)</strong>
                  <p style="margin: 4px 0 0 0; font-size: 12.5px; color: #475569; line-height: 1.4; font-family: 'Poppins', sans-serif;">
                    Foco em engajar e trazer novos seguidores. Reels, carrosséis curtos de dores fiscais cotidianas ou notícias rápidas do Radar Fiscal.
                  </p>
                </div>
              </div>

              <!-- Conversão -->
              <div style="display: flex; align-items: center; gap: 16px; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px;">
                <div style="background: #FBECD7; min-width: 60px; height: 60px; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <strong style="font-size: 24px; color: #D97706; font-family: 'Outfit', sans-serif; line-height: 1;" id="sim-val-2">6</strong>
                  <span style="font-size: 9px; font-weight: 800; color: #D97706; font-family: 'Roboto', sans-serif;">POSTS</span>
                </div>
                <div style="flex: 1;">
                  <strong style="font-size: 14px; color: #0A1C2D; font-family: 'Outfit', sans-serif; display: block;" id="sim-lbl-2">Conversão (30%)</strong>
                  <p style="margin: 4px 0 0 0; font-size: 12.5px; color: #475569; line-height: 1.4; font-family: 'Poppins', sans-serif;">
                    Foco comercial e de autoridade. Apresentações de cases, PDFs explicativos de ROI e chamadas para demonstração gratuita do sistema.
                  </p>
                </div>
              </div>

              <!-- Retenção -->
              <div style="display: flex; align-items: center; gap: 16px; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px;">
                <div style="background: #ECFDF5; min-width: 60px; height: 60px; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <strong style="font-size: 24px; color: #059669; font-family: 'Outfit', sans-serif; line-height: 1;" id="sim-val-3">4</strong>
                  <span style="font-size: 9px; font-weight: 800; color: #059669; font-family: 'Roboto', sans-serif;">POSTS</span>
                </div>
                <div style="flex: 1;">
                  <strong style="font-size: 14px; color: #0A1C2D; font-family: 'Outfit', sans-serif; display: block;" id="sim-lbl-3">Retenção (20%)</strong>
                  <p style="margin: 4px 0 0 0; font-size: 12.5px; color: #475569; line-height: 1.4; font-family: 'Poppins', sans-serif;">
                    Foco na base de clientes ativos. Dicas de uso avançado, atalhos de ferramentas, novidades da plataforma e tutoriais rápidos.
                  </p>
                </div>
              </div>

              <!-- Institucional -->
              <div style="display: flex; align-items: center; gap: 16px; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px;">
                <div style="background: #FFFBEB; min-width: 60px; height: 60px; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <strong style="font-size: 24px; color: #D97706; font-family: 'Outfit', sans-serif; line-height: 1;" id="sim-val-4">2</strong>
                  <span style="font-size: 9px; font-weight: 800; color: #D97706; font-family: 'Roboto', sans-serif;">POSTS</span>
                </div>
                <div style="flex: 1;">
                  <strong style="font-size: 14px; color: #0A1C2D; font-family: 'Outfit', sans-serif; display: block;" id="sim-lbl-4">Institucional (10%)</strong>
                  <p style="margin: 4px 0 0 0; font-size: 12.5px; color: #475569; line-height: 1.4; font-family: 'Poppins', sans-serif;">
                    Foco em conexão e employer branding. Fotos e depoimentos da equipe, valores da empresa e celebração de datas do mercado fiscal.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>`;

html = html.substring(0, startSimIndex) + newSimulatorHtml + html.substring(endSimIndex);
fs.writeFileSync('index.html', html, 'utf8');
console.log("index.html updated with descriptive simulator!");
