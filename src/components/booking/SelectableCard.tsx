import type { ReactNode } from "react";

export function SelectableCard({
  selected,
  onSelect,
  title,
  subtitle,
  description,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  subtitle?: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full flex-col gap-2 border p-5 text-left transition-colors ${
        selected ? "border-accent bg-surface" : "border-border-subtle hover:border-foreground/40"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-sm font-medium uppercase tracking-[0.1em] text-foreground">{title}</span>
        {subtitle && <span className="whitespace-nowrap text-sm text-accent">{subtitle}</span>}
      </div>
      {description && <p className="text-sm text-foreground/60">{description}</p>}
      {children}
    </button>
  );
}
