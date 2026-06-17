import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";

export function WhatsAppButton({ productName }: { productName?: string }) {
  const message = productName
    ? `Salam! I'm interested in the ${productName}. Is it available?`
    : "Salam! I have a question about your products.";

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp — usually replies within 5 minutes"
      data-cursor="wa"
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 rounded-full bg-pine pl-4 pr-5 py-3 text-small font-medium text-white shadow-lift transition-all duration-300 ease-premium hover:scale-[1.03] hover:bg-pine/95 sm:bottom-7 sm:right-7 motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-white/30 animate-ping motion-reduce:hidden"
        />
        <span className="relative grid h-7 w-7 place-items-center rounded-full bg-white/15 backdrop-blur-sm">
          <MessageCircle className="h-4 w-4" />
        </span>
      </span>
      <span className="hidden sm:flex sm:flex-col sm:leading-tight">
        <span className="font-semibold">Chat on WhatsApp</span>
        <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-white/80">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300 motion-reduce:animate-none animate-pulse" />
          Online now
        </span>
      </span>
    </a>
  );
}
