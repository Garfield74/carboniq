"use client";
import { useState } from "react";
import type { Metadata } from "next";
import { Plus, Trash2, Info, Flame, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EMISSION_FACTORS } from "@/lib/constants";
import { formatTonnes } from "@/lib/utils";

type ActivityRow = {
  id: string;
  category: "fuels" | "vehicles" | "refrigerants";
  activityKey: string;
  quantity: string;
  co2eKg: number;
  notes: string;
};

const CATEGORIES = [
  { value: "fuels", label: "Stationary Combustion (fuels)" },
  { value: "vehicles", label: "Mobile Combustion (vehicles)" },
  { value: "refrigerants", label: "Fugitive Emissions (refrigerants)" },
];

function calcCO2e(category: ActivityRow["category"], activityKey: string, qty: number): number {
  const factors = EMISSION_FACTORS[category] as Record<string, { factor: number }>;
  const ef = factors?.[activityKey]?.factor ?? 0;
  return qty * ef;
}

export default function Scope1Page() {
  const [activities, setActivities] = useState<ActivityRow[]>([
    { id: "1", category: "fuels", activityKey: "natural_gas_m3", quantity: "1200", co2eKg: 1200 * 2.01435, notes: "" },
    { id: "2", category: "vehicles", activityKey: "diesel_car_km", quantity: "45000", co2eKg: 45000 * 0.15, notes: "Company fleet" },
  ]);
  const [saving, setSaving] = useState(false);

  const totalKg = activities.reduce((sum, a) => sum + a.co2eKg, 0);

  function addRow() {
    setActivities(prev => [
      ...prev,
      { id: Date.now().toString(), category: "fuels", activityKey: "natural_gas_m3", quantity: "", co2eKg: 0, notes: "" },
    ]);
  }

  function removeRow(id: string) {
    setActivities(prev => prev.filter(a => a.id !== id));
  }

  function updateRow(id: string, field: keyof ActivityRow, value: string) {
    setActivities(prev => prev.map(a => {
      if (a.id !== id) return a;
      const updated = { ...a, [field]: value };
      if (field === "quantity" || field === "activityKey" || field === "category") {
        const qty = parseFloat(updated.quantity) || 0;
        updated.co2eKg = calcCO2e(updated.category, updated.activityKey, qty);
      }
      if (field === "category") {
        const firstKey = Object.keys(EMISSION_FACTORS[value as ActivityRow["category"]])[0];
        updated.activityKey = firstKey;
        const qty = parseFloat(updated.quantity) || 0;
        updated.co2eKg = calcCO2e(value as ActivityRow["category"], firstKey, qty);
      }
      return updated;
    }));
  }

  async function handleSave() {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="rounded-lg bg-red-50 dark:bg-red-950 p-1.5">
              <Flame className="h-4 w-4 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Scope 1 — Direct Emissions</h1>
          </div>
          <p className="text-sm text-zinc-500">
            Direct GHG emissions from owned or controlled sources. Stationary combustion, mobile combustion, and fugitive emissions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Total: <span className="ml-1 font-bold text-zinc-900 dark:text-white">{formatTonnes(totalKg)}</span>
          </Badge>
          <Button onClick={handleSave} disabled={saving} size="sm" className="gap-1.5">
            <Save className="h-3.5 w-3.5" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-2.5 rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50 px-4 py-3">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Emission factors from <strong>UK DEFRA 2024</strong> and <strong>US EPA GHG Hub</strong>. All values in kg CO₂e.
          Sources are updated annually — last update: <strong>January 2025</strong>.
        </p>
      </div>

      {/* Activity rows */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Activity Data</CardTitle>
              <CardDescription>Add all direct emission sources for this reporting period</CardDescription>
            </div>
            <Button onClick={addRow} variant="outline" size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Add row
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-3 mb-3 text-xs font-medium text-zinc-500 uppercase tracking-wider px-1">
            <div className="col-span-3">Category</div>
            <div className="col-span-3">Activity / Fuel Type</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-1">Unit</div>
            <div className="col-span-2">CO₂e</div>
            <div className="col-span-1"></div>
          </div>

          <div className="space-y-3">
            {activities.map(row => {
              const factors = EMISSION_FACTORS[row.category] as Record<string, { factor: number; unit: string; label: string }>;
              const selectedFactor = factors[row.activityKey];
              return (
                <div key={row.id} className="grid grid-cols-12 gap-3 items-center rounded-lg border border-zinc-100 dark:border-zinc-800 p-3 bg-white dark:bg-zinc-900">
                  {/* Category */}
                  <div className="col-span-12 md:col-span-3">
                    <Label className="md:hidden text-xs mb-1 block">Category</Label>
                    <Select value={row.category} onValueChange={v => updateRow(row.id, "category", v)}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Activity */}
                  <div className="col-span-12 md:col-span-3">
                    <Label className="md:hidden text-xs mb-1 block">Activity Type</Label>
                    <Select value={row.activityKey} onValueChange={v => updateRow(row.id, "activityKey", v)}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(factors).map(([key, val]) => (
                          <SelectItem key={key} value={key}>{val.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-6 md:col-span-2">
                    <Label className="md:hidden text-xs mb-1 block">Quantity</Label>
                    <Input
                      type="number"
                      value={row.quantity}
                      onChange={e => updateRow(row.id, "quantity", e.target.value)}
                      placeholder="0"
                      className="h-8 text-xs"
                      min="0"
                    />
                  </div>

                  {/* Unit */}
                  <div className="col-span-3 md:col-span-1 flex items-center">
                    <span className="text-xs text-zinc-500 font-mono">{selectedFactor?.unit ?? "—"}</span>
                  </div>

                  {/* CO2e result */}
                  <div className="col-span-3 md:col-span-2 flex items-center">
                    <span className={`text-xs font-semibold ${row.co2eKg > 0 ? "text-zinc-900 dark:text-white" : "text-zinc-400"}`}>
                      {row.co2eKg > 0 ? formatTonnes(row.co2eKg) : "—"}
                    </span>
                  </div>

                  {/* Delete */}
                  <div className="col-span-12 md:col-span-1 flex justify-end">
                    <button
                      onClick={() => removeRow(row.id)}
                      className="text-zinc-300 hover:text-red-500 transition-colors"
                      title="Remove row"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {activities.length === 0 && (
            <div className="text-center py-12 text-zinc-400">
              <Flame className="mx-auto h-8 w-8 mb-3 opacity-30" />
              <p className="text-sm">No activities yet. Click "Add row" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      {activities.length > 0 && (
        <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Scope 1 Total</p>
                <p className="text-3xl font-bold text-zinc-900 dark:text-white mt-1">{formatTonnes(totalKg)}</p>
              </div>
              <div className="text-right space-y-1">
                {CATEGORIES.map(cat => {
                  const catTotal = activities.filter(a => a.category === cat.value).reduce((s, a) => s + a.co2eKg, 0);
                  if (catTotal === 0) return null;
                  return (
                    <div key={cat.value} className="flex items-center gap-2 justify-end">
                      <span className="text-xs text-zinc-500">{cat.label}:</span>
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{formatTonnes(catTotal)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
