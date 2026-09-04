import { formatQuoteMessage, missingRequiredFields, quoteSubject, type QuoteRequest } from "../../lib/quote";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Secrets are set on the Worker with `wrangler secret put`. OpenNext mirrors them onto
// process.env, but read the Cloudflare context too so this keeps working if that changes.
async function readEnv(key: string): Promise<string | undefined> {
  if (process.env[key]) return process.env[key];

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const context = await getCloudflareContext({ async: true });
    return (context.env as unknown as Record<string, string | undefined>)?.[key];
  } catch {
    return undefined;
  }
}

function asString(value: unknown) {
  return typeof value === "string" ? value.slice(0, 4_000) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, reason: "invalid", message: "That request could not be read." }, { status: 400 });
  }

  // Honeypot. A real person never sees this field, so anything in it is a bot.
  // Answer 200 so the bot believes it succeeded and does not retry.
  if (asString(body.company).trim()) {
    return Response.json({ ok: true, delivered: false });
  }

  const quote: QuoteRequest = {
    name: asString(body.name),
    email: asString(body.email),
    phone: asString(body.phone),
    eventType: asString(body.eventType),
    eventDate: asString(body.eventDate),
    budget: asString(body.budget),
    guests: asString(body.guests),
    details: asString(body.details),
  };

  const missing = missingRequiredFields(quote);
  if (missing.length) {
    return Response.json(
      { ok: false, reason: "incomplete", message: `Please add ${missing.join(" and ")}.` },
      { status: 400 },
    );
  }

  const apiKey = await readEnv("RESEND_API_KEY");
  const to = (await readEnv("QUOTE_INBOX")) || "hadithievents@gmail.com";
  // Resend's shared sender works without owning a domain. Swap this for an address on
  // the real domain once one is set up and verified, so replies land in the right place.
  const from = (await readEnv("QUOTE_FROM")) || "Hadithi Events <onboarding@resend.dev>";

  if (!apiKey) {
    return Response.json(
      { ok: false, reason: "email-not-configured", message: "Email delivery is not switched on yet." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        // So hitting reply in Gmail writes to the person who filled the form.
        ...(quote.email.trim() ? { reply_to: quote.email.trim() } : {}),
        subject: quoteSubject(quote),
        text: formatQuoteMessage(quote),
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the enquiry:", response.status, detail.slice(0, 300));
      return Response.json(
        { ok: false, reason: "email-failed", message: "The email did not go through." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("Could not reach the email service:", error);
    return Response.json(
      { ok: false, reason: "email-failed", message: "The email did not go through." },
      { status: 502 },
    );
  }
}
