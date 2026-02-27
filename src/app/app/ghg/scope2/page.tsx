"use client";
import { useState } from "react";
import { Zap, Info, Save, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EMISSION_FACTORS } from "@/lib/constants";
import { formatTonnes } from "@/lib/utils";

type ElectricityRow = {
  id: string;
  source: string;
  country: string;
  kwhConsumed: string;
  method: "location" | "market";
  co2eKg: number;
};

export default function Scope2Page() {
  const [rows, setRows] = useState<ElectricityRow[]>([
    { id: "1", source: "Grid electricity", country: "RO", kwhConsumed: "180000", method: "location", co2eKg: 180000 * 0.294 },
  ]);
  const [saving, setSaving] = useState(false);

  const locationTotal = rows.filter(r => r.method === "location").reduce((s, r) => s + r.co2eKg, 0);
  const marketTotal = rows.filter(r => r.method === "market").reduce((s, r) => s + r.co2eKg, 0);

  function calcRow(row: ElectricityRow): number {
    const kwh = parseFloat(row.kwhConsumed) || 0;
    const ef = EMISSION_FACTORS.electricity[row.country as keyof typeof EMISSION_FACTORS.electricity]?.factor ?? 0.276;
    return kwh * ef;
  }

  function addRow() {
    setRows(prev => [...prev, { id: Date.now().toString(), source: "Grid electricity", country: "RO", kwhConsumed: "", method: "location", co2eKg: 0 }]);
  }

  function updateRow(id: string, field: keyof ElectricityRow, value: string) {
    setRows(prev => prev.map(r => {
      if (r.id !== id) return r;
      const updated = { ...r, [field]: value };
      updated.co2eKg = calcRow(updated);
      return updated;
    }));
  }

  async function handleSave() {
    setSaving(true);
    await new Promise(res => setTimeout(res, 800));
    setSaving(false);
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950 p-1.5">
              <Zap className="h-4 w-4 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Scope 2 — Energy Indirect</h1>
          </div>
          <p className="text-sm text-zinc-500">Emissions from purchased electricity, heat, steam, and cooling.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Location: <span className="ml-1 font-bold text-zinc-900 dark:text-white">{formatTonnes(locationTotal)}</span>
          </Badge>
          <Button onClick={handleSave} disabled={saving} size="sm" className="gap-1.5">
            <Save className="h-3.5 w-3.5" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50 px-4 py-3">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Dual reporting required for CSRD:</strong> Report both location-based (national grid factor) and
          market-based (supplier-specific or residual mix factor) methods. Grid emission factors from{" "}
          <strong>EEA & IEA 2023</strong>.
        </p>
      </div>

      <Tabs defaultValue="electricity">
        <TabsList>
          <TabsTrigger value="electricity">Purchased Electricity</TabsTrigger>
          <TabsTrigger value="heat">Heat & Steam</TabsTrigger>
          <TabsTrigger value="cooling">Cooling</TabsTrigger>
        </TabsList>

        <TabsContent value="electricity" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Electricity Consumption</CardTitle>
                  <CardDescription>Enter kWh consumed per site/meter and select country for grid factor</CardDescription>
                </div>
                <Button onClick={addRow} variant="outline" size="sm" className="gap-1.5">
                  <Plus className="h-3.5 w-3.5" /> Add row
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="hidden md:grid grid-cols-12 gap-3 mb-3 text-xs font-medium text-zinc-500 uppercase tracking-wider px-1">
                <div className="col-span-3">Source / Location</div>
                <div className="col-span-2">Country</div>
                <div className="col-span-2">kWh Consumed</div>
                <div className="col-span-2">Method</div>
                <div className="col-span-2">Grid EF (kg/kWh)</div>
                <div className="col-span-1">CO₂e</div>
              </div>
              <div className="space-y-3">
                {rows.map(row => {
                  const ef = EMISSION_FACTORS.electricity[row.country as keyof typeof EMISSION_FACTORS.electricity]?.factor ?? 0.276;
                  return (
                    <div key={row.id} className="grid grid-cols-12 gap-3 items-center rounded-lg border border-zinc-100 dark:border-zinc-800 p-3">
                      <div className="col-span-12 md:col-span-3">
                        <Input value={row.source} onChange={e => updateRow(row.id, "source", e.target.value)} className="h-8 text-xs" placeholder="Office, Factory..." />
                      </div>
                      <div className="col-span-5 md:col-span-2">
                        <Select value={row.country} onValueChange={v => updateRow(row.id, "country", v)}>
                          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Object.entries(EMISSION_FACTORS.electricity).map(([code, data]) => (
                              <SelectItem key={code} value={code}>{data.label} ({code})</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <Input type="number" value={row.kwhConsumed} onChange={e => updateRow(row.id, "kwhConsumed", e.target.value)} className="h-8 text-xs" placeholder="kWh" />
                      </div>
                      <div className="col-span-5 md:col-span-2">
                        <Select value={row.method} onValueChange={v => updateRow(row.id, "method", v as "location" | "market")}>
                          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="location">Location-based</SelectItem>
                            <SelectItem value="market">Market-based</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-4 md:col-span-2 flex items-center">
                        <span className="text-xs font-mono text-zinc-500">{ef} kgCO₂e</span>
                      </div>
                      <div className="col-span-3 md:col-span-1 flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white">{row.co2eKg > 0 ? formatTonnes(row.co2eKg) : "—"}</span>
                        <button onClick={() => setRows(p => p.filter(r => r.id !== row.id))} className="text-zinc-300 hover:text-red-500">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {rows.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                <CardContent className="p-4">
                  <p className="text-xs text-zinc-500">Location-based Scope 2</p>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-white">{formatTonnes(locationTotal)}</p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700">
                <CardContent className="p-4">
                  <p className="text-xs text-zinc-500">Market-based Scope 2</p>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-white">{marketTotal > 0 ? formatTonnes(marketTotal) : "—"}</p>
                  <p className="text-xs text-zinc-400">Add market-based rows above</p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="heat" className="mt-4">
          <Card>
            <CardContent className="p-8 text-center text-zinc-400">
              <p className="text-sm">Heat & steam consumption tracking — add entries using the same format as electricity.</p>
              <Button variant="outline" size="sm" className="mt-4 gap-1.5"><Plus className="h-3.5 w-3.5" />Add heat source</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cooling" className="mt-4">
          <Card>
            <CardContent className="p-8 text-center text-zinc-400">
              <p className="text-sm">Cooling consumption tracking — add entries using the same format as electricity.</p>
              <Button variant="outline" size="sm" className="mt-4 gap-1.5"><Plus className="h-3.5 w-3.5" />Add cooling source</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
