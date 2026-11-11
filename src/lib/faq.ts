// Otázky a odpovědi pro Nápovědu (a výběr na úvodní stránce). Fakta jen z README.md a CHANGELOG.md ClipFarmu.
// `a` je HTML (píšu ho sám, žádný vstup od uživatele). `home: true` = ukázat i na úvodní stránce.

export type Faq = { id: string; q: string; a: string; home?: boolean };
export type FaqGroup = { id: string; title: string; items: Faq[] };

export const FAQ: FaqGroup[] = [
  {
    id: 'zaciname',
    title: 'Začínáme',
    items: [
      {
        id: 'co-je-clipfarm',
        q: 'Co přesně ClipFarm dělá?',
        a: `<p>Vložíš odkaz na YouTube video nebo živý stream z Kicku. ClipFarm ho stáhne (nebo nahrává), podle reakcí
          chatu a hlasitosti najde nejlepší momenty a nastříhá z nich klipy – na šířku 16:9, nebo na výšku 9:16 pro
          Shorts, TikTok a Reels. Ovládá se z jednoho okna, hotové klipy najdeš v galerii.</p>`,
      },
      {
        id: 'zdarma',
        q: 'Je ClipFarm zdarma?',
        home: true,
        a: `<p><strong>Prvních 14 dní ano.</strong> Nový účet dostane celý ClipFarm na zkoušku: žádné ořezané funkce,
          žádný vodoznak, žádná kreditka. Nahoře v okně svítí „Zkušební verze · zbývá N dní“, ať tě konec nepřekvapí.</p>
          <p>Potom přístup povoluje správce ClipFarmu: okno nabídne <strong>Mám zájem o přístup</strong>, správce to uvidí
          a přístup ti povolí – natrvalo, nebo na dobu určitou (třeba po měsících); podmínky ti řekne on. Sám od sebe
          ClipFarm nic nestrhává, kartu jsi nikam nezadával. Klipy ze zkušební doby ti zůstanou v každém případě.</p>`,
      },
      {
        id: 'system',
        q: 'Na jakém systému ClipFarm běží?',
        home: true,
        a: `<ul>
          <li><strong>Windows:</strong> jako normální program (ClipFarm.exe) s instalačkou.</li>
          <li><strong>Linux</strong> (Fedora 41+, Ubuntu 24.04+, Debian 13+, Arch): z gitu přes <code>instalace-linux.sh</code>.</li>
          <li><strong>macOS</strong> podporovaný není.</li></ul>
          <p>Autor ho zkouší na Linuxu (Fedora) a na Windows (ClipFarm.exe, zatím na dvou počítačích). Kdyby u tebe
          něco nešlo, <strong>Nastavení → Uložit diagnostiku</strong> pomůže chybu rychle najít.</p>`,
      },
      {
        id: 'smartscreen',
        q: 'Windows při instalaci varuje. Je to v pořádku?',
        home: true,
        a: `<p>Ano. Instalačka není podepsaná, proto Windows SmartScreen napoprvé varuje. Klikni na
          <strong>Další informace → Přesto spustit</strong>. Instaluje se jen pro tebe, bez administrátorských práv.</p>`,
      },
      {
        id: 'discord',
        q: 'Proč se přihlašuju přes Discord?',
        a: `<p>ClipFarm.exe při prvním spuštění chce přihlášení přes Discord – žádné další heslo do sbírky. Přihlašuješ
          se přímo na stránce Discordu, heslo ClipFarm nevidí. Správce pak v přehledu přístupů vidí tvůj e-mail a jméno
          z Discordu, aby věděl, komu přístup povoluje. Přístup ověří při každém spuštění a pak každých 6 hodin.</p>
          <p>Bez internetu funguje normálně ještě 3 dny od posledního ověření, potom jen galerie, střih a přestříhání
          (stahování a nahrávání zase po připojení). Gitová verze na Linuxu přihlášení nemá.</p>`,
      },
      {
        id: 'doinstalovat',
        q: 'Musím něco doinstalovat?',
        a: `<p><strong>Windows:</strong> nic. yt-dlp, ffmpeg i Node.js má ClipFarm.exe přibalené.</p>
          <p><strong>Linux:</strong> potřebuje Python 3.12+, yt-dlp, ffmpeg a Node.js 22+. <code>instalace-linux.sh</code>
          doinstaluje jen to, co chybí (yt-dlp do <code>~/.local/bin</code>; když chybí Node.js 22+, stáhne oficiální
          z nodejs.org).</p>`,
      },
      {
        id: 'kde-bezi',
        q: 'Běží ClipFarm u mě, nebo v cloudu?',
        a: `<p>U tebe. Stahování, nahrávání i stříhání běží na tvém počítači a klipy zůstávají na disku. Okno se otevře
          jako aplikace v prohlížeči na adrese <code>clipfarm.localhost:8765</code> – prohlížeč ji sám pošle na tenhle
          počítač, takže nic nenastavuješ a zvenku na ni nikdo nedosáhne. Přes internet se ověřuje jen přihlášení.</p>`,
      },
      {
        id: 'kde-klipy',
        q: 'Kde najdu hotové klipy?',
        a: `<p>V okně v kartě <strong>Klipy</strong>: karty s náhledem, ★ skóre a délkou, filtr podle streamera, řazení
          Nejlepší / Nejnovější. Víc klipů naráz stáhneš jako jeden ZIP a soubory se jmenují podle streamera a data,
          ne <code>01.mp4</code>.</p>
          <p>Na disku: ClipFarm.exe je má v <code>Dokumenty\\ClipFarm\\klipy</code>, gitová verze ve složce
          <code>klipy/</code> vedle <code>Klipy.py</code>.</p>`,
      },
      {
        id: 'co-dostanu',
        q: 'Co přesně dostanu?',
        a: `<p>Klipy jako běžná videa MP4 (01.mp4, 02.mp4…) a ke každému náhled ze snímku ve vrcholu reakce. Klipy mají
          stejné rozlišení jako zdroj, na výšku 9:16 vždy 1080×1920. Ve složce streamu zůstane i zdrojové video a chat,
          takže jde kdykoli přestříhat s jiným limitem nebo formátem.</p>
          <p>Nahrát klip na TikTok nebo YouTube už je na tobě – v okně ho stáhneš jedním klikem, víc klipů jako ZIP.</p>`,
      },
      {
        id: 'vic-kanalu',
        q: 'Můžu hlídat víc kanálů naráz?',
        a: `<p>Ano. Každý kanál je samostatná úloha v kartě <strong>Běží</strong> s vlastním logem a vlastním Stop – třeba
          dvě hlídání Kicku přes noc. Stejný kanál dvakrát naráz spustit nejde.</p>
          <p>Pozor: živák se nahrává od chvíle, kdy ho spustíš, ne od začátku streamu (chat taky). Proto se hodí zapnout
          <strong>Spustit, až bude živě</strong> dopředu – ClipFarm počká na začátek sám.</p>`,
      },
      {
        id: 'misto',
        q: 'Kolik místa na disku stream zabere?',
        home: true,
        a: `<p>Za hodinu streamu zhruba <strong>1,5 GB v 720p</strong>, <strong>3,5 GB v 1080p</strong> (výchozí)
          a <strong>6,5 GB v 1440p</strong>. Klipy mají stejné rozlišení jako zdroj, na výšku 9:16 vždy 1080×1920.</p>
          <p>Zdrojová videa starší než 30 dní okno nabídne ke smazání (bez potvrzení nesmaže nic). Klipy, náhledy
          a chat zůstanou, jen stream už nepůjde přestříhat.</p>`,
      },
      {
        id: 'aktualizace',
        q: 'Jak se ClipFarm aktualizuje?',
        a: `<p>Okno po spuštění zkontroluje novou verzi ClipFarmu i yt-dlp. ClipFarm.exe pak nabídne
          <strong>⬆ Aktualizovat teď</strong>: stáhne instalačku, ověří její kontrolní součet (SHA256), potichu ji
          nainstaluje a znovu se otevře – i s přehledem novinek. Klipy v Dokumentech zůstanou. Když zrovna něco
          nahrává nebo stříhá, aktualizace počká.</p>
          <p>Gitová verze na Linuxu se aktualizuje stejným tlačítkem přes <code>git pull</code>.</p>`,
      },
    ],
  },
  {
    id: 'momenty',
    title: 'Jak vybírá momenty',
    items: [
      {
        id: 'jak-pozna',
        q: 'Jak ClipFarm pozná dobrý moment?',
        home: true,
        a: `<p>Pro každou sekundu streamu spočítá <strong>skóre</strong>: o kolik směrodatných odchylek je moment
          výraznější než běžný stav streamu.</p>
          <ul>
            <li><strong>Chat:</strong> zprávy během 10 s po momentu (diváci reagují se zpožděním). Každý člověk se
            počítá nejvýš jednou za 10 s – spam jednoho člověka nic nezmění. Bonus za <code>KEKW</code>,
            <code>xddd</code>, <code>LUL</code>, <code>???</code>, 😂… jen když je během ~10 s napíšou aspoň
            <strong>3 různí lidé</strong>.</li>
            <li><strong>Zvuk:</strong> hlasitost (smích, křik) kolem momentu.</li>
            <li>Obojí se porovnává s okolím <strong>60 s před a 60 s po</strong>. Krátký výkyv tak vyjde vysoko,
            trvalá změna (přepnutí scény, konec pauzy) ne. Druhé měřítko hledá delší vzrušené pasáže
            (30 s oproti 2 min okolí).</li>
          </ul>
          <p>Klip vznikne z každého momentu nad <strong>limitem skóre</strong>, aspoň 2 minuty od sebe. Počet klipů
          omezený není.</p>`,
      },
      {
        id: 'hranice',
        q: 'Kde klip začíná a kde končí?',
        a: `<p>Začátek je na poslední změně scény 8–30 s před momentem (jinak 22 s před ním). Konec přijde, až reakce
          opadne (8–40 s po momentu), na střihu scény nebo v pauze mezi slovy. Klipy mají typicky 20–60 s.</p>
          <p>Ticho delší než 1,5 s (černá obrazovka, pauza streamu) uvnitř klipu nikdy není a pomalou prolínačku mezi
          scénami ClipFarm taky pozná – klip nezačne ani neskončí rozmazanou směsí dvou scén.</p>`,
      },
      {
        id: 'kolik-klipu',
        q: 'Kolik klipů z jednoho streamu vznikne?',
        a: `<p>Tolik, kolik je momentů nad <strong>limitem skóre</strong> (výchozí 2,5; víc = méně a lepších klipů).
          V kartě Streamy je u každého streamu tabulka, <strong>kolik klipů by dal který limit</strong>. Málo nebo
          moc klipů? Nastav limit podle tabulky a dej <strong>✂ Přestříhat</strong> – bez nového stahování.</p>`,
      },
      {
        id: 'doladit',
        q: 'Klip začíná moc brzo nebo končí uprostřed věty. Co s tím?',
        a: `<p>Otevři klip a dej <strong>Doladit střih</strong>. Je to malé studio: přehled 5 minut před klipem
          a 5 minut po něm, časová osa se snímky, hlasitostí (zeleně), chatem po sekundách (oranžově) a značkou
          vrcholu reakce. Úchyty začátku a konce se při puštění přichytí k nejbližší pauze ve zvuku, takže klip
          neusekne větu. Pak <strong>Uložit a přestříhat</strong> – přestříhá se jen tenhle klip.</p>
          <p>Klávesy jako ve střižně: mezerník přehrát / zastavit, <kbd>I</kbd> / <kbd>O</kbd> začátek / konec,
          <kbd>J</kbd> <kbd>K</kbd> <kbd>L</kbd>, šipky po 1 s (Shift 0,1 s).</p>`,
      },
      {
        id: 'na-vysku',
        q: 'Umí to klipy na výšku pro TikTok?',
        a: `<p>Ano. V Nastavení zaškrtni <strong>Klipy na výšku 9:16</strong>: celý obraz na rozmazaném pozadí,
          vždy 1080×1920. V detailu klipu jde i <strong>9:16 kamera nahoře</strong> – nahoře obličej streamera přes
          celou šířku, dole celá hra (stačí jednou natáhnout obdélník přes kameru, ClipFarm si ho pamatuje pro celý
          kanál).</p>`,
      },
      {
        id: 'po-streamu',
        q: 'Musím po každém streamu procházet všechny klipy?',
        a: `<p>Nemusíš, ale jde to rychle. Když se nový stream nastříhá, ClipFarm ukáže jeho klipy jeden po druhém:
          video se samo přehraje a ty dáš <strong>→ Nechat</strong>, <strong>← Smazat</strong> nebo
          <strong>↓ Nevím</strong> (i potažením karty). Smaže se až na konci po potvrzení.</p>`,
      },
    ],
  },
  {
    id: 'nejde',
    title: 'Když něco nejde',
    items: [
      {
        id: 'chyba',
        q: 'V okně je „✖ Skončilo chybou“.',
        a: `<p>Podrobnosti jsou v logu – v kartě <strong>Běží</strong> (průběžně, i během nahrávání), nebo
          v <code>klipy/_logy/</code>. Nejjednodušší je <strong>Nastavení → Uložit diagnostiku</strong> a ZIP poslat:
          jsou v něm logy a popis systému, bez videí a bez přihlašovacích údajů.</p>`,
      },
      {
        id: 'chybi-ytdlp',
        q: 'Po spuštění vyskočí „Chybí yt-dlp / ffmpeg“.',
        a: `<p>Spusť znovu instalačku pro svůj systém, chybějící nástroje doinstaluje.</p>`,
      },
      {
        id: 'youtube',
        q: 'YouTube nestahuje („Sign in to confirm…“, chyby JS).',
        a: `<p>Aktualizuj yt-dlp (ClipFarm na novou verzi upozorní sám po spuštění, nebo <code>yt-dlp -U</code>)
          a zkontroluj <code>node --version</code> – YouTube potřebuje Node.js 22+. YouTube i Kick občas mění web
          a starý yt-dlp pak přestane stahovat.</p>`,
      },
      {
        id: 'ikona',
        q: 'Na Linuxu ikona ClipFarmu nic neotevře.',
        a: `<p>Na Linuxu spusť v terminálu <code>python3 ClipFarm.py</code> a uvidíš chybu.</p>`,
      },
      {
        id: 'localhost',
        q: 'Prohlížeč hlásí, že clipfarm.localhost nenašel.',
        a: `<p>Otevři <code>http://127.0.0.1:8765/app/</code> – je to stejné okno.</p>`,
      },
      {
        id: 'nedokoncene',
        q: 'Nahrávání spadlo nebo se vypnul počítač.',
        a: `<p>Nedokončené nahrávky okno po spuštění samo nabídne <strong>Zachránit</strong>: převede je na normální
          video a spočítá k nim skóre. Pak jdou v kartě Streamy nastříhat i smazat.</p>`,
      },
    ],
  },
  {
    id: 'omezeni',
    title: 'Omezení',
    items: [
      {
        id: 'bez-chatu',
        q: 'Funguje to i u videí bez chatu?',
        a: `<p>Ano, ale slaběji. Bez chatu (YouTube reuploady, nahraná videa) rozhoduje jen zvuk, takže limit skóre
          sniž (třeba na 1,5) – správnou hodnotu ukáže tabulka limitů v kartě Streamy. U YouTube videí s
          „nejpřehrávanějšími“ úseky (do zhruba 50 min) pomůže i heatmapa YouTube.</p>`,
      },
      {
        id: 'twitch',
        q: 'Funguje to s Twitchem?',
        home: true,
        a: `<p>Twitch mezi podporovanými zdroji není. ClipFarm umí <strong>YouTube</strong> (videa i záznamy streamů)
          a <strong>Kick</strong> (živé streamy, hlídání kanálu a některé záznamy). Vlastní video zpracuje taky – viz
          otázka o záznamu z OBS.</p>`,
      },
      {
        id: 'obs',
        q: 'Můžu použít vlastní záznam streamu (třeba z OBS)?',
        a: `<p>Ano. Dej video do složky streamu jako <code>stream.mp4</code>
          (<code>klipy/&lt;kanál&gt;/&lt;datum – název&gt;/</code>, u ClipFarm.exe v <code>Dokumenty\\ClipFarm</code>)
          a v okně dej <strong>✂ Přestříhat</strong>. Bez chatu ale rozhoduje jen zvuk, takže limit skóre sniž
          (třeba na 1,5).</p>`,
      },
      {
        id: 'kick-vod',
        q: 'Jde stáhnout i starý záznam (VOD) z Kicku?',
        a: `<p>Některé ano (ověřeno až 1080p60), jiné Kick odmítne (chyba 403 – jen pro předplatitele nebo ochrana
          proti robotům); ClipFarm pak poradí nahrávat živě. U VODu není chat, momenty se vybírají jen podle zvuku.</p>
          <p>Živý stream ClipFarm nahrává od chvíle spuštění, ne od začátku streamu – stejně tak chat. Proto se hodí
          <strong>Spustit, až bude živě</strong>: počká na začátek streamu sám.</p>`,
      },
      {
        id: 'brb',
        q: 'Může ClipFarm vybrat i nesmysl?',
        a: `<p>Občas. Prolínačka mezi scénami bez ztišení se pozná jen podle obrazu, ne vždy. A výpadek streamu
          (BRB obrazovka) s „???“ v chatu může vypadat jako reakce – moment uprostřed ticha ale ClipFarm přeskočí.
          A po streamu ti nové klipy ukáže k rychlému ohodnocení: → Nechat, ← Smazat.</p>`,
      },
      {
        id: 'viko',
        q: 'Nahrává, i když zaklapnu notebook?',
        a: `<p>ClipFarm počítač neuspí, dokud něco běží (na Linuxu ani po zaklapnutí víka). Na Windows zaklapnutí
          víka řídí Nastavení napájení: „Při zavření víka: Nic nedělat“. Nahrávání běží dál i po zavření okna.</p>`,
      },
      {
        id: 'macos',
        q: 'Bude ClipFarm pro macOS?',
        a: `<p>Teď ne – macOS podporovaný není (v1.10.01 jeho instalaci odebrala).</p>`,
      },
    ],
  },
];

export const HOME_FAQ = FAQ.flatMap((g) => g.items.filter((i) => i.home));
