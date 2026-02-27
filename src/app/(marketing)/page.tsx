import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe, BarChart3, FileText, Calculator, TrendingDown, AlertTriangle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PLANS, CBAM_DEADLINES, EUA_PRICE_EUR_PER_TONNE } from "@/lib/constants";

const STATS = [
  { value: "50,000+", label: "EU companies now required to report under CSRD/CBAM" },
  { value: "€100/t", label: "CBAM fine per excess tonne from January 2026" },
  { value: "22%", label: "Annual growth rate of carbon software market" },
  { value: "€79/mo", label: "Starting price — 90% cheaper than consultants" },
];

const FEATURES = [
  {
    icon: FileText,
    title: "CBAM Declaration Engine",
    description: "Generate EU-compliant CBAM declarations with embedded emissions calculations, supplier data management, and XML export for the official CBAM Registry.",
    badge: "Most popular",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950",
  },
  {
    icon: BarChart3,
    title: "GHG Scope 1, 2 & 3",
    description: "Full GHG Protocol-aligned calculation across all scopes. Built-in emission factors from DEFRA, EPA, EEA and IPCC. Zero external API costs to start.",
    badge: null,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    icon: ShieldCheck,
    title: "IFRS S1 & S2 Reporting",
    description: "Structured disclosure wizards for ISSB standards. Governance, strategy, risk management, scenario analysis and metrics — investor-ready PDF output.",
    badge: null,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950",
  },
  {
    icon: Building2,
    title: "Supplier Portal",
    description: "Automatically send CBAM questionnaires to your suppliers. Track responses, compare actual vs default values, reduce your CBAM cost exposure.",
    badge: null,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950",
  },
  {
    icon: TrendingDown,
    title: "Decarbonization Roadmap",
    description: "AI-powered action plans with ROI estimates for each reduction initiative. Track progress against science-based targets.",
    badge: "Coming soon",
    color: "text-teal-600",
    bg: "bg-teal-50 dark:bg-teal-950",
  },
  {
    icon: Globe,
    title: "EU ETS Dashboard",
    description: "Live EUA price tracking, CBAM certificate cost simulation, and portfolio management. Connect your compliance to the carbon market.",
    badge: "Phase 2",
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-950",
  },
];

const SOCIAL_PROOF = [
  { name: "Steel importer, Bucharest", quote: "We estimated our CBAM exposure at €180,000 for 2026. CarbonIQ helped us cut it by 40% by getting actual supplier data instead of defaults." },
  { name: "Logistics company, Cluj", quote: "Our bank asked for an ESG report before refinancing. We had Scope 1, 2 & 3 plus IFRS S2 ready in two weeks." },
  { name: "Manufacturing SME, Timișoara", quote: "We replaced a €12,000/year consultant with CarbonIQ at €199/month. Same quality reports, 10x faster." },
];

