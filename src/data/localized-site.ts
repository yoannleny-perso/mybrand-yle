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
  decisionTraceLabel: string;
  decisionTrace: string[];
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

interface LocalizedSiteCopy {
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

export const localizedSite: Record<Locale, LocalizedSiteCopy> = {
  en: {
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
        decisionTraceLabel: 'Decision trace',
        decisionTrace: ['Set the operating direction', 'Build the enabling system', 'Make adoption measurable'],
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
        decisionTraceLabel: 'Trajectoire de décision',
        decisionTrace: ["Définir la direction opérationnelle", "Construire le système qui la rend possible", "Mesurer l'adoption"],
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
        decisionTraceLabel: 'Ruta de decisión',
        decisionTrace: ['Definir la dirección operativa', 'Construir el sistema habilitador', 'Medir la adopción'],
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
