import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sandspire — Brand Strategy",
  description:
    "Internal brand strategy: Sandspire as a social-media content studio for hospitality and lifestyle brands.",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const TOC = [
  { id: "pivot", n: "01", label: "The pivot" },
  { id: "pitch", n: "02", label: "One-line pitch" },
  { id: "positioning", n: "03", label: "Positioning" },
  { id: "services", n: "04", label: "What we do" },
  { id: "audience", n: "05", label: "Who it's for" },
  { id: "proof", n: "06", label: "Proof" },
  { id: "expression", n: "07", label: "Brand expression" },
  { id: "homepage", n: "08", label: "Homepage direction" },
  { id: "fix", n: "09", label: "What to fix" },
  { id: "needs", n: "10", label: "What we need" },
];

const PRIMARY_SERVICES = [
  {
    title: "Reels & short-form video",
    role: "Flagship",
    body: "Shooting and editing scroll-stopping reels — the product Sandspire leads with.",
  },
  {
    title: "Brand & food photography",
    role: "Core",
    body: "Photos that make a place look as good online as it does in person.",
  },
  {
    title: "Social media management",
    role: "Core",
    body: "Plan, shoot, post, reply, report — the feed stays consistent without your team running it.",
  },
  {
    title: "UGC & creator content",
    role: "Core",
    body: "Real faces, real reach — content that looks native to the feed, not like an ad.",
  },
];

const SECONDARY_SERVICES = [
  {
    title: "Web design & development",
    body: "We can also build the site — supporting, not the headline.",
  },
  {
    title: "AI-assisted production",
    body: "More posts a week from a small team — efficiency, framed as a benefit.",
  },
];

const PROOF_BRANDS = [
  { name: "3 Fils", note: "Award-winning Asian restaurant", tag: "Anchor client" },
  { name: "Brix Journey", note: "Premium dining brand", tag: "Hospitality" },
  { name: "Brix Cafe", note: "Dessert-led neighbourhood café", tag: "Café" },
  { name: "Slrp Ramen", note: "Tokyo-street-energy ramen", tag: "Restaurant" },
  { name: "Bordo Mavi", note: "Mediterranean restaurant", tag: "Restaurant" },
];

const HOMEPAGE_STEPS = [
  {
    label: "Hero headline",
    body: "One promise — reels and social content that make hospitality brands worth following. Lead with motion, not a website.",
  },
  {
    label: "Hero subheadline",
    body: "Name the medium (reels + photos), the audience (restaurants & lifestyle brands), and the relief (a consistent feed, no in-house team).",
  },
  {
    label: "Hero visual",
    body: "A reel playing — show the product the instant the page loads. No website mockups up top.",
  },
  {
    label: "Primary CTA",
    body: "“Start a project” → contact. Keep it; already on-brand.",
  },
  {
    label: "Secondary CTA",
    body: "“Watch the reels” → the work, routed to social content.",
  },
  {
    label: "Service order",
    body: "Reels → Photography → Social management & UGC → then, secondary, Web & AI.",
  },
  {
    label: "Proof wall",
    body: "A grid of reels from the five brands — with view counts and a client quote each. Replace website screenshots.",
  },
  {
    label: "Final conversion",
    body: "Warm contact + the social-focused FAQ (content vs. posting, what UGC is, results timeline).",
  },
];

const FIX_ITEMS = [
  "The main homepage still sells “Web & AI” — the opposite of the new story. Promote the social homepage to the front door.",
  "Two homepages compete for one brand. Consolidate to a single, social-first homepage.",
  "Proof is shown as website screenshots and phone mockups — the pitch is now reels and photos. Re-surface the work as video and imagery.",
  "Work is mis-tagged “Branding / Web Development.” Re-tag toward social content.",
  "No testimonials and no view/engagement numbers — a social studio needs social proof.",
  "Social links route to “coming soon.” A social studio must link live, active accounts.",
  "Photography isn't named as an offer despite being half the focus.",
];

const NEEDS = [
  { item: "The actual reels & photo galleries for the five brands", priority: "Critical" },
  { item: "Per-brand results — views, reach, follower growth, engagement", priority: "Critical" },
  { item: "Testimonials from those brands", priority: "High" },
  { item: "Social retainer packages & pricing", priority: "High" },
  { item: "Live social handles to link (3.fils, eatkanji, slrp.ramen, …)", priority: "High" },
  { item: "Scope of the photography offer (food only, or product/interiors too)", priority: "Medium" },
  { item: "Who's behind the camera — founder / team story", priority: "Medium" },
  { item: "How hard to demote web/AI (own page vs. one mention)", priority: "Medium" },
];

/* ---- Part II: market research --------------------------------------- */

const RESEARCH_TOC = [
  { id: "part-2", n: "II", label: "Market research" },
  { id: "r-validation", n: "R1", label: "Is the bet right?" },
  { id: "r-problem", n: "R2", label: "The real problem" },
  { id: "r-evidence", n: "R3", label: "Evidence" },
  { id: "r-pains", n: "R4", label: "Customer pains" },
  { id: "r-competitors", n: "R5", label: "Competitor landscape" },
  { id: "r-pricing", n: "R6", label: "Pricing reality" },
  { id: "r-proof", n: "R7", label: "Keep / drop / add" },
  { id: "r-implications", n: "R8", label: "What it means" },
];

const VALIDATION = [
  {
    stat: "#1",
    label: "Highest-ROI format",
    body: "Marketers rank short-form video the top format for ROI and plan to invest in it most for 2025.",
    src: "HubSpot 2025",
    href: "https://blog.hubspot.com/marketing/short-form-video-trends",
  },
  {
    stat: "45%",
    label: "of Gen Z",
    body: "are influenced by social when trying new food; ~2 in 5 “search nearby when hungry.” (survey, n=1,001, ±3pp)",
    src: "Morning Consult 2025",
    href: "https://intel.morningconsult.com/mc-content/analysis/gen-z-social-media-restaurants-recipes",
  },
  {
    stat: "The gap",
    label: "Consistency",
    body: "Restaurants post “when they remember.” The least-hyped, best-supported wedge in the category — and almost no one owns it.",
    src: "Tablein · Craver",
    href: "https://www.tablein.com/blog/restaurant-social-media-marketing-mistakes",
  },
];

const EVIDENCE = [
  {
    title: "“Followers don't fill tables”",
    body: "Owners openly distrust follower counts. The single most repeated restaurant sentiment found.",
    quote: "the followers in the city can't translate to a[n] expected conversion",
    src: "r/restaurantowners",
    href: "https://www.reddit.com/r/restaurantowners/comments/1bdb5zu/marketing_ideas_that_have_worked/",
  },
  {
    title: "Consistency is the real failure mode",
    body: "Restaurants post sporadically under kitchen pressure; algorithms punish it. Outsourcing's core value is professional consistency.",
    quote: "post when they remember",
    src: "Tablein · Craver",
    href: "https://www.getcraver.com/blog/social-media-marketing-for-restaurants/",
  },
  {
    title: "“Great pitch, generic delivery”",
    body: "Named agency red flags: vanity-metric reporting and “guaranteed results.” Buyers distrust polish; they want brand-specific work.",
    quote: "guaranteed results… vague promises",
    src: "r/marketing — red flags",
    href: "https://www.reddit.com/r/marketing/comments/kvzfye/digital_agency_red_flags/",
  },
  {
    title: "Retainer & price-for-effort distrust",
    body: "“$120/h… 5 hours/month… ~$700/month” sticker shock, and constant pre-purchase pricing anxiety.",
    quote: "how much is too much or reasonable",
    src: "r/restaurantowners",
    href: "https://www.reddit.com/r/restaurantowners/comments/12j2wwy/how_much_do_you_pay_for_marketing/",
  },
];

