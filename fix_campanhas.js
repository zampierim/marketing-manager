const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// The block to replace is in #page-campanhas. We can just run global replaces for the Playbook terms
// that we missed, and replace the old playbook classes.

// Rename "PLAYBOOK DE POSICIONAMENTO & MARCA SAAM" and similar text in the Campanhas tab.
html = html.replace(/PLAYBOOK DE POSICIONAMENTO/g, 'GUIA DE POSICIONAMENTO');
html = html.replace(/PLAYBOOK EDITORIAL DE MARCA SAAM/g, 'GUIA EDITORIAL DE MARCA SAAM');
html = html.replace(/PLAYBOOK EDITORIAL COMPLETO/g, 'GUIA EDITORIAL COMPLETO');
html = html.replace(/Playbook Editorial Anual/g, 'Guia Editorial Anual');
html = html.replace(/Playbook de Posicionamento/g, 'Guia de Posicionamento');

// Replace the old CSS classes inside the Campanhas section with the new Guia classes.
// Note: We'll replace `.playbook-hero` with `.guia-brand-hero`, and `.playbook-card` with `.guia-brand-card`.
html = html.replace(/<div class="playbook-hero"[^>]*>/g, '<div class="guia-brand-hero">');
// Note: The previous regex misses because of the style attribute.
html = html.replace(/<div class="playbook-hero" style="background: linear-gradient[^>]+>/g, '<div class="guia-brand-hero">');

// For the cards, they had inline styles for borders like `style="border-left: 4px solid #4F46E5;"`
// We'll replace the class but keep the inline border for accent if we want, OR just standardize them.
// Let's strip the border-left inline style to make them all perfectly white cards as the user wanted "not a bunch of colors".
html = html.replace(/<div class="playbook-card" style="border-left: 4px solid [^"]+">/g, '<div class="guia-brand-card">');
html = html.replace(/<div class="playbook-card" style="border-top: 4px solid [^"]+">/g, '<div class="guia-brand-card">');
html = html.replace(/<div class="playbook-card" style="border-left: 4px solid [^;]+; background: [^"]+">/g, '<div class="guia-brand-card">');
html = html.replace(/<div class="playbook-card">/g, '<div class="guia-brand-card">');

// Replace grid classes so they inherit our styling or keep them (they are just layout grids)
// actually the grids were `.playbook-grid-2`. I'll just leave the grid class names as they are structural.
// Wait, the grid classes are defined in the Campanhas <style> block too.
html = html.replace(/\.playbook-hero/g, '.guia-brand-hero');
html = html.replace(/\.playbook-quote/g, '.guia-brand-quote');
html = html.replace(/\.playbook-grid/g, '.guia-brand-grid');
html = html.replace(/\.playbook-card/g, '.guia-brand-card-old'); // To rename the old CSS block that might interfere

// Let's also fix the old quote blocks inside the Guia section of Campaigns
html = html.replace(/<div class="playbook-quote"[^>]*>/g, '<div class="guia-brand-quote">');
html = html.replace(/<div class="playbook-quote">/g, '<div class="guia-brand-quote">');

// Apply some CSS for .guia-brand-quote in the main style block if missing, or we can just leave it as is if it relies on the old one.
// Let's inject .guia-brand-quote to the <style> in Campanhas.
if (!html.includes('.guia-brand-quote { background:')) {
  html = html.replace('</style>', `
        .guia-brand-quote {
          background: rgba(124, 58, 237, 0.1);
          border-left: 4px solid #7C3AED;
          padding: 16px 20px;
          border-radius: 0 12px 12px 0;
          font-size: 14.5px;
          font-weight: 600;
          color: #5B21B6;
          margin-top: 16px;
        }
      </style>`);
}


fs.writeFileSync('index.html', html, 'utf-8');
console.log("Cleaned up Campaigns section");
