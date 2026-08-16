import { SITE } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const href = buildWhatsAppLink(
    SITE.contact.whatsapp,
    `Hallo ${SITE.name}, ich interessiere mich für eine Fahrzeugmiete.`,
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Anfrage per WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-105"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.386.7 4.61 1.91 6.478L4 29l7.71-1.874A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818a9.77 9.77 0 0 1-4.98-1.363l-.357-.212-4.575 1.112 1.223-4.458-.233-.367A9.78 9.78 0 0 1 5.818 15c0-5.618 4.567-10.182 10.186-10.182 5.618 0 10.182 4.564 10.182 10.182 0 5.619-4.564 10.182-10.182 10.182Zm5.593-7.632c-.306-.153-1.81-.893-2.09-.995-.28-.102-.484-.153-.688.153-.204.306-.79.995-.968 1.2-.178.204-.357.23-.663.077-.306-.153-1.29-.475-2.457-1.516-.908-.81-1.522-1.812-1.7-2.118-.178-.306-.019-.472.134-.624.138-.137.306-.357.459-.535.153-.179.204-.306.306-.51.102-.204.051-.383-.026-.535-.077-.153-.688-1.658-.943-2.27-.248-.596-.5-.516-.688-.526l-.586-.01c-.204 0-.535.077-.815.383-.28.306-1.068 1.043-1.068 2.545s1.093 2.954 1.245 3.158c.153.204 2.15 3.283 5.208 4.604.727.314 1.294.5 1.737.64.73.233 1.394.2 1.92.121.586-.087 1.81-.74 2.065-1.454.255-.714.255-1.325.178-1.454-.076-.128-.28-.204-.586-.357Z" />
      </svg>
    </a>
  );
}
