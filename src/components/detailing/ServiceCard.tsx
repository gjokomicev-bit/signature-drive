import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { SITE } from "@/config/site";
import type { DetailingService } from "@/config/detailing";

export function ServiceCard({ service }: { service: DetailingService }) {
  return (
    <div className="flex flex-col border border-border-subtle p-8">
      <h3 className="text-lg font-medium uppercase tracking-[0.05em] text-foreground">{service.title}</h3>
      <ul className="mt-4 flex flex-1 flex-col gap-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm text-foreground/60">
            <span className="text-accent">—</span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-border-subtle pt-6">
        <span className="text-sm text-foreground/50">ab {formatCurrency(service.priceFrom)}</span>
        <Button
          href={buildWhatsAppLink(
            SITE.contact.whatsapp,
            `Hallo ${SITE.name}, ich möchte einen Termin für "${service.title}" vereinbaren.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          size="md"
          className="mt-4 w-full"
        >
          Termin buchen
        </Button>
      </div>
    </div>
  );
}
