import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
  typescript: true,
});

export const STRIPE_PLANS = {
  starter: {
    priceId: process.env.STRIPE_PRICE_STARTER_MONTHLY!,
    name: "Starter",
    amount: 7900, // cents
  },
  growth: {
    priceId: process.env.STRIPE_PRICE_GROWTH_MONTHLY!,
    name: "Growth",
    amount: 19900,
  },
  professional: {
    priceId: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY!,
    name: "Professional",
    amount: 44900,
  },
} as const;
