// ============================================================
// CARBONIQ — Constants & Emission Factor Data
// Sources: UK DEFRA, US EPA, EU EEA, IPCC, GHG Protocol
// ============================================================

export const APP_NAME = "CarbonIQ";
export const APP_TAGLINE = "Carbon Accounting & CBAM Compliance for EU Businesses";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://carboniq.io";
export const SUPPORT_EMAIL = "support@carboniq.io";

// ============================================================
// SUBSCRIPTION PLANS
// ============================================================
export const PLANS = {
  starter: {
    id: "starter",
    name: "Starter",
    price: 79,
    currency: "EUR",
    description: "For micro-businesses getting started with carbon reporting",
    features: [
      "1 user",
      "GHG Scope 1 & 2 reporting",
      "Up to 5 CBAM goods",
      "PDF report export",
      "Email support",
    ],
    limits: { users: 1, cbamGoods: 5, scope3Categories: 0 },
    stripePriceId: process.env.STRIPE_PRICE_STARTER_MONTHLY ?? "",
  },
  growth: {
    id: "growth",
    name: "Growth",
    price: 199,
    currency: "EUR",
    description: "For SMEs ready for full CBAM & GHG compliance",
    popular: true,
    features: [
      "Up to 5 users",
      "Full GHG Scope 1, 2 & 3 (10 categories)",
      "Full CBAM module — unlimited goods",
      "Supplier data requests",
      "IFRS S2 basic reporting",
      "Excel/CSV import",
      "Priority email support",
    ],
    limits: { users: 5, cbamGoods: -1, scope3Categories: 10 },
    stripePriceId: process.env.STRIPE_PRICE_GROWTH_MONTHLY ?? "",
  },
  professional: {
    id: "professional",
    name: "Professional",
    price: 449,
    currency: "EUR",
    description: "For mid-market companies needing full compliance coverage",
    features: [
      "Up to 15 users",
      "Full GHG Scope 1, 2 & 3 (all 15 categories)",
      "Full CBAM module + supplier portal",
      "Full IFRS S1 + S2 reporting",
      "API access",
      "White-label PDF reports",
      "Audit trail & version control",
      "Chat support",
    ],
    limits: { users: 15, cbamGoods: -1, scope3Categories: 15 },
    stripePriceId: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY ?? "",
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    price: 0,
    currency: "EUR",
    description: "For large organizations with complex reporting needs",
    features: [
      "Unlimited users",
      "All modules",
      "ERP integrations (SAP, Oracle, Sage)",
      "Dedicated account manager",
      "SLA guarantee",
      "EU ETS dashboard",
      "Custom onboarding",
      "Third-party verification workflow",
    ],
    limits: { users: -1, cbamGoods: -1, scope3Categories: 15 },
    stripePriceId: "",
  },
} as const;

// ============================================================
// GHG SCOPES
// ============================================================
export const GHG_SCOPES = {
  1: {
    label: "Scope 1",
    description: "Direct emissions from owned/controlled sources",
    color: "#ef4444",
    categories: [
      "Stationary Combustion",
      "Mobile Combustion",
      "Fugitive Emissions",
      "Process Emissions",
    ],
  },
  2: {
    label: "Scope 2",
    description: "Indirect emissions from purchased energy",
    color: "#f59e0b",
    categories: ["Purchased Electricity", "Purchased Heat/Steam", "Purchased Cooling"],
  },
  3: {
    label: "Scope 3",
    description: "All other indirect value chain emissions",
    color: "#3b82f6",
    categories: [
      "Cat 1: Purchased goods & services",
      "Cat 2: Capital goods",
      "Cat 3: Fuel & energy-related",
      "Cat 4: Upstream transportation",
      "Cat 5: Waste in operations",
      "Cat 6: Business travel",
      "Cat 7: Employee commuting",
      "Cat 8: Upstream leased assets",
      "Cat 9: Downstream transportation",
      "Cat 10: Processing of sold products",
      "Cat 11: Use of sold products",
      "Cat 12: End-of-life treatment",
      "Cat 13: Downstream leased assets",
      "Cat 14: Franchises",
      "Cat 15: Investments",
    ],
  },
};

