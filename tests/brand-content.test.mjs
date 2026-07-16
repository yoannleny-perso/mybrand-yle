import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : '');

test('defines the five approved achievement placeholders', () => {
  const source = read('src/data/achievements.ts');
  const approved = [
    ['GroupIQ', 'A centralized reporting portal for the pharmaceutical industry in Australia.'],
    ['Polaris', 'A clearer way to run people operations.'],
    ['Lense Studio', 'An automated way to audit dashboards and propose improvements.'],
    ['Cap Ostrea', 'A mobile marketplace for oyster producers in Arcachon Bay.'],
    ['Media Data Studio', 'A multi-agent system that connects media platforms and builds an AI-ready data architecture.'],
  ];

  for (const [name, summary] of approved) {
    assert.match(source, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.ok(source.includes(summary), `missing approved summary for ${name}`);
  }

  assert.equal((source.match(/name: '[^']+'/g) ?? []).length, 5);
});

test('puts recruiter proposition and proof on the English homepage', () => {
  const source = read('src/components/pages/RecruiterHome.astro');
  const copy = read('src/data/localized-site.ts');

  assert.ok(source.includes('RecruiterHero'));
  assert.ok(source.includes('achievements'));
  assert.ok(copy.includes('Discuss a role'));
  assert.ok(copy.includes('40+'));
  assert.ok(copy.includes('$13M+'));
  assert.ok(copy.includes('3 regions'));
});

test('makes named achievements primary on the English work index', () => {
  const source = read('src/components/pages/WorkIndex.astro');
  const copy = read('src/data/localized-site.ts');

  assert.ok(source.includes('getAchievements'));
  assert.ok(source.includes('MissionRow'));
  assert.ok(copy.includes('Supporting case studies'));
  assert.ok(copy.includes('enterprise-medallion-stack'));
});

test('shares cinematic work indexes and detail composition', () => {
  const index = read('src/components/pages/WorkIndex.astro');
  assert.ok(existsSync('src/components/pages/WorkDetail.astro'));
  const detail = read('src/components/pages/WorkDetail.astro');
  assert.ok(index.includes('CinematicIntro'));
  assert.ok(index.includes('MissionRow'));
  assert.ok(detail.includes('ArticleFrame'));
  assert.ok(detail.includes("pathFor('/contact')"));
  assert.ok(read('src/pages/work/[slug].astro').includes('WorkDetail'));
  assert.ok(read('src/pages/[lang]/work/[slug].astro').includes('WorkDetail'));
});

test('keeps English, French, and Spanish page structure in shared renderers', () => {
  const routes = [
    ['src/pages/index.astro', "locale=\"en\""],
    ['src/pages/fr/index.astro', "locale=\"fr\""],
    ['src/pages/es/index.astro', "locale=\"es\""],
    ['src/pages/work/index.astro', "locale=\"en\""],
    ['src/pages/fr/work/index.astro', "locale=\"fr\""],
    ['src/pages/es/work/index.astro', "locale=\"es\""],
  ];

  for (const [route, locale] of routes) {
    const source = read(route);
    assert.ok(source.includes(locale), `${route} does not declare ${locale}`);
    assert.match(source, /(?:RecruiterHome|WorkIndex)/, `${route} does not use a shared renderer`);
  }

  const home = read('src/components/pages/RecruiterHome.astro');
  const hero = read('src/components/sections/RecruiterHero.astro');
  const work = read('src/components/pages/WorkIndex.astro');
  const expectedHomeSections = [
    'hero', 'decision-trace', 'achievements', 'proof',
    'capabilities', 'recruiter-fit', 'thinking', 'contact-close',
  ];
  const actualHomeSections = [...home.matchAll(/data-page-section="([^"]+)"/g)].map(([, section]) => section);
  assert.deepEqual(actualHomeSections, expectedHomeSections, 'shared home sections must use the approved source order');
  assert.ok(home.includes('<RecruiterHero'), 'shared home must compose RecruiterHero');
  assert.ok(hero.includes('<IdentityLens'), 'RecruiterHero must compose IdentityLens');
  assert.ok(home.includes('DecisionTrace'));
  assert.ok(home.includes('MissionRow'));
  assert.ok(home.includes('EvidencePanel'));
  assert.doesNotMatch(
    home + hero,
    /ribbon|lens-ring|stroke=\"#(?:9151F6|E7615F|087A55)\"/i,
  );
  assert.ok(home.includes('pathFor(`/insights/${item.slug}`)'), 'thinking cards must preserve the active locale');
  for (const section of ['work-intro', 'achievement-register', 'supporting-cases', 'work-close']) {
    assert.ok(work.includes(`data-page-section=\"${section}\"`), `missing shared work section ${section}`);
  }
});

test('keeps small homepage utility text on accessible neutral ink', () => {
  const home = read('src/components/pages/RecruiterHome.astro');
  const hero = read('src/components/sections/RecruiterHero.astro');

  assert.doesNotMatch(hero, /\.recruiter-hero__role\s*\{[^}]*color:\s*var\(--signal-intelligence\)/s);
  assert.doesNotMatch(home, /\.row-index\s*\{[^}]*color:\s*var\(--signal-intelligence\)/s);
  assert.doesNotMatch(home, /\.scene-link:hover[^}]*color:\s*var\(--signal-intelligence\)/s);
  assert.equal(
    (home.match(/color:\s*var\(--signal-intelligence\)/g) ?? []).length,
    1,
    'purple text is reserved for the large thinking-row heading state',
  );
});

test('contains a complete localized content model for the shared pages', () => {
  const source = read('src/data/localized-site.ts');

  for (const locale of ['en', 'fr', 'es']) {
    assert.match(source, new RegExp(`\\b${locale}: \\{`), `missing ${locale} localized copy`);
  }

  assert.ok(source.includes('I build the data and AI systems leaders can trust.'));
  assert.ok(source.includes('Je construis les systèmes Data et IA sur lesquels les dirigeants peuvent compter.'));
  assert.ok(source.includes('Construyo los sistemas de Datos e IA en los que confían los líderes.'));
  assert.ok(source.includes('Strategy is only real when a team can run it on Monday.'));
  assert.ok(source.includes("Une stratégie n’est réelle que lorsqu’une équipe peut l’exécuter dès lundi."));
  assert.ok(source.includes('La estrategia solo es real cuando un equipo puede ponerla en marcha el lunes.'));
  assert.equal((source.match(/orbitLabel:/g) ?? []).length, 4, 'the interface and all three locales declare orbit copy');
});

test('uses browser language on the bare root while preserving an explicit choice', () => {
  const source = read('src/layouts/Layout.astro');

  assert.ok(source.includes("path !== '/'"));
  assert.ok(source.includes("localStorage.getItem('preferred-lang')"));
  assert.ok(source.includes('navigator.languages'));
  assert.ok(source.includes('navigator.language'));
  assert.ok(source.includes("window.location.replace(homeFor(targetLang))"));
});

test('loads an optimized portrait in the landing hero', () => {
  const hero = read('src/components/sections/RecruiterHero.astro');
  const lens = read('src/components/brand/IdentityLens.astro');

  assert.ok(hero.includes('<IdentityLens'));
  assert.ok(hero.includes('eager'));
  assert.ok(lens.includes('<picture>'));
  assert.ok(lens.includes('/images/portrait-960.webp'));
  assert.ok(lens.includes('/images/portrait.jpeg'));
  assert.ok(lens.includes("fetchpriority={eager ? 'high' : 'auto'}"));
  assert.ok(lens.includes('width="960"'));
  assert.ok(lens.includes('height="1280"'));
  assert.doesNotMatch(hero + lens, /grayscale/);
  assert.ok(existsSync('public/images/portrait-960.webp'));
});

test('provides shared keyboard navigation and active-page semantics', () => {
  const layout = read('src/layouts/Layout.astro');
  const header = read('src/components/layout/Header.astro');
  const globalCss = read('src/styles/global.css');

  assert.ok(layout.includes('skip-link'));
  assert.ok(layout.includes('id="main-content"'));
  assert.ok(header.includes('aria-current'));
  assert.ok(header.includes("event.key === 'Escape'"));
  assert.ok(globalCss.includes('.skip-link'));
});

test('keeps the cinematic shell accessible and locale aware', () => {
  const header = read('src/components/layout/Header.astro');
  const footer = read('src/components/layout/Footer.astro');
  const layout = read('src/layouts/Layout.astro');
  const prose = read('src/components/primitives/Prose.astro');
  assert.ok(header.includes('aria-current'));
  assert.ok(header.includes("event.key === 'Escape'"));
  assert.ok(header.includes('data-lang-switch'));
  assert.ok(header.includes("localStorage.setItem('preferred-lang', targetLang)"));
  assert.ok(header.includes("document.body.style.overflow = 'hidden'"));
  assert.ok(header.includes('document.body.style.overflow = previousOverflow'));
  assert.ok(header.includes('if (restoreFocus) btn.focus()'));
  assert.equal((header.match(/xl:flex/g) ?? []).length, 2);
  assert.equal((header.match(/xl:hidden/g) ?? []).length, 2);
  assert.doesNotMatch(header, /\blg:(?:flex|hidden)\b/);
  assert.ok(footer.includes("Astro.currentLocale"));
  assert.ok(layout.includes("if (path !== '/') return"));
  assert.ok(layout.includes('navigator.languages'));
  assert.ok(layout.includes("localStorage.getItem('preferred-lang')"));
  assert.ok(layout.includes('window.location.replace(homeFor(targetLang))'));
  assert.ok(prose.includes('max-width: 72ch'));
  assert.doesNotMatch(header + footer, /#2446FF|surface-indigo|surface-purple/i);
});

test('uses an Open Graph image that exists in public assets', () => {
  const layout = read('src/layouts/Layout.astro');

  assert.ok(layout.includes("'/og/home.png'"));
  assert.ok(existsSync('public/og/home.png'));
});

test('caps shared display type for readable page openings', () => {
  const tokens = read('src/styles/tokens.css');

  assert.ok(tokens.includes('--t-display-xl-size: clamp(44px, 6vw, 80px)'));
  assert.ok(tokens.includes('--t-display-l-size: clamp(40px, 5vw, 72px)'));
  assert.doesNotMatch(tokens, /--t-display-(?:xl|l)-size:[^;]*100px/);
});

test('defines the approved cinematic identity-lens tokens', () => {
  const tokens = read('src/styles/tokens.css');
  const layout = read('src/layouts/Layout.astro');

  for (const declaration of [
    '--ink-1000: #050505',
    '--ink-900: #24262B',
    '--paper-0: #FFFFFF',
    '--paper-50: #F3F3F1',
    '--signal-intelligence: #9151F6',
    '--signal-change: #E7615F',
    '--signal-outcome: #087A55',
  ]) assert.ok(tokens.includes(declaration), `missing ${declaration}`);

  assert.ok(tokens.includes("--font-display: 'Archivo Variable'"));
  assert.ok(tokens.includes("--font-mono: 'Azeret Mono'"));
  assert.ok(layout.includes("@fontsource-variable/archivo"));
  assert.ok(layout.includes("@fontsource/azeret-mono"));
  assert.doesNotMatch(tokens, /--signal:\s*#2446FF/i);
});

test('reveals cinematic content through initialization and reduced-motion fallbacks', () => {
  const layout = read('src/layouts/Layout.astro');
  const globalCss = read('src/styles/global.css');

  assert.equal(
    (layout.match(/\.cinematic-reveal:not\(\.is-revealed\)/g) ?? []).length,
    2,
    'cinematic reveals must be owned by the initializer and its safety net',
  );
  assert.ok(globalCss.includes(`html.js .cinematic-reveal,
  html.js .scroll-reveal,
  html.js [data-stagger] > * {
    opacity: 1 !important;
    transform: none !important;`));
});

test('provides bounded cinematic brand primitives', () => {
  const expected = [
    'IdentityLens', 'CinematicIntro', 'DecisionTrace', 'SceneHeading',
    'EvidencePanel', 'MissionRow', 'ArticleFrame',
  ];
  for (const name of expected) {
    const path = `src/components/brand/${name}.astro`;
    assert.ok(existsSync(path), `missing ${path}`);
  }

  const lens = read('src/components/brand/IdentityLens.astro');
  assert.ok(lens.includes('/images/portrait-960.webp'));
  assert.ok(lens.includes('/images/portrait.jpeg'));
  assert.ok(lens.includes('identity-orbit'));
  assert.doesNotMatch(lens, /#9151F6|#E7615F|#087A55|lens-ring|ribbon/i);
});

test('gives every cinematic signal a visible non-color shape', () => {
  const contractPath = 'src/components/brand/cinematic-contracts.ts';
  assert.ok(existsSync(contractPath), `missing ${contractPath}`);
  const contract = read(contractPath);
  const trace = read('src/components/brand/DecisionTrace.astro');
  const evidence = read('src/components/brand/EvidencePanel.astro');

  assert.ok(contract.includes("change: 'square'"));
  assert.ok(contract.includes("intelligence: 'diamond'"));
  assert.ok(contract.includes("outcome: 'circle'"));
  assert.ok(trace.includes('type DecisionSteps'));
  assert.ok(trace.includes('steps: DecisionSteps'));
  assert.ok(trace.includes('data-signal-shape={SIGNAL_SHAPES[step.signal]}'));
  assert.ok(evidence.includes('data-signal-shape={SIGNAL_SHAPES[metric.signal]}'));
  for (const source of [trace, evidence]) {
    assert.ok(source.includes("[data-signal-shape='diamond']"));
    assert.ok(source.includes('rotate(45deg)'));
    assert.ok(source.includes("[data-signal-shape='circle']"));
    assert.ok(source.includes('border-radius: 50%'));
  }
});

test('keeps evidence metrics valid definition-list groups', () => {
  const evidence = read('src/components/brand/EvidencePanel.astro');

  assert.match(evidence, /<dt>\{metric\.label\}<\/dt>[\s\S]*?<dd[^>]*>\{metric\.value\}<\/dd>/);
  assert.match(evidence, /metric\.description && <dd[^>]*>\{metric\.description\}<\/dd>/);
  assert.doesNotMatch(evidence, /metric\.description && <p>/);
});

test('gives each identity lens a unique orbit path id', () => {
  const lens = read('src/components/brand/IdentityLens.astro');

  assert.ok(lens.includes('crypto.randomUUID()'));
  assert.ok(lens.includes('id={orbitId}'));
  assert.ok(lens.includes('href={`#${orbitId}`}'));
});

test('shows the identity portrait immediately for reduced-motion users', () => {
  const lens = read('src/components/brand/IdentityLens.astro');

  assert.match(
    lens,
    /@media \(prefers-reduced-motion: reduce\)\s*\{\s*html\.js \.identity-lens__portrait\s*\{[^}]*animation:\s*none[^}]*opacity:\s*1[^}]*clip-path:\s*none[^}]*transform:\s*none/s,
  );
});
