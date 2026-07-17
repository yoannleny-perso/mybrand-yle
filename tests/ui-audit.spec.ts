import { expect, test, type Page } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4322';

const templateRoutes = [
  { path: '/', template: 'home-en' },
  { path: '/fr/', template: 'home-fr' },
  { path: '/es/', template: 'home-es' },
  { path: '/work', template: 'work-index-en' },
  { path: '/fr/work', template: 'work-index-fr' },
  { path: '/es/work', template: 'work-index-es' },
  { path: '/work/enterprise-medallion-stack', template: 'work-detail-en' },
  { path: '/fr/work/enterprise-medallion-stack', template: 'work-detail-fr' },
  { path: '/es/work/enterprise-medallion-stack', template: 'work-detail-es' },
  { path: '/about', template: 'about-en' },
  { path: '/fr/about', template: 'about-fr' },
  { path: '/es/about', template: 'about-es' },
  { path: '/capabilities', template: 'capabilities-en' },
  { path: '/fr/capabilities', template: 'capabilities-fr' },
  { path: '/es/capabilities', template: 'capabilities-es' },
  { path: '/contact', template: 'contact-en' },
  { path: '/fr/contact', template: 'contact-fr' },
  { path: '/es/contact', template: 'contact-es' },
  { path: '/hire', template: 'hire-en' },
  { path: '/fr/hire', template: 'hire-fr' },
  { path: '/es/hire', template: 'hire-es' },
  { path: '/now', template: 'now-en' },
  { path: '/fr/now', template: 'now-fr' },
  { path: '/es/now', template: 'now-es' },
  { path: '/insights', template: 'insights-index-en' },
  { path: '/fr/insights', template: 'insights-index-fr' },
  { path: '/es/insights', template: 'insights-index-es' },
  { path: '/insights/why-most-agent-demos-collapse-in-production', template: 'insight-detail-en' },
  { path: '/fr/insights/why-most-agent-demos-collapse-in-production', template: 'insight-detail-fr' },
  { path: '/es/insights/why-most-agent-demos-collapse-in-production', template: 'insight-detail-es' },
  { path: '/concepts', template: 'concepts-index-en' },
  { path: '/fr/concepts', template: 'concepts-index-fr' },
  { path: '/es/concepts', template: 'concepts-index-es' },
  { path: '/concepts/medallion-architecture', template: 'concept-detail-en' },
  { path: '/fr/concepts/medallion-architecture', template: 'concept-detail-fr' },
  { path: '/es/concepts/medallion-architecture', template: 'concept-detail-es' },
  { path: '/decisions', template: 'decisions' },
  { path: '/privacy', template: 'privacy-en' },
  { path: '/fr/privacy', template: 'privacy-fr' },
  { path: '/es/privacy', template: 'privacy-es' },
  { path: '/imprint', template: 'imprint-en' },
  { path: '/fr/imprint', template: 'imprint-fr' },
  { path: '/es/imprint', template: 'imprint-es' },
] as const satisfies ReadonlyArray<{ path: string; template: string }>;

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  return errors;
}

for (const { path, template } of templateRoutes) {
  test(`${template} has a sound responsive document`, async ({ page }) => {
    const errors = collectRuntimeErrors(page);
    const response = await page.goto(path, { waitUntil: 'networkidle' });

    expect(response?.status(), `${path} response status`).toBe(200);
    await expect(page.locator('main#main-content'), `${path} main landmark`).toHaveCount(1);
    await expect(page.locator('main#main-content'), `${path} visible main`).toBeVisible();
    await expect(page.locator('h1'), `${path} page title`).toHaveCount(1);

    const overflow = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));
    expect(
      overflow.documentWidth,
      `${path} horizontal overflow: document ${overflow.documentWidth}px, viewport ${overflow.viewportWidth}px`,
    ).toBeLessThanOrEqual(overflow.viewportWidth + 1);

    const brokenImages = await page.locator('img:visible').evaluateAll((images) => images
      .filter((image) => {
        const node = image as HTMLImageElement;
        return !node.complete || node.naturalWidth === 0;
      })
      .map((image) => (image as HTMLImageElement).currentSrc || (image as HTMLImageElement).src));
    expect(brokenImages, `${path} visible images`).toEqual([]);

    const unusableControls = await page.locator('a:visible, button:visible, input:visible, select:visible, textarea:visible')
      .evaluateAll((controls) => controls.flatMap((control) => {
        const box = control.getBoundingClientRect();
        if (box.width >= 24 && box.height >= 24) return [];
        return [{
          element: control.tagName.toLowerCase(),
          label: control.getAttribute('aria-label') || control.textContent?.trim().slice(0, 60) || '',
          width: Math.round(box.width * 10) / 10,
          height: Math.round(box.height * 10) / 10,
        }];
      }));
    expect(unusableControls, `${path} controls smaller than 24px`).toEqual([]);

    const smallPurpleText = await page.locator('body *:visible').evaluateAll((elements) => elements.flatMap((element) => {
      const hasDirectText = [...element.childNodes]
        .some((node) => node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim()));
      const style = getComputedStyle(element);
      if (!hasDirectText || element.getAttribute('aria-hidden') === 'true' || style.color !== 'rgb(145, 81, 246)' || parseFloat(style.fontSize) >= 24) return [];
      return [{ element: element.tagName.toLowerCase(), text: element.textContent?.trim().slice(0, 80), fontSize: style.fontSize }];
    }));
    expect(smallPurpleText, `${path} small purple text`).toEqual([]);
    expect(errors, `${path} runtime errors`).toEqual([]);
  });
}

