import type { Metadata } from "next";
import { Download, FileText, BarChart3, Shield, FileSpreadsheet, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Reports" };

const AVAILABLE_REPORTS = [
  {
    id: "ghg-inventory",
    title: "GHG Inventory Report",
    description: "Full GHG Protocol-aligned inventory with Scope 1, 2 & 3 breakdown, emission factors, and data quality notes.",
    icon: BarChart3,
    iconBg: "bg-emerald-50 dark:bg-emerald-950",
    iconColor: "text-emerald-600",
    formats: ["PDF", "Excel"],
    status: "ready",
    lastGenerated: "2026-02-25",
  },
  {
    id: "cbam-declaration",
    title: "CBAM Declaration Package",
    description: "EU Registry-compatible XML declaration plus supporting documentation for customs submission.",
    icon: FileText,
    iconBg: "bg-amber-50 dark:bg-amber-950",
    iconColor: "text-amber-600",
    formats: ["XML", "PDF"],
    status: "partial",
    lastGenerated: null,
  },
  {
    id: "ifrs-s2",
    title: "IFRS S2 Disclosure Report",
    description: "Climate-related financial disclosure in ISSB IFRS S2 format. Governance, Strategy, Risk Management, and Metrics.",
    icon: Shield,
    iconBg: "bg-purple-50 dark:bg-purple-950",
    iconColor: "text-purple-600",
    formats: ["PDF", "Word"],
    status: "draft",
    lastGenerated: null,
  },
  {
    id: "executive-summary",
    title: "Executive Summary",
    description: "One-page summary of carbon position, CBAM exposure, target progress, and key risks for board reporting.",
    icon: FileSpreadsheet,
    iconBg: "bg-blue-50 dark:bg-blue-950",
    iconColor: "text-blue-600",
    formats: ["PDF"],
    status: "ready",
    lastGenerated: "2026-02-20",
  },
];

const REPORT_HISTORY = [
  { name: "GHG Inventory 2025 — FINAL.pdf", size: "2.4 MB", date: "2026-02-25", type: "GHG" },
  { name: "Executive Summary Q4 2025.pdf", size: "0.8 MB", date: "2026-02-20", type: "Summary" },
  { name: "CBAM Declaration Draft 2025.xml", size: "124 KB", date: "2026-02-15", type: "CBAM" },
];

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Reports & Exports</h1>
        <p className="text-sm text-zinc-500 mt-1">Generate and download compliance reports, declarations, and disclosures.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {AVAILABLE_REPORTS.map(report => (
          <Card key={report.id} className="flex flex-col">
            <CardContent className="flex flex-col flex-1 p-5">
              <div className="flex items-start gap-3">
                <div className={`rounded-lg p-2.5 ${report.iconBg} shrink-0`}>
                  <report.icon className={`h-5 w-5 ${report.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{report.title}</h3>
                    <Badge
                      variant={report.status === "ready" ? "default" : report.status === "partial" ? "warning" : "secondary"}
                      className="text-xs"
                    >
                      {report.status === "ready" ? "Ready" : report.status === "partial" ? "Partial data" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{report.description}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1">
                  {report.formats.map(f => (
                    <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                  ))}
                </div>
                {report.lastGenerated && (
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(report.lastGenerated).toLocaleDateString("en-EU")}
                  </span>
                )}
              </div>

              <div className="mt-3 flex gap-2">
                <Button
                  variant={report.status === "ready" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 gap-1.5"
                  disabled={report.status === "draft"}
                >
                  <Download className="h-3.5 w-3.5" />
                  {report.status === "ready" ? "Download" : report.status === "partial" ? "Generate draft" : "Complete data first"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle>Report History</CardTitle>
          <CardDescription>Previously generated reports available for re-download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {REPORT_HISTORY.map(r => (
              <div key={r.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-zinc-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">{r.name}</p>
                    <p className="text-xs text-zinc-400">{r.size} · {new Date(r.date).toLocaleDateString("en-EU")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{r.type}</Badge>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    <Download className="h-3.5 w-3.5" /> Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
