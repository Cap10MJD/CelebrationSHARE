import { loadStripe } from '@stripe/stripe-js';

// Stripe publishable key must be set in environment variables
const STRIPE_PUBLISHABLE_KEY = (import.meta as { env?: { VITE_STRIPE_PUBLISHABLE_KEY?: string } }).env?.VITE_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error('VITE_STRIPE_PUBLISHABLE_KEY environment variable is required');
}

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// Stripe configuration
export const stripeConfig = {
  publishableKey: STRIPE_PUBLISHABLE_KEY,
  currency: 'usd',
  locale: 'en',
};

// Payment method types
export const paymentMethods = {
  card: 'card',
  sepa_debit: 'sepa_debit',
  ideal: 'ideal',
  sofort: 'sofort',
  bancontact: 'bancontact',
  giropay: 'giropay',
  eps: 'eps',
  p24: 'p24',
};

// Common payment amounts (in cents)
export const paymentAmounts = {
  rental_deposit: 5000, // $50.00
  rental_fee: 2500,     // $25.00
  service_fee: 500,     // $5.00
  insurance_fee: 1000,  // $10.00
};

// Updated Commission structure with tiered pricing
export const commissionConfig = {
  // Tiered platform commission rates
  tiers: {
    newUser: 0.22,      // 22% for new users (0-9 completed rentals)
    experiencedUser: 0.18, // 18% for users with 10+ completed rentals
    threshold: 10,      // Number of rentals needed for lower rate
  },
  // Default commission rate (for backward compatibility)
  defaultCommission: 0.22, // Default to new user rate
  minCommission: 200, // $2.00 minimum commission
  maxCommission: 5000, // $50.00 maximum commission
};
// This is a test comment for Cursor to GitHub
// Fee transparency configuration
export const feeTransparencyConfig = {
  traditionalRentalMarkup: 0.40, // 40% markup for traditional rental companies
  savingsMessage: "You save up to 40% compared to traditional rental companies",
  feeBreakdown: {
    insurance: "Comprehensive damage protection",
    support: "24/7 customer support and dispute resolution",
    security: "Secure payment processing and fraud protection",
    platform: "Platform maintenance and safety features"
  }
}; 