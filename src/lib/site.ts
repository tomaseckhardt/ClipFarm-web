import { DOWNLOAD_URL } from '../../site.config.mjs';
import changelogMd from '../../content/CHANGELOG.md?raw';
import { parseChangelog } from './changelog.ts';

/** Adresa uvnitř webu s base path: url('stazeni/') → /ClipFarm-web/stazeni/ */
export const url = (path = '') => import.meta.env.BASE_URL.replace(/\/?$/, '/') + path.replace(/^\//, '');

export const hasDownload = DOWNLOAD_URL !== '';
/** Kam vedou tlačítka „Stáhnout“: na instalačku, nebo (dokud není odkaz) na stránku Stažení. */
export const downloadHref = hasDownload ? DOWNLOAD_URL : url('stazeni/#windows');

export const releases = parseChangelog(changelogMd);
export const latest = releases[0];

export const NAV = [
  { path: '', label: 'Úvod' },
  { path: 'jak-to-funguje/', label: 'Jak to funguje' },
  { path: 'novinky/', label: 'Novinky' },
  { path: 'napoveda/', label: 'Nápověda' },
  { path: 'stazeni/', label: 'Stažení' },
];
