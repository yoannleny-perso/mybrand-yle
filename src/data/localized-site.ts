import type { CinematicSignal } from '../components/brand/cinematic-contracts';

export type Locale = 'en' | 'fr' | 'es';

export const localizedPath = (locale: Locale, path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? normalizedPath : `/${locale}${normalizedPath === '/' ? '/' : normalizedPath}`;
};

export interface RecruiterHeroCopy {
  availability: string;
  location: string;
  roleLabel: string;
  headline: string;
  summary: string;
  primaryLabel: string;
  secondaryLabel: string;
  portraitAlt: string;
  briefLabel: string;
  fitLabel: string;
  briefAriaLabel: string;
  roleTerm: string;
  roleValue: string;
  scopeTerm: string;
  scopeValue: string;
  reachTerm: string;
  reachValue: string;
  orbitLabel: string;
  decisionTrace: {
    label: string;
    principle: string;
    steps: [
      { label: string; title: string; signal: 'change' },
      { label: string; title: string; signal: 'intelligence' },
      { label: string; title: string; signal: 'outcome' },
    ];
  };
}

export interface AchievementLabels {
  evidence: string;
  sector: string;
  context: string;
  capabilities: string;
}

interface Metric {
  value: string;
  label: string;
}

interface CapabilityItem {
  mandate: string;
  practice: string;
  evidence: string[];
}

interface ThinkingItem {
  label: string;
  title: string;
  slug: string;
}

interface SupportingCase {
  pattern: 'agents' | 'layers' | 'semantic' | 'org';
  tag: string;
  title: string;
  description: string;
  metrics: Metric[];
  slug: string;
}

export interface LocalizedLink {
  label: string;
  href: string;
  external?: boolean;
}

export type LocalizedRichPart = string | (LocalizedLink & { emphasis?: boolean });

interface LocalizedPageMetadata {
  title: string;
  description: string;
  intro: { eyebrow: string; title: string; summary?: string };
}

export interface LegalSegment {
  text: string;
  strong?: boolean;
  href?: string;
}

interface LegalPageCopy {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  paragraphs: LegalSegment[][];
}

interface LegalPagesCopy {
  privacy: LegalPageCopy;
  imprint: LegalPageCopy;
}

export interface LocalizedPersonalSection {
  id: string;
  kind: string;
}

export interface LocalizedPersonalPage<TSection extends LocalizedPersonalSection = LocalizedPersonalSection> extends LocalizedPageMetadata {
  sections: TSection[];
  primaryCta?: LocalizedLink;
  secondaryCta?: LocalizedLink;
}

type AboutSection =
  | ({ kind: 'biography'; eyebrow: string; body: string[] } & LocalizedPersonalSection)
  | ({ kind: 'principles'; eyebrow: string; title: string; items: Array<{ number: string; title: string; description: string }> } & LocalizedPersonalSection)
  | ({ kind: 'track-record'; eyebrow: string; metrics: Array<Metric & { description: string }> } & LocalizedPersonalSection)
  | ({ kind: 'stack'; eyebrow: string; body: string } & LocalizedPersonalSection)
  | ({ kind: 'writing'; eyebrow: string; items: Array<LocalizedLink & { kind: string }> } & LocalizedPersonalSection)
  | ({ kind: 'closing'; lead: string; title: string } & LocalizedPersonalSection);

interface AboutCopy extends LocalizedPersonalPage<AboutSection> {
  portrait: { alt: string; caption: string; statement: string };
}

interface AboutSourceCopy extends LocalizedPageMetadata {
  portrait: { alt: string; caption: string; statement: string };
  biography: { eyebrow: string; body: string[] };
  principles: { eyebrow: string; title: string; items: Array<{ number: string; title: string; description: string }> };
  trackRecord: { eyebrow: string; metrics: Array<Metric & { description: string }> };
  stack: { eyebrow: string; body: string };
  writing: { eyebrow: string; items: Array<LocalizedLink & { kind: string }> };
  close: { lead: string; title: string; primary: LocalizedLink; secondary: LocalizedLink };
}

type CapabilityPracticeId =
  | 'agentic-ai-architecture'
  | 'data-platforms'
  | 'strategic-data-ops'
  | 'team-orchestration'
  | 'executive-enablement';

interface CapabilityPractice {
  id: CapabilityPracticeId;
  signal: CinematicSignal;
  eyebrow: string;
  title: string;
  body: string;
  diagram: 'agents' | 'medallion' | 'contracts' | 'org' | 'executive';
  deliverablesLabel: string;
  deliverables: string[];
  fitLabel: string;
  fit: string;
  linksLabel: string;
  links: LocalizedLink[];
  missions: string[];
}

interface CapabilitiesCopy extends LocalizedPageMetadata {
  practices: CapabilityPractice[];
  engagement: {
    eyebrow: string;
    title: string;
    summary: string;
    columns: [string, string, string, string];
    modes: Array<{ mode: string; shape: string; duration: string; bestFor: string }>;
    note: { before: string; link: LocalizedLink; after: string };
  };
  close: { title: string; continuation: string; primary: LocalizedLink; secondary: LocalizedLink };
}

interface CapabilitiesSourceCopy extends Omit<CapabilitiesCopy, 'practices'> {
  practices: Array<Omit<CapabilityPractice, 'signal'>>;
}

interface ContactCopy extends LocalizedPageMetadata {
  hiring: { lead: string; body: string; link: LocalizedLink };
  paths: Array<LocalizedLink & { label: string; actionLabel: string; description: string; kind: 'email' | 'linkedin' | 'call' }>;
  messageGuide: { eyebrow: string; intro: string; items: string[]; close: string };
  expectation: string;
  close: { title: string; continuation: string; signature: string; location: string };
}

interface HireCopy extends LocalizedPageMetadata {
  identityLine: string;
  facts: Array<{ label: string; value: string }>;
  fit: { positiveTitle: string; positive: string[]; negativeTitle: string; negative: string[] };
  plan: {
    eyebrow: string;
    title: string;
    summary: string;
    deliverableLabel: string;
    phases: Array<{ id: string; label: string; title: string; items: string[]; deliverable: string }>;
  };
  evidence: { eyebrow: string; title: string; links: Array<LocalizedLink & { label: string; description: string; cta: string }> };
  close: { title: string; primary: LocalizedLink; secondary: LocalizedLink; note: string };
}

type NowSection =
  | ({ kind: 'lead'; before: string; link: LocalizedLink; after: string } & LocalizedPersonalSection)
  | ({ kind: 'focus'; title: string; paragraphs: Array<{ parts: LocalizedRichPart[] }> } & LocalizedPersonalSection)
  | ({ kind: 'availability'; title: string; items: Array<{ label: string; parts: LocalizedRichPart[] }> } & LocalizedPersonalSection)
  | ({ kind: 'reading'; title: string; before: string; book: string; after: string } & LocalizedPersonalSection);

interface NowCopy extends LocalizedPersonalPage<NowSection> {}

interface NowSourceCopy extends LocalizedPageMetadata {
  lead: { before: string; link: LocalizedLink; after: string };
  focus: { title: string; paragraphs: Array<{ parts: LocalizedRichPart[] }> };
  availability: { title: string; items: Array<{ label: string; parts: LocalizedRichPart[] }> };
  reading: { title: string; before: string; book: string; after: string };
  cta: LocalizedLink;
}

interface PersonalPagesCopy {
  about: AboutCopy;
  capabilitiesPage: CapabilitiesCopy;
  contact: ContactCopy;
  hire: HireCopy;
  now: NowCopy;
}

interface LocalizedSiteCopy extends PersonalPagesCopy {
  legal: LegalPagesCopy;
  achievementLabels: AchievementLabels;
  home: {
    title: string;
    description: string;
    hero: RecruiterHeroCopy;
    proof: {
      title: string;
      note: string;
      metrics: Metric[];
    };
    achievements: {
      eyebrow: string;
      heading: string;
      summary: string;
      linkLabel: string;
    };
    capabilities: {
      eyebrow: string;
      heading: string;
      summary: string;
      linkLabel: string;
      evidenceLabel: string;
      items: CapabilityItem[];
    };
    fit: {
      eyebrow: string;
      heading: string;
      summary: string;
      items: string[];
      primaryLabel: string;
      secondaryLabel: string;
    };
    thinking: {
      eyebrow: string;
      heading: string;
      linkLabel: string;
      readLabel: string;
      items: ThinkingItem[];
    };
    close: {
      eyebrow: string;
      heading: string;
      cta: string;
    };
  };
  work: {
    title: string;
    description: string;
    intro: {
      eyebrow: string;
      heading: string;
      summary: string;
    };
    register: {
      eyebrow: string;
      heading: string;
      summary: string;
    };
    supporting: {
      heading: string;
      summary: string;
      cards: SupportingCase[];
    };
    close: {
      heading: string;
      cta: string;
    };
  };
}