// ============================================================
// EMISSION FACTORS (kg CO₂e per unit)
// Source: UK DEFRA GHG Conversion Factors 2023/2024
// ============================================================
export const EMISSION_FACTORS = {
  // --- Stationary Combustion (per litre or per kWh) ---
  fuels: {
    natural_gas_kwh: { factor: 0.18254, unit: "kWh", label: "Natural Gas (per kWh)" },
    natural_gas_m3: { factor: 2.01435, unit: "m³", label: "Natural Gas (per m³)" },
    diesel_l: { factor: 2.54, unit: "litre", label: "Diesel (per litre)" },
    lpg_l: { factor: 1.554, unit: "litre", label: "LPG (per litre)" },
    lpg_kg: { factor: 2.935, unit: "kg", label: "LPG (per kg)" },
    coal_kg: { factor: 2.419, unit: "kg", label: "Coal (per kg)" },
    wood_pellets_kg: { factor: 0.039, unit: "kg", label: "Wood pellets (per kg)" },
    fuel_oil_l: { factor: 2.754, unit: "litre", label: "Fuel oil (per litre)" },
    kerosene_l: { factor: 2.537, unit: "litre", label: "Kerosene (per litre)" },
  },

  // --- Mobile Combustion (per litre or per km) ---
  vehicles: {
    petrol_l: { factor: 2.18, unit: "litre", label: "Petrol car (per litre)" },
    diesel_l: { factor: 2.67, unit: "litre", label: "Diesel car (per litre)" },
    petrol_car_km: { factor: 0.17, unit: "km", label: "Average petrol car (per km)" },
    diesel_car_km: { factor: 0.15, unit: "km", label: "Average diesel car (per km)" },
    electric_car_km: { factor: 0.05, unit: "km", label: "Electric car (EU mix, per km)" },
    van_diesel_km: { factor: 0.24, unit: "km", label: "Diesel van (per km)" },
    hgv_km: { factor: 0.93, unit: "km", label: "HGV / truck (per km)" },
    domestic_flight_km: { factor: 0.255, unit: "km", label: "Domestic flight (per km/passenger)" },
    short_haul_flight_km: { factor: 0.156, unit: "km", label: "Short-haul flight (per km/passenger)" },
    long_haul_flight_km: { factor: 0.151, unit: "km", label: "Long-haul flight (per km/passenger)" },
  },

  // --- Electricity Grid Factors (kg CO₂e per kWh) ---
  // Source: EEA / IEA / DEFRA 2023
  electricity: {
    RO: { factor: 0.294, label: "Romania" },
    DE: { factor: 0.385, label: "Germany" },
    FR: { factor: 0.056, label: "France" },
    PL: { factor: 0.773, label: "Poland" },
    HU: { factor: 0.247, label: "Hungary" },
    CZ: { factor: 0.449, label: "Czech Republic" },
    BG: { factor: 0.439, label: "Bulgaria" },
    IT: { factor: 0.233, label: "Italy" },
    ES: { factor: 0.168, label: "Spain" },
    NL: { factor: 0.27, label: "Netherlands" },
    BE: { factor: 0.17, label: "Belgium" },
    AT: { factor: 0.125, label: "Austria" },
    SE: { factor: 0.013, label: "Sweden" },
    DK: { factor: 0.132, label: "Denmark" },
    FI: { factor: 0.089, label: "Finland" },
    NO: { factor: 0.013, label: "Norway" },
    UK: { factor: 0.21, label: "United Kingdom" },
    US: { factor: 0.386, label: "United States" },
    CN: { factor: 0.581, label: "China" },
    IN: { factor: 0.708, label: "India" },
    EU_AVG: { factor: 0.276, label: "EU Average" },
  },

  // --- Refrigerants (kg CO₂e per kg) ---
  refrigerants: {
    R410A: { factor: 2088, unit: "kg", label: "R-410A" },
    R22: { factor: 1810, unit: "kg", label: "R-22" },
    R134a: { factor: 1430, unit: "kg", label: "R-134a" },
    R404A: { factor: 3922, unit: "kg", label: "R-404A" },
    R32: { factor: 675, unit: "kg", label: "R-32" },
    CO2_refrigerant: { factor: 1, unit: "kg", label: "CO₂ refrigerant" },
  },

  // --- Waste (kg CO₂e per tonne) ---
  waste: {
    landfill_mixed: { factor: 467, unit: "tonne", label: "Mixed waste to landfill" },
    incineration: { factor: 21, unit: "tonne", label: "Waste incineration" },
    composting: { factor: 14, unit: "tonne", label: "Organic waste composting" },
    recycling_paper: { factor: -559, unit: "tonne", label: "Paper/card recycled" },
    recycling_plastic: { factor: -117, unit: "tonne", label: "Plastic recycled" },
    recycling_metal: { factor: -1660, unit: "tonne", label: "Metal recycled" },
    recycling_glass: { factor: -312, unit: "tonne", label: "Glass recycled" },
    wastewater: { factor: 0.708, unit: "m³", label: "Wastewater treatment" },
  },

  // --- Hotels (kg CO₂e per night) ---
  hotels: {
    EU_avg: { factor: 23.4, unit: "night", label: "Hotel (EU average, per night)" },
    luxury: { factor: 35.0, unit: "night", label: "Hotel (luxury, per night)" },
    budget: { factor: 12.5, unit: "night", label: "Hotel (budget, per night)" },
  },
} as const;

