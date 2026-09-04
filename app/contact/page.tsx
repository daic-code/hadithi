import { InstagramIcon, PageIntro } from "../ui";
import { getSiteSettings, whatsappUrl } from "../../sanity/lib/content";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return <>
    <PageIntro eyebrow="Contact" title="Let&apos;s find a good reason to gather." copy="For a project, partnership, or a simple hello—we&apos;d love to hear from you." />
    <section className="shell contact-grid">
      <a className="contact-whatsapp" href={whatsappUrl(settings.whatsAppNumber)} target="_blank" rel="noreferrer">
        <p className="eyebrow">The quickest way</p>
        <h2>Chat on<br />WhatsApp →</h2>
        <span>We&apos;re usually quicker here.</span>
      </a>
      <div className="contact-details">
        <p className="eyebrow clay">Or write to us</p>
        <a href={`mailto:${settings.businessEmail}`}>{settings.businessEmail}</a>
        <p>Nairobi, Kenya</p>
        <p>For event planning, use our <a href="/quote">quote request form</a>.</p>
        <a className="icon-link contact-instagram" href={settings.instagramUrl} target="_blank" rel="noreferrer">
          <InstagramIcon /> <span>@hadithi_events</span>
        </a>
      </div>
    </section>
  </>;
}
