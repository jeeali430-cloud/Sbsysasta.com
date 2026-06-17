import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Trash2 } from "lucide-react";
import { requireAdmin } from "@/lib/admin/guard";
import {
  getProductFull,
  listBrandsLite,
  listCategoriesLite,
} from "@/lib/admin/queries";
import { updateProductFull, deleteProduct } from "@/lib/admin/actions";
import { ProductForm } from "@/components/admin/product-form";
import { GalleryManager } from "@/components/admin/gallery-manager";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  await requireAdmin();
  const [product, brands, categories] = await Promise.all([
    getProductFull(params.id),
    listBrandsLite(),
    listCategoriesLite(),
  ]);
  if (!product) notFound();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-caption text-graphite-400 hover:text-graphite"
          >
            <ArrowLeft className="h-3 w-3" /> Back to products
          </Link>
          <h1 className="mt-3 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
            Edit product
          </h1>
          <p className="mt-2 text-small text-slate font-mono">{product.id}</p>
        </div>
        <Link
          href={`/products/${product.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-full border border-mist bg-white px-3.5 h-10 text-caption font-medium text-graphite hover:bg-porcelain"
        >
          View live <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      <GalleryManager
        productId={product.id}
        primary={product.image}
        gallery={product.gallery ?? []}
      />

      <ProductForm
        mode="edit"
        action={updateProductFull}
        brands={brands}
        categories={categories}
        values={{
          id: product.id,
          title: product.title,
          slug: product.slug,
          brand_id: product.brand_id,
          brand_name: product.brand_name,
          category_id: product.category_id,
          sub_type_slug: product.sub_type_slug,
          price: product.price,
          original_price: product.original_price,
          installment_from: product.installment_from,
          image: product.image,
          highlights: product.highlights,
          description: product.description,
          specs: product.specs,
          warranty: product.warranty,
          in_stock: product.in_stock,
          badges: product.badges,
        }}
      />

      <section className="rounded-xl border border-carmine/20 bg-carmine/5 p-6">
        <h2 className="font-display text-h3 font-semibold text-graphite">
          Danger zone
        </h2>
        <p className="mt-1 text-small text-slate">
          Deleting a product is permanent — orders that reference it keep their
          own copy of the title and price, so order history won&apos;t break.
        </p>
        <form action={deleteProduct} className="mt-4">
          <input type="hidden" name="id" value={product.id} />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-carmine text-carmine px-4 h-10 text-small font-medium hover:bg-carmine hover:text-white transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete product
          </button>
        </form>
      </section>
    </div>
  );
}
