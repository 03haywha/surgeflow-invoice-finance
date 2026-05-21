import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DSO = "this_week" | "30_days" | "1_3_months" | "90_plus" | "exploring";
export type CustomerType = "b2b" | "b2c" | "both";
export type CompanyType = "limited" | "llp" | "sole_trader";
export type Concentration = "low" | "medium" | "high" | "very_high";
export type Urgency = "immediately" | "2_weeks" | "4_weeks" | "8_weeks" | "exploring";
export type Homeowner = "homeowner" | "tenant" | "other";

export interface CompanyHouseResult {
  name: string;
  number: string;
  status: "active" | "dissolved" | "liquidation" | "administration" | "converted-closed";
  address: string;
  incorporationDate?: string;
  directorSurnames?: string[];
}

export interface Director {
  name: string;
  role: string;
  appointmentDate: string;
  dobMonthYear?: string;
}

export interface FunnelState {
  // Step tracking
  isModalOpen: boolean;
  currentStep: number;
  totalSteps: number;

  // Step 1: Days Sales Outstanding (carried from landing)
  dso: DSO | null;

  // Step 2: Annual turnover
  annualTurnover: number | null;

  // Step 3: Customer type
  customerType: CustomerType | null;

  // Step 4: Outstanding invoices
  outstandingInvoices: number | null;

  // Step 5: Average invoice size
  averageInvoiceSize: "under_500" | "500_2k" | "2k_10k" | "10k_plus" | null;

  // Step 6: Customer concentration
  customerConcentration: Concentration | null;

  // Step 7: Company type
  companyType: CompanyType | null;

  // Step 8: Companies House selection
  selectedCompany: CompanyHouseResult | null;

  // Step 9: Director selection
  selectedDirector: Director | null;
  manualName: { firstName?: string; lastName?: string; dob?: string } | null;

  // Step 10: Adverse credit declared
  adverseCredit: boolean | null;

  // Step 11: Urgency
  urgency: Urgency | null;

  // Lead capture (after eligibility interstitial)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homePostcode: string;
  privacyAccepted: boolean;

  // Tracking
  startedAt: string | null;
  utmSource: string | null;

  // Actions
  openModal: () => void;
  closeModal: () => void;
  next: () => void;
  back: () => void;
  goToStep: (step: number) => void;
  setField: <K extends keyof FunnelState>(key: K, value: FunnelState[K]) => void;
  reset: () => void;
  restartFunnel: (initialDso?: DSO | null) => void;
}

const initialState = {
  isModalOpen: false,
  currentStep: 1,
  totalSteps: 12,
  dso: null,
  annualTurnover: null,
  customerType: null,
  outstandingInvoices: null,
  averageInvoiceSize: null,
  customerConcentration: null,
  companyType: null,
  selectedCompany: null,
  selectedDirector: null,
  manualName: null,
  adverseCredit: null,
  urgency: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  homePostcode: "",
  privacyAccepted: false,
  startedAt: null,
  utmSource: null,
};

export const useFunnelStore = create<FunnelState>()(
  persist(
    (set, get) => ({
      ...initialState,
      openModal: () => set({ isModalOpen: true, startedAt: get().startedAt || new Date().toISOString() }),
      closeModal: () => set({ isModalOpen: false }),
      next: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, s.totalSteps) })),
      back: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
      goToStep: (step) => set({ currentStep: step }),
      setField: (key, value) => set({ [key]: value } as Partial<FunnelState>),
      reset: () => set(initialState),
      // Full reset + open modal at step 1 — use this from any landing CTA so each
      // attempt starts fresh (without this, persisted state restores the last
      // currentStep, jumping returning users to the eligibility quote).
      restartFunnel: (initialDso) =>
        set({
          ...initialState,
          dso: initialDso ?? null,
          isModalOpen: true,
          startedAt: new Date().toISOString(),
        }),
    }),
    { name: "surgeflow-invoice-funnel" }
  )
);
