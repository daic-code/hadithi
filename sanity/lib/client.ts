const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-02";

export const isSanityConfigured = Boolean(projectId && dataset);

export async function sanityFetch<T>(query: string): Promise<T> {
  if (!isSanityConfigured) throw new Error("Sanity is not configured.");

  const params = new URLSearchParams({ query });
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?${params}`;
  const response = await fetch(url, {
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(4_000),
  });

  if (!response.ok) throw new Error(`Sanity request failed with status ${response.status}.`);
  return (await response.json() as { result: T }).result;
}

export function logSanityFallback(contentType: string) {
  if (process.env.NODE_ENV === "development") {
    console.warn(`Sanity ${contentType} is temporarily unavailable; showing starter content.`);
  }
}
