// Jediné místo s nastavením webu. Po změně stačí znovu `npm run build`.

/** Podsložka, ve které web poběží. GitHub Pages projektová stránka = '/<název repa>/'.
 *  Vlastní doména (web v kořeni) = '/'. Musí začínat i končit lomítkem. */
export const BASE_PATH = '/ClipFarm-web/';

/** Adresa serveru bez podsložky – pro absolutní odkazy (náhled odkazu na Discordu, canonical). */
export const SITE = 'https://tomaseckhardt.github.io';

/** Odkaz na instalačku ClipFarm-Setup-<verze>.exe. Berou ho všechna tlačítka „Stáhnout“ na všech stránkách.
 *  Prázdný = tlačítka vedou na stránku Stažení, kde je napsané, že instalačku pošle správce. */
export const DOWNLOAD_URL = '';
