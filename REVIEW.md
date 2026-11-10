# Kola review a vylepšování

Každé kolo: čerstvý průchod webem (build pod `/ClipFarm-web/`, desktop 1440 px a mobil 375 px), vlastní průchod
za čtyři typy návštěvníků, nezávislé review (subagenti s čistým kontextem dostali jen screenshoty a adresu buildu,
žádné moje úvahy), brainstorm nápadů, opravy, nové ověření. Screenshoty před/po jsou v `review/kolo-N/pred|po/`.

Hodnocení nápadů: **přínos** pro návštěvníka (vysoký / střední / nízký) × **pracnost** (malá / střední / velká).

---

## Kolo 1

### Co jsem našel sám (průchod za návštěvníky)

- **Streamer, co nerozumí technice:** hero „3:00:00 – Kdo to bude celé koukat?“ a odstavec pod ním vysvětlí, co
  ClipFarm dělá, do pár sekund. Tlačítko je vidět hned. Jenže vede na Stažení, kde je jen „Instalačku ti zatím
  pošle správce“ – kdo je správce, nikde není.
- **Klipař:** nejvíc přesvědčí interaktivní časová osa s limitem skóre a pravidla proti spamu. Ukázky jsou ale
  promo videa, ne hotové klipy, a nikde není vidět, kolik hodin streamu by musel projet sám.
- **Skeptik z Discordu:** changelog s historií a poctivě vysvětlený SmartScreen budí důvěru. Chybí kdo za tím
  stojí, kolik to stojí po zkoušce a co ClipFarm vidí z Discordu.
- **Mobil s pomalým připojením:** telefony v ukázkách stahovaly 2× 4,3 MB videa v 1080×1920 kvůli náhledu
  širokému 160 px. Novinky měly na mobilu přes 22 000 px.

### Co řekli nezávislí recenzenti (5 subagentů: obecný pohled, streamer, klipař, skeptik, mobil)

**Líbí se (zachovat):** hero s háčkem 3:00:00, interaktivní graf s posuvníkem limitu („nejlepší věc na webu“
u všech pěti), „Chat, ne spam“ s přeškrtnutým bot_bobem, poctivost (SmartScreen, „Může vybrat i nesmysl? Občas.“,
macOS ne, GB za hodinu), tón (tykání, „Ty spíš. Farma sklízí.“), 404 stránka, konzistentní vizuál, nápověda
s vyhledáváním, velká tlačítka na mobilu.

**Mate nebo odrazuje (seřazeno podle toho, kolik recenzentů to zmínilo):**

| # | Nález | Kdo | Co jsem udělal |
|---|---|---|---|
| 1 | Všechna „Stáhnout pro Windows“ vedou do slepé uličky bez kontaktu | 5/5 | ✅ Dokud chybí `DOWNLOAD_URL`, tlačítka se jmenují **„Jak získat ClipFarm“** (neslibují soubor). Box na Stažení říká na rovinu „Veřejný odkaz ke stažení tu zatím není“. Nová volba **`CONTACT_URL`** v `site.config.mjs` – po vyplnění se objeví „Napsat správci“ na Stažení, v Nápovědě a v patičce. Zrušený kruhový odkaz „Zpět na stažení“. Skutečný odkaz a kontakt musí doplnit majitel (viz níž). |
| 2 | Co bude po 14 dnech a kolik to stojí | 5/5 | ✅ FAQ začíná „Prvních 14 dní ano.“ a popisuje, co platí podle README (přístup povoluje správce, natrvalo nebo na dobu určitou, třeba po měsících). Výslovně „cenu tenhle web neuvádí“ – cenu nevymýšlím. |
| 3 | Twitch se nikde nezmiňuje | 4/5 | ✅ Nová otázka „Funguje to s Twitchem?“ (i na úvodu): Twitch mezi podporovanými zdroji není, ClipFarm umí YouTube a Kick. |
| 4 | Screenshot galerie: kasinová reklama, skuteční streameři, verze v1.03, rozpor s patičkou „vše smyšlené“ | 4/5 | ✅ První záložka je teď „Nahrávání“ (karta Běží – bez cizího obsahu). Patička: smyšlené jsou jen ilustrace a promo videa, screenshoty jsou skutečné. Pod screenshoty „snímky ze starší verze (v1.03)“. Popisek detailu klipu už netvrdí, že je na něm ministudio. Nové screenshoty z v1.10.01 → doporučení. |
| 5 | Žádný skutečný hotový klip, jen promo animace | 3/5 | ⏸ Nemám klipy se souhlasem streamera – cizí stream bez svolení nezveřejním. Ukázky jsou teď výslovně „promo videa“, pseudo-citace pod pitch deckem (vypadala jako recenze) je pryč. → doporučení pro majitele. |
| 6 | Novinky: zeď textu, vývojářské detaily, chybí data | 5/5 | ✅ Rozbalená je jen nejnovější verze, starší mají úvodní větu a „Zobrazit změny (N)“. Data u v1.08–v1.10 doplněná z git historie aplikace (den commitu „Vydání vX“). Nahoře „13 verzí za 36 dní · poslední 9. 11. 2026“. Na mobilu bez svislé osy. Mobil: 22 500 px → 6 500 px. Text changelogu se nepřepisuje – generuje se z aplikace. |
| 7 | Tabulka požadavků na mobilu přetéká, Linux sloupec není vidět | 3/5 | ✅ Na mobilu se řádky přeskládají do karet s popisky Windows / Linux. |
| 8 | Discord přihlášení + nepodepsané .exe = vzorec podvodu | 2/5 | ✅ FAQ a krok 4: přihlašuješ se na stránce Discordu, heslo ClipFarm nevidí, správce vidí e-mail a jméno z Discordu (podle README). |
| 9 | Mobil: 4MB hero video, 2× 4,3 MB TikToky | 2/5 | ✅ Menší webové verze (`scripts/optimize-videos.sh`): 9:16 v 540×960 (0,9 MB místo 4,3 MB), 16:9 pro mobil 640×360 (0,4–0,7 MB) přes `<source media>`. Na pomalém připojení (2G/3G, Šetření dat) se videa samy nespouští. |
| 10 | „správce“ ve dvou významech (admin Windows × kdo dává přístup), „collaborators“ | 2/5 | ✅ „bez administrátorských práv“ vs. „správce ClipFarmu“; Linux „zatím jen pro pozvané“. |
| 11 | Jak to funguje: pilulky 1–4 nesedí se sekcemi 1–6, vypadají klikací; začíná σ | 3/5 | ✅ Pilulky pryč, místo nich „Ve zkratce: chat a hlasitost → skóre → klip“. Skóre vysvětlené lidsky, σ jen v závorce, „horní hranici nemá“. |
| 12 | Mobil: ovládání videa překrývá obsah, „Stáhnout pro Windows“ na telefonu nedává smysl | 3/5 | ✅ Na mobilu jen malé ikony v rohu. Pod hero „Jsi na mobilu? Poslat si odkaz do PC“ (nové, viz nápady). |
| 13 | Drobnosti: „2,5 · výchozí“ se láme, pruhy 11 a 9 stejně dlouhé, cesty se lámou uprostřed slova, useknutý placeholder, prázdné místo v kartách, velké mezery | 1–2/5 | ✅ Opraveno (štítek „výchozí“, pruhy úměrně, `<wbr>` v cestách, kratší placeholder, karty bez natahování, menší mezery mezi sekcemi). Odznak v hero teď říká novinku srozumitelně („Klipy na výšku s kamerou streamera nahoře“). |

