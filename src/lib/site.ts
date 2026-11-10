import { DOWNLOAD_URL, CONTACT_URL } from '../../site.config.mjs';
import changelogMd from '../../content/CHANGELOG.md?raw';
import releaseDates from '../../content/release-dates.json';
import { parseChangelog } from './changelog.ts';

/** Adresa uvnitř webu s base path: url('stazeni/') → /ClipFarm-web/stazeni/ */
export const url = (path = '') => import.meta.env.BASE_URL.replace(/\/?$/, '/') + path.replace(/^\//, '');

export const hasDownload = DOWNLOAD_URL !== '';
/** Kam vedou tlačítka „Stáhnout“: na instalačku, nebo (dokud není odkaz) na stránku Stažení. */
export const downloadHref = hasDownload ? DOWNLOAD_URL : url('stazeni/#windows');
/** Text tlačítka: dokud není odkaz, neslibuje stažení. */
export const downloadLabel = hasDownload ? 'Stáhnout pro Windows' : 'Jak získat ClipFarm';

export const contactUrl = CONTACT_URL;

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
