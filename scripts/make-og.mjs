// Náhled odkazu (Open Graph, 1200×630): brag.jpg hlavního videa + do jeho prázdné spodní části výřez
// se značkou (logo, ClipFarm, „Ty spíš. Farma sklízí.“, Windows · Linux) ze závěrečného snímku téhož videa.
// Výstup: assets/og.jpg. Spustit znovu jen při výměně videa: node scripts/make-og.mjs (potřebuje ffmpeg).
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import sharp from 'sharp';

const dir = resolve(import.meta.dirname, '../assets/brag/cs-16x9');
const outroJpg = execFileSync('ffmpeg', ['-v', 'error', '-ss', '19.2', '-i', resolve(dir, 'brag.mp4'), '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'mjpeg', '-q:v', '2', '-'], { maxBuffer: 1 << 26 });
// měkké okraje výřezu, ať v obrázku není vidět obdélník (pozadí obou snímků je skoro stejné)
const W = 574, H = 266;
const fade = Buffer.from(`<svg width="${W}" height="${H}"><filter id="b"><feGaussianBlur stdDeviation="10"/></filter>
  <rect x="18" y="14" width="${W - 36}" height="${H - 28}" rx="30" fill="#fff" filter="url(#b)"/></svg>`);
const brand = await sharp(outroJpg).extract({ left: 560, top: 360, width: 820, height: 380 }).resize(W, H)
  .ensureAlpha().composite([{ input: fade, blend: 'dest-in' }]).png().toBuffer();
const full = await sharp(resolve(dir, 'brag.jpg')).composite([{ input: brand, left: (1920 - W) / 2, top: 772 }]).toBuffer();
await sharp(full)
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 86 })
  .toFile(resolve(dir, '../../og.jpg'));
console.log('assets/og.jpg');
