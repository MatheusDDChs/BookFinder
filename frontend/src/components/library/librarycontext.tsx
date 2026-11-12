import { useOutletContext } from "react-router-dom";
import type { FilterValues } from "@/config/navigation";

export interface LibraryContextValue {
  query: string;
  filters: FilterValues;
  sort: string;
}

export const useLibraryContext = () => useOutletContext<LibraryContextValue>();
