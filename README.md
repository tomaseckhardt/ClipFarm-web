# ClipFarm – web

Prezentační web aplikace ClipFarm: úvod, Jak to funguje, Stažení, Novinky (changelog), Nápověda a stránka 404.
Česky, statický, připravený pro GitHub Pages na adrese `https://<uživatel>.github.io/ClipFarm-web/`.

## Technologie a proč

**[Astro](https://astro.build) 7** – z každé stránky vygeneruje hotové statické HTML (`dist/<stránka>/index.html`),
base path pro podsložku je jedno nastavení, na stránky nepřidá žádný JS navíc (jen pár kB vlastního TypeScriptu
na animace a videa) a obrázky při buildu zoptimalizuje do AVIF/WebP. Navigace, patička a tlačítko Stáhnout jsou
komponenty, takže se HTML nikde nekopíruje. Žádný server, žádná databáze. Porovnání s dalšími možnostmi
(Vite, Eleventy, Next.js) je v [DECISIONS.md](DECISIONS.md).

Závislosti: `astro` (+ `sharp` na obrázky) a pro kontrolu typů `@astrojs/check` a `typescript`. Přesné verze
jsou v `package-lock.json`. Potřebuje Node.js 22.23+ (doporučeno 24).

## Spuštění a build

```bash
npm ci                 # nainstaluje přesné verze z package-lock.json
npm run dev            # vývojový server s živým obnovováním: http://localhost:4321/ClipFarm-web/
npm test               # test parseru changelogu
npm run build          # kontrola typů + produkční build do dist/
npm run preview        # náhled hotového buildu: http://localhost:4321/ClipFarm-web/
```

`dist/` je obyčejná složka souborů – funguje z jakéhokoli statického serveru, když ji dáš do podsložky
`/ClipFarm-web/` (stejně jako na GitHub Pages):

```bash
mkdir -p /tmp/pages-test && cp -r dist /tmp/pages-test/ClipFarm-web
cd /tmp/pages-test && python3 -m http.server 8080   # → http://localhost:8080/ClipFarm-web/
```

## Kde co je

```
site.config.mjs          ← BASE_PATH, SITE a DOWNLOAD_URL – jediné místo s nastavením
content/CHANGELOG.md     ← kopie changelogu aplikace (z ní se generuje stránka Novinky)
assets/                  ← podklady: brag videa a náhledy, screenshoty aplikace, písma s licencí
public/                  ← soubory s pevnou adresou: favicon, .nojekyll, robots.txt
src/pages/               ← stránky (soubor = stránka): index, jak-to-funguje, stazeni, novinky, napoveda, 404
src/components/          ← Header, Footer, DownloadButton, VideoPlayer, StreamTimeline, FaqList, …
src/lib/                 ← changelog parser (+ test), FAQ texty, data ilustrační časové osy
src/scripts/site.ts      ← společný JS: animace při scrollu, videa, počítadla, záložky
.github/workflows/deploy.yml ← nasazení na GitHub Pages
```

**Nová stránka:** přidej `src/pages/nazev.astro` (vzor: `napoveda.astro`, obal `<Base title="…" description="…">`),
a pokud má být v menu, přidej ji do `NAV` v `src/lib/site.ts`. Adresa bude `/ClipFarm-web/nazev/`.

## Instalačka a changelog: automaticky s každou verzí ClipFarmu

```
repo ClipFarm (soukromé)                         repo ClipFarm-web (veřejné)
workflow „ClipFarm .exe“ po vydání vX.XX.XX ──►  Releases: vX.XX.XX s ClipFarm-Setup.exe, SHA256SUMS.txt, CHANGELOG.md
                                              ──►  repository_dispatch „nove-vydani“ ──► nasazení webu (deploy.yml)
```

- **Odkaz ke stažení** je v `site.config.mjs` (`DOWNLOAD_URL`) a míří na stálou adresu
  `https://github.com/tomaseckhardt/ClipFarm-web/releases/latest/download/ClipFarm-Setup.exe` – vždy nejnovější
  instalačka, nic se nemění ručně. Tlačítka „Stáhnout“ vedou na stránku Stažení (`/stazeni/?stahnout`), kde stahování
  začne samo a pod tím je návod (SmartScreen, Discord). Na Stažení je i velikost a SHA256 instalačky.
- **Changelog:** nasazení si před buildem spustí `scripts/fetch-release.mjs`, který z nejnovějšího vydání stáhne
  `CHANGELOG.md` do `content/` a údaje o instalačce do `content/latest-release.json` (chybějící datum verze doplní
  z data vydání). Stránka Novinky se z něj vygeneruje.
- **Jednou nastavit v repu ClipFarm:** secret `CLIPFARM_WEB_TOKEN` = fine-grained token jen k repu ClipFarm-web
  s oprávněním **Contents: Read and write** (GitHub → Settings → Developer settings → Fine-grained tokens). Bez něj
  workflow v ClipFarmu tenhle krok přeskočí a web zůstane na poslední nahrané verzi.
- **Ručně** (např. starší verze): vydání v ClipFarm-web jde vytvořit i ručně
  (`gh release create vX.XX.XX ClipFarm-Setup.exe SHA256SUMS.txt CHANGELOG.md -R tomaseckhardt/ClipFarm-web`)
  a pak Actions → Nasazení na GitHub Pages → Run workflow.
- Lokálně: `npm run sync-changelog` vezme changelog z `../ClipFarm` (i s daty z git historie).
- `DOWNLOAD_URL = ''` vrátí stav „instalačku posílá správce“; `CONTACT_URL` přidá odkaz „Napsat správci“.

## Nasazení na GitHub Pages krok za krokem

1. **Vytvoř repo** na GitHubu: <https://github.com/new> → název `ClipFarm-web` (veřejné, nebo soukromé, pokud máš
   placený plán, který Pages u soukromých rep umí). Nic dalšího (README, .gitignore) nezaškrtávej.
