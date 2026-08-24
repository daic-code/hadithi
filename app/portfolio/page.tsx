import Link from "next/link";
import { getPortfolioItems } from "../../sanity/lib/content";
import { Arrow, PageIntro } from "../ui";

export const dynamic = "force-dynamic";
export default async function PortfolioPage() { const projects = await getPortfolioItems(); return <><PageIntro eyebrow="Past work" title="A record of good rooms." copy="Our own properties are where we test ideas, build community, and show exactly how we work." /><section className="shell project-grid">{projects.map((project) => <article className="project" key={project.title}><div style={{ backgroundImage: `url(${project.image})` }} /><p>{project.category}</p><h2>{project.title}</h2><Link className="text-link clay-link" href="/quote">Plan something like this <Arrow /></Link></article>)}</section><section className="shell quote-mark"><p>“The best events leave people with a story worth retelling.”</p></section></>; }
