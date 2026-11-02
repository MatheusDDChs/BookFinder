import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CircleHelp,
  Database,
  Infinity as InfinityIcon,
  LayoutGrid,
  Monitor,
  Server,
  Settings,
  Users,
  Zap,
} from "lucide-react";

/* ---------- Tipos ---------- */
export interface NavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: { label: string; href: string }[];
}

export interface FilterOption {
  value: string;
  label: string;
}
export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}
export type FilterValues = Record<string, string[]>;

/* ---------- Sidebar "Biblioteca" ---------- */
export const librarySidebarTitle = "Biblioteca";

export const libraryNav: NavItem[] = [
  { label: "Todos", icon: LayoutGrid, href: "/library" },
  { label: "Backend", icon: Server, href: "/library/backend" },
  { label: "Frontend", icon: Monitor, href: "/library/frontend" },
  { label: "Banco de dados", icon: Database, href: "/library/banco-de-dados" },
  { label: "DevOps", icon: InfinityIcon, href: "/library/devops" },
];

export const filtersTitle = "Filtros";

export const filterGroups: FilterGroup[] = [
  {
    id: "status",
    label: "Status",
    options: [
      { value: "lidos", label: "Lidos" },
      { value: "em-andamento", label: "Em andamento" },
      { value: "quero-ler", label: "Quero ler" },
    ],
  },
  {
    id: "idioma",
    label: "Idioma",
    options: [
      { value: "pt", label: "Português" },
      { value: "en", label: "Inglês" },
      { value: "es", label: "Espanhol" },
    ],
  },
];

export const defaultFilters: FilterValues = {
  status: ["em-andamento"],
  idioma: [],
};

export const sortLabel = "Ordenar por";
export const sortOptions: FilterOption[] = [
  { value: "relevantes", label: "Mais relevantes" },
  { value: "recentes", label: "Mais recentes" },
  { value: "titulo", label: "Título (A–Z)" },
  { value: "autor", label: "Autor (A–Z)" },
];
export const defaultSort = "relevantes";

/* ---------- Sidebar principal do app (mantida) ---------- */
export const mainNav: NavItem[] = [
  { label: "Home", icon: LayoutGrid, href: "/" },
  { label: "Library", icon: BookOpen, href: "/library" },
  { label: "Community", icon: Users, href: "/community" },
  {
    label: "AI Integration",
    icon: Zap,
    children: [
      { label: "Recommendations", href: "/ai/recommendations" },
      { label: "Summaries", href: "/ai/summaries" },
    ],
  },
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Help", icon: CircleHelp, href: "/help" },
];
