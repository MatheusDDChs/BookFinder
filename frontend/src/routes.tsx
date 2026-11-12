import type { ComponentType } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LibraryShell } from "@/components/library/libraryshell";
import { libraryNav } from "@/config/navigation";
import type { LibraryCategory } from "@/types/book";
import LibraryPage from "@/pages/librarypage";
import BackendPage from "@/pages/backendpage";
import FrontendPage from "@/pages/frontendpage";
import BancoDeDadosPage from "@/pages/bancodedadospage";
import DevopsPage from "@/pages/devopspage";

// Nova categoria: criar a página, registrar aqui e adicionar o item em libraryNav (o path vem de lá).
const pages: Record<LibraryCategory, ComponentType> = {
  all: LibraryPage,
  backend: BackendPage,
  frontend: FrontendPage,
  "banco-de-dados": BancoDeDadosPage,
  devops: DevopsPage,
};

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<LibraryShell />}>
        {libraryNav.map(({ href, category }) => {
          const Page = pages[category];
          return <Route key={href} path={href} element={<Page />} />;
        })}
      </Route>
      <Route path="*" element={<Navigate to="/library" replace />} />
    </Routes>
  );
}
