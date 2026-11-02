import { useMemo, useState } from "react"; //mantem
import { Bell, BookOpen, SlidersHorizontal, Trash2 } from "lucide-react"; //mantem
import { Button } from "../components/ui/button"; //mantem
import { AppLayout } from "../components/layout/applayout.tsx"; //mantem
import { PageTitle } from "../components/layout/pagetitle.tsx"; //mantem
import { BookGrid } from "../components/books/bookgrid.tsx"; //mantem
import { SidebarFilters } from "@/components/layout/sidebarfilter.tsx";
import type { Book } from "../types/book.ts";
import {
  defaultFilters,
  defaultSort,
  filterGroups,
  filtersTitle,
  libraryNav,
  librarySidebarTitle,
  sortLabel,
  sortOptions,
  type FilterValues,
} from "@/config/navigation";

const books: Book[] = [
  {
    id: "1",
    title: "Sister Mother warrior",
    author: "Venessa Riley",
    coverUrl: "/covers/sister-mother-warrior.jpg",
  },
  {
    id: "2",
    title: "Hooked",
    author: "Nir Eyal",
    coverUrl: "/covers/hooked.jpg",
  },
  {
    id: "3",
    title: "Harry Potter: and the chamber of secrets",
    author: "Jk rowlings",
    coverUrl: "/covers/hp2.jpg",
  },
  {
    id: "4",
    title: "The Girl Who Fell From The Sky",
    author: "Heidi W. Durrow",
    coverUrl: "/covers/girl.jpg",
  },
  {
    id: "5",
    title: "To kill A Mokingbird",
    author: "Harper Lee",
    coverUrl: "/covers/tkam.jpg",
  },
  {
    id: "6",
    title: "The Overstory",
    author: "Richard Powers",
    coverUrl: "/covers/overstory.jpg",
  },
  {
    id: "7",
    title: "Don't Make Me Think",
    author: "Steve Krug",
    coverUrl: "/covers/dmmt.jpg",
  },
];

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);
  const [sort, setSort] = useState(defaultSort);

  const visible = useMemo(
    () =>
      books.filter((b) =>
        `${b.title} ${b.author}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const toggle = (id: string, on: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  const changeFilter = (groupId: string, value: string, checked: boolean) =>
    setFilters((prev) => {
      const current = prev[groupId] ?? [];
      return {
        ...prev,
        [groupId]: checked
          ? [...current, value]
          : current.filter((v) => v !== value),
      };
    });

  return (
    <AppLayout
      sidebar={{
        title: librarySidebarTitle,
        items: libraryNav,
        activeHref: "/library",
        children: (
          <SidebarFilters
            title={filtersTitle}
            groups={filterGroups}
            values={filters}
            onChange={changeFilter}
            sortLabel={sortLabel}
            sortOptions={sortOptions}
            sortValue={sort}
            onSortChange={setSort}
          />
        ),
      }}
      header={{
        search: { value: query, onChange: setQuery },
        filter: (
          <Button
            variant="outline"
            className="h-11 gap-2 text-muted-foreground"
          >
            <SlidersHorizontal className="size-5" /> Filter
          </Button>
        ),
        actions: [
          {
            id: "notifications",
            label: "Notificações",
            icon: Bell,
            showDot: true,
          },
        ],
      }}
    >
      <PageTitle
        title="Novel"
        count={visible.length}
        onBack={() => history.back()}
      />
      <BookGrid
        books={visible}
        selectedIds={selected}
        onToggleSelect={toggle}
        onRead={(b) => console.log("read", b.id)}
        onAdd={() => console.log("add")}
        actions={[
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
        ]}
      />
    </AppLayout>
  );
}
