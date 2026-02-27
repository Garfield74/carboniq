import type { Metadata } from "next";
export const metadata: Metadata = { title: "Company Settings" };
export default function CompanySettingsPage() {
  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Company Settings</h1>
      <p className="text-sm text-zinc-500">Manage your organisation profile, fiscal year, and base year settings.</p>
    </div>
  );
}