const PAINS = [
  { pain: "Followers/views don't convert to tables", freq: "Very high", emotion: "Cynicism", opp: "Frame proof as content → bookings, never reach alone" },
  { pain: "Can't post consistently (kitchen eats the time)", freq: "High", emotion: "Overwhelm", opp: "Own “consistency, handled” — a month from one shoot day" },
  { pain: "Retainers that bill for vague work", freq: "High", emotion: "Distrust", opp: "Transparent, deliverable-based packages" },
  { pain: "“Great pitch, generic delivery”", freq: "High", emotion: "Skepticism", opp: "Show real client reels; offer approval + no lock-in" },
  { pain: "Pricing anxiety / “am I overpaying?”", freq: "High", emotion: "Insecurity", opp: "Show some pricing — most rivals hide it" },
  { pain: "Too many lookalike agencies", freq: "High", emotion: "Confusion", opp: "Clear, jargon-free “how we work”" },
];

const ANGLES = [
  {
    name: "“F&B specialist”",
    who: "Upscale · Dubai Prod · Social Trends · Donut",
    weak: "So universal in Dubai it's table stakes — everyone blurs together.",
    opp: "Go sharper: the reels/photo content studio within F&B, not another full-service agency.",
  },
  {
    name: "“Fill tables / drive revenue”",
    who: "Dubai Prod · Upscale · Black Swan · LYFE",
    weak: "Metrics are unattributed — numbers with no named venue, no visible reel.",
    opp: "Same outcome framing, but verifiable: real reel + real venue + real number.",
  },
  {
    name: "“Premium creative / craft”",
    who: "Black Swan · Food On Focus · Social Trends",
    weak: "Adjective-heavy (“scroll-stopping” on 4+ sites); hides the business outcome.",
    opp: "Own craft AND outcome — beautiful reels with the result they drove.",
  },
];

const COMPETITORS = [
  { name: "Upscale Media", href: "https://upscalemedia.ae/", hero: "“Scale Your Restaurant”", proof: "40+ named clients, 5.0 Google", angle: "F&B-exclusive", gap: "Numbers not tied to a reel" },
  { name: "Dubai Prod", href: "https://www.dubaiprod.com/restaurant-marketing-dubai", hero: "“Fill Every Table. Every Night.”", proof: "“3K→48K in 5 months”", angle: "Outcome / ROI", gap: "Metrics unattributed" },
  { name: "Black Swan", href: "https://blackswanmedia.me/f-b-video-production-company-uae-restaurants/", hero: "“F&B Video Production”", proof: "One generic stat", angle: "Premium craft", gap: "No named clients" },
  { name: "Social Trends ME", href: "https://socialtrendsme.com/restaurant-social-media-marketing/", hero: "“Hospitality Specialists”", proof: "None visible", angle: "Passion / craft", gap: "Zero proof on page" },
  { name: "Powered by Donut", href: "https://www.poweredbydonut.com/", hero: "“Experts… we don't like to say that”", proof: "Named clients, 2023 award", angle: "Anti-hype, human", gap: "No per-client numbers" },
  { name: "Food On Focus", href: "https://foodonfocus.com/", hero: "“Creative Excellence”", proof: "Godiva, Guinness + testimonials", angle: "Photography-first", gap: "No result numbers" },
];

const PRICING = [
  { label: "Social management retainer", value: "AED 5–15k / mo", note: "Agency tier. Below AED 3k reads as freelancer." },
  { label: "Reels (standalone)", value: "AED 1.5–7k each", note: "One shoot day → 5–10 assets is the margin lever." },
  { label: "Commercial food photography", value: "from AED 2,500", note: "Bundles into the same shoot day." },
];

const PROOF_KEEP = [
  "Named UAE F&B portfolio (5 brands) — the rare “names AND craft” currency",
  "3 Fils award-winning anchor client",
  "Reels as the core service (HubSpot + Morning Consult back the format)",
  "A clear “plan, shoot, post, report” process",
];

const PROOF_DROP = [
  "AI Automation as a priced headline — no proof, no buyer demand",
  "Web-design-led pricing anchors — wrong category for the buyer",
  "“Scroll-stopping” / sensory clichés — already on 4+ rival sites",
  "Unattributed “200% growth”-style stats — the pattern buyers distrust",
];

const PROOF_ADD = [
  "Attributed case study: real reel + named venue + real view count",
  "“A month of content in one shoot day” batch promise",
  "Consistency you can count on (the unclaimed wedge)",
  "Transparent, deliverable-based packages",
  "UAE-local virality — reach that walks people through the door",
];

const IMPLICATIONS = [
  { area: "Hero", body: "Lead with consistency + craft, restaurant-specific, a reel playing — not “Web & AI,” not “scroll-stopping.”" },
  { area: "Services", body: "Reels → Photography → Social/UGC primary; web + AI a quiet “we can also.” Package as shoot-day → month-of-content." },
  { area: "Proof", body: "A reel proof-wall: each brand with a view count + one-line result + quote. Preempt red flags (approval, no lock-in)." },
  { area: "CTA", body: "Keep WhatsApp; add a substance offer — “Send your venue, we'll send 3 reel ideas we'd shoot first.”" },
];

const DIAGNOSIS_R = [
  { k: "The market is saying", v: "Short-form video is the highest-ROI format and how young UAE diners find restaurants — the reels-first bet is validated." },
  { k: "Competitors mostly promise", v: "“F&B specialist” + “fill your tables” + big self-reported numbers — a crowded, low-trust, look-alike sea." },
  { k: "Customers are still frustrated by", v: "Followers that don't become tables, vague retainers, beautiful pitches that ship templated work, and not knowing who to trust." },
  { k: "Sandspire should own", v: "Consistency + verifiable, attributed proof (name + reel + number) + the shoot-day → month-of-content promise." },
  { k: "Biggest risk", v: "Sounding like everyone else and over-promising — plus the unproven AI headline." },
  { k: "Biggest opportunity", v: "Be the craft-AND-outcome studio, backed by the first real UAE F&B reel case studies — proof that doesn't exist in this market yet." },
];

/* ---- Part III: locked brand definition ------------------------------ */

const LOCK_TOC = [
  { id: "part-3", n: "III", label: "Brand lock" },
  { id: "l-positioning", n: "L1", label: "Name & positioning" },
  { id: "l-taglines", n: "L2", label: "Taglines & line" },
  { id: "l-voice", n: "L3", label: "Voice rules" },
  { id: "l-palette", n: "L4", label: "Colour palette" },
  { id: "l-type", n: "L5", label: "Typography" },
  { id: "l-themes", n: "L6", label: "12-week themes" },
];

const TAGLINES = [
  {
    kind: "Primary · functional",
    line: "Reels and photos for restaurants, every week.",
    why: "Says what we do, for whom, and the rhythm (consistency) in 7 words. Reads cleanly in a hero; replaces the web-led “Web & AI.”",
  },
  {
    kind: "Secondary · emotional",
    line: "Look as good online as you do in person.",
    why: "Names the exact gap owners feel — the room's energy never reaching the feed. Human, no luxury fluff; complements the functional line.",
  },
];

const COMMUNITY = {
  line: "Make them hungry.",
  type: "Rallying phrase / brand belief",
  why: "Food-native and dual-meaning — hungry for the dish and to visit. A verb, on the client's side, in the quietly-witty house voice. Works as a sign-off, a caption stamp, and an internal north star.",
};

const VOICE_USE = [
  "“You” more than “we”",
  "Contractions — we'll, you're",
  "Specifics: name the venue, the number, the timeframe",
  "UK/UAE spelling where natural (favourite, colour)",
  "Em dashes and the occasional fragment",
  "Sentence case everywhere but proper nouns",
];

const VOICE_AVOID = [
  "revolutionize, leverage, seamless, elevate, transform",
  "best-in-class, next-generation, holistic, bespoke, curated",
  "“scroll-stopping” / “drool-worthy” (category clichés)",
  "Unattributed hype stats (“200% growth”)",
  "ALL-CAPS hype, stacked exclamation marks",
];

const VOICE_MECH = [
  { k: "Headlines", v: "2–7 words, one promise" },
  { k: "Body", v: "1–3 sentences, active voice" },
  { k: "Punctuation", v: "One “!” max, only when genuine" },
  { k: "Reading level", v: "Grade 6–8 — say it out loud" },
];

