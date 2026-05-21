"use client";

import { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight, Check, Shield, AlertCircle, Sparkles, Lock } from "lucide-react";
import {
  useFunnelStore,
  type Concentration,
  type CompanyHouseResult,
  type Director,
  type Urgency,
  type CompanyType,
  type CustomerType,
  type DSO,
} from "@/lib/store";
import { calculateQuote, productLabels, productDescriptions } from "@/lib/quote-calculator";
import { formatCurrency, cn } from "@/lib/utils";

// ============================================================================
// MAIN MODAL
// ============================================================================

export function FunnelModal() {
  const { isModalOpen, closeModal, currentStep, totalSteps } = useFunnelStore();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-white animate-fade-in overflow-y-auto">
      {/* MODAL HEADER */}
      <div className="sticky top-0 z-10 bg-white border-b border-neutral-200">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center text-white font-bold text-xs">S</div>
              <div className="text-sm font-semibold">SurgeFlow</div>
            </div>
            <button onClick={closeModal} className="text-neutral-400 hover:text-neutral-900 transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-neutral-500 font-medium">Step {currentStep} of {totalSteps}</div>
            <div className="flex-1 h-1 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-black transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-xs text-neutral-500 font-medium">{progress}%</div>
          </div>
        </div>
      </div>

      {/* MODAL BODY */}
      <div className="max-w-3xl mx-auto px-6 py-8 md:py-12 animate-slide-up">
        <StepRouter />
      </div>

      {/* MODAL FOOTER */}
      <div className="border-t border-neutral-200 bg-neutral-50 mt-12">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3" /> Encrypted · Never sold
          </div>
          <a href="#" className="hover:text-neutral-900">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STEP ROUTER
// ============================================================================

function StepRouter() {
  const { currentStep } = useFunnelStore();

  switch (currentStep) {
    case 1: return <Step1DSO />;
    case 2: return <Step2Turnover />;
    case 3: return <Step3CustomerType />;
    case 4: return <Step4Outstanding />;
    case 5: return <Step5AvgInvoice />;
    case 6: return <Step6Concentration />;
    case 7: return <Step7CompanyType />;
    case 8: return <Step8CompanySearch />;
    case 9: return <Step9DirectorPrefill />;
    case 10: return <Step10AdverseCredit />;
    case 11: return <Step11Urgency />;
    case 12: return <Step12Quote />;
    default: return <Step1DSO />;
  }
}

// ============================================================================
// SHARED UI
// ============================================================================

function StepShell({
  back,
  title,
  subtitle,
  children,
  trustBadge,
}: {
  back?: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  trustBadge?: string;
}) {
  const { back: goBack } = useFunnelStore();

  return (
    <div>
      {back !== false && (
        <button onClick={goBack} className="text-sm text-neutral-500 hover:text-black mb-6 flex items-center gap-1 transition">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}

      {trustBadge && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium mb-6">
          <Shield className="w-3 h-3" /> {trustBadge}
        </div>
      )}

      <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight leading-tight">{title}</h2>
      {subtitle && <p className="text-neutral-600 mb-8 leading-relaxed">{subtitle}</p>}

      {children}
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  popular,
  children,
}: {
  selected?: boolean;
  onClick: () => void;
  popular?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative py-4 px-5 border rounded-xl text-left transition-all hover:border-black hover:bg-neutral-50",
        selected ? "border-black bg-neutral-900 text-white hover:bg-black" : "border-neutral-200"
      )}
    >
      {popular && (
        <div className={cn(
          "absolute -top-2.5 right-3 px-2 py-0.5 text-[10px] rounded-full font-bold uppercase tracking-wider",
          selected ? "bg-white text-black" : "bg-black text-white"
        )}>
          Most common
        </div>
      )}
      {children}
    </button>
  );
}

function PrimaryButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full py-4 rounded-xl font-semibold transition inline-flex items-center justify-center gap-2",
        disabled
          ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
          : "bg-black text-white hover:bg-neutral-800"
      )}
    >
      {children} {!disabled && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}

// ============================================================================
// STEP 1: DSO (confirm from landing)
// ============================================================================

