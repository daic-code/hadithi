# Hadithi Events

A lightweight Next.js MVP for Hadithi Events, built from the supplied website brief.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Included routes

- `/` — Home
- `/services` — Event-planning services
- `/portfolio` — Past-work showcase
- `/events` — Upcoming-events calendar
- `/quote` — Quote-request form
- `/contact` and `/about`

## Content and launch settings

Upcoming events and services are centralized in `app/data.ts`, which makes the later CMS integration a contained change. Before launch, replace the placeholder WhatsApp number (`254700000000`), the email address, ticket URLs, and the temporary image URLs.

The quote form is deliberately presented but does not yet submit to a service: connect it to an email provider, CRM, or form handler once the preferred destination is chosen. The same applies to the newsletter form.

## CMS

The website is connected to the Hadithi Sanity project. Events are read from Sanity when published documents exist; until then, the starter events remain visible as a fallback.

The standalone editor is in `../studio-hadithi`. Run it with `npm run dev` from that folder, then open the local Studio URL it prints. The Studio contains content types for Events, Portfolio items, and Site settings. Create an **Event** document, publish it, and it will replace the starter event card on the website. Use the **Podcast** category for Ajani content.

The next step is to add the Studio's and deployed website's domains in Sanity's API CORS settings. Use `http://localhost:3333` for the local Studio and your deployed website URL when it is available.
