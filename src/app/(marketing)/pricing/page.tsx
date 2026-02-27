import Link from "next/link";
import { CheckCircle2, X, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for carbon accounting. CBAM, GHG & IFRS S1/S2 compliance from €79/month. 14-day free trial.",
};

const FEATURE_COMPARISON = [
  {
    category: "GHG Reporting",
    features: [
      { name: "Scope 1 calculation", starter: true, growth: true, professional: true, enterprise: true },
      { name: "Scope 2 (market & location-based)", starter: true, growth: true, professional: true, enterprise: true },
      { name: "Scope 3 (10 categories)", starter: false, growth: true, professional: true, enterprise: true },
      { name: "Scope 3 (all 15 categories)", starter: false, growth: false, professional: true, enterprise: true },
      { name: "GHG inventory PDF report", starter: true, growth: true, professional: true, enterprise: true },
      { name: "Excel/CSV data import", starter: false, growth: true, professional: true, enterprise: true },
    ],
  },
  {
    category: "CBAM Module",
    features: [
      { name: "CBAM goods (limit)", starter: "5 goods", growth: "Unlimited", professional: "Unlimited", enterprise: "Unlimited" },
      { name: "Embedded emissions calculation", starter: true, growth: true, professional: true, enterprise: true },
      { name: "Supplier data requests", starter: false, growth: true, professional: true, enterprise: true },
      { name: "Supplier portal", starter: false, growth: true, professional: true, enterprise: true },
      { name: "XML declaration export", starter: false, growth: true, professional: true, enterprise: true },
      { name: "CBAM cost simulator", starter: true, growth: true, professional: true, enterprise: true },
    ],
  },
  {
    category: "IFRS S1/S2",
    features: [
      { name: "IFRS S2 basic reporting", starter: false, growth: true, professional: true, enterprise: true },
      { name: "Full IFRS S1 + S2 disclosure", starter: false, growth: false, professional: true, enterprise: true },
      { name: "Scenario analysis (1.5°C/2°C/4°C)", starter: false, growth: false, professional: true, enterprise: true },
      { name: "Investor-ready PDF export", starter: false, growth: false, professional: true, enterprise: true },
    ],
  },
  {
    category: "Platform",
    features: [
      { name: "Users", starter: "1 user", growth: "5 users", professional: "15 users", enterprise: "Unlimited" },
      { name: "Audit trail", starter: false, growth: false, professional: true, enterprise: true },
      { name: "API access", starter: false, growth: false, professional: true, enterprise: true },
      { name: "White-label reports", starter: false, growth: false, professional: true, enterprise: true },
      { name: "ERP integrations (SAP/Oracle)", starter: false, growth: false, professional: false, enterprise: true },
      { name: "EU ETS dashboard", starter: false, growth: false, professional: false, enterprise: "Phase 2" },
    ],
  },
  {
    category: "Support",
    features: [
      { name: "Email support", starter: true, growth: true, professional: true, enterprise: true },
      { name: "Priority support", starter: false, growth: true, professional: true, enterprise: true },
      { name: "Chat support", starter: false, growth: false, professional: true, enterprise: true },
      { name: "Dedicated account manager", starter: false, growth: false, professional: false, enterprise: true },
      { name: "Custom onboarding", starter: false, growth: false, professional: false, enterprise: true },
    ],
  },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />;
  if (value === false) return <X className="h-4 w-4 text-zinc-300 dark:text-zinc-600 mx-auto" />;
  return <span className="text-xs text-zinc-600 dark:text-zinc-400">{value}</span>;
}

export default function PricingPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <Badge variant="outline" className="mb-4">Transparent, no-surprise pricing</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>

        {/* Plan cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {Object.values(PLANS).map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col ${"popular" in plan && plan.popular ? "ring-2 ring-emerald-500 shadow-lg" : ""}`}
            >
              {"popular" in plan && plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="text-xs">Most popular</Badge>
                </div>
              )}
              <CardContent className="flex flex-col flex-1 p-6">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{plan.name}</h3>
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
                {plan.price > 0 && (
                  <p className="text-xs text-zinc-400 mt-1">
                    or €{Math.round(plan.price * 12 * 0.8)}/year (save 20%)
                  </p>
                )}
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{plan.description}</p>
                <div className="mt-4 flex-1">
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Link href={plan.id === "enterprise" ? "/contact" : "/auth/signup"}>
                    <Button
                      className="w-full"
                      size="sm"
                      variant={"popular" in plan && plan.popular ? "default" : "outline"}
                    >
                      {plan.id === "enterprise" ? "Contact sales" : "Start free trial"}
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          All prices exclude VAT · Billed monthly · Cancel anytime · GDPR compliant · EU data residency
        </p>

        {/* Feature comparison table */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white text-center mb-10">
            Full feature comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                  <th className="text-left py-4 px-6 font-medium text-zinc-500 w-48">Feature</th>
                  {Object.values(PLANS).map(plan => (
                    <th key={plan.id} className="py-4 px-4 text-center font-semibold text-zinc-900 dark:text-white">
                      {plan.name}
                      {plan.price > 0 ? (
                        <div className="text-xs font-normal text-zinc-400">€{plan.price}/mo</div>
                      ) : (
                        <div className="text-xs font-normal text-zinc-400">Custom</div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_COMPARISON.map((cat) => (
                  <>
                    <tr key={cat.category} className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                      <td colSpan={5} className="py-3 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.features.map((feature) => (
                      <tr key={feature.name} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                        <td className="py-3 px-6 text-zinc-700 dark:text-zinc-300">{feature.name}</td>
                        <td className="py-3 px-4 text-center"><FeatureValue value={feature.starter} /></td>
                        <td className="py-3 px-4 text-center"><FeatureValue value={feature.growth} /></td>
                        <td className="py-3 px-4 text-center"><FeatureValue value={feature.professional} /></td>
                        <td className="py-3 px-4 text-center"><FeatureValue value={feature.enterprise} /></td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Do I need a credit card to start the free trial?",
                a: "No. You get full Growth plan features for 14 days with no credit card required. We'll prompt you to add payment details before the trial ends.",
              },
              {
                q: "Can I change plans at any time?",
                a: "Yes, you can upgrade or downgrade at any time. Upgrades are prorated immediately. Downgrades take effect at the next billing cycle.",
              },
              {
                q: "Is my data GDPR compliant?",
                a: "Absolutely. We store all data in EU-region Supabase servers. We never share your data with third parties. A full GDPR Data Processing Agreement is included with all plans.",
              },
              {
                q: "What emission factors do you use?",
                a: "We use trusted open databases: UK DEFRA GHG Conversion Factors, US EPA GHG Hub, EU EEA Database, IPCC EFDB, and IEA Emissions Factors. For paid tiers, we optionally integrate Climatiq API for extended coverage.",
              },
              {
                q: "Can I import data from my accounting software?",
                a: "Growth and higher plans support Excel/CSV import. Phase 2 will include direct integrations with Saga (Romania), WinMentor, QuickBooks, and Xero.",
              },
              {
                q: "Is the CBAM XML export compatible with the EU CBAM Registry?",
                a: "Yes. We generate XML payloads compatible with the official EU CBAM Declarant Portal format as specified in Commission Implementing Regulation (EU) 2023/1773.",
              },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <h3 className="font-semibold text-zinc-900 dark:text-white">{faq.q}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 rounded-2xl bg-zinc-950 px-8 py-12 text-center text-white">
          <h2 className="text-2xl font-bold">Ready to get compliant?</h2>
          <p className="mt-3 text-zinc-400">Start your free 14-day trial. No credit card needed.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                Talk to sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
