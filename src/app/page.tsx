'use client';

import { useEffect, useState, type FormEvent } from 'react';

const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'Exposure Check', href: '#checker' },
  { label: 'Trust', href: '#trust' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'How it Works', href: '#how' },
];

const FEATURES = [
  {
    title: 'Breach visibility',
    description:
      'Discover if your email appears in verified public breach records from multiple sources.',
  },
  {
    title: 'Exposure awareness',
    description:
      'See where your identity is visible and what types of exposure are affecting your accounts.',
  },
  {
    title: 'Privacy-first checks',
    description:
      'Run searches without passwords, cookies, or hidden tracking — only the information you share is used.',
  },
  {
    title: 'Actionable guidance',
    description:
      'Receive clear next steps for securing accounts, monitoring changes, and reducing future risk.',
  },
  {
    title: 'Digital trust',
    description:
      'Build stronger awareness around your identity with a product focused on accountability and transparency.',
  },
  {
    title: 'Future monitoring',
    description:
      'Track exposure trends over time and prepare for the next stage of alerts and protection.',
  },
];

const ROADMAP = [
  {
    phase: 'Phase 1',
    title: 'Awareness',
    description:
      'Baseline visibility into exposed email identities, breach context, and exposure summaries for immediate awareness.',
  },
  {
    phase: 'Phase 2',
    title: 'Alerts',
    description:
      'Real-time notifications when new exposure appears for tracked identities, with prioritized guidance for action.',
  },
  {
    phase: 'Phase 3',
    title: 'Protection',
    description:
      'Deeper protection tools, risk scoring, and automated recommendations to help reduce future exposure.',
  },
  {
    phase: 'Phase 4',
    title: 'Digital Trust Infrastructure',
    description:
      'Secure identity management foundations for enterprises and individuals who need stronger digital trust controls.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Enter your email',
    description:
      'Provide the address you want to check. No login or password is required.',
  },
  {
    step: '2',
    title: 'Review exposure',
    description:
      'See if your email appears in known public breaches and understand the type of exposure detected.',
  },
  {
    step: '3',
    title: 'Take action',
    description:
      'Use practical guidance to secure accounts, monitor your identity, and reduce future risk.',
  },
];

