// Před buildem (GitHub Actions): z nejnovějšího vydání v Releases tohohle repa (tam ho při každé nové verzi nahraje
// workflow ClipFarm .exe) stáhne CHANGELOG.md do content/ a údaje o instalačce do content/latest-release.json.
// Chybějící datum nejnovější verze doplní z data vydání. Bez vydání nebo bez sítě nechá content/ beze změny.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO = process.env.GITHUB_REPOSITORY || 'tomaseckhardt/ClipFarm-web';
const content = resolve(import.meta.dirname, '../content');
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'clipfarm-web-build' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers });
if (!res.ok) { console.log(`Žádné vydání (${res.status}), content/ beze změny.`); process.exit(0); }
const rel = await res.json();
const asset = (name) => rel.assets.find((a) => a.name === name);
const setup = asset('ClipFarm-Setup.exe');
const log = asset('CHANGELOG.md');

if (log) {
  const md = await (await fetch(log.browser_download_url)).text();
  if (!/^## v\d/m.test(md)) throw new Error('Stažený CHANGELOG.md nevypadá jako changelog ClipFarmu.');
  writeFileSync(resolve(content, 'CHANGELOG.md'), md);
  const version = rel.tag_name; // vX.XX.XX
  const datesFile = resolve(content, 'release-dates.json');
  const dates = JSON.parse(readFileSync(datesFile, 'utf8'));
  const head = new RegExp(`^## ${version.replace(/\./g, '\\.')}\\s*$`, 'm'); // nadpis bez data
  if (head.test(md) && !dates[version]) {
    dates[version] = rel.published_at.slice(0, 10);
    writeFileSync(datesFile, JSON.stringify(dates, null, 2) + '\n');
  }
}
if (setup) {
  writeFileSync(resolve(content, 'latest-release.json'), JSON.stringify({
    version: rel.tag_name, date: rel.published_at.slice(0, 10), size: setup.size,
    sha256: setup.digest?.replace(/^sha256:/, '') ?? null,
  }, null, 2) + '\n');
}
console.log(`Vydání ${rel.tag_name}: changelog ${log ? 'ano' : 'ne'}, instalačka ${setup ? 'ano' : 'ne'}.`);
