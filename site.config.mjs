// Jediné místo s nastavením webu. Po změně stačí znovu `npm run build`.

/** Podsložka, ve které web poběží. GitHub Pages projektová stránka = '/<název repa>/'.
 *  Vlastní doména (web v kořeni) = '/'. Musí začínat i končit lomítkem. */
export const BASE_PATH = '/';

/** Adresa serveru bez podsložky – pro absolutní odkazy (náhled odkazu na Discordu, canonical). */
export const SITE = 'https://clipfarm.eckhardt.cz';

/** Odkaz na instalačku. Stálá adresa nejnovějšího vydání v Releases repa ClipFarm-web – tam ji při každé nové
 *  verzi nahraje workflow „ClipFarm .exe“ v repu ClipFarm, takže se tu nic nemusí měnit.
 *  Tlačítka „Stáhnout“ vedou na stránku Stažení a stahování tam začne samo.
 *  Prázdný = tlačítka vedou na Stažení, kde je napsané, že instalačku pošle správce. */
export const DOWNLOAD_URL = 'https://github.com/tomaseckhardt/ClipFarm-web/releases/latest/download/ClipFarm-Setup.exe';

/** Kam se lidé můžou obrátit na správce ClipFarmu (Discord server, e-mail jako 'mailto:…', web).
 *  Vyplněný = odkaz „Napsat správci“ na stránce Stažení, v Nápovědě a v patičce. Prázdný = nikde. */
export const CONTACT_URL = '';