const aboutPageSources: Record<Locale, AboutSourceCopy> = {
  en: {
    title: 'About — Yoann Leny',
    description: 'Operator-architect with VP-level experience leading data operations and agentic AI at scale. Background, principles, and how I work.',
    intro: { eyebrow: 'ABOUT', title: 'Yoann Leny. Operator, architect, builder.', summary: 'Building data and AI operating systems for organizations that want margin, not magic.' },
    portrait: { alt: 'Yoann Leny', caption: 'YOANN LENY · BORDEAUX, FRANCE', statement: "Tools are easy. The way decisions, data, models, and people compose into a working whole — that's where leverage lives." },
    biography: {
      eyebrow: '01 — BIOGRAPHY',
      body: [
        "I have spent the last decade learning the same lesson over and over again: organizations don't underperform because they lack tools — they underperform because the tools never compose into a working system. The dashboards exist. The data exists. The models exist. What is missing is the operating logic that turns them into decisions.",
        'My career has been the practice of installing that operating logic. Early on, I built data warehouses for performance teams who needed answers in minutes, not weeks. I learned the difference between a query that runs and a query that survives. Then I built the platforms underneath those warehouses — medallion lakehouses, semantic layers, contract-driven pipelines — because the brittleness of the old stack made fast answers slow again every six months.',
        'Around the time large language models stopped being a research curiosity and started being a deployable component, I had already been thinking about agents — about workflows that needed to act, not just retrieve. The work shifted toward designing multi-agent systems with deterministic guardrails: hierarchical agent graphs, audit trails, human-in-the-loop checkpoints. The pattern became clear: agentic AI works in production only when it sits on top of the same disciplined data foundation that traditional analytics needs. There is no shortcut.',
        'Most recently, as VP of Data Operations, I have been responsible for the full triangle: the platforms (data and AI), the operating model (40+ experts across three regions), and the executive surface (the visibility layer that turns the system into governable decisions). The triangle is the work. Removing one corner makes the other two collapse within twelve months.',
        'I write what I learn. The concept library on this site is not content marketing — it is a working notebook of how I think about each problem, with vendor comparisons grounded in what I have actually deployed. If something on the site feels useful to you, that is the goal. If you think I am wrong about something, I would prefer to hear it.',
        'I live in Bordeaux. I work with executive teams in France, the UK, and selectively across Europe and North America. I take on a small number of engagements each year — usually one large rebuild and one or two advisory relationships — because the depth that produces real outcomes is incompatible with portfolio thinking.',
      ],
    },
    principles: {
      eyebrow: '02 — PRINCIPLES', title: 'How I work.', items: [
        { number: '01', title: 'Make the system legible.', description: "If a CEO cannot see how decisions are made, the system isn't finished yet." },
        { number: '02', title: 'Treat data as a product.', description: 'Owners, contracts, SLAs, deprecation. The discipline of shipping software, applied to information.' },
        { number: '03', title: 'Constrain agents before you scale them.', description: 'Probabilistic systems need deterministic borders. Guardrails are architecture, not afterthought.' },
        { number: '04', title: 'Hire for system-thinking, not stack experience.', description: 'Tools change every two years. Operating instincts compound.' },
        { number: '05', title: 'Remove more than you add.', description: 'Most organizations are already drowning. The senior move is restraint.' },
      ],
    },
    trackRecord: { eyebrow: '03 — TRACK RECORD', metrics: [
      { label: 'REVENUE IMPACT', value: '$13M+', description: 'Cumulative impact across data and AI engagements, measured at the P&L level — not modeled.' },
      { label: 'TEAM SIZE', value: '40+', description: 'Experts directly orchestrated across data engineering, analytics, AI, and adjacent functions.' },
      { label: 'REGIONS LED', value: '3', description: 'Europe, UK, and a third regional hub, managed in parallel.' },
      { label: 'EFFICIENCY', value: '+15%', description: 'Sustained utilization uplift on a 40-person team after deploying agentic skill-tracker.' },
      { label: 'SPEED TO VALUE', value: '9m', description: 'From kickoff to payback on the most recent enterprise medallion stack rebuild.' },
      { label: 'RELIABILITY', value: '0', description: 'KPI drift incidents in production after introducing the AI-ready semantic layer.' },
    ] },
    stack: { eyebrow: '04 — STACK', body: "Daily working tools include the major lakehouse and warehouse platforms (Databricks, Snowflake, BigQuery), orchestration through Airflow and Dagster, transformation in dbt, semantic layers via Cube and Looker's LookML, observability through Monte Carlo and Lightdash, and agentic frameworks including LangGraph, CrewAI, and increasingly bespoke deterministic-graph implementations. Cloud is multi — AWS, GCP, Azure — with no religious preference. Everything else is a means to an end." },
    writing: { eyebrow: '05 — WRITING', items: [
      { label: 'Why most agent demos collapse in production', href: '/insights/why-most-agent-demos-collapse-in-production', kind: 'essay' },
      { label: 'The medallion architecture, decoded', href: '/concepts/medallion-architecture', kind: 'concept' },
      { label: 'Snowflake vs Databricks vs BigQuery for AI workloads', href: '/concepts/data-lake-vs-warehouse-vs-lakehouse', kind: 'concept' },
      { label: 'The semantic layer is the new data API', href: '/insights/the-semantic-layer-is-the-new-data-api', kind: 'essay' },
      { label: 'Designing teams for agentic operations', href: '/insights/designing-teams-for-agentic-operations', kind: 'essay' },
      { label: 'Lakehouse, warehouse, mesh — what actually changes', href: '/insights/lakehouse-warehouse-mesh', kind: 'essay' },
    ] },
    close: { lead: 'If your data and AI feel busy but not productive — that is the operating system problem.', title: "Let's talk.", primary: { label: 'Book a 30-minute introduction →', href: '/contact' }, secondary: { label: 'Or send a direct email', href: 'mailto:yoann.leny@gmail.com' } },
  },
  fr: {
    title: 'À propos — Yoann Leny',
    description: "Dirigeant-architecte avec une expérience de niveau VP dans la direction des opérations de données et de l'IA agentique à grande échelle. Parcours, principes et méthode de travail.",
    intro: { eyebrow: 'À PROPOS', title: 'Yoann Leny. Opérateur, architecte, bâtisseur.', summary: "Je bâtis des systèmes d'exploitation pour la donnée et l'IA pour les organisations qui veulent de la marge, pas de la magie." },
    portrait: { alt: 'Yoann Leny', caption: 'YOANN LENY · BORDEAUX, FRANCE', statement: "Les outils sont faciles. La façon dont les décisions, les données, les modèles et les personnes composent un tout qui fonctionne — c'est là que réside le levier." },
    biography: { eyebrow: '01 — BIOGRAPHIE', body: [
      "J'ai passé la dernière décennie à apprendre la même leçon encore et encore : les organisations ne sous-performent pas par manque d'outils, mais parce que les outils ne s'assemblent jamais en un système fonctionnel. Les tableaux de bord existent. Les données existent. Les modèles existent. Ce qui manque, c'est la logique opérationnelle qui les transforme en décisions.",
      "Ma carrière s'est concentrée sur la mise en place de cette logique opérationnelle. À mes débuts, j'ai construit des entrepôts de données pour des équipes de performance qui avaient besoin de réponses en quelques minutes, et non en quelques semaines. J'y ai appris la différence entre une requête qui s'exécute et une requête qui survit. Ensuite, j'ai construit les plateformes sous-jacentes à ces entrepôts — des lakehouses Medallion, des couches sémantiques, des pipelines guidés par des contrats — car la fragilité de l'ancienne pile rendait les réponses rapides à nouveau lentes tous les six mois.",
      "Au moment où les grands modèles de langage ont cessé d'être une curiosité de recherche pour devenir des composants déployables, je pensais déjà aux agents — à des flux de travail qui devaient agir, et pas seulement chercher. Mon travail s'est alors orienté vers la conception de systèmes multi-agents dotés de garde-fous déterministes : graphes d'agents hiérarchiques, pistes d'audit, points de contrôle avec intervention humaine. Le modèle est devenu évident : l'IA agentique ne fonctionne en production que lorsqu'elle repose sur les mêmes bases de données rigoureuses dont les analyses traditionnelles ont besoin. Il n'y a pas de raccourci.",
      "Plus récemment, en tant que VP des Opérations de Données, j'ai été responsable du triangle complet : les plateformes (données et IA), le modèle opérationnel (plus de 40 experts dans trois régions) et la surface exécutive (la couche de visibilité qui transforme le système en décisions gouvernables). Ce triangle est le cœur du travail. Retirer un angle fait s'effondrer les deux autres en moins de douze mois.",
      "J'écris ce que j'apprends. La bibliothèque de concepts de ce site n'est pas du marketing de contenu — c'est un carnet de bord de ma réflexion sur chaque problème, avec des comparaisons de fournisseurs basées sur ce que j'ai réellement déployé. Si quelque chose sur ce site vous est utile, alors le but est atteint. Si vous pensez que je me trompe sur un point, je serais ravi d'en débattre.",
      "J'habite à Bordeaux. Je travaille avec des équipes de direction en France, au Royaume-Uni, et de manière sélective en Europe et en Amérique du Nord. Je m'engage sur un nombre restreint de projets chaque année — généralement une restructuration d'envergure et une ou deux relations de conseil — car la profondeur nécessaire pour produire de réels résultats est incompatible avec une logique de portefeuille.",
    ] },
    principles: { eyebrow: '02 — PRINCIPES', title: 'Ma méthode de travail.', items: [
      { number: '01', title: 'Rendre le système lisible.', description: "Si un PDG ne peut pas voir comment les décisions sont prises, le système n'est pas encore terminé." },
      { number: '02', title: 'Traiter la donnée comme un produit.', description: "Propriétaires, contrats, SLA, dépréciation. La rigueur du développement logiciel appliquée à l'information." },
      { number: '03', title: "Contraindre les agents avant de les mettre à l'échelle.", description: "Les systèmes probabilistes ont besoin de limites déterministes. Les garde-fous sont de l'architecture, pas une réflexion après coup." },
      { number: '04', title: "Recruter pour la pensée systémique, pas pour l'expérience technique.", description: "Les outils changent tous les deux ans. L'instinct opérationnel se capitalise." },
      { number: '05', title: "Retirer plus qu'ajouter.", description: 'La plupart des organisations se noient déjà. La retenue est la marque des grands professionnels.' },
    ] },
    trackRecord: { eyebrow: '03 — RÉSULTATS', metrics: [
      { label: 'IMPACT FINANCIER', value: '13M$+', description: "Impact cumulé sur les projets de données et d'IA, mesuré au niveau du compte de résultat — pas modélisé." },
      { label: 'EXPERTS ORCHESTRÉS', value: '40+', description: "Experts directement coordonnés dans l'ingénierie des données, l'analyse, l'IA et les fonctions adjacentes." },
      { label: 'RÉGIONS DIRIGÉES', value: '3', description: 'Europe, Royaume-Uni, et un troisième pôle régional gérés en parallèle.' },
      { label: 'PRODUCTIVITÉ', value: '+15%', description: "Amélioration durable de l'utilisation d'une équipe de 40 personnes après le déploiement d'un outil de suivi des compétences agentique." },
      { label: 'RETOUR SUR INVESTISSEMENT', value: '9m', description: "Du lancement à la rentabilisation du plus récent projet de reconstruction d'infrastructure Medallion." },
      { label: 'FIABILITÉ', value: '0', description: "Incidents de dérive de KPI en production après l'introduction de la couche sémantique prête pour l'IA." },
    ] },
    stack: { eyebrow: '04 — STACK', body: "Mes outils de travail quotidiens comprennent les principales plateformes de lakehouse et d'entrepôt (Databricks, Snowflake, BigQuery), l'orchestration via Airflow et Dagster, la transformation avec dbt, les couches sémantiques via Cube et LookML (Looker), l'observabilité avec Monte Carlo et Lightdash, et des frameworks d'agents comme LangGraph, CrewAI, ainsi que des implémentations de graphes déterministes de plus en plus personnalisées. Le cloud est multi — AWS, GCP, Azure — sans préférence dogmatique. Tout le reste n'est qu'un moyen pour parvenir à une fin." },
    writing: { eyebrow: '05 — RÉFLEXIONS', items: [
      { label: "Pourquoi la plupart des démos d'agents s'effondrent en production", href: '/fr/insights/why-most-agent-demos-collapse-in-production', kind: 'essai' },
      { label: "L'architecture Medallion, décodée", href: '/fr/concepts/medallion-architecture', kind: 'concept' },
      { label: 'Snowflake vs Databricks vs BigQuery pour les charges de travail IA', href: '/fr/concepts/data-lake-vs-warehouse-vs-lakehouse', kind: 'concept' },
      { label: 'La couche sémantique est la nouvelle API de données', href: '/fr/insights/the-semantic-layer-is-the-new-data-api', kind: 'essai' },
      { label: 'Concevoir des équipes pour des opérations agentiques', href: '/fr/insights/designing-teams-for-agentic-operations', kind: 'essai' },
      { label: 'Lakehouse, warehouse, mesh — ce qui change réellement', href: '/fr/insights/lakehouse-warehouse-mesh', kind: 'essai' },
    ] },
    close: { lead: "Si vos données et votre IA tournent à plein régime sans être productives — c'est un problème de système d'exploitation.", title: 'Discutons-en.', primary: { label: 'Réserver une introduction de 30 minutes →', href: '/fr/contact' }, secondary: { label: "Ou m'envoyer un e-mail direct", href: 'mailto:yoann.leny@gmail.com' } },
  },
  es: {
    title: 'Sobre mí — Yoann Leny',
    description: 'Operador-arquitecto con experiencia a nivel VP liderando operaciones de datos e IA agentica a gran escala. Antecedentes, principios y cómo trabajo.',
    intro: { eyebrow: 'SOBRE MÍ', title: 'Yoann Leny. Operador, arquitecto, constructor.', summary: 'Construyendo sistemas operativos de datos e IA para organizaciones que buscan margen, no magia.' },
    portrait: { alt: 'Yoann Leny', caption: 'YOANN LENY · BURDEOS, FRANCIA', statement: 'Las herramientas son fáciles. La forma en que las decisiones, los datos, los modelos y las personas componen un todo que funciona — ahí es donde vive la ventaja.' },
    biography: { eyebrow: '01 — BIOGRAFÍA', body: [
      'He pasado la última década aprendiendo la misma lección una y otra vez: las organizaciones no rinden lo suficiente porque les falten herramientas, sino porque las herramientas nunca se integran en un sistema que funcione. Los paneles existen. Los datos existen. Los modelos existen. Lo que falta es la lógica operativa que los convierta en decisiones.',
      'Mi carrera ha sido la práctica de instalar esa lógica operativa. Al principio, construí almacenes de datos para equipos de rendimiento que necesitaban respuestas en minutos, no en semanas. Aprendí la diferencia entre una consulta que se ejecuta y una consulta que sobrevive. Luego construí las plataformas debajo de esos almacenes — medallion lakehouses, capas semánticas, canalizaciones basadas en contratos — porque la fragilidad de la pila anterior hacía que las respuestas rápidas volvieran a ser lentas cada seis meses.',
      'Para cuando los modelos de lenguaje grandes dejaron de ser una curiosidad de investigación y pasaron a ser componentes desplegables, yo ya había estado pensando en agentes — en flujos de trabajo que necesitaban actuar, no solo recuperar información. El trabajo se orientó hacia el diseño de sistemas multi-agente con límites deterministas: gráficos de agentes jerárquicos, pistas de auditoría, puntos de control con intervención humana. El patrón quedó claro: la IA agentica funciona en producción solo cuando se asienta sobre la misma base de datos disciplinada que necesita la analítica tradicional. No hay atajos.',
      'Más recientemente, como VP de Operaciones de Datos, he sido responsable de todo el triángulo: las plataformas (datos e IA), el modelo operativo (más de 40 expertos en tres regiones) y la superficie ejecutiva (la capa de visibilidad que convierte el sistema en decisiones gobernables). El triángulo es el trabajo. Quitar una esquina hace que las otras dos colapsen en un plazo de doce meses.',
      'Escribo lo que aprendo. La biblioteca de conceptos de este sitio no es marketing de contenidos; es un cuaderno de trabajo sobre cómo pienso cada problema, con comparaciones de proveedores basadas en lo que realmente he desplegado. Si algo en el sitio le resulta útil, ese es el objetivo. Si cree que me equivoco en algo, prefiero escucharlo.',
      'Vivo en Burdeos. Trabajo con equipos ejecutivos en Francia, el Reino Unido y de forma selectiva en Europa y América del Norte. Acepto un número reducido de compromisos cada año, normalmente una gran reestructuración y una o dos relaciones de asesoría, porque la profundidad que produce resultados reales es incompatible con una mentalidad de cartera.',
    ] },
    principles: { eyebrow: '02 — PRINCIPIOS', title: 'Cómo trabajo.', items: [
      { number: '01', title: 'Hacer legible el sistema.', description: 'Si un CEO no puede ver cómo se toman las decisiones, el sistema aún no está terminado.' },
      { number: '02', title: 'Tratar los datos como un producto.', description: 'Propietarios, contratos, SLA, depreciación. La disciplina de desarrollar software aplicada a la información.' },
      { number: '03', title: 'Restringir a los agentes antes de escalarlos.', description: 'Los sistemas probabilísticos necesitan límites deterministas. Los límites son arquitectura, no una idea de último momento.' },
      { number: '04', title: 'Contratar para el pensamiento sistémico, no por experiencia técnica.', description: 'Las herramientas cambian cada dos años. Los instintos operativos se acumulan.' },
      { number: '05', title: 'Eliminar más de lo que se añade.', description: 'La mayoría de las organizaciones ya se están ahogando. La moderación es el movimiento de los profesionales senior.' },
    ] },
    trackRecord: { eyebrow: '03 — TRAYECTORIA', metrics: [
      { label: 'IMPACTO EN INGRESOS', value: '$13M+', description: 'Impacto acumulado en proyectos de datos e IA, medido a nivel de pérdidas y ganancias — no modelado.' },
      { label: 'TAMAÑO DEL EQUIPO', value: '40+', description: 'Expertos orquestados directamente en ingeniería de datos, analítica, IA y funciones adyacentes.' },
      { label: 'REGIONES LIDERADAS', value: '3', description: 'Europa, Reino Unido y un tercer nodo regional gestionados en paralelo.' },
      { label: 'EFICIENCIA', value: '+15%', description: 'Incremento sostenido del uso de un equipo de 40 personas tras desplegar el gestor de habilidades agentico.' },
      { label: 'RETORNO DE INVERSIÓN', value: '9m', description: 'Desde el inicio hasta la amortización en la reconstrucción más reciente de la pila medallion empresarial.' },
      { label: 'FIABILIDAD', value: '0', description: 'Incidentes de desviación de KPI en producción tras introducir la capa semántica lista para IA.' },
    ] },
    stack: { eyebrow: '04 — TECNOLOGÍAS', body: 'Mis herramientas de trabajo diarias incluyen las principales plataformas de lakehouse y almacenamiento (Databricks, Snowflake, BigQuery), orquestación a través de Airflow y Dagster, transformación en dbt, capas semánticas a través de Cube y LookML (Looker), observabilidad a través de Monte Carlo y Lightdash, y marcos de agentes que incluyen LangGraph, CrewAI y, cada vez más, implementaciones de gráficos deterministas personalizadas. La nube es múltiple (AWS, GCP, Azure) sin preferencia dogmática. Todo lo demás es un medio para un fin.' },
    writing: { eyebrow: '05 — PUBLICACIONES', items: [
      { label: 'Por qué la mayoría de las demostraciones de agentes fracasan en producción', href: '/es/insights/why-most-agent-demos-collapse-in-production', kind: 'ensayo' },
      { label: 'La arquitectura Medallion, descodificada', href: '/es/concepts/medallion-architecture', kind: 'concepto' },
      { label: 'Snowflake vs Databricks vs BigQuery para cargas de trabajo de IA', href: '/es/concepts/data-lake-vs-warehouse-vs-lakehouse', kind: 'concepto' },
      { label: 'La capa semántica es la nueva API de datos', href: '/es/insights/the-semantic-layer-is-the-new-data-api', kind: 'ensayo' },
      { label: 'Diseño de equipos para operaciones agenticas', href: '/es/insights/designing-teams-for-agentic-operations', kind: 'ensayo' },
      { label: 'Lakehouse, warehouse, mesh — qué cambia realmente', href: '/es/insights/lakehouse-warehouse-mesh', kind: 'ensayo' },
    ] },
    close: { lead: 'Si sus datos y su IA se sienten activos pero no productivos, ese es el problema del sistema operativo.', title: 'Hablemos.', primary: { label: 'Reservar una introducción de 30 minutos →', href: '/es/contact' }, secondary: { label: 'O enviar un correo electrónico directo', href: 'mailto:yoann.leny@gmail.com' } },
  },
};

const aboutPages = Object.fromEntries(Object.entries(aboutPageSources).map(([locale, page]) => [locale, {
  title: page.title,
  description: page.description,
  intro: page.intro,
  portrait: page.portrait,
  primaryCta: page.close.primary,
  secondaryCta: page.close.secondary,
  sections: [
    { id: 'bio', kind: 'biography', ...page.biography },
    { id: 'principles', kind: 'principles', ...page.principles },
    { id: 'track-record', kind: 'track-record', ...page.trackRecord },
    { id: 'stack', kind: 'stack', ...page.stack },
    { id: 'writing', kind: 'writing', ...page.writing },
    { id: 'closing', kind: 'closing', lead: page.close.lead, title: page.close.title },
  ],
}])) as Record<Locale, AboutCopy>;

