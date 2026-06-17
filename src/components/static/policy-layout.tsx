import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/collections/breadcrumbs";

export function PolicyLayout({
  eyebrow,
  title,
  intro,
  crumbLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-porcelain min-h-screen pb-20">
        <Container className="pt-8 pb-2">
          <Breadcrumbs
            crumbs={[
              { href: "/", label: "Home" },
              { href: "#", label: crumbLabel ?? title },
            ]}
          />
        </Container>
        <Container>
          <header className="max-w-3xl pt-6 pb-10">
            <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium">
              {eyebrow}
            </p>
            <h1 className="mt-2 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite text-balance">
              {title}
            </h1>
            {intro && (
              <p className="mt-4 text-body text-slate text-pretty">{intro}</p>
            )}
          </header>

          <article className="prose-policy max-w-3xl space-y-6 text-body text-graphite">
            {children}
          </article>
        </Container>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
