const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const target = `<div class="post-card-image">\n        <img src="\${imgUrl}" alt="\${post.tag}">\n        \${destinyBadge}`;
const replacement = `<div class="post-card-image">
        <img src="\${imgUrl}" alt="\${post.tag}">
        \${destinyBadge}
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.8) 100%); pointer-events: none; border-radius: 8px;"></div>
        <h4 style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #FFF; font-size: 14px; font-weight: 800; text-align: center; margin: 0; width: 90%; z-index: 2; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">\${post.title || post.tag}</h4>
`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    // Remove the old z-index override if it was there, add z-index to info
    code = code.replace('<div class="post-card-info" style="display: flex; align-items: center;">', '<div class="post-card-info" style="display: flex; align-items: center; z-index: 2; position: relative;">');
    fs.writeFileSync('app.js', code);
    console.log("Card UI updated.");
} else {
    console.log("Target not found!");
}
