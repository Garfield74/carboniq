-- ============================================================
-- CARBONIQ — Initial Database Schema
-- Run: supabase db push (or apply via Supabase dashboard)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE subscription_plan AS ENUM ('starter', 'growth', 'professional', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing', 'incomplete');
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'editor', 'viewer');
CREATE TYPE declaration_status AS ENUM ('draft', 'submitted', 'verified', 'rejected');
CREATE TYPE questionnaire_status AS ENUM ('pending', 'sent', 'completed', 'expired');
CREATE TYPE report_status AS ENUM ('draft', 'in_review', 'approved', 'published');
CREATE TYPE data_source AS ENUM ('EPA', 'DEFRA', 'EEA', 'IPCC', 'IEA', 'climatiq', 'custom');

-- ============================================================
-- ORGANIZATIONS
-- ============================================================
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  vat_number TEXT,
  country CHAR(2) NOT NULL DEFAULT 'RO',
  industry_sector TEXT,
  employee_count INTEGER,
  fiscal_year_start INTEGER NOT NULL DEFAULT 1,
  base_year INTEGER NOT NULL DEFAULT 2023,
  subscription_plan subscription_plan NOT NULL DEFAULT 'starter',
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- USER PROFILES
-- ============================================================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'editor',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_profiles_org_id ON user_profiles(org_id);

-- ============================================================
-- EMISSION FACTORS (seeded, read-only for users)
-- ============================================================
CREATE TABLE emission_factors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  region TEXT NOT NULL DEFAULT 'GLOBAL',
  unit TEXT NOT NULL,
  co2e_per_unit NUMERIC(12,6) NOT NULL,
  source data_source NOT NULL,
  year INTEGER NOT NULL,
  uncertainty_percent NUMERIC(5,2),
  ghg_protocol_aligned BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_ef_category_region ON emission_factors(category, region);

-- ============================================================
-- EMISSION ACTIVITIES
-- ============================================================
CREATE TABLE emission_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  scope INTEGER NOT NULL CHECK (scope IN (1, 2, 3)),
  category TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  quantity NUMERIC(16,4) NOT NULL,
  unit TEXT NOT NULL,
  emission_factor_id UUID REFERENCES emission_factors(id),
  emission_factor_value NUMERIC(12,6) NOT NULL,
  co2e_kg NUMERIC(16,4) NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  data_source data_source NOT NULL DEFAULT 'DEFRA',
  notes TEXT,
  created_by UUID NOT NULL REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_activities_org_scope ON emission_activities(org_id, scope);
CREATE INDEX idx_activities_period ON emission_activities(org_id, period_start, period_end);

-- ============================================================
-- CBAM DECLARATIONS
-- ============================================================
CREATE TABLE cbam_declarations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  period_year INTEGER NOT NULL,
  period_quarter INTEGER CHECK (period_quarter BETWEEN 1 AND 4),
  declaration_type TEXT NOT NULL CHECK (declaration_type IN ('quarterly', 'annual')),
  status declaration_status NOT NULL DEFAULT 'draft',
  submitted_at TIMESTAMPTZ,
  xml_payload TEXT,
  total_embedded_emissions_tco2e NUMERIC(16,4) NOT NULL DEFAULT 0,
  total_cbam_cost_eur NUMERIC(16,2) NOT NULL DEFAULT 0,
  eua_price_eur NUMERIC(10,2) NOT NULL DEFAULT 65.00,
  created_by UUID NOT NULL REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id, period_year, period_quarter, declaration_type)
);

CREATE INDEX idx_cbam_decl_org ON cbam_declarations(org_id, period_year);

-- ============================================================
-- SUPPLIERS
-- ============================================================
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  country CHAR(2) NOT NULL,
  contact_email TEXT,
  contact_name TEXT,
  cbam_verified BOOLEAN NOT NULL DEFAULT FALSE,
  installation_id TEXT,
  last_data_request_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_suppliers_org ON suppliers(org_id);

-- ============================================================
-- CBAM GOODS
-- ============================================================
CREATE TABLE cbam_goods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  declaration_id UUID NOT NULL REFERENCES cbam_declarations(id) ON DELETE CASCADE,
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  hs_code TEXT NOT NULL,
  good_description TEXT NOT NULL,
  quantity_tonnes NUMERIC(16,4) NOT NULL,
  country_of_origin CHAR(2) NOT NULL,
  supplier_id UUID REFERENCES suppliers(id),
  embedded_emissions_tco2e NUMERIC(16,4) NOT NULL,
  default_value_used BOOLEAN NOT NULL DEFAULT TRUE,
  emission_factor_source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cbam_goods_declaration ON cbam_goods(declaration_id);

-- ============================================================
-- SUPPLIER QUESTIONNAIRES
-- ============================================================
CREATE TABLE supplier_questionnaires (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  status questionnaire_status NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '60 days'),
  data_json JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- GHG REPORTS
