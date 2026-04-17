# Ship Studio

> How professionals build with AI. No coding required.

## Brand Identity
- Personality: Professional, human-first, and simple to use.
- Colors:
  - Primary: `--accent` (`#FF5E00`)
  - Secondary accent: `--accent-secondary` (`#F7941D`)
  - Neutrals: `--background` (`#FAF3E8`), `--foreground` (`#0D0D0D`), `--muted` (`#999999`)
  - Functional: `--success` (`#10B981`), `--warning` (`#F59E0B`), `--error` (`#EF4444`)
- Fonts: `Alexandria` (display/headings) and `Plus Jakarta Sans` (body/UI text).

## Pages
- Homepage (`/`) - Welcome + getting started commands.

## Components
- `AgentationProvider` - included by the app layout.

## Recent Changes
- 2026-04-16: Added Figma MCP server to `.mcp.json` so the agent can connect to Figma.
- 2026-04-16: Added local Figma desktop MCP endpoint (`figma-desktop`) to `.mcp.json`.
- 2026-04-16: Implemented the Sandspire homepage from Figma (node `336-1207`) including hero/video, logo marquee, services bento, case studies, contact+FAQ, and footer.
- 2026-04-16: Filled in FAQ accordion answers so the FAQ section isn’t blank.
- 2026-04-16: Updated global style tokens to match the branding reference site (Sandspire color roles, typography, and radius primitives).
- 2026-04-16: Refined hero section to better match Figma (top glass nav bar, local video + fallback image, right-side hero text block, and 4-column service row).
- 2026-04-16: Updated logo scroll to use local files from `public/logos` instead of localhost MCP asset URLs.
- 2026-04-16: Updated hero copy styling to pure white and added continuous animated logo scrolling in the logo strip.
- 2026-04-16: Expanded hero top bar to full browser width while keeping nav content centered.
- 2026-04-16: Moved the section below the hero down so the full logo scroll strip stays visible.
- 2026-04-16: Rounded the bottom edges of the hero video area to match the curved screenshot treatment.
- 2026-04-16: Fixed hero corner clipping by moving the video/overlay layers inside the rounded container.
- 2026-04-16: Matched the “Who is Sandspire” block to the Figma two-column layout (1026px container, equal columns, larger description type).
- 2026-04-16: Added hero corner highlight/shadow overlays so the rounded bottom edge reads clearly on top of the video.
- 2026-04-16: Refined hero video rounding using a dedicated overflow-hidden wrapper (`rounded-b-[24px]`) and added top spacing before the logo ticker so corners stay visible.
- 2026-04-16: Increased hero bottom rounding (`rounded-b-[48px]`) and shifted hero/ticker background treatment to black for a darker, higher-contrast look.
- 2026-04-16: Reverted the latest logo marquee background styling to the previous gradient strip treatment.
- 2026-04-16: Hardened hero video clipping with `isolate` + `translateZ(0)` on the rounded wrapper, added `overflow-hidden` on the parent, and mirrored `rounded-b-[24px]` on the video as fallback.
- 2026-04-16: Increased hero rounding again to `rounded-b-[48px]` for a stronger curved bottom edge.
- 2026-04-16: Made the hero top navigation bar semi-transparent for better video visibility.
- 2026-04-16: Made the hero top menu sticky and set each homepage section to fill at least one browser screen height.
- 2026-04-16: Vertically centered the “Who is Sandspire” section content and increased hero video area to 70% of viewport height.
- 2026-04-16: Implemented the “What we do” section using local project assets/videos and refined the bento card proportions to match the intended design.
- 2026-04-16: Rebuilt the “What we do” bento to match the Figma frame structure (1014px heading width, 650/337 split, 347/350/718 card heights, and 29px spacing) with local media assets.
- 2026-04-16: Replaced the services block with a pixel-tight dark bento layout using DM Sans, exact card titles/pricing, rust-to-maroon gradients, chart rings, Instagram phone mockup, and responsive CSS Grid behavior.
- 2026-04-16: Added a standalone `public/scattered-tablet-mockups.html` demo with a diagonal cascading tablet fan effect (7 framed mockups, perspective tilt, layered shadows, and staggered hover animation).
- 2026-04-16: Ported the scattered tablet fan effect into the live Brand Strategy card in `ServicesBento` with perspective tilt, color-framed mockups, overlap depth, and staggered hover lift animation.
- 2026-04-16: Integrated a shadcn-style `ThreeDMarquee` UI component (`components/ui/3d-marquee.tsx`) plus demo route (`/3d-marquee-demo`), and added dependencies (`motion`, `clsx`, `tailwind-merge`) with shared `cn` helper at `lib/utils.ts`.
- 2026-04-16: Applied `ThreeDMarquee` to the live Brand Strategy card in the services section, using local `public/images/Frame*` assets for the marquee tiles.
- 2026-04-16: Fixed Brand Strategy visibility by adding a compact mode to `ThreeDMarquee` and enabling it in the card so the marquee stays in-frame in shorter containers.
- 2026-04-16: Reworked compact `ThreeDMarquee` mode into an in-frame diagonal stack renderer (color-framed overlapping tiles) so Brand Strategy images are reliably visible.
- 2026-04-16: Restored marquee behavior in compact Brand Strategy mode with continuous alternating vertical motion per tile while keeping the stack in-frame.
- 2026-04-16: Updated compact Brand Strategy mode to a traditional continuous marquee loop (duplicated tile track sliding linearly) while preserving diagonal perspective and framed-card styling.
- 2026-04-16: Removed compact marquee tile borders and changed the motion to a diagonal continuous scroll with individually tilted image tiles.
- 2026-04-16: Matched the Brand Strategy reference layout by switching compact mode to 3 horizontal marquee rows with framed thumbnails, where each row scrolls back-and-forth independently.
- 2026-04-16: Updated `ThreeDMarquee` compact tiles to image-only rendering (no extra frame wrapper/padding/background/border), adjusted tile size to `128x72`, and switched `ThreeDMarqueeDemo` to local imported image assets with `compact` enabled.
- 2026-04-16: Applied the same image-only compact marquee treatment to the live Brand Strategy card by removing the extra marquee container ring/background wrapper in `ServicesBento`.
- 2026-04-16: Rebuilt the next section (`CaseStudies`) to match the Figma row layout: 1016px content width, large 2-column rows (598/383 split), 3 project entries, local case images, and dark rounded "Read More" CTA buttons.
- 2026-04-16: Simplified `CaseStudies` visuals so each left panel now shows only the local image filling the full card area (removed extra overlays/inset framing).
- 2026-04-16: Matched `CaseStudies` styling closer to the latest reference with centered headline, softer card radius/border shadow, vertically-centered right content, and smaller dark pill “Read More” buttons with orange icon badges.
- 2026-04-16: Restyled `CaseStudies` to the latest cream editorial reference: isolated cream section panel, lighter headline weight, tighter compact row spacing, layered dual-screen image composites, dark text hierarchy, and compact dark CTA pills.
- 2026-04-16: Made the projects section full-width across the viewport (while keeping inner content constrained), and removed full-browser-height behavior from the “Who is Sandspire” section.
- 2026-04-16: Set CaseStudies project visuals to a fixed 2:3 height:width proportion (`aspect-[3/2]`), and made overlay screen sizing relative so the layered composition scales with that ratio.
- 2026-04-16: Removed the extra overlapping frame image from each CaseStudies project visual so only the main local project image is shown.
- 2026-04-16: Rebuilt Contact + FAQ to match the dark Figma container: left contact copy + social circles, right glass-style form card with pill inputs, centered FAQ heading, and 2-column rounded dark question rows with expandable answers.
- 2026-04-16: Rebuilt the footer to match the latest Figma block (`1277x417` container, `1014x235` inner layout): dark background, left brand/tagline/description/copyright stack, and right Menu + Social columns with orange titles and muted link text.
- 2026-04-16: Made the whole homepage feel generally smaller by reducing typography scale, spacing, card heights, section paddings, button sizes, and logo strip sizing across hero, services, projects, contact/FAQ, and footer.
- 2026-04-16: Matched the “Who is Sandspire?” title styling to the “What we do” section title (same display font, lighter weight, and heading scale).
- 2026-04-16: Replaced the bento frame visual in the services section with `Service Icon Group.svg` from local assets.
- 2026-04-16: Reduced the size of the new `Service Icon Group.svg` visual inside the services bento card so it appears more compact.
- 2026-04-16: Reduced the `Service Icon Group.svg` visual further and centered it in the Web Design bento card.
- 2026-04-16: Moved the centered `Service Icon Group.svg` visual lower in the Web Design card for better vertical placement.
- 2026-04-16: Applied layout feedback pass: added top spacing to services bento cards, lowered media content inside info cards, added smooth edge fade masks on the logo marquee strip, top-aligned case-study text with lighter titles, and reduced FAQ row height.
- 2026-04-16: Applied service-card content feedback: removed the services subtitle line under “What we do”, moved that copy into the top-left of the first card, removed the first card title/price label, and updated the remaining card labels/prices to match the latest review notes.
- 2026-04-16: Refined services bento again per review: removed the extra absolute overlay label, renamed the first visible info card title to “AI Automation”, increased top padding inside all service cards, and changed service card titles to medium weight.
- 2026-04-16: Reduced service card title font weight again in the bento section for a lighter look.

## How to Customize
- To change the site name/tagline: edit `app/layout.tsx` (`metadata.title` / `metadata.description`) and/or `app/page.tsx`.
- To enable more MCP integrations: edit `.mcp.json`.

