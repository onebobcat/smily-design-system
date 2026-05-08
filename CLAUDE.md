# Smily Design System — AI Prototyping Guide

You are helping create a **prototype that looks like Smily**, a vacation rental management SaaS. This file gives you everything you need to produce pixel-accurate prototypes using Smily's design language.

---

## 🎯 What is Smily?

Smily is a B2B SaaS platform for vacation rental managers. The UI is clean, professional, and data-dense. Think property listings, booking calendars, guest communication, channel management (Airbnb, Booking.com, etc.).

**Live design system reference:** https://smily-design-system.vercel.app

---

## ⚙️ Prototyping Setup

Prototypes should be **self-contained React files** (`.jsx`) that can be run with Vite, or **standalone HTML files** that load React from CDN. Use **inline styles only** — no Tailwind, no CSS modules.

Always import Google Fonts in your prototype:
```html
<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
```

---

## 🎨 Design Tokens — use these exact values, always

### Colors
```js
const tokens = {
  colors: {
    // Brand
    primary: "#1DC8CA",
    primaryGradient: "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)",
    secondary: "#FF01BB",

    // Status
    success: "#3DB559",
    error: "#E74C3C",
    warning: "#FD8B07",
    info: "#199BD9",

    // Gray scale
    gray50:  "#f6f7f9",
    gray100: "#ecedf2",
    gray200: "#d4d8e3",
    gray300: "#aeb6cb",
    gray400: "#828fae",
    gray500: "#627093",
    gray600: "#4e5a7b",
    gray700: "#404964",
    gray800: "#383f54",
    gray900: "#323748",
    gray950: "#212430",

    // Text
    headingColor: "#152536",
    bodyColor:    "#6B7176",
    dark:         "#343A40",
    white:        "#FFFFFF",
  },
  fonts: {
    heading: "'Mulish', sans-serif",   // Used for titles, nav labels, UI headings
    body:    "'Open Sans', sans-serif", // Used for everything else
  },
  radii: {
    sm: "5px",
    md: "6px",
    lg: "8px",
  },
};
```

### Color palettes (for informational cards, status backgrounds)
| Purpose       | Background | Border   | Text      |
|---------------|------------|----------|-----------|
| Informational | `#f1f9fe`  | `#99c2f5`| `#114869` |
| Neutral       | `#f6f7f9`  | `#aeb6cb`| `#404964` |
| Success       | `#f2fbf4`  | `#96dfa6`| `#1d4a29` |
| Warning       | `#fffbeb`  | `#f8d451`| `#763811` |
| Smily branded | `#effefc`  | `#55f3f0`| `#0f4e52` |
| Danger        | `#fef3f2`  | `#f9b0a8`| `#7b2921` |

---

## 🧩 Component Patterns

### Button — Solid (primary action)
```jsx
<button style={{
  background: "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "12px 16px",
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: 600,
  fontSize: "14px",
  cursor: "pointer",
}}>
  Save changes
</button>
```

### Button — Outline (secondary action)
```jsx
<button style={{
  background: "#fff",
  color: "#627093",
  border: "1px solid #aeb6cb",
  borderRadius: "6px",
  padding: "12px 16px",
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: 600,
  fontSize: "14px",
  cursor: "pointer",
}}>
  Cancel
</button>
```

### Button — Tonal
```jsx
<button style={{
  background: "rgba(29, 200, 202, 0.12)",
  color: "#1DC8CA",
  border: "none",
  borderRadius: "6px",
  padding: "12px 16px",
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: 600,
  fontSize: "14px",
  cursor: "pointer",
}}>
  View details
</button>
```

### Input Field
```jsx
<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
  <label style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#4e5a7b" }}>
    Label
  </label>
  <input
    placeholder="Placeholder"
    style={{
      height: 45,
      padding: "0 10px",
      borderRadius: "5px",
      border: "1px solid #828fae",
      background: "#f6f7f9",
      fontFamily: "'Open Sans', sans-serif",
      fontSize: 14,
      color: "#404964",
      outline: "none",
    }}
  />
</div>
```

