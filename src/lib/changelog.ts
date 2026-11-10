// CHANGELOG.md aplikace → data pro stránku Novinky. Formát podle README ClipFarmu:
// „## vX.XX.XX – datum“, odstavce, nadpisy skupin „Nové:“, odrážky „- …“ s pokračováním odsazeným mezerami,
// z Markdownu jen **tučně** a `kód`. Sekce „## Nevydáno“ se přeskočí.

export type Group = { title: string | null; kind: 'new' | 'fix' | 'removed' | 'topic'; items: string[] };
export type Release = { version: string; id: string; date: string | null; intro: string[]; groups: Group[] };

const KINDS: Record<string, Group['kind']> = { 'Nové': 'new', 'Opravy': 'fix', 'Odebráno': 'removed' };

export function parseChangelog(md: string): Release[] {
  const releases: Release[] = [];
  let rel: Release | null = null;
  let group: Group | null = null;
  let last: 'item' | 'para' | null = null; // kam patří pokračovací řádek

  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd();
    const head = /^## (.+)$/.exec(line);
    if (head) {
      const m = /^(v\d+\.\d+\.\d+)(?:\s+[–-]\s+(\d{4}-\d{2}-\d{2}))?/.exec(head[1].trim());
      rel = m ? { version: m[1], id: m[1].replace(/\./g, '-'), date: m[2] ?? null, intro: [], groups: [] } : null;
      if (rel) releases.push(rel);
      group = null;
      last = null;
      continue;
    }
    if (!rel) continue; // pravidla nahoře a Nevydáno
    if (!line.trim()) { last = null; continue; }

    if (line.startsWith('- ')) {
      if (!group) { group = { title: null, kind: 'topic', items: [] }; rel.groups.push(group); }
      group.items.push(line.slice(2).trim());
      last = 'item';
    } else if (/^\s+\S/.test(line) && last === 'item' && group) {
      group.items[group.items.length - 1] += ' ' + line.trim();
    } else if (line.endsWith(':') && !line.startsWith(' ')) {
      const title = line.slice(0, -1).trim();
      group = { title, kind: KINDS[title] ?? 'topic', items: [] };
      rel.groups.push(group);
      last = null;
    } else if (last === 'para') {
      rel.intro[rel.intro.length - 1] += ' ' + line.trim();
    } else {
      rel.intro.push(line.trim());
      last = 'para';
    }
  }
  return releases;
}

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

/** Text z changelogu → bezpečné HTML (escapuje vše, povolí jen **tučně** a `kód`). */
export function inline(text: string): string {
  return text
    .replace(/[&<>"]/g, (c) => ESC[c])
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/** 2026-11-02 → 2. 11. 2026 */
export function czDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d}. ${m}. ${y}`;
}
