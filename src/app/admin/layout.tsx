import type { Metadata } from "next";
import { checkAdmin } from "@/lib/admin/guard";
import { AdminShell } from "@/components/admin/shell";

export const metadata: Metadata = {
  title: "Admin · Sbsysasta",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const guard = await checkAdmin();

  // Login page handles its own gating
  return <AdminShell guard={guard}>{children}</AdminShell>;
}
