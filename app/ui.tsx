import Link from "next/link";

export function Arrow() { return <span aria-hidden="true">→</span>; }

export function InstagramIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
      <rect height="18" rx="5" stroke="currentColor" strokeWidth="1.8" width="18" x="3" y="3" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" fill="currentColor" r="1.2" />
    </svg>
  );
}

export function Footer({ businessEmail, whatsappUrl, instagramUrl }: { businessEmail: string; whatsappUrl: string; instagramUrl: string }) {
  return <footer><div className="shell footer-inner">
    <Link className="logo" href="/">
      <span className="logo-word">Hadithi<span className="logo-dot">.</span>Events</span>
    </Link>
    <div className="footer-links">
      <a href={`mailto:${businessEmail}`}>{businessEmail}</a>
      <span aria-hidden="true"> · </span>
      <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
      <span aria-hidden="true"> · </span>
      <a aria-label="Hadithi Events on Instagram" className="icon-link" href={instagramUrl} target="_blank" rel="noreferrer"><InstagramIcon /></a>
    </div>
    <div>© {new Date().getFullYear()} · Nairobi, Kenya</div>
  </div></footer>;
}

export function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="page-intro shell"><p className="eyebrow clay">{eyebrow}</p><h1>{title}</h1><p className="lead">{copy}</p></section>;
}

export function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-title"><p className="eyebrow clay">{eyebrow}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}
