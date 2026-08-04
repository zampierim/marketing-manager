const fs = require('fs');

// --- 1. MODIFY INDEX.HTML ---
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<!-- VIEW: IDEIAS POR MÊS -->[\s\S]+?id="ideas-header-card">/i;

const replacement = `<!-- VIEW: IDEIAS POR MÊS -->
      <div id="view-ideias-mes" style="margin-top: 12px;">
        
        <!-- Unified Folder Tab Header Bar -->
        <div id="ideas-months-pills-container" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-bottom: none; border-top-left-radius: 16px; border-top-right-radius: 16px; padding: 12px 16px 0 16px; display: flex; align-items: flex-end; gap: 4px; margin-bottom: -1px; z-index: 2; position: relative;">
          <button type="button" class="ideas-month-pill" onclick="changeIdeasMonth(7)" data-month="7" style="border: 1px solid transparent; border-bottom: none; border-top-left-radius: 10px; border-top-right-radius: 10px; padding: 10px 20px; font-weight: 700; font-size: 12px; cursor: pointer; text-transform: uppercase; font-family: 'Outfit', sans-serif; transition: all 0.2s; outline: none; background: transparent; color: #64748B;">Agosto</button>
          <button type="button" class="ideas-month-pill" onclick="changeIdeasMonth(8)" data-month="8" style="border: 1px solid transparent; border-bottom: none; border-top-left-radius: 10px; border-top-right-radius: 10px; padding: 10px 20px; font-weight: 700; font-size: 12px; cursor: pointer; text-transform: uppercase; font-family: 'Outfit', sans-serif; transition: all 0.2s; outline: none; background: transparent; color: #64748B;">Setembro</button>
          <button type="button" class="ideas-month-pill" onclick="changeIdeasMonth(9)" data-month="9" style="border: 1px solid transparent; border-bottom: none; border-top-left-radius: 10px; border-top-right-radius: 10px; padding: 10px 20px; font-weight: 700; font-size: 12px; cursor: pointer; text-transform: uppercase; font-family: 'Outfit', sans-serif; transition: all 0.2s; outline: none; background: transparent; color: #64748B;">Outubro</button>
          <button type="button" class="ideas-month-pill" onclick="changeIdeasMonth(10)" data-month="10" style="border: 1px solid transparent; border-bottom: none; border-top-left-radius: 10px; border-top-right-radius: 10px; padding: 10px 20px; font-weight: 700; font-size: 12px; cursor: pointer; text-transform: uppercase; font-family: 'Outfit', sans-serif; transition: all 0.2s; outline: none; background: transparent; color: #64748B;">Novembro</button>
          <button type="button" class="ideas-month-pill" onclick="changeIdeasMonth(11)" data-month="11" style="border: 1px solid transparent; border-bottom: none; border-top-left-radius: 10px; border-top-right-radius: 10px; padding: 10px 20px; font-weight: 700; font-size: 12px; cursor: pointer; text-transform: uppercase; font-family: 'Outfit', sans-serif; transition: all 0.2s; outline: none; background: transparent; color: #64748B;">Dezembro</button>
        </div>

        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 0 0 16px 16px; padding: 28px; box-shadow: var(--shadow-sm); margin-bottom: 24px; position: relative; z-index: 1;" id="ideas-header-card">`;

if (regex.test(html)) {
  html = html.replace(regex, replacement);
  console.log("index.html successfully updated with unified folder header bar via regex!");
} else {
  console.error("Could not match regex in index.html!");
  process.exit(1);
}

fs.writeFileSync('index.html', html, 'utf8');

// --- 2. MODIFY APP.JS ---
let code = fs.readFileSync('app.js', 'utf8');

const oldAppPillsStyle = `  const monthColors = {
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

const newAppPillsStyle = `  const monthColors = {
    7: "#26428B", // Agosto
    8: "#059669", // Setembro
    9: "#EA580C", // Outubro
    10: "#1E3A8A", // Novembro
    11: "#BE185D"  // Dezembro
  };
  const activeColor = monthColors[month] || "#26428B";

  // Update month pills active state (styled as physical folder tabs inside container)
  const pills = document.querySelectorAll(".ideas-month-pill");
  pills.forEach(p => {
    const mVal = parseInt(p.getAttribute("data-month"));
    if (mVal === month) {
      p.classList.add("active");
      p.style.background = "#FFFFFF";
      p.style.color = activeColor;
      p.style.borderColor = "#E2E8F0";
      p.style.borderTop = "4px solid " + activeColor;
      p.style.borderBottom = "1px solid #FFFFFF";
      p.style.padding = "12px 26px";
      p.style.fontWeight = "900";
      p.style.zIndex = "4";
      p.style.marginBottom = "-1px";
    } else {
      p.classList.remove("active");
      p.style.background = "transparent";
      p.style.color = "#64748B";
      p.style.borderColor = "transparent";
      p.style.borderTop = "none";
      p.style.borderBottom = "none";
      p.style.padding = "10px 20px";
      p.style.fontWeight = "700";
      p.style.zIndex = "1";
      p.style.marginBottom = "0";
    }
  });`;

if (code.includes(oldAppPillsStyle)) {
  code = code.replace(oldAppPillsStyle, newAppPillsStyle);
  console.log("app.js renderIdeasStrategy updated with unified folder tabs design.");
} else {
  // CRLF check
  const oldAppPillsStyleCRLF = oldAppPillsStyle.replace(/\n/g, '\r\n');
  const newAppPillsStyleCRLF = newAppPillsStyle.replace(/\n/g, '\r\n');
  if (code.includes(oldAppPillsStyleCRLF)) {
    code = code.replace(oldAppPillsStyleCRLF, newAppPillsStyleCRLF);
    console.log("app.js renderIdeasStrategy updated with unified folder tabs design (CRLF).");
  } else {
    console.error("Could not find oldAppPillsStyle block in app.js!");
    process.exit(1);
  }
}

fs.writeFileSync('app.js', code, 'utf8');
console.log("app.js successfully patched!");