-- ============================================================
CREATE TABLE ghg_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  scope1_tco2e NUMERIC(16,4) NOT NULL DEFAULT 0,
  scope2_market_tco2e NUMERIC(16,4) NOT NULL DEFAULT 0,
  scope2_location_tco2e NUMERIC(16,4) NOT NULL DEFAULT 0,
  scope3_tco2e NUMERIC(16,4) NOT NULL DEFAULT 0,
  total_tco2e NUMERIC(16,4) NOT NULL DEFAULT 0,
  intensity_metric TEXT,
  intensity_value NUMERIC(16,4),
  status report_status NOT NULL DEFAULT 'draft',
  verified_by TEXT,
  report_pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id, year)
);

-- ============================================================
-- IFRS DISCLOSURES
-- ============================================================
CREATE TABLE ifrs_disclosures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  period_year INTEGER NOT NULL,
  framework TEXT NOT NULL CHECK (framework IN ('S1', 'S2', 'both')),
  governance_json JSONB,
  strategy_json JSONB,
  risk_management_json JSONB,
  metrics_targets_json JSONB,
  scenario_analysis_json JSONB,
  status report_status NOT NULL DEFAULT 'draft',
  report_pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id, period_year, framework)
);

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  plan subscription_plan NOT NULL,
  price_eur_month NUMERIC(10,2) NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  status subscription_status NOT NULL DEFAULT 'trialing',
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '14 days'),
  trial_end TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_org ON subscriptions(org_id);

-- ============================================================
-- AUDIT LOG
-- ============================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_org_entity ON audit_logs(org_id, entity_type, entity_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE emission_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE cbam_declarations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cbam_goods ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE ghg_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE ifrs_disclosures ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Emission factors: read-only for authenticated users
ALTER TABLE emission_factors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "emission_factors_read" ON emission_factors FOR SELECT TO authenticated USING (TRUE);

-- Helper function: get user's org_id
CREATE OR REPLACE FUNCTION get_user_org_id()
RETURNS UUID AS $$
  SELECT org_id FROM user_profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Organizations: users can only see their own org
CREATE POLICY "org_select" ON organizations FOR SELECT TO authenticated
  USING (id = get_user_org_id());
CREATE POLICY "org_update" ON organizations FOR UPDATE TO authenticated
  USING (id = get_user_org_id());

-- User profiles: users can see members of their org
CREATE POLICY "profiles_select" ON user_profiles FOR SELECT TO authenticated
  USING (org_id = get_user_org_id());
CREATE POLICY "profiles_insert" ON user_profiles FOR INSERT TO authenticated
  WITH CHECK (org_id = get_user_org_id());
CREATE POLICY "profiles_update" ON user_profiles FOR UPDATE TO authenticated
  USING (org_id = get_user_org_id());

-- Emission activities: scoped to org
CREATE POLICY "activities_all" ON emission_activities FOR ALL TO authenticated
  USING (org_id = get_user_org_id()) WITH CHECK (org_id = get_user_org_id());

-- CBAM declarations: scoped to org
CREATE POLICY "cbam_decl_all" ON cbam_declarations FOR ALL TO authenticated
  USING (org_id = get_user_org_id()) WITH CHECK (org_id = get_user_org_id());

-- CBAM goods: scoped to org
CREATE POLICY "cbam_goods_all" ON cbam_goods FOR ALL TO authenticated
  USING (org_id = get_user_org_id()) WITH CHECK (org_id = get_user_org_id());

-- Suppliers: scoped to org
CREATE POLICY "suppliers_all" ON suppliers FOR ALL TO authenticated
  USING (org_id = get_user_org_id()) WITH CHECK (org_id = get_user_org_id());

-- Questionnaires: scoped to org
CREATE POLICY "questionnaires_all" ON supplier_questionnaires FOR ALL TO authenticated
  USING (org_id = get_user_org_id()) WITH CHECK (org_id = get_user_org_id());

-- Allow public token access for supplier questionnaire portal
CREATE POLICY "questionnaires_public_token" ON supplier_questionnaires FOR SELECT TO anon
  USING (expires_at > NOW());

-- GHG reports: scoped to org
CREATE POLICY "ghg_reports_all" ON ghg_reports FOR ALL TO authenticated
  USING (org_id = get_user_org_id()) WITH CHECK (org_id = get_user_org_id());

-- IFRS disclosures: scoped to org
CREATE POLICY "ifrs_all" ON ifrs_disclosures FOR ALL TO authenticated
  USING (org_id = get_user_org_id()) WITH CHECK (org_id = get_user_org_id());

-- Subscriptions: scoped to org
CREATE POLICY "subscriptions_select" ON subscriptions FOR SELECT TO authenticated
  USING (org_id = get_user_org_id());

-- Audit log: scoped to org, insert only
CREATE POLICY "audit_select" ON audit_logs FOR SELECT TO authenticated
  USING (org_id = get_user_org_id());
CREATE POLICY "audit_insert" ON audit_logs FOR INSERT TO authenticated
  WITH CHECK (org_id = get_user_org_id());

-- ============================================================
-- TRIGGERS: updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_emission_activities_updated_at BEFORE UPDATE ON emission_activities FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_cbam_declarations_updated_at BEFORE UPDATE ON cbam_declarations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_suppliers_updated_at BEFORE UPDATE ON suppliers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_ghg_reports_updated_at BEFORE UPDATE ON ghg_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_ifrs_disclosures_updated_at BEFORE UPDATE ON ifrs_disclosures FOR EACH ROW EXECUTE FUNCTION update_updated_at();
