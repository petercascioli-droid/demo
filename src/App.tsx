import { useEffect, useRef } from 'react';

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  p1: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
  p2: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
  p3: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop",
  p4: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
  portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );

    const elements = container.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md gpu px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex flex-col">
            <span className="font-display text-[1.125rem] tracking-[0.18em] uppercase">
              STUDIO STUDIO
            </span>
            <span className="kicker -mt-1">Architettura · Interni</span>
          </div>

          <nav className="hidden gap-8 md:flex">
            <a href="#lavori" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Lavori
            </a>
            <a href="#studio" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Studio
            </a>
            <a href="#servizi" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Servizi
            </a>
            <a href="#contatti" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Contatti
            </a>
          </nav>

          <a
            href="#contatti"
            className="md:hidden border border-foreground/30 px-4 py-2 text-xs tracking-[0.18em] uppercase transition-colors hover:bg-foreground hover:text-background"
          >
            Scrivi
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-32 sm:pb-24">
        <img
          src={IMAGES.hero}
          alt="Interno residenziale contemporaneo in luce naturale"
          width={1600}
          height={1920}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover gpu"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/40" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 text-background">
          <span className="kicker text-background/80 reveal">Portfolio · Demo</span>
          <h1 className="mt-2 font-display text-[clamp(2.75rem,11vw,6.5rem)] leading-[0.95] reveal">
            Lo spazio <br />
            <span className="italic font-light">come materia.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm text-background/80 font-light reveal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
          <div className="mt-8 reveal">
            <a
              href="#lavori"
              className="inline-block border border-background/70 px-6 py-3 text-xs tracking-[0.2em] uppercase transition-colors hover:bg-background hover:text-foreground"
            >
              Sfoglia i lavori
            </a>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-32">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <span className="kicker reveal">01 — Manifesto</span>
          <p className="font-display text-[clamp(1.6rem,5vw,2.75rem)] leading-[1.25] reveal">
            Plasmiamo volumi e luce per creare architetture essenziali.{' '}
            <span className="text-muted-foreground">
              Ogni progetto nasce da un ascolto profondo del luogo e delle persone che lo vivranno.
            </span>
          </p>
        </div>
      </section>

      {/* LAVORI */}
      <section id="lavori" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-32">
        <div className="flex items-end justify-between border-b border-border pb-6 reveal">
          <h2 className="text-3xl sm:text-5xl">Lavori selezionati</h2>
          <span className="kicker">04 progetti</span>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2">
          <div className="reveal">
            <div className="frame aspect-[4/5] w-full">
              <img
                src={IMAGES.p1}
                alt="Soggiorno residenziale minimale con travi a vista"
                width={1200}
                height={1500}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover gpu"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-xl sm:text-2xl">Progetto Uno</h3>
              <span className="kicker">Residenziale</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Roma · 2025</p>
          </div>

          <div className="reveal sm:mt-20" style={{ transitionDelay: '90ms' }}>
            <div className="frame aspect-[4/5] w-full">
              <img
                src={IMAGES.p2}
                alt="Cucina su misura in legno chiaro e pietra"
                width={1200}
                height={1500}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover gpu"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-xl sm:text-2xl">Progetto Due</h3>
              <span className="kicker">Cucina su misura</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Milano · 2024</p>
          </div>

          <div className="reveal">
            <div className="frame aspect-[4/5] w-full">
              <img
                src={IMAGES.p3}
                alt="Camera padronale con testiera in lino"
                width={1200}
                height={1500}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover gpu"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-xl sm:text-2xl">Progetto Tre</h3>
              <span className="kicker">Camera padronale</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Firenze · 2024</p>
          </div>

          <div className="reveal sm:mt-20" style={{ transitionDelay: '90ms' }}>
            <div className="frame aspect-[4/5] w-full">
              <img
                src={IMAGES.p4}
                alt="Spazio pubblico con arco in muratura"
                width={1200}
                height={1500}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover gpu"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-xl sm:text-2xl">Progetto Quattro</h3>
              <span className="kicker">Spazio pubblico</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Torino · 2023</p>
          </div>
        </div>
      </section>

      {/* STUDIO */}
      <section id="studio" className="bg-card py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="frame aspect-[4/5] w-full reveal">
              <img
                src={IMAGES.portrait}
                alt="Ritratto di un'architetta nel suo studio"
                width={1200}
                height={1504}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover gpu"
              />
            </div>

            <div className="flex flex-col reveal">
              <span className="kicker">02 — Studio</span>
              <h2 className="mt-2 text-3xl sm:text-5xl">
                Nome Cognome, <br />
                <span className="italic font-light text-muted-foreground">architetta</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
                <div>
                  <dt className="font-display text-3xl sm:text-4xl">12</dt>
                  <dd className="kicker mt-1">Anni</dd>
                </div>
                <div>
                  <dt className="font-display text-3xl sm:text-4xl">48</dt>
                  <dd className="kicker mt-1">Progetti</dd>
                </div>
                <div>
                  <dt className="font-display text-3xl sm:text-4xl">06</dt>
                  <dd className="kicker mt-1">Premi</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section id="servizi" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-32">
        <span className="kicker reveal">03 — Servizi</span>
        <div className="mt-8 border-t border-border">
          {[
            { num: '01', title: 'Interior Design', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.' },
            { num: '02', title: 'Progettazione', desc: 'Praesent libero. Sed cursus ante dapibus diam. Sed nisi.' },
            { num: '03', title: 'Direzione Lavori', desc: 'Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.' },
            { num: '04', title: 'Styling & Arredo', desc: 'Praesent mauris. Fusce nec tellus sed augue semper porta.' },
          ].map((s) => (
            <div
              key={s.num}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-6 border-b border-border py-7 md:grid-cols-[auto_1fr_1.2fr] md:items-baseline reveal"
            >
              <span className="kicker">{s.num}</span>
              <h3 className="text-2xl sm:text-3xl">{s.title}</h3>
              <p className="col-span-2 text-sm text-muted-foreground md:col-span-1">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTATTI / FOOTER */}
      <footer id="contatti" className="bg-ink text-background py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <span className="kicker text-background/60 reveal">04 — Contatti</span>
          <h2 className="mt-2 font-display text-[clamp(2.25rem,9vw,5rem)] leading-[1.05] reveal">
            Parliamo del <br />
            <span className="italic font-light">vostro spazio.</span>
          </h2>

          <div className="mt-16 grid gap-8 border-t border-background/20 pt-10 sm:grid-cols-3 reveal">
            <div>
              <span className="kicker text-background/50">Email</span>
              <a href="mailto:nome@studio.it" className="mt-2 block text-lg hover:underline">
                nome@studio.it
              </a>
            </div>
            <div>
              <span className="kicker text-background/50">Telefono</span>
              <a href="tel:+390000000000" className="mt-2 block text-lg hover:underline">
                +39 000 000 0000
              </a>
            </div>
            <div>
              <span className="kicker text-background/50">Studio</span>
              <p className="mt-2 text-lg">Via Esempio 00, Città</p>
            </div>
          </div>

          <div className="mt-20 border-t border-background/10 pt-6 text-xs text-background/40">
            © {new Date().getFullYear()} STUDIO STUDIO. Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
}
