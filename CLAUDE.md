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

> **Font note:** The Figma design system uses **Sofia Pro** for headings. For web prototypes, use **Mulish** as the closest available Google Fonts substitute. Open Sans is used for all body text in both Figma and web.

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
    // Figma DS: Sofia Pro — web prototype substitute: Mulish
    heading: "'Mulish', sans-serif",
    body:    "'Open Sans', sans-serif",
  },
  radii: {
    xs:  "2.5px",
    sm:  "5px",
    md:  "10px",
    lg:  "20px",
    xl:  "40px",
    pill: "1000px",
  },
  spacing: {
    0:  "0px",
    1:  "2px",
    2:  "4px",
    3:  "8px",
    4:  "12px",
    5:  "16px",
    6:  "20px",
    7:  "24px",
    8:  "32px",
  },
  shadows: {
    card:       "0px 2px 9px rgba(98, 112, 147, 0.14)",
    cardStrong: "2px 4px 20px rgba(0, 0, 0, 0.10)",
    cardWide:   "0px 4px 40px rgba(0, 0, 0, 0.10)",
    inner:      "inset -1px 0px 12px rgba(0, 0, 0, 0.04)",
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
  borderRadius: "5px",
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
  borderRadius: "5px",
  padding: "12px 16px",
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: 600,
  fontSize: "14px",
  cursor: "pointer",
}}>
  Cancel
</button>
```

### Button — Tonal (secondary emphasis)
```jsx
<button style={{
  background: "rgba(29, 200, 202, 0.12)",
  color: "#1DC8CA",
  border: "none",
  borderRadius: "5px",
  padding: "12px 16px",
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: 600,
  fontSize: "14px",
  cursor: "pointer",
}}>
  View details
</button>
```

### Button — Ghost / Text (low-commitment action)
```jsx
<button style={{
  background: "transparent",
  color: "#1DC8CA",
  border: "none",
  borderRadius: "5px",
  padding: "12px 4px",
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: 600,
  fontSize: "14px",
  cursor: "pointer",
  textDecoration: "underline",
}}>
  Skip
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
- Item height: ~36px, padding: `8px 10px`, border-radius: `5px`
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
    borderRadius: "20px",
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
  borderRadius: "20px",
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
  fontFamily: "'Mulish', sans-serif", // Sofia Pro in Figma, Mulish on web
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
- **Cards / panels:** `#ffffff` with `border: 1px solid #ecedf2` and `border-radius: 20px`
- **Card shadow (light):** `box-shadow: 0px 2px 9px rgba(98,112,147,0.14)`
- **Card shadow (strong):** `box-shadow: 2px 4px 20px rgba(0,0,0,0.10)`
- **Content max-width:** 900–1200px, centered
- **Standard padding:** 24px–32px for page sections, 16–20px for cards
- **Gap between elements:** 12–16px

---

## 🖋 Typography Rules

| Usage | Font (Figma) | Font (web) | Size | Weight | Color |
|---|---|---|---|---|---|
| Page title | Sofia Pro | Mulish | 20–24px | 800 | `#152536` |
| Section heading | Sofia Pro | Mulish | 16px | 700 | `#152536` |
| Card title | Open Sans | Open Sans | 16px | 600 | `#4e5a7b` |
| Body text | Open Sans | Open Sans | 14px | 400 | `#404964` |
| Labels / captions | Open Sans | Open Sans | 12px | 400 | `#4e5a7b` |
| Nav items | Open Sans | Open Sans | 13px | 400/600 | `#404964` / `#1DC8CA` |

---

## ⚖️ Design Rules (from production learnings)

These rules were captured from real design sessions and corrections. Follow them precisely.

