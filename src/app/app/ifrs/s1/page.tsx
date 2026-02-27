import type { Metadata } from "next";
export const metadata: Metadata = { title: "IFRS S1 — General Sustainability Disclosures" };
export default function IfrsS1Page() {
  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">IFRS S1 — General Sustainability Disclosures</h1>
      <p className="text-sm text-zinc-500">ISSB IFRS S1 general requirements for disclosure of sustainability-related financial information.</p>
    </div>
  );
}
