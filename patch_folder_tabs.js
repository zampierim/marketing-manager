const fs = require('fs');

// --- 1. MODIFY INDEX.HTML ---
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<!-- VIEW: IDEIAS POR MÊS -->[\s\S]+?<span style="background: #FFFBEB; color: #D97706; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; font-family: 'Roboto', sans-serif;">🎯 OPORTUNIDADE DE CAMPANHA<\/span>\s*<\/div>/i;

const replacement = `<!-- VIEW: IDEIAS POR MÊS -->
      <div id="view-ideias-mes" style="margin-top: 12px;">
        
        <!-- Folder Tabs (resting directly on card boundary) -->
        <div id="ideas-months-pills" style="display: flex; gap: 4px; margin-bottom: -1px; position: relative; z-index: 2; padding-left: 16px; align-items: flex-end;">
          <button type="button" class="ideas-month-pill" onclick="changeIdeasMonth(7)" data-month="7" style="border-top-left-radius: 12px; border-top-right-radius: 12px; padding: 10px 24px; font-weight: 800; font-size: 12px; cursor: pointer; font-family: 'Roboto', sans-serif; text-transform: uppercase; border: 1px solid #CBD5E1; border-bottom: none; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); outline: none;">Agosto</button>
          <button type="button" class="ideas-month-pill" onclick="changeIdeasMonth(8)" data-month="8" style="border-top-left-radius: 12px; border-top-right-radius: 12px; padding: 10px 24px; font-weight: 800; font-size: 12px; cursor: pointer; font-family: 'Roboto', sans-serif; text-transform: uppercase; border: 1px solid #CBD5E1; border-bottom: none; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); outline: none;">Setembro</button>
          <button type="button" class="ideas-month-pill" onclick="changeIdeasMonth(9)" data-month="9" style="border-top-left-radius: 12px; border-top-right-radius: 12px; padding: 10px 24px; font-weight: 800; font-size: 12px; cursor: pointer; font-family: 'Roboto', sans-serif; text-transform: uppercase; border: 1px solid #CBD5E1; border-bottom: none; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); outline: none;">Outubro</button>
          <button type="button" class="ideas-month-pill" onclick="changeIdeasMonth(10)" data-month="10" style="border-top-left-radius: 12px; border-top-right-radius: 12px; padding: 10px 24px; font-weight: 800; font-size: 12px; cursor: pointer; font-family: 'Roboto', sans-serif; text-transform: uppercase; border: 1px solid #CBD5E1; border-bottom: none; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); outline: none;">Novembro</button>
          <button type="button" class="ideas-month-pill" onclick="changeIdeasMonth(11)" data-month="11" style="border-top-left-radius: 12px; border-top-right-radius: 12px; padding: 10px 24px; font-weight: 800; font-size: 12px; cursor: pointer; font-family: 'Roboto', sans-serif; text-transform: uppercase; border: 1px solid #CBD5E1; border-bottom: none; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); outline: none;">Dezembro</button>
        </div>

        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-top: 6px solid #26428B; border-radius: 0 16px 16px 16px; padding: 28px; box-shadow: var(--shadow-sm); margin-bottom: 24px; position: relative; z-index: 1; transition: border-top-color 0.25s ease;" id="ideas-header-card">
          <div style="margin-bottom: 24px; border-bottom: 1px solid var(--hairline); padding-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="background: #FFFBEB; color: #D97706; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; font-family: 'Roboto', sans-serif;">🎯 OPORTUNIDADE DE CAMPANHA</span>
            </div>`;

if (regex.test(html)) {
  html = html.replace(regex, replacement);
  console.log("index.html successfully updated with folder tab structure via regex!");
} else {
  console.error("Could not match regex in index.html!");
  process.exit(1);
}

fs.writeFileSync('index.html', html, 'utf8');

// --- 2. MODIFY APP.JS ---
let code = fs.readFileSync('app.js', 'utf8');

const oldAppPillsStyle = `  // Update month pills active state
  const pills = document.querySelectorAll(".ideas-month-pill");
  pills.forEach(p => {
    const mVal = parseInt(p.getAttribute("data-month"));
    if (mVal === month) {
      p.classList.add("active");
      p.style.background = "#26428B";
      p.style.color = "#FFFFFF";
      p.style.borderColor = "#26428B";
    } else {
      p.classList.remove("active");
      p.style.background = "#FFFFFF";
      p.style.color = "#475569";
      p.style.borderColor = "#CBD5E1";
    }
  });`;

const newAppPillsStyle = `  const monthColors = {
    7: "#26428B", // Agosto
    8: "#059669", // Setembro
    9: "#EA580C", // Outubro
    10: "#1E3A8A", // Novembro
    11: "#BE185D"  // Dezembro
  };
  const activeColor = monthColors[month] || "#26428B";

  // Update card border top color
  const headerCard = document.getElementById("ideas-header-card");
  if (headerCard) {
    headerCard.style.borderTopColor = activeColor;
  }

  // Update month pills active state (styled as folder tabs)
  const pills = document.querySelectorAll(".ideas-month-pill");
  pills.forEach(p => {
    const mVal = parseInt(p.getAttribute("data-month"));
    if (mVal === month) {
      p.classList.add("active");
      p.style.background = activeColor;
      p.style.color = "#FFFFFF";
      p.style.borderColor = activeColor;
      p.style.padding = "12px 28px";
      p.style.boxShadow = "0 -4px 10px rgba(0,0,0,0.05)";
      p.style.zIndex = "3";
    } else {
      p.classList.remove("active");
      p.style.background = "#E2E8F0";
      p.style.color = "#64748B";
      p.style.borderColor = "#CBD5E1";
      p.style.padding = "10px 24px";
      p.style.boxShadow = "none";
      p.style.zIndex = "1";
    }
  });`;

if (code.includes(oldAppPillsStyle)) {
  code = code.replace(oldAppPillsStyle, newAppPillsStyle);
  console.log("app.js renderIdeasStrategy updated with folder tabs styles.");
} else {
  // CRLF check
  const oldAppPillsStyleCRLF = oldAppPillsStyle.replace(/\n/g, '\r\n');
  const newAppPillsStyleCRLF = newAppPillsStyle.replace(/\n/g, '\r\n');
  if (code.includes(oldAppPillsStyleCRLF)) {
    code = code.replace(oldAppPillsStyleCRLF, newAppPillsStyleCRLF);
    console.log("app.js renderIdeasStrategy updated with folder tabs styles (CRLF).");
  } else {
    console.error("Could not find oldAppPillsStyle block in app.js!");
    process.exit(1);
  }
}

fs.writeFileSync('app.js', code, 'utf8');
console.log("app.js successfully patched!");
