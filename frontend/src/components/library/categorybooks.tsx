import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Trash2 } from "lucide-react";
import { BookGrid } from "@/components/books/bookgrid";
import type { BookAction } from "@/components/books/bookcard";
import { PageTitle } from "@/components/layout/pagetitle";
import { useLibraryContext } from "@/components/library/librarycontext";
import { libraryNav } from "@/config/navigation";
import type { BooksResponse, LibraryCategory } from "@/types/book";
import { useFetch } from "@/services/books";

const URL_BOOKS = import.meta.env.VITE_URL_BOOKS;

const actions: BookAction[] = [
  {
    label: "Abrir",
    icon: BookOpen,
    onSelect: (b) => console.log("open", b.id),
  },
  {
    label: "Remover",
    icon: Trash2,
    destructive: true,
    onSelect: (b) => console.log("remove", b.id),
  },
];

export function CategoryBooks({ category }: { category: LibraryCategory }) {
  const navigate = useNavigate();
  const { query } = useLibraryContext();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { data, loading } = useFetch<BooksResponse>(URL_BOOKS);

  const books = data?.livro ?? [];

  const title =
    libraryNav.find((i) => i.category === category)?.label ?? "Biblioteca";

  const visible = books
    .filter((b) => category === "all" || b.category === category)
    .filter((b) =>
      `${b.name} ${b.author}`.toLowerCase().includes(query.toLowerCase()),
    );

  const toggle = (id: string, on: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  return (
    <>
      <PageTitle
        title={title}
        count={loading ? undefined : visible.length}
        onBack={category === "all" ? undefined : () => navigate("/library")}
      />

      {loading ? (
        <p className="text-muted-foreground">Carregando livros...</p>
      ) : visible.length === 0 ? (
        <p className="text-muted-foreground">Nenhum livro encontrado.</p>
      ) : (
        <BookGrid
          books={visible}
          selectedIds={selected}
          onToggleSelect={toggle}
          onRead={(b) => console.log("read", b.id)}
          onAdd={
            category === "all" ? undefined : () => console.log("add", category)
          }
          actions={actions}
        />
      )}
    </>
  );
}