const PALETTE = [
  { role: "Primary", hex: "#FF5E00", usage: "Identity, CTAs, accents, focus rings", note: "--accent (globals.css)", light: false },
  { role: "Secondary", hex: "#F7941D", usage: "Supporting accent, gradients", note: "--accent-secondary", light: false },
  { role: "Tertiary background", hex: "#FAF3E8", usage: "Section canvas, light pages", note: "Cream used sitewide", light: true },
  { role: "Dark typography accent", hex: "#0D0D0D", usage: "Body text, dark sections", note: "Brand ink (foreground)", light: false },
  { role: "Single metallic", hex: "#C2913F", usage: "Premium detail, badges (sparingly)", note: "New — warm brass", light: false, tag: "Strategic" },
  { role: "Contrast", hex: "#A31F11", usage: "Campaign moments, active states", note: "Deep rust, from services gradient", light: false },
];

const TYPESCALE = [
  { level: "Wordmark", font: "Plus Jakarta Sans", weight: "700–800", usage: "Logo lockup, nav", note: "Bold body font" },
  { level: "Display", font: "Geist", weight: "500–600", usage: "Hero & section headlines", note: "In repo (--font-display)" },
  { level: "Headline", font: "Geist", weight: "600", usage: "Sub-section & card titles", note: "Consistent with display" },
  { level: "Body", font: "Plus Jakarta Sans", weight: "400", usage: "All running copy, FAQs", note: "Default on <body>" },
  { level: "Caption", font: "Plus Jakarta Sans", weight: "500", usage: "Eyebrows, tags, metadata", note: "Medium + tracking" },
];

const THEMES = [
  { wk: 1, name: "Empty Tables, Full Kitchen", purpose: "Awareness — name the pain", visual: "Quiet room at golden hour vs. a packed pass; cream + ink, one orange accent" },
  { wk: 2, name: "Views Aren't Covers", purpose: "Educate — reframe vanity metrics", visual: "Big view count beside an empty two-top; deadpan caption energy" },
  { wk: 3, name: "The Consistency Problem", purpose: "Educate — why sporadic posting fails", visual: "Scattered calendar filling into a steady weekly rhythm; orange ticks" },
  { wk: 4, name: "One Day, One Month", purpose: "Differentiate — the batch shoot model", visual: "One shoot day fanning out into a month grid of reels" },
  { wk: 5, name: "Shot On Location", purpose: "Trust — we show up and shoot", visual: "Real crew in real kitchens; handheld, warm, brass-frame stills" },
  { wk: 6, name: "Meet The Studio", purpose: "Trust — a face to the work", visual: "Founder/team portraits in venue settings; Geist headlines" },
  { wk: 7, name: "Anatomy Of A Reel", purpose: "Educate + show craft", visual: "Annotated reel: hook, dish reveal, geotag; rust labels on frames" },
  { wk: 8, name: "Real Reels, Real Venues", purpose: "Proof — the five named brands", visual: "Reel proof-wall with view counts (3 Fils, Brix, Slrp, Bordo Mavi)" },
  { wk: 9, name: "Numbers That Matter", purpose: "Proof — attributed, honest results", visual: "Clean data cards tying a named reel to a booking line" },
  { wk: 10, name: "Reach That Walks In", purpose: "Differentiate — UAE-local virality", visual: "Dubai geotags turning into people at the door; orange route lines" },
  { wk: 11, name: "Send Your Venue", purpose: "Convert — the substance offer", visual: "“3 reel ideas we'd shoot first” mockup; cream CTA, orange button" },
  { wk: 12, name: "The Sandspire Table", purpose: "Community / retention", visual: "Client logos plated like a menu; “Make them hungry.” sign-off" },
];

