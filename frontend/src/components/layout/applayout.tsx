import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

type SidebarProps = React.ComponentProps<typeof Sidebar>;
type HeaderProps = React.ComponentProps<typeof Header>;

interface AppLayoutProps {
  sidebar: SidebarProps;
  header: HeaderProps;
  children: React.ReactNode;
}

// Shell compartilhado: sidebar fixa em telas grandes (lg+), drawer lateral em telas menores.
export function AppLayout({ sidebar, header, children }: AppLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-surface">
      <Sidebar {...sidebar} className="max-lg:hidden" />

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="left"
          className="w-15rem p-0 sm:max-w-none lg:hidden"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navegação e filtros
          </SheetDescription>
          <Sidebar
            {...sidebar}
            className="h-full w-full"
            onNavigate={(href) => {
              sidebar.onNavigate?.(href);
              setMenuOpen(false);
            }}
          />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <Header {...header} onMenuClick={() => setMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
