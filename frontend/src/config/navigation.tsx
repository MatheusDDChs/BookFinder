import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CircleHelp,
  LayoutGrid,
  Settings,
  Users,
  Zap,
} from "lucide-react";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: { label: string; href: string }[];
}

// Para adicionar uma opção na sidebar, basta incluir um item aqui.
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
