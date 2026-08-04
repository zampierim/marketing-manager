const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// Update old "redes_sociais" and "Redes" destiny values in the defaultPosts
// Alternate between instagram and linkedin for social posts
let socialCount = 0;
code = code.replace(/"destiny"\s*:\s*"(?:redes_sociais|Redes)"/g, () => {
  socialCount++;
  return socialCount % 2 === 0 ? '"destiny": "linkedin"' : '"destiny": "instagram"';
});

// Update "interno" (keep as is, already correct)
// Update Blog posts - some WhatsApp ones become blog
code = code.replace(/"destiny"\s*:\s*"WhatsApp"/g, '"destiny": "blog"');
code = code.replace(/"destiny"\s*:\s*"YouTube"/g, '"destiny": "blog"');

fs.writeFileSync('app.js', code);
console.log('Destiny values updated. Social count:', socialCount);
