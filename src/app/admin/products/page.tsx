import Link from "next/link";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin/guard";
import { listProducts } from "@/lib/admin/queries";
import { updateProduct } from "@/lib/admin/actions";
import { formatPKR } from "@/lib/utils";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await listProducts();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium">
            Inventory
          </p>
          <h1 className="mt-1 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
            Products
          </h1>
          <p className="mt-2 max-w-xl text-small text-slate">
            Edit price + stock inline, or open a product for full editing
            including gallery management.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-copper text-white px-5 h-11 text-small font-medium hover:bg-copper-600 transition-colors"
        >
          <Plus className="h-4 w-4" /> New product
        </Link>
      </header>

      <section className="rounded-xl border border-mist bg-white overflow-hidden">
        {products.length === 0 ? (
          <p className="p-10 text-center text-small text-slate">
            No products yet — connect Supabase and run the seed migration to
            load the catalog.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-small">
              <thead className="text-left text-caption uppercase tracking-[0.12em] text-graphite-400 bg-porcelain/50">
                <tr>
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 font-medium">Brand</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium">Original</th>
                  <th className="px-5 py-3 font-medium">In stock</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-mist">
                {products.map((p) => (
                  <tr key={p.id} className="align-top">
                    <td className="px-5 py-3">
                      <form
                        id={`prod-${p.id}`}
                        action={updateProduct}
                        className="hidden"
                      >
                        <input type="hidden" name="id" value={p.id} />
                      </form>
                      <p className="font-medium text-graphite leading-snug max-w-sm">
                        {p.title}
                      </p>
                      <p className="text-caption text-graphite-400 font-mono">
                        {p.id}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-graphite-400">
                      {p.brand_name}
                    </td>
                    <td className="px-5 py-3">
                      <PriceInput
                        formId={`prod-${p.id}`}
                        name="price"
                        defaultValue={p.price}
                      />
                      <p className="mt-1 text-caption text-graphite-400 tabular-nums">
                        Now {formatPKR(p.price)}
                      </p>
                    </td>
                    <td className="px-5 py-3">
                      <PriceInput
                        formId={`prod-${p.id}`}
                        name="original_price"
                        defaultValue={p.original_price ?? ""}
                        allowEmpty
                      />
                    </td>
                    <td className="px-5 py-3">
                      <label className="inline-flex items-center gap-2 text-small">
                        <input
                          type="checkbox"
                          name="in_stock"
                          form={`prod-${p.id}`}
                          defaultChecked={p.in_stock}
                          className="h-4 w-4 rounded border-mist text-copper accent-copper"
                        />
                        {p.in_stock ? "Available" : "Hidden"}
                      </label>
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap space-x-3">
                      <button
                        type="submit"
                        form={`prod-${p.id}`}
                        className="rounded-full bg-graphite text-white px-3.5 py-1.5 text-caption font-medium hover:bg-graphite-700"
                      >
                        Save
                      </button>
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="inline-flex items-center gap-1 text-caption text-graphite hover:text-graphite-700"
                      >
                        <Pencil className="h-3 w-3" /> Edit
                      </Link>
                      <Link
                        href={`/products/${p.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-caption text-copper hover:text-copper-600"
                      >
                        View <ExternalLink className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function PriceInput({
  formId,
  name,
  defaultValue,
  allowEmpty,
}: {
  formId: string;
  name: string;
  defaultValue: number | string;
  allowEmpty?: boolean;
}) {
  return (
    <input
      type="number"
      form={formId}
      name={name}
      min={0}
      step={100}
      required={!allowEmpty}
      defaultValue={defaultValue}
      className="w-32 rounded-md border border-mist bg-white px-2.5 h-9 text-small tabular-nums focus:border-graphite-200 focus:outline-none"
    />
  );
}
