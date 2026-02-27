"use client";
import { useState } from "react";
import { Thermometer, Info, ChevronRight, CheckCircle2, Clock, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

const PILLARS = [
  {
    id: "governance",
    label: "Governance",
    desc: "Board oversight and management role in climate-related risks and opportunities",
    completion: 80,
    questions: [
      { id: "g1", q: "Describe the board's oversight of climate-related risks and opportunities.", answer: "The Board reviews climate risks annually via the Sustainability Committee, which reports directly to the CEO.", complete: true },
      { id: "g2", q: "Describe management's role in assessing and managing climate-related risks.", answer: "", complete: false },
    ],
  },
  {
    id: "strategy",
    label: "Strategy",
    desc: "Climate-related risks and opportunities and their impact on strategy and financial planning",
    completion: 50,
    questions: [
      { id: "s1", q: "Describe the climate-related risks and opportunities identified over short, medium and long term.", answer: "Short-term: CBAM cost exposure of ~€84,500 for 2026 imports...", complete: true },
      { id: "s2", q: "Describe the impact of climate-related risks on business model and value chain.", answer: "", complete: false },
      { id: "s3", q: "Describe resilience of strategy under different climate scenarios.", answer: "", complete: false },
    ],
  },
  {
    id: "risk_management",
    label: "Risk Management",
    desc: "Processes for identifying, assessing, prioritizing and monitoring climate-related risks",
    completion: 30,
    questions: [
      { id: "r1", q: "Describe processes used to identify and assess climate-related risks.", answer: "", complete: false },
      { id: "r2", q: "Describe processes for managing climate-related risks.", answer: "", complete: false },
    ],
  },
  {
    id: "metrics_targets",
    label: "Metrics & Targets",
    desc: "Metrics and targets used to assess and manage climate-related risks and opportunities",
    completion: 65,
    questions: [
      { id: "m1", q: "Disclose Scope 1, 2 & 3 GHG emissions (linked from GHG module).", answer: "Scope 1: 312 tCO₂e | Scope 2 (location): 285 tCO₂e | Scope 3: 650 tCO₂e | Total: 1,247 tCO₂e", complete: true },
      { id: "m2", q: "Describe targets used to manage climate-related risks and opportunities.", answer: "Net zero by 2040 across all scopes. Scope 1+2 reduction target: -50% by 2030 vs 2023 baseline.", complete: true },
      { id: "m3", q: "Describe progress against targets.", answer: "", complete: false },
    ],
  },
];

export default function IfrsS2Page() {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    PILLARS.forEach(p => p.questions.forEach(q => { init[q.id] = q.answer; }));
    return init;
  });
  const [saving, setSaving] = useState(false);

  const overallCompletion = Math.round(PILLARS.reduce((s, p) => s + p.completion, 0) / PILLARS.length);

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
            <div className="rounded-lg bg-purple-50 dark:bg-purple-950 p-1.5">
              <Thermometer className="h-4 w-4 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">IFRS S2 — Climate Disclosures</h1>
          </div>
          <p className="text-sm text-zinc-500">ISSB IFRS S2 requires climate-related financial disclosures across four pillars: Governance, Strategy, Risk Management, and Metrics & Targets.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{overallCompletion}% complete</Badge>
          <Button size="sm" className="gap-1.5" onClick={handleSave} disabled={saving}>
            <Save className="h-3.5 w-3.5" />{saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50 px-4 py-3">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          IFRS S2 is aligned with TCFD recommendations. GHG emissions data is automatically pulled from your GHG modules.
          Use <strong>AI-assisted drafting</strong> (Professional plan) to generate narrative text from your data.
        </p>
      </div>

      {/* Pillar progress overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PILLARS.map(p => (
          <Card key={p.id}>
            <CardContent className="p-4">
              <p className="text-xs font-medium text-zinc-900 dark:text-white">{p.label}</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">{p.completion}%</p>
              <Progress value={p.completion} className="mt-2 h-1.5" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Disclosure form */}
      <Tabs defaultValue="governance">
        <TabsList className="flex-wrap h-auto gap-1">
          {PILLARS.map(p => (
            <TabsTrigger key={p.id} value={p.id} className="gap-1.5">
              {p.completion === 100 ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Clock className="h-3.5 w-3.5 text-zinc-400" />}
              {p.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {PILLARS.map(p => (
          <TabsContent key={p.id} value={p.id} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-zinc-400" />{p.label}
                </CardTitle>
                <CardDescription>{p.desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {p.questions.map(q => (
                  <div key={q.id} className="space-y-2">
                    <div className="flex items-start gap-2">
                      {answers[q.id] ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> : <Clock className="h-4 w-4 text-zinc-300 shrink-0 mt-0.5" />}
                      <Label className="text-sm font-medium text-zinc-900 dark:text-white leading-relaxed">{q.q}</Label>
                    </div>
                    <textarea
                      className="w-full min-h-[100px] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
                      placeholder="Enter your disclosure narrative here..."
                      value={answers[q.id] ?? ""}
                      onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-xs text-purple-600 hover:text-purple-700 gap-1">
                        ✨ Draft with AI
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Scenario Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Climate Scenario Analysis</CardTitle>
          <CardDescription>IFRS S2 requires disclosure of climate scenarios considered (1.5°C, 2°C, 4°C)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { scenario: "1.5°C (Paris aligned)", risk: "High transition risk", physicalRisk: "Low", color: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30" },
              { scenario: "2°C (Policy action)", risk: "Medium transition risk", physicalRisk: "Medium", color: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30" },
              { scenario: "4°C (No action)", risk: "Low transition risk", physicalRisk: "High", color: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30" },
            ].map(s => (
              <div key={s.scenario} className={`rounded-xl border p-4 ${s.color}`}>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">{s.scenario}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Transition: {s.risk}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Physical: {s.physicalRisk}</p>
                <Button variant="ghost" size="sm" className="mt-2 text-xs p-0 h-auto">
                  Complete analysis →
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
