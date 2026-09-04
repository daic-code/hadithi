"use client";

import { useMemo, useState } from "react";
import type { Event } from "../data";

const categories = ["All events", "Podcast", "Fashion", "Sport", "Community"] as const;
type CategoryFilter = (typeof categories)[number];

export function EventFilters({ events }: { events: Event[] }) {
  const [selected, setSelected] = useState<CategoryFilter>("All events");
  const visibleEvents = useMemo(
    () => selected === "All events" ? events : events.filter((event) => event.category === selected),
    [events, selected],
  );

  return (
    <>
      <section className="shell filters" aria-label="Filter events by category">
        {categories.map((category) => (
          <button
            aria-pressed={selected === category}
            className={selected === category ? "active" : undefined}
            key={category}
            onClick={() => setSelected(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </section>

      <section className="shell event-grid" aria-live="polite">
        {visibleEvents.map((event) => (
          <article className="event-card" key={`${event.category}-${event.name}`}>
            <div className="event-image" style={{ backgroundImage: `url(${event.image})` }}><span>{event.status}</span></div>
            <p className="event-category">{event.category}</p>
            <h2>{event.name}</h2>
            <p>{event.date} · {event.venue}</p>
            <p className="event-copy">{event.description}</p>
            {event.status === "Past" ? (
              <span className="text-link ticket-unavailable" aria-label="Tickets are unavailable for this past event">Get tickets</span>
            ) : (
              <a className="text-link clay-link" href={event.ticketUrl} target="_blank" rel="noreferrer">Get tickets <span aria-hidden="true">→</span></a>
            )}
            {event.mediaLinks.length > 0 && (
              <div className="media-links">
                {event.mediaLinks.map((link) => (
                  <a className="media-link" href={link.url} key={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>

      {!visibleEvents.length && <p className="shell no-events">No {selected.toLowerCase()} events are on the calendar yet.</p>}
    </>
  );
}
