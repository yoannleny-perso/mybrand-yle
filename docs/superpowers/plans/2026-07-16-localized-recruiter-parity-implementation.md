# Localized Recruiter Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the same recruiter-first Home and Work experiences in English, French, and Spanish, select the best language on a visitor's first root visit, and show an optimized portrait in the shared landing-page hero.

**Architecture:** Replace duplicated locale route markup with thin route wrappers around `RecruiterHome.astro` and `WorkIndex.astro`. Store translated interface copy in a typed locale module and expose locale-specific achievement view models from the existing achievement data. Keep language selection in the shared static layout and render one optimized portrait through the shared recruiter hero.

**Tech Stack:** Astro 6, TypeScript, Tailwind CSS 4, Node's built-in test runner, Sharp for local image conversion through the existing Astro dependency tree, Playwright for browser verification.

## Global Constraints

- English, French, and Spanish Home and Work routes must share markup, section order, responsive classes, image treatment, and interaction behavior.
- Proper project names and technology names do not change between locales.
- Use `$13M+`, `40+`, and `3` as the shared proof values; localize labels only.
- Do not invent metrics, confidential details, testimonials, dates, or project outcomes.
- Browser-language inference runs only on `/`; direct localized URLs are never redirected.
- A valid explicit language choice stored in `preferred-lang` overrides later browser inference.
- Keep Astro static rendering and add no runtime localization or image dependency.
- Preserve all 223 existing routes and the approved evidence-dossier visual system.

---

### Task 1: Define failing locale-parity and routing contracts

**Files:**

- Modify: `tests/brand-content.test.mjs`
- Test: `tests/brand-content.test.mjs`

**Interfaces:**

- Consumes: existing `read(path)` test helper.
- Produces: source contracts for shared route delegation, localized achievement data, hero portrait attributes, and browser-language discovery.

- [ ] **Step 1: Add the failing shared-route contract**

Add a test that reads the six route files and requires each locale to delegate to the same page component:

```js
test('delegates every localized Home and Work route to shared renderers', () => {
  const homeRoutes = [
    ['src/pages/index.astro', 'en'],
    ['src/pages/fr/index.astro', 'fr'],
    ['src/pages/es/index.astro', 'es'],
  ];
  const workRoutes = [
    ['src/pages/work/index.astro', 'en'],
    ['src/pages/fr/work/index.astro', 'fr'],
    ['src/pages/es/work/index.astro', 'es'],
  ];

  for (const [path, locale] of homeRoutes) {
    const source = read(path);
    assert.ok(source.includes('RecruiterHome'));
    assert.ok(source.includes(`locale="${locale}"`));
  }
  for (const [path, locale] of workRoutes) {
    const source = read(path);
    assert.ok(source.includes('WorkIndex'));
    assert.ok(source.includes(`locale="${locale}"`));
  }
});
```

- [ ] **Step 2: Add failing content, portrait, and routing contracts**

