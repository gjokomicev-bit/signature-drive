import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function TextField({ label, error, id, className = "", ...rest }: TextFieldProps) {
  const inputId = id ?? rest.name;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-xs uppercase tracking-[0.15em] text-foreground/60">
        {label}
      </label>
      <input
        id={inputId}
        className={`border border-border-subtle bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
