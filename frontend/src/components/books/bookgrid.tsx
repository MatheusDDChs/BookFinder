import { Plus } from "lucide-react";
import { BookCard, type BookCardProps } from "../bookcard.tsx";
import type { Book } from "../../types/book";

interface BookGridProps extends Omit<
  BookCardProps,
  "book" | "selected" | "onSelectedChange"
> {
  books: Book[];
  selectedIds?: Set<string>;
  onToggleSelect?: (id: string, selected: boolean) => void;
  onAdd?: () => void; // quando definido, mostra o tile "Add New Book"
}

export function BookGrid({
  books,
  selectedIds,
  onToggleSelect,
  onAdd,
  ...cardProps
}: BookGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          selected={selectedIds?.has(book.id)}
          onSelectedChange={
            onToggleSelect && ((s) => onToggleSelect(book.id, s))
          }
          {...cardProps}
        />
      ))}
      {onAdd && <AddBookTile onClick={onAdd} />}
    </div>
  );
}

function AddBookTile({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex aspect-[1/0.92] flex-col items-center justify-center gap-4 text-lg font-medium"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Plus className="size-8" />
      </span>
      Add New Book
    </button>
  );
}
