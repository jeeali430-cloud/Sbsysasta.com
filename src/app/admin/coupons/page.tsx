import { requireAdmin } from "@/lib/admin/guard";
import { listCoupons } from "@/lib/admin/queries";
import { createCoupon, setCouponActive } from "@/lib/admin/actions";

const typeLabels: Record<string, string> = {
  percent: "% off",
  flat: "Flat amount",
  freeDelivery: "Free delivery",
};

export default async function AdminCouponsPage() {
  await requireAdmin();
  const coupons = await listCoupons();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-caption uppercase tracking-[0.18em] text-copper font-medium">
          Promotions
        </p>
        <h1 className="mt-1 font-display text-h1 sm:text-display-lg font-semibold tracking-tight text-graphite">
          Coupons
        </h1>
      </header>

      <section className="rounded-xl border border-mist bg-white overflow-hidden">
        {coupons.length === 0 ? (
          <p className="p-10 text-center text-small text-slate">
            No coupons yet. Use the form below to create the first one.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-small">
              <thead className="text-left text-caption uppercase tracking-[0.12em] text-graphite-400 bg-porcelain/50">
                <tr>
                  <th className="px-5 py-3 font-medium">Code</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Value</th>
                  <th className="px-5 py-3 font-medium">Label</th>
                  <th className="px-5 py-3 font-medium">Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mist">
                {coupons.map((c) => (
                  <tr key={c.code}>
                    <td className="px-5 py-3 font-mono font-semibold text-graphite">
                      {c.code}
                    </td>
                    <td className="px-5 py-3 text-graphite-400">
                      {typeLabels[c.type] ?? c.type}
                    </td>
                    <td className="px-5 py-3 tabular-nums">
                      {c.type === "freeDelivery"
                        ? "—"
                        : c.type === "percent"
                          ? `${c.value}%`
                          : `₨ ${c.value.toLocaleString("en-PK")}`}
                    </td>
                    <td className="px-5 py-3 text-graphite-400 max-w-xs">
                      {c.label}
                    </td>
                    <td className="px-5 py-3">
                      <form action={setCouponActive}>
                        <input type="hidden" name="code" value={c.code} />
                        <input
                          type="hidden"
                          name="active"
                          value={c.active ? "false" : "true"}
                        />
                        <button
                          type="submit"
                          className={`rounded-full px-3 py-1 text-caption font-medium border transition-colors ${
                            c.active
                              ? "border-pine/30 bg-pine/10 text-pine hover:bg-pine/20"
                              : "border-mist bg-white text-graphite-400 hover:bg-porcelain"
                          }`}
                        >
                          {c.active ? "Active" : "Disabled"}
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-mist bg-white p-6">
        <h2 className="font-display text-h2 font-semibold text-graphite">
          Create coupon
        </h2>
        <p className="mt-1 text-small text-slate">
          New coupons are active by default. Codes are stored uppercase.
        </p>

        <form action={createCoupon} className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Code" name="code" placeholder="EID25" required uppercase />
          <SelectField
            label="Type"
            name="type"
            options={[
              { value: "percent", label: "Percent off" },
              { value: "flat", label: "Flat amount off (₨)" },
              { value: "freeDelivery", label: "Free delivery" },
            ]}
          />
          <Field
            label="Value"
            name="value"
            type="number"
            placeholder="10"
            defaultValue="0"
            min={0}
          />
          <Field
            label="Customer-facing label"
            name="label"
            placeholder="10% off Eid sale"
            required
            className="sm:col-span-2"
          />
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-copper px-5 h-11 text-small font-medium text-white hover:bg-copper-600 transition-colors"
            >
              Save coupon
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  defaultValue,
  min,
  uppercase,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  min?: number;
  uppercase?: boolean;
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
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        min={min}
        className={`block w-full h-11 rounded-lg border border-mist bg-white px-3.5 text-small placeholder:text-graphite-300 focus:border-graphite-200 focus:outline-none ${
          uppercase ? "uppercase tracking-wide" : ""
        }`}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-caption uppercase tracking-[0.12em] text-graphite-400">
        {label}
      </span>
      <select
        name={name}
        defaultValue={options[0].value}
        className="block w-full h-11 rounded-lg border border-mist bg-white px-3.5 text-small focus:border-graphite-200 focus:outline-none"
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
