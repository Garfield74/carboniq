"use client";
import { useState } from "react";
import { Globe, ChevronRight, ChevronDown, Plus, Info, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatTonnes } from "@/lib/utils";

const SCOPE3_CATEGORIES = [
  { id: 1, name: "Purchased goods & services", method: "Spend-based (DEFRA/EXIOBASE)", status: "complete", tco2e: 420, available: true },
  { id: 2, name: "Capital goods", method: "Spend-based", status: "partial", tco2e: 85, available: true },
  { id: 3, name: "Fuel & energy-related activities", method: "Activity-based", status: "complete", tco2e: 42, available: true },
  { id: 4, name: "Upstream transportation & distribution", method: "Distance-based", status: "partial", tco2e: 38, available: true },
  { id: 5, name: "Waste generated in operations", method: "Weight-based (DEFRA)", status: "complete", tco2e: 12, available: true },
  { id: 6, name: "Business travel", method: "Distance-based (flights/rail/hotel)", status: "complete", tco2e: 28, available: true },
  { id: 7, name: "Employee commuting", method: "Survey-based", status: "not_started", tco2e: 0, available: true },
  { id: 8, name: "Upstream leased assets", method: "Activity-based", status: "not_started", tco2e: 0, available: true },
  { id: 9, name: "Downstream transportation", method: "Distance-based", status: "not_started", tco2e: 0, available: false },
  { id: 10, name: "Processing of sold products", method: "Activity-based", status: "not_started", tco2e: 0, available: false },
  { id: 11, name: "Use of sold products", method: "Activity-based", status: "not_started", tco2e: 0, available: false },
  { id: 12, name: "End-of-life treatment of sold products", method: "Weight-based", status: "not_started", tco2e: 0, available: false },
  { id: 13, name: "Downstream leased assets", method: "Activity-based", status: "not_started", tco2e: 0, available: false },
  { id: 14, name: "Franchises", method: "Activity-based", status: "not_started", tco2e: 0, available: false },
  { id: 15, name: "Investments (financed emissions)", method: "PCAF methodology", status: "not_started", tco2e: 0, available: false },
];

const STATUS_CONFIG = {
  complete: { label: "Complete", color: "bg-emerald-500", badge: "default" as const },
  partial: { label: "Partial", color: "bg-amber-400", badge: "warning" as const },
  not_started: { label: "Not started", color: "bg-zinc-200 dark:bg-zinc-700", badge: "secondary" as const },
};

export default function Scope3Page() {
  const [expanded, setExpanded] = useState<number | null>(1);

  const total = SCOPE3_CATEGORIES.reduce((s, c) => s + c.tco2e, 0);
  const completedCount = SCOPE3_CATEGORIES.filter(c => c.status === "complete").length;

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-1.5">
              <Globe className="h-4 w-4 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Scope 3 — Value Chain Emissions</h1>
          </div>
          <p className="text-sm text-zinc-500">All 15 GHG Protocol Scope 3 categories. Indirect emissions from your upstream and downstream activities.</p>
        </div>
        <Badge variant="outline" className="text-sm shrink-0">
          Total: <span className="ml-1 font-bold text-zinc-900 dark:text-white">{formatTonnes(total * 1000)}</span>
        </Badge>
      </div>

      {/* Progress overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-zinc-500">Categories complete</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{completedCount} / 15</p>
            <Progress value={(completedCount / 15) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-zinc-500">Scope 3 total (estimated)</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{formatTonnes(total * 1000)}</p>
            <p className="text-xs text-zinc-400 mt-1">Covers {completedCount + 2} categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-zinc-500">Largest source</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">Cat. 1</p>
            <p className="text-xs text-zinc-400 mt-1">Purchased goods — 67% of Scope 3</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-start gap-2.5 rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50 px-4 py-3">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Scope 3 emission factors use <strong>UK DEFRA spend-based factors</strong> and <strong>EXIOBASE IO model</strong> for Cat 1–2.
          Upgrade to Professional plan to unlock all 15 categories.
        </p>
      </div>

      {/* Category accordion */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All 15 Categories</CardTitle>
          <CardDescription>Click a category to expand and enter data</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {SCOPE3_CATEGORIES.map((cat, i) => {
            const status = STATUS_CONFIG[cat.status as keyof typeof STATUS_CONFIG];
            const isExpanded = expanded === cat.id;
            return (
              <div key={cat.id} className={`border-t border-zinc-100 dark:border-zinc-800 ${i === 0 ? "border-t-0" : ""}`}>
                <button
                  onClick={() => cat.available ? setExpanded(isExpanded ? null : cat.id) : undefined}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${
                    cat.available ? "hover:bg-zinc-50 dark:hover:bg-zinc-800/50" : "opacity-60 cursor-not-allowed"
                  }`}
                >
                  <span className="text-xs font-mono text-zinc-400 w-6 shrink-0">{cat.id}</span>
                  <div className={`h-2 w-2 rounded-full shrink-0 ${status.color}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">{cat.name}</span>
                    <span className="text-xs text-zinc-400 ml-2">— {cat.method}</span>
                  </div>
                  {cat.tco2e > 0 && (
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 shrink-0">
                      {formatTonnes(cat.tco2e * 1000)}
                    </span>
                  )}
                  <Badge variant={status.badge} className="shrink-0 text-xs">{status.label}</Badge>
                  {!cat.available && <Lock className="h-3.5 w-3.5 text-zinc-400 shrink-0" />}
                  {cat.available && (isExpanded ? <ChevronDown className="h-4 w-4 text-zinc-400 shrink-0" /> : <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0" />)}
                </button>

                {isExpanded && cat.available && (
                  <div className="px-5 pb-5 pt-2 bg-zinc-50/50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800">
                    {cat.id === 1 && (
                      <div className="space-y-4">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          <strong>Method:</strong> Spend-based using DEFRA/EXIOBASE emission intensity factors.
                          Enter your annual spend by procurement category.
                        </p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                          {[
                            { label: "Raw materials & components", placeholder: "€ spend" },
                            { label: "Professional services", placeholder: "€ spend" },
                            { label: "IT & software", placeholder: "€ spend" },
                          ].map(field => (
                            <div key={field.label} className="space-y-1.5">
                              <Label className="text-xs">{field.label}</Label>
                              <Input type="number" placeholder={field.placeholder} className="h-8 text-xs" />
                            </div>
                          ))}
                        </div>
                        <Button size="sm" variant="outline" className="gap-1.5">
                          <Plus className="h-3.5 w-3.5" /> Add procurement category
                        </Button>
                      </div>
                    )}
                    {cat.id === 6 && (
                      <div className="space-y-4">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          <strong>Method:</strong> Distance-based. Enter flights, rail, and hotel nights.
                        </p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                          {[
                            { label: "Short-haul flights (km)", placeholder: "e.g. 5000" },
                            { label: "Long-haul flights (km)", placeholder: "e.g. 20000" },
                            { label: "Hotel nights", placeholder: "e.g. 40" },
                          ].map(field => (
                            <div key={field.label} className="space-y-1.5">
                              <Label className="text-xs">{field.label}</Label>
                              <Input type="number" placeholder={field.placeholder} className="h-8 text-xs" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {cat.id !== 1 && cat.id !== 6 && (
                      <p className="text-sm text-zinc-500">Enter {cat.method.toLowerCase()} data for this category.</p>
                    )}
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Save data</Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
