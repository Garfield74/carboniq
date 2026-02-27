import type { Metadata } from "next";
export const metadata: Metadata = { title: "User Management" };
export default function UsersSettingsPage() {
  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">User Management</h1>
      <p className="text-sm text-zinc-500">Invite team members, manage roles and permissions.</p>
    </div>
  );
}
