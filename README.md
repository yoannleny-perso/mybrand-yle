# Yoann Leny — Brand Site

A multilingual, recruiter-first portfolio for Yoann Leny's Data & AI leadership practice. Built with Astro, TypeScript, React islands, and Tailwind CSS.

## Local development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

The development server is available at `http://localhost:4321/` by default.

## Quality checks

```sh
npm test
npm run build
```

`npm test` validates the localized page-parity contract, achievement content, recruiter signals, browser-language routing, portrait delivery, accessibility hooks, social artwork, and responsive display scale. `npm run build` renders the complete English, French, and Spanish static site.

## Content structure

- `src/data/localized-site.ts` — shared English, French, and Spanish copy for the recruiter homepage and Work index.
- `src/data/achievements.ts` — localized achievement placeholders shared by the homepage and Work index.
- `src/components/pages/RecruiterHome.astro` and `WorkIndex.astro` — shared page renderers; locale routes remain thin wrappers so structure cannot drift.
- `src/content/case-studies/` — production case studies.
- `src/content/insights/` — long-form writing.
- `src/content/concepts/` — concept library entries.
- `src/pages/fr/` and `src/pages/es/` — localized route shells.

On the bare `/` route, the first supported language in `navigator.languages` selects English, French, or Spanish. A language chosen from the header is stored as `preferred-lang` and takes precedence on later visits. Direct links to `/fr/` and `/es/` are never redirected.

Do not add confidential client detail or outcome figures unless they are approved for publication.