const contactPages: Record<Locale, ContactCopy> = {
  en: {
    title: 'Contact — Yoann Leny',
    description: 'Three ways to engage: architect-in-residence, executive advisory, diagnostic and rebuild plan. Direct contact and current availability.',
    intro: { eyebrow: 'CONTACT', title: 'The fastest way is direct.', summary: 'Three paths below — pick whichever fits the conversation you want to have. I read every message myself.' },
    hiring: { lead: 'Hiring?', body: 'I am currently exploring VP / Head of Data & AI leadership roles — the short version is on the', link: { label: 'hiring page', href: '/hire' } },
    paths: [
      { kind: 'email', label: 'DIRECT EMAIL', actionLabel: 'yoann.leny@gmail.com', href: 'mailto:yoann.leny@gmail.com', description: 'For introductions, project briefs, and longer messages. Best for senior conversations.' },
      { kind: 'linkedin', label: 'LINKEDIN', actionLabel: 'Yoann Leny on LinkedIn', href: 'https://www.linkedin.com/in/yoann-leny-10144b37/', external: true, description: 'For peers, recruiters, and networking. Lower priority than email.' },
      { kind: 'call', label: '30-MINUTE CALL', actionLabel: 'Request a slot', href: 'mailto:yoann.leny@gmail.com?subject=30-minute%20call%20request', description: "A pre-screened slot for serious project conversations. Use the email path first if it's a longer brief." },
    ],
    messageGuide: { eyebrow: "IF WE'RE LIKELY TO WORK TOGETHER", intro: 'A useful first message usually contains four things:', items: ["Where the company is today — stage, size, sector.", "What you've already tried.", "The decision you're trying to make, not the symptom.", 'The horizon — when does this need to be working.'], close: 'Three sentences each is more than enough. Most of the conversation happens after we talk.' },
    expectation: "I read messages within 24 hours, Monday to Friday. I respond to most within 48. If I can't help, I'll usually say so quickly and try to point you toward someone who can.",
    close: { title: 'Quiet conversations.', continuation: 'Better systems.', signature: '— Yoann', location: 'BORDEAUX, FR · GMT+1 · LANGUAGES: EN, FR' },
  },
  fr: {
    title: 'Contact — Yoann Leny',
    description: 'Trois façons de collaborer : architecte en résidence, conseil exécutif, diagnostic et plan de reconstruction. Contact direct et disponibilité actuelle.',
    intro: { eyebrow: 'CONTACT', title: 'La voie la plus rapide est la plus directe.', summary: "Trois chemins ci-dessous — choisissez celui qui correspond à l'échange que vous souhaitez avoir. Je lis chaque message moi-même." },
    hiring: { lead: 'Vous recrutez ?', body: "J'explore actuellement des postes de direction VP Data / Head of Data & AI — la version courte est sur la", link: { label: 'page recrutement', href: '/fr/hire' } },
    paths: [
      { kind: 'email', label: 'E-MAIL DIRECT', actionLabel: 'yoann.leny@gmail.com', href: 'mailto:yoann.leny@gmail.com', description: 'Pour les présentations, les briefs de projets et les messages plus longs. Idéal pour les discussions stratégiques.' },
      { kind: 'linkedin', label: 'LINKEDIN', actionLabel: 'linkedin.com/in/yoann-leny', href: 'https://www.linkedin.com/in/yoann-leny-10144b37/', external: true, description: "Pour les collègues, les recruteurs et le réseautage. Priorité inférieure à l'e-mail." },
      { kind: 'call', label: 'APPEL DE 30 MINUTES', actionLabel: 'Demander un créneau', href: 'mailto:yoann.leny@gmail.com?subject=Demande%20d%27appel%20de%2030%20minutes', description: "Un créneau pré-sélectionné pour des discussions de projet sérieuses. Utilisez d'abord l'e-mail s'il s'agit d'un brief détaillé." },
    ],
    messageGuide: { eyebrow: 'POUR FACILITER NOTRE FUTUR ÉCHANGE', intro: 'Un premier message utile contient généralement quatre éléments :', items: ["Où en est l'entreprise aujourd'hui — étape, taille, secteur.", 'Ce que vous avez déjà essayé.', 'La décision que vous essayez de prendre, pas seulement les symptômes.', "L'horizon — quand cela doit-il être opérationnel."], close: "Trois phrases pour chaque point suffisent amplement. L'essentiel de la conversation se fait de vive voix." },
    expectation: "Je lis les messages sous 24 heures, du lundi au vendredi. Je réponds à la plupart sous 48 heures. Si je ne peux pas vous aider, je vous le dirai rapidement et tenterai de vous orienter vers quelqu'un de compétent.",
    close: { title: 'Discussions calmes.', continuation: 'Meilleurs systèmes.', signature: '— Yoann', location: 'BORDEAUX, FR · GMT+1 · LANGUES : EN, FR, ES' },
  },
  es: {
    title: 'Contacto — Yoann Leny',
    description: 'Tres formas de colaborar: arquitecto en residencia, asesoría ejecutiva, diagnóstico y plan de reconstrucción. Contacto directo y disponibilidad actual.',
    intro: { eyebrow: 'CONTACTO', title: 'La vía más rápida es la directa.', summary: 'Tres caminos a continuación — elija el que mejor se adapte a la conversación que desea tener. Leo cada mensaje personalmente.' },
    hiring: { lead: '¿Contratando?', body: 'Actualmente exploro roles de liderazgo VP de Datos / Head of Data & AI — la versión corta está en la', link: { label: 'página de contratación', href: '/es/hire' } },
    paths: [
      { kind: 'email', label: 'CORREO DIRECTO', actionLabel: 'yoann.leny@gmail.com', href: 'mailto:yoann.leny@gmail.com', description: 'Para presentaciones, resúmenes de proyectos y mensajes más largos. Ideal para discusiones ejecutivas.' },
      { kind: 'linkedin', label: 'LINKEDIN', actionLabel: 'linkedin.com/in/yoann-leny', href: 'https://www.linkedin.com/in/yoann-leny-10144b37/', external: true, description: 'Para colegas, reclutadores y redes de contactos. Menor prioridad que el correo electrónico.' },
      { kind: 'call', label: 'LLAMADA DE 30 MINUTOS', actionLabel: 'Solicitar un horario', href: 'mailto:yoann.leny@gmail.com?subject=Solicitud%20de%20llamada%20de%2030%20minutos', description: 'Un espacio reservado para conversaciones serias de proyectos. Utilice primero el correo electrónico si es un resumen largo.' },
    ],
    messageGuide: { eyebrow: 'SI ES PROBABLE QUE TRABAJEMOS JUNTOS', intro: 'Un primer mensaje útil suele contener cuatro cosas:', items: ['Dónde está la empresa hoy — etapa, tamaño, sector.', 'Qué ha intentado ya.', 'La decisión que intenta tomar, no solo el síntoma.', 'El horizonte — cuándo debe estar funcionando.'], close: 'Tres frases para cada punto es más que suficiente. La mayor parte de la conversación ocurre después de que hablemos.' },
    expectation: 'Leo los mensajes en un plazo de 24 horas, de lunes a viernes. Respondo a la mayoría en 48 horas. Si no puedo ayudarle, se lo diré rápidamente e intentaré orientarle hacia alguien que pueda hacerlo.',
    close: { title: 'Conversaciones tranquilas.', continuation: 'Mejores sistemas.', signature: '— Yoann', location: 'BURDEOS, FR · GMT+1 · IDIOMAS: EN, FR, ES' },
  },
};

const nowPageSources: Record<Locale, NowSourceCopy> = {
  en: {
    title: 'Now — Yoann Leny', description: 'What I am working on this month, what engagements have capacity, and what is fully booked. Updated regularly.',
    intro: { eyebrow: 'UPDATED July 2026', title: "What I'm doing now." },
    lead: { before: 'This is my', link: { label: 'now page', href: 'https://nownownow.com/about', external: true }, after: '. It shows my current priorities and availability.' },
    focus: { title: 'Current Focus', paragraphs: [
      { parts: ['I am currently wrapping up a 12-month engagement architecting a medallion lakehouse and deterministic agentic layer for a global enterprise client. We are entering the transition phase, moving operations from the build pod to the steady-state platform team.'] },
      { parts: ['Outside of client work, my main focus is expanding the ', { label: 'Concept Library', href: '/concepts' }, ' on this site, specifically building out the Agentic AI patterns that hold up in production.'] },
    ] },
    availability: { title: 'Availability', items: [
      { label: 'Leadership roles:', parts: [' I am actively exploring VP of Data / Head of Data & AI roles where the mandate is to build or rebuild the data and AI operating system. The specifics — scope, location, languages — are on the ', { label: 'hiring page', href: '/hire' }, '.'] },
      { label: 'Current engagement:', parts: [' Wrapping up and transitioning to the steady-state team — available for a full-time start within a normal notice period.'] },
    ] },
    reading: { title: 'Reading', before: 'Re-reading ', book: 'Thinking in Systems', after: ' by Donella Meadows, and catching up on the latest papers regarding Model Context Protocol (MCP) implementations in multi-agent frameworks.' },
    cta: { label: 'Start a conversation →', href: '/contact' },
  },
  fr: {
    title: 'En ce moment — Yoann Leny', description: 'Ce sur quoi je travaille ce mois-ci, quels sont les créneaux disponibles pour de nouveaux projets, et ce qui est complet. Mis à jour régulièrement.',
    intro: { eyebrow: 'MIS À JOUR EN Juillet 2026', title: 'Ce que je fais en ce moment.' },
    lead: { before: 'Ceci est ma', link: { label: "page 'now'", href: 'https://nownownow.com/about', external: true }, after: '. Elle présente mes priorités actuelles et mes disponibilités.' },
    focus: { title: 'Objectifs actuels', paragraphs: [
      { parts: ["Je finalise actuellement un projet de 12 mois consacré à l'architecture d'un lakehouse Medallion et d'une couche agentique déterministe pour un client d'envergure internationale. Nous entrons dans la phase de transition, transférant les opérations de l'équipe de construction à l'équipe plateforme permanente."] },
      { parts: ["En dehors de mes projets clients, mon objectif principal est d'enrichir la ", { label: 'Bibliothèque de concepts', href: '/fr/concepts' }, " de ce site, en particulier sur les modèles d'IA agentiques viables en production."] },
    ] },
    availability: { title: 'Disponibilité', items: [
      { label: 'Postes de direction :', parts: [" J'explore activement des rôles de VP Data / Head of Data & AI dont le mandat est de construire ou reconstruire le système d'exploitation data et IA. Les détails — périmètre, localisation, langues — sont sur la ", { label: 'page recrutement', href: '/fr/hire' }, '.'] },
      { label: 'Mission en cours :', parts: [" En phase de transition vers l'équipe pérenne — disponible pour un démarrage à temps plein sous un préavis normal."] },
    ] },
    reading: { title: 'Lectures', before: 'En cours de relecture de ', book: 'Thinking in Systems', after: ' par Donella Meadows, et suivi des derniers articles scientifiques concernant les implémentations du Model Context Protocol (MCP) dans les architectures multi-agents.' },
    cta: { label: 'Démarrer une conversation →', href: '/fr/contact' },
  },
  es: {
    title: 'Ahora — Yoann Leny', description: 'En qué estoy trabajando este mes, qué proyectos tienen capacidad disponible y qué está completamente reservado. Actualizado regularmente.',
    intro: { eyebrow: 'ACTUALIZADO EN Julio de 2026', title: 'Qué estoy haciendo ahora.' },
    lead: { before: 'Esta es mi', link: { label: "página 'now'", href: 'https://nownownow.com/about', external: true }, after: '. Muestra mis prioridades y disponibilidad actuales.' },
    focus: { title: 'Enfoque actual', paragraphs: [
      { parts: ['Actualmente estoy finalizando un proyecto de 12 meses dedicado a la arquitectura de un lakehouse Medallion y una capa agéntica determinista para un cliente corporativo global. Estamos entrando en la fase de transición, trasladando las operaciones desde el equipo de desarrollo al equipo permanente de la plataforma.'] },
      { parts: ['Fuera del trabajo con clientes, mi enfoque principal es expandir la ', { label: 'Biblioteca de conceptos', href: '/es/concepts' }, ' en este sitio, específicamente construyendo los patrones de IA agéntica que se sostienen en producción.'] },
    ] },
    availability: { title: 'Disponibilidad', items: [
      { label: 'Roles de liderazgo:', parts: [' Estoy explorando activamente roles de VP de Datos / Head of Data & AI cuyo mandato sea construir o reconstruir el sistema operativo de datos e IA. Los detalles — alcance, ubicación, idiomas — están en la ', { label: 'página de contratación', href: '/es/hire' }, '.'] },
      { label: 'Proyecto actual:', parts: [' En fase de transición hacia el equipo permanente — disponible para una incorporación a tiempo completo con un preaviso normal.'] },
    ] },
    reading: { title: 'Lecturas', before: 'Releyendo ', book: 'Thinking in Systems', after: ' de Donella Meadows, y poniéndome al día con los últimos artículos sobre implementaciones de Model Context Protocol (MCP) en marcos de trabajo multi-agente.' },
    cta: { label: 'Iniciar una conversación →', href: '/es/contact' },
  },
};

const nowPages = Object.fromEntries(Object.entries(nowPageSources).map(([locale, page]) => [locale, {
  title: page.title,
  description: page.description,
  intro: page.intro,
  primaryCta: page.cta,
  sections: [
    { id: 'lead', kind: 'lead', ...page.lead },
    { id: 'focus', kind: 'focus', ...page.focus },
    { id: 'availability', kind: 'availability', ...page.availability },
    { id: 'reading', kind: 'reading', ...page.reading },
  ],
}])) as Record<Locale, NowCopy>;

