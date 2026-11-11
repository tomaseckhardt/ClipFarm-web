// Jediné místo s nastavením webu. Po změně stačí znovu `npm run build`.

/** Podsložka, ve které web poběží. GitHub Pages projektová stránka = '/<název repa>/'.
 *  Vlastní doména (web v kořeni) = '/'. Musí začínat i končit lomítkem. */
export const BASE_PATH = '/';

/** Adresa serveru bez podsložky – pro absolutní odkazy (náhled odkazu na Discordu, canonical). */
export const SITE = 'https://clipfarm.eckhardt.cz';

/** Odkaz na instalačku ClipFarm-Setup-<verze>.exe. Berou ho všechna tlačítka „Stáhnout“ na všech stránkách.
 *  Prázdný = tlačítka vedou na stránku Stažení, kde je napsané, že instalačku pošle správce. */
export const DOWNLOAD_URL = '';

/** Kam se lidé můžou obrátit na správce ClipFarmu (Discord server, e-mail jako 'mailto:…', web).
 *  Vyplněný = odkaz „Napsat správci“ na stránce Stažení, v Nápovědě a v patičce. Prázdný = nikde. */
export const CONTACT_URL = '';
