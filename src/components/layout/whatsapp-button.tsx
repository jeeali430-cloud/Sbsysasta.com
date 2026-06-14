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
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-pine px-4 py-3 text-small font-medium text-white shadow-lift transition-all duration-300 hover:scale-105 hover:bg-pine/90 sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