const hirePages: Record<Locale, HireCopy> = {
  en: {
    title: 'Hire — Yoann Leny', description: 'Yoann Leny is exploring VP of Data / Head of Data & AI leadership roles. Scope, location, languages, and a concrete first-90-days operating plan.',
    intro: { eyebrow: 'FOR RECRUITERS & HIRING TEAMS', title: 'The five-minute version, for people who hire.', summary: 'I am exploring senior leadership roles where the mandate is to build — or rebuild — the data and AI operating system of the company. This page is the short version; the rest of the site is the evidence.' },
    identityLine: 'YOANN LENY · BORDEAUX, FR',
    facts: [
      { label: 'Target roles', value: 'VP Data · Head of Data & AI · Chief Data Officer' },
      { label: 'Base & mobility', value: 'Bordeaux, FR · remote-first · regular travel across Europe & North America' },
      { label: 'Languages', value: 'English · French' },
      { label: 'Availability', value: 'Full-time start within a normal notice period' },
    ],
    fit: { positiveTitle: 'A strong fit when', positive: ["The data function exists but doesn't compound — tools everywhere, trust nowhere.", 'Agentic AI is on the board agenda and someone has to make it real, governable, and priced.', 'The team is 10–60 people and the operating model, not headcount, is the constraint.', 'You want an operator who ships and runs systems, not a strategist who hands over a deck.'], negativeTitle: 'A poor fit when', negative: ['The role is a caretaker position — keep the dashboards on, change nothing.', 'AI is wanted as theater: demos for the board, no appetite for governance or evaluation.', 'The mandate has responsibility for outcomes but no authority over the operating model.'] },
    plan: {
      eyebrow: 'THE CONCRETE PART', title: 'My first 90 days, in writing.', summary: 'Every candidate says "first I\'d listen." Here is the actual plan I run, phase by phase — the same one I have used to take over data functions before. Click a phase to expand it.', deliverableLabel: 'Deliverable',
      phases: [
        { id: 'phase-1', label: 'Days 1–30', title: 'Listen, map, and find the constraint', items: ['One-to-ones with every direct report, key stakeholders, and the loudest internal critics of the data function.', 'Map the real system: data flows, decision flows, and where they diverge from the org chart.', 'Audit the estate — platforms, pipelines, metric definitions, AI initiatives — for trust, cost, and ownership gaps.', 'Identify the single operational constraint that, if removed, changes the trajectory. There is always exactly one that matters most.'], deliverable: "A written diagnostic the executive team can argue with: what works, what doesn't, what it costs, and the one constraint I propose we attack first." },
        { id: 'phase-2', label: 'Days 31–60', title: 'Ship one visible win, design the target system', items: ['Deliver one fix executives can see — usually a trust win: two dashboards that finally agree, one metric with a contract, one AI workflow with guardrails.', 'Design the target operating system: platform architecture, semantic governance, team topology, and the agentic roadmap — as one design, not four documents.', 'Set the metric baseline: decision latency, data trust incidents, cost per outcome — so progress is measurable rather than narrated.', 'Make the first hard ownership calls: every critical data product gets a name next to it.'], deliverable: 'One shipped improvement, plus a target architecture and operating model the team helped shape and the board can fund.' },
        { id: 'phase-3', label: 'Days 61–90', title: 'Install the operating rhythm', items: ['Stand up the operating cadence: monthly operating review on real delivery-health data, quarterly topology review, metric change process.', 'Start the first structural build from the target design — with the existing team doing the building, not watching consultants do it.', 'Publish the 12-month roadmap with explicit bets, costs, and the assumptions that would change them.', 'Report back against the day-30 diagnostic: what I said, what I did, what I got wrong.'], deliverable: 'A running operating system — cadence, ownership, roadmap — that no longer depends on me being in the room for every decision.' },
      ],
    },
    evidence: { eyebrow: 'EVIDENCE, NOT ADJECTIVES', title: 'Where to check my claims.', links: [
      { label: 'Case studies', href: '/work', description: 'Four production engagements with outcomes, architecture decisions, and what I would do differently.', cta: 'Read the work →' },
      { label: 'Decision log', href: '/decisions', description: "Dated technical bets I made and how they aged — including the ones that didn't.", cta: 'Check my judgment →' },
      { label: 'Concept library', href: '/concepts', description: '50+ maintained entries on data architecture, engineering, BI, and agentic AI — with named opinions.', cta: 'Test my depth →' },
    ] },
    close: { title: "If the mandate is real, let's talk.", primary: { label: 'Email me about a role →', href: 'mailto:yoann.leny@gmail.com?subject=Role%20conversation' }, secondary: { label: 'Reach out on LinkedIn', href: 'https://www.linkedin.com/in/yoann-leny-10144b37/', external: true }, note: 'Full CV available on request — the one-page version arrives within a day.' },
  },
  fr: {
    title: 'Recrutement — Yoann Leny', description: 'Yoann Leny explore des postes de direction VP Data / Head of Data & AI. Périmètre, localisation, langues, et un plan concret des 90 premiers jours.',
    intro: { eyebrow: 'POUR LES RECRUTEURS & ÉQUIPES DE RECRUTEMENT', title: 'La version cinq minutes, pour ceux qui recrutent.', summary: "J'explore des postes de direction dont le mandat est de construire — ou reconstruire — le système d'exploitation data et IA de l'entreprise. Cette page est la version courte ; le reste du site en est la preuve." },
    identityLine: 'YOANN LENY · BORDEAUX, FR',
    facts: [
      { label: 'Postes visés', value: 'VP Data · Head of Data & AI · Chief Data Officer' },
      { label: 'Base & mobilité', value: "Bordeaux, FR · télétravail d'abord · déplacements réguliers en Europe & Amérique du Nord" },
      { label: 'Langues', value: 'Français · Anglais' },
      { label: 'Disponibilité', value: 'Temps plein sous préavis normal' },
    ],
    fit: { positiveTitle: 'Un bon fit quand', positive: ['La fonction data existe mais ne capitalise pas — des outils partout, de la confiance nulle part.', "L'IA agentique est à l'agenda du conseil et quelqu'un doit la rendre réelle, gouvernable et chiffrée.", "L'équipe compte 10 à 60 personnes et la contrainte est le modèle opérationnel, pas les effectifs.", 'Vous voulez un opérateur qui livre et exploite des systèmes, pas un stratège qui remet un rapport.'], negativeTitle: 'Un mauvais fit quand', negative: ['Le poste est un rôle de gardien — maintenir les tableaux de bord, ne rien changer.', "L'IA est voulue comme du théâtre : des démos pour le conseil, aucun appétit pour la gouvernance ou l'évaluation.", 'Le mandat porte la responsabilité des résultats sans autorité sur le modèle opérationnel.'] },
    plan: {
      eyebrow: 'LA PARTIE CONCRÈTE', title: 'Mes 90 premiers jours, par écrit.', summary: "Tous les candidats disent « d'abord, j'écouterai ». Voici le plan réel que je déroule, phase par phase — celui que j'ai déjà utilisé pour reprendre des fonctions data. Cliquez sur une phase pour la détailler.", deliverableLabel: 'Livrable',
      phases: [
        { id: 'phase-1', label: 'Jours 1–30', title: 'Écouter, cartographier, trouver la contrainte', items: ['Entretiens individuels avec chaque collaborateur direct, les parties prenantes clés et les critiques internes les plus virulents de la fonction data.', "Cartographier le système réel : flux de données, flux de décision, et là où ils divergent de l'organigramme.", "Auditer l'existant — plateformes, pipelines, définitions de métriques, initiatives IA — sous l'angle de la confiance, du coût et de la propriété.", 'Identifier la contrainte opérationnelle unique qui, une fois levée, change la trajectoire. Il y en a toujours exactement une qui compte le plus.'], deliverable: "Un diagnostic écrit que le comité de direction peut contester : ce qui fonctionne, ce qui ne fonctionne pas, ce que cela coûte, et la contrainte que je propose d'attaquer en premier." },
        { id: 'phase-2', label: 'Jours 31–60', title: 'Livrer une victoire visible, concevoir le système cible', items: ['Livrer une amélioration que les dirigeants peuvent voir — souvent une victoire de confiance : deux tableaux de bord qui concordent enfin, une métrique sous contrat, un flux IA avec garde-fous.', "Concevoir le système d'exploitation cible : architecture de plateforme, gouvernance sémantique, topologie d'équipe et feuille de route agentique — en une seule conception, pas quatre documents.", 'Établir la base de référence des métriques : latence de décision, incidents de confiance dans les données, coût par résultat — pour que le progrès se mesure au lieu de se raconter.', 'Prendre les premières décisions de propriété : chaque produit de données critique reçoit un nom.'], deliverable: "Une amélioration livrée, plus une architecture cible et un modèle opérationnel que l'équipe a contribué à façonner et que le conseil peut financer." },
        { id: 'phase-3', label: 'Jours 61–90', title: 'Installer le rythme opérationnel', items: ['Mettre en place la cadence : revue opérationnelle mensuelle sur des données réelles de santé de livraison, revue trimestrielle de topologie, processus de changement des métriques.', "Lancer le premier chantier structurel issu de la conception cible — avec l'équipe existante aux commandes, pas des consultants sous observation.", 'Publier la feuille de route à 12 mois avec des paris explicites, des coûts, et les hypothèses qui les modifieraient.', "Rendre compte face au diagnostic du jour 30 : ce que j'ai dit, ce que j'ai fait, ce que je me suis trompé."], deliverable: "Un système d'exploitation qui tourne — cadence, propriété, feuille de route — et qui ne dépend plus de ma présence à chaque décision." },
      ],
    },
    evidence: { eyebrow: 'DES PREUVES, PAS DES ADJECTIFS', title: 'Où vérifier mes affirmations.', links: [
      { label: 'Études de cas', href: '/fr/work', description: "Quatre projets en production avec résultats, décisions d'architecture, et ce que je ferais différemment.", cta: 'Lire les projets →' },
      { label: 'Journal de décisions (EN)', href: '/decisions', description: 'Des paris techniques datés et leur évolution — y compris ceux qui ont mal vieilli.', cta: 'Vérifier mon jugement →' },
      { label: 'Bibliothèque de concepts', href: '/fr/concepts', description: "Plus de 50 entrées maintenues sur l'architecture de données, l'ingénierie, la BI et l'IA agentique — avec des opinions assumées.", cta: 'Tester ma profondeur →' },
    ] },
    close: { title: 'Si le mandat est réel, parlons-en.', primary: { label: "M'écrire au sujet d'un poste →", href: 'mailto:yoann.leny@gmail.com?subject=Conversation%20poste' }, secondary: { label: 'Me contacter sur LinkedIn', href: 'https://www.linkedin.com/in/yoann-leny-10144b37/', external: true }, note: 'CV complet disponible sur demande — la version une page arrive sous 24 h.' },
  },
  es: {
    title: 'Contratación — Yoann Leny', description: 'Yoann Leny explora roles de liderazgo VP de Datos / Head of Data & AI. Alcance, ubicación, idiomas y un plan concreto de los primeros 90 días.',
    intro: { eyebrow: 'PARA RECLUTADORES Y EQUIPOS DE CONTRATACIÓN', title: 'La versión de cinco minutos, para quienes contratan.', summary: 'Estoy explorando roles de liderazgo cuyo mandato sea construir — o reconstruir — el sistema operativo de datos e IA de la empresa. Esta página es la versión corta; el resto del sitio es la evidencia.' },
    identityLine: 'YOANN LENY · BURDEOS, FR',
    facts: [
      { label: 'Roles objetivo', value: 'VP de Datos · Head of Data & AI · Chief Data Officer' },
      { label: 'Base y movilidad', value: 'Burdeos, FR · remoto primero · viajes regulares por Europa y Norteamérica' },
      { label: 'Idiomas', value: 'Francés · Inglés' },
      { label: 'Disponibilidad', value: 'Tiempo completo con preaviso normal' },
    ],
    fit: { positiveTitle: 'Un buen encaje cuando', positive: ['La función de datos existe pero no capitaliza — herramientas en todas partes, confianza en ninguna.', 'La IA agéntica está en la agenda del consejo y alguien tiene que hacerla real, gobernable y con precio.', 'El equipo tiene entre 10 y 60 personas y la restricción es el modelo operativo, no la plantilla.', 'Quieren un operador que entrega y opera sistemas, no un estratega que entrega un informe.'], negativeTitle: 'Un mal encaje cuando', negative: ['El rol es de cuidador — mantener los paneles encendidos, no cambiar nada.', 'La IA se quiere como teatro: demos para el consejo, sin apetito por la gobernanza o la evaluación.', 'El mandato tiene responsabilidad sobre los resultados pero sin autoridad sobre el modelo operativo.'] },
    plan: {
      eyebrow: 'LA PARTE CONCRETA', title: 'Mis primeros 90 días, por escrito.', summary: 'Todos los candidatos dicen «primero escucharía». Este es el plan real que ejecuto, fase por fase — el mismo que he usado para asumir funciones de datos. Haz clic en una fase para expandirla.', deliverableLabel: 'Entregable',
      phases: [
        { id: 'phase-1', label: 'Días 1–30', title: 'Escuchar, mapear y encontrar la restricción', items: ['Reuniones individuales con cada reporte directo, los interesados clave y los críticos internos más duros de la función de datos.', 'Mapear el sistema real: flujos de datos, flujos de decisión, y dónde divergen del organigrama.', 'Auditar el estado actual — plataformas, pipelines, definiciones de métricas, iniciativas de IA — en términos de confianza, coste y propiedad.', 'Identificar la única restricción operativa que, al eliminarse, cambia la trayectoria. Siempre hay exactamente una que importa más.'], deliverable: 'Un diagnóstico escrito que el comité ejecutivo pueda debatir: qué funciona, qué no, cuánto cuesta, y la restricción que propongo atacar primero.' },
        { id: 'phase-2', label: 'Días 31–60', title: 'Entregar una victoria visible, diseñar el sistema objetivo', items: ['Entregar una mejora que los ejecutivos puedan ver — normalmente una victoria de confianza: dos paneles que por fin coinciden, una métrica con contrato, un flujo de IA con límites.', 'Diseñar el sistema operativo objetivo: arquitectura de plataforma, gobernanza semántica, topología de equipo y hoja de ruta agéntica — como un solo diseño, no cuatro documentos.', 'Establecer la línea base de métricas: latencia de decisión, incidentes de confianza en datos, coste por resultado — para que el progreso se mida en lugar de narrarse.', 'Tomar las primeras decisiones de propiedad: cada producto de datos crítico recibe un nombre.'], deliverable: 'Una mejora entregada, más una arquitectura objetivo y un modelo operativo que el equipo ayudó a moldear y que el consejo puede financiar.' },
        { id: 'phase-3', label: 'Días 61–90', title: 'Instalar el ritmo operativo', items: ['Poner en marcha la cadencia: revisión operativa mensual sobre datos reales de salud de entregas, revisión trimestral de topología, proceso de cambio de métricas.', 'Iniciar la primera construcción estructural del diseño objetivo — con el equipo existente construyendo, no viendo construir a consultores.', 'Publicar la hoja de ruta a 12 meses con apuestas explícitas, costes y los supuestos que las cambiarían.', 'Rendir cuentas frente al diagnóstico del día 30: qué dije, qué hice, en qué me equivoqué.'], deliverable: 'Un sistema operativo en marcha — cadencia, propiedad, hoja de ruta — que ya no depende de que yo esté en la sala para cada decisión.' },
      ],
    },
    evidence: { eyebrow: 'EVIDENCIA, NO ADJETIVOS', title: 'Dónde verificar mis afirmaciones.', links: [
      { label: 'Casos de estudio', href: '/es/work', description: 'Cuatro proyectos en producción con resultados, decisiones de arquitectura y lo que haría diferente.', cta: 'Leer los proyectos →' },
      { label: 'Registro de decisiones (EN)', href: '/decisions', description: 'Apuestas técnicas con fecha y cómo envejecieron — incluidas las que salieron mal.', cta: 'Comprobar mi juicio →' },
      { label: 'Biblioteca de conceptos', href: '/es/concepts', description: 'Más de 50 entradas mantenidas sobre arquitectura de datos, ingeniería, BI e IA agéntica — con opiniones con nombre.', cta: 'Probar mi profundidad →' },
    ] },
    close: { title: 'Si el mandato es real, hablemos.', primary: { label: 'Escribirme sobre un rol →', href: 'mailto:yoann.leny@gmail.com?subject=Conversaci%C3%B3n%20sobre%20un%20rol' }, secondary: { label: 'Contactar por LinkedIn', href: 'https://www.linkedin.com/in/yoann-leny-10144b37/', external: true }, note: 'CV completo disponible bajo petición — la versión de una página llega en un día.' },
  },
};