function Step1DSO() {
  const { dso, setField, next } = useFunnelStore();

  const options: { value: DSO; label: string; sublabel: string }[] = [
    { value: "this_week", label: "This week", sublabel: "Fast turnaround" },
    { value: "30_days", label: "Within 30 days", sublabel: "Standard B2B terms" },
    { value: "1_3_months", label: "1—3 months", sublabel: "Long payment terms" },
    { value: "90_plus", label: "90+ days", sublabel: "Late payers" },
    { value: "exploring", label: "Just exploring", sublabel: "I want to see how it works" },
  ];

  return (
    <StepShell
      back={false}
      title="When do your customers usually pay?"
      subtitle="This helps us match you with lenders that price your invoice book correctly."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {options.map((opt) => (
          <OptionButton
            key={opt.value}
            selected={dso === opt.value}
            popular={opt.value === "30_days"}
            onClick={() => { setField("dso", opt.value); setTimeout(next, 250); }}
          >
            <div className="font-semibold">{opt.label}</div>
            <div className="text-xs text-neutral-500 mt-1">{opt.sublabel}</div>
          </OptionButton>
        ))}
      </div>
    </StepShell>
  );
}

// ============================================================================
// STEP 2: Annual Turnover
// ============================================================================

function Step2Turnover() {
  const { annualTurnover, setField, next } = useFunnelStore();
  const [val, setVal] = useState(annualTurnover ?? 0);

  const presets = [50_000, 250_000, 500_000, 1_000_000, 2_500_000, 5_000_000];

  return (
    <StepShell
      title="What's your annual turnover?"
      subtitle="Last 12 months (not forecast). A best guess is fine — we can work with an estimate."
    >
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-3">
        <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Turnover (£)</div>
        <div className="flex items-center gap-2">
          <span className="text-2xl text-neutral-400">£</span>
          <input
            type="text"
            inputMode="numeric"
            value={val ? val.toLocaleString() : ""}
            onChange={(e) => setVal(parseInt(e.target.value.replace(/[^0-9]/g, "") || "0"))}
            placeholder="500,000"
            className="bg-transparent text-3xl font-bold w-full focus:outline-none placeholder:text-neutral-300"
          />
        </div>
      </div>

      <div className="text-xs text-neutral-500 mb-3">Or pick a band:</div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setVal(p)}
            className={cn(
              "py-2.5 text-sm border rounded-lg font-medium transition",
              val === p ? "border-black bg-neutral-900 text-white" : "border-neutral-200 hover:border-black"
            )}
          >
            £{p >= 1_000_000 ? `${p / 1_000_000}m` : `${p / 1000}k`}
          </button>
        ))}
      </div>

      <PrimaryButton
        disabled={val < 10000}
        onClick={() => { setField("annualTurnover", val); next(); }}
      >
        Continue
      </PrimaryButton>
    </StepShell>
  );
}

// ============================================================================
// STEP 3: Customer Type
// ============================================================================

function Step3CustomerType() {
  const { customerType, setField, next, goToStep } = useFunnelStore();

  const handleSelect = (type: CustomerType) => {
    setField("customerType", type);
    // If B2C only, skip outstanding invoices question (different lender pool)
    if (type === "b2c") setTimeout(() => goToStep(5), 250);
    else setTimeout(next, 250);
  };

  return (
    <StepShell
      title="Who pays your invoices?"
      subtitle="Most invoice finance lenders only work with B2B customers. B2C requires a specialist."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <OptionButton selected={customerType === "b2b"} onClick={() => handleSelect("b2b")}>
          <div className="font-semibold">Business to Business</div>
          <div className="text-xs text-neutral-500 mt-1">B2B — most common</div>
        </OptionButton>
        <OptionButton selected={customerType === "b2c"} onClick={() => handleSelect("b2c")}>
          <div className="font-semibold">Business to Consumer</div>
          <div className="text-xs text-neutral-500 mt-1">B2C — specialist lenders</div>
        </OptionButton>
        <OptionButton selected={customerType === "both"} onClick={() => handleSelect("both")}>
          <div className="font-semibold">Both B2B and B2C</div>
          <div className="text-xs text-neutral-500 mt-1">Mix of customers</div>
        </OptionButton>
      </div>
    </StepShell>
  );
}

// ============================================================================
// STEP 4: Outstanding Invoices
// ============================================================================

