import type { LucideIcon } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Book } from "@/types/book";

export interface BookAction {
  label: string;
  icon?: LucideIcon;
  destructive?: boolean;
  onSelect: (book: Book) => void;
}

export interface BookCardProps {
  book: Book;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  onRead?: (book: Book) => void;
  actions?: BookAction[]; // itens do menu "⋮"
}

export function BookCard({
  book,
  selected,
  onSelectedChange,
  onRead,
  actions = [],
}: BookCardProps) {
  return (
    <article className="group">
      <div className="relative flex aspect-[1/0.92] items-center justify-center bg-shelf">
        <img
          src={book.path_cover}
          alt={`Capa de ${book.name}`}
          className="aspect-3/4 w-[44%] object-cover"
          loading="lazy"
        />

        {onSelectedChange && (
          <Checkbox
            checked={selected}
            onCheckedChange={(v) => onSelectedChange(v === true)}
            aria-label={`Selecionar ${book.name}`}
            className={cn(
              "absolute left-4 top-4 size-6 bg-surface opacity-0 transition-opacity [@media(hover:none)]:opacity-100 group-hover:opacity-100 focus-visible:opacity-100",
              selected && "opacity-100",
            )}
          />
        )}

        {actions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Mais ações"
                className="absolute right-3 top-4 rounded p-1 text-foreground/70 opacity-0 transition-opacity [@media(hover:none)]:opacity-100 hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
              >
                <MoreVertical className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions.map(({ label, icon: Icon, destructive, onSelect }) => (
                <DropdownMenuItem
                  key={label}
                  onSelect={() => onSelect(book)}
                  className={cn(
                    destructive && "text-destructive focus:text-destructive",
                  )}
                >
                  {Icon && <Icon className="mr-2 size-4" />}
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {onRead && (
          <Button
            onClick={() => onRead(book)}
            className="absolute inset-x-4 bottom-4 h-12 rounded-sm text-base opacity-0 transition-opacity [@media(hover:none)]:opacity-100 focus-visible:opacity-100 group-hover:opacity-100"
          >
            Read Book
          </Button>
        )}
      </div>

      <h3 className="mt-6 truncate text-lg font-medium" title={book.name}>
        {book.name}
      </h3>
      <p className="mt-3 truncate text-lg text-muted-foreground">
        {book.author}
      </p>
    </article>
  );
}