const capabilityPageSources: Record<Locale, CapabilitiesSourceCopy> = {
  en: {
    title: 'Capabilities — Yoann Leny', description: 'Five pillars: agentic AI architecture, data and semantic platforms, strategic data operations, team orchestration, executive enablement. Three engagement modes: architect-in-residence, executive advisory, diagnostic and rebuild plan.',
    intro: { eyebrow: 'CAPABILITIES', title: 'Five practices. One operating logic.', summary: 'Each capability below is a system I have architected, built, and run in production. They compose into a single operating model — but each can be engaged independently when the situation demands it.' },
    practices: [
      { id: 'agentic-ai-architecture', eyebrow: '01 — AGENTIC AI ARCHITECTURE', title: 'Multi-agent systems with deterministic guardrails.', body: 'I design agentic systems that survive production. That means hierarchical agent graphs with clear authority, deterministic guardrails around probabilistic components, audit trails on every action, and human-in-the-loop checkpoints at the points where stakes are highest. The frameworks evolve every quarter — the architectural principles do not.', diagram: 'agents', deliverablesLabel: 'What I deliver in an engagement:', deliverables: ['Agent topology design (orchestrator, specialists, critics, tool-users)', 'Tool catalog and contract design — every tool the agents can call', 'Guardrail layer — deterministic validation, output schemas, escape hatches', 'Memory architecture — short-term, long-term, episodic, where each lives', 'Evaluation harness — how the system is measured before it ships and while it runs', 'Cost and latency budget per agent path', 'Governance model — who approves a new tool, who owns the prompts, how versions are released'], fitLabel: 'Where this fits', fit: 'Companies with one or two working AI prototypes that need to become a governed production capability, or organizations starting from zero who want to skip the demo phase and build for scale.', linksLabel: 'Linked concepts:', links: [{ label: 'Agentic AI Architecture Patterns', href: '/concepts/agentic-ai-architecture-patterns' }, { label: 'Deterministic Guardrails', href: '/concepts/deterministic-guardrails' }, { label: 'Agent Evaluation Frameworks', href: '/concepts/agent-evaluation-frameworks' }], missions: ['Lense Studio', 'Media Data Studio'] },
      { id: 'data-platforms', eyebrow: '02 — DATA & SEMANTIC PLATFORMS', title: 'Lakehouses with a semantic contract on top.', body: "Modern data platforms fail at the same point: between the warehouse and the consumer. I design medallion lakehouses with a governed semantic layer above them — so analytics, ML, and AI agents all consume the same definitions of revenue, churn, and utilization, and no one is debating whether last quarter's number was correct.", diagram: 'medallion', deliverablesLabel: 'What I deliver in an engagement:', deliverables: ['Architecture decision records for the lakehouse (storage format, compute, governance)', 'Bronze / silver / gold zone design with explicit ownership', 'Semantic layer — metric definitions, dimensions, conformed hierarchies, access controls', 'AI-ready metadata — descriptions and synonyms that LLMs can reason over without hallucinating', 'Data contracts on producer interfaces', 'Observability — freshness, volume, schema, distribution', 'Migration plan from legacy, with parallel-run discipline'], fitLabel: 'Where this fits', fit: 'Mid-market and enterprise with messy or fragmented data estates, or growing companies that have outgrown their first warehouse and need a foundation that will not be re-platformed in two years.', linksLabel: 'Linked concepts:', links: [{ label: 'Medallion Architecture', href: '/concepts/medallion-architecture' }, { label: 'Semantic Layer', href: '/concepts/semantic-layer' }, { label: 'Data Contracts', href: '/concepts/data-contracts' }], missions: ['GroupIQ', 'Media Data Studio'] },
      { id: 'strategic-data-ops', eyebrow: '03 — STRATEGIC DATA OPERATIONS', title: 'Treating data as a product, not a service ticket.', body: 'A data team that operates as a service desk will always be reactive and always be underwater. I install the operating model that turns data into a product line: pods with ownership, SLAs and SLOs on the things that matter, contracts on producer interfaces, deprecation policies, and a roadmap that the rest of the business can read.', diagram: 'contracts', deliverablesLabel: 'What I deliver in an engagement:', deliverables: ['Pod and ownership model — who owns what, escalation paths', 'Service-level catalog — freshness, accuracy, availability, support hours', 'Producer-side data contracts and breaking-change policy', 'Intake and prioritization process — replacing ad-hoc Slack with a real queue', 'KPIs for the data team itself (delivery, reliability, satisfaction)', 'Cost attribution model — who pays for what compute, why', 'Quarterly business-review template the data team can present to the executive committee'], fitLabel: 'Where this fits', fit: 'Data teams under 25 people that are growing fast, or established teams that have lost the trust of the business and need to rebuild it on visible, measurable ground.', linksLabel: 'Linked concepts:', links: [{ label: 'Data as a Product', href: '/concepts/data-as-a-product' }, { label: 'Data Contracts', href: '/concepts/data-contracts' }, { label: 'DataOps Maturity Model', href: '/concepts/dataops-maturity' }], missions: ['Cap Ostrea', 'Polaris'] },
      { id: 'team-orchestration', eyebrow: '04 — TEAM ORCHESTRATION', title: 'Designing teams that scale beyond 40 experts.', body: 'Past 25 people, a flat data team breaks. Past 40, a generic engineering org structure breaks too. Data and AI teams need a specific operating model — pods with mixed disciplines, an architectural authority outside the pods, and a delivery rhythm that does not collapse under a multi-region calendar. I have designed and run that model across three regions.', diagram: 'org', deliverablesLabel: 'What I deliver in an engagement:', deliverables: ['Team topology — pods, platform, architecture, enablement', 'Role definitions and career paths — separating IC depth from management', 'Hiring rubric and interview design for data and AI roles', 'Ritual cadence — standups, design reviews, architecture reviews, retros', 'Cross-region operating model — handoffs, shared on-call, decision rights', 'Capacity planning and utilization model', 'Internal observability layer — how leadership sees delivery health'], fitLabel: 'Where this fits', fit: 'Organizations crossing the 25- or 40-person threshold in their data or AI function, or multi-region teams that have lost coherence as they grew.', linksLabel: 'Linked concepts:', links: [{ label: 'Team Topologies for Data Orgs', href: '/concepts/team-topologies' }, { label: 'Designing Teams for Agentic Operations', href: '/insights/designing-teams-for-agentic-operations' }], missions: ['Polaris'] },
      { id: 'executive-enablement', eyebrow: '05 — EXECUTIVE ENABLEMENT', title: 'Turning leadership questions into operating decisions.', body: 'Data and AI investments fail at the executive surface, not the engineering surface. The dashboards are too many, the metrics conflict, the AI initiatives sound impressive but cannot be governed. I install the executive layer: a small set of decision-grade views, a clear AI governance model, and a quarterly cadence that lets a board or an executive committee actually steer the function.', diagram: 'executive', deliverablesLabel: 'What I deliver in an engagement:', deliverables: ['Executive metric set — fewer than ten numbers that decide everything', 'AI portfolio dashboard — what is in production, what is being evaluated, what was sunset', 'AI governance charter — risk tiers, approval gates, audit trails, model cards', 'Quarterly business-review template for the data and AI function', 'Board-grade narratives — not slides, narratives — for the audit and risk committee', 'Executive coaching for non-technical leadership on what to ask and what to ignore'], fitLabel: 'Where this fits', fit: 'Boards, CEOs, and CXOs who feel they are paying significantly for data and AI but cannot make a confident decision about it. Often paired with one of the operating capabilities above.', linksLabel: 'Linked concepts:', links: [{ label: 'AI Governance Frameworks', href: '/concepts/ai-governance-frameworks' }, { label: 'Executive Metric Design', href: '/concepts/executive-metric-design' }, { label: 'Decision Intelligence', href: '/concepts/decision-intelligence' }], missions: ['GroupIQ'] },
    ],
    engagement: { eyebrow: 'ENGAGEMENT', title: 'How a working relationship begins.', summary: 'Three modes, one bar for quality.', columns: ['Mode', 'Shape', 'Typical duration', 'Best for'], modes: [
      { mode: 'Architect-in-residence', shape: 'Embedded one or two days a week as the senior architectural authority.', duration: '6–18 months', bestFor: 'Companies rebuilding their data and AI foundation.' },
      { mode: 'Executive advisory', shape: 'Working with the CEO, CTO, or CDO on a recurring rhythm — strategy, hiring, governance.', duration: '3–12 months', bestFor: 'Leaders who need a senior peer to think with.' },
      { mode: 'Diagnostic & rebuild plan', shape: 'A focused 6–8 week assessment producing an architecture, operating model, and rebuild roadmap.', duration: '6–8 weeks', bestFor: 'Boards and PE operators evaluating an existing function.' },
    ], note: { before: 'I take on a small number of engagements per year. Capacity is announced on the ', link: { label: 'Now', href: '/now' }, after: ' page. For specific availability and rates, the only path is a direct conversation.' } },
    close: { title: 'Capability is just potential.', continuation: 'An operating model is what makes it pay.', primary: { label: 'Start a conversation →', href: '/contact' }, secondary: { label: 'Read recent work', href: '/work' } },
  },
  fr: {
    title: 'Compétences — Yoann Leny', description: "Cinq piliers : architecture d'IA agentique, plateformes de données et sémantiques, opérations de données stratégiques, orchestration d'équipe, activation exécutive. Trois modes d'engagement : architecte en résidence, conseil exécutif, diagnostic et plan de reconstruction.",
    intro: { eyebrow: 'COMPÉTENCES', title: 'Cinq pratiques. Une logique opérationnelle.', summary: "Chaque compétence ci-dessous est un système que j'ai conçu, construit et exploité en production. Ils s'assemblent en un modèle opérationnel unique — mais chacun peut être sollicité de manière indépendante selon les exigences de la situation." },
    practices: [
      { id: 'agentic-ai-architecture', eyebrow: "01 — ARCHITECTURE D'IA AGENTIQUE", title: 'Systèmes multi-agents avec garde-fous déterministes.', body: "Je conçois des systèmes agentiques qui survivent en production. Cela implique des graphes d'agents hiérarchiques avec des lignes d'autorité claires, des garde-fous déterministes autour des composants probabilistes, des pistes d'audit sur chaque action et des points de contrôle avec intervention humaine là où les enjeux sont les plus élevés. Les frameworks évoluent chaque trimestre — les principes d'architecture restent.", diagram: 'agents', deliverablesLabel: "Ce que je livre dans le cadre d'un engagement :", deliverables: ["Conception de la topologie des agents (orchestrateur, spécialistes, critiques, utilisateurs d'outils)", "Catalogue d'outils et conception de contrats — chaque outil que les agents peuvent appeler", 'Couche de garde-fous — validation déterministe, schémas de sortie, procédures de secours', 'Architecture de la mémoire — court terme, long terme, épisodique, et leur localisation', "Dispositif d'évaluation — comment le système est mesuré avant son déploiement et pendant son exécution", "Budget de coût et de latence par parcours d'agent", 'Modèle de gouvernance — qui approuve un nouvel outil, qui possède les prompts, comment les versions sont publiées'], fitLabel: "À qui cela s'adresse", fit: "Les entreprises disposant d'un ou deux prototypes d'IA fonctionnels qui doivent devenir une capacité de production gouvernée, ou les organisations partant de zéro qui souhaitent sauter la phase de démonstration et construire directement pour l'échelle.", linksLabel: 'Concepts liés :', links: [{ label: "Modèles d'architecture d'IA agentique", href: '/fr/concepts/agentic-ai-architecture-patterns' }, { label: 'Garde-fous déterministes', href: '/fr/concepts/deterministic-guardrails' }, { label: "Frameworks d'évaluation des agents", href: '/fr/concepts/agent-evaluation-frameworks' }], missions: ['Lense Studio', 'Media Data Studio'] },
      { id: 'data-platforms', eyebrow: '02 — PLATEFORMES DE DONNÉES & SÉMANTIQUES', title: 'Des lakehouses avec un contrat sémantique supérieur.', body: "Les plateformes de données modernes échouent souvent au même endroit : entre l'entrepôt et l'utilisateur final. Je conçois des lakehouses Medallion surmontés d'une couche sémantique gouvernée — ainsi, l'analyse, le ML et les agents d'IA consomment tous les mêmes définitions du chiffre d'affaires, du taux d'attrition et de l'utilisation. Plus personne ne débat pour savoir si le chiffre du trimestre dernier était correct.", diagram: 'medallion', deliverablesLabel: "Ce que je livre dans le cadre d'un engagement :", deliverables: ["Fiches de décision d'architecture pour le lakehouse (format de stockage, calcul, gouvernance)", 'Conception des zones Bronze / Silver / Gold avec propriété explicite', "Couche sémantique — définitions des métriques, dimensions, hiérarchies harmonisées, contrôles d'accès", "Métadonnées prêtes pour l'IA — descriptions et synonymes que les LLM peuvent interpréter sans halluciner", 'Contrats de données sur les interfaces des producteurs', 'Observabilité — fraîcheur, volume, schéma, distribution', "Plan de migration depuis l'existant, avec rigueur d'exécution en parallèle"], fitLabel: "À qui cela s'adresse", fit: "Les entreprises de taille moyenne et grande ayant un patrimoine de données désorganisé ou fragmenté, ou les entreprises en forte croissance qui ont dépassé leur premier entrepôt et ont besoin d'une base pérenne pour les années à venir.", linksLabel: 'Concepts liés :', links: [{ label: 'Architecture Medallion', href: '/fr/concepts/medallion-architecture' }, { label: 'Couche sémantique', href: '/fr/concepts/semantic-layer' }, { label: 'Contrats de données', href: '/fr/concepts/data-contracts' }], missions: ['GroupIQ', 'Media Data Studio'] },
      { id: 'strategic-data-ops', eyebrow: '03 — OPÉRATIONS STRATÉGIQUES DES DONNÉES', title: "Traiter la donnée comme un produit, pas comme un ticket d'assistance.", body: "Une équipe de données qui fonctionne comme un centre d'assistance sera toujours réactive et toujours submergée. J'installe le modèle opérationnel qui transforme la donnée en une ligne de produits : des équipes autonomes responsables, des SLA et SLO sur ce qui compte, des contrats sur les interfaces des producteurs, des politiques de fin de vie (dépréciation) et une feuille de route lisible par l'ensemble de l'entreprise.", diagram: 'contracts', deliverablesLabel: "Ce que je livre dans le cadre d'un engagement :", deliverables: ["Modèle d'équipe autonome (pod) et de propriété — qui possède quoi, processus d'escalade", 'Catalogue de niveaux de service — fraîcheur, précision, disponibilité, heures de support', 'Contrats de données côté producteur et politique de gestion des changements majeurs', "Processus de réception et de priorisation — remplacement des demandes Slack ad-hoc par une véritable file d'attente", "KPI pour l'équipe de données elle-même (livraison, fiabilité, satisfaction)", "Modèle d'attribution des coûts — qui paie pour quelles ressources de calcul, et pourquoi", "Modèle de revue d'activité trimestrielle que l'équipe de données peut présenter au comité de direction"], fitLabel: "À qui cela s'adresse", fit: "Les équipes de données de moins de 25 personnes qui grandissent rapidement, ou les équipes établies qui ont perdu la confiance de l'entreprise et ont besoin de la reconstruire sur des bases visibles et mesurables.", linksLabel: 'Concepts liés :', links: [{ label: 'La donnée comme produit', href: '/fr/concepts/data-as-a-product' }, { label: 'Contrats de données', href: '/fr/concepts/data-contracts' }, { label: 'Modèle de maturité DataOps', href: '/fr/concepts/dataops-maturity' }], missions: ['Cap Ostrea', 'Polaris'] },
      { id: 'team-orchestration', eyebrow: "04 — ORCHESTRATION D'ÉQUIPE", title: 'Concevoir des équipes capables de dépasser les 40 experts.', body: "Au-delà de 25 personnes, une équipe de données plate ne fonctionne plus. Au-delà de 40, une structure d'ingénierie générique s'effondre également. Les équipes de données et d'IA ont besoin d'un modèle opérationnel spécifique : des pods pluridisciplinaires, une autorité architecturale en dehors des pods et un rythme de livraison qui ne s'effondre pas sous l'effet d'un calendrier multi-régions. J'ai conçu et dirigé ce modèle sur trois régions.", diagram: 'org', deliverablesLabel: "Ce que je livre dans le cadre d'un engagement :", deliverables: ["Topologie d'équipe — pods, plateforme, architecture, accompagnement", "Définitions de rôles et parcours de carrière — séparer l'expertise technique de la gestion managériale", "Grille d'évaluation pour le recrutement et structure des entretiens pour les rôles de données et d'IA", "Cadence des rituels — mêlées (standups), revues de conception, revues d'architecture, rétrospectives", 'Modèle opérationnel cross-régions — transitions, astreintes partagées, droits de décision', "Planification de la capacité et modèle d'utilisation des ressources", "Couche d'observabilité interne — comment la direction suit la santé des livrables"], fitLabel: "À qui cela s'adresse", fit: 'Les organisations franchissant le seuil des 25 ou 40 personnes dans leur fonction données ou IA, ou les équipes multi-régions ayant perdu leur cohérence au cours de leur croissance.', linksLabel: 'Concepts liés :', links: [{ label: "Topologies d'équipe pour les orgs de données", href: '/fr/concepts/team-topologies' }, { label: 'Concevoir des équipes pour des opérations agentiques', href: '/fr/insights/designing-teams-for-agentic-operations' }], missions: ['Polaris'] },
      { id: 'executive-enablement', eyebrow: '05 — ACTIVATION EXÉCUTIVE', title: 'Transformer les questions de leadership en décisions opérationnelles.', body: "Les investissements dans les données et l'IA échouent au niveau de l'interface exécutive, pas de l'ingénierie. Les tableaux de bord sont trop nombreux, les indicateurs sont contradictoires, les initiatives d'IA semblent impressionnantes mais sont ingouvernables. J'installe la couche exécutive : un ensemble restreint de vues prêtes pour la décision, un modèle clair de gouvernance de l'IA et une cadence trimestrielle permettant à un conseil d'administration ou à un comité exécutif de réellement piloter la fonction.", diagram: 'executive', deliverablesLabel: "Ce que je livre dans le cadre d'un engagement :", deliverables: ['Ensemble de métriques exécutives — moins de dix indicateurs qui guident toutes les décisions', "Tableau de bord du portefeuille d'IA — ce qui est en production, ce qui est en cours d'évaluation, ce qui a été arrêté", "Charte de gouvernance de l'IA — niveaux de risque, étapes d'approbation, pistes d'audit, fiches de modèles", "Modèle de revue d'activité trimestrielle pour la fonction données et IA", "Récits de niveau conseil d'administration — des récits écrits, pas des diapositives, pour le comité d'audit et des risques", "Coaching exécutif pour les dirigeants non techniques sur ce qu'il faut demander et ce qu'il faut ignorer"], fitLabel: "À qui cela s'adresse", fit: "Les conseils d'administration, directeurs généraux et cadres dirigeants qui estiment payer cher pour les données et l'IA sans pouvoir prendre de décisions en toute confiance. Souvent combiné avec l'une des compétences opérationnelles ci-dessus.", linksLabel: 'Concepts liés :', links: [{ label: "Cadres de gouvernance de l'IA", href: '/fr/concepts/ai-governance-frameworks' }, { label: 'Conception de métriques exécutives', href: '/fr/concepts/executive-metric-design' }, { label: 'Intelligence décisionnelle', href: '/fr/concepts/decision-intelligence' }], missions: ['GroupIQ'] },
    ],
    engagement: { eyebrow: 'ENGAGEMENT', title: 'Comment débute notre collaboration.', summary: 'Trois modes, une seule exigence de qualité.', columns: ['Mode', 'Format', 'Durée type', 'Recommandé pour'], modes: [
      { mode: 'Architecte en résidence', shape: "Intégré un ou deux jours par semaine en tant qu'autorité architecturale principale.", duration: '6–18 mois', bestFor: "Les entreprises reconstruisant leur base de données et d'IA." },
      { mode: 'Conseil exécutif', shape: 'Collaboration avec le PDG, le CTO ou le CDO selon un rythme récurrent — stratégie, recrutement, gouvernance.', duration: '3–12 mois', bestFor: "Les dirigeants qui ont besoin d'un pair expérimenté avec qui réfléchir." },
      { mode: 'Diagnostic & plan de reconstruction', shape: 'Une évaluation ciblée de 6 à 8 semaines produisant une architecture, un modèle opérationnel et une feuille de route de reconstruction.', duration: '6–8 semaines', bestFor: "Les conseils d'administration et les opérateurs de capital-investissement (PE) évaluant une fonction existante." },
    ], note: { before: "Je m'engage sur un petit nombre de projets par an. La capacité disponible est annoncée sur la page ", link: { label: 'En ce moment', href: '/fr/now' }, after: '. Pour connaître les disponibilités et les tarifs spécifiques, la seule voie est une conversation directe.' } },
    close: { title: "La compétence n'est qu'un potentiel.", continuation: 'Un modèle opérationnel est ce qui la rend rentable.', primary: { label: 'Démarrer une conversation →', href: '/fr/contact' }, secondary: { label: 'Découvrir mes projets récents', href: '/fr/work' } },
  },
  es: {
    title: 'Competencias — Yoann Leny', description: 'Cinco pilares: arquitectura de IA agéntica, plataformas de datos y semánticas, operaciones estratégicas de datos, orquestación de equipos, habilitación ejecutiva. Tres modos de contratación: arquitecto en residencia, asesoría ejecutiva, diagnóstico y plan de reconstrucción.',
    intro: { eyebrow: 'COMPETENCIAS', title: 'Cinco prácticas. Una lógica operativa.', summary: 'Cada competencia a continuación es un sistema que he diseñado, construido y ejecutado en producción. Se integran en un único modelo operativo, pero cada una puede contratarse de forma independiente cuando la situación lo requiera.' },
    practices: [
      { id: 'agentic-ai-architecture', eyebrow: '01 — ARQUITECTURA DE IA AGÉNTICA', title: 'Sistemas multi-agente con límites deterministas.', body: 'Diseño sistemas agénticos que sobreviven en producción. Eso significa gráficos de agentes jerárquicos con autoridad clara, límites deterministas alrededor de componentes probabilísticos, pistas de auditoría en cada acción y puntos de control con intervención humana donde hay más en juego. Los marcos de trabajo evolucionan cada trimestre — los principios de arquitectura no.', diagram: 'agents', deliverablesLabel: 'Lo que entrego en un proyecto:', deliverables: ['Diseño de topología de agentes (orquestador, especialistas, críticos, usuarios de herramientas)', 'Catálogo de herramientas y diseño de contratos — cada herramienta que los agentes pueden llamar', 'Capa de límites (guardrails) — validación determinista, esquemas de salida, alternativas de escape', 'Arquitectura de memoria — a corto plazo, a largo plazo, episódica, y dónde reside cada una', 'Dispositivo de evaluación — cómo se mide el sistema antes de su despliegue y mientras se ejecuta', 'Presupuesto de costo y latencia por ruta de agente', 'Modelo de gobernanza — quién aprueba una nueva herramienta, quién es el propietario de los prompts, cómo se lanzan las versiones'], fitLabel: 'A quién se dirige', fit: 'Empresas con uno o dos prototipos de IA en funcionamiento que necesitan convertirse en una capacidad de producción gobernada, u organizaciones que empiezan desde cero y quieren saltarse la fase de demostración para construir directamente a escala.', linksLabel: 'Conceptos relacionados:', links: [{ label: 'Patrones de arquitectura de IA agéntica', href: '/es/concepts/agentic-ai-architecture-patterns' }, { label: 'Límites deterministas', href: '/es/concepts/deterministic-guardrails' }, { label: 'Marcos de evaluación de agentes', href: '/es/concepts/agent-evaluation-frameworks' }], missions: ['Lense Studio', 'Media Data Studio'] },
      { id: 'data-platforms', eyebrow: '02 — PLATAFORMAS DE DATOS & SEMÁNTICAS', title: 'Lakehouses con un contrato semántico superior.', body: 'Las plataformas de datos modernas fallan en el mismo punto: entre el almacén de datos y el usuario final. Diseño lakehouses Medallion con una capa semántica gobernada por encima — para que la analítica, el ML y los agentes de IA consuman las mismas definiciones de ingresos, abandono (churn) y uso, y nadie discuta si la cifra del trimestre pasado era correcta.', diagram: 'medallion', deliverablesLabel: 'Lo que entrego en un proyecto:', deliverables: ['Registros de decisiones de arquitectura para el lakehouse (formato de almacenamiento, computación, gobernanza)', 'Diseño de zonas Bronze / Silver / Gold con propiedad explícita', 'Capa semántica — definiciones de métricas, dimensiones, jerarquías armonizadas, controles de acceso', 'Metadatos listos para IA — descripciones y sinónimos que los LLM pueden procesar sin alucinar', 'Contratos de datos en las interfaces de los productores', 'Observabilidad — frescura, volumen, esquema, distribución', 'Plan de migración desde sistemas heredados, con ejecución disciplinada en paralelo'], fitLabel: 'A quién se dirige', fit: 'Empresas medianas y grandes con un patrimonio de datos desorganizado o fragmentado, o empresas en crecimiento que han superado su primer almacén de datos y necesitan una base que no requiera un cambio de plataforma en dos años.', linksLabel: 'Conceptos relacionados:', links: [{ label: 'Arquitectura Medallion', href: '/es/concepts/medallion-architecture' }, { label: 'Capa semántica', href: '/es/concepts/semantic-layer' }, { label: 'Contratos de datos', href: '/es/concepts/data-contracts' }], missions: ['GroupIQ', 'Media Data Studio'] },
      { id: 'strategic-data-ops', eyebrow: '03 — OPERACIONES ESTRATÉGICAS DE DATOS', title: 'Tratar los datos como un producto, no como un ticket de soporte.', body: 'Un equipo de datos que funcione como un centro de soporte siempre será reactivo y siempre estará desbordado. Instalo el modelo operativo que convierte los datos en una línea de productos: pods con propiedad clara, SLA y SLO en las cosas que importan, contratos en las interfaces de los productores, políticas de depreciación y una hoja de ruta que el resto de la empresa pueda entender.', diagram: 'contracts', deliverablesLabel: 'Lo que entrego en un proyecto:', deliverables: ['Pods y modelo de propiedad — quién posee qué, rutas de escalada', 'Catálogo de niveles de servicio — frescura, precisión, disponibilidad, horas de soporte', 'Contratos de datos del lado del productor y política de cambios importantes', 'Proceso de recepción y priorización — sustitución de solicitudes de Slack ad-hoc por una cola real', 'KPI para el propio equipo de datos (entrega, fiabilidad, satisfacción)', 'Modelo de atribución de costos — quién paga por qué computación, por qué', 'Plantilla de revisión de negocio trimestral que el equipo de datos puede presentar al comité ejecutivo'], fitLabel: 'A quién se dirige', fit: 'Equipos de datos de menos de 25 personas que crecen rápidamente, o equipos establecidos que han perdido la confianza de la empresa y necesitan reconstruirla sobre bases visibles y medibles.', linksLabel: 'Conceptos relacionados:', links: [{ label: 'Datos como producto', href: '/es/concepts/data-as-a-product' }, { label: 'Contratos de datos', href: '/es/concepts/data-contracts' }, { label: 'Modelo de madurez de DataOps', href: '/es/concepts/dataops-maturity' }], missions: ['Cap Ostrea', 'Polaris'] },
      { id: 'team-orchestration', eyebrow: '04 — ORQUESTACIÓN DE EQUIPOS', title: 'Diseño de equipos que escalan más allá de los 40 expertos.', body: 'Más allá de las 25 personas, un equipo de datos plano deja de funcionar. Más allá de las 40, una estructura de ingeniería genérica también se rompe. Los equipos de datos e IA necesitan un modelo operativo específico: pods con disciplinas mixtas, una autoridad de arquitectura fuera de los pods y un ritmo de entrega que no colapse bajo un calendario multi-región. He diseñado y dirigido ese modelo en tres regiones.', diagram: 'org', deliverablesLabel: 'Lo que entrego en un proyecto:', deliverables: ['Topología de equipo — pods, plataforma, arquitectura, habilitación', 'Definición de roles y trayectorias profesionales — separando la profundidad de contribución individual (IC) de la gestión', 'Rúbrica de contratación y diseño de entrevistas para roles de datos e IA', 'Cadencia de ritos — standups, revisiones de diseño, revisiones de arquitectura, retrospectivas', 'Modelo operativo multi-región — transferencias, guardias compartidas, derechos de decisión', 'Planificación de capacidad y modelo de uso de recursos', 'Capa de observabilidad interna — cómo ve el liderazgo la salud de las entregas'], fitLabel: 'A quién se dirige', fit: 'Organizaciones que cruzan el umbral de 25 o 40 personas en su función de datos o IA, o equipos multi-región que han perdido coherencia a medida que crecían.', linksLabel: 'Conceptos relacionados:', links: [{ label: 'Topologías de equipo para organizaciones de datos', href: '/es/concepts/team-topologies' }, { label: 'Diseño de equipos para operaciones agénticas', href: '/es/insights/designing-teams-for-agentic-operations' }], missions: ['Polaris'] },
      { id: 'executive-enablement', eyebrow: '05 — HABILITACIÓN EJECUTIVA', title: 'Convertir las preguntas de liderazgo en decisiones operativas.', body: 'Las inversiones en datos e IA fallan en la superficie ejecutiva, no en la de ingeniería. Los paneles de control son demasiados, las métricas entran en conflicto, las iniciativas de IA suenan impresionantes pero no se pueden gobernar. Instalo la capa ejecutiva: un pequeño conjunto de vistas listas para la toma de decisiones, un modelo claro de gobernanza de la IA y una cadencia trimestral que permite a un consejo de administración o a un comité ejecutivo dirigir realmente la función.', diagram: 'executive', deliverablesLabel: 'Lo que entrego en un proyecto:', deliverables: ['Conjunto de métricas ejecutivas — menos de diez números que lo deciden todo', 'Panel de cartera de IA — qué está en producción, qué se está evaluando, qué se descartó', 'Carta de gobernanza de IA — niveles de riesgo, puertas de aprobación, pistas de auditoría, tarjetas de modelo', 'Plantilla de revisión de negocio trimestral para la función de datos e IA', 'Narrativas de nivel de junta directiva — narrativas escritas, no diapositivas, para el comité de auditoría y riesgos', 'Coaching ejecutivo para líderes no técnicos sobre qué preguntar y qué ignorar'], fitLabel: 'A quién se dirige', fit: 'Consejos de administración, CEOs y CXO que sienten que están pagando significativamente por datos e IA pero no pueden tomar una decisión con confianza. A menudo se combina con una de las capacidades operativas anteriores.', linksLabel: 'Conceptos relacionados:', links: [{ label: 'Marcos de gobernanza de IA', href: '/es/concepts/ai-governance-frameworks' }, { label: 'Diseño de métricas ejecutivas', href: '/es/concepts/executive-metric-design' }, { label: 'Inteligencia de decisión', href: '/es/concepts/decision-intelligence' }], missions: ['GroupIQ'] },
    ],
    engagement: { eyebrow: 'CONTRATACIÓN', title: 'Cómo comienza una relación de trabajo.', summary: 'Tres modos, un solo estándar de calidad.', columns: ['Modo', 'Formato', 'Duración típica', 'Recomendado para'], modes: [
      { mode: 'Arquitecto en residencia', shape: 'Integrado uno o dos días a la semana como la autoridad arquitectónica principal.', duration: '6–18 meses', bestFor: 'Empresas que reconstruyen su base de datos y de IA.' },
      { mode: 'Asesoría ejecutiva', shape: 'Trabajando con el CEO, CTO o CDO en un ritmo recurrente: estrategia, contratación, gobernanza.', duration: '3–12 meses', bestFor: 'Líderes que necesitan un par senior para pensar juntos.' },
      { mode: 'Diagnóstico y plan de reconstrucción', shape: 'Una evaluación enfocada de 6 a 8 semanas que produce una arquitectura, modelo operativo y hoja de ruta de reconstrucción.', duration: '6–8 semanas', bestFor: 'Consejos de administración y operadores de PE que evalúan una función existente.' },
    ], note: { before: 'Acepto un número reducido de compromisos al año. La capacidad disponible se anuncia en la página ', link: { label: 'Ahora', href: '/es/now' }, after: '. Para conocer la disponibilidad y tarifas específicas, el único camino es una conversación directa.' } },
    close: { title: 'La capacidad es solo potencial.', continuation: 'Un modelo operativo es lo que la hace rentable.', primary: { label: 'Iniciar una conversación →', href: '/es/contact' }, secondary: { label: 'Ver proyectos recientes', href: '/es/work' } },
  },
};

