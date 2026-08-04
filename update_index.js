const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// 1. Rename 'Playbook Editorial SAAM' to 'Guia SAAM'
html = html.replace(/Playbook Editorial SAAM/g, 'Guia Editorial SAAM');

// 2. Add brand classes to style block if not present
if (!html.includes('.guia-brand-hero')) {
  const styleAdd = `
      /* High Contrast Design System Tokens */
      .guia-brand-hero {
        background: #0F172A;
        color: #FFFFFF;
        padding: 28px;
        border-radius: 16px;
        border-left: 6px solid #7C3AED;
        box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.2);
        margin-bottom: 24px;
      }
      .guia-brand-hero h3 {
        color: #FFFFFF;
        font-size: 24px;
        font-weight: 800;
        margin: 0 0 10px 0;
      }
      .guia-brand-hero p {
        color: #CBD5E1;
        font-size: 15px;
        line-height: 1.6;
        margin: 0;
      }
      .guia-brand-card {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 14px;
        padding: 24px;
        box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
      }
      .guia-brand-card h4 {
        color: #0F172A;
        font-family: 'Manrope', sans-serif;
        font-weight: 800;
        font-size: 16px;
        margin: 0 0 12px 0;
      }
      .guia-brand-card p, .guia-brand-card li, .guia-brand-card span {
        color: #334155;
        font-size: 13.5px;
        line-height: 1.6;
      }
      .chap-content-section p, 
      .chap-content-section li, 
      .chap-content-section span {
        color: #334155;
      }
      .chap-content-section h3, 
      .chap-content-section h4, 
      .chap-content-section h5 {
        color: #0F172A;
        font-family: 'Manrope', sans-serif;
      }
`;
  html = html.replace('/* High Contrast Design System Tokens */', styleAdd);
}

// 3. Clean up the inline styles of all chapters hero sections
// Find all `<div style="background: linear-gradient... padding: 28px; border-radius: 16px; color: #FFF;">`
html = html.replace(/<div style="background: linear-gradient[^>]+>/g, '<div class="guia-brand-hero">');

// Strip out inline styles from the pill badges inside hero
html = html.replace(/<span class="pill-badge[^>]+>([^<]+)<\/span>/g, '<span class="pill-badge" style="background: rgba(124,58,237,0.2); color: #C4B5FD; border: 1px solid #7C3AED; margin-bottom: 8px;">$1</span>');

// Replace old box styles like `<div style="background: #FFF; border: 1px solid var(--hairline); padding: 20px; border-radius: 14px; border-left: 4px solid #4F46E5;">`
// With uniform sleek design
html = html.replace(/<div style="background: #FFF; border: 1px solid var\(--hairline\); padding: 20px; border-radius: 14px; border-left: 4px solid [^"]+">/g, '<div class="guia-brand-card">');
html = html.replace(/<div style="background: #FFF; border: 1px solid var\(--hairline\); padding: 24px; border-radius: 14px;">/g, '<div class="guia-brand-card">');

// Clean up H4 inline styles in the cards (e.g. `color: #3730A3`)
html = html.replace(/<h4 style="margin: 0 0 6px 0; color: #[0-9A-Fa-f]{6};">/g, '<h4>');
html = html.replace(/<h4 style="margin: 0 0 14px 0; color: #0F172A;">/g, '<h4>');

// For paragraph in the grid, remove inline styles so they inherit `.guia-brand-card p`
html = html.replace(/<p style="margin: 0; font-size: 13px; color: #475569;">/g, '<p>');

fs.writeFileSync('index.html', html, 'utf-8');
console.log("Updated index.html UI");