export default function HomePage() {
  const nextDeadline = CBAM_DEADLINES.find(d => new Date(d.date) > new Date());

  return (
    <div className="flex flex-col">
      {/* CBAM Urgency Banner */}
      {nextDeadline && (
        <div className="bg-amber-50 border-b border-amber-200 dark:bg-amber-950/50 dark:border-amber-800">
          <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8 flex items-center justify-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span className="text-amber-800 dark:text-amber-200 font-medium">
              CBAM deadline: <strong>{nextDeadline.label}</strong>
            </span>
            <Link href="/cbam-calculator" className="text-amber-600 underline font-semibold ml-2 hover:text-amber-700">
              Calculate your exposure →
            </Link>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative overflow-hidden py-20 sm:py-28 hero-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 text-xs" variant="outline">
              CBAM Definitive Phase: January 2026 · €100/tonne fine
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
              Carbon accounting built{" "}
              <span className="gradient-text">for EU compliance</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              CBAM declarations, GHG Scope 1–2–3 reporting, and IFRS S1/S2 disclosures —
              in one platform, at a fraction of consultant cost. Built for Romanian and EU businesses.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="xl" className="w-full sm:w-auto gap-2">
                  Start 14-day free trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/cbam-calculator">
                <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2">
                  <Calculator className="h-4 w-4" />
                  Free CBAM cost calculator
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              No credit card required · 14-day free trial · Cancel anytime
            </p>
          </div>

          {/* Dashboard preview placeholder */}
          <div className="mt-16 mx-auto max-w-5xl rounded-2xl border border-zinc-200 bg-white/80 shadow-2xl backdrop-blur overflow-hidden dark:border-zinc-700 dark:bg-zinc-900/80">
            <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-700 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-zinc-500">CarbonIQ — Dashboard</span>
            </div>
            <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Total GHG Emissions", value: "1,247 tCO₂e", change: "-12% vs last year", color: "text-emerald-600" },
                { label: "CBAM Exposure 2026", value: "€84,500", change: "Based on current EUA price", color: "text-amber-600" },
                { label: "Data Completeness", value: "87%", change: "3 activities pending", color: "text-blue-600" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-zinc-100 dark:border-zinc-800 p-4">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                  <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="mt-1 text-xs text-zinc-400">{stat.change}</p>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <div className="h-32 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 flex items-center justify-center">
                <div className="flex gap-2 items-end h-20 px-4">
                  {[40, 65, 45, 80, 55, 90, 70, 58, 75, 85, 60, 72].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-emerald-500 opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="text-3xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Everything in one platform</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              From CBAM to net zero — covered
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              All the compliance tools your EU business needs, without the €50K consultant bill.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="relative overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {feature.badge && (
                    <Badge
                      className="absolute top-4 right-4 text-xs"
                      variant={feature.badge === "Most popular" ? "default" : "secondary"}
                    >
                      {feature.badge}
                    </Badge>
                  )}
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${feature.bg} mb-4`}>
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CBAM FOCUS SECTION */}
      <section className="bg-zinc-950 py-20 sm:py-28 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <Badge className="mb-4 bg-emerald-900 text-emerald-300 border-emerald-700">CBAM — Urgent</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Every tonne you don&apos;t calculate costs you €100
              </h2>
              <p className="mt-4 text-lg text-zinc-400">
                Since January 2026, importing steel, aluminium, cement, fertilisers, or hydrogen
                into the EU carries mandatory financial obligations. The CBAM certificate fine is
                €100 per excess tonne — plus 3× the market price.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Automatic embedded emissions calculation per HS code",
                  "Supplier portal for collecting actual production data",
                  "EU-Registry compatible XML declaration export",
                  "Default vs actual value comparison to reduce exposure",
                  `Live EUA price feed — currently ~€${EUA_PRICE_EUR_PER_TONNE}/t`,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-4">
                <Link href="/cbam-calculator">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Calculate your exposure
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="lg">Get compliant now</Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Key CBAM deadlines</h3>
              {CBAM_DEADLINES.map((deadline) => (
                <div
                  key={deadline.date}
                  className={`flex items-start gap-4 rounded-xl border p-4 ${
                    deadline.severity === "critical"
                      ? "border-red-800 bg-red-950/50"
                      : "border-zinc-700 bg-zinc-900"
                  }`}
                >
                  <div className={`h-2 w-2 mt-1.5 rounded-full shrink-0 ${deadline.severity === "critical" ? "bg-red-400" : "bg-amber-400"}`} />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {new Date(deadline.date).toLocaleDateString("en-EU", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <p className="text-sm text-zinc-400">{deadline.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Transparent pricing</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              90% cheaper than a consultant
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              No hidden fees. Cancel anytime. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {Object.values(PLANS).map((plan) => (
              <Card
                key={plan.id}
                className={`relative flex flex-col ${
                  "popular" in plan && plan.popular
                    ? "ring-2 ring-emerald-500 shadow-lg"
                    : ""
                }`}
              >
                {"popular" in plan && plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="text-xs">Most popular</Badge>
                  </div>
                )}
                <CardContent className="flex flex-col flex-1 p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    {plan.price > 0 ? (
                      <>
                        <span className="text-3xl font-bold text-zinc-900 dark:text-white">€{plan.price}</span>
                        <span className="text-sm text-zinc-500">/month</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-zinc-900 dark:text-white">Custom</span>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{plan.description}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link href={plan.id === "enterprise" ? "/contact" : "/auth/signup"}>
                      <Button
                        className="w-full"
                        variant={"popular" in plan && plan.popular ? "default" : "outline"}
                      >
                        {plan.id === "enterprise" ? "Contact sales" : "Start free trial"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-zinc-500">
            All prices exclude VAT. Annual plans available at 20% discount.{" "}
            <Link href="/pricing" className="text-emerald-600 hover:underline">See full feature comparison →</Link>
          </p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-white mb-10">
            Trusted by EU businesses navigating carbon compliance
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {SOCIAL_PROOF.map((proof) => (
              <Card key={proof.name} className="bg-white dark:bg-zinc-900">
                <CardContent className="p-6">
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                    &ldquo;{proof.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-xs font-semibold text-zinc-900 dark:text-white">{proof.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DATA SOURCES */}
      <section className="py-12 border-y border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-zinc-400 mb-6 uppercase tracking-wider">
            Emission factors sourced from trusted open databases
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              "UK DEFRA GHG Factors", "US EPA GHG Hub", "EU EEA Database",
              "IPCC EFDB", "IEA Emissions", "GHG Protocol", "Climate TRACE",
            ].map((source) => (
              <span key={source} className="text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-colors">
                {source}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center px-4">
          <Zap className="mx-auto h-10 w-10 text-emerald-600 mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Start your free trial today
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            No credit card. No consultant needed. Full CBAM, GHG and IFRS reporting in minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="xl" className="gap-2">
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/cbam-calculator">
              <Button size="xl" variant="outline" className="gap-2">
                <Calculator className="h-4 w-4" />
                Try the CBAM calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
