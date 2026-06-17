"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { ImagePlus, Star, Trash2, Upload, Loader2, Check } from "lucide-react";
import {
  uploadProductImage,
  removeGalleryImage,
  setPrimaryImage,
} from "@/lib/admin/actions";

type Props = {
  productId: string;
  primary: string;
  gallery: string[];
};

export function GalleryManager({ productId, primary, gallery }: Props) {
  const [pending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    if (file.size > 8 * 1024 * 1024) {
      setError("Image is larger than 8 MB — please compress and try again.");
      e.target.value = "";
      return;
    }

    const fd = new FormData();
    fd.append("image", file);
    fd.append("product_id", productId);

    startTransition(async () => {
      try {
        await uploadProductImage(fd);
      } catch {
        setError("Upload failed — check Supabase Storage configuration.");
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    });
  }

  return (
    <section className="rounded-xl border border-mist bg-white p-6">
      <header className="flex items-center justify-between mb-5">
        <h2 className="font-display text-h2 font-semibold text-graphite">
          Gallery
        </h2>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-graphite text-white px-4 h-10 text-small font-medium hover:bg-graphite-700 transition-colors disabled:opacity-60"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {pending ? "Uploading…" : "Upload image"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={onFileChange}
        />
      </header>

      {error && (
        <p className="mb-4 text-caption text-carmine" role="alert">
          {error}
        </p>
      )}

      {gallery.length === 0 ? (
        <div className="rounded-lg border border-dashed border-mist bg-porcelain p-10 text-center">
          <ImagePlus className="mx-auto h-6 w-6 text-graphite-300" />
          <p className="mt-3 text-small text-slate">
            No images yet — upload your first image to populate the gallery.
          </p>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((url) => {
            const isPrimary = url === primary;
            return (
              <li
                key={url}
                className="group relative overflow-hidden rounded-lg border border-mist bg-porcelain"
              >
                <div className="relative aspect-square">
                  <Image
                    src={url}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 220px, 50vw"
                    className="object-cover"
                  />
                </div>
                {isPrimary && (
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-graphite text-white px-2 py-0.5 text-caption font-medium">
                    <Check className="h-3 w-3" /> Primary
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-graphite/80 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  {!isPrimary && (
                    <form action={setPrimaryImage}>
                      <input
                        type="hidden"
                        name="product_id"
                        value={productId}
                      />
                      <input type="hidden" name="url" value={url} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 rounded-full bg-white/95 text-graphite px-2.5 py-1 text-caption font-medium hover:bg-white"
                      >
                        <Star className="h-3 w-3" />
                        Set primary
                      </button>
                    </form>
                  )}
                  <form action={removeGalleryImage} className="ml-auto">
                    <input
                      type="hidden"
                      name="product_id"
                      value={productId}
                    />
                    <input type="hidden" name="url" value={url} />
                    <button
                      type="submit"
                      aria-label="Remove image"
                      className="inline-flex items-center gap-1 rounded-full bg-white/95 text-carmine px-2.5 py-1 text-caption font-medium hover:bg-white"
                    >
                      <Trash2 className="h-3 w-3" />
                      Remove
                    </button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-5 text-caption text-graphite-400">
        JPG, PNG, WebP or AVIF · 8 MB max · Square crop renders best in the
        product gallery.
      </p>
    </section>
  );
}
