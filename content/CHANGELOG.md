# Změny

Verze ve tvaru `vHLAVNÍ.VEDLEJŠÍ.OPRAVA`, vedlejší číslo a oprava dvoumístně, počítá se od 01:

| Změna | Co se zvýší | Příklad |
|---|---|---|
| jen opravy chyb | OPRAVA | v1.03.01 → v1.03.02 |
| nová funkce | VEDLEJŠÍ, oprava zpět na 01 | v1.03.02 → v1.04.01 |
| zásadní změna, po které by stará data nebo postupy nefungovaly | HLAVNÍ, ostatní zpět na 01 | v1.04.01 → v2.01.01 |

Jedna verze = jedno vydání (merge do `main`). Když vydání obsahuje funkce i opravy, číslo se zvýší jednou, podle
největší změny. Změna jen v dokumentaci nebo screenshotech číslo nezvyšuje. Číslo verze je v `Klipy.py`
(`VERSION`), okno ho ukazuje vpravo nahoře a po aktualizaci vypíše sekce níž, které uživatel ještě neviděl.
Hotové a ještě nevydané změny se sbírají v sekci `## Nevydáno` hned pod pravidly; při vydání (merge do `main`)
se přejmenuje na `## vX.XX.XX – datum` a stejné číslo se zapíše do `VERSION`.

## v1.10.01

Doladit střih dospěl ve střižnu. Zabalte si popcorn a kameru streamera.

Nové:

- **Doladit střih je teď ministudio.** Místo dvou posuvníků časová osa jako ve střižně: přehled celého okna,
  přiblížení kolečkem až na desetiny sekundy, snímky, úchyty začátku a konce, playhead a klik = přetočit.
  Mezerník, I / O, J / K / L a šipky dělají to, co od nich čeká každý, kdo kdy otevřel Premiere. Puštěný úchyt
  se přichytí k nejbližší pauze ve zvuku, ať klip neusekne větu (Alt = ne, opravdu tady). Smyčka, prvních
  a posledních 3 s jedním klikem.
- **Pod osou je vidět, kde se něco děje:** hlasitost a chat po sekundách. Hledat pointu proklikáváním je
  minulost, je to ten oranžový kopec.
- **Pole kamery:** jednou natáhneš obdélník přes kameru streamera a ClipFarm si ho pamatuje pro celý kanál.
  Náhled přiblížení rovnou ukáže, jak bude reakce vypadat přes celou obrazovku.
- **9:16 kamera nahoře:** jedno tlačítko a z klipu je Short půl na půl, nahoře obličej streamera přes celou
  šířku, dole celá hra. Přehrávač to ukáže dřív, než cokoli uložíš, a klip si formát pamatuje. Ve stejné řadě
  jde klip přepnout i na obyčejné 16:9 nebo 9:16, kdyby sis to rozmyslel.
