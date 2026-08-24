import Link from "next/link";
import { services } from "./data";
import { getEvents } from "../sanity/lib/events";
import { Arrow, SectionTitle } from "./ui";

export const dynamic = "force-dynamic";

export default async function Home() {
  const events = await getEvents();
  return <>
    <section className="hero shell">
      <Link href="/services" className="hero-half hero-plan"><p className="eyebrow">For organisations & couples</p><h1>Plan an event<br />with us.</h1><p>Corporate activations, weddings, tournaments, and private celebrations—planned and produced end to end.</p><span className="text-link">Get a quote <Arrow /></span></Link>
      <div className="perforation" aria-hidden="true"><i /><i /></div>
      <Link href="/events" className="hero-half hero-attend"><p className="eyebrow">For everyone else</p><h1>Attend an<br />event.</h1><p>Ajani Open Podcast, Hadithi Runway, and more. Find your next good room.</p><span className="text-link">See what&apos;s on <Arrow /></span></Link>
    </section>

    <section className="shell story"><p className="eyebrow clay">Events with a point of view</p><div><h2>We make space for good things to happen.</h2><p>Hadithi is an independent events agency and a community of communities. We create our own rooms, then bring the same care, energy and calm production to yours.</p><Link className="text-link clay-link" href="/about">Our story <Arrow /></Link></div></section>

    <section className="shell block"><SectionTitle eyebrow="Proof, not promises" title="We build events people want to be part of." /><div className="proof-grid">
      <article className="proof-card ajani"><span>Ajani Open Podcast</span><h3>A live stage for big ideas.</h3><p>Monthly conversations with the people moving culture forward.</p></article>
      <article className="proof-card runway"><span>Hadithi Runway</span><h3>Fashion, staged properly.</h3><p>Designers, music and a uniquely Nairobi kind of energy.</p></article>
      <article className="proof-card padel"><span>Hadithi Padel</span><h3>Sport meets community.</h3><p>Corporate tournaments with competitive energy and a generous after-party.</p></article>
    </div></section>

    <section className="shell services-preview block"><div className="two-col"><SectionTitle eyebrow="Plan with Hadithi" title="We plan the event. You enjoy the room." copy="Whatever the brief, we lead the process from the first idea to the final pack-down." /><Link className="button outline" href="/services">How we work <Arrow /></Link></div><div className="service-pills">{services.map((service) => <Link href="/services" key={service.name}>{service.name} <Arrow /></Link>)}</div></section>

    <section className="events-band"><div className="shell"><div className="two-col"><SectionTitle eyebrow="On the calendar" title="Find your next good room." /><Link className="text-link" href="/events">All events <Arrow /></Link></div><div className="event-list">{events.slice(0, 2).map((event) => <Link className="event-row" href="/events" key={event.name}><span className="event-category">{event.category}</span><strong>{event.name}</strong><span>{event.date}<br />{event.venue}</span><Arrow /></Link>)}</div></div></section>

    <section className="shell cta-panel"><p className="eyebrow">Have something in mind?</p><h2>Let&apos;s make it<br />happen.</h2><Link className="button light" href="/quote">Start a conversation <Arrow /></Link></section>
  </>;
}
