import { test, expect } from '@playwright/test';

test.describe('Apple Ecosystem Design Tokens and Typography Hierarchy', () => {
  test('loads Apple design tokens, SF Pro typography, and page correctly', async ({ page }) => {
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
        fontAppleSystem: computed.getPropertyValue('--font-apple-system').trim(),
        bodyFontFamily: bodyComputed.fontFamily,
        background: computed.getPropertyValue('--background').trim(),
        foreground: computed.getPropertyValue('--foreground').trim(),
        colorCanvasBase: computed.getPropertyValue('--color-canvas-base').trim(),
        colorCanvasSubtle: computed.getPropertyValue('--color-canvas-subtle').trim(),
        colorInkPrimary: computed.getPropertyValue('--color-ink-primary').trim(),
        colorTerracotta: computed.getPropertyValue('--color-terracotta').trim(),
        colorBrass: computed.getPropertyValue('--color-brass').trim(),
        shadowFrameResting: computed.getPropertyValue('--shadow-frame-resting').trim(),
        shadowFrameInnerMat: computed.getPropertyValue('--shadow-frame-inner-mat').trim(),
        bodyBackgroundColor: bodyComputed.backgroundColor,
        bodyColor: bodyComputed.color,
      };
    });

    // Verify Apple typography stack on body
    expect(styles.bodyFontFamily.toLowerCase()).toContain('-apple-system');

    // Verify Apple luxury ceramic palette tokens
    expect(styles.background.toLowerCase()).toBe('#f5f5f7');
    expect(styles.foreground.toLowerCase()).toBe('#1d1d1f');
    expect(styles.colorCanvasBase.toLowerCase()).toBe('#f5f5f7');
    expect(styles.colorCanvasSubtle.toLowerCase()).toBe('#e8e8ed');
    expect(styles.colorInkPrimary.toLowerCase()).toBe('#1d1d1f');
    expect(styles.colorTerracotta.toLowerCase()).toBe('#1d1d1f');
    expect(styles.colorBrass.toLowerCase()).toBe('#b88e56');
    expect(styles.shadowFrameResting).toContain('0 18px 36px -10px');
    expect(styles.shadowFrameInnerMat).toContain('inset 0 2px 4px');

    // Body background should match #F5F5F7 (rgb(245, 245, 247))
    expect(styles.bodyBackgroundColor).toBe('rgb(245, 245, 247)');
    expect(styles.bodyColor).toBe('rgb(29, 29, 31)');

    // Visual smoke check screenshot into .agent/screenshots/
    await page.screenshot({ path: '.agent/screenshots/task-2-design-tokens.png', fullPage: true });
  });
});
