import { placeholderCover } from "@/lib/placeholdercover";
import type {
  Book,
  BookCategory,
  BookLanguage,
  BookStatus,
  LibraryCategory,
} from "@/types/book";

const make = (
  id: string,
  title: string,
  author: string,
  category: BookCategory,
  status: BookStatus,
  language: BookLanguage = "en",
): Book => ({
  id,
  title,
  author,
  category,
  status,
  language,
  coverUrl: placeholderCover(title, category),
});

// Dados fictícios (1ª etapa). Depois basta trocar por uma chamada de API mantendo o tipo Book.
export const mockBooks: Book[] = [
  make(
    "be-1",
    "Designing Data-Intensive Applications",
    "Martin Kleppmann",
    "backend",
    "em-andamento",
  ),
  make("be-2", "Clean Architecture", "Robert C. Martin", "backend", "lidos"),
  make("be-3", "Building Microservices", "Sam Newman", "backend", "quero-ler"),
  make("be-4", "Domain-Driven Design", "Eric Evans", "backend", "quero-ler"),
  make("be-5", "Release It!", "Michael T. Nygard", "backend", "lidos"),
  make("be-6", "Código Limpo", "Robert C. Martin", "backend", "lidos", "pt"),

  make("fe-1", "Eloquent JavaScript", "Marijn Haverbeke", "frontend", "lidos"),
  make(
    "fe-2",
    "You Don't Know JS Yet",
    "Kyle Simpson",
    "frontend",
    "em-andamento",
  ),
  make("fe-3", "Don't Make Me Think", "Steve Krug", "frontend", "lidos"),
  make("fe-4", "Refactoring UI", "Adam Wathan", "frontend", "quero-ler"),
  make("fe-5", "Learning React", "Alex Banks", "frontend", "em-andamento"),
  make("fe-6", "CSS in Depth", "Keith J. Grant", "frontend", "quero-ler"),

  make(
    "db-1",
    "Database Internals",
    "Alex Petrov",
    "banco-de-dados",
    "em-andamento",
  ),
  make(
    "db-2",
    "SQL Performance Explained",
    "Markus Winand",
    "banco-de-dados",
    "lidos",
  ),
  make(
    "db-3",
    "The Art of PostgreSQL",
    "Dimitri Fontaine",
    "banco-de-dados",
    "quero-ler",
  ),
  make(
    "db-4",
    "Seven Databases in Seven Weeks",
    "Luc Perkins",
    "banco-de-dados",
    "quero-ler",
  ),
  make(
    "db-5",
    "Redis in Action",
    "Josiah L. Carlson",
    "banco-de-dados",
    "lidos",
  ),
  make(
    "db-6",
    "Introdução a Sistemas de Banco de Dados",
    "C. J. Date",
    "banco-de-dados",
    "em-andamento",
    "pt",
  ),

  make("do-1", "The Phoenix Project", "Gene Kim", "devops", "lidos"),
  make("do-2", "The DevOps Handbook", "Gene Kim", "devops", "em-andamento"),
  make("do-3", "Accelerate", "Nicole Forsgren", "devops", "quero-ler"),
  make(
    "do-4",
    "Site Reliability Engineering",
    "Betsy Beyer",
    "devops",
    "em-andamento",
  ),
  make(
    "do-5",
    "Terraform: Up & Running",
    "Yevgeniy Brikman",
    "devops",
    "quero-ler",
  ),
  make("do-6", "O Projeto Fênix", "Gene Kim", "devops", "lidos", "pt"),
];

export const getBooksByCategory = (category: LibraryCategory): Book[] =>
  category === "all"
    ? mockBooks
    : mockBooks.filter((b) => b.category === category);
