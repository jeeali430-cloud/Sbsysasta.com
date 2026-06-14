import type { ProductSpec } from "@/data/products";

export function SpecsTable({ specs }: { specs: ProductSpec[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-mist bg-white">
      <table className="w-full text-small">
        <tbody>
          {specs.map((s, i) => (
            <tr
              key={s.label}
              className={i % 2 === 0 ? "bg-porcelain/40" : "bg-white"}
            >
              <th
                scope="row"
                className="w-1/3 px-5 py-3.5 text-left font-medium text-graphite-400"
              >
                {s.label}
              </th>
              <td className="px-5 py-3.5 text-graphite">{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
