"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INDUSTRY_SECTORS, EU_COUNTRIES } from "@/lib/constants";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    companyName: "",
    country: "RO",
    industrySector: "",
    vatNumber: "",
  });

  function update(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }

    setLoading(true);
    setError("");
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.fullName,
            company_name: form.companyName,
            country: form.country,
            industry_sector: form.industrySector,
          },
        },
      });
      if (signUpError) throw signUpError;
      if (data.user) {
        router.push("/app/onboarding");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            CarbonIQ
          </Link>
          <p className="mt-2 text-sm text-zinc-500">14-day free trial · No credit card</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                s < step ? "bg-emerald-600 text-white" :
                s === step ? "bg-emerald-600 text-white" :
                "bg-zinc-200 text-zinc-500 dark:bg-zinc-700"
              }`}>
                {s < step ? <CheckCircle2 className="h-4 w-4" /> : s}
              </div>
              {s < 2 && <div className={`h-px w-10 ${s < step ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700"}`} />}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle>{step === 1 ? "Create your account" : "Company details"}</CardTitle>
            <CardDescription>
              {step === 1 ? "Set up your personal login" : "Tell us about your business"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      placeholder="Ion Popescu"
                      value={form.fullName}
                      onChange={e => update("fullName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Work email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ion@company.ro"
                      value={form.email}
                      onChange={e => update("email", e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 8 characters"
                        value={form.password}
                        onChange={e => update("password", e.target.value)}
                        required
                        minLength={8}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="companyName">Company name</Label>
                    <Input
                      id="companyName"
                      placeholder="Acme SRL"
                      value={form.companyName}
                      onChange={e => update("companyName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="vatNumber">VAT / CIF number</Label>
                    <Input
                      id="vatNumber"
                      placeholder="RO12345678"
                      value={form.vatNumber}
                      onChange={e => update("vatNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Country</Label>
                    <Select value={form.country} onValueChange={v => update("country", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {EU_COUNTRIES.map(c => (
                          <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Industry sector</Label>
                    <Select value={form.industrySector} onValueChange={v => update("industrySector", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector..." />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRY_SECTORS.map(s => (
                          <SelectItem key={s.code} value={s.code}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {error && (
                <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex gap-2">
                {step === 2 && (
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                )}
                <Button type="submit" className={step === 1 ? "w-full" : "flex-1"} disabled={loading}>
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Creating account...</> :
                    step === 1 ? "Continue →" : "Create account"}
                </Button>
              </div>
            </form>

            <div className="mt-4 text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-emerald-600 font-medium hover:underline">Sign in</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
