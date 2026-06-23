import Link from "next/link";
import { ArrowLeft, XCircle } from "lucide-react";
import { requireAdmin } from "@/lib/admin/guard";
import { listBrandsLite, listCategoriesLite } from "@/lib/admin/queries";
import { createProduct } from "@/lib/admin/actions";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  await requireAdmin();
  const [brands, categories] = await Promise.all([
    listBrandsLite(),
    listCategoriesLite(),
  ]);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-caption text-graphite-400 hover:text-graphite"
        >
          <ArrowLeft className="h-3 w-3" /> Back to products
        </Link>
        <h1 className="mt-3 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
          New product
        </h1>
        <p className="mt-2 max-w-xl text-small text-slate">
          Save first with a single image URL — then upload more photos and
          manage the gallery on the edit screen.
        </p>
      </div>

      {searchParams.error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-carmine/30 bg-carmine/5 p-4 text-small text-graphite">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-carmine" />
          <div>
            <p className="font-medium">Couldn&apos;t create product</p>
            <p className="mt-0.5 text-graphite-400">
              {searchParams.error === "missing-fields"
                ? "Please fill the required fields: title, brand, category, image URL."
                : searchParams.error}
            </p>
          </div>
        </div>
      )}

      {brands.length === 0 || categories.length === 0 ? (
        <div className="rounded-xl border border-mist bg-white p-10 text-center">
          <p className="font-display text-h2 text-graphite">
            Connect Supabase first.
          </p>
          <p className="mt-2 text-small text-slate">
            Run the seed migration so brands and categories exist.
          </p>
        </div>
      ) : (
        <ProductForm
          mode="create"
          action={createProduct}
          brands={brands}
          categories={categories}
        />
      )}
    </div>
  );
}