- **Doladit střih vidí 5 minut před klipem a 5 minut po něm** místo dosavadních ±30 s. Pointa, která přišla
  o dvě minuty dřív, než chat začal řvát, se konečně dá do klipu dostat. (#55)
- **Náhled střihu hraje z vyříznutého kousku streamu.** Jakmile sáhneš na časovou osu, ClipFarm vedle streamu
  vyřízne těch 10 minut kolem klipu (bez překódování, pár sekund, u 1080p60 ~600 MB), takže přehrávač se už
  nemusí prokousávat celým 28GB streamem. Puštění náhledu trvá ~0,15 s místo ~0,6 s. Kousek se smaže sám, jakmile
  detail zavřeš, otevřeš jiný klip nebo smažeš zdroj; když se vyříznout nepovede, hraje se postaru z celého streamu.
  Uložení střihu dál stříhá z původního videa, přesnost se nemění. (#55)

Opravy:

- **Pás snímků se načte zhruba 3× rychleji** (18 snímků za 2,6 s místo 7 s, nově 24 snímků přes
  celých 10 minut za 3,5 s). ffmpeg na Linuxu potichu ignoroval „ber jen klíčové snímky“ a pro každý snímek poctivě
  dekódoval až 4 s videa. (#55)

Odebráno:

- **macOS** (instalace-macos.command a vše kolem: aplikace v Launchpadu, Homebrew) – nikdo ho nepoužívá.
- **instalace-windows.bat** – na Windows je ClipFarm.exe; gitová verze na Windows zůstává jen pro vývoj
  (nástroje přes winget, viz README). Linux dál přes `instalace-linux.sh` a git.

## v1.09.01

Kdo chce ClipFarm jen vyzkoušet, už nemusí nikoho prosit.

Nové:

- **14 dní zkušební verze:** kdo se do ClipFarm.exe přihlásí poprvé, dostane celý ClipFarm na 14 dní – žádné
  ořezané funkce, žádný vodoznak, žádná kreditka. Nahoře nenápadně svítí „Zkušební verze · zbývá N dní“, ať to
  nikoho nepřekvapí. Po konci okno řekne „Zkušební doba skončila“ a nabídne Mám zájem o přístup; správce ho jedním
  klikem schválí na plný přístup. Klipy z trialu nikam nemizí.

## v1.08.01

Největší vydání ClipFarmu. Na Windows z něj je normální program s instalačkou, přihlášením a aktualizací na jedno
kliknutí – žádné „otevři terminál a napiš git pull“. K tomu podrobné logy, rychlejší stříhání na výšku a hromada
oprav, které vylezly, když jsme ho konečně pustili na druhý počítač.

ClipFarm pro Windows jako program (.exe):

- **Instalačka ClipFarm-Setup-<verze>.exe:** dvojklik a hotovo. Python, yt-dlp, ffmpeg i Node.js si ClipFarm
  nosí s sebou, nic dalšího se neinstaluje. Instaluje se jen pro tebe (bez admina), ikona je na ploše a v nabídce
  Start. Windows SmartScreen napoprvé zpanikaří, protože instalačka není podepsaná – Další informace → Přesto
  spustit. (#35–#39)
- **Klipy bydlí v Dokumenty\ClipFarm**, odděleně od programu: přeinstalace ani aktualizace na ně nesáhnou
  a odinstalace se slušně zeptá, jestli je smazat (výchozí odpověď: radši ne).
- **Instalace ani odinstalace nezačne, dokud ClipFarm něco nahrává nebo stříhá.** Rozdělaný stream je svatý.
- **Konečně vypadá jako aplikace:** nová ikonka podle loga v okně (zelený výhonek místo fialového Play), na
  programu, zástupcích i v instalačce, která dostala i vlastní obrázky. Pravý klik už nenabízí „Uložit stránku“
  ani „Prozkoumat“ (v polích pro psaní zůstává Kopírovat / Vložit) a F12 nic neotevře. (#53)
- **Žádné vyskakující černé okno** při nahrávání a žádné osiřelé node.exe ve Správci úloh – Node.js se spouští jen
  u YouTube a co po sobě nechá, ClipFarm uklidí. (#54)

Přihlášení a přístup (ClipFarm.exe):

- **Přihlášení přes Discord** při prvním spuštění, okno se vrátí rovnou přihlášené. Žádné další heslo do sbírky.
- **Přístup povoluje správce.** Kdo ho nemá, uvidí „K ClipFarmu nemáš přístup“ a jedním klikem dá vědět, že má
  zájem; správce ho jedním klikem schválí. Přístup umí i „zaplaceno do“ – po tom dni skončí sám, bez trapných
  rozhovorů.
- **Přístup se ověřuje** při spuštění a pak každých 6 hodin; odebraný nebo skončený přístup okno zastaví. Bez
  internetu ClipFarm 3 dny jede normálně, pak už jen galerie, střih a přestříhání (stahovat a nahrávat půjde zase
  po připojení).
- Gitová verze (macOS, Linux, vývoj) přihlášení nemá. (#40, #41)

Aktualizace:

- **ClipFarm.exe se aktualizuje sám:** po spuštění (a pak každých 6 hodin) zjistí novou verzi a nabídne
  ⬆ Aktualizovat teď. Stáhne instalačku, zkontroluje, že je opravdu ta pravá (kontrolní součet), potichu ji
  nainstaluje a okno se samo obnoví už na nové verzi i s přehledem novinek. Když zrovna něco nahrává, stříhá nebo
  přesouvá klipy, slušně počká a nabídne se znovu, až to doběhne. Výsledek kontroly je v Nastavení.
- **Varování o starém yt-dlp už neotravuje při každém spuštění:** u yt-dlp ze systému (Fedora, Ubuntu, Arch) se
  ClipFarm na pozadí zeptá správce balíčků a ozve se, jen když je opravdu co aktualizovat; jinak je stáří jen
  tichá poznámka v Nastavení.

Přechod ze staré verze (git clone):

- **Gitová verze na Windows sama oznámí**, že ClipFarm se teď instaluje jako program, a nabídne ⬇ Stáhnout.
- **Nový ClipFarm si při prvním spuštění sám najde staré klipy** (plocha, Stažené, Dokumenty – i jen zkopírované
  složky se streamy) a nabídne Přesunout, případně Vybrat složku. „Teď ne“ platí do další instalace, kdykoli jindy
  z Nastavení. Přesun na jiný disk je bezpečný: originál se maže až po hotové kopii. (#42)
- Stará a nová verze můžou běžet zároveň a nehádají se o okno.

Nahrávání a stříhání:

- **Kick chat se zase nahrává.** Kick potichu změnil klíč chatu, takže chat byl prázdný a ClipFarm vybíral momenty
  jen podle toho, kdo víc křičí. Kdyby ho Kick změnil znovu, log to řekne jednou a jasně.
- **Klipy na výšku 9:16 se stříhají několikrát rychleji** – rozmazané pozadí už se nepočítá v plném rozlišení,
  stejně je rozmazané.
- **Stop při nahrávání nebo stahování smaže i rozpracovaný záznam** (okno předem varuje, že se nic neuloží);
  kdo chce klipy, má Ukončit a nastříhat.
- **Výpadek internetu už nahrávání neukončí:** když po přerušení nejde zjistit, jestli kanál pořád vysílá, ClipFarm
  to 5 minut zkouší znovu. Hlídání kanálu dá nepovedenému nahrávání ještě dvě šance.
- **Nedokončené nahrávky** (spadlá úloha, vypnutý počítač) okno hned nabídne zachránit a rovnou k nim spočítá skóre.
- **Datum živáku je místní** – nahrávání po půlnoci už nepatří do včerejška – a dlouhé názvy videí se ve složkách
  usekávají na hranici slova, ne uprostřed s „#“ na konci.
- **Moment uprostřed ticha (BRB, černá obrazovka) se přeskočí** – chat může šílet, klip z pauzy ale nikoho
  nezajímá. Vadný kus videa neshodí celé stříhání a nejvyšší skóre konečně sedí s tabulkou limitů.

Okno:

- **Hlášky jsou malé karty vpravo nahoře** (klik je zavře, informace po chvíli zmizí samy). Když doběhne víc úloh
  naráz, Hotovo ukáže všechny, ne jen tu poslední.
- **Nové klipy k ohodnocení už nepřepnou okno pod rukou**, když zrovna klikáš nebo píšeš – nabídnou Projet teď.
  Konec náhodných „Smazat“.
- **Karta Běží:** správný popisek hned od začátku (Stahování / Nahrávání / Stříhání), u živáku nahraný čas,
  posledních 10 minut časovače po sekundách, štítek hlídání a u jeho Stopu upozornění, že skončí i hlídání.
- **Karta Streamy:** náhled i u streamu bez klipů, po konci úlohy se stav hned obnoví, seznam při zaškrtávání
  neposkakuje a datum je všude ve stejném tvaru.
- **Doladit střih:** pás snímků funguje i v ClipFarm.exe, posuvník jde šipkami po 1 s (Shift 0,1 s,
  PageUp / PageDown 5 s) a před uložením se okno zeptá.
- **Zakázané notifikace:** zaškrtávátko se vypne a okno poradí, kde je v prohlížeči povolit, místo aby tiše
  doufalo.

Logy a diagnostika:

- **Podrobné logy, průběžně i během nahrávání:** čas a fáze u každého řádku, na začátku verze, systém a nástroje,
  dál průběh stahování / nahrávání každých 30 s, stav Kick chatu, nalezené momenty a jak dlouho se který klip
  stříhal; při chybě celý výpis. Chyby okna jdou do klipy\_logy\okno.txt.
- **Nastavení → Uložit diagnostiku:** ZIP s logy a popisem systému (bez videí a přihlašovacích údajů). Když něco
  nejde, stačí poslat ten – žádné „a co přesně jsi zmáčkl?“.

Opravy:

- Hromadné Smazat v galerii zase maže (dřív jen předstíralo práci).
- Přestříhat funguje i se zaškrtnutým „Spustit, až bude živě“.
- Stažené video se neztratí, když yt-dlp skončí chybou až po stažení.
- Změna konce nahrávání ho už nemůže omylem ukončit hned.
- Stop u hlídání už nezavře okno ClipFarmu otevřené kvůli hodnocení klipů.
- Mazání starých zdrojů nespadne v půlce a okno nesahá na pomocné složky.
- Bezpečnost: okno nejde vložit do cizí stránky a přihlášení nejde obejít ani přes nástroje pro vývojáře.

## v1.07.01 – 2026-11-02

Nové:

- **Hláška, když úloha skončí:** okno řekne „✔ Hotovo“, nebo „✖ Skončilo chybou“ s posledním řádkem logu
  (dřív úloha jen tiše zmizela z karty Běží).
- **Systémové notifikace:** když okno ClipFarmu není vpředu, konec úlohy (Hotovo / chyba) i nové klipy
  k ohodnocení přijdou jako notifikace systému. Zapnout / vypnout jde v Nastavení; o povolení se prohlížeč
  zeptá při zapnutí nebo prvním spuštění úlohy. (#17)
- **Kick VOD, který nejde stáhnout:** hláška odkáže na přesnou chybu v logu a u „HTTP Error 403“ poradí
  nahrávat živě. (#20)

Opravy:

- **Windows: přestříhání při otevřeném klipu** už nerozbije stream – když je některý starý klip otevřený, staré
  klipy zůstanou beze změny a okno řekne proč; přehrávač v okně se navíc před přestříháním a při přepnutí karty
  uvolní (a skrytý klip nehraje dál).
- **Hromadný export** už tiše nevynechá klipy se stejným jménem (části streamu po výpadku, dvě videa za den):
  dostanou „(2)“.
- Cizí soubor v klipy/_logy/ nezastaví živé údaje okna; vadný čas zprávy v chatu neshodí analýzu; mazání
  klipu / zdroje / streamu z okna nemůže proběhnout souběžně se spuštěnou úlohou.

Odebráno:

- **Původní okno v tkinteru** (`--tk`) a tkinter z instalaček – výchozí je webové okno.
- **Aktualizace staženého zipu** – u soukromého repa nefungovala; aktualizuje se přes git (později .exe).
- **Stránky klipy/index.html a index.html streamů** – nahradila je galerie v okně (staré soubory můžeš smazat).

## v1.06.01 – 2026-10-19

Nové:

- **Hranice klipů u prolínaček:** ClipFarm pozná i pomalou prolínačku mezi scénami (dřív jen tvrdý střih), takže
  klip nezačne ani neskončí rozmazanou směsí dvou scén – začne až po prolínačce a skončí před ní. (#9)
- **Heatmapa YouTube:** u videí z YouTube s „nejpřehrávanějšími“ úseky (do zhruba 50 min délky) se bere
  jako další signál vedle zvuku a chatu – lepší výběr hlavně u videí bez chatu. Starší stažená videa si ji při
  přepočtu nebo přestříhání jednou dotáhnou. (#10)
- **Projet nové klipy hned po streamu:** když se nastříhá nový stream nebo video, otevře se okno ClipFarmu (nebo
  se přepne už otevřené) s jeho klipy jeden po druhém – → nechat, ← smazat, ↓ nevím (i tažením karty). Mazání
  až na konci, po potvrzení. Vypnout jde proměnnou CLIPFARM_REVIEW=0.
- **Staré zdrojové video uvolní místo:** zdroje starší než 30 dní (od stažení nebo nahrání) okno po spuštění
  nabídne ke smazání se seznamem a velikostí – bez potvrzení se nic nesmaže. Klipy, náhledy a chat zůstanou.
  Karta Streamy ukazuje, za kolik dní se zdroj nabídne. Jiná doba CLIPFARM_SOURCE_DAYS=60, vypnout 0. (#13)

Opravy:

- **Výpadek během nahrávání Kicku:** když se stream na chvíli přeruší a kanál pořád vysílá, nahrávání pokračuje
  hned (další část jako samostatný stream, předchozí se mezitím stříhá) – i při hlídání. Dřív skončilo a zbytek
  streamu se nenahrál. Po „Ukončit a nastříhat“ nebo časovači se dál nenahrává.

## v1.05.03 – 2026-10-19

Nové:

- **Hezčí adresa okna:** http://clipfarm.localhost:8765 místo http://127.0.0.1:8765 (jen pro tenhle počítač
  jako dřív, nic se nenastavuje). Nastavení okna se po přechodu jednou vrátí na výchozí. Kdyby prohlížeč adresu
  nenašel, funguje dál http://127.0.0.1:8765/app/ (návod v README, Když něco nejde).

## v1.05.02 – 2026-10-11

Opravy:

- **Spustit, až bude živě (Kick):** po „Ukončit a nastříhat“ nebo uplynulém časovači se ten samý stream už
  nenahrává znovu dokola. Hlídání počká na další stream; úplně ho ukončí Stop.

## v1.05.01 – 2026-10-11

Nové:

- **Karta Streamy:** všechny streamy a videa se zdrojovým videem – počet klipů, nejvyšší skóre, délka, velikost
  zdroje a tabulka „kolik klipů by dal limit“ (limit z Nastavení zvýrazněný). Zaškrtnutý stream jde přestříhat
  nebo přepočítat (jen jeden naráz), smazat zdroj nebo celý stream i u víc najednou. Akce celého streamu se sem
  přesunuly z detailu klipu. (#28)
- **Vlastní potvrzovací dialog** místo okna prohlížeče u mazání, přestříhání, zastavení i aktualizace: okolí se
  rozmaže, nevratné akce mají červené tlačítko, mazání klipů ukáže jejich náhledy, Esc = Zrušit. (#29)

Opravy:

- Okno po aktualizaci ClipFarmu nezůstane prázdné: prohlížeč si už nenechá starý skript okna z mezipaměti.

## v1.04.01 – 2026-10-08

Nové:

- **Náhledy klipů:** ke každému klipu se uloží obrázek ze snímku ve vrcholu reakce (01.jpg vedle 01.mp4)
  a ukáže se na stránce streamu i v galerii okna. Starým klipům je okno doplní samo po spuštění. (#6)
- **Nové okno:** ClipFarm se otevírá v prohlížeči jako aplikace (Chrome, Edge, Brave, Vivaldi, Chromium), vzhled
  podle návrhu „Feed“ – Nastavení, karta Běží s odpočtem a logem, varování o aktualizaci a novinky. Bez nich se
  otevře v běžném prohlížeči. Server běží jen na tomhle počítači; zavření okna úlohy nezastaví. Původní okno:
  ClipFarm.py --tk. (#19)
- **Galerie klipů ve webovém okně:** všechny klipy jako karty s náhledem, skóre a délkou, filtr podle streamera,
  řazení Nejlepší / Nejnovější, detail s přehrávačem, stažení klipu (s názvem podle streamera a data), smazání
  a akce celého streamu. (#7)
- **Doladit střih:** v detailu klipu pás snímků kolem klipu se značkou vrcholu reakce, posuvníky Začátek a Konec
  s náhledem ze zdroje a „Uložit a přestříhat“ – přestříhá jen ten klip, i s náhledem. (#8)
- **Hromadný výběr a export:** klipy v galerii jde zaškrtnout (i „Vybrat vše“ podle filtru) a stáhnout najednou
  jako ZIP, nebo smazat. Soubory se jmenují podle streamera a data, ne 01.mp4. (#24)

## v1.03.02 – 2026-10-08

Opravy:

- **Kvalita u Kicku:** nabídka ukazuje „1080p (max. pro Kick)“ a 1440p se u Kicku při spuštění samo přepne
  na 1080p (výš Kick nevysílá).
- **Aktualizace na Windows:** „Aktualizovat teď“ (hlavně yt-dlp přes winget) už nehlásí chybu
  „unsupported operand type(s) for +: 'NoneType' and 'str'“. (#22)
- **Stop na Windows** (např. dvě hlídání Kick kanálů): když taskkill úlohu nezastaví, ClipFarm ji ukončí
  napřímo, zastaví i její yt-dlp a když se to přesto nepovede, ukáže proč (dřív tiše nic). Stejnou věc už
  nejde spustit podruhé, dokud běží, a každá úloha má vlastní log. (#21)

## v1.03.01 – 2026-10-06

Nové:

- **Kvalita stahování:** v okně se dá vybrat 720p, 1080p (výchozí) nebo 1440p. Když ji video nebo stream nemá,
  vezme se nejbližší dostupná (Kick vysílá nejvýš 1080p). V terminálu CLIPFARM_QUALITY=720 (nebo 1080, 1440).

## v1.02.01 – 2026-10-06

Nové:

- **Spustit, až bude živě (Kick):** hlídá kanál, i když zrovna nevysílá. Jakmile začne, nahraje a nastříhá
  stream a hlídá dál na další (v terminálu --watch).
- **YouTube video až v 1080p** (dřív 720p).
- **■ Stop u každé úlohy:** nahrávání, hlídání i přestříhání jde zastavit hned, bez stříhání.
- **Windows:** vlastní ikona ClipFarm na ploše, v nabídce Start i v okně; instalačka ClipFarm po instalaci
  sama spustí.
- **Varování po spuštění, když chybí yt-dlp nebo ffmpeg** (dřív selhalo až stahování).
- **Instalace na Linuxu:** chybějící nebo starý Node.js stáhne z nodejs.org (Node 22+, YouTube ho potřebuje),
  ověří, že ffmpeg umí kódovat klipy, funguje i s terminálem Ptyxis (Fedora 41+) a při chybě nechá okno
  otevřené.

Opravy:

- Okno nezamrzne, když se aktualizace přeruší (spadlé spojení).
- Hlídání pokračuje i po nepovedené nahrávce.
- Windows: ClipFarm spuštěný hned po instalaci najde yt-dlp, ffmpeg i Node.js.
- Stop už nemůže zasáhnout proces z minulého streamu.
- Konec nahrávání nastavený během hlídání už neukončí další stream hned po startu.
- Nepovedené přestříhání (ani jeden klip) nesmaže předchozí klipy.
- Moc krátká nahrávka, useknutý chat nebo vadná zpráva z Kick chatu už nic neshodí.
- macOS: zavření Terminálu po instalaci nezavře ClipFarm. Windows: instalačka pozná chybějící winget.

## v1.01.01 – 2026-10-04

První číslovaná verze.

- **Zdroje:** YouTube video nebo záznam streamu (video max. 720p + záznam chatu), živý stream z Kicku
  (nahrávání videa i chatu do konce streamu, po nastavenou dobu nebo do „Ukončit a nastříhat“).
- **Výběr momentů:** reakce chatu (spam jednoho člověka se nepočítá, bonus za emoty jen od 3+ lidí) a hlasitost,
  porovnání s okolím 60 s před a po, delší vzrušené pasáže, limit skóre místo pevného počtu klipů.
- **Hranice klipů:** začátek na střihu scény nebo v pauze mezi slovy, konec až reakce opadne, nikdy přes ticho;
  klipy na šířku 16:9 nebo na výšku 9:16 (Shorts, TikTok, Reels).
- **Okno ClipFarm** (Linux, Windows, macOS): karta Běží (odpočet do konce, časovač i za běhu, Ukončit a
  nastříhat, Stop přestříhání, neuspávání počítače, log) a karta Klipy (zdrojová videa a klipy, přehrání,
  ✂ Přestříhat, Σ Přepočítat skóre, prohlížení přes vestavěný server, mazání).
- **Aktualizace:** po startu výrazné varování o nové verzi ClipFarmu a zastaralém yt-dlp; git klon přes
  `git pull`, stažený zip stáhne celou novou verzi a smaže soubory, které už do ní nepatří. Po aktualizaci
  okno ukáže novinky z tohoto changelogu.
- **Instalace:** `instalace-linux.sh` (Fedora, Ubuntu/Debian, Arch), `instalace-windows.bat` (winget),
  `instalace-macos.command` (Homebrew).
