"use client";

import { useState } from "react";
import type { BrandLite, CategoryLite } from "@/lib/admin/queries";

type FormValues = {
  id?: string;
  title?: string;
  slug?: string;
  brand_id?: string | null;
  brand_name?: string;
  category_id?: string | null;
  sub_type_slug?: string | null;
  price?: number;
  original_price?: number | null;
  installment_from?: number | null;
  image?: string;
  highlights?: string[] | null;
  description?: string | null;
  specs?: { label: string; value: string }[] | null;
  warranty?: string | null;
  in_stock?: boolean;
  badges?: string[] | null;
};

type Props = {
  action: (formData: FormData) => void;
  values?: FormValues;
  brands: BrandLite[];
  categories: CategoryLite[];
  mode: "create" | "edit";
};

const BADGE_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "bestseller", label: "Bestseller" },
  { value: "new", label: "New" },
  { value: "deal", label: "Deal" },
];

export function ProductForm({
  action,
  values,
  brands,
  categories,
  mode,
}: Props) {
  const [brandId, setBrandId] = useState(values?.brand_id ?? brands[0]?.id ?? "");
  const [categoryId, setCategoryId] = useState(
    values?.category_id ?? categories[0]?.id ?? ""
  );

  const currentCategory =
    categories.find((c) => c.id === categoryId) ?? categories[0];
  const subTypes = currentCategory?.sub_types ?? [];

  function syncBrandName(id: string) {
    setBrandId(id);
  }
  const brandName = brands.find((b) => b.id === brandId)?.name ?? "";

  const highlightsText = (values?.highlights ?? []).join("\n");
  const specsText = (values?.specs ?? [])
    .map((s) => `${s.label}: ${s.value}`)
    .join("\n");

  return (
    <form action={action} className="space-y-8">
      {values?.id && <input type="hidden" name="id" value={values.id} />}
      <input type="hidden" name="brand_name" value={brandName} />

      <Card title="Basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Title"
            name="title"
            defaultValue={values?.title}
            required
            className="sm:col-span-2"
            placeholder="Haier 1.5 Ton Inverter AC — HSU-18HFCF"
          />
          <Field
            label="URL slug (auto from title if empty)"
            name="slug"
            defaultValue={values?.slug}
            placeholder="haier-1-5-ton-inverter-ac-hsu-18hfcf"
          />
          <Select
            label="Brand"
            name="brand_id"
            value={brandId}
            onChange={syncBrandName}
            options={brands.map((b) => ({ value: b.id, label: b.name }))}
            required
          />
          <Select
            label="Category"
            name="category_id"
            value={categoryId}
            onChange={setCategoryId}
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
            required
          />
          {subTypes.length > 0 && (
            <Select
              label="Sub-type"
              name="sub_type_slug"
              defaultValue={values?.sub_type_slug ?? ""}
              options={[
                { value: "", label: "— none —" },
                ...subTypes.map((s) => ({ value: s.slug, label: s.name })),
              ]}
            />
          )}
        </div>
      </Card>

      <Card title="Pricing">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Price (₨)"
            name="price"
            type="number"
            min={0}
            step={100}
            required
            defaultValue={values?.price}
          />
          <Field
            label="Original price (optional)"
            name="original_price"
            type="number"
            min={0}
            step={100}
            defaultValue={values?.original_price ?? ""}
          />
          <Field
            label="Installment from (₨/month)"
            name="installment_from"
            type="number"
            min={0}
            step={50}
            defaultValue={values?.installment_from ?? ""}
          />
        </div>
      </Card>

      {mode === "create" && (
        <Card title="Primary image (URL)">
          <p className="mb-3 text-caption text-graphite-400">
            Paste an image URL to get started. After saving you can upload
            additional images and manage the gallery on the edit page.
          </p>
          <Field
            label="Image URL"
            name="image"
            defaultValue={values?.image}
            required
            placeholder="https://images.unsplash.com/photo-..."
          />
        </Card>
      )}

      <Card title="Content">
        <div className="grid gap-4">
          <Textarea
            label="Highlights — one bullet per line"
            name="highlights"
            rows={4}
            defaultValue={highlightsText}
            placeholder={"DC Inverter — up to 60% power saving\nT3 compressor for Lahore summers\n10-year compressor warranty"}
          />
          <Textarea
            label="Long description"
            name="description"
            rows={6}
            defaultValue={values?.description ?? ""}
            placeholder="Two to three sentences in real, locally-toned copy. Mention why it suits a Lahore household."
          />
          <Textarea
            label="Specs — one `Label: Value` per line"
            name="specs"
            rows={6}
            defaultValue={specsText}
            placeholder={"Capacity: 1.5 Ton (18,000 BTU)\nType: Split, DC Inverter\nMode: Heat & Cool"}
          />
        </div>
      </Card>

      <Card title="Stock & promotion">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Warranty text"
            name="warranty"
            defaultValue={values?.warranty ?? ""}
            placeholder="1 year unit, 10 years compressor"
          />
          <label className="flex items-center gap-2 self-end pb-2 text-small">
            <input
              type="checkbox"
              name="in_stock"
              defaultChecked={values?.in_stock ?? true}
              className="h-4 w-4 rounded border-mist accent-copper"
            />
            Available for purchase
          </label>
        </div>
        <div className="mt-5">
          <p className="mb-2 text-caption uppercase tracking-[0.12em] text-graphite-400">
            Badges
          </p>
          <div className="flex flex-wrap gap-2">
            {BADGE_OPTIONS.map((b) => (
              <label
                key={b.value}
                className="inline-flex items-center gap-2 rounded-full border border-mist bg-white px-3 py-1.5 text-small cursor-pointer hover:bg-porcelain"
              >
                <input
                  type="checkbox"
                  name="badges"
                  value={b.value}
                  defaultChecked={values?.badges?.includes(b.value)}
                  className="h-3.5 w-3.5 rounded border-mist accent-copper"
                />
                {b.label}
              </label>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          className="rounded-full bg-copper text-white px-6 h-11 text-small font-medium hover:bg-copper-600 transition-colors"
        >
          {mode === "create" ? "Create product" : "Save changes"}
        </button>
      </div>
    </form>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-mist bg-white p-6">
      <h2 className="font-display text-h2 font-semibold text-graphite mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required,
  min,
  step,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  required?: boolean;
  min?: number;
  step?: number;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-caption uppercase tracking-[0.12em] text-graphite-400">
        {label}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        required={required}
        min={min}
        step={step}
        className="block w-full h-11 rounded-lg border border-mist bg-white px-3.5 text-small placeholder:text-graphite-300 focus:border-graphite-200 focus:outline-none"
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  rows,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-caption uppercase tracking-[0.12em] text-graphite-400">
        {label}
      </span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        rows={rows}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-mist bg-white px-3.5 py-2.5 text-small placeholder:text-graphite-300 focus:border-graphite-200 focus:outline-none font-mono leading-relaxed"
      />
    </label>
  );
}

function Select({
  label,
  name,
  value,
  defaultValue,
  onChange,
  options,
  required,
}: {
  label: string;
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-caption uppercase tracking-[0.12em] text-graphite-400">
        {label}
      </span>
      <select
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        required={required}
        className="block w-full h-11 rounded-lg border border-mist bg-white px-3 text-small focus:border-graphite-200 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
