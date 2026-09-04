import { PageIntro } from "../ui";
import { QuoteForm } from "./quote-form";
import { getSiteSettings, whatsappUrl } from "../../sanity/lib/content";

export const dynamic = "force-dynamic";

export default async function QuotePage() {
  const settings = await getSiteSettings();
  const chatUrl = whatsappUrl(settings.whatsAppNumber);

  return <>
    <PageIntro eyebrow="Plan with us" title="Tell us what you&apos;re imagining." copy="A few details are enough to get started. We&apos;ll get back to you within two working days." />
    <section className="shell form-layout">
      <QuoteForm whatsappUrl={chatUrl} />
      <aside>
        <span>What happens next</span>
        <h2>We&apos;ll pick up the conversation.</h2>
        <p>We&apos;ll review your brief, find the right shape for it, and come back with clear next steps.</p>
        <a href={chatUrl} target="_blank" rel="noreferrer">Prefer WhatsApp? Chat with us →</a>
      </aside>
    </section>
  </>;
}
