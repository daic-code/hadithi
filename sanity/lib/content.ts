import { isSanityConfigured, logSanityFallback, sanityFetch, withoutEmptyValues } from "./client";
import { getEvents } from "./events";
import { cache } from "react";

export type PortfolioItem = {
  title: string;
  category: string;
  image: string;
};

export type SiteSettings = {
  businessEmail: string;
  whatsAppNumber: string;
  instagramUrl: string;
  aboutImage?: string;
  aboutImages?: string[];
};

const starterSiteSettings: SiteSettings = {
  businessEmail: "hadithievents@gmail.com",
  whatsAppNumber: "254768249081",
  instagramUrl: "https://www.instagram.com/hadithi_events",
};

function portfolioItemsFromPastEvents(events: Awaited<ReturnType<typeof getEvents>>): PortfolioItem[] {
  return events
    .filter((event) => event.status === "Past")
    .map((event) => ({
      title: event.name,
      category: `${event.category} · ${event.venue}`,
      image: event.image,
    }));
}

async function getPastEventPortfolio(): Promise<PortfolioItem[]> {
  const items = portfolioItemsFromPastEvents(await getEvents());
  return items.length ? items : starterPortfolio;
}

const starterPortfolio: PortfolioItem[] = [
  { title: "Hadithi Runway", category: "Fashion · Nairobi Street Kitchen", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85" },
  { title: "Ajani Open Podcast", category: "Live culture · Westlands", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=85" },
  { title: "Hadithi Padel", category: "Sport · Community", image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1400&q=85" },
];

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  if (!isSanityConfigured) {
    return getPastEventPortfolio();
  }

  try {
    const items = await sanityFetch<PortfolioItem[]>(`*[_type == "portfolioItem"] | order(eventDate desc) { title, "category": coalesce(category, "Past work"), "image": coverImage.asset->url }`);
    if (items.length) return items.map((item) => ({ ...item, image: item.image || starterPortfolio[0].image }));

    return getPastEventPortfolio();
  } catch {
    logSanityFallback("portfolio items");
    return getPastEventPortfolio();
  }
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!isSanityConfigured) return starterSiteSettings;

  try {
    const settings = await sanityFetch<Partial<SiteSettings> | null>(`*[_type == "siteSettings"][0] { businessEmail, whatsAppNumber, instagramUrl, "aboutImage": aboutImage.asset->url, "aboutImages": aboutImages[].asset->url }`);
    return { ...starterSiteSettings, ...withoutEmptyValues(settings) };
  } catch {
    logSanityFallback("site settings");
    return starterSiteSettings;
  }
});

export async function getAboutImages(): Promise<string[]> {
  const settings = await getSiteSettings();
  const images = settings.aboutImages?.filter(Boolean) || [];

  if (images.length) return images;
  if (settings.aboutImage) return [settings.aboutImage];

  return ["https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1300&q=85"];
}

// Accepts 0768249081, +254 768 249 081 or 254768249081 and always produces a wa.me link
// in international format. Kenyan numbers written with a leading 0 get the 254 country code.
export function whatsappUrl(number: string) {
  const digits = (number || "").replace(/\D/g, "");
  const international = digits.startsWith("0") ? `254${digits.slice(1)}` : digits;
  return `https://wa.me/${international}`;
}
