import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseChangelog, inline, czDate } from './changelog.ts';

const sample = `# Změny

| tabulka | pravidel |

## Nevydáno

Nové:

- nevydaná věc

## v1.10.01

Úvod na dva
řádky.

Nové:

- **Tučně:** první
  pokračování
- druhá

Odebráno:

- macOS

## v1.01.01 – 2026-10-04

První číslovaná verze.

- **Zdroje:** \`kód\` <script>
`;

test('parsuje verze, skupiny, pokračování a přeskočí Nevydáno', () => {
  const r = parseChangelog(sample);
  assert.deepEqual(r.map((x) => x.version), ['v1.10.01', 'v1.01.01']);
  assert.equal(r[0].date, null);
  assert.deepEqual(r[0].intro, ['Úvod na dva řádky.']);
  assert.equal(r[0].groups[0].kind, 'new');
  assert.deepEqual(r[0].groups[0].items, ['**Tučně:** první pokračování', 'druhá']);
  assert.equal(r[0].groups[1].kind, 'removed');
  assert.equal(r[1].date, '2026-10-04');
  assert.equal(r[1].groups[0].title, null);
  assert.equal(r[1].id, 'v1-01-01');
});

test('inline escapuje HTML a povolí jen tučně a kód', () => {
  assert.equal(inline('**a** `b` <script>'), '<strong>a</strong> <code>b</code> &lt;script&gt;');
  assert.equal(czDate('2026-11-02'), '2. 11. 2026');
});

test('skutečný content/CHANGELOG.md má verze a každá má obsah', () => {
  const r = parseChangelog(readFileSync(new URL('../../content/CHANGELOG.md', import.meta.url), 'utf8'));
  assert.ok(r.length >= 10);
  assert.match(r[0].version, /^v\d+\.\d{2}\.\d{2}$/);
  for (const x of r) assert.ok(x.groups.some((g) => g.items.length), x.version);
});

test('skryje odkazy na issue a vytáhne shrnutí z tučných začátků', async () => {
  const { stripIssueRefs, highlights } = await import('./changelog.ts');
  assert.equal(stripIssueRefs('Rychlejší (#55). Instalačka (#35–#39) a (#40, #41).'), 'Rychlejší. Instalačka a.');
  const [r] = parseChangelog('## v1.0.01\n\nOpravy:\n\n- **Oprava:** x\n\nNové:\n\n- **Pole kamery:** y (#55)\n- bez tučného\n');
  assert.deepEqual(highlights(r), ['Pole kamery', 'Oprava']);
});
