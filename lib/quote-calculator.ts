/**
 * Invoice Finance Quote Calculator
 *
 * Calculates the indicative monthly cost + advance amount based on user inputs.
 *
 * Invoice finance pricing (UK market, 2026):
 * - Advance rate: 80-90% of invoice value upfront
 * - Service fee: 0.5%-3% of invoice value per month (depending on size + risk)
 * - Discount fee: equivalent to ~1.5-4% APR on advance
 *
 * For simplicity in the demo, we use a single "effective rate" between 1.5%-3%/month
 * applied to the advance amount.
 */

export interface InvoiceFinanceInputs {
  outstandingInvoices: number; // £
  averageInvoiceSize: number;
  annualTurnover: number;
  customerConcentration: "low" | "medium" | "high" | "very_high"; // <10%, 10-30%, 30-50%, >50%
  adverseCredit: boolean;
  dso: "this_week" | "30_days" | "1_3_months" | "90_plus" | "exploring";
}

export interface InvoiceFinanceQuote {
  advanceAmount: number; // Cash unlocked (£)
  advanceRate: number; // Percentage e.g. 0.85
  monthlyFeeRate: number; // Percentage e.g. 0.02 = 2%/month
  monthlyFeeAmount: number; // £
  annualisedRate: number; // For comparison (effective APR equivalent)
  approvalTime: string; // Display string
  recommendedProduct:
    | "selective_invoice_discounting"
    | "whole_book_factoring"
    | "confidential_invoice_discounting"
    | "spot_factoring";
  lenders: string[];
}

export function calculateQuote(inputs: InvoiceFinanceInputs): InvoiceFinanceQuote {
  // Advance rate logic
  let advanceRate = 0.85; // Default 85%
  if (inputs.customerConcentration === "very_high") advanceRate = 0.7; // Higher risk
  else if (inputs.customerConcentration === "high") advanceRate = 0.75;
  else if (inputs.customerConcentration === "low") advanceRate = 0.9; // Best case

  // Monthly fee rate logic
  let monthlyFeeRate = 0.02; // Default 2%/month
  if (inputs.annualTurnover >= 1_000_000) monthlyFeeRate = 0.015; // Better rate for larger
  if (inputs.annualTurnover >= 5_000_000) monthlyFeeRate = 0.0125;
  if (inputs.adverseCredit) monthlyFeeRate += 0.005; // Risk premium

  // Cap fee at 3% for invoice finance market
  monthlyFeeRate = Math.min(monthlyFeeRate, 0.03);

  // Calculate amounts
  const advanceAmount = Math.round(inputs.outstandingInvoices * advanceRate);
  const monthlyFeeAmount = Math.round(inputs.outstandingInvoices * monthlyFeeRate);

  // Annualised rate (rough — assumes invoices turn ~12 times/year)
  const annualisedRate = monthlyFeeRate * 12;

  // Recommended product logic
  let recommendedProduct: InvoiceFinanceQuote["recommendedProduct"];
  if (inputs.annualTurnover < 250_000) {
    recommendedProduct = "selective_invoice_discounting";
  } else if (inputs.customerConcentration === "very_high") {
    recommendedProduct = "spot_factoring";
  } else if (inputs.annualTurnover >= 1_000_000 && inputs.customerConcentration !== "high") {
    recommendedProduct = "confidential_invoice_discounting";
  } else {
    recommendedProduct = "whole_book_factoring";
  }

  // Lender routing
  const lenders: string[] = [];
  if (inputs.annualTurnover >= 1_000_000) {
    lenders.push("MarketFinance", "Aldermore", "Bibby Financial Services");
  } else if (inputs.annualTurnover >= 250_000) {
    lenders.push("Bibby Financial Services", "Skipton Business Finance", "Optimum Finance");
  } else {
    lenders.push("iwoca", "Sonovate", "Optimum Finance");
  }

  // Approval time
  const approvalTime =
    inputs.dso === "this_week" || inputs.dso === "30_days" ? "24 hours" : "48 hours";

  return {
    advanceAmount,
    advanceRate,
    monthlyFeeRate,
    monthlyFeeAmount,
    annualisedRate,
    approvalTime,
    recommendedProduct,
    lenders,
  };
}

export const productLabels: Record<InvoiceFinanceQuote["recommendedProduct"], string> = {
  selective_invoice_discounting: "Selective Invoice Discounting",
  whole_book_factoring: "Whole Book Factoring",
  confidential_invoice_discounting: "Confidential Invoice Discounting",
  spot_factoring: "Spot Factoring",
};

export const productDescriptions: Record<InvoiceFinanceQuote["recommendedProduct"], string> = {
  selective_invoice_discounting: "Pick which invoices to finance. No long-term commitment.",
  whole_book_factoring: "Finance your entire sales ledger. Lender manages credit control.",
  confidential_invoice_discounting: "Finance invoices without customers knowing. Higher fees, more discretion.",
  spot_factoring: "Finance individual large invoices one at a time. No facility commitment.",
};
