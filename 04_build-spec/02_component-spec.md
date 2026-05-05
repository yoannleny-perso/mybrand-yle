# Component Specification

> The reusable components that compose yoannleny.com. Specifications include props, behavior, and references to the design system tokens.

All components consume design tokens defined in `00_brand/02_design-system.md` exposed as CSS custom properties. No component declares its own colors, font sizes, or spacing — everything flows through tokens. This keeps the system coherent and makes future re-skinning straightforward.

## Layout primitives

### Container
The horizontal-rhythm wrapper used by every page. Maximum width 1200px, with responsive padding that follows the design-system spacing scale.

```ts
interface ContainerProps {
  children: ReactNode
  size?: 'narrow' | 'default' | 'wide'  // 720 | 1200 | 1440
}
```

### Section
A vertical-rhythm wrapper for major page sections. Manages the `--space-section` padding and provides anchor-link target IDs.

```ts
interface SectionProps {
  id?: string
  children: ReactNode
  background?: 'paper' | 'ink'  // default 'paper'
}
```

### Grid
12-column grid with the breakpoints defined in the design system. Most page layouts compose from this.

```ts
interface GridProps {
  children: ReactNode
  columns?: 12 | 8 | 6 | 4
  gap?: 'tight' | 'default' | 'loose'
}
```

## Editorial primitives

### Eyebrow
Small uppercase label above a headline. Uses JetBrains Mono regular at the eyebrow size from the type scale.

```ts
interface EyebrowProps {
  children: string
}
```

### Heading
Display-scale heading using Fraunces with variable optical size. Sizes map to the design system H1–H4 tokens.

```ts
interface HeadingProps {
  level: 1 | 2 | 3 | 4
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div'
  children: ReactNode
  serif?: boolean  // default true; false for occasional sans heading
}
```

### Prose
Long-form body text. Inter Tight at the body size with the line-height and tracking tokens applied. Handles paragraph spacing, list formatting, and block quotes within the editorial voice.

```ts
interface ProseProps {
  children: ReactNode
  size?: 'small' | 'default' | 'large'
}
```

### MetricBlock
A single metric with label, value, and an optional small description. Used in the metric strip on the home page and in case study summaries.

```ts
interface MetricBlockProps {
  label: string  // e.g. "Revenue impact"
  value: string  // e.g. "$13M+"
  description?: string  // e.g. "across three regions"
  size?: 'default' | 'large'
}
```

### PullQuote
A pulled-out quote in serif italic, positioned to the left or right of body content.

```ts
interface PullQuoteProps {
  children: string
  attribution?: string
  position?: 'left' | 'right' | 'center'
}
```

## Page sections

### Hero
The home-page hero. Implements the staged reveal sequence (eyebrow → headline → body → metrics) via Framer Motion. Respects `prefers-reduced-motion`.

```ts
interface HeroProps {
  eyebrow: string
  headline: string  // supports rich text including italic and emphasis
  body: string
  metrics: { label: string; value: string }[]
  cta?: { label: string; href: string }
}
```

### CapabilityRow
Interactive row component for the five capability pillars. On desktop, hovering or focusing a row expands it to reveal the deliverables list. On mobile, all rows are expanded.

```ts
interface CapabilityRowProps {
  number: string  // e.g. "01"
  title: string
  summary: string
  deliverables: string[]
  icon?: ReactNode  // Phosphor icon, regular weight
}
```

### AsymmetricCard
Case-study card with intentionally varied dimensions, used in the asymmetric gallery on the home page and case studies index.

```ts
interface AsymmetricCardProps {
  title: string
  client?: string  // anonymized if needed
  metric: string  // primary outcome metric
  href: string
  image: string
  size: 'tall' | 'wide' | 'square'
}
```

### TestimonialCrossfade
Crossfading testimonial display, single quote at a time, with a short attribution. Pauses on hover. Respects reduced motion (renders as a static stack on prefers-reduced-motion).

```ts
interface TestimonialCrossfadeProps {
  testimonials: { quote: string; attribution: string; role?: string }[]
  intervalMs?: number  // default 8000
}
```

### CTABand
Closing CTA section, used at the end of long pages. Direct, single-line invitation with one button.

```ts
interface CTABandProps {
  headline: string
  ctaLabel: string
  ctaHref: string
}
```

## Concept-library components

