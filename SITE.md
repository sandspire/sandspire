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
- Work (`/work`) - Portfolio listing page with filters and project cards.
- Work Project (`/work/slrp`) - Detailed SLRP case-study page with intro, challenge/solution/result storytelling, image galleries, and contact/footer sections.

## Components
- `AgentationProvider` - included by the app layout.

## Recent Changes
- 2026-04-17: Updated `/work/slrp` result row so the left image now stretches to match the right image height (`h-full`) while preserving the current width split.
- 2026-04-17: Made the right image in the `/work/slrp` result row wider again by changing the column split from `0.38/0.62` to `0.3/0.7`.
- 2026-04-17: Increased the size of the two `/work/slrp` result images by expanding their row container max width from `560px` to `860px`.
- 2026-04-17: Fixed root hydration mismatch warning by adding `suppressHydrationWarning` to the `<html>` element in `app/layout.tsx`, preventing client-side attribute injection differences from triggering runtime overlay errors.
- 2026-04-17: Rebalanced the `/work/slrp` result image row to a wider right column (`0.38fr / 0.62fr`) so the right image takes more horizontal space while keeping the existing row height behavior and spacing.
- 2026-04-17: Increased the `/work/slrp` “SLRP result detail one” image height to match the left result image while keeping the same column width.
- 2026-04-17: Adjusted `/work/slrp` result image row sizing: reduced both result images to a smaller centered two-column block and added rounded corners to the “SLRP result detail one” image.
- 2026-04-17: Removed the `/work/slrp` result metric number/text block entirely and simplified the section to title + editorial paragraph + two equal-height result images (`slrpBento5` and `slrpBento4`).
- 2026-04-17: Updated `/work/slrp` visuals per latest QA: added left/right stroke on the portrait image, removed the metric card article wrappers in the result stats, and changed result row images to `slrpBento5` (hero) and `slrpBento4` (detail).
- 2026-04-17: Applied another `/work/slrp` image-role pass: swapped portrait/supporting placements in the asymmetrical grid, moved the portrait asset to result level 1, and removed rounded corners from the result image row wrappers.
- 2026-04-17: Applied `/work/slrp` polish updates: removed the top hero media drop shadow, switched the link glyph from a diagonal arrow to a short right arrow, removed rounding from the three result metric cards, and reassigned result/portrait image assets based on the latest content feedback.
- 2026-04-17: Updated `/work/slrp` content structure again per QA: swapped visual roles in the asymmetrical image grid (portrait now dominant, supporting image reduced), rebuilt “The result” into a two-column heading/text layout, removed the extra “result detail two” image, and kept the remaining result images side by side underneath.
- 2026-04-17: Redesigned `/work/slrp` case-study content into a cleaner editorial layout: light beige canvas, flat two-column challenge/solution typography, structured asymmetrical image grid, rebuilt centered results block, and removed the extra dark gallery section to reduce visual noise.
- 2026-04-17: Centered the top `/work/slrp` split project grid and removed negative side offsets so the block no longer leaves redundant right-side space.
- 2026-04-17: Updated `/work/slrp` hero intro per feedback: removed the standalone top title/description and external tag strip, then moved the project title and `Branding`/`Web Development` tags into the right project info panel.
- 2026-04-17: Tweaked `/work/slrp` top project frame again: made the media frame much smaller in the split layout, kept rounded top corners (including top-right), and increased the SLRP header image negative bottom margin for a tighter crop.
- 2026-04-17: Updated `/work/slrp` hero media to use `slrp_header.png` and increased the image negative bottom margin for a tighter flush fit in the top project card.
- 2026-04-17: Applied `/work/slrp` spacing cleanup from QA: removed the right intro info panel border, removed bottom padding in the first bordered section, removed bottom padding from the left intro media card, and added negative bottom margin to the main SLRP image for a flush edge.
- 2026-04-17: Corrected both `/work` wrapper closing tags together (header inner `</div>` and first content `</section>`) to fully resolve the repeated parse errors around lines 91 and 122.
- 2026-04-17: Fixed another JSX mismatch in `/work` by changing the closing tag after the category pills from `</div>` to `</section>`, resolving the line-122 parse error.
- 2026-04-17: Fixed a second JSX closing-tag mismatch in `/work` header markup (`</section>` corrected to `</div>`) to resolve another parse-time build error.
- 2026-04-17: Fixed a JSX structure bug on `/work` (mismatched closing tag in the intro section) that was causing a build parsing error.
- 2026-04-17: Restored the previous `/work` portfolio listing page and moved the long case-study layout to `/work/slrp`, then wired “View Project” links from the listing to open the detail page.
- 2026-04-17: Applied another `/work` cleanup pass from visual QA: made the top frame hug only the sticky top bar (removed the extra 519px header height), removed bottom padding under the first bordered section, removed the dark background fill from the right intro info card, and removed bottom corner rounding on the intro image/card.
- 2026-04-17: Applied `/work` feedback pass: removed the decorative top pattern image layer, made the top sticky nav span full viewport width, made the intro project split flush to the container edges, and removed bottom corner rounding on the two intro cards.
- 2026-04-17: Updated `/work` so image containers now hug the natural image dimensions (removed fixed card image heights), and rebuilt the top header block to match the 519px dark Figma frame style with a subtle rotated dot-pattern background treatment.
- 2026-04-17: Rebuilt the `/work` page to match the new Figma direction for SLRP (dark intro with project details and visit button, cream challenge/solution/result storytelling block, updated local project image paths, and supporting gallery tiles before contact/footer).
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
- 2026-04-16: Added a new `/work` page inspired by the provided Figma frame (top nav, centered page intro, category bar, 2-column project showcase cards, and existing contact/footer sections), and linked the homepage top-bar “Work” item to `/work`.

## How to Customize
- To change the site name/tagline: edit `app/layout.tsx` (`metadata.title` / `metadata.description`) and/or `app/page.tsx`.
- To enable more MCP integrations: edit `.mcp.json`.

