// One shape and one formatter for a planning enquiry, shared by the API route (email)
// and the browser (WhatsApp), so the two messages can never drift apart.

export type QuoteRequest = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  budget: string;
  guests: string;
  details: string;
};

export const emptyQuoteRequest: QuoteRequest = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  budget: "",
  guests: "",
  details: "",
};

function line(label: string, value: string) {
  const trimmed = (value || "").trim();
  return trimmed ? `${label}: ${trimmed}` : "";
}

// Plain text on purpose. It has to read well in a Gmail message and inside a
// WhatsApp chat bubble, and neither of those is a place for HTML.
export function formatQuoteMessage(request: QuoteRequest) {
  const groups = [
    ["New event enquiry from the Hadithi Events website"],
    [line("Name", request.name), line("Email", request.email), line("Phone", request.phone)],
    [
      line("Event type", request.eventType),
      line("Event date", request.eventDate),
      line("Budget", request.budget),
      line("Expected guests", request.guests),
    ],
    [request.details.trim() ? `Details:\n${request.details.trim()}` : ""],
  ];

  // Drop the empty rows first, then any group that emptied out entirely, so the
  // blank line between sections never turns into a run of blank lines.
  return groups
    .map((group) => group.filter(Boolean).join("\n"))
    .filter(Boolean)
    .join("\n\n");
}

export function quoteSubject(request: QuoteRequest) {
  const who = request.name.trim() || "Someone";
  const what = request.eventType.trim() || "an event";
  return `Event enquiry: ${what} - ${who}`;
}

// A wa.me link opens WhatsApp on the sender's own phone with the message ready to send,
// so the enquiry arrives from their number and can be replied to directly.
export function quoteWhatsappUrl(businessWhatsappUrl: string, request: QuoteRequest) {
  return `${businessWhatsappUrl}?text=${encodeURIComponent(formatQuoteMessage(request))}`;
}

export function missingRequiredFields(request: QuoteRequest) {
  const missing: string[] = [];
  if (!request.name.trim()) missing.push("your name");
  if (!request.email.trim() && !request.phone.trim()) missing.push("an email address or phone number");
  if (!request.eventType.trim()) missing.push("the event type");
  return missing;
}
