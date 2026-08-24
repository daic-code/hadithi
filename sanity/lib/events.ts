import { events as fallbackEvents, type Event } from "../../app/data";
import { isSanityConfigured, logSanityFallback, sanityFetch } from "./client";

const eventsQuery = `*[_type == "event"] | order(date asc) {
  "_id": _id,
  title,
  category,
  date,
  venue,
  description,
  "image": image.asset->url,
  ticketUrl,
  status
}`;

type SanityEvent = {
  _id: string;
  title?: string;
  category?: Event["category"];
  date?: string;
  venue?: string;
  description?: string;
  image?: string;
  ticketUrl?: string;
  status?: Event["status"];
};

export async function getEvents(): Promise<Event[]> {
  if (!isSanityConfigured) return fallbackEvents;

  try {
    const results = await sanityFetch<SanityEvent[]>(eventsQuery);
    if (!results.length) return fallbackEvents;

    return results.map((event) => ({
      name: event.title || "Untitled event",
      category: event.category || "Community",
      date: event.date ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(event.date)) : "Date to be announced",
      venue: event.venue || "Venue to be announced",
      description: event.description || "More details coming soon.",
      image: event.image || fallbackEvents[0].image,
      ticketUrl: event.ticketUrl || "#contact",
      status: event.status || "Upcoming",
    }));
  } catch {
    logSanityFallback("events");
    return fallbackEvents;
  }
}
