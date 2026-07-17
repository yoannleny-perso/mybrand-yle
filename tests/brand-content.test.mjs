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

test('keeps work routes as collection-backed shared-renderer adapters', () => {
  const index = read('src/components/pages/WorkIndex.astro');
  assert.ok(existsSync('src/components/pages/WorkDetail.astro'));
  assert.ok(index.includes('CinematicIntro'));
  assert.ok(index.includes('MissionRow'));

  for (const routePath of ['src/pages/work/[slug].astro', 'src/pages/[lang]/work/[slug].astro']) {
    const route = read(routePath);
    assert.ok(route.includes("getCollection('case-studies')"), `${routePath} must resolve the collection`);
    assert.ok(route.includes('getStaticPaths()'), `${routePath} must retain static path generation`);
    assert.ok(route.includes('WorkDetail'), `${routePath} must delegate rendering`);
    assert.doesNotMatch(route, /\brender\s*\(/, `${routePath} must not render collection content`);
  }
});

test('uses shared cinematic knowledge renderers', () => {
  for (const component of ['InsightsIndex', 'ConceptsIndex', 'InsightDetail', 'ConceptDetail', 'DecisionIndex']) {
    assert.ok(existsSync(`src/components/pages/${component}.astro`), `missing ${component}`);
  }

  assert.ok(read('src/pages/insights/index.astro').includes('InsightsIndex'));
  assert.ok(read('src/pages/[lang]/insights/[slug].astro').includes('InsightDetail'));
  assert.ok(read('src/pages/concepts/index.astro').includes('ConceptsIndex'));
  assert.ok(read('src/pages/[lang]/concepts/[slug].astro').includes('ConceptDetail'));
  assert.ok(read('src/pages/decisions.astro').includes('DecisionIndex'));
});

test('keeps knowledge routes collection-backed and delegates content rendering', () => {
  for (const routePath of [
    'src/pages/insights/index.astro',
    'src/pages/fr/insights/index.astro',
    'src/pages/es/insights/index.astro',
  ]) {
    const route = read(routePath);
    assert.ok(route.includes("getCollection('insights')"), `${routePath} must resolve insights`);
    assert.ok(route.includes('InsightsIndex'), `${routePath} must delegate the index`);
  }

  for (const routePath of [
    'src/pages/concepts/index.astro',
    'src/pages/fr/concepts/index.astro',
    'src/pages/es/concepts/index.astro',
  ]) {
    const route = read(routePath);
    assert.ok(route.includes("getCollection('concepts')"), `${routePath} must resolve concepts`);
    assert.ok(route.includes('ConceptsIndex'), `${routePath} must delegate the index`);
  }

  for (const [routePath, renderer] of [
    ['src/pages/insights/[slug].astro', 'InsightDetail'],
    ['src/pages/[lang]/insights/[slug].astro', 'InsightDetail'],
    ['src/pages/concepts/[slug].astro', 'ConceptDetail'],
    ['src/pages/[lang]/concepts/[slug].astro', 'ConceptDetail'],
  ]) {
    const route = read(routePath);
    assert.ok(route.includes('getStaticPaths()'), `${routePath} must retain static paths`);
    assert.ok(route.includes(renderer), `${routePath} must delegate detail rendering`);
    assert.doesNotMatch(route, /\brender\s*\(/, `${routePath} must not render collection content`);
  }
});

test('preserves accessible knowledge interactions and article semantics', () => {
  const insights = read('src/components/pages/InsightsIndex.astro');
  const concepts = read('src/components/pages/ConceptsIndex.astro');
  const insightDetail = read('src/components/pages/InsightDetail.astro');
  const conceptDetail = read('src/components/pages/ConceptDetail.astro');
  const decisions = read('src/components/pages/DecisionIndex.astro');

  assert.ok(insights.includes('CinematicIntro'));
  assert.ok(insights.includes('data-filter'));
  assert.ok(concepts.includes('CinematicIntro'));
  assert.ok(concepts.includes('id="search-input"'));
  assert.ok(concepts.includes('data-depth'));
  for (const detail of [insightDetail, conceptDetail]) {
    assert.ok(detail.includes("import { render"));
    assert.ok(detail.includes('<ArticleFrame'));
    assert.ok(detail.includes('<Prose><Content /></Prose>'));
    assert.ok(detail.includes('reading-progress'));
  }
  assert.ok(decisions.includes("signal: 'outcome'"));
  assert.ok(decisions.includes("signal: 'change'"));
  assert.ok(decisions.includes("signal: 'intelligence'"));
  assert.ok(decisions.includes('data-signal-shape'));
});

test('selects localized concept-detail labels and English-content notices', () => {
  const detail = read('src/components/pages/ConceptDetail.astro');
  assert.ok(detail.includes('const copy = detailCopy[locale]'));
  assert.ok(detail.includes("noticeLabel: 'Note sur le contenu en anglais'"));
  assert.ok(detail.includes("noticeLabel: 'Aviso de contenido en inglés'"));
  assert.ok(detail.includes('aria-label={copy.noticeLabel}'));
});

test('contains long knowledge code blocks without page-level overflow', () => {
  for (const component of ['InsightDetail', 'ConceptDetail']) {
    const detail = read(`src/components/pages/${component}.astro`);
    assert.ok(detail.includes(':global(.prose-content pre)'), `${component} must scope fenced code`);
    assert.ok(detail.includes('overflow-x: auto'), `${component} must make fenced code locally scrollable`);
  }
});

test('keeps the insights collection authoritative beyond the legacy ordering', () => {
  const index = read('src/components/pages/InsightsIndex.astro');
  assert.ok(index.includes("entries.filter((entry) => slugFor(entry) !== featuredSlug)"));
  assert.ok(index.includes('translated[locale][slugFor(entry)] ||'));
});

test('initializes knowledge filters once per view-transition document', () => {
  for (const component of ['InsightsIndex', 'ConceptsIndex']) {
    const index = read(`src/components/pages/${component}.astro`);
    assert.ok(index.includes("dataset.filtersReady === 'true'"), `${component} must prevent duplicate listeners`);
    assert.ok(index.includes("dataset.filtersReady = 'true'"), `${component} must mark the current controls`);
    assert.ok(index.includes("document.addEventListener('astro:page-load'"), `${component} must rebind after navigation`);
  }
});

test('keeps decision and concept taxonomy landmarks semantically accurate', () => {
  const decisions = read('src/components/pages/DecisionIndex.astro');
  const concepts = read('src/components/pages/ConceptsIndex.astro');
  assert.doesNotMatch(decisions, /<main class="decision-log"/);
  assert.ok(decisions.includes('<section class="decision-log"'));
  assert.ok(concepts.includes("['core', 'Core']"));
  assert.ok(concepts.includes("['core', 'Essentiel']"));
  assert.ok(concepts.includes("['core', 'Esencial']"));
  assert.ok(concepts.includes("const filterDepth = (depth?: string) => depth || 'foundational'"));
});

test('keeps unpublished achievement missions non-interactive', () => {
  const achievements = read('src/data/achievements.ts');
  const missionRow = read('src/components/brand/MissionRow.astro');

  assert.equal((achievements.match(/href: null/g) ?? []).length, 5);
  assert.ok(missionRow.includes("const Tag = achievement.href ? 'a' : 'article'"));
});

test('places the case narrative before supporting diagrams and outcomes', () => {
  const detail = read('src/components/pages/WorkDetail.astro');
  const sourceOrder = [
    'class="case-artifact"',
    'class="language-notice"',
    '<Prose><Content /></Prose>',
    '<CaseDiagram',
    'class="case-outcomes"',
  ].map((fragment) => detail.indexOf(fragment));

  assert.ok(sourceOrder.every((index) => index >= 0), 'detail must retain every narrative element');
  assert.deepEqual(sourceOrder, [...sourceOrder].sort((a, b) => a - b));
});

test('composes a semantic signal shape in work detail introductions', () => {
  const detail = read('src/components/pages/WorkDetail.astro');
  const frame = read('src/components/brand/ArticleFrame.astro');

  assert.ok(frame.includes("import { SIGNAL_SHAPES, type CinematicSignal }"));
  assert.ok(frame.includes('accent?: CinematicSignal'));
  assert.ok(frame.includes('data-signal-shape={SIGNAL_SHAPES[accent]}'));
  assert.ok(frame.includes("[data-signal-shape='diamond']"));
  assert.ok(frame.includes("[data-signal-shape='circle']"));
  assert.ok(detail.includes('accent={diagram?.accent}'));
});

test('localizes work diagram captions and language notice labels', () => {
  const detail = read('src/components/pages/WorkDetail.astro');

  assert.equal((detail.match(/diagramCaptions:/g) ?? []).length, 3);
  assert.ok(detail.includes('HIERARCHICAL AGENTS INSIDE DETERMINISTIC BOUNDARIES'));
  assert.ok(detail.includes('AGENTS HIÉRARCHISÉS DANS DES FRONTIÈRES DÉTERMINISTES'));
  assert.ok(detail.includes('AGENTES JERÁRQUICOS DENTRO DE LÍMITES DETERMINISTAS'));
  assert.ok(detail.includes("noticeLabel: 'English content notice'"));
  assert.ok(detail.includes("noticeLabel: 'Note sur le contenu en anglais'"));
  assert.ok(detail.includes("noticeLabel: 'Aviso de contenido en inglés'"));
  assert.ok(detail.includes('aria-label={copy.noticeLabel}'));
  assert.doesNotMatch(detail, /aria-label="English content notice"/);
  assert.doesNotMatch(detail, /const diagrams:[\s\S]*?caption:/);
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

test('delegates personal and recruiter pages to locale-shared renderers', () => {
  const matrix = [
    ['about', 'AboutPage'], ['capabilities', 'CapabilitiesPage'],
    ['contact', 'ContactPage'], ['hire', 'HirePage'], ['now', 'NowPage'],
  ];
  for (const [route, component] of matrix) {
    for (const [prefix, locale] of [['', 'en'], ['fr/', 'fr'], ['es/', 'es']]) {
      const source = read(`src/pages/${prefix}${route}.astro`);
      assert.ok(source.includes(component), `${prefix}${route} missing ${component}`);
      assert.ok(source.includes(`locale="${locale}"`), `${prefix}${route} missing ${locale}`);
    }
    assert.ok(existsSync(`src/components/pages/${component}.astro`));
  }
});

test('keeps personal-page route files as exact locale adapters', () => {
  const matrix = [
    ['about', 'AboutPage'], ['capabilities', 'CapabilitiesPage'],
    ['contact', 'ContactPage'], ['hire', 'HirePage'], ['now', 'NowPage'],
  ];

  for (const [route, component] of matrix) {
    for (const [prefix, locale, depth] of [['', 'en', '..'], ['fr/', 'fr', '../..'], ['es/', 'es', '../..']]) {
      const expected = `---\nimport ${component} from '${depth}/components/pages/${component}.astro';\n---\n<${component} locale="${locale}" />`;
      assert.equal(read(`src/pages/${prefix}${route}.astro`).trim(), expected);
    }
  }
});

test('preserves every legacy personal-page fragment exactly once', () => {
  const copy = read('src/data/localized-site.ts');
  const expected = {
    AboutPage: ['header'],
    CapabilitiesPage: ['header', 'engagement-model', 'closing'],
    ContactPage: ['header', 'paths', 'what-to-include', 'expectation', 'closing'],
    HirePage: ['header', 'facts', 'fit', 'ninety-days', 'plan-phases', 'phase-1', 'phase-2', 'phase-3', 'evidence', 'closing'],
    NowPage: ['header'],
  };

  for (const [component, ids] of Object.entries(expected)) {
    const source = read(`src/components/pages/${component}.astro`);
    for (const id of ids) {
      if (component === 'HirePage' && id.startsWith('phase-')) {
        assert.equal((source.match(/id=\{phase\.id\}/g) ?? []).length, 1, 'HirePage must expose each phase ID');
        assert.equal((copy.match(new RegExp(`id: '${id}'`, 'g')) ?? []).length, 3, `all locales must define #${id}`);
        continue;
      }
      assert.equal((source.match(new RegExp(`id=["'{]${id}["'}]`, 'g')) ?? []).length, 1, `${component} must expose #${id} once`);
    }
    assert.ok(source.includes('data-page-section='), `${component} must retain page-section hooks`);
  }

  const capabilities = read('src/components/pages/CapabilitiesPage.astro');
  const about = read('src/components/pages/AboutPage.astro');
  assert.ok(capabilities.includes('id={practice.id}'));
  assert.ok(about.includes('id={section.id}'));
  for (const id of ['bio', 'principles', 'track-record', 'stack', 'writing', 'closing']) {
    assert.equal((copy.match(new RegExp(`id: '${id}'`, 'g')) ?? []).length, 1, `About section model must define #${id} once`);
  }
});

test('uses actionable localized contact links with honest request labels', () => {
  const copy = read('src/data/localized-site.ts');
  const contactBlock = copy.slice(copy.indexOf('const contactPages'), copy.indexOf('const nowPageSources'));

  assert.doesNotMatch(contactBlock, /href: '#'/);
  assert.equal((contactBlock.match(/kind: 'call'/g) ?? []).length, 3);
  assert.equal((contactBlock.match(/href: 'mailto:/g) ?? []).length, 6);
  assert.ok(contactBlock.includes("actionLabel: 'Request a slot'"));
  assert.ok(contactBlock.includes("actionLabel: 'Demander un créneau'"));
  assert.ok(contactBlock.includes("actionLabel: 'Solicitar un horario'"));
});

test('moves utility intro offsets before portrait collision widths', () => {
  for (const component of ['AboutPage', 'CapabilitiesPage', 'ContactPage', 'HirePage', 'NowPage']) {
    const source = read(`src/components/pages/${component}.astro`);
    assert.equal((source.match(/@media \(max-width: 68\.75rem\)/g) ?? []).length, 1, `${component} needs the safe breakpoint`);
    assert.doesNotMatch(source, /@media \(max-width: 60rem\)/);
  }
});

test('makes the engagement table a localized keyboard-scroll region', () => {
  const source = read('src/components/pages/CapabilitiesPage.astro');

  assert.ok(source.includes('<div class="table-scroll" tabindex="0" role="region" aria-label={copy.engagement.title}>'));
  assert.ok(source.includes('<table>'));
  assert.ok(source.includes('</table>'));
});

test('models About and Now as required shared linear sections and page CTAs', () => {
  const copy = read('src/data/localized-site.ts');
  const about = read('src/components/pages/AboutPage.astro');
  const now = read('src/components/pages/NowPage.astro');

  assert.match(copy, /export interface LocalizedPersonalPage[^\{]*\{[\s\S]*?sections:/);
  assert.match(copy, /export interface LocalizedPersonalPage[^\{]*\{[\s\S]*?primaryCta\?:/);
  assert.match(copy, /export interface LocalizedPersonalPage[^\{]*\{[\s\S]*?secondaryCta\?:/);
  assert.ok(about.includes('copy.sections.map'));
  assert.ok(now.includes('copy.sections.map'));
  assert.match(copy, /interface AboutCopy extends LocalizedPersonalPage<AboutSection>/);
  assert.match(copy, /interface NowCopy extends LocalizedPersonalPage<NowSection>/);
});

test('keeps engagement-note spacing and punctuation in localized copy', () => {
  const renderer = read('src/components/pages/CapabilitiesPage.astro');
  const copy = read('src/data/localized-site.ts');
  const engagementBlock = copy.slice(copy.indexOf('const capabilitiesPages'), copy.indexOf('export const localizedSite'));

  assert.ok(renderer.includes('{copy.engagement.note.before}<a'));
  assert.ok(renderer.includes('</a>{copy.engagement.note.after}'));
  assert.doesNotMatch(renderer, /note\.before\}\s+<a/);
  assert.doesNotMatch(renderer, /<\/a>\s+\{copy\.engagement\.note\.after/);
  assert.equal((engagementBlock.match(/after: '\. /g) ?? []).length, 2, 'French and Spanish own their period spacing');
  assert.ok(engagementBlock.includes("before: 'I take on a small number of engagements per year. Capacity is announced on the '"));
  assert.ok(engagementBlock.includes("after: ' page. For specific availability"));
});

test('keeps capabilities mission names aligned with the approved achievement registry', () => {
  const achievements = read('src/data/achievements.ts');
  const copy = read('src/data/localized-site.ts');
  const approved = [...achievements.matchAll(/name: '([^']+)'/g)].map(([, name]) => name);
  const capabilityMissions = [...copy.matchAll(/missions: \[([^\]]*)\]/g)]
    .flatMap(([, list]) => [...list.matchAll(/'([^']+)'/g)].map(([, name]) => name));

  assert.deepEqual(approved, ['GroupIQ', 'Polaris', 'Lense Studio', 'Cap Ostrea', 'Media Data Studio']);
  assert.deepEqual([...new Set(capabilityMissions)].sort(), [...approved].sort());
  assert.ok(approved.every((name) => capabilityMissions.filter((mission) => mission === name).length >= 3));
});

test('keeps secondary-page cinematic introductions compact and lens-free', () => {
  for (const component of ['AboutPage', 'CapabilitiesPage', 'ContactPage', 'HirePage', 'NowPage']) {
    const source = read(`src/components/pages/${component}.astro`);
    assert.ok(source.includes('variant="utility"'), `${component} must use the compact intro`);
    assert.doesNotMatch(source, /IdentityLens|identity-orbit|lens-ring|ribbon/i);
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
