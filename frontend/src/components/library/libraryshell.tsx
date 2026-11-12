import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/applayout";
import { SidebarFilters } from "@/components/layout/sidebarfilter";
import type { LibraryContextValue } from "@/components/library/librarycontext";
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

// Layout único de todas as páginas da biblioteca. Como ele fica montado entre as rotas,
// busca, filtros e ordenação são mantidos ao trocar de categoria.
export function LibraryShell() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);
  const [sort, setSort] = useState(defaultSort);

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

  const context = useMemo<LibraryContextValue>(
    () => ({ query, filters, sort }),
    [query, filters, sort],
  );

  return (
    <AppLayout
      sidebar={{
        title: librarySidebarTitle,
        items: libraryNav,
        activeHref: pathname,
        onNavigate: (href) => navigate(href),
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
            className="h-11 shrink-0 gap-2 text-muted-foreground"
          >
            <SlidersHorizontal className="size-5" />
            <span className="max-sm:sr-only">Filter</span>
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
      <Outlet context={context} />
    </AppLayout>
  );
}
