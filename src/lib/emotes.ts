// Emoty z BetterTTV, stažené do assets/emotes (web nic nenačítá z cizího serveru). Klíč = kód emotu.
import type { ImageMetadata } from 'astro';
const files = import.meta.glob<ImageMetadata>('../../assets/emotes/*.webp', { eager: true, import: 'default' });

export function emote(code: string): ImageMetadata {
  const img = files[`../../assets/emotes/${code}.webp`];
  if (!img) throw new Error(`Emote ${code} chybí v assets/emotes`);
  return img;
}

/** HTML obrázku emotu (pro set:html a skripty). */
export const emoteHtml = (code: string, size = 24) =>
  `<img class="emote" src="${emote(code).src}" alt="${code}" title="${code}" width="${size}" height="${size}" decoding="async">`;
