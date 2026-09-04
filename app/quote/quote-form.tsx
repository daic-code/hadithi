"use client";

import { useState } from "react";
import { emptyQuoteRequest, quoteWhatsappUrl, type QuoteRequest } from "../lib/quote";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "failed"; message: string };

const eventTypes = ["Corporate", "Wedding", "Sports & tournament", "Private & personal"];
const budgets = ["Under KES 250,000", "KES 250,000–500,000", "KES 500,000–1M", "KES 1M+"];

export function QuoteForm({ whatsappUrl }: { whatsappUrl: string }) {
  const [quote, setQuote] = useState<QuoteRequest>(emptyQuoteRequest);
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const set = (field: keyof QuoteRequest) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setQuote((current) => ({ ...current, [field]: event.target.value }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...quote, company }),
      });
      const result = (await response.json()) as { ok: boolean; message?: string };

      if (result.ok) {
        setStatus({ state: "sent" });
        return;
      }

      // The details are still on screen and the WhatsApp button below still works,
      // so a failed email never costs the enquiry.
      setStatus({ state: "failed", message: result.message || "That did not go through." });
    } catch {
      setStatus({ state: "failed", message: "That did not go through." });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="quote-sent">
        <p className="eyebrow clay">Sent</p>
        <h2>Thank you. We have your brief.</h2>
        <p>We read every one and come back within two working days. If it is urgent, send the same details on WhatsApp and we will pick it up faster.</p>
        <a className="button" href={quoteWhatsappUrl(whatsappUrl, quote)} target="_blank" rel="noreferrer">
          Send it on WhatsApp too <span aria-hidden="true">→</span>
        </a>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={onSubmit}>
      <div className="form-two">
        <label>Event type
          <select onChange={set("eventType")} required value={quote.eventType}>
            <option value="" disabled>Choose one</option>
            {eventTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
        <label>Event date
          <input onChange={set("eventDate")} type="date" value={quote.eventDate} />
        </label>
      </div>

      <div className="form-two">
        <label>Budget range
          <select onChange={set("budget")} value={quote.budget}>
            <option value="" disabled>Select a range</option>
            {budgets.map((budget) => <option key={budget}>{budget}</option>)}
          </select>
        </label>
        <label>Expected guests
          <input min="1" onChange={set("guests")} placeholder="e.g. 100" type="number" value={quote.guests} />
        </label>
      </div>

      <label>Tell us a little more
        <textarea onChange={set("details")} placeholder="What are you trying to make happen?" rows={5} value={quote.details} />
      </label>

      <div className="form-two">
        <label>Your name
          <input onChange={set("name")} placeholder="Full name" required type="text" value={quote.name} />
        </label>
        <label>Email address
          <input onChange={set("email")} placeholder="you@company.com" type="email" value={quote.email} />
        </label>
      </div>

      <label>Phone / WhatsApp number
        <input onChange={set("phone")} placeholder="+254" type="tel" value={quote.phone} />
      </label>

      {/* Honeypot: hidden from people, irresistible to form-spam bots. */}
      <label aria-hidden="true" className="quote-honeypot">
        Company
        <input autoComplete="off" onChange={(event) => setCompany(event.target.value)} tabIndex={-1} value={company} />
      </label>

      <div className="quote-actions">
        <button className="button" disabled={status.state === "sending"} type="submit">
          {status.state === "sending" ? "Sending…" : "Send inquiry"} <span aria-hidden="true">→</span>
        </button>
        <a className="button outline" href={quoteWhatsappUrl(whatsappUrl, quote)} target="_blank" rel="noreferrer">
          Send on WhatsApp <span aria-hidden="true">→</span>
        </a>
      </div>

      {status.state === "failed" && (
        <p aria-live="polite" className="quote-error">
          {status.message} Nothing is lost - use the WhatsApp button above and your details go through as a message.
        </p>
      )}
    </form>
  );
}
