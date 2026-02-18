import products from "@/data/products.json";

export type Product = (typeof products)[number];

export function getCatalogSnippet() {
  return products.slice(0, 8).map((p) => `${p.name} | ${p.material} | MOQ:${p.MOQ} | lead:${p.lead_time_days}gün`).join("\n");
}