const CHECKER_URL = 'https://breachchecker-rho.vercel.app/';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('[data-reveal]').forEach((element) => {
      revealObserver.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      revealObserver.disconnect();
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen((current) => !current);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    const encoded = encodeURIComponent(email.trim());
    const target = `${CHECKER_URL}?email=${encoded}`;
    window.open(target, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="page-shell bg-bg text-text">
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 px-[clamp(1.25rem,4vw,2.5rem)] py-4">
          <a href="#home" className="brand inline-flex items-center gap-3 text-base font-semibold tracking-tight text-text">
            <span className="brand-mark">T</span>
            <span>Tirenify</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link text-[0.7rem] uppercase tracking-[0.18em] text-text-muted transition hover:text-text">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-3 md:flex">
            <a href="#checker" className="button-secondary inline-flex items-center justify-center rounded-[999px] border border-border-hover bg-transparent px-4 py-2 text-[0.8rem] font-semibold text-text transition hover:bg-accent-dim hover:text-text">
              Run a Check
            </a>
            <a href="#checker" className="button-primary inline-flex items-center justify-center rounded-[999px] bg-accent px-5 py-2.5 text-[0.8rem] font-semibold text-slate-950 transition hover:bg-accent-light">
              Start Now
            </a>
          </div>
          <button
            type="button"
            className={`mobile-toggle inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-elevated text-text transition md:hidden ${menuOpen ? 'open' : ''}`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={handleMenuToggle}
          >
            <span className="bar top" />
            <span className="bar middle" />
            <span className="bar bottom" />
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-inner">
            {NAV_ITEMS.map((item, index) => (
              <a key={item.href} href={item.href} className="mobile-menu-link" style={{ transitionDelay: `${index * 70}ms` }} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero relative overflow-hidden pt-20 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto grid max-w-[1120px] gap-16 px-[clamp(1.25rem,4vw,2.5rem)] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="hero-copy flex flex-col justify-center gap-8">
              <span data-reveal data-delay="1" className="eyebrow inline-flex rounded-full bg-accent-dim px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.24em] text-accent">
                Privacy-first exposure awareness
              </span>
              <h1 data-reveal data-delay="2" className="max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-display font-[800] leading-[1.05] tracking-[-0.04em] text-text">
                The more online you are, the more exposed you probably already are.
              </h1>
              <p data-reveal data-delay="3" className="max-w-[520px] text-[1.1rem] leading-[1.8] text-text-muted">
                Check if your emails have been leaked in public breaches. Free. Instant. No data stored.
              </p>
              <div data-reveal data-delay="4" className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  data-reveal
                  data-delay="5"
                  href={CHECKER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary inline-flex items-center justify-center rounded-full bg-accent px-6 py-4 text-[0.95rem] font-semibold text-slate-950 transition hover:bg-accent-light"
                >
                  Check Your Exposure Now
                </a>
                <a data-reveal data-delay="6" href="#trust" className="button-secondary inline-flex items-center justify-center rounded-full border border-border-hover bg-transparent px-6 py-4 text-[0.95rem] font-semibold text-text transition hover:bg-accent-dim">
                  Why it matters
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div data-reveal data-delay="6" className="stat-card">
                  <p className="stat-label">100%</p>
                  <p className="stat-copy">Public breach data</p>
                </div>
                <div data-reveal data-delay="7" className="stat-card">
                  <p className="stat-label">No password</p>
                  <p className="stat-copy">Required to search</p>
                </div>
                <div data-reveal data-delay="8" className="stat-card">
                  <p className="stat-label">Built for trust</p>
                  <p className="stat-copy">Privacy-aware reporting</p>
                </div>
              </div>
            </div>
            <div data-reveal data-delay="9" className="hero-panel pointer-events-none rounded-[24px] border border-border bg-bg-elevated/90 p-8 shadow-card backdrop-blur-sm">
              <div className="panel-header mb-6 flex items-center justify-between gap-4">
                <span className="text-sm uppercase tracking-[0.24em] text-text-muted">Exposure overview</span>
                <span className="status-pill status-safe">Verified</span>
              </div>
              <div className="space-y-4">
                <div className="panel-row rounded-3xl border border-border p-4">
                  <span className="block text-sm text-text-muted">Checked identity</span>
                  <strong className="block mt-2 text-lg text-text">email@example.com</strong>
                </div>
                <div className="panel-row rounded-3xl border border-border p-4 bg-white/5">
                  <span className="block text-sm text-text-muted">Exposure status</span>
                  <strong className="block mt-2 text-lg text-text">3 records found</strong>
                </div>
                <div className="panel-meta flex flex-col gap-2 rounded-3xl border border-border p-4 text-sm text-text-muted">
                  <span>Latest breach: Q4 2025</span>
                  <span>Data types: Email, login</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-bg py-20">
          <div className="mx-auto max-w-[1120px] px-[clamp(1.25rem,4vw,2.5rem)]">
            <div className="mb-12 max-w-3xl">
              <span data-reveal data-delay="1" className="eyebrow mb-4 inline-flex rounded-full bg-accent-dim px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.24em] text-accent">
                About
              </span>
              <h2 data-reveal data-delay="2" className="text-[2.2rem] font-display font-[800] leading-[1.05] text-text">
                Most people never check if their emails are sitting inside public breaches.
              </h2>
              <p data-reveal data-delay="3" className="mt-6 max-w-[780px] text-[1rem] leading-[1.8] text-text-muted">
                Freelancing platforms. Job applications. Crypto wallets. Newsletters. Random signups. Old accounts you forgot about. Most people never check if those emails are sitting inside public breaches. That's what Tirenify is built for — awareness before the damage happens.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {FEATURES.map((feature, index) => (
                <article
                  key={feature.title}
                  data-reveal
                  data-delay={index + 1}
                  className="feature-card rounded-[24px] border border-border bg-bg-elevated p-6 transition duration-300 hover:-translate-y-1 hover:border-border-hover hover:shadow-card"
                >
                  <div className="icon-area mb-6 inline-flex h-10 w-10 items-center justify-center rounded-[14px] bg-accent-dim text-accent-light">
                    <span className="text-lg font-bold">•</span>
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-text">{feature.title}</h3>
                  <p className="text-sm leading-[1.75] text-text-muted">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="checker" className="bg-bg-deep py-20">
          <div className="mx-auto max-w-[1120px] px-[clamp(1.25rem,4vw,2.5rem)]">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[1fr_0.9fr]">
              <div className="max-w-xl">
                <span data-reveal data-delay="1" className="eyebrow mb-4 inline-flex rounded-full bg-accent-dim px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.24em] text-accent">
                  Exposure checker
                </span>
                <h2 data-reveal data-delay="2" className="mb-6 text-[2rem] font-display font-[800] leading-[1.05] text-text">
                  Check your email against public breach records.
                </h2>
                <p data-reveal data-delay="3" className="max-w-[660px] text-[1rem] leading-[1.8] text-text-muted">
                  Enter an email address to see whether it appears in known leaks. No passwords, no account sign-ins, just straight exposure awareness.
                </p>
                <form data-reveal data-delay="4" className="mt-10 space-y-4" onSubmit={handleSubmit}>
                  <label htmlFor="email" className="block text-sm font-medium text-text-muted">
                    Email address
                  </label>
                  <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="input-field w-full rounded-[16px] border border-border bg-bg-deep px-4 py-3 text-sm text-text placeholder:text-text-faint focus:border-accent focus:ring-4 focus:ring-accent-dim"
                      required
                    />
                    <button type="submit" className="button-primary w-full rounded-[16px] bg-accent px-6 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-slate-950 transition hover:bg-accent-light sm:w-auto">
                      Check exposure
                    </button>
                  </div>
                  <p className="form-note text-center text-[0.75rem] uppercase tracking-[0.16em] text-text-faint">
                    We use publicly available breach records and respect your privacy at every step.
                  </p>
                </form>
              </div>
              <div data-reveal data-delay="5" className="checker-panel rounded-[24px] border border-border bg-bg-elevated p-8 shadow-card">
                <div className="checker-status mb-6 flex flex-col gap-3 rounded-[20px] border border-border p-5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm uppercase tracking-[0.24em] text-text-muted">Search result</span>
                  <span className="status-pill status-alert">Exposure detected</span>
                </div>
                <div className="checker-summary mb-6 rounded-[20px] border border-border p-5 bg-white/5 text-text-muted">
                  Recent breach data shows this email appears in multiple publicly disclosed incidents. Review the details and take proactive steps.
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-border p-5 text-sm text-text-muted">
                    <strong className="block mb-2 text-text">Data types</strong>
                    <span>Email, password hash, login time</span>
                  </div>
                  <div className="rounded-[20px] border border-border p-5 text-sm text-text-muted">
                    <strong className="block mb-2 text-text">First seen</strong>
                    <span>May 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="trust" className="bg-bg py-20">
          <div className="mx-auto max-w-[1120px] px-[clamp(1.25rem,4vw,2.5rem)]">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span data-reveal data-delay="1" className="eyebrow mb-4 inline-flex rounded-full bg-accent-dim px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.24em] text-accent">
                  Why this matters
                </span>
                <h2 data-reveal data-delay="2" className="text-[2rem] font-display font-[800] leading-[1.05] text-text">
                  The average person has 3-5 email addresses. Each one is registered across 20-50 platforms.
                </h2>
                <p data-reveal data-delay="3" className="mt-6 max-w-[780px] text-[1rem] leading-[1.8] text-text-muted">
                  If any platform gets breached, your data is out there. You just don't know it yet.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div data-reveal data-delay="1" className="trust-item rounded-[24px] border border-border bg-bg-elevated p-6 text-text-muted">
                  <div className="icon-area mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[14px] bg-accent-dim text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a2 2 0 100-4 2 2 0 000 4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 11V9a5 5 0 10-10 0v2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 15h10" />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-text">No password required</h3>
                  <p className="text-sm leading-[1.75]">Search exposure with just an email address. No account credentials or login data ever needed.</p>
                </div>
                <div data-reveal data-delay="2" className="trust-item rounded-[24px] border border-border bg-bg-elevated p-6 text-text-muted">
                  <h3 className="mb-3 text-lg font-semibold text-text">Minimal data usage</h3>
                  <p className="text-sm leading-[1.75]">We only process the email you enter for the check, and we do not persist identifiable tracking data.</p>
                </div>
                <div data-reveal data-delay="3" className="trust-item rounded-[24px] border border-border bg-bg-elevated p-6 text-text-muted">
                  <h3 className="mb-3 text-lg font-semibold text-text">Public breach sources</h3>
                  <p className="text-sm leading-[1.75]">Analysis is grounded in known, publicly disclosed breach records and verified exposure sources.</p>
                </div>
                <div data-reveal data-delay="4" className="trust-item rounded-[24px] border border-border bg-bg-elevated p-6 text-text-muted">
                  <h3 className="mb-3 text-lg font-semibold text-text">Transparent reporting</h3>
                  <p className="text-sm leading-[1.75]">Clear results, clear guidance, and a product that prioritizes security over sensationalism.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="roadmap" className="bg-bg-deep py-20">
          <div className="mx-auto max-w-[1120px] px-[clamp(1.25rem,4vw,2.5rem)]">
            <div className="mb-12 max-w-3xl">
              <span data-reveal data-delay="1" className="eyebrow mb-4 inline-flex rounded-full bg-accent-dim px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.24em] text-accent">
                Product roadmap
              </span>
              <h2 data-reveal data-delay="2" className="text-[2.2rem] font-display font-[800] leading-[1.05] text-text">
                Where Tirenify is headed next.
              </h2>
              <p data-reveal data-delay="3" className="mt-6 text-[1rem] leading-[1.8] text-text-muted">
                A practical path from awareness to continuous protection and digital trust infrastructure.
              </p>
            </div>
            <div className="roadmap-line" />
            <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-2">
              {ROADMAP.map((item, index) => (
                <article
                  key={item.title}
                  data-reveal
                  data-delay={index + 1}
                  className="roadmap-card relative rounded-[24px] border border-border bg-bg-elevated p-6 transition duration-300 hover:-translate-y-1 hover:border-border-hover"
                >
                  <div className="phase-circle mb-5">0{index + 1}</div>
                  <span className="mb-3 inline-flex text-[0.65rem] uppercase tracking-[0.24em] text-accent-light">
                    {item.phase}
                  </span>
                  <h3 className="mb-4 text-[1.1rem] font-semibold text-text">{item.title}</h3>
                  <p className="text-sm leading-[1.75] text-text-muted">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="bg-bg py-20">
          <div className="mx-auto max-w-[1120px] px-[clamp(1.25rem,4vw,2.5rem)]">
            <div className="mb-12 max-w-3xl">
              <span data-reveal data-delay="1" className="eyebrow mb-4 inline-flex rounded-full bg-accent-dim px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.24em] text-accent">
                How it works
              </span>
              <h2 data-reveal data-delay="2" className="text-[2.2rem] font-display font-[800] leading-[1.05] text-text">
                A simple, privacy-aware workflow.
              </h2>
            </div>
            <div className="grid gap-10 lg:grid-cols-3">
              {HOW_IT_WORKS.map((step) => (
                <article
                  key={step.step}
                  data-reveal
                  data-delay={Number(step.step)}
                  className="how-step rounded-[24px] border border-border bg-bg-elevated p-8 text-center"
                >
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border-hover bg-accent-dim text-[1.05rem] font-mono font-semibold text-accent-light">
                    {step.step}
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-text">{step.title}</h3>
                  <p className="mx-auto max-w-[240px] text-sm leading-[1.75] text-text-muted">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bg-deep py-24">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-8 px-[clamp(1.25rem,4vw,2.5rem)] text-center">
            <span data-reveal data-delay="1" className="eyebrow inline-flex rounded-full bg-accent-dim px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.24em] text-accent">
              Ready to know
            </span>
            <h2 data-reveal data-delay="2" className="text-[clamp(2.2rem,5vw,4rem)] font-display font-[800] leading-[1.05] text-text">
              Check your digital exposure in seconds.
            </h2>
            <p data-reveal data-delay="3" className="max-w-[680px] text-[1.1rem] leading-[1.8] text-text-muted">
              Tirenify gives you immediate clarity on whether your email has been included in public breach records  no fluff, no distractions.
            </p>
            <div data-reveal data-delay="4" className="flex flex-col items-center gap-4 sm:flex-row">
              <a data-reveal data-delay="5" href="#checker" className="button-primary inline-flex items-center justify-center rounded-full bg-accent px-7 py-4 text-[0.95rem] font-semibold text-slate-950 transition hover:bg-accent-light">
                Run the check
              </a>
              <a data-reveal data-delay="6" href="#trust" className="button-secondary inline-flex items-center justify-center rounded-full border border-border-hover bg-transparent px-7 py-4 text-[0.95rem] font-semibold text-text transition hover:bg-accent-dim">
                Learn about privacy
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-bg-deep border-t border-border py-16">
        <div className="mx-auto grid max-w-[1120px] gap-10 px-[clamp(1.25rem,4vw,2.5rem)] lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6">
            <a href="#home" className="brand footer-brand inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-text">
              Tirenify
            </a>
            <p className="max-w-md text-sm leading-[1.8] text-text-muted">
              Privacy-aware exposure awareness for modern digital lives.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/tirenify"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tirenify on X"
                className="social-link inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-elevated text-text transition hover:border-border-hover hover:bg-accent-dim"
              >
                <span className="text-lg">X</span>
              </a>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-4">
              <h4 className="text-[0.65rem] uppercase tracking-[0.24em] text-text-faint">Product</h4>
              <div className="space-y-3">
                <a href="#features" className="footer-link">Features</a>
                <a href="#checker" className="footer-link">Exposure Checker</a>
                <a href="#roadmap" className="footer-link">Roadmap</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[0.65rem] uppercase tracking-[0.24em] text-text-faint">Company</h4>
              <div className="space-y-3">
                <a href="#trust" className="footer-link">Trust</a>
                <a href="#how" className="footer-link">How it works</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-[1120px] px-[clamp(1.25rem,4vw,2.5rem)] text-sm text-text-muted">
          © 2026 Tirenify. Built for privacy and clear exposure awareness.
        </div>
      </footer>
    </div>
  );
}
