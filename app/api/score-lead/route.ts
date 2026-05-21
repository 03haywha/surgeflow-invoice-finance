import { NextResponse } from "next/server";

/**
 * AI Lead Scoring endpoint.
 *
 * Currently returns a mock score. To wire up Claude:
 *
 * 1. Set ANTHROPIC_API_KEY in .env
 * 2. Uncomment the Anthropic SDK code below
 * 3. See /state/projects/funnel-teardown/04-lead-scoring-spec.md for the full prompt
 */
export async function POST(request: Request) {
  const lead = await request.json();

  // TODO: replace with real Claude scoring
  // const Anthropic = (await import("@anthropic-ai/sdk")).default;
  // const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  // const response = await client.messages.create({
  //   model: "claude-sonnet-4-6",
  //   max_tokens: 2000,
  //   system: LEAD_SCORING_SYSTEM_PROMPT, // from spec doc
  //   messages: [{ role: "user", content: `Score this lead: ${JSON.stringify(lead)}` }],
  // });

  // Mock scoring logic (deterministic from inputs for demo)
  const score = calculateMockScore(lead);

  return NextResponse.json({
    score,
    tier: score >= 80 ? "hot" : score >= 40 ? "warm" : "cold",
    recommended_lenders: ["MarketFinance", "Bibby Financial", "Aldermore"],
    rationale: `Mock scoring: ${score}/100 based on simple turnover-to-loan ratio + concentration risk. Replace with Claude prompt for real scoring.`,
  });
}

function calculateMockScore(lead: any): number {
  let score = 50; // baseline

  // Turnover signals
  if (lead.annualTurnover >= 1_000_000) score += 20;
  else if (lead.annualTurnover >= 250_000) score += 10;

  // Concentration risk
  if (lead.customerConcentration === "low") score += 15;
  else if (lead.customerConcentration === "very_high") score -= 10;

  // Adverse credit
  if (lead.adverseCredit === false) score += 10;
  else score -= 10;

  // Urgency boost
  if (lead.urgency === "immediately") score += 5;

  return Math.max(0, Math.min(100, score));
}