**Vědomě nechávám:** opakování grafu na Úvodu i na Jak to funguje (na podstránce je u něj tabulka limitů
a vysvětlení – kdo přijde přímo, potřebuje ho tam); FAQ na úvodu (je v zadání); text changelogu (generuje se
z aplikace, ruční přepis by se rozešel s CHANGELOG.md).

### Nápady kola 1 (brainstorm, ≥ 10)

| Nápad | Přínos | Pracnost | Stav |
|---|---|---|---|
| **Kalkulačka „Kolik streamu za tebe ClipFarm projede?“** – délka streamu × počet týdně → hodiny týdně/měsíčně + místo na disku podle kvality (čísla z README) | vysoký (klipař i streamer si spočítá svoje hodiny; disk řeší „vejde se mi noc v 1080p?“) | malá | ✅ hotovo (úvod, před Stažením) |
| **„Jsi na mobilu? Poslat si odkaz do PC“** – nativní sdílení, jinak zkopírování odkazu | vysoký (návštěvníci z Discordu jsou často na mobilu, kde .exe nemá smysl) | malá | ✅ hotovo (jen na úzkých displejích) |
| **Novinky „13 verzí za 36 dní“ + data všech verzí** – živost projektu bez přepisování changelogu | střední (důvěra: projekt žije) | malá | ✅ hotovo |
| Klipy pod časovou osou přepínatelné 16:9 / 9:16 | střední | malá | zásobník |
| Rostlinka z loga roste se scrollováním, na konci stránky „sklizeno“ | nízký–střední (radost) | malá | zásobník |
| Interaktivní „anti-spam“: tlačítko „bot_bob spamuje KEKW“ vs. „3 lidé píšou KEKW“ a skóre se (ne)hne | střední (vysvětlí pravidlo hrou) | střední | zásobník |
| Na mobilu v hero svislé TikTok video místo 16:9 | střední | malá | zásobník |
| Slovníček pojmů (limit skóre, Přestříhat, zdroj) jako tooltip | střední pro laiky | střední | zásobník |
| Tlačítko „Nahoru“ na dlouhých stránkách | nízký | malá | zásobník |
| Sekce „Kdo za tím stojí“ + kontakt | vysoký (důvěra) | malá | ⏳ potřebuje údaje od majitele (připraveno `CONTACT_URL`) |
| „Jeden stream, celý výstup“ – skutečné klipy jednoho streamu včetně slabších | vysoký (klipař) | střední | ⏳ potřebuje klipy se souhlasem streamera |
| Před/po: automatický střih vs. po 30 s v ministudiu | vysoký | střední | ⏳ potřebuje skutečné video |

### Ověření po kole 1

Build bez chyb a varování (`astro check` 0/0/0), test parseru prošel, build pod `/ClipFarm-web/` na statickém
serveru: 6 stránek × desktop/mobil bez chyb v konzoli, žádný rozbitý odkaz ani kotva, nic nepřetéká. Kalkulačka
počítá (6 h × 5 streamů, 1440p → 30 h týdně, 131 h měsíčně, 195 GB), odkaz `novinky/#v1-05-01` rozbalí sbalenou
verzi. Lighthouse (mobil) 100/100/100 v přístupnosti, best practices a SEO na všech stránkách.

---
