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

  assert.equal((source.match(/name:/g) ?? []).length, 5);
});

test('puts recruiter proposition and proof on the English homepage', () => {
  const source = read('src/pages/index.astro');

  assert.ok(source.includes('RecruiterHero'));
  assert.ok(source.includes('achievements'));
  assert.ok(source.includes('Discuss a role'));
  assert.ok(source.includes('40+'));
  assert.ok(source.includes('$13M+'));
  assert.ok(source.includes('3 regions'));
});

test('makes named achievements primary on the English work index', () => {
  const source = read('src/pages/work/index.astro');

  assert.ok(source.includes("from '../../data/achievements'"));
  assert.ok(source.includes('AchievementCard'));
  assert.ok(source.includes('Supporting case studies'));
  assert.ok(source.includes('/work/enterprise-medallion-stack'));
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

test('uses an Open Graph image that exists in public assets', () => {
  const layout = read('src/layouts/Layout.astro');

  assert.ok(layout.includes("'/og/home.png'"));
  assert.ok(existsSync('public/og/home.png'));
});
