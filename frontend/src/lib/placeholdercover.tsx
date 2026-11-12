import type { BookCategory } from "@/types/book";

const COLORS: Record<BookCategory, string> = {
  backend: "#0B5D0B",
  frontend: "#9F1D1D",
  "banco-de-dados": "#1E3A5F",
  devops: "#92400E",
};

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of text.split(" ")) {
    if (current && `${current} ${word}`.length > max) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// Capa 3:4 gerada em SVG (data URI): permite testar sem imagens reais.
export function placeholderCover(
  title: string,
  category: BookCategory,
): string {
  const text = wrap(title, 15)
    .slice(0, 5)
    .map(
      (line, i) =>
        `<text x="28" y="${110 + i * 34}" font-family="DM Sans, Arial, sans-serif" font-size="26" font-weight="700" fill="#fff">${escapeXml(line)}</text>`,
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><rect width="300" height="400" fill="${COLORS[category]}"/><rect width="12" height="400" fill="#000" opacity=".25"/>${text}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