const capabilitySignals: Record<CapabilityPracticeId, CinematicSignal> = {
  'agentic-ai-architecture': 'intelligence',
  'data-platforms': 'outcome',
  'strategic-data-ops': 'change',
  'team-orchestration': 'change',
  'executive-enablement': 'intelligence',
};

const withCapabilitySignals = (source: CapabilitiesSourceCopy): CapabilitiesCopy => ({
  ...source,
  practices: source.practices.map((practice) => ({
    ...practice,
    signal: capabilitySignals[practice.id],
  })),
});

const capabilitiesPages: Record<Locale, CapabilitiesCopy> = {
  en: withCapabilitySignals(capabilityPageSources.en),
  fr: withCapabilitySignals(capabilityPageSources.fr),
  es: withCapabilitySignals(capabilityPageSources.es),
};

const legalPages: Record<Locale, LegalPagesCopy> = {
  en: {
    privacy: {
      title: 'Privacy — Yoann Leny',
      description: 'Privacy policy for yoannleny.com.',
      eyebrow: 'PRIVACY',
      heading: "Short, because there isn't much to say.",
      paragraphs: [
        [{ text: 'This site is a static website. It has no user accounts, no forms that store data, no advertising, and no newsletter pop-ups.' }],
        [
          { text: 'No tracking cookies.', strong: true },
          { text: ' The site does not set cookies for analytics or advertising. Your language preference is stored locally in your own browser (localStorage) and never leaves it.' },
        ],
        [
          { text: 'Email.', strong: true },
          { text: " If you email me, I keep the correspondence like any professional correspondence. I don't add you to any list." },
        ],
        [
          { text: 'Hosting.', strong: true },
          { text: ' The hosting provider may log requests (IP address, user agent) for security and operations, as virtually all hosting does.' },
        ],
        [
          { text: 'Questions: ' },
          { text: 'yoann.leny@gmail.com', href: 'mailto:yoann.leny@gmail.com' },
          { text: '.' },
        ],
      ],
    },
    imprint: {
      title: 'Imprint — Yoann Leny',
      description: 'Legal notice for yoannleny.com.',
      eyebrow: 'IMPRINT',
      heading: 'Legal notice.',
      paragraphs: [
        [
          { text: 'Publisher.', strong: true },
          { text: ' Yoann Leny, Bordeaux, France.' },
        ],
        [
          { text: 'Contact.', strong: true },
          { text: ' ' },
          { text: 'yoann.leny@gmail.com', href: 'mailto:yoann.leny@gmail.com' },
        ],
        [
          { text: 'Content.', strong: true },
          { text: ' All content on this site — essays, concept entries, case studies — is written and maintained by Yoann Leny unless otherwise noted. Opinions are my own.' },
        ],
        [
          { text: 'Trademarks.', strong: true },
          { text: ' Product and company names mentioned (Databricks, Snowflake, dbt, and others) are trademarks of their respective owners and are referenced for identification only.' },
        ],
      ],
    },
  },
  fr: {
    privacy: {
      title: 'Confidentialité — Yoann Leny',
      description: 'Politique de confidentialité de yoannleny.com.',
      eyebrow: 'CONFIDENTIALITÉ',
      heading: "Court, parce qu'il n'y a pas grand-chose à dire.",
      paragraphs: [
        [{ text: "Ce site est un site statique. Il n'a ni comptes utilisateurs, ni formulaires stockant des données, ni publicité, ni pop-ups de newsletter." }],
        [
          { text: 'Aucun cookie de suivi.', strong: true },
          { text: " Le site ne dépose aucun cookie d'analyse ou de publicité. Votre préférence de langue est stockée localement dans votre navigateur (localStorage) et ne le quitte jamais." },
        ],
        [
          { text: 'E-mail.', strong: true },
          { text: " Si vous m'écrivez, je conserve la correspondance comme toute correspondance professionnelle. Je ne vous ajoute à aucune liste." },
        ],
        [
          { text: 'Hébergement.', strong: true },
          { text: " L'hébergeur peut journaliser les requêtes (adresse IP, user agent) à des fins de sécurité et d'exploitation, comme pratiquement tout hébergement." },
        ],
        [
          { text: 'Questions : ' },
          { text: 'yoann.leny@gmail.com', href: 'mailto:yoann.leny@gmail.com' },
          { text: '.' },
        ],
      ],
    },
    imprint: {
      title: 'Mentions légales — Yoann Leny',
      description: 'Mentions légales de yoannleny.com.',
      eyebrow: 'MENTIONS LÉGALES',
      heading: 'Mentions légales.',
      paragraphs: [
        [
          { text: 'Éditeur.', strong: true },
          { text: ' Yoann Leny, Bordeaux, France.' },
        ],
        [
          { text: 'Contact.', strong: true },
          { text: ' ' },
          { text: 'yoann.leny@gmail.com', href: 'mailto:yoann.leny@gmail.com' },
        ],
        [
          { text: 'Contenu.', strong: true },
          { text: " Tout le contenu de ce site — essais, entrées de la bibliothèque de concepts, études de cas — est rédigé et maintenu par Yoann Leny, sauf mention contraire. Les opinions n'engagent que moi." },
        ],
        [
          { text: 'Marques.', strong: true },
          { text: " Les noms de produits et d'entreprises cités (Databricks, Snowflake, dbt et autres) sont des marques de leurs propriétaires respectifs, référencées à des fins d'identification uniquement." },
        ],
      ],
    },
  },
  es: {
    privacy: {
      title: 'Privacidad — Yoann Leny',
      description: 'Política de privacidad de yoannleny.com.',
      eyebrow: 'PRIVACIDAD',
      heading: 'Corto, porque no hay mucho que decir.',
      paragraphs: [
        [{ text: 'Este es un sitio web estático. No tiene cuentas de usuario, ni formularios que almacenen datos, ni publicidad, ni pop-ups de newsletter.' }],
        [
          { text: 'Sin cookies de rastreo.', strong: true },
          { text: ' El sitio no instala cookies de analítica ni de publicidad. Tu preferencia de idioma se guarda localmente en tu navegador (localStorage) y nunca sale de él.' },
        ],
        [
          { text: 'Correo.', strong: true },
          { text: ' Si me escribes, conservo la correspondencia como cualquier correspondencia profesional. No te añado a ninguna lista.' },
        ],
        [
          { text: 'Alojamiento.', strong: true },
          { text: ' El proveedor de alojamiento puede registrar solicitudes (dirección IP, user agent) por seguridad y operaciones, como prácticamente todo alojamiento.' },
        ],
        [
          { text: 'Preguntas: ' },
          { text: 'yoann.leny@gmail.com', href: 'mailto:yoann.leny@gmail.com' },
          { text: '.' },
        ],
      ],
    },
    imprint: {
      title: 'Aviso legal — Yoann Leny',
      description: 'Aviso legal de yoannleny.com.',
      eyebrow: 'AVISO LEGAL',
      heading: 'Aviso legal.',
      paragraphs: [
        [
          { text: 'Editor.', strong: true },
          { text: ' Yoann Leny, Burdeos, Francia.' },
        ],
        [
          { text: 'Contacto.', strong: true },
          { text: ' ' },
          { text: 'yoann.leny@gmail.com', href: 'mailto:yoann.leny@gmail.com' },
        ],
        [
          { text: 'Contenido.', strong: true },
          { text: ' Todo el contenido de este sitio — ensayos, entradas de la biblioteca de conceptos, casos de estudio — está redactado y mantenido por Yoann Leny, salvo indicación contraria. Las opiniones son propias.' },
        ],
        [
          { text: 'Marcas.', strong: true },
          { text: ' Los nombres de productos y empresas mencionados (Databricks, Snowflake, dbt y otros) son marcas de sus respectivos propietarios y se citan únicamente con fines de identificación.' },
        ],
      ],
    },
  },
};

