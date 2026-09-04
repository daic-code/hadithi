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
  status,
  "mediaLinks": mediaLinks[]{ label, url }
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
  mediaLinks?: { label?: string; url?: string }[] | null;
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
      mediaLinks: (event.mediaLinks || [])
        .filter((link): link is { label?: string; url: string } => Boolean(link?.url))
        .map((link) => ({ label: link.label || "Listen", url: link.url })),
    }));
  } catch {
    logSanityFallback("events");
    return fallbackEvents;
  }
}
