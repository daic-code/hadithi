import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./header";
import { Footer } from "./ui";
import { getSiteSettings, whatsappUrl } from "../sanity/lib/content";

export const metadata: Metadata = {
  title: "Hadithi Events | Events worth showing up for",
  description: "Event planning and production in Nairobi, Kenya.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const chatUrl = whatsappUrl(settings.whatsAppNumber);

  return (
    <html lang="en">
      <body>
        <Header whatsappUrl={chatUrl} />
        <main>{children}</main>
        <Footer businessEmail={settings.businessEmail} whatsappUrl={chatUrl} />
      </body>
    </html>
  );
}