### ConceptPage layout
The wrapper layout for `/concepts/[slug]` pages. Renders the front-matter into a header, the MDX content into the body, and a sidebar with cluster context, related reading, and external references.

```ts
interface ConceptPageProps {
  frontmatter: ConceptFrontmatter
  children: ReactNode  // MDX content
  relatedConcepts: ConceptSummary[]
  relatedCaseStudies: CaseStudySummary[]
}
```

### VendorComparisonTable
The vendor-comparison table that appears in every concept page. Built from a markdown table in the MDX, but styled to a consistent shape with column-specific styling.

Plain HTML table in the MDX, enhanced via global CSS targeting tables inside `.concept-content`. No component prop interface — the markdown is the source of truth.

### YoannsTake
A styled wrapper for the "Yoann's take" italic block at the end of every concept entry. Renders the italic body with a signature line.

In MDX, written as a custom component:
```mdx
<YoannsTake>
*My approach is...*
</YoannsTake>
```

```ts
interface YoannsTakeProps {
  children: ReactNode
}
```

### ConceptCard
Used in cluster pages and related-reading sidebars. Compact card with title, definition, cluster tag, and depth indicator.

```ts
interface ConceptCardProps {
  title: string
  slug: string
  definition: string
  cluster: ClusterId
  depth: 'core' | 'intermediate' | 'advanced'
  readingTime: string
}
```

## Lab components

### ArchitectureDecisionEngine
The interactive decision-engine tool described in killer idea #1. A multi-step form with branching logic that surfaces a recommended stack at the end.

```ts
interface ArchitectureDecisionEngineProps {
  // No external props; state managed internally
}
```

Internal state shape:
```ts
type Answers = {
  teamSize: 'small' | 'medium' | 'large' | 'enterprise'
  currentStack: 'none' | 'modern-elt' | 'legacy-warehouse' | 'lakehouse' | 'mixed'
  regulatedData: boolean
  costSensitivity: 'low' | 'medium' | 'high'
  teamMaturity: 'early' | 'mid' | 'mature'
  agenticAmbition: 'exploration' | 'production-pilot' | 'production-scale'
  // ... etc
}
```

Recommendation engine: a function `getRecommendation(answers: Answers): Recommendation` with ~50 leaf nodes. Each leaf returns a structured recommendation including stack components, rationale, alternatives, and links to relevant concepts.

### CostOfAgenticAICalculator
The calculator described in killer idea #2.

```ts
interface CostInputs {
  monthlyUsers: number
  requestsPerUserPerMonth: number
  averageStepsPerRequest: number
  modelTier: 'haiku' | 'sonnet' | 'opus' | 'mixed-tiered'
  promptCachingEnabled: boolean
  retrievalCallsPerRequest: number
  // ... etc
}

interface CostOutput {
  monthlyCostP50: number
  monthlyCostP95: number
  perRequestLatencyP50: number
  perRequestLatencyP95: number
  optimizationSuggestions: { title: string; impact: string; description: string }[]
}
```

Pure client-side calculation. Pricing tables imported from a versioned data file that is updated quarterly.

### AgenticOrgSimulator
The simulator described in killer idea #4. The most substantial of the lab components.

```ts
interface OrgInputs {
  functions: { name: string; headcount: number; agenticAdoption: number /* 0-1 */ }[]
  adoptionTimeline: 12 | 18 | 24  // months
  conservatism: 'conservative' | 'central' | 'aggressive'
}

interface OrgOutput {
  trajectory: {
    month: number
    headcountByFunction: Record<string, number>
    throughputByFunction: Record<string, number>
    costByFunction: Record<string, number>
  }[]
  insights: string[]
}
```

Built with React state and Recharts for visualization. The model is in `/lib/orgSimulator.ts` and is documented inline so the assumptions are inspectable.

## Accessibility floor

All components must meet:

- **AAA color contrast** for text
- **Visible focus states** that don't depend on color alone
- **Keyboard navigation** for all interactive elements
- **`aria-label`** for icon-only buttons
- **Semantic HTML** as the foundation; ARIA only where semantics are insufficient
- **`prefers-reduced-motion`** respected by every motion primitive
- **Form labels** properly associated with inputs in lab tools
- **Heading hierarchy** preserved on every page (one h1, sequential h2/h3/h4)

These are not optional. Any component that ships without them is a regression.
