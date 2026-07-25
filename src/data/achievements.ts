import type { Locale } from './localized-site';

export interface Achievement {
  slug: string;
  name: string;
  summary: string;
  projectType: string;
  industry: string;
  location: string;
  status: string;
  capabilities: string[];
  href: string | null;
}

interface LocalizedAchievement {
  summary: string;
  projectType: string;
  industry: string;
  location: string;
  status: string;
  capabilities: string[];
}

interface AchievementDefinition {
  slug: string;
  name: string;
  href: string | null;
  copy: Record<Locale, LocalizedAchievement>;
}

const achievementDefinitions: AchievementDefinition[] = [
  {
    slug: 'groupiq',
    name: 'GroupIQ',
    href: null,
    copy: {
      en: { summary: 'A centralized reporting portal for the pharmaceutical industry in Australia.', projectType: 'Reporting portal', industry: 'Pharmaceuticals', location: 'Australia', status: 'Case study in preparation', capabilities: ['Data products', 'Executive reporting', 'Governance'] },
      fr: { summary: "Un portail centralisé de reporting pour l'industrie pharmaceutique en Australie.", projectType: 'Portail de reporting', industry: 'Industrie pharmaceutique', location: 'Australie', status: 'Étude de cas en préparation', capabilities: ['Produits Data', 'Reporting exécutif', 'Gouvernance'] },
      es: { summary: 'Un portal centralizado de reporting para la industria farmacéutica en Australia.', projectType: 'Portal de reporting', industry: 'Industria farmacéutica', location: 'Australia', status: 'Estudio de caso en preparación', capabilities: ['Productos de datos', 'Reporting ejecutivo', 'Gobernanza'] },
    },
  },
  {
    slug: 'polaris',
    name: 'Polaris',
    href: null,
    copy: {
      en: { summary: 'A clearer way to run people operations.', projectType: 'Operations platform', industry: 'People operations', location: 'Confidential', status: 'Case study in preparation', capabilities: ['Operating model', 'Product strategy', 'Decision systems'] },
      fr: { summary: 'Une façon plus claire de piloter les opérations RH.', projectType: 'Plateforme opérationnelle', industry: 'Opérations RH', location: 'Confidentiel', status: 'Étude de cas en préparation', capabilities: ['Modèle opérationnel', 'Stratégie produit', 'Systèmes décisionnels'] },
      es: { summary: 'Una forma más clara de gestionar las operaciones de personas.', projectType: 'Plataforma operativa', industry: 'Operaciones de personas', location: 'Confidencial', status: 'Estudio de caso en preparación', capabilities: ['Modelo operativo', 'Estrategia de producto', 'Sistemas de decisión'] },
    },
  },
  {
    slug: 'lense-studio',
    name: 'Lense Studio',
    href: null,
    copy: {
      en: { summary: 'An automated way to audit dashboards and propose improvements.', projectType: 'AI audit product', industry: 'Analytics', location: 'Global', status: 'Case study in preparation', capabilities: ['Agentic AI', 'Dashboard design', 'Quality automation'] },
      fr: { summary: 'Une méthode automatisée pour auditer les tableaux de bord et proposer des améliorations.', projectType: "Produit d'audit IA", industry: 'Analytique', location: 'International', status: 'Étude de cas en préparation', capabilities: ['IA agentique', 'Design de dashboards', 'Qualité automatisée'] },
      es: { summary: 'Una forma automatizada de auditar dashboards y proponer mejoras.', projectType: 'Producto de auditoría con IA', industry: 'Analítica', location: 'Global', status: 'Estudio de caso en preparación', capabilities: ['IA agéntica', 'Diseño de dashboards', 'Calidad automatizada'] },
    },
  },
  {
    slug: 'cap-ostrea',
    name: 'Cap Ostrea',
    href: null,
    copy: {
      en: { summary: 'A mobile marketplace for oyster producers in Arcachon Bay.', projectType: 'Mobile marketplace', industry: 'Aquaculture', location: 'Arcachon Bay, France', status: 'Case study in preparation', capabilities: ['Marketplace design', 'Mobile product', 'Local operations'] },
      fr: { summary: "Une marketplace mobile pour les producteurs d'huîtres du bassin d'Arcachon.", projectType: 'Marketplace mobile', industry: 'Ostréiculture', location: "Bassin d'Arcachon, France", status: 'Étude de cas en préparation', capabilities: ['Design de marketplace', 'Produit mobile', 'Opérations locales'] },
      es: { summary: 'Un marketplace móvil para productores de ostras de la bahía de Arcachon.', projectType: 'Marketplace móvil', industry: 'Acuicultura', location: 'Bahía de Arcachon, Francia', status: 'Estudio de caso en preparación', capabilities: ['Diseño de marketplace', 'Producto móvil', 'Operaciones locales'] },
    },
  },
  {
    slug: 'media-data-studio',
    name: 'Media Data Studio',
    href: null,
    copy: {
      en: { summary: 'A multi-agent system that connects media platforms and builds an AI-ready data architecture.', projectType: 'Multi-agent data system', industry: 'Media', location: 'Global', status: 'Case study in preparation', capabilities: ['Multi-agent systems', 'Platform integration', 'AI-ready architecture'] },
      fr: { summary: "Un système multi-agent qui connecte les plateformes média et construit une architecture de données prête pour l'IA.", projectType: 'Système Data multi-agent', industry: 'Média', location: 'International', status: 'Étude de cas en préparation', capabilities: ['Systèmes multi-agents', 'Intégration de plateformes', "Architecture prête pour l'IA"] },
      es: { summary: 'Un sistema multiagente que conecta plataformas de medios y construye una arquitectura de datos preparada para la IA.', projectType: 'Sistema de datos multiagente', industry: 'Medios', location: 'Global', status: 'Estudio de caso en preparación', capabilities: ['Sistemas multiagente', 'Integración de plataformas', 'Arquitectura preparada para IA'] },
    },
  },
];

export const getAchievements = (locale: Locale): Achievement[] => achievementDefinitions.map(({ copy, ...achievement }) => ({
  ...achievement,
  ...copy[locale],
}));

export const achievements = getAchievements('en');
