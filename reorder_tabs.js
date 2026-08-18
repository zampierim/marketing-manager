const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startTag = '<div class="tabs" id="home-menu">';
const endTag = '</div>\r\n    </div>\r\n\r\n    <!-- P\xE1gina do Calend\xE1rio -->'; // Might not match exactly

// Let's parse with regex
let match = html.match(/<div class="tabs" id="home-menu">([\s\S]*?)<\/div>\s*<\/div>\s*<!--/);
if(!match) {
  match = html.match(/<div class="tabs" id="home-menu">([\s\S]*?)\n    <\/div>\s*<\/div>/);
}

if(match) {
  let tabsContent = match[0];
  // extract each button
  const btns = [];
  const regex = /<button type="button" class="tab-btn[^>]* id="btn-tab-(.*?)">[\s\S]*?<\/button>/g;
  let btnMatch;
  const btnMap = {};
  while((btnMatch = regex.exec(tabsContent)) !== null) {
    btnMap[btnMatch[1]] = btnMatch[0];
  }

  // Define new order
  const newOrder = ['colaboracao', 'calendario', 'rotinas', 'ideias', 'excelencia', 'campanhas'];

  // Add padlock to calendario and rotinas
  const padlockHtml = '<span style="font-size: 16px; opacity: 0.8;" title="Acesso restrito">??</span>\n          <span style="display: flex; align-items: center; gap: 4px;">Abrir <svg';
  
  // modify calendario
  if (btnMap['calendario']) {
    btnMap['calendario'] = btnMap['calendario']
      .replace(/<span class="tab-arrow">Abrir\s*<svg/, '<span class="tab-arrow" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">\n          ' + padlockHtml);
  }

  // modify rotinas
  if (btnMap['rotinas']) {
    btnMap['rotinas'] = btnMap['rotinas']
      .replace(/<span class="tab-arrow">Abrir\s*<svg/, '<span class="tab-arrow" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">\n          ' + padlockHtml);
  }

  let newTabsContent = '<div class="tabs" id="home-menu">\n';
  for(const id of newOrder) {
    if(btnMap[id]) newTabsContent += '      ' + btnMap[id] + '\n';
  }
  
  // find what's after the buttons
  let afterBtns = tabsContent.substring(tabsContent.lastIndexOf('</button>') + 9);
  newTabsContent += afterBtns;

  html = html.replace(match[0], newTabsContent);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log("Success");
} else {
  console.log("Could not find tabs menu");
}