2. **Pushni** tenhle adresář (lokální repo s commitem už je připravené):
   ```bash
   git remote add origin https://github.com/<uživatel>/ClipFarm-web.git
   git branch -M main
   git push -u origin main
   ```
3. Na GitHubu v repu: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. V záložce **Actions** se spustí workflow „Nasazení na GitHub Pages“ (pokud už doběhl před krokem 3 a selhal,
   dej u něj **Re-run all jobs**, nebo Actions → Nasazení na GitHub Pages → **Run workflow**).
5. Za pár minut je web na **https://\<uživatel\>.github.io/ClipFarm-web/** (adresa je i v Settings → Pages
   a u běhu workflow v kroku deploy).

Každý další push do `main` web znovu sestaví a nasadí. Workflow (`.github/workflows/deploy.yml`) používá oficiální
akce `actions/configure-pages`, `actions/upload-pages-artifact` a `actions/deploy-pages` a před nasazením spustí
test a build.

### Base path: přejmenování repa nebo vlastní doména

V `site.config.mjs`:

- **Jiné jméno repa** (např. `clipfarm`): `BASE_PATH = '/clipfarm/'`.
- **Vlastní doména** (web v kořeni, např. `https://clipfarm.cz`): `BASE_PATH = '/'` a `SITE = 'https://clipfarm.cz'`;
  v Settings → Pages → Custom domain zadej doménu.
- **Jiný GitHub účet:** `SITE = 'https://<uživatel>.github.io'` (adresa bez podsložky; je potřeba pro náhled
  odkazu na Discordu a `canonical`).

`BASE_PATH` musí začínat i končit lomítkem. Všechny odkazy, obrázky, videa, písma i CSS/JS se podle něj
nastaví samy.

## Podklady a licence

| Podklad | Odkud | Licence |
|---|---|---|
| Brag videa a náhledy (`assets/brag/*/brag.mp4`, `brag.jpg`) – varianty cs-16x9, cs-tiktok-9x16, cs-yc-parody-16x9, en-16x9, en-tiktok-9x16 | `ClipFarm/brag-output/` | vlastní materiál ClipFarmu |
| OG obrázek (`assets/og.jpg`) | `scripts/make-og.mjs`: brag.jpg + značka ze závěrečného snímku hlavního videa | dtto |
| Screenshot Běží pro web (`ui-bezi-web.png`) | `scripts/blur-screenshot.mjs`: rozmazaná jména kanálů a řádek logu | dtto |
| Menší webové verze videí (`brag-540.mp4` u 9:16, `brag-640.mp4` u 16:9 pro mobily) | vyrobené z originálů skriptem `scripts/optimize-videos.sh` (ffmpeg); při výměně videí ho spusť znovu | dtto |
| Hudba ve videích: „Happy Beats / Business Moves“ Vol. 9 (16:9), Vol. 10 (TikTok), Vol. 1 (pitch deck) – Sascha Ende, [ende.app](https://ende.app/en) | přibalená ve videích | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) – uvedení autora je v patičce webu |
| Emoty v ukázkách chatu (`assets/emotes/*.webp`: KEKW, LULW, LuL, OMEGALUL, PepeLaugh, POGGERS, Sadge, haHAA, monkaS) | staženo z CDN BetterTTV (cdn.betterttv.net), uloženo lokálně | práva mají autoři emotů; BTTV nemá licenci pro komerční použití – při problému emoty smaž nebo vyměň |
| Zvukové efekty ve videích | [Kenney.nl](https://kenney.nl) | CC0 |
| Screenshoty aplikace (`assets/screenshots/ui-*.png`) | `ClipFarm/docs/` | vlastní materiál ClipFarmu |
| Písma Bricolage Grotesque a Instrument Sans (`assets/fonts/`) | `ClipFarm/web/fonts/` | SIL Open Font License 1.1 (texty licencí vedle písem, na webu odkaz v patičce) |
| Logo (výhonek) a favicon | SVG z `ClipFarm/web/index.html`; PNG ikony (`public/favicon-32.png`, `apple-touch-icon.png`) jsou z něj vyrenderované přes sharp | vlastní materiál ClipFarmu |
| Barvy | `ClipFarm/web/app.css` | – |
| Texty (fakta) | `ClipFarm/README.md`, `ClipFarm/CHANGELOG.md`, `brag-plan.md` | – |

Kanály, přezdívky a skóre v ilustracích (časová osa, chat) jsou smyšlené, stejně jako v brag videích.

## Další dokumenty

- [DECISIONS.md](DECISIONS.md) – co jsem rozhodl sám a proč.
- [REVIEW.md](REVIEW.md) – kola review a vylepšování, zásobník nápadů.
