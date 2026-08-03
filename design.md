# Smily design.md

> Concept borrowed from ["Your design.md is missing these 10 lines"](https://medium.muz.li/your-design-md-is-missing-these-10-lines-731e1a70d6e3): teams write a `CLAUDE.md` so an agent knows how to run tests, but rarely write down that the product uses a 4px spacing grid — so the agent "reasonably" invents a new blue, a new modal pattern, or a new spacing value that already has an answer. This file is that missing piece for Smily: the terse, scannable set of hard design conventions an agent (or a new designer) should check *before* making a judgment call, not the full component code — that's [CLAUDE.md](CLAUDE.md).
>
> Every rule below is sourced from a captured production learning in [`bridge-ds/knowledge-base/learnings.json`](bridge-ds/knowledge-base/learnings.json) (cited as `[Lxxx]`) or the live Smily Figma DS. Nothing here is invented — if a value isn't cited, it isn't a rule yet, it's a question to ask.

---

## 1. Spacing

- Scale: `0, 2, 4, 8, 12, 16, 20, 24, 32px`. Don't introduce a value outside this scale.
- Default gap between components: **16px**. Between buttons or tabs in a group: **12px**. [L019]
- Spacing *within* a component is allowed to vary for visual balance — the 16/12 defaults are cross-component rules, not a rigid grid for every internal gap.
- Desktop layouts must reserve room for the browser scrollbar (Chrome/Firefox add padding to the content area for it). Mobile reserves nothing — the scrollbar overlays the margin. [L030]

## 2. Color

- Brand: primary teal `#1DC8CA` / gradient `#08767D → #1DC8CA`, secondary pink `#FF01BB`. Pink is for badges and highlights only — never a large area.
- Status color is semantic, not decorative, everywhere it appears (badges, snackbars, alerts): **Green** = Completed/Success · **Blue** = Upcoming/Scheduled/Partial · **Yellow** = Pending/Warning · **Red** = Danger/Overdue/Action required · **Grey** = Incomplete/Inactive/Expected · **Purple** = Secured/AI feature. [L018]
- Never invent a new hex value. Use the gray-50→950 scale and the status/brand colors defined in [CLAUDE.md](CLAUDE.md) — that's the full palette, not a starting point.
- Text button color follows the *surface* it sits on, not the sentiment of the action it performs: teal on white/neutral, blue inside a blue-50 informational banner, gray on muted surfaces (sparingly), red only for destructive/irreversible actions and never on a neutral surface. [L026]

## 3. Typography & copy

- Sentence case everywhere — labels, buttons, headings, helper text. Never title case. [L015]
- "and", never "&", in any UI copy. Reads ambiguous in legal/professional contexts (rental agreements, billing). [L014]
- Button CTAs are verb + object: "Create rental", "Delete booking". Nouns are only for things that navigate rather than act — tabs, menu items, filter chips. [L013]
- Helper text under a field stays one line of plain instruction — never a multi-sentence explanation, never a "find out more" / help-center link. A longer explanation of what a field *means* belongs in an info tooltip next to the label instead. [L038]
- Field-level error copy is specific and actionable — "Email format is invalid" — never generic ("Error occurred"). [L033]

## 4. Component patterns

- Button hierarchy, most to least commitment: **gradient (Primary) → tonal (Secondary) → outline → ghost/text**. Pick the lowest level that still gets the job done.
- Icon placement: left of label by default (matches reading flow). Right of label only for directional/forward actions ("Next →"). Never right on a standard CTA. [L025]
- Text buttons have exactly two sub-patterns: **navigation** (trailing pencil icon, links to a related management screen) or **expand/collapse** (trailing chevron, reveals inline detail without navigating away). Right-aligned, vertically centered next to the relevant field group. [L028]
- Tabs represent operational sub-scope *inside* a section, not top-level navigation — labels are nouns. Never duplicate the top-level nav pattern inside tabs. [L022]
- Filter bar: ≤3 filters show inline as pills; 4+ collapse behind a "Filters" dropdown, elements always top-aligned. [L024] The trigger going outline→tonal when filters are active is a known inconsistency with other button states — implement it as-is, don't patch it locally. [L034] "Clear filters" is a secondary text button, never red/destructive. [L032] On **mobile**, the trigger drops to icon-only — funnel icon, no label, no border, no chevron (tapping always opens a sheet, so the chevron adds nothing) — and sits top-right next to the primary CTA. When the toolbar already has 4+ elements (e.g. a multi-rental calendar), Filters and Legend move into a "⋯" overflow menu ordered *Compact view → Detailed view → Legend → Filters* — view-density options before data-scoping controls. [L039, L040]
- Tables: a row with a trailing action button may have clickable cells, but never combine a clickable row *and* clickable cells — pick one interaction model per table. Action buttons live at the row end, never inline in a cell, so screen readers can identify them reliably. [L020, L029]
- A Subsection field showing a count that warrants a badge (e.g. a booking count) should be detached and use a `badge - outline` component for that row — the Subsection body slot only accepts plain text. [L012]
- Dropzone's disabled state is not a flat gray one step down from default: background → gray-50, border → gray-200 (both one step lighter than Input field's own disabled state); title label and file-size hint → gray-400; drag instruction and format hint → gray-300 (more muted); upload icon stays gray-300, unchanged. [L031]