function Step4Outstanding() {
  const { outstandingInvoices, setField, next } = useFunnelStore();
  const [val, setVal] = useState(outstandingInvoices ?? 0);

  const presets = [25_000, 100_000, 250_000, 500_000, 1_000_000];

  return (
    <StepShell
      title="How much do customers currently owe you?"
      subtitle="Total unpaid invoices on your sales ledger right now. This determines how much cash you can unlock."
    >
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-3">
        <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Outstanding (£)</div>
        <div className="flex items-center gap-2">
          <span className="text-2xl text-neutral-400">£</span>
          <input
            type="text"
            inputMode="numeric"
            value={val ? val.toLocaleString() : ""}
            onChange={(e) => setVal(parseInt(e.target.value.replace(/[^0-9]/g, "") || "0"))}
            placeholder="100,000"
            className="bg-transparent text-3xl font-bold w-full focus:outline-none placeholder:text-neutral-300"
          />
        </div>
      </div>

      <div className="text-xs text-neutral-500 mb-3">Or pick a band:</div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-8">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setVal(p)}
            className={cn(
              "py-2.5 text-sm border rounded-lg font-medium transition",
              val === p ? "border-black bg-neutral-900 text-white" : "border-neutral-200 hover:border-black"
            )}
          >
            £{p >= 1_000_000 ? `${p / 1_000_000}m` : `${p / 1000}k`}
          </button>
        ))}
      </div>

      <PrimaryButton
        disabled={val < 5000}
        onClick={() => { setField("outstandingInvoices", val); next(); }}
      >
        Continue
      </PrimaryButton>
    </StepShell>
  );
}

// ============================================================================
// STEP 5: Average Invoice Size
// ============================================================================

function Step5AvgInvoice() {
  const { averageInvoiceSize, setField, next } = useFunnelStore();

  const options: { value: typeof averageInvoiceSize; label: string; sublabel: string }[] = [
    { value: "under_500", label: "Under £500", sublabel: "Many small invoices" },
    { value: "500_2k", label: "£500 — £2,000", sublabel: "Small to mid" },
    { value: "2k_10k", label: "£2,000 — £10,000", sublabel: "Mid-sized invoices" },
    { value: "10k_plus", label: "£10,000+", sublabel: "Large invoices" },
  ];

  return (
    <StepShell
      title="What's your average invoice size?"
      subtitle="Different lenders specialise in different invoice sizes. This helps us route you to the right ones."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((opt) => (
          <OptionButton
            key={opt.value}
            selected={averageInvoiceSize === opt.value}
            onClick={() => { setField("averageInvoiceSize", opt.value); setTimeout(next, 250); }}
          >
            <div className="font-semibold">{opt.label}</div>
            <div className="text-xs text-neutral-500 mt-1">{opt.sublabel}</div>
          </OptionButton>
        ))}
      </div>
    </StepShell>
  );
}

// ============================================================================
// STEP 6: Customer Concentration
// ============================================================================

function Step6Concentration() {
  const { customerConcentration, setField, next } = useFunnelStore();

  const options: { value: Concentration; label: string; sublabel: string }[] = [
    { value: "low", label: "Less than 10%", sublabel: "Spread across many customers" },
    { value: "medium", label: "10% — 30%", sublabel: "A few key clients" },
    { value: "high", label: "30% — 50%", sublabel: "Heavy on one or two" },
    { value: "very_high", label: "More than 50%", sublabel: "One dominant customer" },
  ];

  return (
    <StepShell
      title="What % of turnover comes from your biggest customer?"
      subtitle="Customer concentration matters for invoice finance. Don't worry — we have lenders for every concentration level. This just routes you to the right one."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((opt) => (
          <OptionButton
            key={opt.value}
            selected={customerConcentration === opt.value}
            onClick={() => { setField("customerConcentration", opt.value); setTimeout(next, 250); }}
          >
            <div className="font-semibold">{opt.label}</div>
            <div className="text-xs text-neutral-500 mt-1">{opt.sublabel}</div>
          </OptionButton>
        ))}
      </div>
    </StepShell>
  );
}

// ============================================================================
// STEP 7: Company Type
// ============================================================================

