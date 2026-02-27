import type { Metadata } from "next";
export const metadata: Metadata = { title: "CBAM Cost Simulator" };
export default function CbamSimulatorPage() {
  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">CBAM Cost Simulator</h1>
      <p className="text-sm text-zinc-500">Simulate your CBAM cost under different EUA price and supplier data scenarios.</p>
    </div>
  );
}
