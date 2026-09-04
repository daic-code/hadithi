import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./header";
import { Footer } from "./ui";
import { getSiteSettings, whatsappUrl } from "../sanity/lib/content";

export const metadata: Metadata = {
  title: "Hadithi Events | Events worth showing up for",
  description: "Event planning and production in Nairobi, Kenya.",
  openGraph: {
    title: "Hadithi Events | Events worth showing up for",
    description: "Event planning and production in Nairobi, Kenya.",
    images: ["/logo-full.png"],
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const chatUrl = whatsappUrl(settings.whatsAppNumber);

  return (
    <html lang="en">
      <body>
        <Header instagramUrl={settings.instagramUrl} whatsappUrl={chatUrl} />
        <main>{children}</main>
        <Footer businessEmail={settings.businessEmail} instagramUrl={settings.instagramUrl} whatsappUrl={chatUrl} />
      </body>
    </html>
  );
}