// ============================================================
// CBAM — Covered Goods & HS Codes
// ============================================================
export const CBAM_SECTORS = [
  {
    sector: "Cement",
    goods: [
      { hsCode: "2507", description: "Kaolin and other kaolinic clays" },
      { hsCode: "2523", description: "Portland cement, aluminous cement, slag cement" },
    ],
    defaultValueTCO2ePerTonne: 0.0895,
  },
  {
    sector: "Iron & Steel",
    goods: [
      { hsCode: "7201", description: "Pig iron and spiegeleisen" },
      { hsCode: "7202", description: "Ferro-alloys" },
      { hsCode: "7203", description: "Ferrous products by direct reduction of iron" },
      { hsCode: "7206", description: "Iron and non-alloy steel in ingots" },
      { hsCode: "7207", description: "Semi-finished products of iron" },
      { hsCode: "7208", description: "Flat-rolled products of iron (hot-rolled)" },
      { hsCode: "7209", description: "Flat-rolled products of iron (cold-rolled)" },
      { hsCode: "7210", description: "Flat-rolled products of iron (coated)" },
      { hsCode: "7213", description: "Bars and rods of iron (hot-rolled)" },
      { hsCode: "7214", description: "Bars and rods of iron (other)" },
      { hsCode: "7216", description: "Angles, shapes and sections of iron" },
      { hsCode: "7217", description: "Wire of iron or steel" },
    ],
    defaultValueTCO2ePerTonne: 1.8457,
  },
  {
    sector: "Aluminium",
    goods: [
      { hsCode: "7601", description: "Unwrought aluminium" },
      { hsCode: "7603", description: "Aluminium powders and flakes" },
      { hsCode: "7604", description: "Aluminium bars, rods and profiles" },
      { hsCode: "7605", description: "Aluminium wire" },
      { hsCode: "7606", description: "Aluminium plates, sheets and strip" },
      { hsCode: "7607", description: "Aluminium foil" },
      { hsCode: "7608", description: "Aluminium tubes and pipes" },
    ],
    defaultValueTCO2ePerTonne: 6.7104,
  },
  {
    sector: "Fertilisers",
    goods: [
      { hsCode: "2808", description: "Nitric acid" },
      { hsCode: "3102", description: "Mineral/chemical fertilisers, nitrogenous" },
      { hsCode: "3105", description: "Mineral/chemical fertilisers — mixed" },
    ],
    defaultValueTCO2ePerTonne: 2.6285,
  },
  {
    sector: "Electricity",
    goods: [
      { hsCode: "2716", description: "Electrical energy" },
    ],
    defaultValueTCO2ePerMWh: 0.4932,
  },
  {
    sector: "Hydrogen",
    goods: [
      { hsCode: "2804.10", description: "Hydrogen" },
    ],
    defaultValueTCO2ePerTonne: 5.8,
  },
];

// ============================================================
// CBAM DEADLINES
// ============================================================
export const CBAM_DEADLINES = [
  {
    date: "2026-01-01",
    label: "CBAM Definitive Phase starts — financial obligations begin",
    severity: "critical",
  },
  {
    date: "2026-03-31",
    label: "Deadline for Authorised Declarant Status applications",
    severity: "high",
  },
  {
    date: "2027-05-31",
    label: "First annual verified emissions report due",
    severity: "high",
  },
  {
    date: "2027-09-30",
    label: "First CBAM certificate surrender deadline",
    severity: "critical",
  },
];

