import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  className = "",
  tone = "light",
  containerClassName = "",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "surface";
  containerClassName?: string;
}) {
  const toneClasses =
    tone === "dark"
      ? "bg-ink text-ink-foreground"
      : tone === "surface"
        ? "bg-surface text-foreground"
        : "bg-background text-foreground";

  return (
    <section className={`py-20 sm:py-28 ${toneClasses} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