## 5. Forms

- Input states, in order: **Enabled (placeholder) → Hover → Focused → Entered → Error → Disabled → Locked** (numeric only). Field heights: large 85px, small 77px. [L027]
- On partial save failure: keep failed fields in Error state, apply Entered styling to the fields that *did* save. Never reset valid input. Show an error snackbar alongside the field-level errors. [L016]
- Never show a success snackbar if any field in a multi-field save failed — success only fires when every save request succeeds; a partial failure shows the error snackbar instead. [L036]
- On a long form, scroll to the first validation error after a failed save. [L037]

## 6. Overlays

Use a **Dialog** for confirmations, critical alerts, and short tasks. Use a **Sidebar** when the user needs to keep background context. Use a **Full page** for complex multi-step workflows. Never a dialog for a complex form or wizard. [L017]

| | Blocking Dialog | In-app Intercept |
|---|---|---|
| Status icon | Yes | No — no system state to communicate, an icon adds false urgency [L001] |
| Title divider | Yes | No — keeps it visually lighter than a blocking dialog [L002] |
| Submit button | Primary (gradient) | Secondary (tonal) — never competes with the host page's own CTA [L004] |
| Dismiss button | Outline | Ghost/text — signals lower commitment [L003] |
| Close X | Optional | Always visible — the primary dismiss affordance [L005] |

- In-app intercepts fire at the exact moment of the triggering action — not before, not after — for the highest-quality signal. [L006]
- They ask exactly one open-ended question with free text — no multi-step, no rating scale, no chevrons. [L007]
- If an intercept is already in a flow, drop any redundant pre-action interstitial ("Before you switch...") — it captures the same intent with less friction. [L008]

## 7. Confirmations & destructive actions

- A destructive/delete action always requires a confirmation dialog first. CTA is verb + object ("Delete booking"), never bare "Delete". [L021]
- Financial subscription confirmations use exactly 4 rows — **Property, Amount, Billing, Commitment** — nothing more, nothing less. [L009]
- Never show a portfolio-ordinal ("Rental 21") in a confirmation dialog. Identify the entity by display name instead, or drop the row — ordinals are pricing-tier context, only meaningful in the pricing tooltip. [L010]

## 8. Navigation & IA

- Hierarchy, general → specific: **account → channel → rental → booking**. System-level features live in Settings; contextual processes live inside their own section (e.g. claim damage protection stays in Rentals, not Settings). [L023]
- Breadcrumbs and nav labels are nouns, sentence case, "and" not "&" — navigation elements navigate, they don't act.

## 9. Feedback

- Standalone post-action success snackbar sits top-center, `y=80px`, over content, without blocking navigation. [L011]
- With a sticky footer present (e.g. a form with a persistent action bar), the snackbar sits above that footer at the bottom instead. Auto-dismiss ~4s, always with a manual dismiss option. [L035]

## 10. Brand guardrails

- Primary gradient and solid teal are for actions and active states. Secondary pink is reserved for badges/highlights — never a large area.
- No new hex values, spacing values, radii, or shadows outside the token set in [CLAUDE.md](CLAUDE.md). If a value isn't in the token list, that's a design question to raise, not an implementation shortcut to take.
- When a component's Figma description flags a "known issue" (e.g. the filter button's outline→tonal transition, [L034]), implement it as documented — don't quietly "fix" it with a local workaround. That's a design decision for a redesign ticket, not an agent judgment call.

---

*Sources: [`bridge-ds/knowledge-base/learnings.json`](bridge-ds/knowledge-base/learnings.json) (L001–L040), [CLAUDE.md](CLAUDE.md) design tokens, Smily Figma DS (`flMGdSqr1NNqKGK5jp9QtH`). Regenerate/extend this file the same way `CLAUDE.md`'s Design Rules section is kept in sync — new learnings should get a line here too, not just in the JSON.*
