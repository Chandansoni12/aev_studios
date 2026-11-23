const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('assets/js/aev-gsap.js', 'utf8');

const classMatches = js.matchAll(/querySelector(?:All)?\(['"]\.([a-zA-Z0-9_-]+)/g);
const checked = new Set();
let anyMissing = false;
for (const m of classMatches) {
  const cls = m[1];
  if (checked.has(cls)) continue;
  checked.add(cls);
  const exists = html.includes(cls);
  if (!exists) {
    console.log('CLASS MISSING: .' + cls);
    anyMissing = true;
  }
}
if (!anyMissing) {
  console.log('All querySelector classes in aev-gsap.js exist in index.html!');
}