```js
test('provides all recruiter content in three locales', () => {
  const localized = read('src/data/localized-site.ts');
  const achievements = read('src/data/achievements.ts');
  assert.ok(localized.includes("export type Locale = 'en' | 'fr' | 'es'"));
  for (const locale of ['en', 'fr', 'es']) {
    assert.ok(localized.includes(`${locale}: {`));
    assert.ok(achievements.includes(`${locale}: {`));
  }
});

test('renders an optimized eager portrait in the recruiter hero', () => {
  const hero = read('src/components/sections/RecruiterHero.astro');
  assert.ok(hero.includes('/images/portrait-960.webp'));
  assert.ok(hero.includes('loading="eager"'));
  assert.ok(hero.includes('fetchpriority="high"'));
  assert.match(hero, /width="\d+"/);
  assert.match(hero, /height="\d+"/);
});

test('uses browser language candidates only at the bare root', () => {
  const layout = read('src/layouts/Layout.astro');
  assert.ok(layout.includes("if (path !== '/') return"));
  assert.ok(layout.includes('navigator.languages'));
  assert.ok(layout.includes("localStorage.getItem('preferred-lang')"));
});
```

- [ ] **Step 3: Run the test and verify the intended failures**

Run: `npm test`

Expected: the original six tests pass; the new delegation, localized content, portrait, and `navigator.languages` assertions fail because those interfaces do not yet exist.

- [ ] **Step 4: Commit the red contracts**

```bash
git add tests/brand-content.test.mjs
git commit -m "test: define multilingual recruiter parity"
```

### Task 2: Add typed localized copy and achievement view models

**Files:**

- Create: `src/data/localized-site.ts`
- Modify: `src/data/achievements.ts`
- Modify: `src/components/sections/AchievementCard.astro`
- Modify: `src/components/sections/ProofStrip.astro`
- Test: `tests/brand-content.test.mjs`

**Interfaces:**

- Produces: `Locale`, `localizedSite`, `localizedPath(locale, path)`, `getAchievements(locale)`, `LocalizedAchievement`, `RecruiterHeroCopy`, `HomeCopy`, and `WorkCopy`.
- Consumes: the five approved achievement names and existing English proof claims.

- [ ] **Step 1: Define the locale and copy interfaces**

Create `src/data/localized-site.ts` with these public boundaries:

```ts
export type Locale = 'en' | 'fr' | 'es';

export interface RecruiterHeroCopy {
  availability: string;
  location: string;
  roleLabel: string;
  headline: string;
  summary: string;
  primaryCta: string;
  secondaryCta: string;
  briefLabel: string;
  fitLabel: string;
  roleTerm: string;
  roleValue: string;
  scopeTerm: string;
  scopeValue: string;
  reachTerm: string;
  reachValue: string;
  traceLabel: string;
  trace: [string, string, string];
}

export interface HomeCopy {
  meta: { title: string; description: string };
  hero: RecruiterHeroCopy;
  proof: { heading: string; note: string; metrics: Array<{ value: string; label: string }> };
  achievements: { eyebrow: string; heading: string; intro: string; link: string };
  capability: {
    eyebrow: string; heading: string; intro: string; link: string;
    rows: Array<{ mandate: string; practice: string; evidence: string[] }>;
  };
  fit: { eyebrow: string; heading: string; intro: string; items: string[]; primary: string; secondary: string };
  thinking: { eyebrow: string; heading: string; link: string; readLabel: string; entries: Array<{ label: string; title: string; slug: string }> };
  close: { eyebrow: string; heading: string; cta: string };
}

export interface WorkCopy {
  meta: { title: string; description: string };
  eyebrow: string;
  heading: string;
  intro: string;
  registerLabel: string;
  registerHeading: string;
  registerNote: string;
  supportingHeading: string;
  supportingIntro: string;
  closingHeading: string;
  closingCta: string;
  supportingCases: Array<{
    slug: string; tag: string; title: string; description: string;
    pattern: 'agents' | 'layers' | 'semantic' | 'org';
    metrics: Array<{ value: string; label: string }>;
  }>;
}

export const localizedPath = (locale: Locale, path: string) =>
  locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;
```

Define `localizedSite` in the same file as a `Record<Locale, { home: HomeCopy; work: WorkCopy }>` using the current English recruiter page as the source of truth. Use these exact translated hero propositions and primary actions:

| Field | English | French | Spanish |
|---|---|---|---|
| availability | Open to senior Data & AI leadership roles | Ouvert aux postes de direction Data & IA | Abierto a puestos de liderazgo sénior en Datos e IA |
| roleLabel | VP / Head of Data & AI | VP / Head of Data & IA | VP / Head of Datos e IA |
| headline | I build the data and AI systems leaders rely on. | Je construis les systèmes Data et IA sur lesquels les dirigeants peuvent compter. | Construyo los sistemas de Datos e IA en los que confían los líderes. |
| summary | I turn fragmented data, emerging AI, and distributed teams into a clear operating advantage—connecting strategy, platforms, and the way work actually gets done. | Je transforme des données fragmentées, une IA émergente et des équipes distribuées en avantage opérationnel clair — en reliant stratégie, plateformes et réalité du travail. | Convierto datos fragmentados, IA emergente y equipos distribuidos en una ventaja operativa clara, conectando estrategia, plataformas y la forma en que el trabajo se realiza. |
| primaryCta | Discuss a role | Échanger sur un poste | Hablar de un puesto |
| secondaryCta | Review achievements | Voir les réalisations | Ver los logros |

Use these exact section-heading translations, while translating their existing explanatory paragraphs naturally and without changing the claims:

| Section | English | French | Spanish |
|---|---|---|---|
| achievements | Products that make the claim concrete. | Des produits qui rendent la promesse concrète. | Productos que convierten la promesa en hechos. |
| capability | Capabilities, attached to proof. | Des compétences reliées à des preuves. | Capacidades vinculadas a pruebas. |
| recruiter fit | The right mandate is bigger than a tool choice. | Le bon mandat dépasse le choix d'un outil. | El mandato adecuado va más allá de elegir una herramienta. |
| thinking | How I make decisions. | Comment je prends mes décisions. | Cómo tomo decisiones. |
| contact close | If the mandate needs both strategic range and operating depth, let's talk. | Si le mandat exige à la fois vision stratégique et profondeur opérationnelle, échangeons. | Si el mandato exige visión estratégica y profundidad operativa, hablemos. |
| Work intro | Work built to change how teams operate. | Des réalisations conçues pour transformer le fonctionnement des équipes. | Trabajo creado para transformar cómo operan los equipos. |
| Work register | Five missions, one operating thesis. | Cinq missions, une même vision opérationnelle. | Cinco misiones, una misma visión operativa. |
| supporting cases | Supporting case studies | Études de cas complémentaires | Casos prácticos complementarios |

- [ ] **Step 2: Convert achievement storage to localized view models**

Use shared structural data plus locale-specific presentation:

```ts
import type { Locale } from './localized-site';

interface AchievementCopy {
  summary: string;
  projectType: string;
  industry: string;
  location: string;
  status: string;
  capabilities: string[];
}

interface AchievementSource {
  slug: string;
  name: string;
  copy: Record<Locale, AchievementCopy>;
  accent: string;
  href: string | null;
}

export interface Achievement extends AchievementCopy {
  slug: string;
  name: string;
  accent: string;
  href: string | null;
}

export const getAchievements = (locale: Locale): Achievement[] =>
  achievementSources.map(({ copy, ...achievement }) => ({ ...achievement, ...copy[locale] }));

export const achievements = getAchievements('en');
```

Define `achievementSources` immediately before `getAchievements` with exactly five records. Use the user-approved English summary and these exact French and Spanish equivalents:

| Project | French summary | Spanish summary |
|---|---|---|
| GroupIQ | Un portail centralisé de reporting pour l'industrie pharmaceutique en Australie. | Un portal centralizado de reporting para la industria farmacéutica en Australia. |
| Polaris | Une façon plus claire de piloter les opérations RH. | Una forma más clara de gestionar las operaciones de personas. |
| Lense Studio | Une méthode automatisée pour auditer les tableaux de bord et proposer des améliorations. | Una forma automatizada de auditar dashboards y proponer mejoras. |
| Cap Ostrea | Une marketplace mobile pour les producteurs d'huîtres du bassin d'Arcachon. | Un marketplace móvil para productores de ostras de la bahía de Arcachon. |
| Media Data Studio | Un système multi-agent qui connecte les plateformes média et construit une architecture de données prête pour l'IA. | Un sistema multiagente que conecta plataformas de medios y construye una arquitectura de datos preparada para la IA. |

Use status `Étude de cas en préparation` in French and `Caso práctico en preparación` in Spanish. Translate project type, sector, context, and capability tags naturally from the existing English values. Keep `achievements` as the English compatibility export for existing tests and imports until shared renderers replace them.

- [ ] **Step 3: Localize reusable section labels**

Add optional copy props to `ProofStrip.astro` and `AchievementCard.astro` so neither component contains an English-only section label. Required public props:

```ts
// ProofStrip.astro
interface Props {
  heading: string;
  note: string;
  metrics: Metric[];
}

// AchievementCard.astro
interface Props {
  achievement: Achievement;
  index: number;
  featured?: boolean;
  evidenceLabel: string;
  sectorLabel: string;
  contextLabel: string;
  capabilitiesLabel: string;
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test`

Expected: localized content assertions pass; route-delegation, portrait, and language-candidate assertions remain red.

- [ ] **Step 5: Build and commit**

Run: `npm run build`

Expected: all 223 routes build.

```bash
git add src/data/localized-site.ts src/data/achievements.ts src/components/sections/AchievementCard.astro src/components/sections/ProofStrip.astro
git commit -m "feat: add typed multilingual recruiter content"
```

### Task 3: Build the shared portrait hero and Home renderer

**Files:**

- Create: `public/images/portrait-960.webp`
- Create: `src/components/pages/RecruiterHome.astro`
- Modify: `src/components/sections/RecruiterHero.astro`
- Replace: `src/pages/index.astro`
- Replace: `src/pages/fr/index.astro`
- Replace: `src/pages/es/index.astro`
- Test: `tests/brand-content.test.mjs`

**Interfaces:**

- Consumes: `Locale`, `localizedSite[locale].home`, `localizedPath`, `getAchievements(locale)`, and the localized section props from Task 2.
- Produces: `<RecruiterHome locale: Locale>` and `<RecruiterHero copy: RecruiterHeroCopy locale: Locale>`.

- [ ] **Step 1: Generate the optimized portrait derivative**

Run this mechanical conversion through the already installed Sharp package:

```bash
node --input-type=module -e "import sharp from 'sharp'; await sharp('public/images/portrait.jpeg').resize({ width: 960, withoutEnlargement: true }).webp({ quality: 82 }).toFile('public/images/portrait-960.webp')"
```

Verify: `sips -g pixelWidth -g pixelHeight public/images/portrait-960.webp`

Expected: width `960`, proportional height, and a file materially smaller than `public/images/portrait.jpeg`.

- [ ] **Step 2: Make the recruiter hero fully data-driven and add the portrait**

Change the hero props and replace every English literal with `copy` fields:

```ts
import type { Locale, RecruiterHeroCopy } from '../../data/localized-site';

interface Props {
  locale: Locale;
  copy: RecruiterHeroCopy;
}

const { locale, copy } = Astro.props;
```

At the top of the recruiter brief, add:

```astro
<figure class="-mx-6 -mt-6 mb-7 border-b border-ink-300 sm:-mx-8 sm:-mt-8">
  <picture>
    <source srcset="/images/portrait-960.webp" type="image/webp" />
    <img
      src="/images/portrait.jpeg"
      alt="Yoann Leny"
      width="960"
      height="1280"
      loading="eager"
      fetchpriority="high"
      decoding="async"
      class="h-40 w-full object-cover grayscale contrast-[1.05] sm:h-48"
      style="object-position: 50% 20%;"
    />
  </picture>
</figure>
```

Use `localizedPath(locale, '/hire')`, `localizedPath(locale, '/work')`, and localized aria labels for every hero action and recruiter-brief label.

- [ ] **Step 3: Move the complete Home composition into `RecruiterHome.astro`**

Use this frontmatter boundary:

```astro
---
import Layout from '../../layouts/Layout.astro';
import type { Locale } from '../../data/localized-site';
import { localizedPath, localizedSite } from '../../data/localized-site';
import { getAchievements } from '../../data/achievements';

interface Props { locale: Locale }
const { locale } = Astro.props;
const copy = localizedSite[locale].home;
const achievements = getAchievements(locale);
---
```

Move all current English Home markup into this component. Replace copy and paths with `copy` and `localizedPath`. Add these exact section identifiers in order:

```text
hero
proof
achievements
capabilities
recruiter-fit
thinking
contact-close
```

Render each identifier as `data-page-section="<identifier>"` on the corresponding top-level section or component root.

- [ ] **Step 4: Replace the three Home routes with thin wrappers**

English:

```astro
---
import RecruiterHome from '../components/pages/RecruiterHome.astro';
---
<RecruiterHome locale="en" />
```

French and Spanish use the same markup with their relative import `../../components/pages/RecruiterHome.astro` and `locale="fr"` or `locale="es"`.

- [ ] **Step 5: Run tests and build**

Run: `npm test`

Expected: Home route delegation and portrait tests pass; Work delegation and `navigator.languages` remain red.

Run: `npm run build`

Expected: all 223 routes build.

- [ ] **Step 6: Commit**

```bash
git add public/images/portrait-960.webp src/components/pages/RecruiterHome.astro src/components/sections/RecruiterHero.astro src/pages/index.astro src/pages/fr/index.astro src/pages/es/index.astro
git commit -m "feat: share recruiter homepage across locales"
```

### Task 4: Build the shared localized Work renderer

**Files:**

- Create: `src/components/pages/WorkIndex.astro`
- Replace: `src/pages/work/index.astro`
- Replace: `src/pages/fr/work/index.astro`
- Replace: `src/pages/es/work/index.astro`
- Test: `tests/brand-content.test.mjs`

**Interfaces:**

- Consumes: `Locale`, `localizedSite[locale].work`, `localizedPath`, `getAchievements(locale)`, and localized achievement-card labels.
- Produces: `<WorkIndex locale: Locale>` with one shared Work page structure.

- [ ] **Step 1: Move the Work composition into `WorkIndex.astro`**

Use this data boundary:

```astro
---
import type { Locale } from '../../data/localized-site';
import { localizedPath, localizedSite } from '../../data/localized-site';
import { getAchievements } from '../../data/achievements';

interface Props { locale: Locale }
const { locale } = Astro.props;
const copy = localizedSite[locale].work;
const achievements = getAchievements(locale);
---
```

Move the current English Work markup into this component and render these exact identifiers in order:

```text
work-intro
achievement-register
supporting-cases
work-close
```

Build supporting-case URLs with `localizedPath(locale, `/work/${caseStudy.slug}`)` and the closing CTA with `localizedPath(locale, '/hire')`.

- [ ] **Step 2: Replace the three Work routes with thin wrappers**

English:

```astro
---
import WorkIndex from '../../components/pages/WorkIndex.astro';
---
<WorkIndex locale="en" />
```

French and Spanish import `../../../components/pages/WorkIndex.astro` and pass `locale="fr"` or `locale="es"`.

- [ ] **Step 3: Run tests and build**

Run: `npm test`

Expected: all contracts except the `navigator.languages` assertion pass.

Run: `npm run build`

Expected: all 223 routes build.

- [ ] **Step 4: Commit**

```bash
git add src/components/pages/WorkIndex.astro src/pages/work/index.astro src/pages/fr/work/index.astro src/pages/es/work/index.astro
git commit -m "feat: share work index across locales"
```

### Task 5: Complete browser-language selection and end-to-end verification

**Files:**

- Modify: `src/layouts/Layout.astro`
- Modify: `README.md`
- Test: `tests/brand-content.test.mjs`
- Verify: generated screenshots under `/tmp/localized-brand-audit/`

**Interfaces:**

- Consumes: `preferred-lang` values written by `Header.astro` and static locale routes.
- Produces: deterministic root selection for `en`, `fr`, and `es` browser contexts without redirecting direct locale URLs.

- [ ] **Step 1: Update the root-only language candidate logic**

Inside the existing inline layout script, retain `if (path !== '/') return;` and replace the single browser candidate with:

```js
const savedLang = localStorage.getItem('preferred-lang');
const validSavedLang = savedLang && supportedLangs.includes(savedLang) ? savedLang : null;
const browserCandidates = Array.isArray(navigator.languages) && navigator.languages.length
  ? navigator.languages
  : [navigator.language || ''];
const browserLang = browserCandidates
  .map((candidate) => candidate.toLowerCase().split('-')[0])
  .find((candidate) => supportedLangs.includes(candidate));
const targetLang = validSavedLang || browserLang || defaultLang;

if (targetLang !== defaultLang) {
  window.location.replace(homeFor(targetLang));
}
```

- [ ] **Step 2: Run the complete automated suite**

Run: `npm test`

Expected: all tests pass with zero failures.

Run: `npm run build`

Expected: all 223 routes build and `dist/images/portrait-960.webp` exists.

- [ ] **Step 3: Verify rendered structural parity in Playwright**

Start or reuse `npm run dev -- --host 127.0.0.1`. For `/`, `/fr/`, and `/es/`, collect:

```js
[...document.querySelectorAll('[data-page-section]')]
  .map((element) => element.getAttribute('data-page-section'))
```

Expected for every Home locale:

```json
["hero","proof","achievements","capabilities","recruiter-fit","thinking","contact-close"]
```

For `/work/`, `/fr/work/`, and `/es/work/`, expect:

```json
["work-intro","achievement-register","supporting-cases","work-close"]
```

At 1440×1000 and 390×844, also require status 200, one visible H1, zero horizontal overflow, zero clipped text controls, zero interactive overlap, zero header/H1 collision, visible portrait dimensions greater than zero, and zero console/page errors.

- [ ] **Step 4: Verify browser-language behavior in isolated contexts**

Use fresh Playwright contexts with no stored preference:

```text
en-US → /
fr-FR → /fr/
fr-CA → /fr/
es-ES → /es/
es-MX → /es/
de-DE → /
```

Then add `localStorage.setItem('preferred-lang', 'en')` before loading `/` in a French context and expect `/`. Load `/fr/` in an English context and expect `/fr/`; load `/es/` in a French context and expect `/es/`.

- [ ] **Step 5: Update documentation and commit**

Update README's content-structure section to describe `localized-site.ts`, `RecruiterHome.astro`, and `WorkIndex.astro`, and document that locale wrappers should remain markup-free.

```bash
git add src/layouts/Layout.astro README.md tests/brand-content.test.mjs
git commit -m "fix: select recruiter locale from browser language"
```

- [ ] **Step 6: Final repository and server checks**

Run:

```bash
git diff --check main...HEAD
git status --short
curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4321/
```

Expected: no diff errors, clean feature worktree, and HTTP `200`. Keep the development server running for user review.
