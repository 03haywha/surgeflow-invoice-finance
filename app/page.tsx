"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check, Shield, Zap, Lock, Phone, Mail, MapPin } from "lucide-react";
import { useFunnelStore, type DSO } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { FunnelModal } from "@/components/FunnelModal";

export default function LandingPage() {
  const restartFunnel = useFunnelStore((s) => s.restartFunnel);
  const [counter, setCounter] = useState(31);

  // Live counter increments randomly to feel real
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + (Math.random() > 0.5 ? 1 : 0));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const startFunnel = (dso: DSO) => restartFunnel(dso);
  const openModal = () => restartFunnel();

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <FunnelModal />

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-sm">S</div>
            <div className="text-lg font-bold">SurgeFlow</div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600">
            <a href="#how" className="hover:text-black">How it works</a>
            <a href="#faq" className="hover:text-black">FAQ</a>
            <a href="tel:08000869404" className="hover:text-black">0800 086 9404</a>
          </nav>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition"
          >
            Get started →
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-soft"></span>
              <span><strong className="text-neutral-900">{counter}</strong> businesses checked options in the last 30 min</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] mb-6 tracking-tight">
              Get paid faster.
              <br />
              <span className="text-neutral-500">Without chasing customers.</span>
            </h1>

            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Unlock cash from unpaid invoices in 24 hours. No fixed repayments. No chasing. Just smart matching with 30+ UK invoice finance lenders.
            </p>

            {/* INLINE DSO QUESTION */}
            <div className="bg-white border-2 border-neutral-900 rounded-2xl p-6">
              <div className="text-sm font-semibold text-neutral-900 mb-1">When do customers usually pay you?</div>
              <div className="text-xs text-neutral-500 mb-4">2 minutes. No credit impact. See your indicative quote instantly.</div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => startFunnel("this_week")}
                  className="py-3.5 px-4 border border-neutral-200 rounded-lg text-sm font-medium hover:border-neutral-900 hover:bg-neutral-50 transition text-left"
                >
                  <div>This week</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Fast turnaround</div>
                </button>
                <button
                  onClick={() => startFunnel("30_days")}
                  className="py-3.5 px-4 border-2 border-neutral-900 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-black transition text-left relative"
                >
                  <div className="absolute -top-2 right-2 px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] rounded-full font-bold">MOST COMMON</div>
                  <div>Within 30 days</div>
                  <div className="text-xs text-neutral-300 mt-0.5">Standard B2B terms</div>
                </button>
                <button
                  onClick={() => startFunnel("1_3_months")}
                  className="py-3.5 px-4 border border-neutral-200 rounded-lg text-sm font-medium hover:border-neutral-900 hover:bg-neutral-50 transition text-left"
                >
                  <div>1—3 months</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Long payment terms</div>
                </button>
                <button
                  onClick={() => startFunnel("90_plus")}
                  className="py-3.5 px-4 border border-neutral-200 rounded-lg text-sm font-medium hover:border-neutral-900 hover:bg-neutral-50 transition text-left"
                >
                  <div>90+ days</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Late payers</div>
                </button>
              </div>

              <button
                onClick={() => startFunnel("exploring")}
                className="w-full py-2.5 text-xs text-neutral-500 hover:text-neutral-900 transition"
              >
                Just exploring — show me how it works →
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-neutral-900" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <span className="text-neutral-900 font-semibold">4.9</span>
              <span className="text-neutral-500">from 247 reviews</span>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-neutral-100 p-8 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-neutral-200 max-w-sm w-full">
                <div className="flex items-center justify-between mb-4 text-xs text-neutral-500 uppercase tracking-widest font-semibold">
                  <span>Invoice Finance Quote</span>
                  <span>21 May 2026</span>
                </div>

                <div className="border-t border-b border-neutral-200 py-6 mb-4 text-center">
                  <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Cash Unlocked</div>
                  <div className="text-5xl font-bold tracking-tight">{formatCurrency(85000)}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">
                    <Check className="w-3 h-3" /> Indicatively approved
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Advance rate</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Monthly fee</span>
                    <span className="font-semibold">{formatCurrency(2000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Funded in</span>
                    <span className="font-semibold">24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-neutral-200 py-10 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-sm text-neutral-500 mb-6">Working with 30+ UK invoice finance lenders</div>
          <div className="flex items-center justify-center gap-x-12 gap-y-4 flex-wrap text-neutral-700">
            <div className="text-xl font-bold">MarketFinance</div>
            <div className="text-xl font-bold">Bibby Financial</div>
            <div className="text-xl font-bold">Aldermore</div>
            <div className="text-xl font-bold">Skipton</div>
            <div className="text-xl font-bold">Sonovate</div>
            <div className="text-xl font-bold">Optimum</div>
            <div className="text-sm text-neutral-500">+ 24 more</div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-3 tracking-tight">Why businesses switch to SurgeFlow</h2>
          <p className="text-center text-neutral-600 mb-12">Traditional lenders vs us</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8">
              <div className="text-sm font-semibold text-neutral-500 mb-6 uppercase tracking-widest">Traditional Lenders</div>
              <ul className="space-y-4">
                {[
                  { title: "Slow process", desc: "Weeks of paperwork and back-and-forth" },
                  { title: "Fixed repayments", desc: "Continue even if your cash flow dips" },
                  { title: "Credit-led decisions", desc: "Personal credit history matters more than your invoices" },
                  { title: "Lock-in contracts", desc: "12-24 month minimum terms with exit fees" },
                  { title: "Customers find out", desc: "Notification on every invoice" },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="text-neutral-400 mt-0.5">✗</span>
                    <div>
                      <div className="font-semibold text-neutral-700">{item.title}</div>
                      <div className="text-sm text-neutral-500">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-900 text-white rounded-2xl p-8">
              <div className="text-sm font-semibold text-neutral-400 mb-6 uppercase tracking-widest">SurgeFlow</div>
              <ul className="space-y-4">
                {[
                  { title: "Fast decision", desc: "Indicative terms in minutes, funded in 24h" },
                  { title: "Flexible funding", desc: "Access cash as you invoice — no fixed repayments" },
                  { title: "Invoice-led", desc: "Approval based on your receivables, not your credit file" },
                  { title: "No long commitments", desc: "Selective options. Use it for one invoice or all of them" },
                  { title: "Confidential options", desc: "Lenders that don't notify your customers" },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-neutral-400">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openModal()}
                className="w-full mt-6 py-3 bg-white text-neutral-900 rounded-lg font-semibold hover:bg-neutral-100 transition flex items-center justify-center gap-2"
              >
                Check my options <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-3 tracking-tight">See your cash unlocked</h2>
          <p className="text-center text-neutral-600 mb-12">Indicative — based on a typical 85% advance rate</p>

          <Calculator onApply={() => openModal()} />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20" id="how">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-3 tracking-tight">What you get</h2>
          <p className="text-center text-neutral-600 mb-12">Built for businesses tired of chasing unpaid invoices</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Get paid faster",
                desc: "Cash released from unpaid invoices — often within 24 hours. No more waiting 30—60 days for B2B customers to pay.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Funding that flexes",
                desc: "Pay only for what you use. No fixed loan repayments. Funding scales with your invoicing, not against it.",
              },
              {
                icon: <Lock className="w-6 h-6" />,
                title: "Optional credit control",
                desc: "We can manage credit control for you — or keep it in-house. No awkward chasing if you don't want it.",
              },
            ].map((b) => (
              <div key={b.title} className="bg-white border border-neutral-200 rounded-2xl p-6 hover:border-neutral-900 transition">
                <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center mb-4">{b.icon}</div>
                <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-3 tracking-tight">How it works</h2>
          <p className="text-center text-neutral-400 mb-12">Three steps. Sixty seconds. No paperwork to start.</p>

          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-neutral-700"></div>
            {[
              { step: "01", title: "Tell us about your invoices", desc: "Annual turnover, customer type, outstanding invoices. Takes 60 seconds." },
              { step: "02", title: "See your indicative quote", desc: "Cash unlocked + monthly fee — instantly. Pick a funding option you like." },
              { step: "03", title: "Funded in 24 hours", desc: "A real person walks you through. No bots. Money in your account same day." },
            ].map((s) => (
              <div key={s.step} className="text-center relative bg-neutral-900">
                <div className="w-16 h-16 bg-white text-neutral-900 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 relative z-10">
                  {s.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => openModal()}
              className="px-8 py-4 bg-white text-neutral-900 rounded-lg font-semibold hover:bg-neutral-100 transition inline-flex items-center gap-2"
            >
              See my options <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 tracking-tight">Real businesses, real funding</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Our biggest client was 90 days late on £180k. SurgeFlow had us paid in 24 hours. Saved Q4.",
                name: "Sarah M.",
                business: "Recruitment · Birmingham",
                amount: "£180k",
                speed: "24hrs",
              },
              {
                quote: "We invoice on 60-day terms but pay our subcontractors weekly. Invoice finance closed that gap completely.",
                name: "James M.",
                business: "Construction · Manchester",
                amount: "£250k",
                speed: "48hrs",
              },
              {
                quote: "Our bank wanted 18-month commitment and £15k personal guarantee. SurgeFlow matched us to a confidential lender — no PG, no notification.",
                name: "Priya K.",
                business: "B2B services · London",
                amount: "£420k",
                speed: "36hrs",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-neutral-200 rounded-2xl p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 fill-neutral-900" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-neutral-500">{t.business}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{t.amount}</div>
                    <div className="text-xs text-neutral-500">{t.speed}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <div>
              <div className="aspect-square rounded-2xl bg-neutral-200 flex items-center justify-center text-6xl">👨‍💼</div>
              <div className="text-center mt-4 font-semibold">Harry Hayward</div>
              <div className="text-center text-sm text-neutral-500">Founder, SurgeFlow</div>
            </div>
            <div className="md:col-span-2">
              <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2">A note from the founder</div>
              <h3 className="text-2xl font-bold mb-4 leading-tight">"I built SurgeFlow because I hated the experience too."</h3>
              <p className="text-neutral-700 mb-3 leading-relaxed">
                I've owned businesses since I was 23. Used invoice finance to grow, to survive cash crunches, and to keep paying staff when big clients dragged their feet. But getting it set up was brutal — endless pressure selling, confusing fees, and data sold to other lenders who spammed me for a year.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                SurgeFlow is built to fix that. Fast. Easy. Transparent. 100% safe for business owners who just want their cash on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 tracking-tight">Common questions</h2>
          <div className="space-y-3">
            {[
              {
                q: "Will my customers know I'm using invoice finance?",
                a: "Only if you want them to. Some products (factoring) involve the lender taking over credit control and notifying customers. Others (confidential invoice discounting) keep it 100% private — customers continue paying you directly. We'll match you to whichever fits your situation.",
              },
              {
                q: "What does it cost?",
                a: "Typically 1.5%-3% of the invoice value per month. Lower for larger businesses with strong customers. You only pay for what you use — no fixed monthly fees. We'll show you an exact quote before you commit.",
              },
              {
                q: "Will checking eligibility affect my credit?",
                a: "Nope. We use a soft search only — like a light tap, not a heavy hit. Your credit file stays untouched. If you decide to go ahead with a lender, there might be a full check at that point — totally normal.",
              },
              {
                q: "Can I use this for just one invoice, or do I have to commit my whole sales ledger?",
                a: "Both work. \"Selective invoice discounting\" lets you pick individual invoices to finance — perfect for occasional cash flow gaps. \"Whole-book factoring\" finances your entire ledger — better for ongoing cash flow management. We'll recommend which fits your business.",
              },
              {
                q: "What if my customers have adverse credit?",
                a: "Invoice finance is about YOUR customers' ability to pay, not yours. We have lenders who specialise in higher-risk customer books. Declare it openly — it won't disqualify you, just changes which lender we match you with.",
              },
              {
                q: "How fast is \"fast\"?",
                a: "Indicative quote: instant (you'll see it in our funnel). Real underwritten offer: 24 hours. Money in your account: 24-48 hours from accepting. Quicker than you'll spend reading this FAQ.",
              },
              {
                q: "What if I've already been declined elsewhere?",
                a: "Common scenario. Our panel includes specialists who say yes when others say no — sub-prime, new businesses, single-customer concentration, etc. We'll find a match if one exists.",
              },
              {
                q: "Who am I sharing my data with?",
                a: "Only the lenders we think are a real match. Not 50 random brokers. We don't sell your data, won't pass you to whoever pays us the most, and we'll always tell you who we're sharing with before we do.",
              },
            ].map((item) => (
              <details key={item.q} className="bg-white border border-neutral-200 rounded-xl p-5 group">
                <summary className="cursor-pointer font-semibold flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-neutral-400 group-open:rotate-180 transition flex-shrink-0">↓</span>
                </summary>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6 tracking-tight">Ready to unlock cash from your invoices?</h2>
          <p className="text-xl text-neutral-400 mb-8">60 seconds to see your options. No credit impact. No obligation.</p>
          <button
            onClick={() => openModal()}
            className="px-10 py-5 bg-white text-neutral-900 rounded-xl font-bold text-lg hover:bg-neutral-100 transition inline-flex items-center gap-2"
          >
            See my options <ArrowRight className="w-5 h-5" />
          </button>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-neutral-400 flex-wrap">
            <div>✓ No credit impact</div>
            <div>✓ Funded in 24 hours</div>
            <div>✓ 30+ UK lenders</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-neutral-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-bold text-sm">S</div>
                <div className="text-white text-lg font-bold">SurgeFlow</div>
              </div>
              <p className="text-xs leading-relaxed">
                FCA Authorised intermediary helping UK SMEs unlock cash from invoices. Real humans. Smart matching. No spam.
              </p>
            </div>
            <div>
              <div className="text-white font-semibold mb-3 text-sm">Products</div>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white">Invoice Finance</a></li>
                <li><a href="#" className="hover:text-white">Business Loans</a></li>
                <li><a href="#" className="hover:text-white">Asset Finance</a></li>
                <li><a href="#" className="hover:text-white">Merchant Cash Advance</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-3 text-sm">Company</div>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white">About us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Make a complaint</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-3 text-sm">Contact</div>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> 0800 086 9404</li>
                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> hello@surgeflowgrowth.com</li>
                <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> London</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-6 text-xs flex items-center justify-between flex-wrap gap-2">
            <div>© 2026 Surgeflow Growth Limited. FCA Authorised · ICO Registered · 256-bit SSL.</div>
            <div>Made with ♥ in London</div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// CALCULATOR COMPONENT
function Calculator({ onApply }: { onApply: () => void }) {
  const [book, setBook] = useState(100_000);

  const advance = Math.round(book * 0.85);
  const monthlyFee = Math.round(book * 0.02);

  return (
    <div className="bg-white border-2 border-neutral-200 rounded-2xl p-8 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold">Your unpaid invoice book</label>
          <span className="text-2xl font-bold tracking-tight">{formatCurrency(book)}</span>
        </div>
        <input
          type="range"
          min={10000}
          max={1000000}
          step={5000}
          value={book}
          onChange={(e) => setBook(parseInt(e.target.value))}
          className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-neutral-900"
        />
        <div className="flex justify-between mt-2 text-xs text-neutral-400">
          <span>£10k</span>
          <span>£1m</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-6 bg-neutral-900 text-white rounded-xl">
        <div>
          <div className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Cash unlocked</div>
          <div className="text-3xl font-bold tracking-tight">{formatCurrency(advance)}</div>
          <div className="text-xs text-neutral-500 mt-1">85% advance rate</div>
        </div>
        <div>
          <div className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Monthly fee</div>
          <div className="text-3xl font-bold tracking-tight">{formatCurrency(monthlyFee)}</div>
          <div className="text-xs text-neutral-500 mt-1">Pay only as used</div>
        </div>
        <div>
          <div className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Time to cash</div>
          <div className="text-3xl font-bold tracking-tight">24h</div>
          <div className="text-xs text-neutral-500 mt-1">From approval</div>
        </div>
      </div>

      <button
        onClick={onApply}
        className="w-full mt-6 py-4 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-black transition inline-flex items-center justify-center gap-2"
      >
        Get my exact quote <ArrowRight className="w-4 h-4" />
      </button>
      <div className="text-xs text-center text-neutral-500 mt-3">
        Indicative figures. Exact rate and advance rate depend on your business profile.
      </div>
    </div>
  );
}
