# Smily Design System

Component library and design token reference for building Smily prototypes.

🔗 **Live site:** https://smily-design-system.vercel.app  
📁 **Component source:** [`src/SmilyDesignSystem.jsx`](src/SmilyDesignSystem.jsx)

---

## What's inside

| Tab | Components |
|-----|-----------|
| 🎨 Colors | Brand, status, gray scale, teal & pink palettes — click any swatch to copy the hex |
| 📝 Typography | Mulish (headings) + Open Sans (body) · full scale with weights |
| 🔘 Buttons | Solid, Outline, Tonal, Text · sizes S/M · disabled & loading states |
| 📥 Inputs | Default, focused, filled, error, disabled, minimal |
| 💬 Dialogs | Default, Delete (destructive), Success (celebration) — all interactive |
| 🧭 Navigation | Full sidebar drawer with account switcher · 17 nav items · active/hover states |
| 🃏 Cards | Info cards (6 color purposes), Metric cards, Discovery/promo card |

---

## Using this to create prototypes with Claude

The easiest way to generate a Smily-style prototype is to share this repo with Claude in your conversation:

> "Use the design system at https://github.com/onebobcat/smily-design-system to create a prototype of [screen description]."

Claude will read `CLAUDE.md` automatically and apply the correct colors, fonts, components, and layout rules.

**What to ask for:**
- "Create a bookings list page"
- "Design a guest communication inbox"
- "Build a rental property settings form"
- "Make a dashboard with key metrics"

---

## Run locally

```bash
npm install
npm run dev
```

## Tech stack

- React 18 + Vite
- Inline styles (no CSS framework)
- Google Fonts: Mulish + Open Sans
- Deployed on Vercel

---

## Design tokens (quick reference)

```js
primary:         "#1DC8CA"
primaryGradient: "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)"
secondary:       "#FF01BB"
headingFont:     "'Mulish', sans-serif"
bodyFont:        "'Open Sans', sans-serif"
borderRadius:    "6px"
cardShadow:      "2px 4px 20px rgba(0,0,0,0.10)"
pageBg:          "#f6f7f9"
cardBg:          "#ffffff"
```

Full token reference → [`CLAUDE.md`](CLAUDE.md)
