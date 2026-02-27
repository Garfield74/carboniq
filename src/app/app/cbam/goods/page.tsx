import type { Metadata } from "next";
export const metadata: Metadata = { title: "CBAM Goods" };
export default function CbamGoodsPage() {
  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Goods & HS Codes</h1>
      <p className="text-sm text-zinc-500">Manage your CBAM-covered imported goods and HS code classifications.</p>
    </div>
  );
}
