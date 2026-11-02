import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/config/navigation";

export interface SidebarUser {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface SidebarProps {
  logo?: React.ReactNode;
  title?: string; // alternativa ao logo (ex.: "Biblioteca")
  children?: React.ReactNode; // slot abaixo da navegação (ex.: filtros)
  items: NavItem[];
  activeHref: string;
  user?: SidebarUser;
  onNavigate?: (href: string) => void; // troque por <Link> do seu router se preferir
  className?: string;
}

export function Sidebar({
  logo,
  title,
  children,
  items,
  activeHref,
  user,
  onNavigate,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex m-4 w-sidebar shrink-0 flex-col bg-surface",
        className,
      )}
    >
      {(logo || title) && (
        <div className="flex h-header items-center px-6">
          {logo ?? <h2 className="text-2xl font-semibold">{title}</h2>}
        </div>
      )}

      <nav className="flex-1 space-y-1 px-3 py-2">
        {items.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            activeHref={activeHref}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {children}

      {user && <SidebarProfile user={user} />}
    </aside>
  );
}

function SidebarItem({
  item,
  activeHref,
  onNavigate,
}: {
  item: NavItem;
  activeHref: string;
  onNavigate?: (href: string) => void;
}) {
  const Icon = item.icon;
  const hasChildren = !!item.children?.length;
  const childActive = item.children?.some((c) => c.href === activeHref);
  const [open, setOpen] = useState(!!childActive);
  const active = item.href === activeHref;

  const base =
    "relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-lg font-medium transition-colors";
  const state = active
    ? "bg-accent text-accent-foreground before:absolute before:inset-y-0 before:-left-3 before:w-1 before:bg-primary"
    : "text-foreground hover:bg-accent/60";

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(base, state)}
        >
          <Icon className="size-5" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
        {open && (
          <div className="ml-8 mt-1 space-y-1 border-l pl-3">
            {item.children!.map((c) => (
              <a
                key={c.href}
                href={c.href}
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate(c.href);
                  }
                }}
                className={cn(
                  "block rounded-md px-3 py-2 text-base text-muted-foreground hover:text-foreground",
                  c.href === activeHref && "font-medium text-accent-foreground",
                )}
              >
                {c.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      aria-current={active ? "page" : undefined}
      onClick={(e) => {
        if (onNavigate && item.href) {
          e.preventDefault();
          onNavigate(item.href);
        }
      }}
      className={cn(base, state)}
    >
      <Icon className="size-5" />
      {item.label}
    </a>
  );
}

function SidebarProfile({ user }: { user: SidebarUser }) {
  return (
    <div className="p-3">
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-full border-2 border-primary p-2 pr-4 text-left"
      >
        <Avatar className="size-10">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="min-w-0">
          <span className="block truncate text-base font-medium">
            {user.name}
          </span>
          <span className="block truncate text-sm text-muted-foreground">
            {user.email}
          </span>
        </span>
      </button>
    </div>
  );
}
