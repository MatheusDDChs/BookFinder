import type { LucideIcon } from "lucide-react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface HeaderAction {
  id: string;
  label: string; // acessibilidade (aria-label)
  icon: LucideIcon;
  onClick?: () => void;
  showDot?: boolean; // indicador de notificação
}

interface HeaderProps {
  search?: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
  };
  filter?: React.ReactNode; // ex.: botão que abre um Popover/Sheet de filtros
  actions?: HeaderAction[];
  onMenuClick?: () => void; // botão de menu (visível só abaixo de lg)
  className?: string;
}

export function Header({
  search,
  filter,
  actions = [],
  onMenuClick,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "flex h-header items-center gap-2 border-b bg-surface px-4 sm:gap-4 sm:px-8",
        className,
      )}
    >
      {onMenuClick && (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Abrir menu"
          onClick={onMenuClick}
          className="shrink-0 lg:hidden"
        >
          <Menu className="size-5" />
        </Button>
      )}

      {search && (
        <div className="relative min-w-0 max-w-3xl flex-1">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
            placeholder={search.placeholder ?? "Search"}
            className="h-12 rounded-full border-border bg-surface pl-12 text-base"
          />
        </div>
      )}

      {filter}

      <div className="ml-auto flex items-center gap-2">
        {actions.map(({ id, label, icon: Icon, onClick, showDot }) => (
          <Button
            key={id}
            variant="outline"
            size="icon"
            aria-label={label}
            onClick={onClick}
            className="relative size-11 text-muted-foreground"
          >
            <Icon className="size-5" />
            {showDot && (
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary" />
            )}
          </Button>
        ))}
      </div>
    </header>
  );
}
