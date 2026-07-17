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
    await expect(page.locator('h1'), `${path} visible page title`).toBeVisible();

    const overflow = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));
    expect(
      overflow.documentWidth,
      `${path} horizontal overflow: document ${overflow.documentWidth}px, viewport ${overflow.viewportWidth}px`,
    ).toBeLessThanOrEqual(overflow.viewportWidth + 1);

    for (const image of await page.locator('img[loading="lazy"]:visible').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((node) => {
        const element = node as HTMLImageElement;
        return element.complete && element.naturalWidth > 0;
      })).toBe(true);
    }

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

    // A starved grid or flex track collapses a text element to zero width; the text then
    // overflows its own box and paints across whatever sits beside it. The boxes never
    // formally intersect, so an overlap check cannot see this — the width can.
    // Deliberately not `:visible`: Playwright defines that as having a non-empty bounding
    // box, which filters out the very elements this guard exists to catch.
    const starvedText = await page.evaluate(() => {
      const found: Array<{ element: string; text: string }> = [];
      for (const element of document.querySelectorAll('body *')) {
        const hasDirectText = [...element.childNodes]
          .some((node) => node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim()));
        if (!hasDirectText) continue;
        const style = getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || (element as HTMLElement).hidden) continue;
        const box = element.getBoundingClientRect();
        if (box.height === 0 || box.width >= 1) continue;
        found.push({ element: element.tagName.toLowerCase(), text: element.textContent!.trim().slice(0, 60) });
      }
      return found;
    });
    expect(starvedText, `${path} text elements starved to zero width`).toEqual([]);

    expect(errors, `${path} runtime errors`).toEqual([]);
  });
}

test('the concept toolbar never hides behind the fixed header', async ({ page }) => {
  await page.goto('/fr/concepts', { waitUntil: 'networkidle' });

  // Scroll relative to the toolbar's own document offset. A fixed scroll depth can leave it
  // unstuck, which would pass the assertion without ever reaching the state under test.
  // `behavior: instant` is required: the site sets scroll-behavior: smooth, so a default
  // scrollTo animates and is still in flight when the measurement runs.
  const toolbarOffset = await page.evaluate(() =>
    window.scrollY + document.querySelector('.concept-tools')!.getBoundingClientRect().top);
  await page.evaluate((offset) => window.scrollTo({ top: offset + 600, behavior: 'instant' }), toolbarOffset);
  await page.waitForTimeout(200);

  const geometry = await page.evaluate(() => {
    const tools = document.querySelector('.concept-tools')!;
    const toolsBox = tools.getBoundingClientRect();
    const header = document.querySelector('header')!.getBoundingClientRect();
    return { position: getComputedStyle(tools).position, toolsTop: toolsBox.top, headerBottom: header.bottom };
  });

  if (geometry.position === 'sticky') {
    // Wide viewports: the bar parks below the header rather than sliding under it.
    expect(geometry.toolsTop, 'stuck toolbar must sit below the fixed header').toBeGreaterThanOrEqual(geometry.headerBottom - 1);
  } else {
    // Narrow viewports: wrapped chips make the bar too tall to pin, so it scrolls away.
    expect(geometry.toolsTop, 'non-sticky toolbar must scroll away rather than linger').toBeLessThan(0);
  }
});

test('every concept filter label stays inside its group', async ({ page }) => {
  await page.goto('/fr/concepts', { waitUntil: 'networkidle' });

  const clipped = await page.evaluate(() => {
    const out: Array<{ label: string; overflowPx: number }> = [];
    for (const group of document.querySelectorAll('#cluster-filters, #depth-filters')) {
      const bounds = group.getBoundingClientRect();
      for (const button of group.querySelectorAll('button')) {
        const box = button.getBoundingClientRect();
        if (box.right > bounds.right + 1 || box.left < bounds.left - 1) {
          out.push({ label: button.textContent!.trim(), overflowPx: Math.round(box.right - bounds.right) });
        }
      }
    }
    return out;
  });

  expect(clipped, 'localized filter labels must not be cut off').toEqual([]);
});

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

