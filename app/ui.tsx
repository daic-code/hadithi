import Link from "next/link";

export function Arrow() { return <span aria-hidden="true">→</span>; }

export function Footer({ businessEmail, whatsappUrl }: { businessEmail: string; whatsappUrl: string }) {
  return <footer><div className="shell footer-inner">
    <Link className="logo" href="/">Hadithi<span>.</span>Events</Link>
    <div><a href={`mailto:${businessEmail}`}>{businessEmail}</a><span> · </span><a href={whatsappUrl}>WhatsApp</a></div>
    <div>© {new Date().getFullYear()} · Nairobi, Kenya</div>
  </div></footer>;
}

export function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="page-intro shell"><p className="eyebrow clay">{eyebrow}</p><h1>{title}</h1><p className="lead">{copy}</p></section>;
}

export function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-title"><p className="eyebrow clay">{eyebrow}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}
