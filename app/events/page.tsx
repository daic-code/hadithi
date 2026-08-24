import { getEvents } from "../../sanity/lib/events";
import { EventFilters } from "./event-filters";
import { PageIntro } from "../ui";
export const dynamic = "force-dynamic";
export default async function EventsPage() { const events = await getEvents(); return <><PageIntro eyebrow="What&apos;s on" title="Come through." copy="A calendar of rooms made for conversations, competition, culture and a little bit of magic." /><EventFilters events={events} /><section className="shell signup"><p className="eyebrow clay">Nothing missed</p><h2>Be first to know.</h2><p>New rooms, tickets and good things coming up in Nairobi.</p><form><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="Your email address" /><button className="button" type="submit">Keep me posted <span aria-hidden="true">→</span></button></form></section></>; }