test('language switching still navigates when preference storage is unavailable', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'en-US', viewport: { width: 1440, height: 900 } });
  await context.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new DOMException('Storage disabled', 'SecurityError'); };
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`, { waitUntil: 'networkidle' });
  await page.locator('button[data-lang-switch="fr"]:visible').click();
  await page.waitForURL((url) => ['/fr', '/fr/'].includes(url.pathname));
  await context.close();
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

test('localized heroes load their fonts without material layout shift', async ({ browser }) => {
  for (const path of ['/fr/', '/es/']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();

    await page.addInitScript(() => {
      const auditWindow = window as Window & { __auditCLS?: number };
      auditWindow.__auditCLS = 0;

      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };

          if (!shift.hadRecentInput) {
            auditWindow.__auditCLS = (auditWindow.__auditCLS ?? 0) + (shift.value ?? 0);
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });

    await page.goto(path, { waitUntil: 'domcontentloaded' });

    const heroFontPreloads = page.locator('link[rel="preload"][as="font"]');
    await expect(heroFontPreloads).toHaveCount(4);
    await expect(page.locator('link[href*="archivo-latin-wght-normal"]')).toHaveCount(1);
    await expect(page.locator('link[href*="inter-latin-wght-normal"]')).toHaveCount(1);
    await expect(page.locator('link[href*="azeret-mono-latin-400-normal"]')).toHaveCount(1);
    await expect(page.locator('link[href*="azeret-mono-latin-600-normal"]')).toHaveCount(1);

    for (const preload of await heroFontPreloads.all()) {
      await expect(preload).toHaveAttribute('type', 'font/woff2');
    }

    const fontAndShiftEvidence = await page.evaluate(async () => {
      const requiredFaces = [
        { descriptor: '800 48px "Archivo Variable"', sample: 'Systèmes intelligents' },
        { descriptor: '400 18px "Inter Variable"', sample: 'Données et automatisation' },
        { descriptor: '400 13px "Azeret Mono"', sample: 'REPÈRES RECRUTEUR' },
        { descriptor: '600 13px "Azeret Mono"', sample: 'ARCHITECTE OPÉRATEUR' },
      ];
      const faces = [];

      for (const required of requiredFaces) {
        const matches = await document.fonts.load(required.descriptor, required.sample);
        faces.push({
          descriptor: required.descriptor,
          matches: matches.length,
          statuses: matches.map((face) => face.status),
        });
      }

      await document.fonts.ready;
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });

      return {
        cls: (window as Window & { __auditCLS?: number }).__auditCLS ?? 0,
        faces,
        status: document.fonts.status,
      };
    });

    expect(fontAndShiftEvidence.status, `${path} document font status`).toBe('loaded');
    for (const face of fontAndShiftEvidence.faces) {
      expect(face.matches, `${path} ${face.descriptor} matched font faces`).toBeGreaterThan(0);
      expect(face.statuses, `${path} ${face.descriptor} loaded font faces`).not.toContain('unloaded');
      expect(face.statuses, `${path} ${face.descriptor} errored font faces`).not.toContain('error');
    }
    expect(fontAndShiftEvidence.cls, `${path} non-user-input CLS`).toBeLessThanOrEqual(0.1);

    await context.close();
  }
});

test('the mobile menu enters the viewport, preserves scroll, and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr/concepts', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 1200);
  });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(1200);

  const beforeOpen = await page.evaluate(() => ({
    overflow: document.body.style.overflow,
    scrollY: window.scrollY,
  }));
  const button = page.locator('#mobile-menu-btn');
  const overlay = page.locator('#mobile-menu-overlay');
  const firstLink = overlay.locator('nav a').first();

  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(overlay).toHaveAttribute('aria-hidden', 'false');
  await expect(firstLink).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  await expect.poll(async () => (await overlay.boundingBox())?.x).toBeLessThanOrEqual(1);
  expect((await overlay.boundingBox())?.width).toBeGreaterThanOrEqual(389);

  const lastFocusable = overlay.locator('a[href], button:not([disabled])').last();
  await lastFocusable.focus();
  await page.keyboard.press('Tab');
  await expect(button).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(lastFocusable).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toBeFocused();
  await expect(overlay).toHaveAttribute('aria-hidden', 'true');
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe(beforeOpen.overflow);

  const afterCloseScrollY = await page.evaluate(() => window.scrollY);
  expect(Math.abs(afterCloseScrollY - beforeOpen.scrollY)).toBeLessThanOrEqual(2);
});
