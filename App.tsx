import React, { useState, useEffect, createContext, useContext, useRef, Suspense } from 'react';
import { 
  Menu, X, ShieldCheck, Scale, Cpu, 
  ArrowRight, Activity, Database, Lock, 
  FileSearch, ChevronRight, Terminal, Network, 
  BookOpen, Users, Star, UserCheck, Share2, 
  Download, Filter, GitBranch, Key,
  ScrollText, GraduationCap, PlayCircle, Layers,
  Briefcase, LineChart, Building, MapPin, Mail, Calendar, CheckCircle,
  Linkedin, Github, Smartphone, Eye, ArrowLeft, Loader2, Globe, Search,
  Unlock, LogOut, FileText, Shield, Layout, ShoppingCart, Rocket, Code2,
  Package, Box, BadgeCheck, Zap, TrendingUp, HeartPulse, ChevronDown, Check,
  Edit3, FileCheck, AlertCircle, Book, Newspaper, Video, ListTree, Clock, Tag,
  MoreHorizontal, Play, ExternalLink
} from 'lucide-react';
import { Logo } from './components/Logo';
import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts';

// --- Utility Hooks ---

/**
 * Hook to detect media query matches programmatically.
 * Used to prevent rendering heavy charts in hidden containers (mobile views).
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // SSR Check
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);
    
    // Initial check
    updateMatch();

    // Listener
    media.addEventListener('change', updateMatch);
    return () => media.removeEventListener('change', updateMatch);
  }, [query]);

  return matches;
}

// --- Internationalization (i18n) System Core ---

type LanguageCode = 'en' | 'es';

interface LanguageDefinition {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

const SUPPORTED_LANGUAGES: LanguageDefinition[] = [
  { code: 'en', name: 'English', nativeName: 'English (US)' },
  { code: 'es', name: 'Spanish', nativeName: 'Español (LATAM)' },
];

// Helper type for multilingual data
type LocalizedString = string | { en: string; es: string };

const getLocStr = (content: LocalizedString, lang: LanguageCode): string => {
  if (typeof content === 'string') return content;
  return content[lang] || content['en'];
};

const TRANSLATIONS = {
  en: {
    nav: {
      home: 'Home',
      leadership: 'Leadership',
      services: 'Services',
      products: 'Products',
      publications: 'Publications',
      alliance: 'Alliance',
      contact: 'Contact',
      identify: 'Identify',
      selectLang: 'Select Language',
      console: 'Fiduciary Console'
    },
    hero: {
      status: 'SYSTEM_PROTOCOL: FIDUCIARY_ENGAGED',
      title: 'Technical',
      fiduciary: 'Fiduciary',
      p1: 'Governing technical risk in mission-critical environments. We bridge high-stakes software complexity and business ROI through engineering excellence, proprietary assets, and rigorous leadership.'
    },
    sections: {
      pillars: 'Operational Pillars',
      pillarsTitle: 'Fiduciary Services & Engineering',
      inventory: 'Digital Inventory',
      inventoryTitle: 'Proprietary Assets & Licensing',
      capital: 'Sovereign Intellectual Capital',
      capitalTitle: 'Technical Publications & Academy',
      allianceSub: 'Principal Fiduciaries',
      allianceTitle: 'The Alliance Directory'
    },
    common: {
      learnMore: 'Learn More',
      digitalAssets: 'Digital Assets',
      bespokeBuilds: 'Bespoke Builds',
      identifySession: 'Identify Session',
      logout: 'Secure Logout',
      back: 'Return',
      export: 'Export Professional Dossier (PDF)',
      requestLicense: 'Request Asset License',
      submit: 'Submit Official Mandate Application',
      status: 'Status',
      role: 'Fiduciary Role',
      expertMatrix: 'Expertise Matrix',
      execMandate: 'Executive Mandate',
      opHistory: 'Operational History',
      portfolio: 'Strategic Portfolio',
      viewProject: 'Inspect Asset',
      verifiedMember: 'Verified Member',
      officialDossier: 'Official Sovereign Dossier',
      contactTitle: 'Initiate Formal Fiduciary Engagement',
      contactSub: 'Strategic Alliance',
      officialCorr: 'Official Correspondence',
      appForm: 'Engagement Application',
      formName: 'Principal Full Name',
      formEmail: 'Validated Business Email',
      formContext: 'Strategic Context & Scope',
      footerP1: 'Transforming complex engineering into governed asset classes. We bridge technical friction to unlock definitive economic potential.',
      footerResources: 'Resources',
      footerPresence: 'Presence',
      footerRights: 'GKodo Technical Fiduciary. Sovereignty in High-Stakes Engineering Excellence.',
      hq: 'Bogotá, D.C.\nColombia — HQ Operations'
    },
    auth: {
      portal: 'Access Portal',
      security: 'GKODO // Fiduciary Security',
      identify: 'Identify Session',
      mfaTitle: 'Verify Fiduciary Identity',
      mfaBody: 'Enter the Multi-Factor Authentication token sent to your verified device.',
      demo: 'Alliance Demo Credentials',
      credsLabel: 'Identify Credentials'
    },
    publications: {
      repo: 'Knowledge Repository',
      sub: 'Peer-reviewed architectural studies and technical academia for the Alliance.',
      select: 'Select Intelligence Node to Decrypt Asset',
      locked: 'Restricted Intellectual Asset',
      lockedMsg: 'This whitepaper contains proprietary architectural patterns and fiduciary protocols. Access requires validated Alliance membership.',
      execSummary: 'Executive Summary',
      readTime: 'read',
      classMedia: 'Class Media',
      searchPlaceholder: 'Search repository by title, topic, or keyword...',
      filterAll: 'All Assets',
      filterArticle: 'Articles',
      filterClass: 'Masterclasses',
      filterCourse: 'Courses',
      filterNews: 'Intel Briefs',
      backToLib: 'Back to Library',
      relatedContext: 'Related Context',
      mins: 'mins',
      impact: 'Impact Factor',
      courseSyllabus: 'Course Syllabus',
      startCourse: 'Start Protocol',
      modules: 'Modules',
      includedIn: 'Included in Learning Paths'
    },
    cms: {
      title: 'Sovereign Content Management',
      subtitle: 'Scientific Peer-Review Protocol',
      drafts: 'My Drafts',
      reviewQueue: 'Review Queue',
      published: 'Published Assets',
      create: 'Create New Asset',
      approve: 'Endorse',
      reject: 'Request Revision',
      noData: 'No active protocols in this queue.',
      inspector: 'Asset Inspection Protocol',
      consensus: 'Consensus Progress',
      reviewsRequired: 'Reviews Required',
      verdict: 'Reviewer Verdict',
      submitReview: 'Submit Professional Review',
      auditTrail: 'Fiduciary Audit Trail',
      noReviews: 'No reviews recorded yet.',
      enterAssessment: 'Enter your fiduciary assessment...'
    },
    roles: {
      FOUNDER: 'Founder & Architect',
      PARTNER: 'Strategic Partner',
      ALLIANCE: 'Alliance Member',
      FELLOW: 'Community Fellow'
    },
    status: {
      DRAFT: 'Draft',
      SUBMITTED: 'Submitted',
      UNDER_REVIEW: 'Under Review',
      REVISION_REQUESTED: 'Revision Requested',
      APPROVED: 'Approved',
      PUBLISHED: 'Published'
    },
    types: {
      ARTICLE: 'Article',
      CLASS: 'Masterclass',
      COURSE: 'Course',
      BOOK: 'Book',
      NEWS: 'Intelligence Brief',
      DOMAIN: 'Domain',
      SPECIALTY: 'Specialty',
      GROUP: 'Group'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      leadership: 'Liderazgo',
      services: 'Servicios',
      products: 'Productos',
      publications: 'Publicaciones',
      alliance: 'Alianza',
      contact: 'Contacto',
      identify: 'Identificar',
      selectLang: 'Seleccionar Idioma',
      console: 'Consola Fiduciaria'
    },
    hero: {
      status: 'PROTOCOLO_SISTEMA: FIDUCIARIO_ACTIVO',
      title: 'Fiduciario',
      fiduciary: 'Técnico',
      p1: 'Gobernando el riesgo técnico en entornos de misión crítica. Cerramos la brecha entre la complejidad del software y el ROI empresarial mediante excelencia en ingeniería, activos propios y liderazgo riguroso.'
    },
    sections: {
      pillars: 'Pilares Operativos',
      pillarsTitle: 'Servicios Fiduciarios e Ingeniería',
      inventory: 'Inventario Digital',
      inventoryTitle: 'Activos Propios y Licenciamiento',
      capital: 'Capital Intelectual Soberano',
      capitalTitle: 'Publicaciones Técnicas y Academia',
      allianceSub: 'Fiduciarios Principales',
      allianceTitle: 'Directorio de la Alianza'
    },
    common: {
      learnMore: 'Saber Más',
      digitalAssets: 'Activos Digitales',
      bespokeBuilds: 'Desarrollos a Medida',
      identifySession: 'Identificar Sesión',
      logout: 'Cerrar Sesión Segura',
      back: 'Volver',
      export: 'Exportar Dossier Profesional (PDF)',
      requestLicense: 'Solicitar Licencia de Activo',
      submit: 'Enviar Solicitud de Mandato Oficial',
      status: 'Estado',
      role: 'Rol Fiduciario',
      expertMatrix: 'Matriz de Experiencia',
      execMandate: 'Mandato Ejecutivo',
      opHistory: 'Historial Operativo',
      portfolio: 'Portafolio Estratégico',
      viewProject: 'Inspeccionar Activo',
      verifiedMember: 'Miembro Verificado',
      officialDossier: 'Dossier Oficial Soberano',
      contactTitle: 'Iniciar Compromiso Fiduciario Formal',
      contactSub: 'Alianza Estratégica',
      officialCorr: 'Correspondencia Oficial',
      appForm: 'Solicitud de Compromiso',
      formName: 'Nombre Completo del Principal',
      formEmail: 'Email Empresarial Validado',
      formContext: 'Contexto Estratégico y Alcance',
      footerP1: 'Transformando la ingeniería compleja en clases de activos gobernados. Unimos la fricción técnica para desbloquear el potencial económico definitivo.',
      footerResources: 'Recursos',
      footerPresence: 'Presencia',
      footerRights: 'GKodo Fiduciaria Técnica. Soberanía en Excelencia de Ingeniería de Alto Riesgo.',
      hq: 'Bogotá, D.C.\nColombia — Operaciones HQ'
    },
    auth: {
      portal: 'Portal de Acceso',
      security: 'GKODO // Seguridad Fiduciaria',
      identify: 'Identificar Sesión',
      mfaTitle: 'Verificar Identidad Fiduciaria',
      mfaBody: 'Ingrese el token de autenticación multifactor enviado a su dispositivo verificado.',
      demo: 'Credenciales de Demo de la Alianza',
      credsLabel: 'Credenciales de Identificación'
    },
    publications: {
      repo: 'Repositorio de Conocimiento',
      sub: 'Estudios arquitectónicos revisados por pares y academia técnica para la Alianza.',
      select: 'Seleccione un Nodo de Inteligencia para Desencriptar',
      locked: 'Activo Intelectual Restringido',
      lockedMsg: 'Este documento contiene patrones arquitectónicos y protocolos fiduciarios propietarios. El acceso requiere membresía validada de la Alianza.',
      execSummary: 'Resumen Ejecutivo',
      readTime: 'lectura',
      classMedia: 'Multimedia de la Clase',
      searchPlaceholder: 'Buscar en el repositorio por título, tema o palabra clave...',
      filterAll: 'Todo',
      filterArticle: 'Artículos',
      filterClass: 'Masterclasses',
      filterCourse: 'Cursos',
      filterNews: 'Boletines',
      backToLib: 'Volver a la Biblioteca',
      relatedContext: 'Contexto Relacionado',
      mins: 'min',
      impact: 'Factor de Impacto',
      courseSyllabus: 'Syllabus del Curso',
      startCourse: 'Iniciar Protocolo',
      modules: 'Módulos',
      includedIn: 'Incluido en Rutas de Aprendizaje'
    },
    cms: {
      title: 'Gestión de Contenido Soberano',
      subtitle: 'Protocolo de Revisión por Pares',
      drafts: 'Mis Borradores',
      reviewQueue: 'Cola de Revisión',
      published: 'Activos Publicados',
      create: 'Crear Nuevo Activo',
      approve: 'Avalar',
      reject: 'Solicitar Revisión',
      noData: 'No hay protocolos activos en esta cola.',
      inspector: 'Protocolo de Inspección de Activos',
      consensus: 'Progreso de Consenso',
      reviewsRequired: 'Revisiones Requeridas',
      verdict: 'Veredicto del Revisor',
      submitReview: 'Enviar Revisión Profesional',
      auditTrail: 'Rastro de Auditoría Fiduciaria',
      noReviews: 'No hay revisiones registradas aún.',
      enterAssessment: 'Ingrese su evaluación fiduciaria...'
    },
    roles: {
      FOUNDER: 'Fundador y Arquitecto',
      PARTNER: 'Socio Estratégico',
      ALLIANCE: 'Miembro de la Alianza',
      FELLOW: 'Fellow de la Comunidad'
    },
    status: {
      DRAFT: 'Borrador',
      SUBMITTED: 'Enviado',
      UNDER_REVIEW: 'En Revisión',
      REVISION_REQUESTED: 'Cambios Solicitados',
      APPROVED: 'Aprobado',
      PUBLISHED: 'Publicado'
    },
    types: {
      ARTICLE: 'Artículo',
      CLASS: 'Masterclass',
      COURSE: 'Curso',
      BOOK: 'Libro',
      NEWS: 'Boletín de Inteligencia',
      DOMAIN: 'Dominio',
      SPECIALTY: 'Especialidad',
      GROUP: 'Grupo'
    }
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: any;
  content: (data: LocalizedString) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');

  const t = (path: string) => {
    return path.split('.').reduce((obj, key) => (obj as any)?.[key], TRANSLATIONS[language]) || path;
  };

  const content = (data: LocalizedString) => getLocStr(data, language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, content }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within a LanguageProvider');
  return context;
};

// --- Enterprise Data Models (Polymorphic & Robust) ---

type UserRole = 'FOUNDER' | 'PARTNER' | 'ALLIANCE' | 'FELLOW';

type AppViewType = 'landing' | 'about' | 'services' | 'products' | 'publications' | 'profiles' | 'contact' | 'auth' | 'cms';

// Review Workflow States
type ContentStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'REVISION_REQUESTED' | 'APPROVED' | 'PUBLISHED';

type AssetType = 'ARTICLE' | 'CLASS' | 'COURSE' | 'BOOK' | 'NEWS' | 'DOMAIN' | 'SPECIALTY' | 'GROUP';
type ArticleSubtype = 'ACADEMIC' | 'OPINION' | 'THEORY' | 'EXPLANATORY';

interface ReviewLog {
  reviewerId: string;
  verdict: 'APPROVE' | 'REJECT' | 'REQUEST_CHANGES';
  comment: LocalizedString;
  timestamp: string;
  reputationSnapshot: LocalizedString; 
}

interface BaseAsset {
  id: string;
  type: AssetType;
  title: LocalizedString;
  excerpt: LocalizedString;
  authorId: string;
  contextIds: string[]; 
  tags: string[];
  status: ContentStatus;
  reviews: ReviewLog[];
  version: number;
  lastUpdated: string;
  isLocked: boolean;
}

// Polymorphic Extensions
interface ArticleAsset extends BaseAsset {
  type: 'ARTICLE';
  subtype: ArticleSubtype;
  content: LocalizedString; // Markdown/Rich Text
  readTime: string;
  impactFactor?: number;
}

interface ClassAsset extends BaseAsset {
  type: 'CLASS';
  videoUrl?: string; 
  duration: string;
  prerequisites: string[];
  labUrl?: string; 
}

interface CourseAsset extends BaseAsset {
  type: 'COURSE';
  syllabus: string[]; // List of Class/Article IDs
  certificationId?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface NewsAsset extends BaseAsset {
  type: 'NEWS';
  sourceUrl?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

interface StructureNode extends BaseAsset {
  type: 'DOMAIN' | 'SPECIALTY' | 'GROUP';
}

type PublicationNode = ArticleAsset | ClassAsset | CourseAsset | NewsAsset | StructureNode;

// --- Workflow Configuration ---

const WORKFLOW_CONFIG = {
  ARTICLE: { minReviews: 3, allowedReviewers: ['Expert', 'Authority'] }, 
  CLASS: { minReviews: 2, allowedReviewers: ['Practitioner', 'Expert', 'Authority'] },
  COURSE: { minReviews: 2, allowedReviewers: ['Expert', 'Authority'] },
  BOOK: { minReviews: 4, allowedReviewers: ['Authority'] },
  NEWS: { minReviews: 1, allowedReviewers: ['Practitioner', 'Expert', 'Authority'] }, 
  DOMAIN: { minReviews: 0, allowedReviewers: [] }, 
  SPECIALTY: { minReviews: 0, allowedReviewers: [] }, 
  GROUP: { minReviews: 0, allowedReviewers: [] }, 
};

// --- Mock Database (Multilingual) ---

interface ExperienceItem {
  role: LocalizedString;
  company: string;
  period: LocalizedString;
  description: LocalizedString;
}

interface PortfolioItem {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  imageUrl: string;
  link?: string;
  tags: string[];
  date: string;
}

interface UserProfile {
  id: string;
  email: string;
  handle: string;
  name: string;
  roleType: UserRole;
  role: LocalizedString;
  affiliation: string;
  bio: LocalizedString;
  avatar: string;
  reputation: { topic: string; score: number; level: string }[];
  experience: ExperienceItem[];
  portfolio: PortfolioItem[];
}

const USERS: UserProfile[] = [
  {
    id: 'jdg',
    email: 'jdg@gkodo.com',
    handle: 'JDGomezH',
    name: 'John D. Gómez H.',
    roleType: 'FOUNDER',
    affiliation: 'GKodo Alliance',
    role: { en: 'Principal Strategist & Founder', es: 'Estratega Principal y Fundador' },
    bio: { 
        en: 'Technology Strategist bridging the gap between financial rigor and distributed systems. Operates as a Technical Fiduciary for companies that cannot afford technical failure. Combines 9+ years in Finance/Accounting with 7+ years in Enterprise Software Engineering to translate technical complexity into business value.',
        es: 'Estratega tecnológico que une el rigor financiero con sistemas distribuidos. Opera como Fiduciario Técnico para empresas que no pueden permitirse fallas técnicas. Combina más de 9 años en Finanzas/Contabilidad con más de 7 años en Ingeniería de Software Empresarial para traducir la complejidad técnica en valor comercial.'
    },
    avatar: 'https://picsum.photos/seed/jdg/200/200?grayscale',
    reputation: [
        { topic: 'System Architecture', score: 98, level: 'Authority' },
        { topic: 'AI Governance', score: 95, level: 'Authority' },
        { topic: 'Financial Engineering', score: 92, level: 'Authority' }
    ],
    experience: [
        {
            role: { en: 'Tech Lead', es: 'Líder Técnico' },
            company: 'SIIGO / Memory',
            period: { en: 'Present', es: 'Presente' },
            description: { en: 'Leading distributed teams in building high-throughput financial software.', es: 'Liderando equipos distribuidos en la construcción de software financiero de alto rendimiento.' }
        },
        {
            role: { en: 'Founder', es: 'Fundador' },
            company: 'GKodo',
            period: '2024 - Present',
            description: { en: 'Providing Technical Fiduciary services and high-stakes consulting.', es: 'Proporcionando servicios de Fiduciaria Técnica y consultoría de alto nivel.' }
        }
    ],
    portfolio: [
        {
            id: 'proj_1',
            title: { en: 'High-Frequency Trading Engine', es: 'Motor de Trading de Alta Frecuencia' },
            description: { en: 'Architected a sub-millisecond latency trading system ensuring regulatory compliance and zero data loss under peak load.', es: 'Arquitectura de un sistema de trading de latencia sub-milisegundo asegurando cumplimiento regulatorio y cero pérdida de datos bajo carga máxima.' },
            imageUrl: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1000',
            tags: ['Rust', 'FPGA', 'Compliance'],
            date: '2023',
            link: '#'
        },
        {
            id: 'proj_2',
            title: { en: 'Sovereign Identity Protocol', es: 'Protocolo de Identidad Soberana' },
            description: { en: 'Decentralized identity solution allowing users to control their own KYC data across multiple banking platforms.', es: 'Solución de identidad descentralizada que permite a los usuarios controlar sus propios datos KYC en múltiples plataformas bancarias.' },
            imageUrl: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=1000',
            tags: ['Blockchain', 'Zero Knowledge', 'Security'],
            date: '2024',
            link: '#'
        }
    ]
  },
  {
    id: 'partner_01',
    email: 'alana@gkodo.com',
    handle: 'A. Turing',
    name: 'Alana Turing',
    roleType: 'PARTNER',
    affiliation: 'GKodo Partner',
    role: { en: 'Strategic AI Advisor', es: 'Asesora Estratégica de IA' },
    bio: {
        en: 'Specialized in non-deterministic algorithms and LLM hallucination mitigation patterns. Ensuring algorithmic accountability across the GKodo ecosystem.',
        es: 'Especializada en algoritmos no deterministas y patrones de mitigación de alucinaciones en LLM. Asegurando la responsabilidad algorítmica en todo el ecosistema GKodo.'
    },
    avatar: 'https://picsum.photos/seed/alana/200/200?grayscale',
    reputation: [{ topic: 'Machine Learning', score: 99, level: 'Authority' }],
    experience: [],
    portfolio: [
        {
            id: 'proj_a1',
            title: { en: 'Neural Net Audit Framework', es: 'Marco de Auditoría de Redes Neuronales' },
            description: { en: 'Automated bias detection system for enterprise-grade LLM deployments.', es: 'Sistema automatizado de detección de sesgos para despliegues de LLM de nivel empresarial.' },
            imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
            tags: ['Python', 'PyTorch', 'Ethics'],
            date: '2024',
            link: '#'
        }
    ]
  },
  {
    id: 'fellow_01',
    email: 'marcus@community.com',
    handle: 'M. Aurelius',
    name: 'Marcus Aurelius',
    roleType: 'FELLOW',
    affiliation: 'Community Fellow',
    role: { en: 'Systems Thinker', es: 'Pensador de Sistemas' },
    bio: {
        en: 'Contributor to the GKodo open governance framework. Specialized in stoic resilience patterns for distributed systems.',
        es: 'Colaborador del marco de gobernanza abierta de GKodo. Especializado en patrones de resiliencia estoica para sistemas distribuidos.'
    },
    avatar: 'https://picsum.photos/seed/marcus/200/200?grayscale',
    reputation: [{ topic: 'System Architecture', score: 65, level: 'Practitioner' }],
    experience: [],
    portfolio: []
  }
];

const ASSETS_DB: PublicationNode[] = [
  // Structure
  { id: 'dom_1', type: 'DOMAIN', title: { en: 'Computational Governance', es: 'Gobernanza Computacional' }, excerpt: { en: 'Law x Code.', es: 'Ley x Código.' }, authorId: 'jdg', contextIds: [], tags: [], status: 'PUBLISHED', reviews: [], version: 1, lastUpdated: '2025-01-01', isLocked: false },
  { id: 'dom_2', type: 'DOMAIN', title: { en: 'Distributed Systems', es: 'Sistemas Distribuidos' }, excerpt: { en: 'Resilience.', es: 'Resiliencia.' }, authorId: 'jdg', contextIds: [], tags: [], status: 'PUBLISHED', reviews: [], version: 1, lastUpdated: '2025-01-01', isLocked: false },
  
  { id: 'spec_1', type: 'SPECIALTY', title: { en: 'AI Risk Management', es: 'Gestión de Riesgos de IA' }, authorId: 'jdg', excerpt: 'Risk.', contextIds: ['dom_1'], tags: [], status: 'PUBLISHED', reviews: [], version: 1, lastUpdated: '2025-01-01', isLocked: false },
  { id: 'spec_2', type: 'SPECIALTY', title: { en: 'Frontend Architecture', es: 'Arquitectura Frontend' }, authorId: 'jdg', excerpt: 'Frontend.', contextIds: ['dom_2'], tags: [], status: 'PUBLISHED', reviews: [], version: 1, lastUpdated: '2025-01-01', isLocked: false },

  // COURSES (Many-to-Many Parents)
  { 
      id: 'course_1', 
      type: 'COURSE', 
      title: { en: 'LLM Guardrails Implementation', es: 'Implementación de Guardrails LLM' }, 
      authorId: 'jdg', 
      excerpt: { en: 'A comprehensive protocol for deploying large language models with strict output validation boundaries.', es: 'Un protocolo completo para desplegar modelos de lenguaje grande con límites estrictos de validación de salida.' }, 
      contextIds: ['spec_1'], 
      tags: ['AI', 'Security'], 
      status: 'PUBLISHED', 
      reviews: [], 
      version: 1, 
      lastUpdated: '2025-01-01', 
      isLocked: false,
      syllabus: ['class_1', 'art_1', 'class_shared_1'],
      level: 'Advanced' 
  },
  { 
      id: 'course_2', 
      type: 'COURSE', 
      title: { en: 'Micro-Frontends at Scale', es: 'Micro-Frontends a Escala' }, 
      authorId: 'jdg', 
      excerpt: { en: 'Architecting federated modules for enterprise applications.', es: 'Arquitectura de módulos federados para aplicaciones empresariales.' }, 
      contextIds: ['spec_2'], 
      tags: ['MFE', 'React'], 
      status: 'PUBLISHED', 
      reviews: [], 
      version: 1, 
      lastUpdated: '2025-01-01', 
      isLocked: false,
      syllabus: ['class_shared_1', 'class_2', 'draft_1'], // Sharing class_shared_1
      level: 'Expert'
  },

  // CONTENT (Classes & Articles)
  { 
    id: 'art_1', 
    type: 'ARTICLE', 
    subtype: 'THEORY',
    title: { en: 'Proposal for a Fiduciary Protocol in Autonomous Agents', es: 'Propuesta para un Protocolo Fiduciario en Agentes Autónomos' },
    excerpt: { en: 'An architectural pattern ensuring audit trails for non-deterministic AI decisions.', es: 'Un patrón arquitectónico que asegura rastros de auditoría para decisiones de IA no deterministas.' },
    contextIds: ['course_1', 'spec_1'], 
    authorId: 'jdg',
    tags: ['AI Governance', 'System Architecture'],
    status: 'PUBLISHED',
    isLocked: true,
    readTime: '15',
    impactFactor: 8.5,
    content: { en: 'Full content here...', es: 'Contenido completo aquí...' },
    version: 1,
    lastUpdated: '2025-05-15',
    reviews: [
        { reviewerId: 'partner_01', verdict: 'APPROVE', comment: { en: 'Sound methodology.', es: 'Metodología sólida.' }, timestamp: '2025-05-10', reputationSnapshot: { en: 'Authority (AI)', es: 'Autoridad (IA)' } }
    ]
  },
  {
      id: 'draft_1',
      type: 'ARTICLE',
      subtype: 'OPINION',
      title: { en: 'Draft: Stoic Resilience in Kubernetes', es: 'Borrador: Resiliencia Estoica en Kubernetes' },
      excerpt: { en: 'Applying Marcus Aurelius principles to pod eviction policies.', es: 'Aplicando principios de Marco Aurelio a políticas de desalojo de pods.' },
      authorId: 'fellow_01',
      status: 'SUBMITTED', // In Queue
      contextIds: ['course_2'],
      readTime: '10',
      tags: ['Kubernetes', 'Philosophy'],
      version: 1,
      lastUpdated: '2025-10-10',
      isLocked: false,
      reviews: [],
      content: { en: 'Draft content...', es: 'Contenido borrador...' }
  },
  {
      id: 'class_shared_1', // SHARED CLASS
      type: 'CLASS',
      title: { en: 'Advanced TypeScript Patterns', es: 'Patrones Avanzados de TypeScript' },
      excerpt: { en: 'Using Generics and Utility Types for robust API definitions.', es: 'Uso de Genéricos y Tipos de Utilidad para definiciones de API robustas.' },
      authorId: 'jdg',
      status: 'PUBLISHED',
      contextIds: ['course_1', 'course_2'], // Belonging to multiple courses
      duration: '55 mins',
      videoUrl: 'secure://video',
      prerequisites: ['TypeScript Basics'],
      tags: ['TypeScript', 'Architecture'],
      version: 1,
      lastUpdated: '2025-03-10',
      isLocked: false,
      reviews: []
  },
  {
      id: 'class_2',
      type: 'CLASS',
      title: { en: 'Module Federation Strategies', es: 'Estrategias de Federación de Módulos' },
      excerpt: { en: 'Runtime integration of independently deployed builds.', es: 'Integración en tiempo de ejecución de compilaciones desplegadas independientemente.' },
      authorId: 'jdg',
      status: 'PUBLISHED',
      contextIds: ['course_2'],
      duration: '40 mins',
      videoUrl: 'secure://video',
      prerequisites: ['Webpack'],
      tags: ['MFE', 'Webpack'],
      version: 1,
      lastUpdated: '2025-04-20',
      isLocked: true,
      reviews: []
  },
  {
      id: 'news_1',
      type: 'NEWS',
      title: { en: 'Security Alert: Node.js Buffer Overflow', es: 'Alerta de Seguridad: Desbordamiento de Búfer en Node.js' },
      excerpt: { en: 'Critical vulnerability detected in Node.js core modules. Immediate patch required for mission-critical systems.', es: 'Vulnerabilidad crítica detectada en módulos centrales de Node.js. Se requiere parche inmediato.' },
      authorId: 'jdg',
      status: 'PUBLISHED',
      priority: 'CRITICAL',
      contextIds: ['dom_2'],
      tags: ['Security', 'Node.js'],
      reviews: [],
      version: 1,
      lastUpdated: '2025-06-01',
      isLocked: false
  }
];

// --- Shared Components (Updated Geometry) ---

const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'sovereign' | 'antique' | 'success' | 'alert'; 
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  isLoading?: boolean;
}> = ({ children, variant = 'primary', className = '', icon, onClick, disabled, type = 'button', isLoading = false }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-medium text-sm transition-all duration-300 tracking-wide uppercase font-sans border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"; // Updated to rounded-lg
  
  const variants = {
    primary: "bg-cyan text-navy-900 border-cyan hover:bg-cyan/90 shadow-glow-cyan focus:ring-cyan",
    secondary: "bg-transparent text-slate-300 border-slate-600 hover:border-slate-400 focus:ring-slate-500",
    outline: "bg-transparent text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-50",
    sovereign: "bg-transparent text-gold border-gold hover:bg-gold/10 shadow-glow-gold focus:ring-gold",
    antique: "bg-transparent text-antique border-antique hover:bg-antique/10 focus:ring-antique",
    success: "bg-success/10 text-success border-success hover:bg-success/20 focus:ring-success",
    alert: "bg-alert/10 text-alert border-alert hover:bg-alert/20 focus:ring-alert"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled || isLoading} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {isLoading ? <Loader2 className="animate-spin mr-2" size={16}/> : icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

const SectionHeading: React.FC<{ title: string; subtitle: string; align?: 'left' | 'center' }> = ({ title, subtitle, align = 'left' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <h2 className="text-antique font-mono text-sm tracking-widest mb-3 uppercase flex items-center gap-2 justify-center md:justify-start">
      {align === 'center' && <span className="w-8 h-[1px] bg-antique/50 inline-block"></span>}
      {subtitle}
      {align === 'left' && <span className="w-16 h-[1px] bg-antique/50 inline-block"></span>}
      {align === 'center' && <span className="w-8 h-[1px] bg-antique/50 inline-block"></span>}
    </h2>
    <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-50 leading-tight">
      {title}
    </h3>
  </div>
);

// --- Scalable Language Selector Component ---

const LanguageSelector: React.FC<{ mobile?: boolean }> = ({ mobile = false }) => {
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLang = SUPPORTED_LANGUAGES.find(l => l.code === language);

  return (
    <div className={`relative ${mobile ? 'w-full' : ''}`} ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-300
          ${isOpen ? 'border-gold bg-navy-800 text-gold shadow-glow-gold' : 'border-slate-700 bg-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'}
          ${mobile ? 'w-full justify-between' : ''}
        `}
        aria-label={t('nav.selectLang')}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <Globe size={16} className={isOpen ? 'animate-pulse' : ''} />
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
            {selectedLang?.code.toUpperCase()}
          </span>
        </div>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`
          absolute z-50 mt-2 bg-navy-900 border border-slate-700 shadow-2xl rounded-lg overflow-hidden min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-200
          ${mobile ? 'w-full static mt-2' : 'right-0'}
        `}>
          <div className="py-1 max-h-60 overflow-y-auto custom-scrollbar">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-3 text-xs font-mono flex items-center justify-between group hover:bg-navy-800 transition-colors
                  ${language === lang.code ? 'text-gold bg-navy-800/50' : 'text-slate-400'}
                `}
              >
                <div className="flex flex-col">
                  <span className="font-bold uppercase tracking-wider group-hover:text-slate-200">{lang.name}</span>
                  <span className="text-[9px] text-slate-600 group-hover:text-slate-500">{lang.nativeName}</span>
                </div>
                {language === lang.code && <Check size={14} className="text-gold" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- CMS Dashboard ---
// (Kept as is, functional and updated)
const AssetInspector: React.FC<{ asset: PublicationNode, currentUser: UserProfile, onClose: () => void }> = ({ asset, currentUser, onClose }) => {
    // ... same as before
    const { t, content } = useTranslation();
    const config = WORKFLOW_CONFIG[asset.type] || { minReviews: 0 };
    const reviewsCount = asset.reviews.length;
    const progress = Math.min((reviewsCount / Math.max(config.minReviews, 1)) * 100, 100);
    const canReview = asset.authorId !== currentUser.id && asset.status === 'SUBMITTED' && currentUser.reputation.some(r => r.score > 80);

    const getTypeIcon = (type: AssetType) => {
        switch(type) {
            case 'ARTICLE': return <ScrollText size={24} className="text-cyan"/>;
            case 'CLASS': return <Video size={24} className="text-gold"/>;
            case 'COURSE': return <GraduationCap size={24} className="text-antique"/>;
            case 'NEWS': return <Newspaper size={24} className="text-success"/>;
            default: return <Database size={24} className="text-slate-400"/>;
        }
    };

    return (
        <div className="bg-navy-900 border border-slate-700 h-full p-8 flex flex-col overflow-y-auto relative animate-in slide-in-from-right duration-300 shadow-2xl">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:text-gold transition-colors"><X size={20}/></button>
            
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-800">
                <div className="p-4 bg-navy-800 rounded-lg border border-slate-700">{getTypeIcon(asset.type)}</div>
                <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-100">{content(asset.title)}</h3>
                    <div className="flex items-center gap-4 mt-2">
                         <span className="text-[10px] font-mono text-gold uppercase tracking-widest font-black border border-gold/30 px-2 py-0.5 rounded-lg">{t(`types.${asset.type}`)}</span>
                         {'subtype' in asset && <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">/ {asset.subtype}</span>}
                    </div>
                </div>
            </div>

            <div className="space-y-12">
                <div className="grid grid-cols-2 gap-8">
                     <div>
                         <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-2 font-bold">{t('common.status')}</p>
                         <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold border rounded-lg ${asset.status === 'APPROVED' ? 'text-success border-success bg-success/10' : 'text-gold border-gold bg-gold/10'}`}>
                            {asset.status === 'UNDER_REVIEW' || asset.status === 'SUBMITTED' ? <Loader2 size={12} className="animate-spin"/> : <Circle size={12} fill="currentColor"/>}
                            {t(`status.${asset.status}`)}
                         </span>
                     </div>
                     <div>
                         <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-2 font-bold">{t('cms.consensus')}</p>
                         <div className="flex items-center gap-3">
                            <div className="flex-grow bg-navy-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-cyan to-gold h-full" style={{width: `${progress}%`}}></div>
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-300">{reviewsCount}/{config.minReviews}</span>
                         </div>
                     </div>
                </div>

                <div className="bg-navy-800/50 p-6 border border-slate-700 rounded-xl">
                    <p className="font-serif italic text-slate-400 leading-relaxed text-sm">"{content(asset.excerpt)}"</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {asset.tags.map(tag => <span key={tag} className="text-[9px] font-mono text-cyan bg-cyan/5 px-2 py-1 rounded-lg border border-cyan/20">{tag}</span>)}
                    </div>
                </div>

                {/* Specific Fields per Type */}
                {'videoUrl' in asset && (
                    <div>
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-2 font-bold">{t('publications.classMedia')}</p>
                        <div className="p-4 bg-black border border-slate-800 flex items-center justify-center h-32 text-slate-600 rounded-xl">
                             <PlayCircle size={32}/>
                        </div>
                    </div>
                )}
                
                {/* Review Log */}
                <div>
                     <h4 className="text-sm font-bold text-slate-100 uppercase tracking-widest border-b border-slate-800 pb-3 mb-6">{t('cms.auditTrail')}</h4>
                     {asset.reviews.length === 0 ? (
                         <p className="text-xs text-slate-500 italic">{t('cms.noReviews')}</p>
                     ) : (
                         <div className="space-y-4">
                             {asset.reviews.map((rev, idx) => (
                                 <div key={idx} className="p-4 bg-navy-800 border-l-2 border-slate-600 rounded-r-lg">
                                     <div className="flex justify-between items-start mb-2">
                                         <span className="text-xs font-bold text-slate-200">{rev.reviewerId}</span>
                                         <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg ${rev.verdict === 'APPROVE' ? 'bg-success/20 text-success' : 'bg-alert/20 text-alert'}`}>{rev.verdict}</span>
                                     </div>
                                     <p className="text-xs text-slate-400 italic mb-2">"{content(rev.comment)}"</p>
                                     <div className="text-[9px] font-mono text-slate-600 uppercase">{content(rev.reputationSnapshot)}</div>
                                 </div>
                             ))}
                         </div>
                     )}
                </div>

                {/* Review Action */}
                {canReview && (
                    <div className="bg-navy-800 p-6 border-t-4 border-gold shadow-2xl mt-8 rounded-b-xl">
                        <h4 className="text-sm font-bold text-gold uppercase tracking-widest mb-4 flex items-center gap-2"><Scale size={16}/> {t('cms.submitReview')}</h4>
                        <textarea className="w-full bg-navy-900 border border-slate-700 p-3 text-sm text-slate-200 outline-none focus:border-gold h-24 mb-4 rounded-lg" placeholder={t('cms.enterAssessment')}></textarea>
                        <div className="flex gap-4">
                            <Button variant="alert" className="flex-1 py-2 text-xs" icon={<AlertCircle size={14}/>}>{t('cms.reject')}</Button>
                            <Button variant="success" className="flex-1 py-2 text-xs" icon={<CheckCircle size={14}/>}>{t('cms.approve')}</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const CMSDashboard: React.FC<{ user: UserProfile }> = ({ user }) => {
  const { t, content } = useTranslation();
  const [activeTab, setActiveTab] = useState<'drafts' | 'review' | 'published'>('drafts');
  const [inspectingAsset, setInspectingAsset] = useState<PublicationNode | null>(null);
  
  const canReview = ['FOUNDER', 'PARTNER', 'ALLIANCE'].includes(user.roleType) || user.reputation.some(r => ['Expert', 'Authority'].includes(r.level));

  const filteredContent = ASSETS_DB.filter(node => {
    if (['DOMAIN', 'SPECIALTY', 'GROUP'].includes(node.type)) return false; 

    if (activeTab === 'drafts') return node.authorId === user.id && ['DRAFT', 'SUBMITTED', 'REVISION_REQUESTED'].includes(node.status);
    if (activeTab === 'review') return (node.status === 'SUBMITTED' || node.status === 'UNDER_REVIEW') && node.authorId !== user.id; 
    if (activeTab === 'published') return ['APPROVED', 'PUBLISHED'].includes(node.status) && (node.authorId === user.id || canReview);
    return false;
  });

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case 'DRAFT': return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
      case 'SUBMITTED': 
      case 'UNDER_REVIEW': return 'text-gold bg-gold/10 border-gold/20 animate-pulse';
      case 'APPROVED': return 'text-cyan bg-cyan/10 border-cyan/20';
      case 'PUBLISHED': return 'text-success bg-success/10 border-success/20';
      case 'REVISION_REQUESTED': return 'text-alert bg-alert/10 border-alert/20';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="container mx-auto px-6 py-24 animate-in fade-in duration-700">
      <SectionHeading title={t('cms.title')} subtitle={t('cms.subtitle')} />
      
      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Sidebar Nav */}
        <div className="lg:w-1/4 space-y-4">
           {/* Stats Cards */}
            <div className="bg-navy-800 border border-slate-700 p-6 mb-8 relative overflow-hidden group rounded-xl">
                <div className="absolute right-0 top-0 p-4 opacity-10 text-gold group-hover:scale-110 transition-transform"><UserCheck size={48} /></div>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold">{t('common.role')}</p>
                <p className="text-xl text-gold font-serif font-bold">{t(`roles.${user.roleType}`)}</p>
            </div>

           <button onClick={() => { setActiveTab('drafts'); setInspectingAsset(null); }} className={`w-full text-left p-4 border flex justify-between items-center transition-all rounded-lg ${activeTab === 'drafts' ? 'bg-navy-800 border-gold text-gold shadow-glow-gold' : 'border-transparent text-slate-400 hover:bg-navy-800 hover:text-slate-200'}`}>
              <span className="font-mono text-xs uppercase tracking-widest font-bold">{t('cms.drafts')}</span>
              <Edit3 size={16} />
           </button>
           {canReview && (
             <button onClick={() => { setActiveTab('review'); setInspectingAsset(null); }} className={`w-full text-left p-4 border flex justify-between items-center transition-all rounded-lg ${activeTab === 'review' ? 'bg-navy-800 border-gold text-gold shadow-glow-gold' : 'border-transparent text-slate-400 hover:bg-navy-800 hover:text-slate-200'}`}>
                <span className="font-mono text-xs uppercase tracking-widest font-bold">{t('cms.reviewQueue')}</span>
                <div className="flex items-center gap-2">
                  {ASSETS_DB.filter(p => p.status === 'SUBMITTED').length > 0 && <span className="w-2 h-2 bg-alert rounded-full animate-pulse"></span>}
                  <FileCheck size={16} />
                </div>
             </button>
           )}
           <button onClick={() => { setActiveTab('published'); setInspectingAsset(null); }} className={`w-full text-left p-4 border flex justify-between items-center transition-all rounded-lg ${activeTab === 'published' ? 'bg-navy-800 border-gold text-gold shadow-glow-gold' : 'border-transparent text-slate-400 hover:bg-navy-800 hover:text-slate-200'}`}>
              <span className="font-mono text-xs uppercase tracking-widest font-bold">{t('cms.published')}</span>
              <Globe size={16} />
           </button>
           
           <div className="mt-8 pt-8 border-t border-slate-800">
              <Button variant="sovereign" className="w-full text-xs font-black" icon={<Rocket size={16}/>}>{t('cms.create')}</Button>
           </div>
        </div>

        {/* Content Area / Master-Detail View */}
        <div className="lg:w-3/4 flex gap-6">
            <div className={`flex-1 bg-navy-800/50 border border-slate-700 p-8 rounded-xl shadow-2xl relative ${inspectingAsset ? 'hidden lg:block lg:w-1/2' : 'w-full'}`}>
                 <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-slate-600 uppercase tracking-widest">PROTOCOL_VIEW: {activeTab.toUpperCase()}</div>
                 
                 {filteredContent.length === 0 ? (
                   <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-4 opacity-50">
                      <Database size={64} strokeWidth={0.5} />
                      <p className="font-mono text-xs uppercase tracking-widest">{t('cms.noData')}</p>
                   </div>
                 ) : (
                   <div className="space-y-3">
                      {filteredContent.map(node => (
                        <div 
                            key={node.id} 
                            onClick={() => setInspectingAsset(node)}
                            className={`bg-navy-900 border p-5 cursor-pointer transition-all group flex flex-col gap-2 rounded-xl ${inspectingAsset?.id === node.id ? 'border-gold shadow-glow-gold' : 'border-slate-700 hover:border-slate-500'}`}
                        >
                           <div className="flex justify-between items-start">
                               <div className="flex items-center gap-3">
                                   <span className={`px-2 py-0.5 text-[8px] font-mono uppercase font-black border rounded-lg ${getStatusColor(node.status)}`}>
                                      {t(`status.${node.status}`)}
                                   </span>
                                   <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{node.type}</span>
                               </div>
                               <ChevronRight size={14} className={`text-slate-600 transition-transform ${inspectingAsset?.id === node.id ? 'text-gold rotate-90' : ''}`} />
                           </div>
                           <h4 className={`text-lg font-serif font-bold transition-colors ${inspectingAsset?.id === node.id ? 'text-gold' : 'text-slate-100 group-hover:text-slate-50'}`}>{content(node.title)}</h4>
                           <p className="text-xs text-slate-400 line-clamp-1 italic">{content(node.excerpt)}</p>
                        </div>
                      ))}
                   </div>
                 )}
            </div>

            {/* Detail View (The Inspector) */}
            {inspectingAsset && (
                <div className="fixed inset-0 z-50 lg:static lg:z-auto lg:block lg:w-1/2 bg-navy-900/95 lg:bg-transparent flex justify-end">
                     <div className="w-full lg:w-full h-full lg:h-auto max-w-2xl lg:max-w-none rounded-l-2xl lg:rounded-none overflow-hidden">
                        <AssetInspector asset={inspectingAsset} currentUser={user} onClose={() => setInspectingAsset(null)} />
                     </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const Circle: React.FC<{ size?: number; fill?: string }> = ({ size = 24, fill = "none" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
);

// --- Redesigned Knowledge Repository System (v2.0) ---

const PublicationsSystem: React.FC<{ user: UserProfile | null; onLoginReq: () => void }> = ({ user, onLoginReq }) => {
  const { t, content } = useTranslation();
  const [activeNode, setActiveNode] = useState<PublicationNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<AssetType | 'ALL'>('ALL');

  // Intelligent Search & Filtering
  const filteredAssets = ASSETS_DB.filter(node => {
    // Only show publishable content types
    if (['DOMAIN', 'SPECIALTY', 'GROUP'].includes(node.type)) return false; 
    
    // Status Check
    if (node.status !== 'PUBLISHED' && node.status !== 'APPROVED') return false;

    // Type Filter
    if (selectedType !== 'ALL' && node.type !== selectedType) return false;

    // Search Query (Deep Search)
    const query = searchQuery.toLowerCase();
    const title = content(node.title).toLowerCase();
    const excerpt = content(node.excerpt).toLowerCase();
    const tags = node.tags.join(' ').toLowerCase();
    
    return title.includes(query) || excerpt.includes(query) || tags.includes(query);
  });

  // Render Discovery View (Library)
  const renderDiscovery = () => (
    <div className="animate-in fade-in duration-700">
        <div className="mb-12 text-center max-w-2xl mx-auto">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-antique mb-3 font-bold">{t('publications.repo')}</h4>
            <p className="text-slate-400 font-serif italic mb-8">{t('publications.sub')}</p>
            
            <div className="relative group">
                <input 
                    type="text" 
                    placeholder={t('publications.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-navy-800 border-2 border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-slate-50 focus:border-gold focus:shadow-glow-gold outline-none transition-all placeholder:text-slate-500 font-sans"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-gold transition-colors" size={20} />
            </div>
        </div>

        {/* Type Segregation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
                { type: 'ALL', label: t('publications.filterAll'), icon: <Layers size={14}/> },
                { type: 'ARTICLE', label: t('publications.filterArticle'), icon: <ScrollText size={14}/> },
                { type: 'CLASS', label: t('publications.filterClass'), icon: <Video size={14}/> },
                { type: 'COURSE', label: t('publications.filterCourse'), icon: <GraduationCap size={14}/> },
                { type: 'NEWS', label: t('publications.filterNews'), icon: <Newspaper size={14}/> }
            ].map((filter) => (
                <button 
                    key={filter.type}
                    onClick={() => setSelectedType(filter.type as any)}
                    className={`
                        flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all
                        ${selectedType === filter.type 
                            ? 'bg-gold text-navy-900 shadow-glow-gold scale-105' 
                            : 'bg-navy-800 text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-200'}
                    `}
                >
                    {filter.icon}
                    {filter.label}
                </button>
            ))}
        </div>

        {/* Asset Grid (Masonry-ish) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAssets.map(asset => (
                <div 
                    key={asset.id}
                    onClick={() => setActiveNode(asset)}
                    className="group bg-navy-800 border border-slate-700 rounded-2xl p-8 hover:border-gold hover:translate-y-[-4px] transition-all cursor-pointer relative overflow-hidden flex flex-col h-full shadow-lg"
                >
                    {/* Top Meta */}
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-xl ${asset.type === 'NEWS' ? 'bg-alert/10 text-alert' : asset.type === 'CLASS' ? 'bg-gold/10 text-gold' : 'bg-cyan/10 text-cyan'}`}>
                            {asset.type === 'ARTICLE' && <ScrollText size={20}/>}
                            {asset.type === 'CLASS' && <Video size={20}/>}
                            {asset.type === 'COURSE' && <GraduationCap size={20}/>}
                            {asset.type === 'NEWS' && <Newspaper size={20}/>}
                        </div>
                        {asset.isLocked && !user && <Lock size={16} className="text-slate-500" />}
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        <h3 className="text-xl font-serif font-bold text-slate-100 mb-3 group-hover:text-gold transition-colors line-clamp-2">
                            {content(asset.title)}
                        </h3>
                        <p className="text-sm text-slate-400 line-clamp-3 mb-6 font-sans leading-relaxed">
                            {content(asset.excerpt)}
                        </p>
                    </div>

                    {/* Footer Meta */}
                    <div className="pt-6 border-t border-slate-700/50 flex flex-wrap gap-3 items-center text-[10px] font-mono uppercase tracking-wider text-slate-500">
                        {'readTime' in asset && (
                            <span className="flex items-center gap-1"><Clock size={12}/> {asset.readTime} {t('publications.mins')}</span>
                        )}
                        {'duration' in asset && (
                            <span className="flex items-center gap-1"><Clock size={12}/> {asset.duration}</span>
                        )}
                        {'impactFactor' in asset && (
                            <span className="flex items-center gap-1 text-gold"><Star size={12}/> IF: {asset.impactFactor}</span>
                        )}
                        {asset.type === 'NEWS' && <span className="text-alert font-bold">PRIORITY: {asset.priority}</span>}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  // Render Course Syllabus View
  const renderCourseHub = (course: CourseAsset) => {
      const isLocked = course.isLocked && !user;
      
      return (
        <div className="animate-in slide-in-from-right duration-500">
             <div className="mb-8 flex items-center gap-4">
                <button onClick={() => setActiveNode(null)} className="flex items-center gap-2 text-slate-400 hover:text-gold transition-colors text-xs font-mono uppercase tracking-widest">
                    <ArrowLeft size={16} /> {t('publications.backToLib')}
                </button>
                <span className="text-slate-600">/</span>
                <span className="text-xs font-mono text-antique uppercase tracking-widest">{t('publications.courseSyllabus')}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Course Header */}
                <div className="lg:col-span-3 bg-navy-800 p-12 border-2 border-slate-700 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-antique/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-3 px-3 py-1 bg-antique/10 border border-antique/20 rounded-full text-[10px] text-antique font-mono font-black uppercase tracking-widest mb-6">
                                <GraduationCap size={14}/> {course.level} Protocol
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-50 mb-6">{content(course.title)}</h1>
                            <p className="text-xl text-slate-300 font-serif italic leading-relaxed">{content(course.excerpt)}</p>
                        </div>
                        <div className="flex flex-col gap-4 min-w-[200px]">
                             <Button variant="sovereign" className="w-full" icon={<Play size={16}/>} onClick={() => {}} disabled={isLocked}>{t('publications.startCourse')}</Button>
                             {isLocked && <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest"><Lock size={10} className="inline mr-1"/> Restricted Access</p>}
                        </div>
                    </div>
                </div>

                {/* Syllabus List */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-slate-100 font-serif border-b border-slate-700 pb-4 mb-6">{t('publications.modules')}</h3>
                    <div className="space-y-4">
                        {course.syllabus.map((itemId, idx) => {
                            const item = ASSETS_DB.find(a => a.id === itemId);
                            if (!item) return null;
                            const isItemLocked = (item.isLocked || course.isLocked) && !user;

                            return (
                                <div 
                                    key={item.id} 
                                    onClick={() => !isItemLocked && setActiveNode(item)}
                                    className={`group flex items-center gap-6 p-6 rounded-xl border transition-all ${isItemLocked ? 'opacity-50 bg-navy-900 border-slate-800 cursor-not-allowed' : 'bg-navy-800 border-slate-700 hover:border-gold cursor-pointer hover:shadow-lg'}`}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-navy-900 border border-slate-700 text-slate-500 font-mono font-bold">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`text-[9px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider ${item.type === 'CLASS' ? 'bg-gold/10 text-gold' : 'bg-cyan/10 text-cyan'}`}>
                                                {t(`types.${item.type}`)}
                                            </span>
                                            {'duration' in item && <span className="text-[10px] text-slate-500 flex items-center gap-1"><Clock size={10}/> {item.duration}</span>}
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-200 group-hover:text-gold transition-colors">{content(item.title)}</h4>
                                    </div>
                                    <div className="text-slate-600 group-hover:text-gold transition-colors">
                                        {isItemLocked ? <Lock size={20}/> : <PlayCircle size={24}/>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="bg-navy-800 p-6 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-600">
                                <img src={USERS.find(u => u.id === course.authorId)?.avatar} className="w-full h-full object-cover grayscale" alt="Author"/>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Instructor</p>
                                <p className="font-bold text-slate-100">{USERS.find(u => u.id === course.authorId)?.name}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                                <span className="text-slate-400">Items</span>
                                <span className="font-mono text-slate-200">{course.syllabus.length}</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                                <span className="text-slate-400">Level</span>
                                <span className="font-mono text-slate-200">{course.level}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  };

  // Render Reader View (Content)
  const renderReader = () => {
    if (!activeNode) return null;
    const isLocked = activeNode.isLocked && !user;

    // Find courses that include this asset (Many-to-Many lookup)
    const parentCourses = ASSETS_DB.filter(node => 
        node.type === 'COURSE' && (node as CourseAsset).syllabus.includes(activeNode.id)
    );

    return (
        <div className="animate-in slide-in-from-right duration-500">
            {/* Breadcrumb / Nav */}
            <div className="mb-8 flex items-center gap-4">
                <button onClick={() => setActiveNode(null)} className="flex items-center gap-2 text-slate-400 hover:text-gold transition-colors text-xs font-mono uppercase tracking-widest">
                    <ArrowLeft size={16} /> {t('publications.backToLib')}
                </button>
                <span className="text-slate-600">/</span>
                <span className="text-xs font-mono text-cyan uppercase tracking-widest">{t(`types.${activeNode.type}`)}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <div className="bg-navy-900 border border-slate-700 rounded-2xl p-12 relative overflow-hidden shadow-2xl">
                        {/* Header */}
                        <div className="mb-12 border-b border-slate-800 pb-8">
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-50 mb-6 leading-tight">
                                {content(activeNode.title)}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-2"><Calendar size={14}/> {activeNode.lastUpdated}</span>
                                {'readTime' in activeNode && <span className="flex items-center gap-2"><Clock size={14}/> {activeNode.readTime} {t('publications.readTime')}</span>}
                                <span className="flex items-center gap-2 text-gold"><UserCheck size={14}/> {USERS.find(u => u.id === activeNode.authorId)?.name || 'GKodo'}</span>
                            </div>
                        </div>

                        {/* Content Body */}
                        {isLocked ? (
                            <div className="py-20 text-center relative">
                                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                                <Lock size={64} className="mx-auto text-gold mb-6 opacity-80" />
                                <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">{t('publications.locked')}</h3>
                                <p className="text-slate-400 mb-10 relative z-10 max-w-md mx-auto leading-relaxed italic">"{t('publications.lockedMsg')}"</p>
                                <Button variant="sovereign" onClick={onLoginReq} className="relative z-10 px-10 shadow-glow-gold">{t('common.identifySession')}</Button>
                            </div>
                        ) : (
                            <div className="prose prose-invert max-w-none prose-p:font-sans prose-p:text-slate-300 prose-headings:font-serif prose-headings:text-slate-100 prose-a:text-cyan hover:prose-a:text-gold">
                                <div className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-12 italic border-l-4 border-antique pl-8 font-serif font-light text-justify">
                                    {content(activeNode.excerpt)}
                                </div>
                                
                                {'videoUrl' in activeNode && (
                                    <div className="aspect-video bg-black flex items-center justify-center border border-slate-700 mb-12 text-slate-600 rounded-xl relative group cursor-pointer overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        <PlayCircle size={80} strokeWidth={1} className="text-slate-200 group-hover:text-gold group-hover:scale-110 transition-all duration-500 relative z-10"/>
                                        <p className="absolute bottom-6 left-6 text-slate-300 font-mono text-xs uppercase tracking-widest z-10">{t('publications.classMedia')}</p>
                                    </div>
                                )}

                                <div className="space-y-8 text-lg leading-relaxed text-justify">
                                    {/* Placeholder for content rendering */}
                                    <p>{'content' in activeNode ? content(activeNode.content) : "Content secure."}</p>
                                    <p>The architectural paradigms discussed herein require a fundamental shift in how we perceive state management in distributed systems...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Context */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Parent Courses Logic - Many to Many Display */}
                    {parentCourses.length > 0 && (
                        <div className="bg-navy-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                            <h5 className="text-xs font-bold text-gold uppercase tracking-widest mb-4 border-b border-slate-700 pb-2 flex items-center gap-2"><Layers size={14}/> {t('publications.includedIn')}</h5>
                            <div className="space-y-3">
                                {parentCourses.map((course: any) => (
                                    <div 
                                        key={course.id} 
                                        onClick={() => setActiveNode(course)}
                                        className="group cursor-pointer p-3 rounded-lg hover:bg-navy-900 border border-transparent hover:border-slate-700 transition-all"
                                    >
                                        <div className="text-[10px] text-slate-500 font-mono mb-1">{course.level}</div>
                                        <div className="text-sm font-bold text-slate-200 group-hover:text-gold transition-colors flex items-center justify-between">
                                            {content(course.title)}
                                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-navy-800 p-6 rounded-xl border border-slate-700">
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">Tags</h5>
                        <div className="flex flex-wrap gap-2">
                            {activeNode.tags.map(tag => (
                                <span key={tag} className="text-[10px] bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full border border-slate-600 hover:border-gold hover:text-gold transition-colors cursor-pointer">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-24 min-h-[80vh]">
        {!activeNode ? renderDiscovery() : (activeNode.type === 'COURSE' ? renderCourseHub(activeNode as CourseAsset) : renderReader())}
    </div>
  );
};

// ... (ProfileSystem, MainContent, App - preserved with minor updates to use new ASSETS_DB if needed, though they mostly consume USERS) ...

const ProfileSystem: React.FC = () => {
    const { t, content } = useTranslation();
    const [selected, setSelected] = useState<UserProfile | null>(null);
    
    if (selected) {
      return (
        <div className="container mx-auto px-6 py-12">
          <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-slate-500 hover:text-gold mb-12 uppercase text-xs font-mono transition-all hover:-translate-x-1"><ArrowLeft size={16}/> {t('common.back')}</button>
          <div className="bg-slate-50 text-navy-900 p-12 md:p-24 shadow-2xl relative cv-container animate-in fade-in zoom-in duration-700 rounded-2xl overflow-hidden border-t-8 border-navy-900">
             <div className="absolute top-12 right-12 text-[10px] font-mono opacity-30 hidden md:block tracking-widest uppercase">Validated_Fiduciary_Record_{selected.id.toUpperCase()}</div>
             <h1 className="text-6xl md:text-8xl font-serif font-bold uppercase mb-4 leading-none tracking-tighter text-navy-900">{selected.name}</h1>
             <h2 className="text-2xl font-mono text-antique font-bold mb-20 uppercase tracking-[0.3em] flex items-center gap-4">
                 {content(selected.role)}
                 <span className="h-[2px] w-24 bg-antique"></span>
             </h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                <div className="col-span-1 space-y-16">
                   <div className="relative group overflow-hidden border-4 border-navy-900 shadow-2xl rounded-2xl">
                      <img src={selected.avatar} className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105" alt="Profile" />
                      <div className="absolute inset-0 border-8 border-white/20 pointer-events-none rounded-2xl"></div>
                   </div>
                   <div>
                      <h4 className="font-bold border-b-2 border-navy-900 pb-3 mb-8 uppercase text-sm tracking-[0.2em] text-navy-900">{t('common.expertMatrix')}</h4>
                      <div className="space-y-8">
                         {selected.reputation.map(r => (
                            <div key={r.topic}>
                               <div className="flex justify-between text-[12px] font-bold uppercase mb-3 text-navy-800"><span>{r.topic}</span><span className="text-antique font-black">{r.score}%</span></div>
                               <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner">
                                  <div className="h-full bg-navy-900 rounded-full" style={{width: `${r.score}%`}}></div>
                               </div>
                               <div className="text-[10px] font-mono text-slate-400 mt-2 text-right uppercase tracking-wider font-bold">Status: {r.level}</div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
                <div className="col-span-2 space-y-20">
                   <section>
                      <h4 className="font-bold border-b-2 border-navy-900 pb-4 mb-10 uppercase text-sm tracking-[0.2em] text-navy-900">{t('common.execMandate')}</h4>
                      <p className="font-serif leading-relaxed text-2xl text-justify text-slate-800 font-light">{content(selected.bio)}</p>
                   </section>
                   <section>
                      <h4 className="font-bold border-b-2 border-navy-900 pb-4 mb-12 uppercase text-sm tracking-[0.2em] text-navy-900">{t('common.opHistory')}</h4>
                      <div className="space-y-16 pl-10 border-l-2 border-slate-200 ml-5">
                         {selected.experience.map((e, i) => (
                            <div key={i} className="relative experience-item">
                               <span className="absolute -left-[51px] top-1.5 w-5 h-5 bg-navy-900 rounded-full border-4 border-white shadow-md"></span>
                               <div className="flex justify-between items-baseline mb-4">
                                  <p className="font-bold text-3xl leading-none text-navy-900 tracking-tight">{content(e.role)}</p>
                                  <span className="text-sm text-slate-500 italic font-serif">{content(e.period)}</span>
                               </div>
                               <p className="text-antique font-mono text-base font-black uppercase tracking-[0.3em] mb-6">{e.company}</p>
                               <p className="text-slate-700 leading-relaxed text-xl text-justify font-serif">{content(e.description)}</p>
                            </div>
                         ))}
                      </div>
                   </section>
                   
                   {/* NEW PORTFOLIO SECTION */}
                   {selected.portfolio && selected.portfolio.length > 0 && (
                       <section className="break-inside-avoid">
                          <h4 className="font-bold border-b-2 border-navy-900 pb-4 mb-12 uppercase text-sm tracking-[0.2em] text-navy-900">{t('common.portfolio')}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                             {selected.portfolio.map((item) => (
                                <div key={item.id} className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                                    <div className="aspect-video relative overflow-hidden bg-slate-100">
                                        <img src={item.imageUrl} alt={content(item.title)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                                        <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">{item.date}</span>
                                            {item.link && <ExternalLink size={16} className="text-slate-400 group-hover:text-antique transition-colors" />}
                                        </div>
                                        <h5 className="text-xl font-bold font-serif text-navy-900 mb-3 leading-tight group-hover:text-antique transition-colors">{content(item.title)}</h5>
                                        <p className="text-sm text-slate-600 mb-6 font-serif italic line-clamp-3 flex-grow">{content(item.description)}</p>
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                                            {item.tags.map(tag => (
                                                <span key={tag} className="text-[9px] font-mono uppercase font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                             ))}
                          </div>
                       </section>
                   )}
                </div>
             </div>
             <div className="mt-24 pt-16 border-t border-slate-200 no-print flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex items-center gap-6">
                    <Logo variant="icon" className="text-navy-900 opacity-10 scale-90" />
                    <div className="text-[11px] font-mono text-slate-400 uppercase leading-loose tracking-widest font-bold">
                      {t('common.officialDossier')}<br/>
                      {t('common.verifiedMember')}: {selected.affiliation.toUpperCase()}
                    </div>
                </div>
                <Button variant="sovereign" onClick={() => window.print()} className="bg-navy-900 border-navy-900 text-slate-50 hover:bg-navy-800 px-12 py-5 shadow-2xl" icon={<Download size={22}/>}>{t('common.export')}</Button>
             </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-6 py-12">
        <SectionHeading title={t('sections.allianceTitle')} subtitle={t('sections.allianceSub')} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {USERS.map(u => (
            <div key={u.id} onClick={() => setSelected(u)} className="group bg-navy-800 border border-slate-700 p-10 cursor-pointer hover:border-gold transition-all hover:-translate-y-3 relative overflow-hidden shadow-2xl rounded-2xl">
              <div className="absolute top-0 right-0 p-5 font-mono text-[9px] text-slate-700 group-hover:text-gold/30 transition-colors uppercase tracking-widest font-bold">MEMBER_{u.id.toUpperCase()}</div>
              <div className="flex items-center gap-8 mb-10">
                <div className="relative">
                  <img src={u.avatar} className="w-24 h-24 grayscale rounded-xl border-2 border-slate-700 group-hover:grayscale-0 transition-all duration-700 shadow-xl" alt={u.name} />
                  <div className="absolute -bottom-2 -right-2 bg-antique p-1 shadow-lg rounded-lg"><UserCheck size={14} className="text-navy-900" /></div>
                </div>
                <div>
                   <h4 className="font-bold text-2xl group-hover:text-gold transition-colors font-serif tracking-tight">{u.name}</h4>
                   <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.2em] mt-2 font-bold">{content(u.role)}</p>
                   <div className="mt-4 inline-flex px-3 py-1 bg-antique/10 border border-antique/30 rounded-lg text-[10px] text-antique font-mono font-black tracking-widest uppercase">{t(`roles.${u.roleType}`)}</div>
                </div>
              </div>
              <div className="pt-8 border-t border-slate-700/50 flex justify-between items-center text-[10px] text-slate-500 font-mono uppercase tracking-[0.3em] font-bold">
                <span className="flex items-center gap-2 group-hover:text-success transition-colors"><BadgeCheck size={12}/> {t('common.verifiedMember')}</span>
                <span className="flex items-center gap-2 group-hover:text-cyan group-hover:translate-x-2 transition-all">Dossier <ArrowRight size={14}/></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

// --- Data Constants (Multilingual) ---

const SERVICES_DATA = [
  {
    id: 's1',
    icon: <ShieldCheck size={48} />,
    title: { en: 'Fiduciary Engineering', es: 'Ingeniería Fiduciaria' },
    description: { en: 'Technical oversight acting as a fiduciary for your software assets, ensuring code quality meets business liability standards.', es: 'Supervisión técnica actuando como fiduciario de sus activos de software, asegurando que la calidad del código cumpla con los estándares de responsabilidad empresarial.' },
    deliverables: ['Code Audits', 'Architecture Review', 'Risk Assessment'],
    category: 'Governance'
  },
  {
    id: 's2',
    icon: <Cpu size={48} />,
    title: { en: 'System Architecture', es: 'Arquitectura de Sistemas' },
    description: { en: 'Designing resilient distributed systems that withstand high-load environments and minimize technical debt.', es: 'Diseño de sistemas distribuidos resilientes que soportan entornos de alta carga y minimizan la deuda técnica.' },
    deliverables: ['Cloud Native Design', 'Microservices Strategy', 'Scalability Planning'],
    category: 'Architecture'
  },
  {
    id: 's3',
    icon: <Scale size={48} />,
    title: { en: 'Technical Due Diligence', es: 'Due Diligence Técnica' },
    description: { en: 'Rigorous assessment of software IP during M&A to validate value and uncover hidden liabilities.', es: 'Evaluación rigurosa de la PI de software durante M&A para validar el valor y descubrir pasivos ocultos.' },
    deliverables: ['IP Valuation', 'Codebase Analysis', 'Team Capability Audit'],
    category: 'Advisory'
  },
  {
    id: 's4',
    icon: <Terminal size={48} />,
    title: { en: 'Platform Engineering', es: 'Ingeniería de Plataforma' },
    description: { en: 'Building the internal developer platforms that accelerate delivery while enforcing compliance and security.', es: 'Construcción de plataformas internas de desarrollo que aceleran la entrega mientras hacen cumplir el cumplimiento y la seguridad.' },
    deliverables: ['DevOps Pipelines', 'Infrastructure as Code', 'Developer Experience'],
    category: 'Operations'
  }
];

const PRODUCTS_DATA = [
  {
    id: 'p1',
    icon: <BookOpen size={48} />,
    model: 'KNOWLEDGE_BASE',
    title: { en: 'The Codex', es: 'El Códice' },
    description: { en: 'A comprehensive library of architectural patterns and decision records for enterprise systems.', es: 'Una biblioteca completa de patrones arquitectónicos y registros de decisiones para sistemas empresariales.' },
    features: ['Pattern Library', 'Decision Trees', 'Anti-patterns']
  },
  {
    id: 'p2',
    icon: <Box size={48} />,
    model: 'COMPONENT_LIB',
    title: 'Titan UI',
    description: { en: 'A React-based component system designed for mission-critical dashboards and data visualization.', es: 'Un sistema de componentes basado en React diseñado para paneles de control de misión crítica y visualización de datos.' },
    features: ['Accessible', 'Themable', 'Performance Optimized']
  },
  {
    id: 'p3',
    icon: <Network size={48} />,
    model: 'OBSERVABILITY',
    title: 'Sentry Grid',
    description: { en: 'Monitoring solutions for distributed systems to ensure uptime and rapid incident response.', es: 'Soluciones de monitoreo para sistemas distribuidos para asegurar tiempo de actividad y respuesta rápida a incidentes.' },
    features: ['Real-time Alerts', 'Distributed Tracing', 'Log Aggregation']
  }
];

const LEADERS = [
  {
    name: 'John D. Gómez H.',
    role: { en: 'Principal Strategist', es: 'Estratega Principal' },
    bio: { en: 'Over 15 years of experience in distributed systems and technical leadership. Obsessed with the intersection of code and law.', es: 'Más de 15 años de experiencia en sistemas distribuidos y liderazgo técnico. Obsesionado con la intersección entre código y ley.' },
    image: 'https://picsum.photos/seed/jdg/400/500?grayscale',
    metrics: [
        { value: '15+', label: 'Years Exp' },
        { value: '50+', label: 'Projects' }
    ]
  },
  {
    name: 'Alana Turing',
    role: { en: 'Strategic AI Advisor', es: 'Asesora Estratégica de IA' },
    bio: { en: 'Pioneering work in non-deterministic algorithms and AI governance frameworks.', es: 'Trabajo pionero en algoritmos no deterministas y marcos de gobernanza de IA.' },
    image: 'https://picsum.photos/seed/alana/400/500?grayscale',
    metrics: [
        { value: '10+', label: 'Patents' },
        { value: '100+', label: 'Citations' }
    ]
  }
];

const AuthSystem: React.FC<{ onAuthenticated: (user: UserProfile) => void }> = ({ onAuthenticated }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleLogin = (userId: string) => {
        setIsLoading(true);
        setTimeout(() => {
            const user = USERS.find(u => u.id === userId);
            if (user) onAuthenticated(user);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="container mx-auto px-6 py-24 flex items-center justify-center min-h-[60vh]">
            <div className="bg-navy-800 p-12 border border-slate-700 shadow-2xl max-w-lg w-full relative overflow-hidden rounded-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan to-gold"></div>
                <div className="mb-10 text-center">
                    <ShieldCheck size={48} className="mx-auto text-gold mb-4" />
                    <h3 className="text-2xl font-serif font-bold text-slate-50">{t('auth.security')}</h3>
                    <p className="text-slate-400 mt-2 font-mono text-xs uppercase tracking-widest">{t('auth.portal')}</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('auth.credsLabel')}</label>
                        <input className="w-full bg-navy-900 border border-slate-600 p-3 text-slate-200 outline-none focus:border-gold transition-colors rounded-lg" type="password" placeholder="••••••••••••" />
                    </div>
                    <Button variant="sovereign" className="w-full py-4 font-black shadow-glow-gold" onClick={() => handleLogin('jdg')} isLoading={isLoading}>
                        {t('auth.identify')}
                    </Button>
                </div>
                
                <div className="mt-10 pt-10 border-t border-slate-700">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center mb-6">{t('auth.demo')}</p>
                    <div className="grid grid-cols-2 gap-4">
                        {USERS.map(u => (
                            <button key={u.id} onClick={() => handleLogin(u.id)} className="p-3 border border-slate-700 hover:border-cyan hover:bg-navy-900 transition-all text-left flex items-center gap-3 group rounded-lg">
                                <div className="w-8 h-8 bg-slate-700 rounded-full overflow-hidden">
                                    <img src={u.avatar} alt={u.name} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-bold text-slate-300 group-hover:text-cyan uppercase">{u.handle}</span>
                                    <span className="text-[8px] text-slate-500">{t(`roles.${u.roleType}`)}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
  
// --- Main App Controller ---

function MainContent() {
  const { t, content } = useTranslation();
  const [view, setView] = useState<AppViewType>('landing');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // FIX: Recharts calculates width based on container. If container is 'display: none' (e.g. mobile hidden),
  // it gets width 0 or -1, throwing warnings. We only render chart when visible (lg breakpoint).
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ to, label }: { to: AppViewType, label: string }) => (
    <button 
      onClick={() => { setView(to); setIsMenuOpen(false); }} 
      className={`text-[11px] font-mono uppercase tracking-[0.3em] font-bold hover:text-gold transition-all relative group ${view === to ? 'text-gold' : 'text-slate-400'}`}
    >
        {label}
        <span className={`absolute -bottom-2 left-0 w-full h-[1.5px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${view === to ? 'scale-x-100' : ''}`}></span>
    </button>
  );

  return (
    <div className="min-h-screen bg-navy-900 text-slate-50 flex flex-col font-sans relative selection:bg-antique selection:text-navy-900 antialiased overflow-x-hidden">
      {/* Visual Identity Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-pattern blueprint-grid opacity-[0.08]"></div>
        <div className="absolute inset-0 bg-radial-fade"></div>
      </div>

      {/* Persistent Navigation System */}
      <nav className={`fixed w-full z-50 transition-all border-b no-print ${scrolled ? 'bg-navy-900/95 backdrop-blur-xl border-slate-800 py-5 shadow-2xl' : 'bg-transparent border-transparent py-12'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div onClick={() => setView('landing')} className="cursor-pointer hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <Logo />
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            <NavLink to="landing" label={t('nav.home')} />
            <NavLink to="about" label={t('nav.leadership')} />
            <NavLink to="services" label={t('nav.services')} />
            <NavLink to="products" label={t('nav.products')} />
            <NavLink to="publications" label={t('nav.publications')} />
            <NavLink to="profiles" label={t('nav.alliance')} />
            <NavLink to="contact" label={t('nav.contact')} />
            
            <div className="flex items-center gap-6 border-l border-slate-800 pl-10 ml-4">
                <LanguageSelector />
                {currentUser ? (
                <div className="flex items-center gap-4">
                    <button onClick={() => setView('cms')} className="text-[11px] font-mono text-gold font-black uppercase tracking-[0.2em] border-b border-dashed border-gold/50 hover:border-gold">{currentUser.handle}</button>
                    <button onClick={() => { setCurrentUser(null); setView('landing'); }}>
                        <LogOut size={20} className="text-slate-500 hover:text-alert transition-colors" />
                    </button>
                </div>
                ) : (
                <Button variant="sovereign" className="px-8 py-2 text-[10px] font-black tracking-[0.2em]" onClick={() => setView('auth')}>
                    {t('nav.identify')}
                </Button>
                )}
            </div>
          </div>

          <button className="lg:hidden text-slate-50 p-3 border border-slate-800 rounded-lg bg-navy-800/80 backdrop-blur-md" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28}/> : <Menu size={28}/>}
          </button>
        </div>

        {/* Responsive Mobile Overlay - FIXED AND ROBUST */}
        {isMenuOpen && (
            <div className="fixed inset-0 z-50 bg-navy-900/98 backdrop-blur-2xl flex flex-col animate-in slide-in-from-top duration-300">
                <div className="flex justify-between items-center p-6 border-b border-slate-800">
                   <Logo />
                   <button onClick={() => setIsMenuOpen(false)} className="p-2 border border-slate-700 rounded-lg hover:border-gold text-slate-400 hover:text-gold transition-colors">
                     <X size={24} />
                   </button>
                </div>
                
                <div className="flex-grow overflow-y-auto p-8 flex flex-col gap-8">
                    <div className="grid grid-cols-1 gap-6">
                        <NavLink to="landing" label={t('nav.home')} />
                        <NavLink to="about" label={t('nav.leadership')} />
                        <NavLink to="services" label={t('nav.services')} />
                        <NavLink to="products" label={t('nav.products')} />
                        <NavLink to="publications" label={t('nav.publications')} />
                        <NavLink to="profiles" label={t('nav.alliance')} />
                        <NavLink to="contact" label={t('nav.contact')} />
                    </div>

                    <div className="border-t border-slate-800 pt-8 space-y-6">
                         <div>
                            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-3 font-bold">{t('nav.selectLang')}</p>
                            <LanguageSelector mobile={true} />
                         </div>

                        {!currentUser && <Button variant="sovereign" className="w-full py-5 text-sm font-black" onClick={() => { setView('auth'); setIsMenuOpen(false); }}>{t('nav.identify')}</Button>}
                        {currentUser && (
                            <div className="flex flex-col gap-4">
                                <button onClick={() => { setView('cms'); setIsMenuOpen(false); }} className="flex justify-between items-center bg-navy-800 p-4 border border-gold/20 rounded-lg">
                                    <span className="text-sm font-mono text-gold font-black tracking-widest uppercase">{currentUser.handle}</span>
                                    <BadgeCheck size={18} className="text-gold" />
                                </button>
                                <Button variant="outline" className="w-full py-4" onClick={() => { setCurrentUser(null); setView('landing'); setIsMenuOpen(false); }}>{t('common.logout')}</Button>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="p-6 border-t border-slate-800 flex justify-center gap-8 text-slate-500 opacity-50">
                    <Linkedin size={20}/>
                    <Github size={20}/>
                    <Globe size={20}/>
                </div>
            </div>
        )}
      </nav>

      {/* Main Orchestrator */}
      <main className="pt-40 flex-grow relative z-10 print:pt-0">
        
        {/* LANDING VIEW */}
        {view === 'landing' && (
          <section className="container mx-auto px-6 py-24 md:py-40 flex flex-col lg:flex-row items-center gap-32">
            <div className="flex-1 space-y-16 animate-in fade-in slide-in-from-bottom duration-1000">
              <div className="inline-flex items-center gap-4 text-[11px] font-mono text-cyan bg-cyan/5 border border-cyan/30 px-5 py-2.5 rounded-full font-black">
                  <Activity size={14} className="animate-pulse text-cyan"/> {t('hero.status')}
              </div>
              <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter leading-[0.8] text-slate-50">
                {t('hero.title')} <br/>
                <span className="text-antique font-serif italic">{t('hero.fiduciary')}</span>
              </h1>
              <p className="text-2xl md:text-3xl text-slate-400 max-w-3xl leading-relaxed border-l-4 border-antique pl-12 font-serif font-light italic">
                {t('hero.p1')}
              </p>
              <div className="flex flex-wrap gap-8 pt-8">
                <Button variant="sovereign" className="px-14 py-6 text-base font-black shadow-glow-gold" icon={<Rocket size={24}/>} onClick={() => setView('products')}>{t('common.digitalAssets')}</Button>
                <Button variant="antique" className="px-14 py-6 text-base font-black" onClick={() => setView('services')} icon={<Code2 size={24}/>}>{t('common.bespokeBuilds')}</Button>
              </div>
            </div>
            
            {/* Conditional Rendering using Hook to prevent Recharts console warnings on mobile hidden views */}
            {isLargeScreen && (
                <div className="flex-1 hidden lg:block relative animate-in fade-in zoom-in duration-1000 delay-500">
                    <div className="relative bg-navy-800/80 p-14 border border-slate-700 rounded-xl shadow-2xl backdrop-blur-3xl border-l-gold/40 border-t-gold/40">
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={[{n:'JAN',v:35},{n:'FEB',v:48},{n:'MAR',v:72},{n:'APR',v:98}]}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#D97706" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="n" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} dy={15}/>
                                    <Area type="monotone" dataKey="v" stroke="#D97706" fill="url(#colorValue)" strokeWidth={6} animationDuration={3000}/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
          </section>
        )}

        {/* SERVICES VIEW */}
        {view === 'services' && (
          <div className="container mx-auto px-6 py-24 animate-in fade-in duration-700">
            <SectionHeading title={t('sections.pillarsTitle')} subtitle={t('sections.pillars')} align="center" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {SERVICES_DATA.map(s => (
                <div key={s.id} className="bg-navy-800 border-2 border-slate-800 p-12 hover:border-antique transition-all duration-700 group relative flex flex-col shadow-2xl rounded-2xl">
                  <div className="text-antique mb-10">{s.icon}</div>
                  <h3 className="text-3xl font-serif font-bold mb-8 text-slate-50 tracking-tight">{content(s.title)}</h3>
                  <p className="text-base text-slate-400 mb-12 leading-relaxed font-serif italic">"{content(s.description)}"</p>
                  <div className="flex-grow space-y-5 mb-12">
                    {s.deliverables.map((d, i) => (
                        <div key={i} className="text-[11px] font-mono text-slate-300 flex items-center gap-4">
                            <ArrowRight size={14} className="text-gold shrink-0"/> {d}
                        </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-black text-antique uppercase tracking-[0.5em] bg-antique/5 py-3 text-center border border-antique/20 rounded-lg">{s.category}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS VIEW */}
        {view === 'products' && (
            <div className="container mx-auto px-6 py-24 animate-in fade-in duration-700">
                <SectionHeading title={t('sections.inventoryTitle')} subtitle={t('sections.inventory')} align="center" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {PRODUCTS_DATA.map(p => (
                        <div key={p.id} className="bg-navy-800 border-4 border-slate-800 p-16 hover:border-cyan hover:shadow-glow-cyan transition-all duration-700 group flex flex-col relative shadow-2xl rounded-2xl">
                            <div className="flex justify-between items-start mb-14">
                                <div className="text-cyan">{p.icon}</div>
                                <span className="text-[11px] font-mono bg-cyan/10 text-cyan px-4 py-2 border border-cyan/40 rounded-lg uppercase font-black tracking-[0.2em]">{p.model}</span>
                            </div>
                            <h3 className="text-4xl font-serif font-bold mb-8 tracking-tight">{content(p.title)}</h3>
                            <p className="text-slate-400 text-base mb-14 leading-relaxed italic font-serif group-hover:text-slate-200 transition-colors">"{content(p.description)}"</p>
                            <div className="space-y-6 mb-16 flex-grow">
                                {p.features.map((f, idx) => (
                                    <div key={idx} className="flex items-center gap-5 text-xs text-slate-300 font-mono font-bold tracking-wide">
                                        <BadgeCheck size={20} className="text-cyan shrink-0" /> {f}
                                    </div>
                                ))}
                            </div>
                            <Button variant="sovereign" className="w-full py-5 text-sm font-black bg-cyan border-cyan text-navy-900" icon={<ShoppingCart size={20}/>}>{t('common.requestLicense')}</Button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* AUTH VIEW */}
        {view === 'auth' && <AuthSystem onAuthenticated={u => { setCurrentUser(u); setView('cms'); }} />}

        {/* CMS VIEW */}
        {view === 'cms' && currentUser && <CMSDashboard user={currentUser} />}

        {/* PUBLICATIONS VIEW */}
        {view === 'publications' && (
            <div className="container mx-auto px-6 py-24 animate-in fade-in duration-700">
                <div className="mb-20">
                    <SectionHeading title={t('sections.capitalTitle')} subtitle={t('sections.capital')} />
                </div>
                <PublicationsSystem user={currentUser} onLoginReq={() => setView('auth')} />
            </div>
        )}

        {/* ALLIANCE VIEW */}
        {view === 'profiles' && <ProfileSystem />}

        {/* LEADERSHIP VIEW */}
        {view === 'about' && (
            <div className="container mx-auto px-6 py-24 animate-in fade-in duration-700">
                <SectionHeading title={t('nav.leadership')} subtitle="The Fiduciary Protocol" align="center" />
                <div className="space-y-60 mt-40">
                    {LEADERS.map((l, i) => (
                        <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-32 items-center group`}>
                            <div className="flex-1 space-y-12 animate-in slide-in-from-bottom duration-1000">
                                <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-50 mb-2 tracking-tighter">{l.name}</h2>
                                <p className="text-antique font-mono text-sm tracking-[0.5em] uppercase font-black">{content(l.role)}</p>
                                <p className="text-2xl text-slate-400 leading-relaxed font-serif italic text-justify opacity-80">"{content(l.bio)}"</p>
                                <div className="flex flex-wrap gap-10 pt-8">
                                    {l.metrics.map((m, j) => (
                                        <div key={j} className="p-8 border border-slate-700 bg-navy-800 min-w-[200px] shadow-3xl group-hover:border-gold transition-all duration-500 rounded-xl">
                                            <div className="text-5xl font-bold text-gold mb-3 font-serif">{m.value}</div>
                                            <div className="text-[11px] text-slate-500 uppercase tracking-[0.4em] font-mono font-black">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 w-full max-w-xl aspect-[4/5] bg-navy-800 border-[12px] border-navy-700 shadow-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 relative rounded-2xl">
                                <img src={l.image} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-2000" alt={l.name} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* CONTACT VIEW */}
        {view === 'contact' && (
            <div className="container mx-auto px-6 py-24 animate-in fade-in duration-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
                    <div className="space-y-16">
                        <SectionHeading title={t('common.contactTitle')} subtitle={t('common.contactSub')} />
                        <div className="space-y-8">
                            <div className="flex items-center gap-8 p-10 bg-navy-800 border border-slate-800 shadow-3xl rounded-xl">
                                <div className="p-6 bg-gold/10 text-gold rounded-lg shadow-inner"><Mail size={32}/></div>
                                <div>
                                    <h5 className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.4em] mb-2 font-black">{t('common.officialCorr')}</h5>
                                    <p className="text-2xl font-bold text-slate-100 font-mono tracking-tight">hello@gkodo.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="bg-navy-800 p-16 border-t-8 border-gold shadow-3xl relative animate-in slide-in-from-right duration-1000 rounded-2xl">
                        <h4 className="text-4xl font-serif font-bold text-slate-50 mb-14 tracking-tight">{t('common.appForm')}</h4>
                        <div className="space-y-10">
                            <input required className="w-full bg-navy-900 border-2 border-slate-700 p-5 text-slate-50 text-base outline-none transition-all duration-300 rounded-lg" placeholder={t('common.formName')} />
                            <input required type="email" className="w-full bg-navy-900 border-2 border-slate-700 p-5 text-slate-50 text-base outline-none transition-all duration-300 rounded-lg" placeholder={t('common.formEmail')} />
                            <textarea required className="w-full bg-navy-900 border-2 border-slate-700 p-5 text-slate-50 text-base outline-none h-44 transition-all duration-300 rounded-lg resize-none" placeholder={t('common.formContext')}></textarea>
                            <Button variant="sovereign" type="submit" className="w-full py-6 text-base font-black shadow-glow-gold" icon={<CheckCircle size={22}/>}>{t('common.submit')}</Button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </main>

      {/* COMPREHENSIVE SOVEREIGN FOOTER SYSTEM */}
      <footer className="bg-navy-900 border-t-2 border-slate-800 pt-40 pb-20 no-print relative overflow-hidden mt-32">
         <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32">
                <div className="space-y-12">
                    <Logo variant="full" />
                    <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-serif italic opacity-70 italic">
                        "{t('common.footerP1')}"
                    </p>
                    <div className="flex gap-10">
                        <Linkedin size={28} className="text-slate-600 hover:text-cyan transition-all cursor-pointer" />
                        <Github size={28} className="text-slate-600 hover:text-cyan transition-all cursor-pointer" />
                        <Mail size={28} className="text-slate-600 hover:text-gold transition-all cursor-pointer" />
                    </div>
                </div>
                <div>
                    <h4 className="text-xs font-black text-slate-100 uppercase tracking-[0.5em] mb-14 border-b-2 border-slate-800 pb-4">{t('sections.pillars')}</h4>
                    <ul className="space-y-7 text-[12px] text-slate-500 font-mono uppercase tracking-[0.2em] font-bold">
                        <li className="hover:text-gold cursor-pointer transition-all">M&A Due Diligence</li>
                        <li className="hover:text-gold cursor-pointer transition-all">SaaS Fiduciary</li>
                        <li className="hover:text-gold cursor-pointer transition-all">Bespoke Architecture</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-black text-slate-100 uppercase tracking-[0.5em] mb-14 border-b-2 border-slate-800 pb-4">{t('common.footerResources')}</h4>
                    <ul className="space-y-7 text-[12px] text-slate-500 font-mono uppercase tracking-[0.2em] font-bold">
                        <li className="hover:text-cyan cursor-pointer transition-all" onClick={() => setView('publications')}>Technical Academy</li>
                        <li className="hover:text-cyan cursor-pointer transition-all" onClick={() => setView('profiles')}>Alliance Directory</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-black text-slate-100 uppercase tracking-[0.5em] mb-14 border-b-2 border-slate-800 pb-4">{t('common.footerPresence')}</h4>
                    <ul className="space-y-10 text-[12px] text-slate-400">
                        <li className="flex items-start gap-5">
                            <MapPin size={24} className="text-antique shrink-0 mt-1" />
                            <span className="leading-relaxed uppercase font-mono tracking-widest font-bold whitespace-pre-line">{t('common.hq')}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t-2 border-slate-800 pt-16 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] text-slate-600 font-mono uppercase tracking-[0.4em] font-black">
                <p>&copy; 2026 {t('common.footerRights')}</p>
                <div className="flex items-center gap-10">
                    <span className="flex items-center gap-4 text-success">
                        <span className="w-2.5 h-2.5 bg-success rounded-full animate-pulse shadow-glow-success"></span>
                        FIDUCIARY_GATEWAY_NOMINAL
                    </span>
                    <span>| v4.3.0-SOVEREIGN_CMS_PROTOCOL</span>
                </div>
            </div>
         </div>
      </footer>
    </div>
  );
}

const App = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

export default App;