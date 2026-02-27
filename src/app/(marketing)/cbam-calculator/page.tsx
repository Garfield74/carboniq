"use client";
import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Info, AlertTriangle, TrendingUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CBAM_SECTORS, ALL_COUNTRIES, EUA_PRICE_EUR_PER_TONNE, formatCurrency, formatNumber } from "@/lib/constants";
import { formatNumber as fmt } from "@/lib/utils";

interface CalculationResult {
  embeddedEmissionsTCO2e: number;
  cbamCostEUR: number;
  euaPrice: number;
  defaultValueUsed: boolean;
  sector: string;
  good: string;
  quantity: number;
  country: string;
  projections: { year: number; cost: number }[];
}

export default function CbamCalculatorPage() {
  const [sector, setSector] = useState("");
  const [hsCode, setHsCode] = useState("");
  const [country, setCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedSector = CBAM_SECTORS.find(s => s.sector === sector);
  const selectedGood = selectedSector?.goods.find(g => g.hsCode === hsCode);

  const calculate = () => {
    if (!selectedSector || !selectedGood || !country || !quantity) return;
    setLoading(true);

    setTimeout(() => {
      const qty = parseFloat(quantity);
      const defaultFactor =
        "defaultValueTCO2ePerTonne" in selectedSector
          ? (selectedSector as { defaultValueTCO2ePerTonne: number }).defaultValueTCO2ePerTonne
          : ("defaultValueTCO2ePerMWh" in selectedSector
            ? (selectedSector as { defaultValueTCO2ePerMWh: number }).defaultValueTCO2ePerMWh
            : 1.0);

      const embeddedEmissions = qty * defaultFactor;
      const eua = EUA_PRICE_EUR_PER_TONNE;
      const cbamCost = embeddedEmissions * eua;

      // EU countries have some ETS price already paid — simplified for demo
      const isEuCountry = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"].includes(country);
      const adjustedCost = isEuCountry ? cbamCost * 0.3 : cbamCost;

      const projections = [
        { year: 2026, cost: adjustedCost * 0.25 }, // 25% phased in
        { year: 2027, cost: adjustedCost * 0.5 },
        { year: 2028, cost: adjustedCost * 0.75 },
        { year: 2030, cost: adjustedCost * 1.0 },
        { year: 2033, cost: adjustedCost * 1.0 * 1.2 }, // assume EUA price increase
      ];

      setResult({
        embeddedEmissionsTCO2e: embeddedEmissions,
        cbamCostEUR: adjustedCost,
        euaPrice: eua,
        defaultValueUsed: true,
        sector: sector,
        good: selectedGood.description,
        quantity: qty,
        country,
        projections,
      });
      setLoading(false);
    }, 600);
  };

  const selectedCountryName = ALL_COUNTRIES.find(c => c.code === country)?.name;

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Free Tool — No Login Required</Badge>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            CBAM Cost Calculator
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Estimate your Carbon Border Adjustment Mechanism cost exposure for 2026 and beyond.
            Uses EU Commission default emission values — free, instant, no signup.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Input form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-emerald-600" />
                Import Details
              </CardTitle>
              <CardDescription>
                Enter your import data to calculate CBAM exposure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Sector */}
              <div className="space-y-1.5">
                <Label>Product sector</Label>
                <Select value={sector} onValueChange={(v) => { setSector(v); setHsCode(""); setResult(null); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sector..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CBAM_SECTORS.map(s => (
                      <SelectItem key={s.sector} value={s.sector}>{s.sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Good */}
              {sector && (
                <div className="space-y-1.5">
                  <Label>Good / HS Code</Label>
                  <Select value={hsCode} onValueChange={(v) => { setHsCode(v); setResult(null); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select good..." />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedSector?.goods.map(g => (
                        <SelectItem key={g.hsCode} value={g.hsCode}>
                          {g.hsCode} — {g.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Country of origin */}
              <div className="space-y-1.5">
                <Label>Country of origin</Label>
                <Select value={country} onValueChange={(v) => { setCountry(v); setResult(null); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country..." />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_COUNTRIES.map(c => (
                      <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <Label>Annual import quantity (tonnes)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 500"
                  value={quantity}
                  onChange={e => { setQuantity(e.target.value); setResult(null); }}
                  min="0"
                />
              </div>

              {/* EUA price info */}
              <div className="flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 p-3 text-xs text-blue-700 dark:text-blue-300">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Calculation uses EU Commission default values and current EUA price of
                  ~€{EUA_PRICE_EUR_PER_TONNE}/tonne. Actual costs depend on supplier-specific data.
                </span>
              </div>

              <Button
                className="w-full"
                onClick={calculate}
                disabled={!sector || !hsCode || !country || !quantity || loading}
              >
                {loading ? "Calculating..." : "Calculate CBAM exposure"}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            {!result ? (
              <Card className="flex items-center justify-center h-full min-h-64">
                <CardContent className="text-center text-zinc-400 py-12">
                  <Calculator className="mx-auto h-12 w-12 mb-4 opacity-30" />
                  <p className="text-sm">Fill in the form to calculate your CBAM exposure</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Main result */}
                <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                          Estimated CBAM cost for {result.quantity.toLocaleString()} t of {result.sector}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">from {selectedCountryName}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-zinc-500">Embedded emissions</p>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                          {fmt(result.embeddedEmissionsTCO2e, 1)} tCO₂e
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Annual CBAM cost</p>
                        <p className="text-2xl font-bold text-amber-600">
                          {formatCurrency(result.cbamCostEUR)}
                        </p>
                      </div>
                    </div>
                    {result.defaultValueUsed && (
                      <div className="mt-3 text-xs text-zinc-500 bg-white/60 dark:bg-zinc-900/60 rounded-md p-2">
                        ⚠ Using EU default values. Actual supplier data could reduce this by up to 60%.
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Projections */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-zinc-400" />
                      Cost projections (phased CBAM rollout)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {result.projections.map((p) => (
                      <div key={p.year} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400 font-medium">{p.year}</span>
                        <div className="flex items-center gap-3 flex-1 mx-4">
                          <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{ width: `${(p.cost / result.projections[result.projections.length - 1].cost) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="font-semibold text-zinc-900 dark:text-white tabular-nums">
                          {formatCurrency(p.cost)}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* CTA */}
                <Card className="bg-zinc-950 text-white border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-emerald-400 shrink-0" />
                      <div>
                        <p className="font-semibold">Reduce this cost by up to 60%</p>
                        <p className="mt-1 text-sm text-zinc-400">
                          Get actual supplier emission data instead of EU default values with CarbonIQ&apos;s supplier portal.
                          Full CBAM declaration generation included.
                        </p>
                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                          <Link href="/auth/signup" className="flex-1">
                            <Button className="w-full" size="sm">
                              Start free trial
                              <ArrowRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                          </Link>
                          <Link href="/features/cbam">
                            <Button variant="outline" size="sm" className="border-zinc-700 text-white hover:bg-zinc-800">
                              Learn more
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Methodology note */}
        <div className="mt-8 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 text-xs text-zinc-400 leading-relaxed">
          <strong className="text-zinc-600 dark:text-zinc-300">Methodology:</strong>{" "}
          This calculator uses EU Commission default embedded emission values from the CBAM Implementing
          Regulation (Commission Implementing Regulation (EU) 2023/1773). The EUA price used is approximate
          and updated periodically. Actual CBAM obligations depend on verified supplier-specific data.
          This tool is for estimation purposes only and does not constitute compliance advice.
          For full compliance, consult an authorized CBAM declarant or use CarbonIQ&apos;s full platform.
        </div>
      </div>
    </div>
  );
}