### In App Intercept
- **statusIcon.visible**: In-app intercept hides the status icon. The icon is reserved for dialogs that communicate system state (error, warning, success). A feedback intercept has no system state to communicate — showing an icon adds false urgency.
- **titleDivider.visible**: In-app intercept hides the title divider. Removing the divider reduces visual weight and reinforces that the intercept is lighter than a blocking dialog.
- **dismissButton.variant**: In-app intercept uses Tertiary bis (ghost/text) for the dismiss action and Secondary (tonal) for the submit action. Ghost Skip signals lower commitment than an outline button; tonal Submit is prominent without competing with the host page's Primary CTA.
- **submitButton.variant**: In-app intercept submit CTA uses Secondary (tonal) not Primary (gradient). Primary is reserved for the host page's own CTAs — using Secondary prevents the intercept from competing visually.
- **closeButton.visible**: The X close button is always visible on in-app intercepts. It is the primary dismiss affordance and the strongest visual differentiator from banners and tooltips. Never hide it.
- **trigger.timing**: In-app intercepts fire at the exact moment of user action — not before and not after. Signal quality is highest when the reason is captured at the moment the user acts.
- **questionFormat**: In-app intercepts ask exactly one open-ended question with a free-text area. No multi-step, no rating scales, no chevrons. One question lowers friction and increases completion rate.

### Switch Flow
- **screen.count**: The pre-switch interstitial ('Before you switch...') is redundant when an in-app intercept is already in the flow. The intercept captures the same intent signal with less friction — remove the interstitial.

### Confirmation Dialog
- **confirmationRows**: Financial subscription confirmation dialogs use exactly 4 summary rows: Property (which entity), Amount (price/period), Billing (when first charged), Commitment (lock-in duration). This set gives the user everything needed to confirm a financial commitment without cognitive overload.
- **rentalRow.value**: Do not include portfolio-ordinal identifiers (e.g. 'Rental 21') in confirmation dialogs. Ordinals are pricing-tier context meaningful only in the pricing tooltip — they confuse users in a confirmation summary. Identify the entity by its display name (property/rental name) instead, or drop the row.

### Post Action Feedback
- **snackbar.position**: Success snackbar after a form submission is placed top-center, y=80px from the top of the viewport frame (below the browser chrome bar). It overlays the page content without blocking primary navigation.

### Booking Detail
- **bookings.body**: When a Subsection field displays a count value that warrants a badge (numeric frequency + icon, e.g. booking count), detach the Subsection and replace the body Text row with a `badge - outline` DS component. Use the `regular/users/crown` icon for booking count. The Subsection body slot only accepts plain text — badge/chip values require detachment.

