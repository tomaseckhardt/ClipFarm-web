# Rozhodnutí

Rozhodnutí, na která bych se jinak ptal. Pracoval jsem sám na autopilotu, tak je tu vše na jednom místě, ať je jde
rychle zkontrolovat a případně změnit.

## 1. Technologie: Astro (brainstorm)

Porovnával jsem 4 možnosti podle kritérií ze zadání (v pořadí důležitosti):

| Kritérium | **Astro 7** | Vite (vanilla TS, multi-page) | Eleventy 3 | Next.js 16 (`output: 'export'`) |
|---|---|---|---|---|
| 1. statický web, GitHub Pages, base path | ✅ `output: 'static'` je výchozí, každá stránka = `složka/index.html`, `base` jedním řádkem, `404.astro` → `404.html` | ✅ statické, `base` umí, ale každou stránku musím ručně zapsat do `rollupOptions.input` | ✅ statické, `pathPrefix` umí, ale cesty k CSS/JS z bundleru musím řešit zvlášť | ⚠️ jde, ale `next/image` a některé funkce potřebují server, `basePath` + `trailingSlash` + `images.unoptimized` = ruční ladění |
| 2. málo JS, SEO, vlastní URL a meta | ✅ 0 kB JS, pokud ho nenapíšu; meta v layoutu z props | ✅ JS jen můj, ale meta tagy ručně v každém HTML | ✅ 0 kB JS | ❌ React runtime (~90 kB) na každé stránce i bez interaktivity |
| 3. moderní animace | ✅ vlastní CSS + malý TS, nic neomezuje | ✅ | ✅ (JS přes další bundler) | ✅ (ale přes React) |
| 4. sdílené komponenty bez kopírování HTML | ✅ `.astro` komponenty (Nav, Footer, Stáhnout) | ❌ žádné šablony – kopírování HTML nebo vlastní plugin | ✅ Nunjucks/Liquid partials | ✅ React komponenty |
| 5. údržba pro jednoho | ✅ jedna závislost (`astro`), stránka = soubor v `src/pages/`; optimalizace obrázků vestavěná | ⚠️ málo závislostí, ale ruční registrace stránek a meta | ⚠️ šablonovací jazyk + zvlášť bundler pro TS/CSS | ❌ hodně závislostí, React, rychle se měnící API |
| 6. TypeScript | ✅ vestavěný | ✅ | ⚠️ jen přes další nástroj | ✅ |

**Volba: Astro.** Jako jediné splňuje všechno bez kompromisu: z každé stránky vygeneruje statické HTML,
base path je jedno nastavení, na stránce není žádný JS kromě toho, co sám napíšu (pár kB TS pro animace a videa),
komponenty brání kopírování HTML, obrázky (screenshoty, náhledy videí, OG obrázek) zoptimalizuje při buildu
do WebP/AVIF a TypeScript má vestavěný. Žádné SSR, adaptér ani serverové funkce – výstup `dist/` je obyčejná
složka souborů.

Závislosti (přesné verze v `package-lock.json`): `astro` (+ `sharp` na obrázky), na kontrolu typů
`@astrojs/check` a `typescript`. TypeScript je **6.0.x**, ne nejnovější 7.0: `@astrojs/check` zatím podporuje jen
`^5 || ^6`. Žádná knihovna na animace (GSAP apod.) – stačí CSS, IntersectionObserver a pár řádků TS.

## 2. Struktura a podklady

- **Podklady leží v `assets/`** (jak bylo zadáno): `assets/brag/<varianta>/brag.mp4 + brag.jpg`,
  `assets/screenshots/ui-*.png`, `assets/fonts/` (woff2 + licence OFL). Astro je importuje přímo odtud: obrázky
  zoptimalizuje, videa a fonty zkopíruje do výstupu s hashem v názvu (správně i pod base path, každé jen jednou).
  `public/` obsahuje jen věci, které musí mít pevnou adresu: `favicon.svg`, `.nojekyll`, `robots.txt`.
- **Changelog:** web nemůže při buildu na GitHubu číst `~/CodingProjects/ClipFarm` (repo aplikace je soukromé
  a CI k němu nemá přístup). Proto má web vlastní kopii `content/CHANGELOG.md`, kterou obnoví
  `npm run sync-changelog` (zkopíruje ji z `../ClipFarm/CHANGELOG.md`). Stránka Novinky se z ní generuje
  při každém buildu – nic se nepřepisuje ručně. Sekce `## Nevydáno` se na webu nezobrazuje (nevydané změny).
  Číslo nejnovější verze (v hlavičce, na stránce Stažení) se bere taky z changelogu.
- **FAQ / Nápověda** jsou napsané z README ručně (jako webové texty). Generovat je z README nemá smysl:
  README je technický návod (cesty, git, proměnné prostředí), FAQ má odpovídat lidsky.
- **Verze bez data:** v1.10.01, v1.09.01 a v1.08.01 v changelogu datum nemají, takže ho web neukazuje
  (nic si nedomýšlím).

## 3. Odkaz ke stažení

- `DOWNLOAD_URL` je v `site.config.mjs` (jediné místo). Teď je prázdný (`''`).
- **Dokud je prázdný:** všechna tlačítka „Stáhnout“ vedou na stránku Stažení a hlavní tlačítko tam ukazuje
  „Instalačku ti pošle správce“ (přesně podle README: „kdo nemá přístup na GitHub, dostane ji od správce“).
  Web tak nemá rozbitý odkaz ani 404. Po doplnění URL vedou všechna tlačítka na všech stránkách rovnou na soubor.
- **Linux** nemá soubor ke stažení – podle README se instaluje z gitu (`instalace-linux.sh`) a repo je soukromé
  (jen pro collaborators). Web to říká na rovinu.

## 4. Adresa webu a base path

- `BASE_PATH = '/ClipFarm-web/'` a `SITE = 'https://tomaseckhardt.github.io'` jsou v `site.config.mjs`.
  Uživatelské jméno `tomaseckhardt` je odvozené z `git remote` repa ClipFarm. `SITE` je potřeba kvůli
  absolutním adresám v Open Graph (náhled odkazu na Discordu) a `canonical`.

## 5. Obsah a texty

- Fakta jen z README a CHANGELOG. Žádné počty uživatelů, recenze, ceny ani smyšlené funkce.
- O ceně po zkušební době README nic konkrétního neříká (jen „Mám zájem o přístup – správce přístup povolí“),
  web tedy cenu neuvádí.
- Data v ilustracích (časová osa streamu, skóre ★ 6,4 apod.) jsou ilustrační, stejně jako v brag videích,
  a jsou tak na webu označená.
- Hudba: brag videa nepoužívají jen vol. 9. Podle `brag-plan.md`: 16:9 (cs, en) = vol. 9, TikTok (cs, en) =
  vol. 10, „pitch deck“ parodie = vol. 1. V patičce jsou uvedené všechny tři skladby (Sascha Ende, ende.app,
  CC BY 4.0). Zvukové efekty ve videích jsou od Kenney.nl (CC0, uvedení není povinné, ale je v README).
- Anglická videa (en-16x9, en-tiktok-9x16) jsou na webu taky – v ukázkách jako přepínač titulků CZ / EN
  (aplikace je česky, ale video jde poslat i kamarádům ze zahraničí).
