/**
 * Scent Garden — UI behaviour (replaces the prototype's DCLogic class).
 * Scroll reveals, count-up stats, drift columns, blooms carousel, mobile nav.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ───────── Scroll reveal ───────── */
function initReveal() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const show = (el: Element) => el.classList.add('is-visible');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    nodes.forEach(show);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          show(e.target);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
  );
  nodes.forEach((el) => io.observe(el));
}

/* ───────── Count-up stats ───────── */
function initCountUp() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-count]');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return; // final values are already in the HTML

  const format = (el: HTMLElement, value: number, decimals: number) => {
    el.textContent = (el.dataset.prefix ?? '') + value.toFixed(decimals) + (el.dataset.suffix ?? '');
  };

  const run = (el: HTMLElement) => {
    const raw = el.dataset.count!;
    const target = parseFloat(raw);
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      format(el, target * eased, decimals);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          run(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.4 },
  );

  nodes.forEach((el) => {
    const decimals = el.dataset.count!.includes('.') ? el.dataset.count!.split('.')[1].length : 0;
    format(el, 0, decimals);
    io.observe(el);
  });
}

/* ───────── Drift columns ─────────
 * Animate the track from 0 to −(trackHeight − viewportHeight), 35s linear, alternate. */
function initDrift() {
  const tracks = document.querySelectorAll<HTMLElement>('[data-drift]');
  const measure = (track: HTMLElement) => {
    const viewport = track.parentElement!;
    const drift = Math.max(0, track.scrollHeight - viewport.clientHeight);
    if (reduceMotion.matches || drift === 0) {
      track.classList.remove('is-drifting');
      return;
    }
    track.style.setProperty('--drift', `${-drift}px`);
    track.classList.add('is-drifting');
  };
  const ro = new ResizeObserver((entries) => {
    for (const e of entries) {
      const el = e.target as HTMLElement;
      measure(el.hasAttribute('data-drift') ? el : (el.firstElementChild as HTMLElement));
    }
  });
  tracks.forEach((track) => {
    ro.observe(track);
    ro.observe(track.parentElement!);
  });
  reduceMotion.addEventListener('change', () => tracks.forEach(measure));
}

/* ───────── Blooms carousel ───────── */
function initCarousel() {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-carousel-track]')!;
    const counter = root.querySelector<HTMLElement>('[data-carousel-counter]');
    const fill = root.querySelector<HTMLElement>('[data-carousel-fill]');
    const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
    const slides = Array.from(track.children) as HTMLElement[];
    const total = slides.length;
    const pad = (n: number) => String(n).padStart(2, '0');

    const step = () => (slides[0]?.getBoundingClientRect().width ?? 0) + parseFloat(getComputedStyle(track).columnGap || '24');

    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      const atEnd = track.scrollLeft >= max - 2;
      const i = atEnd ? total - 1 : Math.min(total - 1, Math.max(0, Math.round(track.scrollLeft / (step() || 1))));
      if (counter) counter.textContent = `${pad(i + 1)} / ${pad(total)}`;
      if (fill) fill.style.width = `${((i + 1) / total) * 100}%`;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = atEnd;
    };

    const behavior = (): ScrollBehavior => (reduceMotion.matches ? 'auto' : 'smooth');
    prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: behavior() }));
    next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: behavior() }));
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next?.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev?.click(); }
    });
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  });
}

/* ───────── Mobile nav ───────── */
function initNav() {
  const burger = document.querySelector<HTMLButtonElement>('.sg-nav-burger');
  const menu = document.getElementById('sg-menu');
  if (!burger || !menu) return;
  const setOpen = (open: boolean) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
  };
  burger.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      burger.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !(e.target as Element).closest('.sg-nav')) setOpen(false);
  });
}

/* Links whose real URL hasn't been filled in yet (src/data/links.ts) shouldn't jump to the top. */
function initPlaceholderLinks() {
  document.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a[data-todo]')) e.preventDefault();
  });
}

initReveal();
initCountUp();
initDrift();
initCarousel();
initNav();
initPlaceholderLinks();
