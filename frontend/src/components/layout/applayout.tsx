import { Sidebar } from "../sidebar";
import { Header } from "../header";

type SidebarProps = React.ComponentProps<typeof Sidebar>;
type HeaderProps = React.ComponentProps<typeof Header>;

interface AppLayoutProps {
  sidebar: SidebarProps;
  header: HeaderProps;
  children: React.ReactNode;
}

// Shell compartilhado por todas as páginas: sidebar à esquerda, header + conteúdo à direita.
export function AppLayout({ sidebar, header, children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-surface">
      <Sidebar {...sidebar} className="max-lg:hidden" />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header {...header} />
        <main className="flex-1 overflow-y-auto bg-background p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