export const localizedSite: Record<Locale, LocalizedSiteCopy> = {
  en: {
    about: aboutPages.en,
    capabilitiesPage: capabilitiesPages.en,
    contact: contactPages.en,
    hire: hirePages.en,
    now: nowPages.en,
    legal: legalPages.en,
    achievementLabels: {
      evidence: 'Evidence',
      sector: 'Sector',
      context: 'Context',
      capabilities: 'Capabilities demonstrated',
    },
    home: {
      title: 'Yoann Leny — Data & AI executive leader',
      description: 'Data and AI leadership across strategy, platforms, products, and operating models. Explore selected achievements and production case studies.',
      hero: {
        availability: 'Open to senior Data & AI leadership roles',
        location: 'Bordeaux · Europe',
        roleLabel: 'VP / Head of Data & AI',
        headline: 'I build the data and AI systems leaders can trust.',
        summary: 'I turn fragmented data, emerging AI, and distributed teams into a clear operating advantage—connecting strategy, platforms, and the way work actually gets done.',
        primaryLabel: 'Discuss a role',
        secondaryLabel: 'Review achievements',
        portraitAlt: 'Portrait of Yoann Leny',
        briefLabel: 'Recruiter brief',
        fitLabel: '01 / Fit',
        briefAriaLabel: 'Recruiter brief',
        roleTerm: 'Role',
        roleValue: 'Data & AI executive leadership',
        scopeTerm: 'Scope',
        scopeValue: 'Strategy, platforms, products, teams',
        reachTerm: 'Reach',
        reachValue: 'International · English / French / Spanish',
        orbitLabel: 'YOANN LENY · DATA & AI LEADERSHIP · STRATEGY · SYSTEMS · ADOPTION · ',
        decisionTrace: {
          label: 'The decision trace',
          principle: 'Strategy is only real when a team can run it on Monday.',
          steps: [
            { label: '01 / Direction', title: 'Frame the real decision', signal: 'change' },
            { label: '02 / System', title: 'Build what enables it', signal: 'intelligence' },
            { label: '03 / Adoption', title: 'Make the change visible', signal: 'outcome' },
          ],
        },
      },
      proof: {
        title: 'Published proof',
        note: 'Figures summarized from the supporting case material on this site.',
        metrics: [
          { value: '40+', label: 'experts led' },
          { value: '3 regions', label: 'international scope' },
          { value: '$13M+', label: 'attributed impact' },
        ],
      },
      achievements: {
        eyebrow: '02 / Evidence',
        heading: 'Products that make the claim concrete.',
        summary: 'Five named achievements across regulated reporting, people operations, analytics quality, marketplaces, and media data architecture.',
        linkLabel: 'Open the complete work register',
      },
      capabilities: {
        eyebrow: '03 / Capability map',
        heading: 'Capabilities, attached to proof.',
        summary: 'Recruiters should not have to infer the link between a skill and where it has been applied.',
        linkLabel: 'Explore the full practice',
        evidenceLabel: 'Evidence',
        items: [
          { mandate: 'Make data useful to leaders', practice: 'Executive reporting, semantic layers, and decision products that make performance legible.', evidence: ['GroupIQ', 'Polaris'] },
          { mandate: 'Put AI into reliable operation', practice: 'Agentic systems, governed context, evaluation, and human control where decisions carry weight.', evidence: ['Lense Studio', 'Media Data Studio'] },
          { mandate: 'Turn platforms into adoption', practice: 'Product strategy, operating models, and team rituals that move a system from delivery to daily use.', evidence: ['Cap Ostrea', 'Polaris'] },
        ],
      },
      fit: {
        eyebrow: '04 / Recruiter fit',
        heading: 'The right mandate is bigger than a tool choice.',
        summary: 'I am most useful where a leadership team needs to connect business direction with data and AI delivery—and leave behind an operating system the organization can actually run.',
        items: ['Executive ownership of a data and AI transformation', 'A platform or product portfolio that needs sharper adoption', 'A distributed team that needs a scalable operating model'],
        primaryLabel: 'Discuss a role',
        secondaryLabel: 'Leadership approach',
      },
      thinking: {
        eyebrow: '05 / Thinking',
        heading: 'How I make decisions.',
        linkLabel: 'Browse all thinking',
        readLabel: 'Read essay',
        items: [
          { label: 'Agentic operations', title: 'Why most agent demos collapse in production', slug: 'why-most-agent-demos-collapse-in-production' },
          { label: 'Data products', title: 'Data as a product, three years on', slug: 'data-as-a-product-three-years-on' },
          { label: 'Executive systems', title: 'The ten numbers on a CEO dashboard', slug: 'ten-numbers-ceo-dashboard' },
        ],
      },
      close: {
        eyebrow: '06 / Next conversation',
        heading: "If the mandate needs both strategic range and operating depth, let's talk.",
        cta: 'Discuss a role',
      },
    },
    work: {
      title: 'Selected achievements — Yoann Leny',
      description: 'Five products and operating systems across data, AI, reporting, people operations, media, and marketplaces — with detailed case studies in preparation.',
      intro: {
        eyebrow: 'Selected achievements',
        heading: 'Work built to change how teams operate.',
        summary: 'A working portfolio of products, platforms, and operating systems. The named dossiers below are being prepared for publication; supporting case studies remain available now.',
      },
      register: {
        eyebrow: 'Evidence register / 2026',
        heading: 'Five missions, one operating thesis.',
        summary: 'Each entry will expand with the problem, decisions, artefacts, and measurable outcome once publishable.',
      },
      supporting: {
        heading: 'Supporting case studies',
        summary: 'Anonymized production examples that show the architecture, operating choices, and outcomes behind the broader practice.',
        cards: [
          { pattern: 'agents', tag: 'Agentic AI · Operating model', title: 'Multi-Agent Skill Tracker', description: 'A hierarchical agent system maintaining a live skills graph for 40+ consultants and supporting staffing decisions across three regions.', metrics: [{ value: '40+', label: 'experts' }, { value: '3', label: 'regions' }, { value: '-22%', label: 'bench time' }], slug: 'multi-agent-skill-tracker' },
          { pattern: 'layers', tag: 'Data platform · Governance', title: 'Enterprise Medallion Stack', description: 'A governed bronze–silver–gold lakehouse with one semantic layer for analytics, machine learning, and agent workflows.', metrics: [{ value: '$13M+', label: 'impact' }, { value: '9 mo', label: 'payback' }, { value: '0', label: 'KPI drift' }], slug: 'enterprise-medallion-stack' },
          { pattern: 'semantic', tag: 'Semantic layer · AI', title: 'AI-Ready Semantic Layer', description: 'A metric layer redesigned for LLM and agent consumption, standardizing how AI systems read the business.', metrics: [{ value: '47', label: 'metrics' }, { value: '4', label: 'AI consumers' }, { value: '0', label: 'KPI drift' }], slug: 'ai-ready-semantic-layer' },
          { pattern: 'org', tag: 'Leadership · Operating model', title: 'Global Data Ops Scaling Model', description: 'An operating model for a distributed data function: pod design, role boundaries, delivery rituals, and a view of organizational health.', metrics: [{ value: '40+', label: 'experts' }, { value: '3', label: 'regions' }, { value: '4 Q', label: 'to steady state' }], slug: 'global-data-ops-scaling-model' },
        ],
      },
      close: { heading: 'Need the fuller version for a role or mandate?', cta: 'Discuss a role' },
    },
  },
  fr: {
    about: aboutPages.fr,
    capabilitiesPage: capabilitiesPages.fr,
    contact: contactPages.fr,
    hire: hirePages.fr,
    now: nowPages.fr,
    legal: legalPages.fr,
    achievementLabels: {
      evidence: 'Preuve',
      sector: 'Secteur',
      context: 'Contexte',
      capabilities: 'Compétences démontrées',
    },
    home: {
      title: 'Yoann Leny — Dirigeant Data & IA',
      description: "Leadership Data et IA, de la stratégie aux plateformes, produits et modèles opérationnels. Découvrez une sélection de réalisations et d'études de cas.",
      hero: {
        availability: 'Ouvert aux postes de direction Data & IA',
        location: 'Bordeaux · Europe',
        roleLabel: 'VP / Head of Data & IA',
        headline: 'Je construis les systèmes Data et IA sur lesquels les dirigeants peuvent compter.',
        summary: "Je transforme des données fragmentées, une IA émergente et des équipes distribuées en avantage opérationnel clair — en reliant stratégie, plateformes et réalité du travail.",
        primaryLabel: 'Échanger sur un poste',
        secondaryLabel: 'Voir les réalisations',
        portraitAlt: 'Portrait de Yoann Leny',
        briefLabel: 'Repères recruteur',
        fitLabel: '01 / Profil',
        briefAriaLabel: 'Repères pour les recruteurs',
        roleTerm: 'Rôle',
        roleValue: 'Direction exécutive Data & IA',
        scopeTerm: 'Périmètre',
        scopeValue: 'Stratégie, plateformes, produits, équipes',
        reachTerm: 'Portée',
        reachValue: 'International · Français / Anglais / Espagnol',
        orbitLabel: 'YOANN LENY · DIRECTION DATA & IA · STRATÉGIE · SYSTÈMES · ADOPTION · ',
        decisionTrace: {
          label: 'La trajectoire de décision',
          principle: 'Une stratégie n’est réelle que lorsqu’une équipe peut l’exécuter dès lundi.',
          steps: [
            { label: '01 / Direction', title: 'Cadrer la vraie décision', signal: 'change' },
            { label: '02 / Système', title: 'Construire ce qui la rend possible', signal: 'intelligence' },
            { label: '03 / Adoption', title: 'Rendre le changement visible', signal: 'outcome' },
          ],
        },
      },
      proof: {
        title: 'Preuves publiées',
        note: 'Chiffres issus des études de cas présentées sur ce site.',
        metrics: [
          { value: '40+', label: 'experts dirigés' },
          { value: '3 régions', label: 'portée internationale' },
          { value: '13 M$+', label: 'impact attribué' },
        ],
      },
      achievements: {
        eyebrow: '02 / Preuves',
        heading: 'Des produits qui rendent la promesse concrète.',
        summary: "Cinq réalisations nommées dans le reporting réglementé, les opérations RH, la qualité analytique, les marketplaces et l'architecture data média.",
        linkLabel: 'Voir le registre complet',
      },
      capabilities: {
        eyebrow: '03 / Carte des compétences',
        heading: 'Des compétences reliées à des preuves.',
        summary: "Un recruteur ne devrait pas avoir à deviner le lien entre une compétence et l'endroit où elle a été appliquée.",
        linkLabel: "Explorer l'expertise complète",
        evidenceLabel: 'Preuves',
        items: [
          { mandate: 'Rendre les données utiles aux dirigeants', practice: 'Reporting exécutif, couches sémantiques et produits décisionnels qui rendent la performance lisible.', evidence: ['GroupIQ', 'Polaris'] },
          { mandate: "Mettre l'IA en production de façon fiable", practice: "Systèmes agentiques, contexte gouverné, évaluation et contrôle humain lorsque les décisions ont du poids.", evidence: ['Lense Studio', 'Media Data Studio'] },
          { mandate: "Transformer les plateformes en adoption", practice: "Stratégie produit, modèles opérationnels et rituels d'équipe qui font passer un système de la livraison à l'usage quotidien.", evidence: ['Cap Ostrea', 'Polaris'] },
        ],
      },
      fit: {
        eyebrow: '04 / Profil recherché',
        heading: "Le bon mandat dépasse le choix d'un outil.",
        summary: "J'apporte le plus de valeur lorsqu'une équipe dirigeante doit relier direction métier et exécution Data & IA, puis laisser un système opérationnel que l'organisation sait réellement piloter.",
        items: ["Porter une transformation Data et IA au niveau exécutif", "Accélérer l'adoption d'une plateforme ou d'un portefeuille produit", "Donner un modèle opérationnel scalable à une équipe distribuée"],
        primaryLabel: 'Échanger sur un poste',
        secondaryLabel: 'Approche de leadership',
      },
      thinking: {
        eyebrow: '05 / Réflexions',
        heading: 'Comment je prends mes décisions.',
        linkLabel: 'Voir toutes les réflexions',
        readLabel: "Lire l'article",
        items: [
          { label: 'Opérations agentiques', title: "Pourquoi la plupart des démos d'agents échouent en production", slug: 'why-most-agent-demos-collapse-in-production' },
          { label: 'Produits Data', title: 'La Data comme produit, trois ans plus tard', slug: 'data-as-a-product-three-years-on' },
          { label: 'Systèmes exécutifs', title: "Les dix chiffres d'un tableau de bord de dirigeant", slug: 'ten-numbers-ceo-dashboard' },
        ],
      },
      close: {
        eyebrow: '06 / Prochaine conversation',
        heading: 'Si le mandat exige à la fois vision stratégique et profondeur opérationnelle, échangeons.',
        cta: 'Échanger sur un poste',
      },
    },
    work: {
      title: 'Réalisations sélectionnées — Yoann Leny',
      description: "Cinq produits et systèmes opérationnels en Data, IA, reporting, opérations RH, média et marketplaces — avec des études de cas détaillées en préparation.",
      intro: {
        eyebrow: 'Réalisations sélectionnées',
        heading: 'Des réalisations conçues pour transformer le fonctionnement des équipes.',
        summary: "Un portefeuille concret de produits, plateformes et systèmes opérationnels. Les dossiers nommés ci-dessous sont en préparation ; les études de cas complémentaires sont déjà disponibles.",
      },
      register: {
        eyebrow: 'Registre des preuves / 2026',
        heading: 'Cinq missions, une même vision opérationnelle.',
        summary: "Chaque entrée présentera le problème, les décisions, les livrables et l'impact mesurable dès que sa publication sera possible.",
      },
      supporting: {
        heading: 'Études de cas complémentaires',
        summary: "Des exemples de production anonymisés qui exposent l'architecture, les choix opérationnels et les résultats derrière l'expertise.",
        cards: [
          { pattern: 'agents', tag: 'IA agentique · Modèle opérationnel', title: 'Tracker de compétences multi-agents', description: 'Un système hiérarchique maintenant un graphe de compétences en direct pour plus de 40 consultants et facilitant les décisions de staffing dans trois régions.', metrics: [{ value: '40+', label: 'experts' }, { value: '3', label: 'régions' }, { value: '-22%', label: 'intercontrat' }], slug: 'multi-agent-skill-tracker' },
          { pattern: 'layers', tag: 'Plateforme Data · Gouvernance', title: "Architecture Médaillon d'Entreprise", description: "Un lakehouse bronze–silver–gold gouverné avec une couche sémantique unique pour l'analytique, le machine learning et les workflows d'agents.", metrics: [{ value: '13 M$+', label: 'impact' }, { value: '9 mois', label: 'retour' }, { value: '0', label: 'écart KPI' }], slug: 'enterprise-medallion-stack' },
          { pattern: 'semantic', tag: 'Couche sémantique · IA', title: "Couche Sémantique prête pour l'IA", description: "Une couche de métriques repensée pour les LLM et les agents, standardisant la lecture de l'activité par les systèmes d'IA.", metrics: [{ value: '47', label: 'métriques' }, { value: '4', label: 'usages IA' }, { value: '0', label: 'écart KPI' }], slug: 'ai-ready-semantic-layer' },
          { pattern: 'org', tag: 'Leadership · Modèle opérationnel', title: "Modèle d'échelle DataOps global", description: "Un modèle opérationnel pour une fonction Data distribuée : pods, rôles, rituels de livraison et vue sur la santé de l'organisation.", metrics: [{ value: '40+', label: 'experts' }, { value: '3', label: 'régions' }, { value: '4 T', label: 'stabilisation' }], slug: 'global-data-ops-scaling-model' },
        ],
      },
      close: { heading: "Besoin de la version complète pour un poste ou un mandat ?", cta: 'Échanger sur un poste' },
    },
  },
  es: {
    about: aboutPages.es,
    capabilitiesPage: capabilitiesPages.es,
    contact: contactPages.es,
    hire: hirePages.es,
    now: nowPages.es,
    legal: legalPages.es,
    achievementLabels: {
      evidence: 'Evidencia',
      sector: 'Sector',
      context: 'Contexto',
      capabilities: 'Capacidades demostradas',
    },
    home: {
      title: 'Yoann Leny — Líder ejecutivo de Datos e IA',
      description: 'Liderazgo en Datos e IA, desde la estrategia hasta las plataformas, productos y modelos operativos. Descubre logros seleccionados y casos prácticos.',
      hero: {
        availability: 'Abierto a puestos de liderazgo sénior en Datos e IA',
        location: 'Burdeos · Europa',
        roleLabel: 'VP / Head of Datos e IA',
        headline: 'Construyo los sistemas de Datos e IA en los que confían los líderes.',
        summary: 'Convierto datos fragmentados, IA emergente y equipos distribuidos en una ventaja operativa clara, conectando estrategia, plataformas y la forma en que el trabajo se realiza.',
        primaryLabel: 'Hablar de un puesto',
        secondaryLabel: 'Ver los logros',
        portraitAlt: 'Retrato de Yoann Leny',
        briefLabel: 'Resumen para recruiters',
        fitLabel: '01 / Perfil',
        briefAriaLabel: 'Resumen para recruiters',
        roleTerm: 'Rol',
        roleValue: 'Liderazgo ejecutivo de Datos e IA',
        scopeTerm: 'Alcance',
        scopeValue: 'Estrategia, plataformas, productos, equipos',
        reachTerm: 'Cobertura',
        reachValue: 'Internacional · Español / Francés / Inglés',
        orbitLabel: 'YOANN LENY · LIDERAZGO EN DATOS E IA · ESTRATEGIA · SISTEMAS · ADOPCIÓN · ',
        decisionTrace: {
          label: 'La ruta de decisión',
          principle: 'La estrategia solo es real cuando un equipo puede ponerla en marcha el lunes.',
          steps: [
            { label: '01 / Dirección', title: 'Definir la decisión real', signal: 'change' },
            { label: '02 / Sistema', title: 'Construir lo que la hace posible', signal: 'intelligence' },
            { label: '03 / Adopción', title: 'Hacer visible el cambio', signal: 'outcome' },
          ],
        },
      },
      proof: {
        title: 'Evidencia publicada',
        note: 'Cifras resumidas de los casos prácticos presentados en este sitio.',
        metrics: [
          { value: '40+', label: 'expertos liderados' },
          { value: '3 regiones', label: 'alcance internacional' },
          { value: '+$13M', label: 'impacto atribuido' },
        ],
      },
      achievements: {
        eyebrow: '02 / Evidencia',
        heading: 'Productos que convierten la promesa en hechos.',
        summary: 'Cinco logros con nombre propio en reporting regulado, operaciones de personas, calidad analítica, marketplaces y arquitectura de datos para medios.',
        linkLabel: 'Abrir el registro completo',
      },
      capabilities: {
        eyebrow: '03 / Mapa de capacidades',
        heading: 'Capacidades vinculadas a pruebas.',
        summary: 'Los recruiters no deberían tener que deducir la relación entre una capacidad y dónde se ha aplicado.',
        linkLabel: 'Explorar la práctica completa',
        evidenceLabel: 'Evidencia',
        items: [
          { mandate: 'Hacer que los datos sean útiles para los líderes', practice: 'Reporting ejecutivo, capas semánticas y productos de decisión que hacen legible el rendimiento.', evidence: ['GroupIQ', 'Polaris'] },
          { mandate: 'Llevar la IA a una operación fiable', practice: 'Sistemas agénticos, contexto gobernado, evaluación y control humano cuando las decisiones importan.', evidence: ['Lense Studio', 'Media Data Studio'] },
          { mandate: 'Convertir plataformas en adopción', practice: 'Estrategia de producto, modelos operativos y rituales de equipo que llevan un sistema de la entrega al uso diario.', evidence: ['Cap Ostrea', 'Polaris'] },
        ],
      },
      fit: {
        eyebrow: '04 / Encaje profesional',
        heading: 'El mandato adecuado va más allá de elegir una herramienta.',
        summary: 'Aporto más valor cuando un equipo directivo necesita conectar la dirección del negocio con la ejecución de Datos e IA y dejar un sistema operativo que la organización pueda gestionar de verdad.',
        items: ['Liderazgo ejecutivo de una transformación de Datos e IA', 'Una plataforma o cartera de productos que necesita más adopción', 'Un equipo distribuido que necesita un modelo operativo escalable'],
        primaryLabel: 'Hablar de un puesto',
        secondaryLabel: 'Enfoque de liderazgo',
      },
      thinking: {
        eyebrow: '05 / Ideas',
        heading: 'Cómo tomo decisiones.',
        linkLabel: 'Ver todas las ideas',
        readLabel: 'Leer artículo',
        items: [
          { label: 'Operaciones agénticas', title: 'Por qué la mayoría de las demos de agentes fallan en producción', slug: 'why-most-agent-demos-collapse-in-production' },
          { label: 'Productos de datos', title: 'Datos como producto, tres años después', slug: 'data-as-a-product-three-years-on' },
          { label: 'Sistemas ejecutivos', title: 'Los diez números de un dashboard para dirección', slug: 'ten-numbers-ceo-dashboard' },
        ],
      },
      close: {
        eyebrow: '06 / Próxima conversación',
        heading: 'Si el mandato exige visión estratégica y profundidad operativa, hablemos.',
        cta: 'Hablar de un puesto',
      },
    },
    work: {
      title: 'Logros seleccionados — Yoann Leny',
      description: 'Cinco productos y sistemas operativos de Datos, IA, reporting, operaciones de personas, medios y marketplaces, con casos prácticos detallados en preparación.',
      intro: {
        eyebrow: 'Logros seleccionados',
        heading: 'Trabajo creado para transformar cómo operan los equipos.',
        summary: 'Una cartera real de productos, plataformas y sistemas operativos. Los dossieres con nombre propio están en preparación; los casos prácticos complementarios ya están disponibles.',
      },
      register: {
        eyebrow: 'Registro de evidencia / 2026',
        heading: 'Cinco misiones, una misma visión operativa.',
        summary: 'Cada entrada incluirá el problema, las decisiones, los entregables y el resultado medible cuando pueda publicarse.',
      },
      supporting: {
        heading: 'Casos prácticos complementarios',
        summary: 'Ejemplos de producción anonimizados que muestran la arquitectura, las decisiones operativas y los resultados de la práctica.',
        cards: [
          { pattern: 'agents', tag: 'IA agéntica · Modelo operativo', title: 'Tracker de habilidades multiagente', description: 'Un sistema jerárquico que mantiene un grafo de habilidades en vivo para más de 40 consultores y facilita decisiones de staffing en tres regiones.', metrics: [{ value: '40+', label: 'expertos' }, { value: '3', label: 'regiones' }, { value: '-22%', label: 'espera' }], slug: 'multi-agent-skill-tracker' },
          { pattern: 'layers', tag: 'Plataforma de datos · Gobierno', title: 'Stack de Medallón Corporativo', description: 'Un lakehouse bronce–plata–oro gobernado con una capa semántica única para analítica, machine learning y flujos de agentes.', metrics: [{ value: '+$13M', label: 'impacto' }, { value: '9 meses', label: 'retorno' }, { value: '0', label: 'desvío KPI' }], slug: 'enterprise-medallion-stack' },
          { pattern: 'semantic', tag: 'Capa semántica · IA', title: 'Capa Semántica Lista para IA', description: 'Una capa de métricas rediseñada para LLMs y agentes, estandarizando cómo los sistemas de IA interpretan el negocio.', metrics: [{ value: '47', label: 'métricas' }, { value: '4', label: 'usos IA' }, { value: '0', label: 'desvío KPI' }], slug: 'ai-ready-semantic-layer' },
          { pattern: 'org', tag: 'Liderazgo · Modelo operativo', title: 'Modelo de Escala DataOps Global', description: 'Un modelo operativo para una función de datos distribuida: pods, roles, rituales de entrega y una vista de la salud organizativa.', metrics: [{ value: '40+', label: 'expertos' }, { value: '3', label: 'regiones' }, { value: '4 T', label: 'estabilización' }], slug: 'global-data-ops-scaling-model' },
        ],
      },
      close: { heading: '¿Necesitas la versión completa para un puesto o mandato?', cta: 'Hablar de un puesto' },
    },
  },
};
