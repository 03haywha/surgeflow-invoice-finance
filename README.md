# SurgeFlow Invoice Finance Funnel

Custom Next.js funnel for SurgeFlow's invoice finance product. Built from the teardown of 8 UK competitor funnels — incorporates every winning pattern we identified.

## What's in it

- **Landing page** with inline DSO question, live counter, lender logos, comparison table, working calculator, founder story, FAQ
- **12-step modal funnel** with progress bar, soft-route disqualifiers, Companies House search + director auto-prefill
- **Eligibility quote interstitial** — the "fake quote" conversion device (Tally pattern)
- **Drip lead capture** — 5 micro-steps with sticky quote (Tally pattern)
- **Success page** with "what happens next" timeline

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Zustand (state management + persistence)
- Anthropic Claude SDK (for AI lead scoring, currently stubbed)

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

Auto-deploys to Vercel on every push to `main`.

## TODO (for production)

- [ ] Wire up real Companies House API in `app/api/ch-search/route.ts`
- [ ] Wire up real Claude lead scoring in `app/api/score-lead/route.ts` (see `/state/projects/funnel-teardown/04-lead-scoring-spec.md`)
- [ ] Add real `/api/submit-lead` endpoint that pushes to GHL
- [ ] Add Meta CAPI + TikTok Events API
- [ ] Add postcode → address lookup (Getaddress.io)
- [ ] Add SMS OTP verification on phone step
- [ ] Replace mock testimonials with real Trustpilot widget once we have reviews
- [ ] Add proper privacy policy + terms pages

## Related

See `/state/projects/funnel-teardown/` for the full competitive analysis this was built from.
