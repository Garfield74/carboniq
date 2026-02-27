// ============================================================
// CARBONIQ — Database Type Definitions
// These mirror the Supabase PostgreSQL schema
// ============================================================

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type SubscriptionPlan = "starter" | "growth" | "professional" | "enterprise";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing" | "incomplete";
export type UserRole = "owner" | "admin" | "editor" | "viewer";
export type GhgScope = 1 | 2 | 3;
export type DeclarationStatus = "draft" | "submitted" | "verified" | "rejected";
export type SupplierQuestionnaireStatus = "pending" | "sent" | "completed" | "expired";
export type ReportStatus = "draft" | "in_review" | "approved" | "published";
export type DataSource = "EPA" | "DEFRA" | "EEA" | "IPCC" | "IEA" | "climatiq" | "custom";

export interface Organization {
  id: string;
  name: string;
  vat_number: string | null;
  country: string;
  industry_sector: string | null;
  employee_count: number | null;
  fiscal_year_start: number; // month 1-12
  base_year: number;
  subscription_plan: SubscriptionPlan;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  org_id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
}

export interface EmissionActivity {
  id: string;
  org_id: string;
  scope: GhgScope;
  category: string;
  activity_type: string;
  quantity: number;
  unit: string;
  emission_factor_id: string | null;
  emission_factor_value: number;
  co2e_kg: number;
  period_start: string;
  period_end: string;
  data_source: DataSource;
  notes: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EmissionFactor {
  id: string;
  name: string;
  category: string;
  region: string;
  unit: string;
  co2e_per_unit: number;
  source: DataSource;
  year: number;
  uncertainty_percent: number | null;
  ghg_protocol_aligned: boolean;
}

export interface CbamDeclaration {
  id: string;
  org_id: string;
  period_year: number;
  period_quarter: number | null; // null for annual
  declaration_type: "quarterly" | "annual";
  status: DeclarationStatus;
  submitted_at: string | null;
  xml_payload: string | null;
  total_embedded_emissions_tco2e: number;
  total_cbam_cost_eur: number;
  eua_price_eur: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CbamGood {
  id: string;
  declaration_id: string;
  org_id: string;
  hs_code: string;
  good_description: string;
  quantity_tonnes: number;
  country_of_origin: string;
  supplier_id: string | null;
  embedded_emissions_tco2e: number;
  default_value_used: boolean;
  emission_factor_source: string | null;
  created_at: string;
}

export interface Supplier {
  id: string;
  org_id: string;
  name: string;
  country: string;
  contact_email: string | null;
  contact_name: string | null;
  cbam_verified: boolean;
  installation_id: string | null; // EU installation registry ID
  last_data_request_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupplierQuestionnaire {
  id: string;
  supplier_id: string;
  org_id: string;
  token: string;
  status: SupplierQuestionnaireStatus;
  sent_at: string | null;
  completed_at: string | null;
  expires_at: string;
  data_json: Json | null;
  created_at: string;
}

export interface GhgReport {
  id: string;
  org_id: string;
  year: number;
  scope1_tco2e: number;
  scope2_market_tco2e: number;
  scope2_location_tco2e: number;
  scope3_tco2e: number;
  total_tco2e: number;
  intensity_metric: string | null;
  intensity_value: number | null;
  status: ReportStatus;
  verified_by: string | null;
  report_pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface IfrsDisclosure {
  id: string;
  org_id: string;
  period_year: number;
  framework: "S1" | "S2" | "both";
  governance_json: Json | null;
  strategy_json: Json | null;
  risk_management_json: Json | null;
  metrics_targets_json: Json | null;
  scenario_analysis_json: Json | null;
  status: ReportStatus;
  report_pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  org_id: string;
  plan: SubscriptionPlan;
  price_eur_month: number;
  stripe_subscription_id: string | null;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  trial_end: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  org_id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_values: Json | null;
  new_values: Json | null;
  created_at: string;
}

// ============================================================
// Supabase Database shape (for type-safe client)
// ============================================================
export interface Database {
  public: {
    Tables: {
      organizations: { Row: Organization; Insert: Omit<Organization, "id" | "created_at" | "updated_at">; Update: Partial<Organization> };
      user_profiles: { Row: UserProfile; Insert: Omit<UserProfile, "created_at">; Update: Partial<UserProfile> };
      emission_activities: { Row: EmissionActivity; Insert: Omit<EmissionActivity, "id" | "created_at" | "updated_at">; Update: Partial<EmissionActivity> };
      emission_factors: { Row: EmissionFactor; Insert: Omit<EmissionFactor, "id">; Update: Partial<EmissionFactor> };
      cbam_declarations: { Row: CbamDeclaration; Insert: Omit<CbamDeclaration, "id" | "created_at" | "updated_at">; Update: Partial<CbamDeclaration> };
      cbam_goods: { Row: CbamGood; Insert: Omit<CbamGood, "id" | "created_at">; Update: Partial<CbamGood> };
      suppliers: { Row: Supplier; Insert: Omit<Supplier, "id" | "created_at" | "updated_at">; Update: Partial<Supplier> };
      supplier_questionnaires: { Row: SupplierQuestionnaire; Insert: Omit<SupplierQuestionnaire, "id" | "created_at">; Update: Partial<SupplierQuestionnaire> };
      ghg_reports: { Row: GhgReport; Insert: Omit<GhgReport, "id" | "created_at" | "updated_at">; Update: Partial<GhgReport> };
      ifrs_disclosures: { Row: IfrsDisclosure; Insert: Omit<IfrsDisclosure, "id" | "created_at" | "updated_at">; Update: Partial<IfrsDisclosure> };
      subscriptions: { Row: Subscription; Insert: Omit<Subscription, "id" | "created_at">; Update: Partial<Subscription> };
      audit_logs: { Row: AuditLog; Insert: Omit<AuditLog, "id" | "created_at">; Update: never };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      subscription_plan: SubscriptionPlan;
      user_role: UserRole;
      declaration_status: DeclarationStatus;
      report_status: ReportStatus;
      data_source: DataSource;
    };
  };
}
