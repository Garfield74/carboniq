import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Plus, Download, CheckCircle2, Clock, AlertTriangle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EUA_PRICE_EUR_PER_TONNE, CBAM_DEADLINES, formatCurrency } from "@/lib/constants";

export const metadata: Metadata = { title: "CBAM Declarations" };

const DECLARATIONS = [
  {
    id: "decl-2025-annual",
    period: "Annual 2025",
    type: "annual",
    status: "draft",
    goods: 12,
    embeddedEmissions: 1300.4,
    cbamCost: 1300.4 * EUA_PRICE_EUR_PER_TONNE,
    completeness: 72,
    dueDate: "2027-05-31",
    suppliersPending: 3,
  },
];

const STATUS_CONFIG = {
  draft: { label: "Draft", icon: Clock, color: "text-zinc-500", badge: "secondary" as const },
  submitted: { label: "Submitted", icon: CheckCircle2, color: "text-blue-600", badge: "info" as const },
  verified: { label: "Verified", icon: CheckCircle2, color: "text-emerald-600", badge: "default" as const },
  rejected: { label: "Rejected", icon: AlertTriangle, color: "text-red-600", badge: "destructive" as const },
};

export default function DeclarationsPage() {
  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950 p-1.5">
              <FileText className="h-4 w-4 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">CBAM Declarations</h1>
          </div>
          <p className="text-sm text-zinc-500">Manage your Carbon Border Adjustment Mechanism declarations for EU imports.</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> New declaration
        </Button>
      </div>

      {/* Deadlines */}
      <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <Calendar className="h-4 w-4" /> Key CBAM deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {CBAM_DEADLINES.map(d => (
              <div key={d.date} className={`flex items-start gap-3 rounded-lg p-3 ${d.severity === "critical" ? "bg-red-100 dark:bg-red-950/50" : "bg-white dark:bg-zinc-900"}`}>
                <div className={`h-2 w-2 mt-1.5 rounded-full shrink-0 ${d.severity === "critical" ? "bg-red-500" : "bg-amber-500"}`} />
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                    {new Date(d.date).toLocaleDateString("en-EU", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                  <p className="text-xs text-zinc-500">{d.label}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* EUA Price */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Current EUA Price", value: `€${EUA_PRICE_EUR_PER_TONNE}/t`, sub: "Last updated today" },
          { label: "Total Goods", value: "12", sub: "4 using default EF" },
          { label: "Embedded Emissions", value: "1,300 tCO₂e", sub: "Preliminary estimate" },
          { label: "Est. CBAM Cost 2026", value: formatCurrency(1300.4 * EUA_PRICE_EUR_PER_TONNE), sub: "At current EUA price" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-zinc-500">{s.label}</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-white mt-1">{s.value}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Declaration list */}
      <Card>
        <CardHeader>
          <CardTitle>Your Declarations</CardTitle>
          <CardDescription>Create and manage annual CBAM declarations</CardDescription>
        </CardHeader>
        <CardContent>
          {DECLARATIONS.map(decl => {
            const statusCfg = STATUS_CONFIG[decl.status as keyof typeof STATUS_CONFIG];
            const StatusIcon = statusCfg.icon;
            return (
              <div key={decl.id} className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{decl.period}</h3>
                      <Badge variant={statusCfg.badge} className="text-xs">
                        <StatusIcon className={`h-3 w-3 mr-1 ${statusCfg.color}`} />
                        {statusCfg.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-zinc-500 mt-0.5">
                      Due: {new Date(decl.dueDate).toLocaleDateString("en-EU", { year: "numeric", month: "long", day: "numeric" })} ·{" "}
                      {decl.goods} goods declared · {decl.suppliersPending} suppliers pending
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Download className="h-3.5 w-3.5" /> Export XML
                    </Button>
                    <Button size="sm">Edit declaration</Button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-zinc-500">Embedded emissions</p>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white">{decl.embeddedEmissions.toFixed(1)} tCO₂e</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Estimated CBAM cost</p>
                    <p className="text-lg font-bold text-amber-600">{formatCurrency(decl.cbamCost)}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-zinc-500">Completeness</p>
                      <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{decl.completeness}%</p>
                    </div>
                    <Progress value={decl.completeness} />
                    {decl.suppliersPending > 0 && (
                      <p className="text-xs text-amber-600 mt-1">
                        ⚠ {decl.suppliersPending} supplier questionnaire{decl.suppliersPending > 1 ? "s" : ""} pending
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {DECLARATIONS.length === 0 && (
            <div className="text-center py-12 text-zinc-400">
              <FileText className="mx-auto h-10 w-10 mb-3 opacity-30" />
              <p className="text-sm">No declarations yet. Create your first CBAM declaration.</p>
              <Button size="sm" className="mt-4 gap-1.5"><Plus className="h-3.5 w-3.5" />New declaration</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Goods overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Declared Goods</CardTitle>
              <CardDescription>Manage imported goods and their embedded emissions</CardDescription>
            </div>
            <div className="flex gap-2">
              <Link href="/app/cbam/goods">
                <Button variant="outline" size="sm">Manage goods</Button>
              </Link>
              <Link href="/app/cbam/suppliers">
                <Button variant="outline" size="sm">Suppliers</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="text-left pb-2 pr-4">HS Code</th>
                  <th className="text-left pb-2 pr-4">Description</th>
                  <th className="text-left pb-2 pr-4">Origin</th>
                  <th className="text-right pb-2 pr-4">Qty (t)</th>
                  <th className="text-right pb-2 pr-4">Emissions (tCO₂e)</th>
                  <th className="text-right pb-2">EF Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[
                  { hs: "7208", desc: "Flat-rolled steel (hot-rolled)", origin: "CN", qty: 250, emissions: 461.4, source: "Default" },
                  { hs: "7601", desc: "Unwrought aluminium", origin: "TR", qty: 85, emissions: 570.4, source: "Supplier" },
                  { hs: "2523", desc: "Portland cement", origin: "UA", qty: 180, emissions: 16.1, source: "Default" },
                  { hs: "7209", desc: "Flat-rolled steel (cold-rolled)", origin: "CN", qty: 95, emissions: 175.3, source: "Default" },
                ].map(row => (
                  <tr key={row.hs} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                    <td className="py-2.5 pr-4 font-mono text-xs text-zinc-600 dark:text-zinc-400">{row.hs}</td>
                    <td className="py-2.5 pr-4 text-zinc-900 dark:text-white">{row.desc}</td>
                    <td className="py-2.5 pr-4">
                      <Badge variant="outline" className="text-xs">{row.origin}</Badge>
                    </td>
                    <td className="py-2.5 pr-4 text-right tabular-nums">{row.qty}</td>
                    <td className="py-2.5 pr-4 text-right font-semibold tabular-nums">{row.emissions}</td>
                    <td className="py-2.5 text-right">
                      <Badge variant={row.source === "Supplier" ? "default" : "warning"} className="text-xs">{row.source}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
