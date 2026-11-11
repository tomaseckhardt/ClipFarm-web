// Screenshot karty Běží pro web: rozmaže jména skutečných kanálů a řádek logu (originál zůstává beze změny).
// Výstup: assets/screenshots/ui-bezi-web.png. Spustit znovu jen při výměně screenshotu: node scripts/blur-screenshot.mjs
import { resolve } from 'node:path';
import sharp from 'sharp';

const src = resolve(import.meta.dirname, '../assets/screenshots/ui-bezi.png');
const areas = [
  { left: 170, top: 349, width: 170, height: 28 }, // kick.com/<kanál> u nahrávání
  { left: 62, top: 484, width: 512, height: 24 }, // řádek logu
  { left: 148, top: 587, width: 136, height: 26 }, // kick.com/<kanál> u hlídání
];
const patches = await Promise.all(areas.map(async (a) => ({
  input: await sharp(src).extract(a).blur(7).toBuffer(), left: a.left, top: a.top,
})));
await sharp(src).composite(patches).toFile(resolve(import.meta.dirname, '../assets/screenshots/ui-bezi-web.png'));
console.log('assets/screenshots/ui-bezi-web.png');
