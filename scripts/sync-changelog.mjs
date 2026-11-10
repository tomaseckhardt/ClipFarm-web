// Zkopíruje CHANGELOG.md z repa aplikace do content/CHANGELOG.md (z něj se při buildu generuje stránka Novinky)
// a do content/release-dates.json zapíše data vydání verzí, které v changelogu datum nemají
// (den commitu, který nadpis „## vX.XX.XX“ do CHANGELOG.md přidal – git log -S).
// Cesta k repu: první argument, proměnná CLIPFARM_DIR, nebo ../ClipFarm vedle tohohle repa. Repo aplikace jen čte.
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const app = resolve(process.argv[2] ?? process.env.CLIPFARM_DIR ?? resolve(root, '../ClipFarm'));
const src = resolve(app, 'CHANGELOG.md');
copyFileSync(src, resolve(root, 'content/CHANGELOG.md'));
console.log(`content/CHANGELOG.md ← ${src}`);

const dates = {};
for (const [, v] of readFileSync(src, 'utf8').matchAll(/^## (v\d+\.\d+\.\d+)\s*$/gm)) {
  try {
    const out = execFileSync('git', ['-C', app, 'log', '--format=%as', `-S## ${v}`, '--', 'CHANGELOG.md'], { encoding: 'utf8' });
    const first = out.trim().split('\n').pop();
    if (first) dates[v] = first;
  } catch { /* není git: verze zůstane bez data */ }
}
writeFileSync(resolve(root, 'content/release-dates.json'), JSON.stringify(dates, null, 2) + '\n');
console.log(`content/release-dates.json: ${Object.keys(dates).length} verzí bez data v changelogu → ${JSON.stringify(dates)}`);
