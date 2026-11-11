import { DOWNLOAD_URL, CONTACT_URL } from '../../site.config.mjs';
import changelogMd from '../../content/CHANGELOG.md?raw';
import releaseDates from '../../content/release-dates.json';
import { parseChangelog } from './changelog.ts';

/** Adresa uvnitř webu s base path: url('stazeni/') → /ClipFarm-web/stazeni/ */
export const url = (path = '') => import.meta.env.BASE_URL.replace(/\/?$/, '/') + path.replace(/^\//, '');

export const hasDownload = (DOWNLOAD_URL as string) !== '';
export const downloadUrl = DOWNLOAD_URL;
/** Kam vedou tlačítka „Stáhnout“: na stránku Stažení, kde stahování začne samo (?stahnout), a s návodem, co dál. */
export const downloadHref = hasDownload ? url('stazeni/?stahnout#windows') : url('stazeni/#windows');
/** Text tlačítka: dokud není odkaz, neslibuje stažení. */
export const downloadLabel = hasDownload ? 'Stáhnout pro Windows' : 'Jak získat ClipFarm';

export const contactUrl = CONTACT_URL;

/** Údaje o instalačce z nejnovějšího vydání (scripts/fetch-release.mjs při buildu); null = nejsou. */
const releaseInfo = import.meta.glob<{ version: string; size: number; sha256: string | null }>('../../content/latest-release.json', { eager: true, import: 'default' });
export const latestSetup = Object.values(releaseInfo)[0] ?? null;

/** Verze z changelogu; chybějící data doplní content/release-dates.json (z git historie aplikace, npm run sync-changelog). */
const dates: Record<string, string> = releaseDates;
export const releases = parseChangelog(changelogMd).map((r) => ({ ...r, date: r.date ?? dates[r.version] ?? null }));
export const latest = releases[0];

export const NAV = [
  { path: '', label: 'Úvod' },
  { path: 'jak-to-funguje/', label: 'Jak to funguje' },
  { path: 'novinky/', label: 'Novinky' },
  { path: 'napoveda/', label: 'Nápověda' },
  { path: 'stazeni/', label: 'Stažení' },
];
