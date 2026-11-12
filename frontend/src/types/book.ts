export type BookStatus = "lidos" | "em-andamento" | "quero-ler" | null;
export type BookLanguage = "portugues" | "ingles" | "espanhol";
export type BookCategory = "backend" | "frontend" | "banco-de-dados" | "devops";
export type LibraryCategory = BookCategory | "all";

export interface Book {
  id: number;
  name: string;
  author: string | null;
  synopsis: string | null;
  opened: boolean;
  status: BookStatus;
  category: BookCategory;
  language: BookLanguage;
  active: boolean;
  path_cover: string | null;
  path_pdf: string | null;
}

export interface BooksResponse {
  livro: Book[];
}
