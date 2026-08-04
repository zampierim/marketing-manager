const fs = require('fs');
const lines = fs.readFileSync('C:\\Users\\Zampierim\\.gemini\\antigravity\\brain\\089578d8-5d5a-4d7d-a4b9-6100efdde54a\\.system_generated\\logs\\transcript_full.jsonl', 'utf8').split('\n');
const step = lines.find(l => l.includes('"step_index":1505'));
if(step) {
  const data = JSON.parse(step);
  fs.writeFileSync('dec.txt', data.content, 'utf8');
}
