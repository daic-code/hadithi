import Link from "next/link";
import { services } from "../data";
import { Arrow, PageIntro, SectionTitle } from "../ui";

export default function ServicesPage() { return <>
  <PageIntro eyebrow="Plan with Hadithi" title="The work behind a room that feels effortless." copy="From first spark to final guest exit, we make events that carry your idea all the way through." />
  <section className="shell service-list">{services.map((service) => <article key={service.name}><span>{service.number}</span><div><h2>{service.name}</h2><p>{service.copy}</p></div><Link href="/quote" aria-label={`Plan a ${service.name.toLowerCase()} event`}><Arrow /></Link></article>)}</section>
  <section className="shell process block"><SectionTitle eyebrow="How we work" title="Choose the level of support you need." /><div className="process-grid"><article><span>01</span><h3>Planning</h3><p>Strategy, budgets, creative direction, suppliers and a proper run sheet.</p></article><article><span>02</span><h3>Production</h3><p>Everything in planning, plus on-site coordination so you can be in the moment.</p></article><article><span>03</span><h3>Full experience</h3><p>Creative concept through production, guests, talent and the details in between.</p></article></div></section>
  <section className="shell cta-panel"><p className="eyebrow">Let&apos;s talk details</p><h2>Bring us the brief.</h2><Link className="button light" href="/quote">Request a quote <Arrow /></Link></section>
</>; }
