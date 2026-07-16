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

`npm test` validates the achievement content contract, recruiter signals, accessibility hooks, social artwork, and responsive display scale. `npm run build` renders the complete English, French, and Spanish static site.

## Content structure

- `src/data/achievements.ts` — named achievement placeholders shared by the homepage and Work index.
- `src/content/case-studies/` — production case studies.
- `src/content/insights/` — long-form writing.
- `src/content/concepts/` — concept library entries.
- `src/pages/fr/` and `src/pages/es/` — localized route shells.

Do not add confidential client detail or outcome figures unless they are approved for publication.
