import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PLANS } from "@/lib/constants";

export const metadata: Metadata = { title: "Billing" };

export default function BillingPage() {
  const currentPlan = PLANS.growth;

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Billing & Subscription</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your plan, payment method, and invoices.</p>
      </div>

      {/* Current plan */}
      <Card className="border-emerald-200 dark:border-emerald-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-600" />
                Current Plan: {currentPlan.name}
              </CardTitle>
              <CardDescription>Your subscription renews on March 27, 2026</CardDescription>
            </div>
            <Badge className="text-sm">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold text-zinc-900 dark:text-white">€{currentPlan.price}</span>
            <span className="text-zinc-500">/month</span>
            <span className="text-xs text-zinc-400 ml-2">+ VAT</span>
          </div>
          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 mb-4">
            {currentPlan.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />{f}
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Change plan</Button>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Cancel subscription</Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment method */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4 text-zinc-400" /> Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-md border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 bg-white dark:bg-zinc-900">
                <span className="text-xs font-bold text-zinc-900 dark:text-white">VISA</span>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">•••• •••• •••• 4242</p>
                <p className="text-xs text-zinc-500">Expires 08/2028</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {[
              { date: "Feb 27, 2026", amount: "€199.00", status: "Paid", id: "INV-2026-002" },
              { date: "Jan 27, 2026", amount: "€199.00", status: "Paid", id: "INV-2026-001" },
              { date: "Dec 27, 2025", amount: "€0.00", status: "Trial", id: "INV-2025-012" },
            ].map(inv => (
              <div key={inv.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">{inv.id}</p>
                  <p className="text-xs text-zinc-500">{inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white">{inv.amount}</span>
                  <Badge variant={inv.status === "Paid" ? "default" : "secondary"} className="text-xs">{inv.status}</Badge>
                  <Button variant="ghost" size="sm" className="text-xs h-7">Download PDF</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Upgrade banner */}
      <Card className="bg-zinc-950 text-white border-zinc-800">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">Upgrade to Professional</p>
              <p className="text-sm text-zinc-400 mt-1">
                Unlock all 15 Scope 3 categories, full IFRS S1+S2, API access, and white-label reports.
              </p>
              <ul className="mt-2 space-y-1">
                {["Full IFRS S1 + S2 disclosure", "All 15 Scope 3 categories", "API access", "15 users"].map(f => (
                  <li key={f} className="text-xs text-zinc-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />{f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-2xl font-bold">€449<span className="text-sm font-normal text-zinc-400">/mo</span></p>
              <Button size="sm" className="mt-2 gap-1.5">
                Upgrade <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
