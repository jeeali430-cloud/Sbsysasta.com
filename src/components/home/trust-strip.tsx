import { Truck, ShieldCheck, RefreshCcw, Wallet, Award } from "lucide-react";
import { Container } from "@/components/ui/container";

const items = [
  { icon: Truck, title: "Same-Day Delivery", sub: "Across Lahore" },
  { icon: Wallet, title: "Cash on Delivery", sub: "Nationwide" },
  { icon: Award, title: "100% Genuine", sub: "Brand sealed" },
  { icon: RefreshCcw, title: "7-Day Returns", sub: "No questions" },
  { icon: ShieldCheck, title: "1-Year Warranty", sub: "Direct from brand" },
];

export function TrustStrip() {
  return (
    <div className="border-y border-mist bg-white">
      <Container>
        <ul className="grid grid-cols-2 gap-y-6 gap-x-6 py-7 sm:grid-cols-3 lg:grid-cols-5">
          {items.map(({ icon: Icon, title, sub }) => (
            <li key={title} className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-porcelain text-copper">
                <Icon className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="text-small font-medium text-graphite">{title}</p>
                <p className="text-caption text-graphite-400">{sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
