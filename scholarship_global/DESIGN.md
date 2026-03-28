# Design System Strategy: The Global Curator

## 1. Overview & Creative North Star
This design system is built upon the "Global Curator" North Star. For a scholarship platform, we must move beyond the "search engine" trope and toward a high-end editorial experience that feels authoritative yet accessible. 

The "Global Curator" aesthetic rejects the cluttered, ad-heavy layouts of traditional academic portals in favor of **Soft Minimalism**. We achieve this through "The Breathing Layout"—using intentional white space and asymmetrical compositions to guide the eye. Instead of rigid, boxed-in content, elements should feel like they are floating on a coordinated field of light, creating a sense of clarity and boundless opportunity.

## 2. Colors & Surface Philosophy
The palette is rooted in a professional Deep Indigo (`primary`) and a sophisticated Slate Gray (`on_surface_variant`), anchored by a multi-tonal white architecture.

### The "No-Line" Rule
To maintain a premium, modern feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through background color shifts or subtle tonal transitions. 
*   **Implementation:** Use `surface_container_low` for the main page background and `surface_container_lowest` (Pure White) for the primary content cards. This creates a "lift" without a single line being drawn.

### Surface Hierarchy & Nesting
Think of the UI as layers of fine stationery.
*   **Base:** `surface` (#f8f9ff)
*   **Lower Level:** `surface_container_low` for page-wide sectioning.
*   **Elevated Level:** `surface_container_lowest` (#ffffff) for the most important interactive elements (Cards, Inputs).
*   **High Level:** `surface_container_high` for contextual sidebars or "quick view" drawers.

### The "Glass & Gradient" Rule
To avoid a "flat" corporate look, use glassmorphism for floating navigation bars or sticky headers. 
*   **Recipe:** `surface_container_lowest` at 80% opacity + `backdrop-blur: 12px`.
*   **Signature Textures:** For high-impact CTAs, use a subtle linear gradient from `primary` (#5654a8) to `primary_dim` (#4a489b) at a 135-degree angle. This adds "soul" and depth to the action.

## 3. Typography: Editorial Authority
We utilize **Inter** as the primary typeface. Its geometric clarity ensures readability across all global languages.

*   **Display & Headlines:** Use `display-md` or `headline-lg` with a slightly tighter letter-spacing (-0.02em) to create an "editorial" impact.
*   **The Power of Scale:** Create drama by pairing a large `display-sm` header with a small, uppercase `label-md` "Kicker" (e.g., "FULL RIDE" in Deep Indigo above a scholarship name).
*   **Body Copy:** Use `body-lg` for primary descriptions. Set the line-height to 1.6 for maximum legibility, ensuring the "trustworthy" vibe is felt through the ease of reading.

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering** rather than structural shadows.

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` background. This creates a natural, soft separation.
*   **Ambient Shadows:** For "floating" states (e.g., a card on hover), use an extra-diffused shadow: `box-shadow: 0 12px 40px rgba(0, 51, 96, 0.06);`. The shadow color is a tint of `on_surface` (#003360), making it feel like a natural light interaction rather than a dark grey smudge.
*   **The "Ghost Border" Fallback:** If accessibility requires a border (e.g., in high-contrast modes), use `outline_variant` at **15% opacity**. Never use 100% opaque borders.

## 5. Components

### Cards (The "Scholarship Tile")
*   **Style:** No borders. Background: `surface_container_lowest`. Corner Radius: `lg` (1rem).
*   **Separation:** Use vertical white space (`spacing-8` or `spacing-10`) instead of divider lines.

### Buttons
*   **Primary:** Background: `primary` (#5654a8); Text: `on_primary`; Radius: `full`.
*   **Secondary:** Background: `secondary_container`; Text: `on_secondary_container`; Radius: `full`.
*   **Interaction:** On hover, shift the background to `primary_dim` and increase the ambient shadow.

### Input Fields
*   **Style:** Background: `surface_container_lowest`; Corner Radius: `DEFAULT` (0.5rem).
*   **State:** The active state should be indicated by a 2px `outline` (#4e7db7) rather than a fill change.

### Selection Chips
*   **Style:** For filtering regions (Europe, Asia, etc.), use `surface_variant` with `on_surface_variant` text.
*   **Active State:** Transition to `primary_container` with `on_primary_container` text.

### Scholarship Progress Tracker (Contextual Component)
*   **Style:** A horizontal bar using `surface_container_highest` as the track and a `primary` to `primary_fixed_dim` gradient as the fill. This provides a premium feel to the "Application Status."

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical padding (e.g., more space at the top of a section than the bottom) to create a dynamic, modern rhythm.
*   **Do** use `on_surface_variant` (#2f619a) for secondary text to maintain a soft, sophisticated contrast level.
*   **Do** lean into `surface_container_lowest` (pure white) for "Action Areas" to make them feel clean and approachable.

### Don't
*   **Don't** use 1px dividers. If you must separate content, use a 1px tall block of `surface_container_high` that doesn't span the full width of the container.
*   **Don't** use pure black (#000000). Always use `on_surface` or `on_background` for text.
*   **Don't** use sharp corners. Everything in this system must feel approachable; adhere strictly to the `roundedness-lg` (16px) for major cards and `roundedness-DEFAULT` (8px) for inputs.