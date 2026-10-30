/**
 * WCAG 2.1 Contrast Ratio Calculator for Step 2b
 */

function parseHex(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function sRGBtoLinear(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(hex) {
  const [r, g, b] = parseHex(hex).map(sRGBtoLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(hex1, hex2) {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const tokens = {
  light: {
    bg: '#F8FAFC',
    bgElevated: '#FFFFFF',
    text: '#0F172A',
    textMuted: '#475569',
    textInverse: '#FFFFFF',
    borderStrong: '#64748B',
    accent: '#003DF8',
    accentHover: '#0031D6',
    accentText: '#003DF8',
    focusRing: '#003DF8',
  },
  dark: {
    bg: '#08090C',
    bgElevated: '#0E1017',
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    textInverse: '#FFFFFF',
    borderStrong: '#64748B',
    accent: '#003DF8',
    accentHover: '#1F54FF',
    accentText: '#6B90FF',
    focusRing: '#6B90FF',
  },
};

function runAudit() {
  console.log('======================================================');
  console.log('WCAG 2.1 CONTRAST RATIO AUDIT - STEP 2b');
  console.log('======================================================\n');

  let allPass = true;

  ['light', 'dark'].forEach(theme => {
    const t = tokens[theme];
    const themeName = theme === 'light' ? 'Light Theme' : 'Dark Theme';

    console.log(`--- ${themeName} ---`);

    const checks = [
      {
        name: '--text on --bg',
        fg: t.text,
        bg: t.bg,
        target: 4.5,
        type: 'text (4.5:1)',
      },
      {
        name: '--accent-text on --bg',
        fg: t.accentText,
        bg: t.bg,
        target: 4.5,
        type: 'text (4.5:1)',
      },
      {
        name: '--accent-text on --bg-elevated',
        fg: t.accentText,
        bg: t.bgElevated,
        target: 4.5,
        type: 'text (4.5:1)',
      },
      {
        name: '--focus-ring on --bg',
        fg: t.focusRing,
        bg: t.bg,
        target: 3.0,
        type: 'UI (3.0:1)',
      },
      {
        name: '--focus-ring on --bg-elevated',
        fg: t.focusRing,
        bg: t.bgElevated,
        target: 3.0,
        type: 'UI (3.0:1)',
      },
      {
        name: '--text-muted on --bg',
        fg: t.textMuted,
        bg: t.bg,
        target: 4.5,
        type: 'text (4.5:1)',
      },
      {
        name: '--text-muted on --bg-elevated',
        fg: t.textMuted,
        bg: t.bgElevated,
        target: 4.5,
        type: 'text (4.5:1)',
      },
      {
        name: '--border-strong on --bg',
        fg: t.borderStrong,
        bg: t.bg,
        target: 3.0,
        type: 'UI (3.0:1)',
      },
      {
        name: '--text-inverse on --accent',
        fg: t.textInverse,
        bg: t.accent,
        target: 4.5,
        type: 'text (4.5:1)',
      },
      {
        name: '--text-inverse on --accent-hover',
        fg: t.textInverse,
        bg: t.accentHover,
        target: 4.5,
        type: 'text (4.5:1)',
      },
    ];

    checks.forEach(c => {
      const ratio = getContrastRatio(c.fg, c.bg);
      const passed = ratio >= c.target;
      if (!passed) allPass = false;

      const passLabel = passed ? 'PASS' : 'FAIL';
      console.log(
        `  ${passLabel} [${ratio.toFixed(2)}:1 >= ${c.target}:1] ${c.name} (${c.fg} on ${c.bg}) [${c.type}]`
      );
    });

    console.log('');
  });

  console.log('======================================================');
  console.log(`AUDIT RESULT: ${allPass ? 'ALL CHECKS PASSED' : 'FAILURES DETECTED'}`);
  console.log('======================================================');
}

runAudit();