const DIAGNOSIS_LOCK = [
  { k: "Stands for", v: "The reels-and-photography studio that keeps UAE restaurants' feeds consistently full of content worth watching — tied to real bookings, not vanity metrics." },
  { k: "Stop saying", v: "“Web & AI” as the headline, AI Automation as a priced flagship, web-led pricing, and the clichés “scroll-stopping / drool-worthy” + unattributed “200% growth.”" },
  { k: "Own in the market", v: "Named client + real reel + real number, “a month of content in one shoot day,” and provable consistency — the combination no UAE rival executes." },
  { k: "Visual direction", v: "Warm editorial: cream + ink canvas, signature orange, brass for premium detail, Geist over Plus Jakarta — and real reels as the hero medium, not website mockups." },
  { k: "Next step", v: "Gather the proof: Sandspire's own reels with real view counts + a result line + quote for the five brands. Confirm package pricing, social handles, and founder story." },
];

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                        */
/* ------------------------------------------------------------------ */

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-b border-[#0d0d0d]/12 pb-4">
      <span className="font-[family-name:var(--font-body)] text-[13px] font-semibold tracking-[0.18em] text-[#ff5e00]">
        {n}
      </span>
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.01em] text-[#0d0d0d]">
        {title}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function BrandStrategyPage() {
  return (
    <div className="ss-strategy relative min-h-screen overflow-hidden bg-[#faf3e8] text-[#0d0d0d] selection:bg-[#ff5e00] selection:text-[#faf3e8]">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.6]"
        style={{
          background:
            "radial-gradient(60rem 60rem at 85% -10%, rgba(255,94,0,0.14), transparent 60%), radial-gradient(50rem 50rem at -10% 110%, rgba(247,148,29,0.12), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 mix-blend-multiply opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Top bar */}
      <header className="relative z-20 mx-auto flex max-w-[1240px] items-center justify-between px-6 py-6 lg:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-body)] text-[15px] font-bold tracking-[-0.02em] text-[#0d0d0d] transition-opacity hover:opacity-60"
        >
          Sandspire
        </Link>
        <span className="rounded-full border border-[#0d0d0d]/15 px-3 py-1 font-[family-name:var(--font-body)] text-[11px] font-semibold tracking-[0.14em] text-[#0d0d0d]/60">
          INTERNAL · STRATEGY · RESEARCH · BRAND LOCK
        </span>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-6 pb-20 pt-10 lg:px-10 lg:pb-28 lg:pt-16">
        <p className="reveal font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.22em] text-[#ff5e00]">
          Brand strategy
        </p>
        <h1 className="reveal mt-6 max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(2.6rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          A social-media content studio.
        </h1>
        <p className="reveal mt-7 max-w-[60ch] font-[family-name:var(--font-body)] text-[clamp(1.05rem,2vw,1.4rem)] font-normal leading-[1.5] text-[#0d0d0d]/75">
          Sandspire shoots the{" "}
          <em className="font-[family-name:var(--font-body)] text-[#ff5e00] not-italic">
            reels and photos
          </em>{" "}
          that make hospitality and lifestyle brands worth following — and runs
          the feeds so they don&apos;t have to.
        </p>

        <div className="reveal mt-10 flex flex-wrap gap-x-10 gap-y-4 font-[family-name:var(--font-body)] text-[13px] font-medium text-[#0d0d0d]/55">
          <span>
            <span className="text-[#0d0d0d]">Focus</span> · Social content first
          </span>
          <span>
            <span className="text-[#0d0d0d]">Niche</span> · UAE hospitality &amp; F&amp;B
          </span>
          <span>
            <span className="text-[#0d0d0d]">Secondary</span> · Web &amp; AI
          </span>
        </div>
      </section>

      {/* MAIN GRID: sticky TOC + content */}
      <div className="relative z-10 mx-auto grid max-w-[1240px] gap-12 px-6 pb-32 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16 lg:px-10">
        {/* TOC */}
        <aside className="hidden lg:block">
          <nav className="sticky top-10">
            <p className="mb-4 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0d0d0d]/40">
              Contents
            </p>
            <ul className="space-y-2.5">
              {TOC.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="group flex items-baseline gap-3 font-[family-name:var(--font-body)] text-[14px] text-[#0d0d0d]/65 transition-colors hover:text-[#ff5e00]"
                  >
                    <span className="text-[11px] font-semibold tabular-nums text-[#0d0d0d]/35 group-hover:text-[#ff5e00]">
                      {t.n}
                    </span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mb-4 mt-8 border-t border-[#0d0d0d]/12 pt-6 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff5e00]">
              Part II · Research
            </p>
            <ul className="space-y-2.5">
              {RESEARCH_TOC.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="group flex items-baseline gap-3 font-[family-name:var(--font-body)] text-[14px] text-[#0d0d0d]/65 transition-colors hover:text-[#ff5e00]"
                  >
                    <span className="text-[11px] font-semibold tabular-nums text-[#0d0d0d]/35 group-hover:text-[#ff5e00]">
                      {t.n}
                    </span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mb-4 mt-8 border-t border-[#0d0d0d]/12 pt-6 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff5e00]">
              Part III · Brand lock
            </p>
            <ul className="space-y-2.5">
              {LOCK_TOC.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="group flex items-baseline gap-3 font-[family-name:var(--font-body)] text-[14px] text-[#0d0d0d]/65 transition-colors hover:text-[#ff5e00]"
                  >
                    <span className="text-[11px] font-semibold tabular-nums text-[#0d0d0d]/35 group-hover:text-[#ff5e00]">
                      {t.n}
                    </span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* CONTENT */}
        <main className="min-w-0 space-y-24">
          {/* 01 — PIVOT */}
          <section id="pivot" className="scroll-mt-10">
            <SectionLabel n="01" title="The pivot, at a glance" />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[20px] border border-[#0d0d0d]/12 bg-white/40 p-7">
                <p className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0d0d0d]/40">
                  Moving from
                </p>
                <ul className="mt-4 space-y-3 font-[family-name:var(--font-body)] text-[15px] leading-[1.5] text-[#0d0d0d]/70">
                  <li>“Web &amp; AI” creative agency</li>
                  <li>Two competing homepages</li>
                  <li>~10 services, no clear lead</li>
                  <li>Proof shown as websites</li>
                </ul>
              </div>
              <div className="rounded-[20px] border border-[#ff5e00]/30 bg-[#ff5e00]/[0.06] p-7">
                <p className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.16em] text-[#ff5e00]">
                  Moving to
                </p>
                <ul className="mt-4 space-y-3 font-[family-name:var(--font-body)] text-[15px] font-medium leading-[1.5] text-[#0d0d0d]">
                  <li>Social-media content studio</li>
                  <li>One social-first homepage</li>
                  <li>Reels &amp; photos lead, web/AI support</li>
                  <li>Proof shown as reels &amp; content</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 02 — PITCH */}
          <section id="pitch" className="scroll-mt-10">
            <SectionLabel n="02" title="One-line pitch" />
            <blockquote className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.4vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.01em] text-[#0d0d0d]">
              <span className="text-[#ff5e00]">“</span>Sandspire is a UAE
              social-media content studio — we shoot the reels and photos that
              make hospitality and lifestyle brands worth following, and we run
              the feeds so you don&apos;t have to.<span className="text-[#ff5e00]">”</span>
            </blockquote>
          </section>

          {/* 03 — POSITIONING */}
          <section id="positioning" className="scroll-mt-10">
            <SectionLabel n="03" title="Strategic positioning" />
            <div className="rounded-[24px] bg-[#0d0d0d] p-8 text-[#faf3e8] lg:p-12">
              <p className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#ff7a3d]">
                The positioning statement
              </p>
              <p className="mt-6 font-[family-name:var(--font-display)] text-[clamp(1.3rem,2.8vw,2rem)] font-normal leading-[1.35]">
                We position{" "}
                <span className="text-[#ff7a3d]">Sandspire</span> as the{" "}
                <span className="underline decoration-[#ff5e00] decoration-2 underline-offset-[6px]">
                  social-media content studio
                </span>{" "}
                for{" "}
                <span className="text-[#ff7a3d]">UAE hospitality &amp; lifestyle brands</span>{" "}
                who want{" "}
                <span className="text-[#ff7a3d]">scroll-stopping reels and photography</span>{" "}
                — and a feed that stays consistent — without{" "}
                <span className="text-[#ff7a3d]">hiring an in-house content team</span>.
              </p>
            </div>
          </section>

          {/* 04 — SERVICES */}
          <section id="services" className="scroll-mt-10">
            <SectionLabel n="04" title="What we do" />
            <p className="mb-7 font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.16em] text-[#ff5e00]">
              Primary — what we lead with
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {PRIMARY_SERVICES.map((s) => (
                <div
                  key={s.title}
                  className="rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6 transition-colors hover:border-[#ff5e00]/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-[family-name:var(--font-body)] text-[18px] font-semibold tracking-[-0.01em]">
                      {s.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-[#ff5e00]/12 px-2.5 py-0.5 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#ff5e00]">
                      {s.role}
                    </span>
                  </div>
                  <p className="mt-3 font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[#0d0d0d]/65">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="mb-6 mt-12 font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0d0d0d]/45">
              Secondary — “we can also handle”
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {SECONDARY_SERVICES.map((s) => (
                <div
                  key={s.title}
                  className="rounded-[18px] border border-dashed border-[#0d0d0d]/18 bg-transparent p-6"
                >
                  <h3 className="font-[family-name:var(--font-body)] text-[17px] font-semibold tracking-[-0.01em] text-[#0d0d0d]/80">
                    {s.title}
                  </h3>
                  <p className="mt-3 font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[#0d0d0d]/55">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 05 — AUDIENCE */}
          <section id="audience" className="scroll-mt-10">
            <SectionLabel n="05" title="Who it's for" />
            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <p className="font-[family-name:var(--font-body)] text-[clamp(1.1rem,2vw,1.35rem)] font-normal leading-[1.5] text-[#0d0d0d]/80">
                Restaurant owners, F&amp;B marketing managers, and hospitality
                founders who need a steady stream of reels and photos — and
                don&apos;t want to hire a videographer, an editor, and a social
                manager separately.
              </p>
              <div className="rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6">
                <p className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0d0d0d]/40">
                  The problem we solve
                </p>
                <p className="mt-3 font-[family-name:var(--font-body)] text-[15px] leading-[1.55] text-[#0d0d0d]/75">
                  Hospitality brands look great in person but flat online. The
                  energy of the place never makes it to the feed, posting is
                  inconsistent, and an in-house team is expensive. Sandspire is
                  the outsourced content engine that keeps it coming.
                </p>
              </div>
            </div>
          </section>

          {/* 06 — PROOF */}
          <section id="proof" className="scroll-mt-10">
            <SectionLabel n="06" title="Proof — social content for five brands" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROOF_BRANDS.map((b) => (
                <div
                  key={b.name}
                  className="group relative overflow-hidden rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6"
                >
                  <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#ff5e00]">
                    {b.tag}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-[26px] font-medium leading-tight">
                    {b.name}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-body)] text-[14px] leading-[1.5] text-[#0d0d0d]/60">
                    {b.note}
                  </p>
                </div>
              ))}
              <div className="flex flex-col justify-center rounded-[18px] border border-dashed border-[#ff5e00]/40 bg-[#ff5e00]/[0.05] p-6">
                <p className="font-[family-name:var(--font-body)] text-[13px] font-semibold leading-[1.5] text-[#ff5e00]">
                  Needs assets
                </p>
                <p className="mt-2 font-[family-name:var(--font-body)] text-[13px] leading-[1.5] text-[#0d0d0d]/65">
                  Swap website screenshots for the actual reels + view counts.
                  This is what makes the social pitch believable.
                </p>
              </div>
            </div>
          </section>

          {/* 07 — EXPRESSION */}
          <section id="expression" className="scroll-mt-10">
            <SectionLabel n="07" title="Brand expression" />
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Colour */}
              <div className="rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6">
                <h3 className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0d0d0d]/40">
                  Colour — unchanged
                </h3>
                <div className="mt-4 flex gap-3">
                  {[
                    { c: "#FF5E00", n: "Accent" },
                    { c: "#F7941D", n: "Secondary" },
                    { c: "#FAF3E8", n: "Canvas" },
                    { c: "#0D0D0D", n: "Ink" },
                  ].map((sw) => (
                    <div key={sw.c} className="flex-1">
                      <div
                        className="h-14 w-full rounded-lg border border-[#0d0d0d]/10"
                        style={{ background: sw.c }}
                      />
                      <p className="mt-2 font-[family-name:var(--font-body)] text-[11px] font-medium text-[#0d0d0d]/55">
                        {sw.n}
                      </p>
                      <p className="font-[family-name:var(--font-body)] text-[10px] tabular-nums text-[#0d0d0d]/35">
                        {sw.c}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 font-[family-name:var(--font-body)] text-[13px] leading-[1.5] text-[#0d0d0d]/60">
                  Warm and appetite-friendly — works better for a food-content
                  studio than for a web agency. Keep it.
                </p>
              </div>

              {/* Type + Mood */}
              <div className="space-y-4">
                <div className="rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6">
                  <h3 className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0d0d0d]/40">
                    Typography
                  </h3>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-[28px] leading-none">
                    Geist for headlines
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-body)] text-[15px] text-[#0d0d0d]/70">
                    Plus Jakarta Sans for body — clean, modern, readable.
                  </p>
                </div>
                <div className="rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6">
                  <h3 className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0d0d0d]/40">
                    Mood &amp; tone
                  </h3>
                  <p className="mt-3 font-[family-name:var(--font-body)] text-[15px] leading-[1.55] text-[#0d0d0d]/70">
                    Warm, energetic, editorial — appetite-appeal meets boutique
                    studio. Voice stays human, plain-spoken, quietly witty (keep{" "}
                    <span className="font-semibold text-[#0d0d0d]">BRAND-VOICE.md</span>).
                    Lean more motion-forward to match a video-first studio.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 08 — HOMEPAGE */}
          <section id="homepage" className="scroll-mt-10">
            <SectionLabel n="08" title="Homepage messaging direction" />
            <ol className="space-y-3">
              {HOMEPAGE_STEPS.map((s, i) => (
                <li
                  key={s.label}
                  className="flex gap-5 rounded-[16px] border border-[#0d0d0d]/12 bg-white/40 p-5"
                >
                  <span className="font-[family-name:var(--font-display)] text-[28px] font-medium leading-none text-[#ff5e00]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-[family-name:var(--font-body)] text-[16px] font-semibold tracking-[-0.01em]">
                      {s.label}
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[#0d0d0d]/65">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* 09 — FIX */}
          <section id="fix" className="scroll-mt-10">
            <SectionLabel n="09" title="What to fix on the current site" />
            <ul className="space-y-px overflow-hidden rounded-[16px] border border-[#0d0d0d]/12">
              {FIX_ITEMS.map((f, i) => (
                <li
                  key={i}
                  className="flex gap-4 bg-white/40 p-5 font-[family-name:var(--font-body)] text-[15px] leading-[1.5] text-[#0d0d0d]/75"
                >
                  <span className="font-semibold tabular-nums text-[#ff5e00]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* 10 — NEEDS */}
          <section id="needs" className="scroll-mt-10">
            <SectionLabel n="10" title="What we need from you" />
            <div className="overflow-hidden rounded-[16px] border border-[#0d0d0d]/12">
              {NEEDS.map((n, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 border-b border-[#0d0d0d]/8 bg-white/40 px-5 py-4 last:border-b-0"
                >
                  <span className="font-[family-name:var(--font-body)] text-[15px] leading-[1.4] text-[#0d0d0d]/80">
                    {n.item}
                  </span>
                  <span
                    className={
                      "shrink-0 rounded-full px-3 py-1 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.08em] " +
                      (n.priority === "Critical"
                        ? "bg-[#ff5e00] text-[#faf3e8]"
                        : n.priority === "High"
                          ? "bg-[#ff5e00]/15 text-[#ff5e00]"
                          : "bg-[#0d0d0d]/8 text-[#0d0d0d]/55")
                    }
                  >
                    {n.priority}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* DIAGNOSIS */}
          <section className="scroll-mt-10">
            <div className="rounded-[24px] border border-[#0d0d0d]/12 bg-[#0d0d0d] p-8 text-[#faf3e8] lg:p-12">
              <p className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#ff7a3d]">
                Strategist&apos;s diagnosis
              </p>
              <p className="mt-6 font-[family-name:var(--font-body)] text-[clamp(1rem,1.8vw,1.2rem)] leading-[1.6] text-[#faf3e8]/85">
                The brand was already half-built for this. The social homepage,
                the social-led voice guide, and the content-led service list
                were just buried behind a web-design front door. Promoting that
                to the only story fixes the two-identity problem and tightens the
                niche to something genuinely ownable:{" "}
                <span className="text-[#ff7a3d]">
                  the reels-and-photos studio for UAE hospitality brands.
                </span>{" "}
                The one thing standing between this and a believable site is
                proof in the right medium — get the reels and view counts from
                the five brands onto the page, and the repositioning stops being
                a claim and becomes obvious.
              </p>
            </div>
          </section>

          {/* ============================ PART II ============================ */}

          <div id="part-2" className="scroll-mt-10 border-t-2 border-[#0d0d0d]/15 pt-12">
            <p className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.22em] text-[#ff5e00]">
              Part II
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,5.5vw,3.6rem)] font-medium leading-[1.0] tracking-[-0.02em]">
              The market research behind it
            </h2>
            <p className="mt-5 max-w-[64ch] font-[family-name:var(--font-body)] text-[clamp(1rem,1.7vw,1.15rem)] leading-[1.6] text-[#0d0d0d]/70">
              Real, cited evidence — from community forums, competitor sites,
              UAE pricing data, and industry research — used to validate and
              sharpen the strategy above. Sources are linked throughout. Where
              UAE-specific data was missing, it&apos;s flagged honestly.
            </p>
          </div>

          {/* R1 — VALIDATION */}
          <section id="r-validation" className="scroll-mt-10">
            <SectionLabel n="R1" title="Is the bet right? Yes — with caveats" />
            <div className="grid gap-4 sm:grid-cols-3">
              {VALIDATION.map((v) => (
                <div
                  key={v.label}
                  className="flex flex-col rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6"
                >
                  <span className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,2.8rem)] font-medium leading-none text-[#ff5e00]">
                    {v.stat}
                  </span>
                  <span className="mt-2 font-[family-name:var(--font-body)] text-[14px] font-semibold tracking-[-0.01em]">
                    {v.label}
                  </span>
                  <p className="mt-3 flex-1 font-[family-name:var(--font-body)] text-[13px] leading-[1.5] text-[#0d0d0d]/65">
                    {v.body}
                  </p>
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 font-[family-name:var(--font-body)] text-[12px] font-semibold text-[#ff5e00] underline decoration-[#ff5e00]/40 underline-offset-2 transition-colors hover:decoration-[#ff5e00]"
                  >
                    {v.src} ↗
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-[14px] bg-[#0d0d0d]/[0.04] p-5 font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[#0d0d0d]/70">
              <span className="font-semibold text-[#0d0d0d]">Verdict:</span> the
              reels-first-for-restaurants bet is validated by genuinely rigorous
              data. The strongest, most honest narrative is{" "}
              <em className="not-italic text-[#ff5e00]">
                “consistency, in the format with the highest ROI”
              </em>{" "}
              — not “go viral” or unverifiable revenue claims.
            </p>
          </section>

          {/* R2 — PROBLEM */}
          <section id="r-problem" className="scroll-mt-10">
            <SectionLabel n="R2" title="The single problem worth owning" />
            <blockquote className="font-[family-name:var(--font-display)] text-[clamp(1.4rem,3vw,2.1rem)] font-medium leading-[1.25] tracking-[-0.01em] text-[#0d0d0d]">
              <span className="text-[#ff5e00]">“</span>UAE restaurant owners
              can&apos;t post good content consistently — the kitchen eats their
              time — and when they hire help, they get vanity metrics instead of
              full tables, plus agencies that pitch beautifully and ship generic
              work.<span className="text-[#ff5e00]">”</span>
            </blockquote>
            <p className="mt-4 font-[family-name:var(--font-body)] text-[13px] font-medium text-[#0d0d0d]/45">
              Synthesis of two strongly-evidenced threads: the consistency gap
              and the followers-don&apos;t-convert / great-pitch-bad-delivery
              distrust.
            </p>
          </section>

          {/* R3 — EVIDENCE */}
          <section id="r-evidence" className="scroll-mt-10">
            <SectionLabel n="R3" title="Evidence (cited)" />
            <div className="grid gap-4 sm:grid-cols-2">
              {EVIDENCE.map((e) => (
                <div
                  key={e.title}
                  className="flex flex-col rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6"
                >
                  <h3 className="font-[family-name:var(--font-body)] text-[16px] font-semibold tracking-[-0.01em]">
                    {e.title}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[#0d0d0d]/65">
                    {e.body}
                  </p>
                  <p className="mt-4 border-l-2 border-[#ff5e00] pl-3 font-[family-name:var(--font-body)] text-[15px] italic leading-[1.4] text-[#0d0d0d]/80">
                    “{e.quote}”
                  </p>
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 font-[family-name:var(--font-body)] text-[12px] font-semibold text-[#ff5e00] underline decoration-[#ff5e00]/40 underline-offset-2 transition-colors hover:decoration-[#ff5e00]"
                  >
                    {e.src} ↗
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-4 font-[family-name:var(--font-body)] text-[12px] leading-[1.5] text-[#0d0d0d]/45">
              Note: Reddit blocked deep thread access — quotes are from indexed
              snippets (real, but shallow). All UAE-specific complaint data is
              absent; pain themes are global and likely transfer.
            </p>
          </section>

          {/* R4 — PAINS */}
          <section id="r-pains" className="scroll-mt-10">
            <SectionLabel n="R4" title="Customer pain points" />
            <div className="overflow-x-auto rounded-[16px] border border-[#0d0d0d]/12">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="bg-[#0d0d0d]/[0.04] text-left font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0d0d0d]/50">
                    <th className="px-5 py-3">Pain point</th>
                    <th className="px-5 py-3">Frequency</th>
                    <th className="px-5 py-3">Emotion</th>
                    <th className="px-5 py-3">Messaging opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  {PAINS.map((p, i) => (
                    <tr
                      key={i}
                      className="border-t border-[#0d0d0d]/8 bg-white/30 font-[family-name:var(--font-body)] text-[13px] text-[#0d0d0d]/75"
                    >
                      <td className="px-5 py-3 font-medium text-[#0d0d0d]">{p.pain}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-[#ff5e00]">{p.freq}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{p.emotion}</td>
                      <td className="px-5 py-3">{p.opp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* R5 — COMPETITORS */}
          <section id="r-competitors" className="scroll-mt-10">
            <SectionLabel n="R5" title="Competitor landscape" />
            <p className="mb-6 font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0d0d0d]/45">
              The 3 angles everyone is using
            </p>
            <div className="grid gap-4 lg:grid-cols-3">
              {ANGLES.map((a) => (
                <div
                  key={a.name}
                  className="rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6"
                >
                  <h3 className="font-[family-name:var(--font-body)] text-[16px] font-semibold tracking-[-0.01em]">
                    {a.name}
                  </h3>
                  <p className="mt-1 font-[family-name:var(--font-body)] text-[12px] text-[#0d0d0d]/45">
                    {a.who}
                  </p>
                  <p className="mt-4 font-[family-name:var(--font-body)] text-[13px] leading-[1.5] text-[#0d0d0d]/70">
                    <span className="font-semibold text-[#0d0d0d]">Weakness — </span>
                    {a.weak}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-body)] text-[13px] leading-[1.5] text-[#ff5e00]">
                    <span className="font-semibold">Our opening — </span>
                    {a.opp}
                  </p>
                </div>
              ))}
            </div>

            <p className="mb-4 mt-10 font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0d0d0d]/45">
              Who&apos;s saying what
            </p>
            <div className="overflow-x-auto rounded-[16px] border border-[#0d0d0d]/12">
              <table className="w-full min-w-[720px] border-collapse">
                <thead>
                  <tr className="bg-[#0d0d0d]/[0.04] text-left font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0d0d0d]/50">
                    <th className="px-5 py-3">Competitor</th>
                    <th className="px-5 py-3">Hero</th>
                    <th className="px-5 py-3">Proof</th>
                    <th className="px-5 py-3">Angle</th>
                    <th className="px-5 py-3">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITORS.map((c) => (
                    <tr
                      key={c.name}
                      className="border-t border-[#0d0d0d]/8 bg-white/30 font-[family-name:var(--font-body)] text-[13px] text-[#0d0d0d]/75"
                    >
                      <td className="px-5 py-3">
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#0d0d0d] underline decoration-[#ff5e00]/40 underline-offset-2 transition-colors hover:text-[#ff5e00]"
                        >
                          {c.name} ↗
                        </a>
                      </td>
                      <td className="px-5 py-3">{c.hero}</td>
                      <td className="px-5 py-3">{c.proof}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{c.angle}</td>
                      <td className="px-5 py-3 text-[#ff5e00]">{c.gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 rounded-[14px] border border-[#ff5e00]/30 bg-[#ff5e00]/[0.06] p-5 font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[#0d0d0d]/80">
              <span className="font-semibold text-[#ff5e00]">White space — </span>
              competitors show <em className="not-italic font-semibold">named clients without numbers</em> OR{" "}
              <em className="not-italic font-semibold">numbers without names</em>, rarely both. Pricing is hidden by
              4 of 6. The open lane: <span className="font-semibold text-[#0d0d0d]">name + real reel + real number</span>,
              with transparent packages.
            </p>
          </section>

          {/* R6 — PRICING */}
          <section id="r-pricing" className="scroll-mt-10">
            <SectionLabel n="R6" title="Pricing reality (UAE)" />
            <div className="grid gap-4 sm:grid-cols-3">
              {PRICING.map((p) => (
                <div
                  key={p.label}
                  className="rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6"
                >
                  <p className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0d0d0d]/45">
                    {p.label}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-[26px] font-medium leading-none text-[#0d0d0d]">
                    {p.value}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-body)] text-[13px] leading-[1.5] text-[#0d0d0d]/60">
                    {p.note}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 font-[family-name:var(--font-body)] text-[12px] leading-[1.5] text-[#0d0d0d]/45">
              Sources: LPS Media, Hikmah, Digiverse360 (management); Tanit
              Studio, Krystian.co (reels); Spinthiras Media (photography). UAE
              maps onto the global “standard-to-comprehensive” band — not
              exotically priced.
            </p>
          </section>

          {/* R7 — PROOF KEEP/DROP/ADD */}
          <section id="r-proof" className="scroll-mt-10">
            <SectionLabel n="R7" title="Proof: keep, drop, add" />
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-[18px] border border-[#10b981]/30 bg-[#10b981]/[0.06] p-6">
                <p className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0f9b6c]">
                  Keep
                </p>
                <ul className="mt-4 space-y-3 font-[family-name:var(--font-body)] text-[14px] leading-[1.5] text-[#0d0d0d]/75">
                  {PROOF_KEEP.map((x, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#0f9b6c]">✓</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[18px] border border-[#ef4444]/30 bg-[#ef4444]/[0.05] p-6">
                <p className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.12em] text-[#d83a3a]">
                  Drop / rewrite
                </p>
                <ul className="mt-4 space-y-3 font-[family-name:var(--font-body)] text-[14px] leading-[1.5] text-[#0d0d0d]/75">
                  {PROOF_DROP.map((x, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#d83a3a]">✕</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[18px] border border-[#ff5e00]/30 bg-[#ff5e00]/[0.06] p-6">
                <p className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.12em] text-[#ff5e00]">
                  Add (stronger)
                </p>
                <ul className="mt-4 space-y-3 font-[family-name:var(--font-body)] text-[14px] leading-[1.5] text-[#0d0d0d]/75">
                  {PROOF_ADD.map((x, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#ff5e00]">＋</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* R8 — IMPLICATIONS + sharpened positioning + diagnosis */}
          <section id="r-implications" className="scroll-mt-10">
            <SectionLabel n="R8" title="What it means for the rewrite" />

            {/* Sharpened positioning */}
            <div className="rounded-[24px] bg-[#0d0d0d] p-8 text-[#faf3e8] lg:p-12">
              <p className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#ff7a3d]">
                Sharpened positioning · v2.1
              </p>
              <p className="mt-6 font-[family-name:var(--font-display)] text-[clamp(1.3rem,2.8vw,2rem)] font-normal leading-[1.35]">
                The reels-and-photography content studio for{" "}
                <span className="text-[#ff7a3d]">UAE restaurants &amp; hospitality brands</span>{" "}
                who want a{" "}
                <span className="text-[#ff7a3d]">consistently full feed</span> and{" "}
                <span className="text-[#ff7a3d]">reels tied to real bookings</span> — without the{" "}
                <span className="text-[#ff7a3d]">vanity metrics, vague retainers, and templated work</span>{" "}
                other agencies deliver.
              </p>
            </div>

            {/* Page-by-page implications */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {IMPLICATIONS.map((im) => (
                <div
                  key={im.area}
                  className="rounded-[16px] border border-[#0d0d0d]/12 bg-white/40 p-6"
                >
                  <p className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.12em] text-[#ff5e00]">
                    {im.area}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[#0d0d0d]/75">
                    {im.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Research diagnosis */}
            <div className="mt-8 overflow-hidden rounded-[16px] border border-[#0d0d0d]/12">
              {DIAGNOSIS_R.map((d, i) => (
                <div
                  key={i}
                  className="grid gap-1 border-b border-[#0d0d0d]/8 bg-white/40 px-5 py-4 last:border-b-0 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-5"
                >
                  <span className="font-[family-name:var(--font-body)] text-[13px] font-semibold text-[#ff5e00]">
                    {d.k}
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-[14px] leading-[1.5] text-[#0d0d0d]/75">
                    {d.v}
                  </span>
                </div>
              ))}
            </div>

            {/* Honesty / gaps callout */}
            <div className="mt-6 rounded-[16px] border border-dashed border-[#0d0d0d]/25 bg-transparent p-6">
              <p className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0d0d0d]/45">
                Gaps to close before the rewrite
              </p>
              <ul className="mt-3 space-y-2 font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[#0d0d0d]/70">
                <li>1 — No UAE-specific buyer-complaint data; themes are global and likely transferable.</li>
                <li>2 — Every available case-study number is vendor-published and non-UAE.</li>
                <li>
                  3 —{" "}
                  <span className="font-semibold text-[#0d0d0d]">
                    The decisive asset — Sandspire&apos;s own reels with real view
                    counts from the five brands — isn&apos;t on the site yet.
                  </span>{" "}
                  Highest priority to gather; the whole repositioning hinges on it.
                </li>
              </ul>
            </div>
          </section>

          {/* ============================ PART III ============================ */}

          <div id="part-3" className="scroll-mt-10 border-t-2 border-[#0d0d0d]/15 pt-12">
            <p className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.22em] text-[#ff5e00]">
              Part III
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,5.5vw,3.6rem)] font-medium leading-[1.0] tracking-[-0.02em]">
              The locked brand definition
            </h2>
            <p className="mt-5 max-w-[64ch] font-[family-name:var(--font-body)] text-[clamp(1rem,1.7vw,1.15rem)] leading-[1.6] text-[#0d0d0d]/70">
              The decisions, locked. This is the reference for the next phases —
              website copy, design system, hero imagery, and content planning.
              Built from the repo identity and the research above.
            </p>
          </div>

          {/* L1 — NAME & POSITIONING */}
          <section id="l-positioning" className="scroll-mt-10">
            <SectionLabel n="L1" title="Name & positioning" />
            <div className="mb-5 flex flex-wrap items-center gap-4 rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6">
              <span className="font-[family-name:var(--font-display)] text-[34px] font-medium leading-none">
                Sandspire
              </span>
              <span className="rounded-full bg-[#10b981]/12 px-3 py-1 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f9b6c]">
                Confidence: High
              </span>
              <span className="font-[family-name:var(--font-body)] text-[13px] text-[#0d0d0d]/55">
                Confirmed across repo, metadata &amp; voice guide. (“Design by Jabrni” = builder credit, not the brand.)
              </span>
            </div>
            <div className="rounded-[24px] bg-[#0d0d0d] p-8 text-[#faf3e8] lg:p-12">
              <p className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#ff7a3d]">
                Positioning statement
              </p>
              <p className="mt-6 font-[family-name:var(--font-display)] text-[clamp(1.3rem,2.8vw,2rem)] font-normal leading-[1.35]">
                For{" "}
                <span className="text-[#ff7a3d]">UAE restaurants and cafés</span>{" "}
                whose kitchens are too busy to keep the feed alive,{" "}
                <span className="text-[#ff7a3d]">Sandspire</span> is the{" "}
                <span className="underline decoration-[#ff5e00] decoration-2 underline-offset-[6px]">
                  reels-and-photography studio
                </span>{" "}
                that shoots a month of content in one day — and ties it to{" "}
                <span className="text-[#ff7a3d]">real bookings, not just views</span>.
              </p>
            </div>
          </section>

          {/* L2 — TAGLINES & COMMUNITY */}
          <section id="l-taglines" className="scroll-mt-10">
            <SectionLabel n="L2" title="Taglines & community line" />
            <div className="grid gap-4 sm:grid-cols-2">
              {TAGLINES.map((t) => (
                <div
                  key={t.kind}
                  className="rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6"
                >
                  <p className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#ff5e00]">
                    {t.kind}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.3rem,2.4vw,1.7rem)] font-medium leading-[1.2]">
                    “{t.line}”
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-body)] text-[13px] leading-[1.5] text-[#0d0d0d]/60">
                    {t.why}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col items-start gap-4 rounded-[18px] border border-[#ff5e00]/30 bg-[#ff5e00]/[0.06] p-7 sm:flex-row sm:items-center">
              <div>
                <p className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#ff5e00]">
                  Community line · {COMMUNITY.type}
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] font-medium leading-none text-[#0d0d0d]">
                  {COMMUNITY.line}
                </p>
              </div>
              <p className="font-[family-name:var(--font-body)] text-[13px] leading-[1.5] text-[#0d0d0d]/65 sm:max-w-[44ch]">
                {COMMUNITY.why}
              </p>
            </div>
          </section>

          {/* L3 — VOICE */}
          <section id="l-voice" className="scroll-mt-10">
            <SectionLabel n="L3" title="Brand voice rules" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[18px] border border-[#10b981]/30 bg-[#10b981]/[0.06] p-6">
                <p className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0f9b6c]">
                  We use
                </p>
                <ul className="mt-4 space-y-2.5 font-[family-name:var(--font-body)] text-[14px] leading-[1.5] text-[#0d0d0d]/75">
                  {VOICE_USE.map((x, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#0f9b6c]">✓</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[18px] border border-[#ef4444]/30 bg-[#ef4444]/[0.05] p-6">
                <p className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.12em] text-[#d83a3a]">
                  We never use
                </p>
                <ul className="mt-4 space-y-2.5 font-[family-name:var(--font-body)] text-[14px] leading-[1.5] text-[#0d0d0d]/75">
                  {VOICE_AVOID.map((x, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#d83a3a]">✕</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {VOICE_MECH.map((m) => (
                <div
                  key={m.k}
                  className="rounded-[14px] border border-[#0d0d0d]/12 bg-white/40 p-4"
                >
                  <p className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0d0d0d]/45">
                    {m.k}
                  </p>
                  <p className="mt-1.5 font-[family-name:var(--font-body)] text-[13px] leading-[1.4] text-[#0d0d0d]/75">
                    {m.v}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
              <div className="rounded-[18px] border border-[#0d0d0d]/12 bg-[#0d0d0d] p-6 text-[#faf3e8]">
                <p className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#ff7a3d]">
                  In a text message
                </p>
                <p className="mt-3 font-[family-name:var(--font-body)] text-[15px] leading-[1.5] text-[#faf3e8]/90">
                  “Sent you 3 reel ideas we'd shoot first — want to jump on a
                  quick call this week?”
                </p>
              </div>
              <div className="rounded-[18px] border border-[#0d0d0d]/12 bg-white/40 p-6">
                <p className="font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[#0d0d0d]/75">
                  <span className="font-semibold text-[#0d0d0d]">On the website:</span>{" "}
                  lead with the client's problem and win; back every claim with a
                  named reel or real number; preempt distrust (approval workflow,
                  no lock-in).{" "}
                  <span className="font-semibold text-[#0d0d0d]">On social:</span>{" "}
                  looser and funnier, food-first — let the work do the bragging.
                  A caption is a hook plus one human line, never a press release.
                </p>
              </div>
            </div>
          </section>

          {/* L4 — PALETTE */}
          <section id="l-palette" className="scroll-mt-10">
            <SectionLabel n="L4" title="Six-colour palette" />
            <div className="overflow-hidden rounded-[16px] border border-[#0d0d0d]/12">
              {PALETTE.map((c) => (
                <div
                  key={c.role}
                  className="flex items-center gap-4 border-b border-[#0d0d0d]/8 bg-white/40 px-4 py-3 last:border-b-0 sm:gap-5 sm:px-5"
                >
                  <div
                    className="h-12 w-12 shrink-0 rounded-lg border border-[#0d0d0d]/10"
                    style={{ background: c.hex }}
                  />
                  <div className="min-w-[150px]">
                    <p className="font-[family-name:var(--font-body)] text-[14px] font-semibold tracking-[-0.01em]">
                      {c.role}
                      {c.tag ? (
                        <span className="ml-2 rounded-full bg-[#ff5e00]/12 px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-[0.08em] text-[#ff5e00]">
                          {c.tag}
                        </span>
                      ) : null}
                    </p>
                    <p className="font-[family-name:var(--font-body)] text-[12px] tabular-nums text-[#0d0d0d]/45">
                      {c.hex}
                    </p>
                  </div>
                  <p className="hidden flex-1 font-[family-name:var(--font-body)] text-[13px] text-[#0d0d0d]/70 sm:block">
                    {c.usage}
                  </p>
                  <p className="hidden font-[family-name:var(--font-body)] text-[12px] text-[#0d0d0d]/40 lg:block lg:max-w-[180px]">
                    {c.note}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-[14px] border border-[#f59e0b]/40 bg-[#f59e0b]/[0.08] p-4 font-[family-name:var(--font-body)] text-[13px] leading-[1.5] text-[#0d0d0d]/75">
              <span className="font-semibold text-[#0d0d0d]">Accessibility:</span>{" "}
              orange #FF5E00 on cream fails WCAG AA for small text — use it for
              large display, fills, and icons only. Keep #0D0D0D ink for all body
              copy (passes AAA on cream). Orange CTAs need cream labels at ≥16px
              semibold.
            </p>
          </section>

          {/* L5 — TYPOGRAPHY */}
          <section id="l-type" className="scroll-mt-10">
            <SectionLabel n="L5" title="Typography hierarchy" />
            <div className="overflow-x-auto rounded-[16px] border border-[#0d0d0d]/12">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="bg-[#0d0d0d]/[0.04] text-left font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0d0d0d]/50">
                    <th className="px-5 py-3">Level</th>
                    <th className="px-5 py-3">Font</th>
                    <th className="px-5 py-3">Weight</th>
                    <th className="px-5 py-3">Usage</th>
                    <th className="px-5 py-3">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {TYPESCALE.map((t) => (
                    <tr
                      key={t.level}
                      className="border-t border-[#0d0d0d]/8 bg-white/30 font-[family-name:var(--font-body)] text-[13px] text-[#0d0d0d]/75"
                    >
                      <td className="px-5 py-3 font-semibold text-[#0d0d0d]">{t.level}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{t.font}</td>
                      <td className="px-5 py-3 whitespace-nowrap tabular-nums">{t.weight}</td>
                      <td className="px-5 py-3">{t.usage}</td>
                      <td className="px-5 py-3 text-[#0d0d0d]/50">{t.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-[family-name:var(--font-body)] text-[12px] leading-[1.5] text-[#0d0d0d]/45">
              Two families, both loaded in <span className="font-medium">app/layout.tsx</span>: Geist for
              headlines/display (--font-display) and Plus Jakarta Sans for body. Playfair Display and Colitez Serif
              have been removed.
            </p>
          </section>

          {/* L6 — THEME MAP */}
          <section id="l-themes" className="scroll-mt-10">
            <SectionLabel n="L6" title="Twelve-week theme map" />
            <div className="overflow-x-auto rounded-[16px] border border-[#0d0d0d]/12">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="bg-[#0d0d0d]/[0.04] text-left font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0d0d0d]/50">
                    <th className="px-5 py-3">Wk</th>
                    <th className="px-5 py-3">Theme</th>
                    <th className="px-5 py-3">Purpose</th>
                    <th className="px-5 py-3">Visual direction</th>
                  </tr>
                </thead>
                <tbody>
                  {THEMES.map((t) => (
                    <tr
                      key={t.wk}
                      className="border-t border-[#0d0d0d]/8 bg-white/30 font-[family-name:var(--font-body)] text-[13px] text-[#0d0d0d]/75"
                    >
                      <td className="px-5 py-3 font-semibold tabular-nums text-[#ff5e00]">
                        {String(t.wk).padStart(2, "0")}
                      </td>
                      <td className="px-5 py-3 font-semibold text-[#0d0d0d]">{t.name}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{t.purpose}</td>
                      <td className="px-5 py-3 text-[#0d0d0d]/65">{t.visual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-[family-name:var(--font-body)] text-[12px] leading-[1.5] text-[#0d0d0d]/45">
              Sequenced: problem awareness → category education → trust →
              differentiation → proof → conversion → community. Every theme ties
              to the locked problem and positioning above.
            </p>
          </section>

          {/* BRAND LOCK DIAGNOSIS */}
          <section className="scroll-mt-10">
            <div className="rounded-[24px] border border-[#0d0d0d]/12 bg-[#0d0d0d] p-8 text-[#faf3e8] lg:p-12">
              <p className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#ff7a3d]">
                Brand lock diagnosis
              </p>
              <div className="mt-6 divide-y divide-white/10">
                {DIAGNOSIS_LOCK.map((d, i) => (
                  <div
                    key={i}
                    className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-5"
                  >
                    <span className="font-[family-name:var(--font-body)] text-[13px] font-semibold text-[#ff7a3d]">
                      {d.k}
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[#faf3e8]/85">
                      {d.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <p className="pt-4 font-[family-name:var(--font-body)] text-[13px] text-[#0d0d0d]/40">
            Internal working document · Sandspire brand strategy v2 · research ·
            locked brand definition · not indexed
          </p>
        </main>
      </div>

      {/* Load animation (respects reduced motion) */}
      <style>{`
        .ss-strategy .reveal {
          opacity: 0;
          transform: translateY(14px);
          animation: ss-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .ss-strategy .reveal:nth-child(1) { animation-delay: 0.05s; }
        .ss-strategy .reveal:nth-child(2) { animation-delay: 0.15s; }
        .ss-strategy .reveal:nth-child(3) { animation-delay: 0.27s; }
        .ss-strategy .reveal:nth-child(4) { animation-delay: 0.38s; }
        @keyframes ss-rise {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ss-strategy .reveal { animation: none; opacity: 1; transform: none; }
          .ss-strategy * { scroll-behavior: auto; }
        }
      `}</style>
    </div>
  );
}
