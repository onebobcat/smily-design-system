#!/usr/bin/env node
/**
 * sync-from-bridge.js
 *
 * Reads the Bridge KB (learnings + registries) and updates:
 *   1. The `tokens` object in SmilyDesignSystem.jsx
 *   2. CLAUDE.md — regenerates the Design Rules section from learnings.json
 *
 * Then stages + commits both files so you can review before pushing.
 *
 * Usage:
 *   npm run sync              — sync + commit, then push manually
 *   npm run sync -- --push    — sync + commit + push to smily main
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ─── BRIDGE KB PATHS ────────────────────────────────────────────────────────

const BRIDGE_ROOT = "/Users/macos/noemuch-bridge/bridge-ds/knowledge-base";
const VARS_PATH   = path.join(BRIDGE_ROOT, "registries/variables.json");
const TEXT_PATH   = path.join(BRIDGE_ROOT, "registries/text-styles.json");
const LEARN_PATH  = path.join(BRIDGE_ROOT, "learnings.json");

// ─── TARGET FILES ───────────────────────────────────────────────────────────

const JSX_PATH    = path.join(ROOT, "src/SmilyDesignSystem.jsx");
const CLAUDE_PATH = path.join(ROOT, "CLAUDE.md");

// ─── HELPERS ────────────────────────────────────────────────────────────────

function rgbToHex({ r, g, b }) {
  const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function loadJson(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌  File not found: ${filePath}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function byName(variables) {
  return Object.fromEntries(variables.map((v) => [v.name, v]));
}

function floatVal(variables, name) {
  const v = variables[name];
  if (!v) return null;
  const mode = Object.values(v.valuesByMode)[0];
  return typeof mode === "number" ? mode : null;
}

function colorVal(variables, name) {
  const v = variables[name];
  if (!v) return null;
  const mode = Object.values(v.valuesByMode)[0];
  return typeof mode === "object" && "r" in mode ? rgbToHex(mode) : null;
}

// ─── STEP 1: EXTRACT TOKENS FROM BRIDGE ─────────────────────────────────────

console.log("📖  Reading Bridge KB...");
const { variables } = loadJson(VARS_PATH);
const vMap = byName(variables);

// Spacing
const spacing = {};
for (let i = 0; i <= 8; i++) {
  const v = floatVal(vMap, `spacing/${i}`);
  if (v !== null) spacing[i] = `${v}px`;
}

// Radii
const radiiMap = { xs: "radius/xs", sm: "radius/sm", md: "radius/md", lg: "radius/lg", xl: "radius/xl", "2xl": "radius/2xl" };
const radii = {};
for (const [key, tokenName] of Object.entries(radiiMap)) {
  const v = floatVal(vMap, tokenName);
  if (v !== null) radii[key] = `${v}px`;
}
radii.pill = "1000px"; // semantic, not in variable registry

// Colors — map known semantic names from variables
const colorEntries = [
  // Gray scale from Figma (derived from known palette)
  ["gray50",  "#f6f7f9"],
  ["gray100", "#ecedf2"],
  ["gray200", "#d4d8e3"],
  ["gray300", "#aeb6cb"],
  ["gray400", "#828fae"],
  ["gray500", "#627093"],
  ["gray600", "#4e5a7b"],
  ["gray700", "#404964"],
  ["gray800", "#383f54"],
  ["gray900", "#323748"],
  ["gray950", "#212430"],
];

// Pull live values from Bridge for brand/status colors where possible
// Teal-400 = #1DC8CA (brand primary), Teal-600 = gradient start
const teal400 = colorVal(vMap, "colors/turquoise/Teal-400");
const teal600 = colorVal(vMap, "colors/turquoise/Teal-600");
// Pink-500 = #FF27D7 per Bridge; keep #FF01BB as fallback if palette drifts
const pink500 = colorVal(vMap, "colors/pink/Pink-500");
const red500  = colorVal(vMap, "colors/red/Red-500") || colorVal(vMap, "colors/red/Red-400");

const colors = {
  primary:         teal400  || "#1DC8CA",
  primaryGradient: `linear-gradient(82.58deg, ${teal600 || "#08767D"} 15.234%, ${teal400 || "#1DC8CA"} 241.16%)`,
  secondary:       pink500  || "#FF01BB",
  success:  "#3DB559",
  error:    red500  || "#E74C3C",
  warning:  "#FD8B07",
  info:     "#199BD9",
  ...Object.fromEntries(colorEntries),
  headingColor: "#152536",
  bodyColor:    "#6B7176",
  dark:         "#343A40",
  white:        "#FFFFFF",
};

// Shadow tokens (assembled from Bridge parts)
function shadowPx(name) { return `${floatVal(vMap, name) ?? 0}px`; }
function shadowColor(name) {
  const v = vMap[name];
  if (!v) return "rgba(0,0,0,0.10)";
  const m = Object.values(v.valuesByMode)[0];
  if (!m || typeof m !== "object") return "rgba(0,0,0,0.10)";
  const { r, g, b, a } = m;
  return `rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${(a ?? 1).toFixed(2)})`;
}

const shadows = {
  card:       `${shadowPx("shadow/card/offsetX")} ${shadowPx("shadow/card/offsetY")} ${shadowPx("shadow/card/blur")} ${shadowColor("shadow/card/color")}`,
  cardStrong: `${shadowPx("shadow/card-strong/offsetX")} ${shadowPx("shadow/card-strong/offsetY")} ${shadowPx("shadow/card-strong/blur")} ${shadowColor("shadow/card-strong/color")}`,
  cardWide:   "0px 4px 40px rgba(0, 0, 0, 0.10)",
  inner:      "inset -1px 0px 12px rgba(0, 0, 0, 0.04)",
};

// Typography from text-styles.json
const { styles: textStyles } = loadJson(TEXT_PATH);
const headingStyle = textStyles.find((s) => s.key === "heading/md");
const bodyStyle    = textStyles.find((s) => s.key === "text/regular/sm");

const fonts = {
  heading: `'${headingStyle?.fontFamily ?? "Sofia Pro"}', sans-serif`,
  body:    `'${bodyStyle?.fontFamily ?? "Open Sans"}', sans-serif`,
};

// ─── STEP 2: WRITE TOKENS INTO SmilyDesignSystem.jsx ────────────────────────

console.log("✏️   Updating tokens in SmilyDesignSystem.jsx...");

const jsx = fs.readFileSync(JSX_PATH, "utf8");

const tokensBlock = `const tokens = {
  colors: {
    // Brand
    primary: "${colors.primary}",
    primaryGradient: "${colors.primaryGradient}",
    secondary: "${colors.secondary}",

    // Status
    success: "${colors.success}",
    error: "${colors.error}",
    warning: "${colors.warning}",
    info: "${colors.info}",

    // Gray scale
    gray50:  "${colors.gray50}",
    gray100: "${colors.gray100}",
    gray200: "${colors.gray200}",
    gray300: "${colors.gray300}",
    gray400: "${colors.gray400}",
    gray500: "${colors.gray500}",
    gray600: "${colors.gray600}",
    gray700: "${colors.gray700}",
    gray800: "${colors.gray800}",
    gray900: "${colors.gray900}",
    gray950: "${colors.gray950}",

    // Text
    headingColor: "${colors.headingColor}",
    bodyColor:    "${colors.bodyColor}",
    dark:         "${colors.dark}",
    white:        "${colors.white}",
  },
  fonts: {
    // Figma DS: ${headingStyle?.fontFamily ?? "Sofia Pro"} — web prototype substitute: Mulish
    heading: "'Mulish', sans-serif",
    body:    "${fonts.body}",
  },
  radii: {
    xs:   "${radii.xs   ?? "2.5px"}",
    sm:   "${radii.sm   ?? "5px"}",
    md:   "${radii.md   ?? "10px"}",
    lg:   "${radii.lg   ?? "20px"}",
    xl:   "${radii.xl   ?? "40px"}",
    pill: "${radii.pill}",
  },
  spacing: {
    0: "${spacing[0] ?? "0px"}",
    1: "${spacing[1] ?? "2px"}",
    2: "${spacing[2] ?? "4px"}",
    3: "${spacing[3] ?? "8px"}",
    4: "${spacing[4] ?? "12px"}",
    5: "${spacing[5] ?? "16px"}",
    6: "${spacing[6] ?? "20px"}",
    7: "${spacing[7] ?? "24px"}",
    8: "${spacing[8] ?? "32px"}",
  },
  shadows: {
    card:       "${shadows.card}",
    cardStrong: "${shadows.cardStrong}",
    cardWide:   "${shadows.cardWide}",
    inner:      "${shadows.inner}",
  },
};`;

// Replace existing tokens block
const tokensRegex = /const tokens = \{[\s\S]*?\n\};/;
if (!tokensRegex.test(jsx)) {
  console.error("❌  Could not find `const tokens = {` block in SmilyDesignSystem.jsx");
  process.exit(1);
}
const updatedJsx = jsx.replace(tokensRegex, tokensBlock);
fs.writeFileSync(JSX_PATH, updatedJsx, "utf8");
console.log("   ✅  SmilyDesignSystem.jsx tokens updated");

// ─── STEP 3: REGENERATE DESIGN RULES IN CLAUDE.md ───────────────────────────

console.log("✏️   Updating CLAUDE.md Design Rules from learnings.json...");

const { learnings } = loadJson(LEARN_PATH);

// Group learnings by context
const groups = {};
for (const l of learnings) {
  const key = l.context?.screenType ?? "general";
  if (!groups[key]) groups[key] = [];
  groups[key].push(l);
}

let rulesSection = `## ⚖️ Design Rules (from production learnings)\n\nThese rules were captured from real design sessions and corrections. Follow them precisely.\n\n`;

for (const [screenType, items] of Object.entries(groups)) {
  rulesSection += `### ${screenType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}\n`;
  for (const l of items) {
    rulesSection += `- **${l.change?.property ?? "Rule"}**: ${l.rule}\n`;
  }
  rulesSection += "\n";
}

// Add static comparison table if in-app intercepts are present
if (groups["in-app-intercept"]) {
  rulesSection += `### Dialogs vs Intercepts\n| | Blocking Dialog | In-app Intercept |\n|---|---|---|\n| Status icon | ✅ Yes | ❌ No |\n| Title divider | ✅ Yes | ❌ No |\n| Primary gradient button | ✅ Yes | ❌ No |\n| Submit button style | Primary (gradient) | Secondary (tonal) |\n| Dismiss button style | Outline | Ghost / Text |\n| Close X | Optional | Always visible |\n\n`;
}

// Replace existing Design Rules section in CLAUDE.md
const claudeMd = fs.readFileSync(CLAUDE_PATH, "utf8");
const rulesRegex = /## ⚖️ Design Rules[\s\S]*?(?=\n## |$)/;
let updatedClaude;
if (rulesRegex.test(claudeMd)) {
  updatedClaude = claudeMd.replace(rulesRegex, rulesSection.trimEnd() + "\n\n");
} else {
  // Append if section doesn't exist
  updatedClaude = claudeMd.trimEnd() + "\n\n" + rulesSection;
}
fs.writeFileSync(CLAUDE_PATH, updatedClaude, "utf8");
console.log("   ✅  CLAUDE.md Design Rules updated");

// ─── STEP 4: COMMIT ──────────────────────────────────────────────────────────

console.log("\n📦  Committing changes...");

const date = new Date().toISOString().slice(0, 10);

try {
  execSync(`git -C "${ROOT}" add src/SmilyDesignSystem.jsx CLAUDE.md`, { stdio: "inherit" });
  execSync(
    `git -C "${ROOT}" commit -m "sync: update tokens + design rules from Bridge KB (${date})"`,
    { stdio: "inherit" }
  );
  console.log("   ✅  Committed");
} catch (e) {
  console.log("   ℹ️   Nothing to commit (already up to date)");
}

// ─── STEP 5: PUSH (optional) ─────────────────────────────────────────────────

const shouldPush = process.argv.includes("--push");
if (shouldPush) {
  console.log("\n🚀  Pushing to smily main → Vercel will auto-deploy...");
  execSync(`git -C "${ROOT}" push smily main`, { stdio: "inherit" });
  console.log("   ✅  Pushed — check https://smily-design-system.vercel.app in ~60s");
} else {
  console.log("\n✨  Done. Review the diff, then run:\n    git push smily main\n    (or: npm run sync -- --push)");
}
