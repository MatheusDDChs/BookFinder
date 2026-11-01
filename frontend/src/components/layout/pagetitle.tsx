import { ArrowLeft } from "lucide-react";

interface PageTitleProps {
  title: string;
  count?: number;
  onBack?: () => void;
}

export function PageTitle({ title, count, onBack }: PageTitleProps) {
  return (
    <div className="mb-8 flex items-center gap-4">
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Voltar"
          className="text-foreground/80 hover:text-foreground"
        >
          <ArrowLeft className="size-5" />
        </button>
      )}
      <h1 className="text-[28px] font-semibold text-foreground/80">
        {title}{" "}
        {count !== undefined && (
          <span className="font-normal text-muted-foreground">({count})</span>
        )}
      </h1>
    </div>
  );
}
