export type EventLink = {
  label: string;
  url: string;
};

export type Event = {
  name: string;
  category: "Podcast" | "Fashion" | "Sport" | "Community";
  date: string;
  venue: string;
  description: string;
  image: string;
  ticketUrl: string;
  status: "Upcoming" | "Past";
  // Watch / listen links for the event: YouTube, Spotify, Apple Podcasts, and so on.
  mediaLinks: EventLink[];
};

export const events: Event[] = [
  {
    name: "Ajani Open Podcast — Episode 01",
    category: "Podcast",
    date: "21 August 2026",
    venue: "Antler, Westlands",
    description: "A live conversation for the people shaping Nairobi, with audience Q&A after the show.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=85",
    ticketUrl: "https://www.moohk.com",
    status: "Upcoming",
    mediaLinks: [],
  },
  {
    name: "Hadithi Runway — Volume 01",
    category: "Fashion",
    date: "30 August 2026",
    venue: "Nairobi Street Kitchen",
    description: "A fresh fashion room: independent designers, good music, and the city in one place.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
    ticketUrl: "https://www.moohk.com",
    status: "Upcoming",
    mediaLinks: [],
  },
  {
    name: "Hadithi Padel: Corporate Connect",
    category: "Sport",
    date: "12 September 2026",
    venue: "Nairobi Padel Club",
    description: "A social, competitive day built for teams that like to play hard and connect well.",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=85",
    ticketUrl: "#contact",
    status: "Upcoming",
    mediaLinks: [],
  },
];

export const services = [
  { number: "01", name: "Corporate", copy: "Launches, off-sites, conferences, brand moments, and the details that make people remember them." },
  { number: "02", name: "Weddings", copy: "A celebration that feels unmistakably yours—from the first moodboard to the last dance." },
  { number: "03", name: "Sports & tournaments", copy: "Competition, community and hospitality designed to run without a hitch." },
  { number: "04", name: "Private & personal", copy: "Birthdays, dinners, milestones and the kind of gathering people talk about afterwards." },
];
