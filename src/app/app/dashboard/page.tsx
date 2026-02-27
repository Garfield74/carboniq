import type { Metadata } from "next";
import { BarChart3, TrendingDown, AlertTriangle, CheckCircle2, Clock, ArrowUpRight, ArrowDownRight, Flame, Zap, Globe, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { EUA_PRICE_EUR_PER_TONNE } from "@/lib/constants";

export const metadata: Metadata = { title: "Dashboard" };

const KPI_CARDS = [
  {
    title: "Total GHG Emissions",
    value: "1,247 tCO₂e",
    change: "-12%",
    direction: "down" as const,
    period: "vs last year",
    icon: BarChart3,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 dark:bg-emerald-950",
  },
  {
    title: "CBAM Exposure 2026",
    value: "€84,500",
    change: "+8%",
    direction: "up" as const,
    period: "vs Q3 estimate",
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 dark:bg-amber-950",
  },
  {
    title: "Data Completeness",
    value: "87%",
    change: "+5%",
    direction: "up" as const,
    period: "since last month",
    icon: CheckCircle2,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    title: "Current EUA Price",
    value: `€${EUA_PRICE_EUR_PER_TONNE}/t`,
    change: "-3%",
    direction: "down" as const,
    period: "vs last week",
    icon: TrendingDown,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50 dark:bg-purple-950",
  },
];

const SCOPE_BREAKDOWN = [
  { label: "Scope 1 — Direct", value: 312, total: 1247, color: "bg-red-500", icon: Flame, href: "/app/ghg/scope1" },
  { label: "Scope 2 — Energy", value: 285, total: 1247, color: "bg-amber-500", icon: Zap, href: "/app/ghg/scope2" },
  { label: "Scope 3 — Value Chain", value: 650, total: 1247, color: "bg-blue-500", icon: Globe, href: "/app/ghg/scope3" },
];

const PENDING_ACTIONS = [
  { type: "cbam", title: "CBAM Declaration — Q4 2025", desc: "3 supplier questionnaires still pending", href: "/app/cbam/declarations", urgency: "high" },
  { type: "ghg", title: "Scope 3 Category 1 data missing", desc: "Purchased goods & services not yet entered for Nov–Dec", href: "/app/ghg/scope3", urgency: "medium" },
  { type: "ifrs", title: "IFRS S2 — Climate risks section", desc: "Transition risk assessment 60% complete", href: "/app/ifrs/s2", urgency: "low" },
];

const MONTHLY_EMISSIONS = [
  { month: "Jan", scope1: 28, scope2: 24, scope3: 54 },
  { month: "Feb", scope1: 26, scope2: 22, scope3: 50 },
  { month: "Mar", scope1: 30, scope2: 25, scope3: 58 },
  { month: "Apr", scope1: 25, scope2: 21, scope3: 49 },
  { month: "May", scope1: 27, scope2: 23, scope3: 53 },
  { month: "Jun", scope1: 24, scope2: 20, scope3: 48 },
  { month: "Jul", scope1: 22, scope2: 19, scope3: 45 },
  { month: "Aug", scope1: 23, scope2: 20, scope3: 47 },
  { month: "Sep", scope1: 26, scope2: 22, scope3: 54 },
  { month: "Oct", scope1: 28, scope2: 24, scope3: 57 },
  { month: "Nov", scope1: 27, scope2: 23, scope3: 55 },
  { month: "Dec", scope1: 26, scope2: 22, scope3: 52 },
];

export default function DashboardPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Reporting period: Jan 1 – Dec 31, {currentYear}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/app/reports">
            <Button variant="outline" size="sm" className="gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Export report
            </Button>
          </Link>
          <Link href="/app/ghg/scope1">
            <Button size="sm" className="gap-1.5">
              Add activity
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPI_CARDS.map(kpi => (
          <Card key={kpi.title}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{kpi.title}</p>
                  <p className="mt-1.5 text-2xl font-bold text-zinc-900 dark:text-white">{kpi.value}</p>
                  <div className="mt-1 flex items-center gap-1">
                    {kpi.direction === "down" ? (
                      <ArrowDownRight className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${kpi.direction === "down" ? "text-emerald-600" : "text-red-600"}`}>
                      {kpi.change}
                    </span>
                    <span className="text-xs text-zinc-400">{kpi.period}</span>
                  </div>
                </div>
                <div className={`rounded-lg p-2.5 ${kpi.iconBg}`}>
                  <kpi.icon className={`h-4 w-4 ${kpi.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Monthly Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly GHG Emissions {currentYear}</CardTitle>
            <CardDescription>Scope 1, 2 & 3 — tCO₂e per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1 h-44">
              {MONTHLY_EMISSIONS.map(m => {
                const total = m.scope1 + m.scope2 + m.scope3;
                const max = 160;
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col gap-px" style={{ height: `${(total / max) * 160}px` }}>
                      <div className="w-full rounded-t bg-blue-500" style={{ flex: m.scope3 }} />
                      <div className="w-full bg-amber-400" style={{ flex: m.scope2 }} />
                      <div className="w-full rounded-b bg-red-400" style={{ flex: m.scope1 }} />
                    </div>
                    <span className="text-[10px] text-zinc-400">{m.month}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-4">
              {[
                { color: "bg-red-400", label: "Scope 1" },
                { color: "bg-amber-400", label: "Scope 2" },
                { color: "bg-blue-500", label: "Scope 3" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className={`h-2.5 w-2.5 rounded-sm ${l.color}`} />
                  <span className="text-xs text-zinc-500">{l.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scope breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Scope Breakdown</CardTitle>
            <CardDescription>Total: 1,247 tCO₂e</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {SCOPE_BREAKDOWN.map(scope => {
              const pct = Math.round((scope.value / scope.total) * 100);
              return (
                <Link key={scope.label} href={scope.href} className="block group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <scope.icon className="h-3.5 w-3.5 text-zinc-400" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 transition-colors">{scope.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">{scope.value} t</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={pct} className="flex-1 h-1.5" />
                    <span className="text-xs text-zinc-400 w-8 text-right">{pct}%</span>
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Pending Actions + CBAM Status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-zinc-400" />
              Pending Actions
            </CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {PENDING_ACTIONS.map(action => (
              <Link key={action.title} href={action.href} className="block">
                <div className="flex items-start gap-3 rounded-lg border border-zinc-100 dark:border-zinc-800 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                    action.urgency === "high" ? "bg-red-500" :
                    action.urgency === "medium" ? "bg-amber-500" : "bg-blue-500"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">{action.title}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{action.desc}</p>
                  </div>
                  <Badge variant={action.urgency === "high" ? "destructive" : action.urgency === "medium" ? "warning" : "info"} className="shrink-0 text-xs">
                    {action.urgency}
                  </Badge>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* CBAM snapshot */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-zinc-400" />
              CBAM Status
            </CardTitle>
            <CardDescription>Annual declaration progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Goods declared", value: "12", sub: "4 using default values" },
                { label: "Suppliers verified", value: "8 / 15", sub: "53% completion" },
                { label: "Embedded emissions", value: "1,300 tCO₂e", sub: "preliminary figure" },
                { label: "Est. CBAM cost", value: "€84,500", sub: `@€${EUA_PRICE_EUR_PER_TONNE}/t EUA` },
              ].map(stat => (
                <div key={stat.label} className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-3">
                  <p className="text-xs text-zinc-500">{stat.label}</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-white mt-0.5">{stat.value}</p>
                  <p className="text-xs text-zinc-400">{stat.sub}</p>
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Declaration completeness</span>
                <span>53%</span>
              </div>
              <Progress value={53} />
            </div>
            <Link href="/app/cbam/declarations">
              <Button variant="outline" size="sm" className="w-full gap-1.5 mt-2">
                <FileText className="h-3.5 w-3.5" />
                Open CBAM declaration
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
