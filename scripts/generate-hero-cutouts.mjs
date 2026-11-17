import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

const outputDir = path.resolve(process.cwd(), "public/images/hero");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateCutouts() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1400, height: 1050 },
    deviceScaleFactor: 2, // 2x retina crispness
  });

  // 1. Bespoke Framing Cutout
  console.log("Generating hero-cutout-bespoke-framing.png...");
  const bespokeHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: transparent;
    width: 1400px;
    height: 1050px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", serif;
  }
  
  .scene {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1200px;
  }

  /* Archival Walnut Frame Outer */
  .frame-wrapper {
    position: relative;
    padding: 32px;
    background: linear-gradient(135deg, #4A2E1B 0%, #2D1A0E 40%, #5C3A21 70%, #221208 100%);
    border-radius: 8px;
    box-shadow:
      0 45px 85px -20px rgba(0, 0, 0, 0.65),
      0 20px 40px -15px rgba(0, 0, 0, 0.45),
      inset 0 2px 4px rgba(255, 255, 255, 0.2),
      inset 0 -3px 6px rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(80, 50, 30, 0.6);
  }

  /* Inner Wood Moulding Chamfer */
  .frame-inner-moulding {
    padding: 12px;
    background: linear-gradient(135deg, #1C0F08 0%, #3B2113 50%, #150A05 100%);
    box-shadow: 
      inset 0 3px 8px rgba(0, 0, 0, 0.8),
      0 1px 2px rgba(255, 255, 255, 0.1);
  }

  /* Gold Leaf Fillet Accent */
  .gold-fillet {
    padding: 4px;
    background: linear-gradient(135deg, #D4AF37 0%, #F3E5AB 30%, #AA7A1E 70%, #FFDF73 100%);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4);
  }

  /* 4-Ply Archival Cotton Rag Mat */
  .mat-board {
    position: relative;
    background: #F9F7F1;
    padding: 56px 68px;
    box-shadow: 
      inset 0 0 25px rgba(0, 0, 0, 0.04),
      inset 0 0 2px rgba(0, 0, 0, 0.15);
  }

  /* Crisp 45deg Bevel Core */
  .mat-bevel {
    position: relative;
    padding: 3px;
    background: #EAE5D9;
    box-shadow: 
      inset 2px 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(0, 0, 0, 0.08);
  }

  /* Fine Art Print */
  .art-canvas {
    width: 480px;
    height: 600px;
    background: #FAF8F5;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  /* Tru-Vue Optium Museum Glazing Sheen */
  .glazing-reflection {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(115deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.03) 40%, 
      rgba(255, 255, 255, 0.16) 48%, 
      rgba(255, 255, 255, 0.04) 55%, 
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 10;
  }

  /* Spline Corners */
  .spline {
    position: absolute;
    width: 6px;
    height: 18px;
    background: #C5A059;
    opacity: 0.85;
    box-shadow: 0 1px 2px rgba(0,0,0,0.4);
  }
  .spline-tl1 { top: 8px; left: 24px; transform: rotate(45deg); }
  .spline-tl2 { top: 24px; left: 8px; transform: rotate(45deg); }
  .spline-tr1 { top: 8px; right: 24px; transform: rotate(-45deg); }
  .spline-tr2 { top: 24px; right: 8px; transform: rotate(-45deg); }
  .spline-bl1 { bottom: 8px; left: 24px; transform: rotate(-45deg); }
  .spline-bl2 { bottom: 24px; left: 8px; transform: rotate(-45deg); }
  .spline-br1 { bottom: 8px; right: 24px; transform: rotate(45deg); }
  .spline-br2 { bottom: 24px; right: 8px; transform: rotate(45deg); }

  /* Atelier Seal */
  .atelier-seal {
    position: absolute;
    bottom: 24px;
    right: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.8;
  }
  .seal-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px dashed #C5A059;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9A7B2C;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
  }
</style>
</head>
<body>
  <div class="scene">
    <div class="frame-wrapper">
      <div class="spline spline-tl1"></div>
      <div class="spline spline-tl2"></div>
      <div class="spline spline-tr1"></div>
      <div class="spline spline-tr2"></div>
      <div class="spline spline-bl1"></div>
      <div class="spline spline-bl2"></div>
      <div class="spline spline-br1"></div>
      <div class="spline spline-br2"></div>

      <div class="frame-inner-moulding">
        <div class="gold-fillet">
          <div class="mat-board">
            <div class="mat-bevel">
              <div class="art-canvas">
                <div class="glazing-reflection"></div>
                
                <!-- Archival Botanical Giclée Artwork -->
                <svg width="420" height="520" viewBox="0 0 420 520" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Subtle cream background texture -->
                  <rect width="420" height="520" fill="#FAF7F2"/>
                  
                  <!-- Plate border / intaglio press mark -->
                  <rect x="24" y="24" width="372" height="472" stroke="#E2DACD" stroke-width="1.5" stroke-dasharray="6 3"/>
                  
                  <!-- Intricate Botanical: Ginkgo Biloba with Archival Stippling -->
                  <g transform="translate(210, 230)">
                    <!-- Central Stem -->
                    <path d="M 0 160 Q -10 80 0 0" stroke="#7A6854" stroke-width="3" stroke-linecap="round" fill="none"/>
                    <path d="M 0 60 Q 25 30 50 10" stroke="#7A6854" stroke-width="2" stroke-linecap="round" fill="none"/>
                    <path d="M -5 100 Q -35 70 -60 50" stroke="#7A6854" stroke-width="2" stroke-linecap="round" fill="none"/>

                    <!-- Top Major Fan Leaf -->
                    <g transform="translate(0, -20)">
                      <path d="M 0 20 C -70 -20 -110 -90 -40 -120 C -10 -130 0 -100 0 -90 C 0 -100 10 -130 40 -120 C 110 -90 70 -20 0 20 Z" 
                            fill="url(#ginkgo-grad-1)" stroke="#8C733F" stroke-width="1.5"/>
                      <!-- Fan Striae -->
                      <path d="M 0 10 Q -25 -50 -70 -90 M 0 10 Q -15 -60 -45 -115 M 0 10 Q -5 -70 -15 -118 M 0 10 Q 5 -70 15 -118 M 0 10 Q 15 -60 45 -115 M 0 10 Q 25 -50 70 -90" 
                            stroke="#AA8E4A" stroke-width="0.8" opacity="0.6"/>
                    </g>

                    <!-- Right Leaf -->
                    <g transform="translate(60, 0) rotate(35) scale(0.75)">
                      <path d="M 0 20 C -70 -20 -110 -90 -40 -120 C -10 -130 0 -100 0 -90 C 0 -100 10 -130 40 -120 C 110 -90 70 -20 0 20 Z" 
                            fill="url(#ginkgo-grad-2)" stroke="#8C733F" stroke-width="1.5"/>
                      <path d="M 0 10 Q -20 -50 -55 -95 M 0 10 Q 0 -60 0 -115 M 0 10 Q 20 -50 55 -95" 
                            stroke="#AA8E4A" stroke-width="0.8" opacity="0.6"/>
                    </g>

                    <!-- Left Leaf -->
                    <g transform="translate(-70, 40) rotate(-40) scale(0.7)">
                      <path d="M 0 20 C -70 -20 -110 -90 -40 -120 C -10 -130 0 -100 0 -90 C 0 -100 10 -130 40 -120 C 110 -90 70 -20 0 20 Z" 
                            fill="url(#ginkgo-grad-3)" stroke="#8C733F" stroke-width="1.5"/>
                      <path d="M 0 10 Q -20 -50 -55 -95 M 0 10 Q 0 -60 0 -115 M 0 10 Q 20 -50 55 -95" 
                            stroke="#AA8E4A" stroke-width="0.8" opacity="0.6"/>
                    </g>
                  </g>

                  <!-- Typography Plate Details -->
                  <text x="210" y="420" font-family="'Times New Roman', serif" font-size="20" font-style="italic" fill="#2E241B" text-anchor="middle" letter-spacing="1.5">Ginkgo biloba L.</text>
                  <text x="210" y="442" font-family="-apple-system, sans-serif" font-size="9" font-weight="600" fill="#8C7355" text-anchor="middle" letter-spacing="3">FOLIUM ARBOREUM • TAB. XLVIII</text>
                  <text x="210" y="460" font-family="'Courier New', monospace" font-size="8" fill="#B0A08C" text-anchor="middle" letter-spacing="1">FRAMES COTTAGE ARCHIVAL REPRODUCTION • NO. 14/150</text>

                  <!-- Gradients -->
                  <defs>
                    <linearGradient id="ginkgo-grad-1" x1="0" y1="20" x2="0" y2="-120" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stop-color="#CBB170"/>
                      <stop offset="50%" stop-color="#D9C282"/>
                      <stop offset="100%" stop-color="#9E823E"/>
                    </linearGradient>
                    <linearGradient id="ginkgo-grad-2" x1="0" y1="20" x2="0" y2="-120" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stop-color="#BA9E5B"/>
                      <stop offset="70%" stop-color="#D1B875"/>
                      <stop offset="100%" stop-color="#8F7435"/>
                    </linearGradient>
                    <linearGradient id="ginkgo-grad-3" x1="0" y1="20" x2="0" y2="-120" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stop-color="#C2A866"/>
                      <stop offset="70%" stop-color="#DCBF7C"/>
                      <stop offset="100%" stop-color="#997C3A"/>
                    </linearGradient>
                  </defs>
                </svg>

                <div class="atelier-seal">
                  <div class="seal-circle">FC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  await page.setContent(bespokeHtml);
  await page.waitForTimeout(500);
  const bespokeElement = await page.$(".scene");
  await bespokeElement.screenshot({
    path: path.join(outputDir, "hero-cutout-bespoke-framing.png"),
    omitBackground: true,
  });

  // 2. Spatial Design & Signage Cutout
  console.log("Generating hero-cutout-spatial-signage.png...");
  const signageHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: transparent;
    width: 1400px;
    height: 1050px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif;
  }

  .scene {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px;
  }

  /* 3D Architectural Cantilever Signage Monolith */
  .signage-monolith {
    position: relative;
    width: 820px;
    height: 520px;
    background: linear-gradient(145deg, #1A1C20 0%, #0E1013 60%, #15181C 100%);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow:
      0 50px 100px -20px rgba(0, 0, 0, 0.8),
      0 25px 45px -15px rgba(0, 0, 0, 0.6),
      0 0 80px rgba(212, 175, 55, 0.2), /* Halo warm glow */
      inset 0 1px 2px rgba(255, 255, 255, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 56px;
    overflow: hidden;
  }

  /* Brushed Aero Aluminum Header Bar */
  .aero-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 24px;
  }

  .studio-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 9999px;
    background: rgba(212, 175, 55, 0.12);
    border: 1px solid rgba(212, 175, 55, 0.35);
    color: #F3E5AB;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .tech-specs {
    font-family: ui-monospace, monospace;
    font-size: 11px;
    color: #8E95A5;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  /* 3D Illuminated Channel Letters */
  .channel-lettering {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 20px 0;
  }

  .letter-row-main {
    font-size: 64px;
    font-weight: 900;
    letter-spacing: -1px;
    line-height: 1.05;
    background: linear-gradient(180deg, #FFFFFF 0%, #D8DCE3 50%, #8D939F 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 
      0 0 35px rgba(255, 255, 255, 0.4),
      0 0 70px rgba(212, 175, 55, 0.35);
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.8));
    display: flex;
    align-items: baseline;
    gap: 16px;
  }

  .letter-accent {
    color: #E6C265;
    -webkit-text-fill-color: #E6C265;
    text-shadow: 0 0 25px rgba(230, 194, 101, 0.8);
  }

  .letter-sub {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 6px;
    color: #A0AAB8;
    text-transform: uppercase;
  }

  /* Architectural Standoff Mounts */
  .standoff {
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: radial-gradient(circle, #E0E0E0 20%, #7A7A7A 70%, #2A2A2A 100%);
    box-shadow: 
      0 4px 8px rgba(0,0,0,0.6),
      inset 0 1px 2px rgba(255,255,255,0.8);
    border: 1px solid rgba(0,0,0,0.5);
  }
  .standoff::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background: #111;
    border-radius: 50%;
  }

  .so-tl { top: 20px; left: 20px; }
  .so-tr { top: 20px; right: 20px; }
  .so-bl { bottom: 20px; left: 20px; }
  .so-br { bottom: 20px; right: 20px; }

  /* Bottom Wayfinding Indicator Grid */
  .wayfinding-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
  }

  .wayfinding-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .led-beacon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #34D399;
    box-shadow: 0 0 12px #34D399, 0 0 24px #34D399;
  }

  .led-text {
    font-size: 12px;
    color: #E2E8F0;
    font-weight: 600;
    letter-spacing: 1px;
  }

  /* Directional 3D Arrow Indicator */
  .arrow-badge {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, #C5A059 0%, #8A6A23 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  }
</style>
</head>
<body>
  <div class="scene">
    <div class="signage-monolith">
      <div class="standoff so-tl"></div>
      <div class="standoff so-tr"></div>
      <div class="standoff so-bl"></div>
      <div class="standoff so-br"></div>

      <div class="aero-header">
        <div class="studio-pill">
          <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#FFD700; box-shadow:0 0 8px #FFD700;"></span>
          Architectural Wayfinding &amp; LED
        </div>
        <div class="tech-specs">
          GRADE 6061-T6 AERO ALUMINUM • 3D CHANNEL MATRIX
        </div>
      </div>

      <div class="channel-lettering">
        <div class="letter-row-main">
          <span>ATELIER</span>
          <span class="letter-accent">STUDIO 01</span>
        </div>
        <div class="letter-sub">
          Spatial Environmental Branding &bull; Level 4 North Gallery
        </div>
      </div>

      <div class="wayfinding-footer">
        <div class="wayfinding-item">
          <div class="led-beacon"></div>
          <span class="led-text">3000K WARM HALO AMBIENT ILLUMINATION ACTIVE</span>
        </div>
        <div class="wayfinding-item">
          <div class="arrow-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  await page.setContent(signageHtml);
  await page.waitForTimeout(500);
  const signageElement = await page.$(".scene");
  await signageElement.screenshot({
    path: path.join(outputDir, "hero-cutout-spatial-signage.png"),
    omitBackground: true,
  });

  // 3. Industrial Fabrication & CNC Screen Cutout
  console.log("Generating hero-cutout-industrial-cnc.png...");
  const cncHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: transparent;
    width: 1400px;
    height: 1050px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .scene {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
  }

  /* Precision Architectural CNC Brass Lattice Panel */
  .cnc-assembly {
    position: relative;
    width: 760px;
    height: 620px;
    padding: 24px;
    background: linear-gradient(135deg, #B8860B 0%, #D4AF37 35%, #8B6508 70%, #F5DEB3 100%);
    border-radius: 16px;
    box-shadow:
      0 50px 90px -20px rgba(0, 0, 0, 0.75),
      0 20px 40px -10px rgba(0, 0, 0, 0.5),
      inset 0 2px 4px rgba(255, 255, 255, 0.6),
      inset 0 -2px 6px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cnc-inner-border {
    position: relative;
    width: 100%;
    height: 100%;
    border: 3px solid #664B06;
    border-radius: 8px;
    overflow: hidden;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Countersunk CNC Screws / Fasteners */
  .bolt {
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: radial-gradient(circle, #D4AF37 30%, #5E4304 90%);
    box-shadow: inset 0 1px 2px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.5);
    border: 1px solid #3A2A02;
  }
  .bolt::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 20%;
    right: 20%;
    height: 2px;
    background: #251B02;
    transform: translateY(-50%) rotate(45deg);
  }

  .b-tl { top: 8px; left: 8px; }
  .b-tc { top: 8px; left: 50%; transform: translateX(-50%); }
  .b-tr { top: 8px; right: 8px; }
  .b-bl { bottom: 8px; left: 8px; }
  .b-bc { bottom: 8px; left: 50%; transform: translateX(-50%); }
  .b-br { bottom: 8px; right: 8px; }
  .b-ml { top: 50%; left: 8px; transform: translateY(-50%); }
  .b-mr { top: 50%; right: 8px; transform: translateY(-50%); }
</style>
</head>
<body>
  <div class="scene">
    <div class="cnc-assembly">
      <div class="bolt b-tl"></div>
      <div class="bolt b-tc"></div>
      <div class="bolt b-tr"></div>
      <div class="bolt b-bl"></div>
      <div class="bolt b-bc"></div>
      <div class="bolt b-br"></div>
      <div class="bolt b-ml"></div>
      <div class="bolt b-mr"></div>

      <div class="cnc-inner-border">
        <!-- Laser-cut Precision Geometric Arabesque Lattice with True Transparent Perforations -->
        <svg width="700" height="560" viewBox="0 0 700 560" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brass-grad" x1="0" y1="0" x2="700" y2="560" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#E8CA72"/>
              <stop offset="30%" stop-color="#C59E3F"/>
              <stop offset="60%" stop-color="#E2C268"/>
              <stop offset="85%" stop-color="#A57D28"/>
              <stop offset="100%" stop-color="#D9B75B"/>
            </linearGradient>

            <filter id="depth-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#1F1502" flood-opacity="0.8"/>
            </filter>

            <!-- 8-Point Geometric Star Pattern Lattice Cell -->
            <pattern id="lattice-pattern" width="70" height="70" patternUnits="userSpaceOnUse">
              <!-- Star 1 -->
              <path d="M 35 5 L 42 22 L 60 22 L 46 33 L 51 50 L 35 40 L 19 50 L 24 33 L 10 22 L 28 22 Z" 
                    fill="none" stroke="url(#brass-grad)" stroke-width="4.5" filter="url(#depth-shadow)"/>
              <!-- Interlocking Octagram Bevels -->
              <rect x="15" y="15" width="40" height="40" transform="rotate(45 35 35)" fill="none" stroke="url(#brass-grad)" stroke-width="3"/>
              <circle cx="35" cy="35" r="9" fill="none" stroke="url(#brass-grad)" stroke-width="3"/>
              <circle cx="35" cy="35" r="3" fill="#E8CA72"/>
            </pattern>
          </defs>

          <!-- Outer Brass Plate with Lattice Texture Cutouts -->
          <rect width="700" height="560" fill="url(#lattice-pattern)"/>

          <!-- Center Medallion Plate -->
          <g transform="translate(350, 280)">
            <!-- Outer Medallion Ring -->
            <circle r="120" fill="#20170A" stroke="url(#brass-grad)" stroke-width="6" filter="url(#depth-shadow)"/>
            <circle r="105" fill="none" stroke="#E8CA72" stroke-width="2" stroke-dasharray="4 3"/>

            <!-- Center CNC Geometric Rosette -->
            <path d="M 0 -70 L 18 -25 L 65 -25 L 26 5 L 40 50 L 0 25 L -40 50 L -26 5 L -65 -25 L -18 -25 Z" 
                  fill="url(#brass-grad)" stroke="#594008" stroke-width="2" filter="url(#depth-shadow)"/>
            <circle r="16" fill="#D9B75B" stroke="#3A2A05" stroke-width="2"/>

            <!-- Typographic Engraving -->
            <text y="78" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#E8CA72" text-anchor="middle" letter-spacing="3">5-AXIS CNC LASER SCREEN</text>
            <text y="92" font-family="-apple-system, sans-serif" font-size="8" fill="#A88B4B" text-anchor="middle" letter-spacing="2">SOLID ARCHITECTURAL BRASS • 5.0 MM</text>
          </g>
        </svg>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  await page.setContent(cncHtml);
  await page.waitForTimeout(500);
  const cncElement = await page.$(".scene");
  await cncElement.screenshot({
    path: path.join(outputDir, "hero-cutout-industrial-cnc.png"),
    omitBackground: true,
  });

  await browser.close();
  console.log("All 3 transparent PNG cutouts successfully generated!");
}

generateCutouts().catch((err) => {
  console.error("Error generating cutouts:", err);
  process.exit(1);
});
