import { NextResponse } from "next/server";

/**
 * Companies House search proxy.
 *
 * Currently returns mock data. Replace with real Companies House API call:
 *   GET https://api.company-information.service.gov.uk/search/companies?q={query}
 *
 * Auth: Basic auth with API key as username, empty password.
 * Get a free API key: https://developer.company-information.service.gov.uk/
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // TODO: replace with real Companies House API
  // const apiKey = process.env.COMPANIES_HOUSE_API_KEY;
  // const response = await fetch(
  //   `https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(query)}&items_per_page=20`,
  //   { headers: { Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}` } }
  // );

  // Mock response
  return NextResponse.json({
    results: [
      {
        name: `${query.toUpperCase()} LIMITED`,
        number: "12345678",
        status: "active",
        address: "123 Business Way, London, SW1A 1AA",
        incorporationDate: "14 May 2019",
        directorSurnames: ["SMITH J.", "JONES P.", "WILLIAMS R."],
      },
    ],
  });
}