const criticalViewportRoutes = [
  { path: '/concepts/medallion-architecture', template: 'concept-detail-en-narrow', width: 320 },
  { path: '/fr/concepts/medallion-architecture', template: 'concept-detail-fr-narrow', width: 320 },
  { path: '/es/concepts/medallion-architecture', template: 'concept-detail-es-narrow', width: 320 },
  { path: '/insights', template: 'insights-index-en-tablet', width: 768 },
  { path: '/fr/insights', template: 'insights-index-fr-tablet', width: 768 },
  { path: '/es/insights', template: 'insights-index-es-tablet', width: 768 },
] as const;

for (const { path, template, width } of criticalViewportRoutes) {
  test(`${template} contains long content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto(path, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));
    expect(dimensions.documentWidth, `${path} overflows at ${width}px`).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
  });
}

test('localized home pages keep identical section order', async ({ page }) => {
  const sequences: string[][] = [];
  for (const path of ['/', '/fr/', '/es/']) {
    await page.goto(path, { waitUntil: 'networkidle' });
    sequences.push(await page.locator('[data-page-section]').evaluateAll((nodes) => nodes
      .map((node) => node.getAttribute('data-page-section') || '')));
  }
  expect(sequences[0].length, 'homepage section markers').toBeGreaterThan(0);
  expect(sequences[1], 'French homepage section order').toEqual(sequences[0]);
  expect(sequences[2], 'Spanish homepage section order').toEqual(sequences[0]);
});

test('root selects browser language while saved and explicit choices win', async ({ browser }) => {
  const french = await browser.newContext({ locale: 'fr-FR' });
  const frenchPage = await french.newPage();
  await frenchPage.goto(`${baseURL}/`);
  await frenchPage.waitForURL('**/fr/');
  await french.close();

  const savedSpanish = await browser.newContext({ locale: 'fr-FR' });
  await savedSpanish.addInitScript(() => localStorage.setItem('preferred-lang', 'es'));
  const spanishPage = await savedSpanish.newPage();
  await spanishPage.goto(`${baseURL}/`);
  await spanishPage.waitForURL('**/es/');
  await savedSpanish.close();

  const explicitEnglish = await browser.newContext({ locale: 'fr-FR' });
  await explicitEnglish.addInitScript(() => localStorage.setItem('preferred-lang', 'en'));
  const englishPage = await explicitEnglish.newPage();
  await englishPage.goto(`${baseURL}/`);
  expect(new URL(englishPage.url()).pathname).toBe('/');
  await explicitEnglish.close();

  const deepLink = await browser.newContext({ locale: 'fr-FR' });
  const deepLinkPage = await deepLink.newPage();
  await deepLinkPage.goto(`${baseURL}/work`);
  expect(new URL(deepLinkPage.url()).pathname).toBe('/work');
  await deepLink.close();
});

test('reduced motion exposes the final homepage portrait state', async ({ browser }) => {
  const context = await browser.newContext({
    locale: 'en-US',
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`, { waitUntil: 'networkidle' });

  const portrait = page.locator('[data-identity-lens] img');
  await expect(portrait).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
  const finalState = await portrait.evaluate((image) => {
    const portraitFrame = image.closest('.identity-lens__portrait');
    if (!portraitFrame) return null;
    const style = getComputedStyle(portraitFrame);
    return { opacity: style.opacity, transform: style.transform, clipPath: style.clipPath };
  });
  expect(finalState).toEqual({ opacity: '1', transform: 'none', clipPath: 'none' });
  await context.close();
});

test('the display font is preloaded before localized hero copy paints', async ({ page }) => {
  await page.goto('/es/', { waitUntil: 'domcontentloaded' });
  const heroFontPreloads = page.locator('link[rel="preload"][as="font"]');
  await expect(heroFontPreloads).toHaveCount(4);
  await expect(page.locator('link[href*="archivo-latin-wght-normal"]')).toHaveCount(1);
  await expect(page.locator('link[href*="inter-latin-wght-normal"]')).toHaveCount(1);
  await expect(page.locator('link[href*="azeret-mono-latin-400-normal"]')).toHaveCount(1);
  await expect(page.locator('link[href*="azeret-mono-latin-600-normal"]')).toHaveCount(1);
  for (const preload of await heroFontPreloads.all()) await expect(preload).toHaveAttribute('type', 'font/woff2');
});

test('the mobile menu enters the viewport, receives focus, and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr/', { waitUntil: 'networkidle' });
  const button = page.locator('#mobile-menu-btn');
  const overlay = page.locator('#mobile-menu-overlay');
  const firstLink = overlay.locator('nav a').first();

  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(overlay).toHaveAttribute('aria-hidden', 'false');
  await expect(firstLink).toBeFocused();
  await expect.poll(async () => (await overlay.boundingBox())?.x).toBeLessThanOrEqual(1);
  expect((await overlay.boundingBox())?.width).toBeGreaterThanOrEqual(389);

  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toBeFocused();
  await expect(overlay).toHaveAttribute('aria-hidden', 'true');
});
