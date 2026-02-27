import type { Metadata } from "next";
export const metadata: Metadata = { title: "Onboarding" };
export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Welcome to CarbonIQ 🎉</h1>
        <p className="text-zinc-500">Let's set up your carbon accounting workspace in a few quick steps.</p>
      </div>
    </div>
  );
}
