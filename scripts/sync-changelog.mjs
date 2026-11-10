// Zkopíruje CHANGELOG.md z repa aplikace do content/CHANGELOG.md (z něj se při buildu generuje stránka Novinky).
// Cesta k repu: první argument, proměnná CLIPFARM_DIR, nebo ../ClipFarm vedle tohohle repa.
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const app = resolve(process.argv[2] ?? process.env.CLIPFARM_DIR ?? resolve(root, '../ClipFarm'));
copyFileSync(resolve(app, 'CHANGELOG.md'), resolve(root, 'content/CHANGELOG.md'));
console.log(`content/CHANGELOG.md ← ${resolve(app, 'CHANGELOG.md')}`);
