const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// Update openModal signature
code = code.replace(/function openModal\(post = null, prefilledDate = "", prefilledIdeaId = ""\) \{/, 'function openModal(post = null, prefilledDate = "", prefilledIdeaId = "", prefilledType = "") {');

code = code.replace(/requirePassword\(\(\) => openModal\(post, prefilledDate, prefilledIdeaId\)\);/, 'requirePassword(() => openModal(post, prefilledDate, prefilledIdeaId, prefilledType));');

// Let's find the else block inside openModal
let elseIndex = code.indexOf('} else {', code.indexOf('if (post) {'));
if (elseIndex !== -1) {
    let blockStart = code.indexOf('document.getElementById("post-author").value = "";', elseIndex);
    if (blockStart !== -1) {
        // Find the next line
        let insertionPoint = code.indexOf('\n', blockStart) + 1;
        let addition = \
    if (prefilledType) {
      document.getElementById("post-type").value = prefilledType;
      document.getElementById("post-type").dispatchEvent(new Event('change'));
    } else {
      document.getElementById("post-type").value = "Editorial";
      document.getElementById("post-type").dispatchEvent(new Event('change'));
    }
\;
        code = code.slice(0, insertionPoint) + addition + code.slice(insertionPoint);
    }
}

fs.writeFileSync('app.js', code, 'utf8');
console.log("Success");