### Navigation Drawer
Width: 256px, white background, `border-right: 1px solid #ecedf2`.
- Active item: `background: rgba(29,200,202,0.10)`, text `#1DC8CA`, weight 600
- Default item: text `#404964`, weight 400
- Item height: ~36px, padding: `8px 10px`, border-radius: `6px`
- Icons: 17px, gray-400 default / primary when active

Nav items (in order): Dashboard, Inbox, Tasks, Calendar, Bookings, Guests, Rentals, Rate tables, Discounts, Inquiries, Reviews, Performance, Finance, Apps, What's new?, Help, Settings

### Dialog / Modal
```jsx
// Overlay
<div style={{
  position: "fixed", inset: 0,
  background: "rgba(53,64,82,0.55)",
  display: "flex", alignItems: "center", justifyContent: "center",
  zIndex: 1000,
}}>
  {/* Modal card */}
  <div style={{
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "2px 4px 20px rgba(0,0,0,0.10)",
    width: 500,
    padding: "24px",
  }}>
    {/* content */}
  </div>
</div>
```

### Informational Card
```jsx
<div style={{
  background: "#f1f9fe",
  border: "1px solid #99c2f5",
  borderRadius: "12px",
  padding: "20px",
}}>
  <div style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#114869" }}>
    Header
  </div>
  <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 14, color: "#114869", marginTop: 8 }}>
    This booking contains locked fields.
  </p>
</div>
```

### Page Header
```jsx
<div style={{
  background: "#fff",
  borderBottom: "1px solid #ecedf2",
  padding: "20px 32px",
  fontFamily: "'Mulish', sans-serif",
  fontSize: 20,
  fontWeight: 800,
  color: "#152536",
}}>
  Page Title
</div>
```

### Data Table Row
```jsx
<tr style={{ borderBottom: "1px solid #ecedf2" }}>
  <td style={{ padding: "12px 16px", fontFamily: "'Open Sans', sans-serif", fontSize: 14, color: "#404964" }}>
    Content
  </td>
</tr>
```

### Badge
```jsx
// Status badge
<span style={{
  background: "#f2fbf4",
  border: "1px solid #96dfa6",
  color: "#1d4a29",
  borderRadius: "5px",
  padding: "2px 8px",
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: 600,
  fontSize: 13,
}}>
  Confirmed
</span>
```

---

## 📐 Layout Rules

- **Page background:** `#f6f7f9` (gray-50)
- **Cards / panels:** `#ffffff` with `border: 1px solid #ecedf2` and `border-radius: 8px`
- **Card shadow (light):** `box-shadow: 0px 2px 9px rgba(98,112,147,0.14)`
- **Card shadow (strong):** `box-shadow: 2px 4px 20px rgba(0,0,0,0.10)`
- **Content max-width:** 900–1200px, centered
- **Standard padding:** 24px–32px for page sections, 16–20px for cards
- **Gap between elements:** 12–16px

---

## 🖋 Typography Rules

| Usage | Font | Size | Weight | Color |
|---|---|---|---|---|
| Page title | Mulish | 20–24px | 800 | `#152536` |
| Section heading | Mulish | 16px | 700 | `#152536` |
| Card title | Open Sans | 16px | 600 | `#4e5a7b` |
| Body text | Open Sans | 14px | 400 | `#404964` |
| Labels / captions | Open Sans | 12px | 400 | `#4e5a7b` |
| Nav items | Open Sans | 13px | 400/600 | `#404964` / `#1DC8CA` |

---

## 💡 Prototyping Tips

1. **Start with the layout shell** — sidebar nav (256px) + main content area with gray-50 background.
2. **Use the page header pattern** — white bar with Mulish title + optional buttons top-right.
3. **Cards everywhere** — Smily uses white cards with light borders for all data panels.
4. **Teal is the primary action color** — use the gradient for CTAs, solid teal for active states.
5. **Data tables are common** — use Open Sans 14px, row borders `#ecedf2`, header row slightly bolder.
6. **Avoid bright/loud colors** — only use secondary pink (`#FF01BB`) for badges/highlights, never for large areas.

---

## 🔗 Resources

- **Live components:** https://smily-design-system.vercel.app
- **Source code:** https://github.com/onebobcat/smily-design-system
- **Component file:** `src/SmilyDesignSystem.jsx` — copy any component directly from here
