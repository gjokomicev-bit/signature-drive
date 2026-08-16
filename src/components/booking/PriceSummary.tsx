import type { PriceBreakdown } from "@/types/pricing";
import { formatCurrency } from "@/lib/format";

export function PriceSummary({ breakdown }: { breakdown: PriceBreakdown }) {
  return (
    <div className="border border-border-subtle p-6">
      <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">Preisübersicht</span>

      <dl className="mt-4 flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-foreground/60">
            {breakdown.bracketLabel} · {breakdown.variantLabel}
          </dt>
          <dd className="text-foreground">{formatCurrency(breakdown.basePrice)}</dd>
        </div>

        {breakdown.extrasLines.map((line) => (
          <div key={line.label} className="flex justify-between">
            <dt className="text-foreground/60">{line.label}</dt>
            <dd className="text-foreground">{formatCurrency(line.amount)}</dd>
          </div>
        ))}

        {breakdown.campaignDiscount > 0 && (
          <div className="flex justify-between">
            <dt className="text-accent">Alpine Signature Drive & Win (-10%)</dt>
            <dd className="text-accent">−{formatCurrency(breakdown.campaignDiscount)}</dd>
          </div>
        )}

        <div className="flex justify-between border-t border-border-subtle pt-3 text-base font-medium">
          <dt className="text-foreground">Gesamtpreis</dt>
          <dd className="text-foreground">{formatCurrency(breakdown.total)}</dd>
        </div>
      </dl>
    </div>
  );
}
