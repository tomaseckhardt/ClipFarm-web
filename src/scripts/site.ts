// Společný JS všech stránek: objevování při scrollu, hlavička, videa, počítadla, záložky, „spotlight“ na kartách.
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

// objevování při scrollu
const revealIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      revealIO.unobserve(e.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
);
document.querySelectorAll('[data-reveal]').forEach((el) => revealIO.observe(el));

// hlavička: pozadí až po odscrollování
const header = document.querySelector('[data-header]');
const onScroll = () => header?.classList.toggle('scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// videa: přehrávat jen když jsou vidět; pozastavit mimo obraz; s „omezit pohyb“ / šetřením dat nespouštět samo
const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
const slowNet = conn?.saveData === true || /(^|-)2g|3g/.test(conn?.effectiveType ?? '');
const autoplayOK = () => !reduce.matches && !slowNet;
const players = [...document.querySelectorAll<HTMLElement>('.player')];

const videoIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting && autoplayOK() && !v.dataset.userPaused) v.play().catch(() => {});
      else if (!e.isIntersecting && !v.paused) v.pause();
    }
  },
  { threshold: 0.35 },
);

for (const player of players) {
  const v = player.querySelector('video');
  if (!v) continue;
  const playBtn = player.querySelector<HTMLButtonElement>('[data-act="play"]');
  const soundBtn = player.querySelector<HTMLButtonElement>('[data-act="sound"]');
  const sync = () => {
    player.classList.toggle('playing', !v.paused);
    playBtn?.setAttribute('aria-label', v.paused ? 'Přehrát video' : 'Pozastavit video');
  };
  v.addEventListener('play', sync);
  v.addEventListener('pause', sync);
  const syncSound = () => {
    soundBtn?.setAttribute('aria-pressed', String(!v.muted));
    const label = soundBtn?.querySelector('.ctl-label');
    if (label) label.textContent = v.muted ? 'Zapnout zvuk' : 'Vypnout zvuk';
  };
  v.addEventListener('volumechange', syncSound);
  playBtn?.addEventListener('click', () => {
    if (v.paused) { delete v.dataset.userPaused; v.play().catch(() => {}); }
    else { v.dataset.userPaused = '1'; v.pause(); }
  });
  soundBtn?.addEventListener('click', () => {
    const on = v.muted;
    if (on) document.querySelectorAll<HTMLVideoElement>('.player video').forEach((o) => { if (o !== v) o.muted = true; });
    v.muted = !on;
    syncSound();
    if (on && v.paused) { delete v.dataset.userPaused; v.play().catch(() => {}); }
  });
  videoIO.observe(v);
}

// počítadla: data-count="10800" data-format="time" → 0:00:00 … 3:00:00
const fmt = (n: number, f?: string) => {
  if (f === 'time') {
    const s = Math.round(n);
    return `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }
  return Math.round(n).toLocaleString('cs-CZ');
};
const countIO = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    countIO.unobserve(e.target);
    const el = e.target as HTMLElement;
    const to = Number(el.dataset.count);
    const f = el.dataset.format;
    if (reduce.matches) { el.textContent = fmt(to, f); continue; }
    const dur = Number(el.dataset.duration ?? 1400);
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = fmt(to * (1 - Math.pow(1 - k, 3)), f);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}, { threshold: 0.6 });
document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => countIO.observe(el));

// záložky (role=tablist): klik, šipky, Home/End
for (const list of document.querySelectorAll<HTMLElement>('[role="tablist"]')) {
  const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const select = (tab: HTMLButtonElement, focus = false) => {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
      if (panel) panel.hidden = !on;
    }
    if (focus) tab.focus();
    list.dispatchEvent(new CustomEvent('tabchange', { detail: tab }));
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      const j = k === 'ArrowRight' ? i + 1 : k === 'ArrowLeft' ? i - 1 : k === 'Home' ? 0 : k === 'End' ? tabs.length - 1 : null;
      if (j === null) return;
      e.preventDefault();
      select(tabs[(j + tabs.length) % tabs.length], true);
    });
  });
}

// „spotlight“: světlo karty jde za myší (jen myš, ne dotyk)
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener('pointermove', (e) => {
    const card = (e.target as Element).closest?.<HTMLElement>('.spot');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
}

// „Poslat si odkaz do PC“: na mobilu (CSS ukazuje jen na úzkých displejích) sdílení, jinak zkopírovat odkaz
const shareBox = document.querySelector<HTMLElement>('[data-share-box]');
if (shareBox) {
  shareBox.hidden = false;
  shareBox.querySelector<HTMLButtonElement>('[data-share]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const link = location.href.split('#')[0];
    try {
      if (navigator.share) await navigator.share({ title: 'ClipFarm', text: 'ClipFarm – automatické klipy ze streamů. Mrkni na to na počítači:', url: link });
      else { await navigator.clipboard.writeText(link); btn.textContent = 'Odkaz zkopírovaný ✓'; }
    } catch { /* sdílení zrušené */ }
  });
}
