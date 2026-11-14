import { test, expect } from '@playwright/test';

test.describe('Museum Dark Charcoal, Rich Burgundy & Muted Gold Design System', () => {
  test('loads museum dark tokens, Playfair serif / Geist sans typography, and page correctly', async ({ page }) => {
    await page.goto('/');

    // Verify title
    await expect(page).toHaveTitle('Frame Cottage | Bespoke Handcrafted Framing & Archival Art');

    // Verify font classes and computed styles
    const styles = await page.evaluate(() => {
      const doc = document.documentElement;
      const bodyComputed = window.getComputedStyle(document.body);
      const computed = window.getComputedStyle(doc);

      return {
        htmlClasses: doc.className,
        fontSans: computed.getPropertyValue('--font-sans').trim(),
        fontSerif: computed.getPropertyValue('--font-serif').trim(),
        bodyFontFamily: bodyComputed.fontFamily,
        background: computed.getPropertyValue('--background').trim(),
        foreground: computed.getPropertyValue('--foreground').trim(),
        colorCanvasBase: computed.getPropertyValue('--color-canvas-base').trim(),
        colorCanvasSubtle: computed.getPropertyValue('--color-canvas-subtle').trim(),
        colorCanvasSurface: computed.getPropertyValue('--color-canvas-surface').trim(),
        colorBurgundy: computed.getPropertyValue('--color-burgundy').trim(),
        colorGold: computed.getPropertyValue('--color-gold').trim(),
        shadowFrameResting: computed.getPropertyValue('--shadow-frame-resting').trim(),
        shadowFrameInnerMat: computed.getPropertyValue('--shadow-frame-inner-mat').trim(),
        bodyBackgroundColor: bodyComputed.backgroundColor,
        bodyColor: bodyComputed.color,
      };
    });

    // Verify typography tokens
    expect(styles.fontSerif.toLowerCase()).toContain('playfair');
    expect(styles.fontSans.toLowerCase()).toContain('geist');

    // Verify Museum Dark Charcoal, Rich Burgundy & Muted Gold tokens
    expect(styles.background.toLowerCase()).toBe('#1a1a1a');
    expect(styles.foreground.toLowerCase()).toBe('#f4f1ea');
    expect(styles.colorCanvasBase.toLowerCase()).toBe('#1a1a1a');
    expect(styles.colorCanvasSubtle.toLowerCase()).toBe('#2a2a2a');
    expect(styles.colorCanvasSurface.toLowerCase()).toBe('#242424');
    expect(styles.colorBurgundy.toLowerCase()).toBe('#6b1c23');
    expect(styles.colorGold.toLowerCase()).toBe('#c5a059');
    expect(styles.shadowFrameResting).toContain('0 18px 36px -10px');
    expect(styles.shadowFrameInnerMat).toContain('inset 0 2px 4px');

    // Body background should match #1A1A1A (rgb(26, 26, 26))
    expect(styles.bodyBackgroundColor).toBe('rgb(26, 26, 26)');
    // Body text color should match #F4F1EA (rgb(244, 241, 234))
    expect(styles.bodyColor).toBe('rgb(244, 241, 234)');

    // Visual smoke check screenshot into .agent/screenshots/
    await page.screenshot({ path: '.agent/screenshots/task-10-museum-dark-gold.png', fullPage: true });
  });
});
