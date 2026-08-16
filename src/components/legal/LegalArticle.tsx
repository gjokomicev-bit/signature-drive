import type { ReactNode } from "react";

export function LegalArticle({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl [&>h2]:mt-12 [&>h2]:text-xl [&>h2]:font-medium [&>h2]:text-foreground [&>h2:first-of-type]:mt-0 [&>p]:mt-4 [&>p]:text-sm [&>p]:leading-relaxed [&>p]:text-foreground/70 [&>ul]:mt-4 [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-2 [&>ul]:text-sm [&>ul]:leading-relaxed [&>ul]:text-foreground/70 [&_li]:list-disc [&_li]:ml-5">
      {children}
    </div>
  );
}
