import { test, expect } from '@playwright/test';

test.describe('Artisanal Design Tokens and Typography Hierarchy', () => {
  test('loads root design tokens, typography, and page correctly', async ({ page }) => {
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
        fontPlayfair: computed.getPropertyValue('--font-playfair-display').trim(),
        fontGeistSans: computed.getPropertyValue('--font-geist-sans').trim(),
        fontGeistMono: computed.getPropertyValue('--font-geist-mono').trim(),
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

    // Verify next/font generated font variables are populated
    expect(styles.fontPlayfair).toBeTruthy();
    expect(styles.fontGeistSans).toBeTruthy();
    expect(styles.fontGeistMono).toBeTruthy();

    // Verify root tokens
    expect(styles.background.toLowerCase()).toBe('#faf7f2');
    expect(styles.foreground.toLowerCase()).toBe('#191614');
    expect(styles.colorCanvasBase.toLowerCase()).toBe('#faf7f2');
    expect(styles.colorCanvasSubtle.toLowerCase()).toBe('#f3ece2');
    expect(styles.colorInkPrimary.toLowerCase()).toBe('#191614');
    expect(styles.colorTerracotta.toLowerCase()).toBe('#b45309');
    expect(styles.colorBrass.toLowerCase()).toBe('#c5a059');
    expect(styles.shadowFrameResting).toContain('0 18px 36px -10px');
    expect(styles.shadowFrameInnerMat).toContain('inset 0 2px 4px');

    // Body background should match #FAF7F2 (rgb(250, 247, 242))
    expect(styles.bodyBackgroundColor).toBe('rgb(250, 247, 242)');
    expect(styles.bodyColor).toBe('rgb(25, 22, 20)');

    // Visual smoke check screenshot into .agent/screenshots/
    await page.screenshot({ path: '.agent/screenshots/task-2-design-tokens.png', fullPage: true });
  });
});