### Any
- **button.label**: All button CTAs use action verb + object: "Create rental", "Save changes", "Delete booking". Nouns are acceptable only for navigational elements (tabs, menu items, filter chips) that navigate rather than act.
- **copy.ampersand**: Always use "and" instead of "&" in all UI copy. The ampersand reduces readability and is ambiguous for property managers in legal/professional contexts (e.g., rental agreements).
- **copy.casing**: Sentence case everywhere — labels, button text, headings, helper text. Never title case for UI copy.
- **overlayType**: Use a Dialog for confirmations, critical alerts, and short tasks. Use a Sidebar (right side panel) when the user needs to maintain context with the background. Use a Full Page for complex multi-step workflows. Never use a dialog for complex forms or wizards.
- **badge.colorSemantics**: Color semantics: Green=Completed/Success, Blue=Upcoming/Scheduled/Partial, Yellow=Pending/Warning, Red=Danger/Overdue/Action required, Grey=Incomplete/Inactive/Expected, Purple=Secured/AI features.
- **spacing.defaults**: Default spacing: 16px between components. 12px between buttons or tabs. Spacing within a component is variable for visual balance; 12px for button groups within a component.
- **table.clickableCells**: In tables: if rows have a trailing action button, cells within that row can be made clickable without breaking accessibility. Avoid having both a clickable row AND clickable cells — pick one interaction model per table.
- **destructiveButton.confirmationRequired**: Destructive / Delete button always requires a confirmation dialog before executing. CTA must use action verb + object: "Delete booking", "Remove rental" — never just "Delete".
- **tabs.navigationIA**: Tabs represent operational sub-scope within a section — not top-level navigation. Tab labels use nouns ('Overview', 'Bookings', 'Settings') because they navigate rather than act. Never duplicate top-level nav patterns inside tabs.
- **navigation.IAhierarchy**: Navigation IA reflects operational scope. System hierarchy (most general → most specific): account → channel → rental → booking. System-level features (e.g. rental tags) belong in Settings. Contextual processes (e.g. claim damage protection) live within their relevant section, not in Settings.
- **filterBar.overflowBehavior**: Filter bar layout: ≤3 filter buttons show inline as pills. ≥4 filter buttons collapse overflow behind a 'Filters' dropdown button. Elements are always top-aligned to prevent misalignment on narrow viewports.
- **button.iconPlacement**: Button icons go left of label by default (matches reading flow, reinforces hierarchy). Icon goes right of label only for directional or forward actions (e.g. 'Next →', 'More →'). Never place icon right for standard CTAs.
- **textButton.colorContext**: Text button color follows surface context, not sentiment: Teal (primary) on default white/neutral backgrounds. Blue on informational banner backgrounds (blue-50). Gray on muted surfaces only, sparingly. Red for destructive/irreversible actions only — never on neutral surfaces.
- **input.sizes**: Input field heights: large=85px, small=77px. Input types: text, search, select, numeric. States in order: Enabled (placeholder) → Hover → Focused → Entered → Error → Disabled → Locked (numeric only).
- **textButton.subPatterns**: Text buttons follow two sub-patterns: navigation (trailing edit/pencil icon, takes the user to a related management screen) and expand/collapse (trailing chevron-down icon, reveals inline detail without navigating away). Place text buttons right-aligned in the form section, vertically centered next to the relevant field group.
- **table.accessibilityPattern**: Place row action buttons at the end of the row rather than inline within cells. This lets screen readers identify interactive elements reliably and keeps navigation separated from data content.
- **input.scrollbarBehavior**: Desktop designs must always account for the scroll bar, using Chrome and Firefox scroll bar behavior as the reference since it adds padding to the content area. Mobile designs need no reserved padding, as the scroll bar sits on top of the margins.

### Form
- **form.saveErrorBehavior**: On partial save failure: keep failed fields in Error state and apply Entered styling to successfully saved fields. Never reset valid inputs after a failed save. Show error snackbar alongside field-level error messages.

### Dialogs vs Intercepts
| | Blocking Dialog | In-app Intercept |
|---|---|---|
| Status icon | ✅ Yes | ❌ No |
| Title divider | ✅ Yes | ❌ No |
| Primary gradient button | ✅ Yes | ❌ No |
| Submit button style | Primary (gradient) | Secondary (tonal) |
| Dismiss button style | Outline | Ghost / Text |
| Close X | Optional | Always visible |


## 💡 Prototyping Tips

1. **Start with the layout shell** — sidebar nav (256px) + main content area with gray-50 background.
2. **Use the page header pattern** — white bar with heading font title + optional buttons top-right.
3. **Cards everywhere** — Smily uses white cards with light borders and `border-radius: 20px` for all data panels.
4. **Teal is the primary action color** — use the gradient for page-level CTAs, solid teal for active states.
5. **Data tables are common** — use Open Sans 14px, row borders `#ecedf2`, header row slightly bolder.
6. **Avoid bright/loud colors** — only use secondary pink (`#FF01BB`) for badges/highlights, never for large areas.
7. **Respect button hierarchy** — gradient → tonal → outline → ghost. Each level signals less commitment.

---

## 🔗 Resources

- **Live components:** https://smily-design-system.vercel.app
- **Source code:** https://github.com/onebobcat/smily-design-system
- **Component file:** `src/SmilyDesignSystem.jsx` — copy any component directly from here
