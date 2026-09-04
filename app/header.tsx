"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { InstagramIcon } from "./ui";

const links = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

export function Header({ whatsappUrl, instagramUrl }: { whatsappUrl: string; instagramUrl: string }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`site-header${isMenuOpen ? " menu-open" : ""}`}>
      <div className="shell nav">
        <Link className="logo" href="/">
          {/* plain img on purpose: next/image optimisation is not wired up on the Cloudflare runtime */}
          <img alt="" className="logo-mark" height={44} src="/logo-mark.png" width={44} />
          <span className="logo-word">Hadithi<span className="logo-dot">.</span>Events</span>
        </Link>
        <button
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="menu-toggle"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={isMenuOpen ? "mobile-nav is-open" : "mobile-nav"} id="mobile-menu" aria-label="Main navigation">
          {links.map((link) => (
            <Link className={pathname === link.href ? "active" : undefined} href={link.href} key={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a aria-label="Hadithi Events on Instagram" className="icon-link mobile-instagram" href={instagramUrl} target="_blank" rel="noreferrer">
            <InstagramIcon /> <span>Instagram</span>
          </a>
          <a className="button button-small mobile-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
        </nav>
        <div className="nav-actions">
          <a aria-label="Hadithi Events on Instagram" className="icon-link desktop-instagram" href={instagramUrl} target="_blank" rel="noreferrer">
            <InstagramIcon />
          </a>
          <a className="button button-small desktop-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
        </div>
      </div>
    </header>
  );
}