function Step7CompanyType() {
  const { companyType, setField, next, goToStep } = useFunnelStore();

  const handleSelect = (type: CompanyType) => {
    setField("companyType", type);
    // Sole traders skip CH search (different path)
    if (type === "sole_trader") setTimeout(() => goToStep(10), 250);
    else setTimeout(next, 250);
  };

  return (
    <StepShell
      title="What type of business do you have?"
      subtitle="Used for lender eligibility — all 3 are welcome."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <OptionButton selected={companyType === "limited"} onClick={() => handleSelect("limited")}>
          <div className="font-semibold">Limited Company</div>
          <div className="text-xs text-neutral-500 mt-1">Most common</div>
        </OptionButton>
        <OptionButton selected={companyType === "llp"} onClick={() => handleSelect("llp")}>
          <div className="font-semibold">LLP</div>
          <div className="text-xs text-neutral-500 mt-1">Partnership</div>
        </OptionButton>
        <OptionButton selected={companyType === "sole_trader"} onClick={() => handleSelect("sole_trader")}>
          <div className="font-semibold">Sole Trader</div>
          <div className="text-xs text-neutral-500 mt-1">Just you</div>
        </OptionButton>
      </div>
    </StepShell>
  );
}

// ============================================================================
// STEP 8: Companies House Search
// ============================================================================

// Mock CH search results — replace with real API call
const MOCK_RESULTS: CompanyHouseResult[] = [
  {
    name: "ACME CONSTRUCTION LIMITED",
    number: "12345678",
    status: "active",
    address: "123 Building Way, London, SW1A 1AA",
    incorporationDate: "14 May 2019",
    directorSurnames: ["SMITH J.", "JONES P.", "WILLIAMS R."],
  },
  {
    name: "ACME CONSTRUCTION SERVICES LTD",
    number: "09876543",
    status: "active",
    address: "45 Builder St, Manchester, M1 2BC",
    incorporationDate: "22 Sep 2015",
    directorSurnames: ["PATEL R.", "CHEN M.", "+ 2 more"],
  },
  {
    name: "ACME CONSTRUCTION (NORTH) LTD",
    number: "04567890",
    status: "dissolved",
    address: "Newcastle",
    incorporationDate: "Dissolved 12 Mar 2024",
    directorSurnames: ["JONES P."],
  },
  {
    name: "ACME CONSTRUCTION AND DESIGN LTD",
    number: "11223344",
    status: "active",
    address: "89 Architect Ave, Bristol, BS1 4ED",
    incorporationDate: "03 Apr 2018",
    directorSurnames: ["ROBINSON M.", "KAUR A."],
  },
];

