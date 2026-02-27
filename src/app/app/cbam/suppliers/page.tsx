import type { Metadata } from "next";
import { Building2, Plus, Mail, CheckCircle2, Clock, AlertTriangle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const metadata: Metadata = { title: "CBAM Suppliers" };

const SUPPLIERS = [
  { id: "1", name: "Baosteel Group", country: "CN", contact: "cbam@baosteel.com", verified: true, questStatus: "completed", lastRequest: "2026-01-15", goods: ["7208","7209"], embEmissions: 636.7 },
  { id: "2", name: "OYAK Steel (Turkey)", country: "TR", contact: "sustainability@oyak.com.tr", verified: true, questStatus: "completed", lastRequest: "2026-01-20", goods: ["7601"], embEmissions: 570.4 },
  { id: "3", name: "Ukrcement LLC", country: "UA", contact: null, verified: false, questStatus: "sent", lastRequest: "2026-02-01", goods: ["2523"], embEmissions: 16.1 },
  { id: "4", name: "ArcelorMittal Ukraine", country: "UA", contact: "csrd@arcelormittal.ua", verified: false, questStatus: "pending", lastRequest: null, goods: ["7214"], embEmissions: 0 },
  { id: "5", name: "NLMK Group", country: "RU", contact: null, verified: false, questStatus: "pending", lastRequest: null, goods: ["7207"], embEmissions: 0 },
];

const QUEST_STATUS = {
  completed: { label: "Data received", icon: CheckCircle2, color: "text-emerald-600", badge: "default" as const },
  sent: { label: "Awaiting response", icon: Clock, color: "text-amber-600", badge: "warning" as const },
  pending: { label: "Not contacted", icon: AlertTriangle, color: "text-zinc-400", badge: "secondary" as const },
  expired: { label: "Expired", icon: AlertTriangle, color: "text-red-600", badge: "destructive" as const },
};

export default function SuppliersPage() {
  const complete = SUPPLIERS.filter(s => s.questStatus === "completed").length;
  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="rounded-lg bg-orange-50 dark:bg-orange-950 p-1.5">
              <Building2 className="h-4 w-4 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Supplier Management</h1>
          </div>
          <p className="text-sm text-zinc-500">Collect actual embedded emission data from your suppliers to reduce CBAM exposure vs. using default values.</p>
        </div>
        <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Add supplier</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total suppliers", value: SUPPLIERS.length },
          { label: "Data received", value: `${complete} / ${SUPPLIERS.length}` },
          { label: "Response rate", value: `${Math.round((complete / SUPPLIERS.length) * 100)}%` },
          { label: "Potential saving", value: "~€32,000", sub: "by replacing defaults" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-zinc-500">{s.label}</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-white mt-1">{s.value}</p>
              {s.sub && <p className="text-xs text-emerald-600">{s.sub}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-zinc-500">
          <span>Overall supplier data completion</span>
          <span>{Math.round((complete / SUPPLIERS.length) * 100)}%</span>
        </div>
        <Progress value={(complete / SUPPLIERS.length) * 100} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Suppliers</CardTitle>
              <CardDescription>Send questionnaires, track responses, verify emission data</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Send all pending
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {SUPPLIERS.map(s => {
              const qCfg = QUEST_STATUS[s.questStatus as keyof typeof QUEST_STATUS];
              const QIcon = qCfg.icon;
              return (
                <div key={s.id} className="flex items-center gap-4 rounded-xl border border-zinc-100 dark:border-zinc-800 p-4 flex-wrap">
                  <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-600 dark:text-zinc-400 shrink-0">
                    {s.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{s.name}</p>
                      <Badge variant="outline" className="text-xs">{s.country}</Badge>
                      {s.verified && <Badge className="text-xs">Verified</Badge>}
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {s.contact ?? "No contact email"} · Goods: {s.goods.join(", ")}
                      {s.embEmissions > 0 && ` · ${s.embEmissions} tCO₂e`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={qCfg.badge} className="text-xs gap-1">
                      <QIcon className={`h-3 w-3 ${qCfg.color}`} />
                      {qCfg.label}
                    </Badge>
                    {s.questStatus !== "completed" && (
                      <Button size="sm" variant="outline" className="gap-1.5 h-7 text-xs">
                        <Mail className="h-3 w-3" />
                        {s.questStatus === "pending" ? "Send questionnaire" : "Resend"}
                      </Button>
                    )}
                    {s.questStatus === "completed" && (
                      <Button size="sm" variant="outline" className="gap-1.5 h-7 text-xs">
                        <ExternalLink className="h-3 w-3" /> View data
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
