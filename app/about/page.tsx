import { PageIntro } from "../ui";
import { AboutGallery } from "./about-gallery";
import { getAboutImages } from "../../sanity/lib/content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const aboutImages = await getAboutImages();

  return <><PageIntro eyebrow="Our story" title="A community of communities." copy="Hadithi means story. Ours is about bringing people together around the ones worth sharing." /><section className="shell about-story"><AboutGallery images={aboutImages} /><div><p>Hadithi Events started with a simple belief: Nairobi has no shortage of good people, good ideas, or good reasons to gather.</p><p>We make the rooms that help those things meet. Sometimes that&apos;s a live podcast. Sometimes it&apos;s a runway, a tournament, a wedding, or the team event that changes how a company feels about itself.</p><p>Always, it&apos;s made with care.</p></div></section></>;
}