// ============================================================
// EU ETS PRICE (placeholder — will be live feed in Phase 2)
// ============================================================
export const EUA_PRICE_EUR_PER_TONNE = 65.0; // approximate Feb 2026

// ============================================================
// COUNTRIES
// ============================================================
export const EU_COUNTRIES = [
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "EE", name: "Estonia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "GR", name: "Greece" },
  { code: "HU", name: "Hungary" },
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "LV", name: "Latvia" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MT", name: "Malta" },
  { code: "NL", name: "Netherlands" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
];

export const ALL_COUNTRIES = [
  ...EU_COUNTRIES,
  { code: "GB", name: "United Kingdom" },
  { code: "NO", name: "Norway" },
  { code: "CH", name: "Switzerland" },
  { code: "TR", name: "Turkey" },
  { code: "UA", name: "Ukraine" },
  { code: "CN", name: "China" },
  { code: "IN", name: "India" },
  { code: "US", name: "United States" },
  { code: "BR", name: "Brazil" },
  { code: "KR", name: "South Korea" },
  { code: "JP", name: "Japan" },
  { code: "RU", name: "Russia" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "ZA", name: "South Africa" },
  { code: "EG", name: "Egypt" },
  { code: "NG", name: "Nigeria" },
  { code: "MA", name: "Morocco" },
  { code: "MX", name: "Mexico" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
];

// ============================================================
// INDUSTRY SECTORS (NACE-based)
// ============================================================
export const INDUSTRY_SECTORS = [
  { code: "A", label: "Agriculture, Forestry & Fishing" },
  { code: "B", label: "Mining & Quarrying" },
  { code: "C", label: "Manufacturing" },
  { code: "D", label: "Electricity, Gas, Steam & Air Conditioning Supply" },
  { code: "E", label: "Water Supply, Sewerage & Waste Management" },
  { code: "F", label: "Construction" },
  { code: "G", label: "Wholesale & Retail Trade" },
  { code: "H", label: "Transportation & Storage" },
  { code: "I", label: "Accommodation & Food Service" },
  { code: "J", label: "Information & Communication" },
  { code: "K", label: "Financial & Insurance Activities" },
  { code: "L", label: "Real Estate Activities" },
  { code: "M", label: "Professional, Scientific & Technical Activities" },
  { code: "N", label: "Administrative & Support Service Activities" },
  { code: "P", label: "Education" },
  { code: "Q", label: "Human Health & Social Work Activities" },
  { code: "R", label: "Arts, Entertainment & Recreation" },
  { code: "S", label: "Other Service Activities" },
];

// ============================================================
// NAVIGATION
// ============================================================
export const APP_NAV = [
  {
    label: "Dashboard",
    href: "/app/dashboard",
    icon: "LayoutDashboard",
  },
  {
    label: "GHG Emissions",
    icon: "Wind",
    children: [
      { label: "Scope 1 — Direct", href: "/app/ghg/scope1", icon: "Flame" },
      { label: "Scope 2 — Energy", href: "/app/ghg/scope2", icon: "Zap" },
      { label: "Scope 3 — Value Chain", href: "/app/ghg/scope3", icon: "Globe" },
    ],
  },
  {
    label: "CBAM",
    icon: "FileText",
    children: [
      { label: "Declarations", href: "/app/cbam/declarations", icon: "ClipboardList" },
      { label: "Goods & HS Codes", href: "/app/cbam/goods", icon: "Package" },
      { label: "Suppliers", href: "/app/cbam/suppliers", icon: "Building2" },
      { label: "Cost Simulator", href: "/app/cbam/simulator", icon: "Calculator" },
    ],
  },
  {
    label: "IFRS S1 & S2",
    icon: "BookOpen",
    children: [
      { label: "IFRS S1 — General", href: "/app/ifrs/s1", icon: "Shield" },
      { label: "IFRS S2 — Climate", href: "/app/ifrs/s2", icon: "Thermometer" },
    ],
  },
  {
    label: "Reports",
    href: "/app/reports",
    icon: "Download",
  },
  {
    label: "Settings",
    icon: "Settings",
    children: [
      { label: "Company", href: "/app/settings/company", icon: "Building" },
      { label: "Users", href: "/app/settings/users", icon: "Users" },
      { label: "Billing", href: "/app/settings/billing", icon: "CreditCard" },
    ],
  },
];
