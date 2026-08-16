import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

interface SharedProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  invert?: boolean;
  className?: string;
}

interface ButtonAsLink extends SharedProps {
  href: string;
  target?: string;
  rel?: string;
}

interface ButtonAsButton extends SharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

function getVariantClasses(variant: ButtonVariant, invert: boolean): string {
  if (variant === "solid") {
    return invert
      ? "bg-ink-foreground text-ink hover:bg-accent hover:text-accent-foreground"
      : "bg-ink text-ink-foreground hover:bg-accent hover:text-accent-foreground";
  }
  if (variant === "outline") {
    return invert
      ? "border border-ink-foreground/60 text-ink-foreground hover:border-accent hover:text-accent"
      : "border border-foreground/40 text-foreground hover:border-accent hover:text-accent";
  }
  return invert
    ? "text-ink-foreground hover:text-accent underline underline-offset-4 decoration-ink-foreground/40 hover:decoration-accent"
    : "text-foreground hover:text-accent underline underline-offset-4 decoration-foreground/30 hover:decoration-accent";
}

export function Button({
  children,
  variant = "solid",
  size = "md",
  invert = false,
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.15em] transition-colors duration-300";
  const classes = `${base} ${sizeClasses[size]} ${getVariantClasses(variant, invert)} ${className}`;

  if (href) {
    const { target, rel } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
