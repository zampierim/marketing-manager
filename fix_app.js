const fs = require('fs');

// Fix app.js
let code = fs.readFileSync('app.js', 'utf8');
code = code.replace(/\]\];/g, '];');
fs.writeFileSync('app.js', code);

// Fix inject_december.js
let injectCode = fs.readFileSync('inject_december.js', 'utf8');
injectCode = injectCode.replace('code.substring(endIndex);', 'code.substring(endIndex + 1);');
fs.writeFileSync('inject_december.js', injectCode);

console.log('Fixed syntax error in app.js and fixed bug in inject_december.js');