function Step8CompanySearch() {
  const { selectedCompany, setField, next } = useFunnelStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CompanyHouseResult[]>([]);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    // Mock: filter MOCK_RESULTS by query
    const filtered = MOCK_RESULTS.filter((r) =>
      r.name.toLowerCase().includes(query.toLowerCase())
    );
    // Always return at least the first result if user typed something
    setResults(filtered.length > 0 ? filtered : MOCK_RESULTS);
  }, [query]);

  return (
    <StepShell
      title="Find your business"
      subtitle="Start typing your registered name — we'll find it on Companies House and pull your data automatically."
      trustBadge="Soft Search Only · No Impact on Credit Score"
    >
      <div className="relative mb-4">
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Acme Construction"
          className="w-full px-5 py-4 text-lg border-2 border-black rounded-xl focus:outline-none"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-neutral-100 text-neutral-700 text-[10px] font-semibold rounded">
          COMPANIES HOUSE
        </span>
      </div>

      {results.length > 0 && (
        <div className="border border-neutral-200 rounded-xl overflow-hidden mb-4 max-h-[400px] overflow-y-auto">
          <div className="px-4 py-2.5 bg-neutral-50 border-b border-neutral-200 text-xs text-neutral-500 flex items-center justify-between">
            <span>Companies House data</span>
            <span>{results.length} matches</span>
          </div>
          <div className="divide-y divide-neutral-100">
            {results.map((r) => (
              <button
                key={r.number}
                onClick={() => { setField("selectedCompany", r); setTimeout(next, 200); }}
                className="w-full text-left px-4 py-3.5 hover:bg-neutral-50 transition flex items-start gap-3 group"
              >
                <div className={cn("w-2 h-2 rounded-full mt-2", r.status === "active" ? "bg-emerald-500" : "bg-neutral-400")} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={cn("font-semibold text-sm", r.status !== "active" && "text-neutral-500")}>
                      {r.name}
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 text-[10px] rounded-full font-semibold uppercase tracking-wider",
                      r.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-neutral-200 text-neutral-600"
                    )}>
                      {r.status}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">No: {r.number} · {r.incorporationDate} · {r.address}</div>
                  {r.directorSurnames && (
                    <div className="text-xs text-neutral-400 mt-1">
                      <span className="font-semibold">Directors:</span> {r.directorSurnames.join(", ")}
                    </div>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-black transition flex-shrink-0 mt-1" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={() => { setField("selectedCompany", null); next(); }}
          className="text-sm text-neutral-500 hover:text-black transition"
        >
          Can't find it? Enter details manually →
        </button>
      </div>
    </StepShell>
  );
}

// ============================================================================
// STEP 9: Director Auto-Prefill
// ============================================================================

const MOCK_DIRECTORS: Director[] = [
  { name: "John Smith", role: "Director", appointmentDate: "14 May 2019", dobMonthYear: "03/1985" },
  { name: "Priya Jones", role: "Director", appointmentDate: "22 Sep 2020", dobMonthYear: "11/1979" },
  { name: "Rachel Williams", role: "Director", appointmentDate: "06 Mar 2024", dobMonthYear: "07/1992" },
];

function Step9DirectorPrefill() {
  const { selectedCompany, setField, next } = useFunnelStore();

  // If user skipped CH search, skip this step too
  useEffect(() => {
    if (!selectedCompany) {
      const t = setTimeout(next, 0);
      return () => clearTimeout(t);
    }
  }, [selectedCompany, next]);

  if (!selectedCompany) return null;

  return (
    <StepShell
      title="Are you one of the directors?"
      subtitle={`We found these directors on file for ${selectedCompany.name}. Pick yourself if you're listed — we'll prefill your details.`}
      trustBadge="From Companies House public records"
    >
      <div className="space-y-3">
        {MOCK_DIRECTORS.map((d) => (
          <button
            key={d.name}
            onClick={() => { setField("selectedDirector", d); setTimeout(next, 200); }}
            className="w-full border-2 border-neutral-200 hover:border-black rounded-xl p-4 flex items-center gap-4 transition group"
          >
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-sm">
              {d.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold">{d.name}</div>
              <div className="text-xs text-neutral-500">{d.role} since {d.appointmentDate}</div>
              <div className="text-xs text-neutral-400 mt-0.5">DOB: {d.dobMonthYear}</div>
            </div>
            <div className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold group-hover:bg-neutral-800 transition">
              That's me →
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => { setField("selectedDirector", null); next(); }}
        className="w-full mt-4 py-3 border-2 border-neutral-200 hover:border-neutral-400 rounded-xl text-sm font-medium text-neutral-600 hover:text-black transition"
      >
        ✕ I'm not listed — enter manually
      </button>
    </StepShell>
  );
}

// ============================================================================
// STEP 10: Adverse Credit Declared
// ============================================================================

function Step10AdverseCredit() {
  const { adverseCredit, setField, next } = useFunnelStore();

  return (
    <StepShell
      title="Any adverse credit in the last 12 months?"
      subtitle="Invoice finance lenders care less about credit than traditional lenders — your customers' invoices are the collateral. Be honest — it won't disqualify you."
    >
      <div className="grid grid-cols-2 gap-3">
        <OptionButton
          selected={adverseCredit === false}
          onClick={() => { setField("adverseCredit", false); setTimeout(next, 250); }}
        >
          <div className="font-semibold">No issues</div>
          <div className="text-xs text-neutral-500 mt-1">Clean credit history</div>
        </OptionButton>
        <OptionButton
          selected={adverseCredit === true}
          onClick={() => { setField("adverseCredit", true); setTimeout(next, 250); }}
        >
          <div className="font-semibold">Yes, some issues</div>
          <div className="text-xs text-neutral-500 mt-1">CCJs, defaults, or late payments</div>
        </OptionButton>
      </div>

      <div className="mt-6 p-4 bg-neutral-50 rounded-lg text-xs text-neutral-600 leading-relaxed flex gap-3">
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <div>
          <strong className="text-neutral-900">What counts as adverse credit?</strong> CCJs (county court judgments), defaults, late payments to suppliers, or recent business loan declines. We work with specialist lenders for every scenario.
        </div>
      </div>
    </StepShell>
  );
}

// ============================================================================
// STEP 11: Urgency
// ============================================================================

function Step11Urgency() {
  const { urgency, setField, next } = useFunnelStore();

  const options: { value: Urgency; label: string; sublabel: string }[] = [
    { value: "immediately", label: "Immediately", sublabel: "Cash needed this week" },
    { value: "2_weeks", label: "Within 2 weeks", sublabel: "Soon, but not urgent" },
    { value: "4_weeks", label: "Within a month", sublabel: "Planning ahead" },
    { value: "8_weeks", label: "Within 2 months", sublabel: "Setting up for the future" },
    { value: "exploring", label: "Just exploring", sublabel: "No timeline yet" },
  ];

  return (
    <StepShell
      title="How soon do you need the cash?"
      subtitle="We'll prioritise your application with the right lenders based on your timeline."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((opt) => (
          <OptionButton
            key={opt.value}
            selected={urgency === opt.value}
            onClick={() => { setField("urgency", opt.value); setTimeout(next, 250); }}
          >
            <div className="font-semibold">{opt.label}</div>
            <div className="text-xs text-neutral-500 mt-1">{opt.sublabel}</div>
          </OptionButton>
        ))}
      </div>
    </StepShell>
  );
}

// ============================================================================
// STEP 12: ELIGIBILITY INTERSTITIAL (THE FAKE QUOTE)
// ============================================================================

function Step12Quote() {
  const state = useFunnelStore();
  const [view, setView] = useState<"quote" | "capture">("quote");
  const [captureStep, setCaptureStep] = useState(0); // 0=name, 1=email, 2=phone, 3=postcode, 4=consent
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const quote = calculateQuote({
    outstandingInvoices: state.outstandingInvoices || 100_000,
    averageInvoiceSize: 2500,
    annualTurnover: state.annualTurnover || 500_000,
    customerConcentration: state.customerConcentration || "medium",
    adverseCredit: state.adverseCredit || false,
    dso: state.dso || "30_days",
  });

  if (submitted) {
    return <SuccessView quote={quote} />;
  }

  if (view === "capture") {
    return (
      <CaptureView
        quote={quote}
        step={captureStep}
        onNext={() => setCaptureStep((s) => s + 1)}
        onBack={() => captureStep > 0 ? setCaptureStep((s) => s - 1) : setView("quote")}
        onSubmit={async () => {
          setSubmitting(true);
          // Simulate API call
          await new Promise((r) => setTimeout(r, 1500));
          setSubmitted(true);
          setSubmitting(false);
        }}
        submitting={submitting}
      />
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold animate-fade-in">
          <Sparkles className="w-4 h-4" /> Good news — you're indicatively approved
        </div>
      </div>

      <div className="border-2 border-emerald-500 rounded-2xl overflow-hidden shadow-lg">
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-emerald-200">Invoice Finance Quote</div>
            <div className="text-lg font-bold">SurgeFlow #SF-{Date.now().toString().slice(-6)}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-emerald-200">Quote Date</div>
            <div className="text-sm font-semibold">{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-white px-6 py-8 text-center border-b border-emerald-100">
          <div className="text-xs uppercase tracking-widest text-emerald-700 mb-2">Cash Unlocked</div>
          <div className="text-6xl font-bold text-emerald-900 mb-3 tracking-tight">{formatCurrency(quote.advanceAmount)}</div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-wider">
            <Check className="w-3 h-3" /> Indicatively Approved
          </div>
          <div className="text-sm text-emerald-700 mt-3">From £{state.outstandingInvoices?.toLocaleString()} outstanding · {Math.round(quote.advanceRate * 100)}% advance rate</div>
        </div>

        <div className="px-6 py-6 bg-white">
          <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Quote Summary</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-neutral-500 mb-1">Monthly fee</div>
              <div className="text-xl font-bold">{formatCurrency(quote.monthlyFeeAmount)}</div>
              <div className="text-[10px] text-neutral-400">{(quote.monthlyFeeRate * 100).toFixed(1)}% / month</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 mb-1">Advance rate</div>
              <div className="text-xl font-bold">{Math.round(quote.advanceRate * 100)}%</div>
              <div className="text-[10px] text-neutral-400">Of invoice value</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 mb-1">Time to cash</div>
              <div className="text-xl font-bold">{quote.approvalTime}</div>
              <div className="text-[10px] text-neutral-400">From acceptance</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 mb-1">Lenders</div>
              <div className="text-xl font-bold">{quote.lenders.length}+</div>
              <div className="text-[10px] text-neutral-400">Ready to underwrite</div>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 bg-neutral-50 border-t border-neutral-100">
          <div className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Recommended Product</div>
          <div className="font-bold text-lg mb-1">{productLabels[quote.recommendedProduct]}</div>
          <div className="text-sm text-neutral-600">{productDescriptions[quote.recommendedProduct]}</div>
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {quote.lenders.map((l) => (
              <span key={l} className="px-2 py-1 bg-white border border-neutral-200 rounded-full text-xs font-medium">{l}</span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setView("capture")}
        className="w-full mt-6 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-lg font-bold transition shadow-lg flex items-center justify-center gap-2"
      >
        Get my actual quote <ArrowRight className="w-5 h-5" />
      </button>
      <div className="text-center text-xs text-neutral-500 mt-3">
        Final rate subject to lender underwriting. Indicative figures.
      </div>

      <div className="mt-6 bg-neutral-50 rounded-xl p-5 border border-neutral-200 flex gap-3">
        <div className="text-2xl flex-shrink-0">💬</div>
        <div>
          <div className="text-sm font-semibold mb-1">From Sarah, your funding specialist</div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            "Brilliant news — your {formatCurrency(quote.advanceAmount)} could be in {state.selectedCompany?.name.split(" ")[0] || "your"}'s account within 24 hours. Just a few quick details below and I'll personally take this to funding. No bots, no maze."
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// DRIP LEAD CAPTURE (sub-flow within Step 12)
// ============================================================================

function CaptureView({
  quote,
  step,
  onNext,
  onBack,
  onSubmit,
  submitting,
}: {
  quote: ReturnType<typeof calculateQuote>;
  step: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  const state = useFunnelStore();
  const setField = useFunnelStore((s) => s.setField);

  const totalSubSteps = 5;
  const subProgress = Math.round(((step + 1) / totalSubSteps) * 100);

  const canProceed =
    (step === 0 && state.firstName.length > 0 && state.lastName.length > 0) ||
    (step === 1 && state.email.includes("@")) ||
    (step === 2 && state.phone.length >= 10) ||
    (step === 3 && state.homePostcode.length >= 5) ||
    (step === 4 && state.privacyAccepted);

  const handleNext = () => {
    if (step === 4) onSubmit();
    else onNext();
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* STICKY QUOTE */}
      <div>
        <div className="border-2 border-emerald-500 rounded-xl overflow-hidden bg-white sticky top-24">
          <div className="bg-emerald-900 text-white px-4 py-2 text-[10px] uppercase tracking-widest font-bold">
            Your Quote
          </div>
          <div className="p-4 text-center border-b border-emerald-100">
            <div className="text-3xl font-bold text-emerald-900 tracking-tight">{formatCurrency(quote.advanceAmount)}</div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-bold mt-1">
              <Check className="w-2.5 h-2.5" /> INDICATIVELY APPROVED
            </div>
          </div>
          <div className="p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Monthly fee</span>
              <span className="font-semibold">{formatCurrency(quote.monthlyFeeAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Advance rate</span>
              <span className="font-semibold">{Math.round(quote.advanceRate * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Time to cash</span>
              <span className="font-semibold">{quote.approvalTime}</span>
            </div>
            <div className="pt-2 mt-2 border-t border-neutral-100">
              <div className="text-xs text-neutral-500">{quote.lenders.length}+ lenders ready:</div>
              <div className="flex gap-1 mt-1 flex-wrap">
                {quote.lenders.map((l) => (
                  <span key={l} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-semibold">
                    {l.split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-neutral-500 text-center mt-3">
          Your quote stays here — refer back any time.
        </div>
      </div>

      {/* FIELD STEPS */}
      <div>
        <button onClick={onBack} className="text-sm text-neutral-500 hover:text-black mb-6 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="text-xs text-neutral-500 font-medium">Step {step + 1} of {totalSubSteps}</div>
          <div className="flex-1 h-1 bg-neutral-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${subProgress}%` }} />
          </div>
        </div>

        {step === 0 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Let's start with your name</h2>
            <p className="text-neutral-600 mb-6 text-sm">How should we address you when Sarah calls?</p>
            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-neutral-700">First name</label>
                <input
                  autoFocus
                  type="text"
                  value={state.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-black transition"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-neutral-700">Last name</label>
                <input
                  type="text"
                  value={state.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-black transition"
                  placeholder="Your last name"
                />
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Where shall we send your quote?</h2>
            <p className="text-neutral-600 mb-6 text-sm">Your business email — we'll send the full quote PDF here.</p>
            <input
              autoFocus
              type="email"
              value={state.email}
              onChange={(e) => setField("email", e.target.value)}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-black transition mb-6"
              placeholder="you@yourbusiness.com"
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-2">What's the best number?</h2>
            <p className="text-neutral-600 mb-6 text-sm">Sarah will call within 30 minutes. No automated bots.</p>
            <div className="flex gap-2 mb-6">
              <div className="flex items-center px-3 py-3 border-2 border-neutral-200 rounded-xl bg-neutral-50 text-sm font-semibold">
                🇬🇧 +44
              </div>
              <input
                autoFocus
                type="tel"
                value={state.phone}
                onChange={(e) => setField("phone", e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-black transition"
                placeholder="7700 900000"
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Your home postcode</h2>
            <p className="text-neutral-600 mb-6 text-sm">For ID verification — soft search only, no impact on credit.</p>
            <input
              autoFocus
              type="text"
              value={state.homePostcode}
              onChange={(e) => setField("homePostcode", e.target.value.toUpperCase())}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-black transition mb-6 uppercase"
              placeholder="SW1A 1AA"
            />
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Almost there.</h2>
            <p className="text-neutral-600 mb-6 text-sm">One last thing.</p>
            <label className="flex items-start gap-3 p-4 border-2 border-neutral-200 rounded-xl cursor-pointer hover:border-black transition mb-6">
              <input
                type="checkbox"
                checked={state.privacyAccepted}
                onChange={(e) => setField("privacyAccepted", e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded accent-black"
              />
              <div className="text-sm text-neutral-700 leading-relaxed">
                I agree to be contacted by SurgeFlow about my funding request and accept the <a href="#" className="underline">privacy policy</a>. We won't sell your data or pass you to spammers.
              </div>
            </label>
          </>
        )}

        <PrimaryButton disabled={!canProceed || submitting} onClick={handleNext}>
          {submitting ? "Sending..." : step === 4 ? "Send My Quote" : "Continue"}
        </PrimaryButton>

        <div className="text-xs text-center text-neutral-500 mt-4 flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3" /> 256-bit SSL encrypted · Never sold
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SUCCESS VIEW
// ============================================================================

function SuccessView({ quote }: { quote: ReturnType<typeof calculateQuote> }) {
  const state = useFunnelStore();

  return (
    <div className="text-center py-8">
      <div className="text-6xl mb-6 animate-fade-in">🎉</div>
      <h2 className="text-4xl font-bold mb-3 tracking-tight">
        You're matched, <span className="text-neutral-500">{state.firstName}</span>.
      </h2>
      <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
        We've found <strong className="text-emerald-700">{quote.lenders.length} lenders</strong> ready to unlock <strong className="text-emerald-700">{formatCurrency(quote.advanceAmount)}</strong> from your invoices.
      </p>

      <div className="max-w-md mx-auto bg-neutral-50 border border-neutral-200 rounded-2xl p-6 text-left mb-8">
        <h3 className="font-bold mb-4">What happens next</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2m</span>
            <div><strong>Within 2 minutes:</strong> Text from Sarah + email with full quote</div>
          </li>
          <li className="flex gap-3">
            <span className="w-7 h-7 rounded-full bg-neutral-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">30m</span>
            <div><strong>Within 30 minutes:</strong> Sarah calls to confirm details</div>
          </li>
          <li className="flex gap-3">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">24h</span>
            <div><strong>Within 24 hours:</strong> Cash in {state.selectedCompany?.name.split(" ")[0] || "your"}'s account</div>
          </li>
        </ul>
      </div>

      <div className="max-w-md mx-auto bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm">
        Save this page or check <strong>{state.email}</strong> · Questions? Call <a href="tel:08000869404" className="font-bold underline">0800 086 9404</a>
      </div>
    </div>
  );
}
