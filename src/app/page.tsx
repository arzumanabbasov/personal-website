import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { PersonSchema } from "@/components/schema/person-schema";
import { Metadata } from 'next';
import { Icons } from "@/components/icons";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { SocialIconLink } from "@/components/social-icon-link";
import { BlogSkeleton } from "@/components/skeletons/blog-skeleton";

const BLUR_FADE_DELAY = 0.04;

export const metadata: Metadata = {
  title: DATA.name,
  description: DATA.summary,
  openGraph: {
    title: DATA.name,
    description: DATA.summary,
    url: DATA.url,
    siteName: DATA.name,
    images: [
      {
        url: 'https://prasen.dev/me.png',
        width: 1200,
        height: 630,
        alt: `${DATA.name}'s Portfolio`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DATA.name,
    description: DATA.summary,
    creator: '@' + 'Star_Knight12',
    images: ['https://prasen.dev/portfolio.png'],
  },
};

const BlogCard = dynamic(() => import("@/components/blog-card").then(mod => mod.BlogCard), {
  ssr: true,
  loading: () => <BlogSkeleton />
});

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <PersonSchema />
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="profile-wrapper">
                <Avatar className="size-28 relative z-10">
                  <AvatarImage
                    alt={DATA.name}
                    src={DATA.avatarUrl}
                    width={112}
                    height={112}
                    loading="eager"
                  />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>

      <section id="connect">
        <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Let's collaborate 🤝🏻</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {Object.entries(DATA.contact.social).map(([name, social], idx) => (
                <SocialIconLink
                  key={name}
                  name={name}
                  url={social.url}
                  icon={<social.icon />}
                  delay={BLUR_FADE_DELAY * 5 + idx * 0.05}
                />
              ))}
            </div>
          </div>
        </BlurFade>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="blogs">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Recent Blog Posts</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <div className="flex flex-col space-y-4">
              <BlogCard
                post={{
                  title: "Is Computer Science Saturated?",
                  publishedAt: "2024-06-18",
                  summary: "Blogs are preparing to launch. Stay tuned!",
                  slug: "hello-world"
                }}
              />
              <BlogCard
                post={{
                  title: "Web Developement for 2025: A Guide to what's next",
                  publishedAt: "2025-01-02",
                  summary: "Web Development has come a long way,let's know more about it",
                  slug: "web-development-2025"
                }}
              />
              <Link
                href="/blog"
                className="mt-4 block"
              >
                <RainbowButton
                  className="w-full sm:w-[160px] px-4 py-2 group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] font-bold text-sm"
                >
                  Read More Blogs
                </RainbowButton>
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
      <section>
        Here will be my live locationn map
      </section>
      <section id="experience">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                href={work.href}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.title}
                subtitle={work.company}
                description={work.description}
                period={`${work.start} - ${work.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Contact</h2>
            
            <p className="text-muted-foreground">
              Always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!
            </p>
            
            <div className="mt-6 space-y-4">
              <a
                href="mailto:prasen.nayak@hotmail.com"
                className="flex items-center gap-2 underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                <Icons.email className="size-4" />
                a.arzuman313@gmail.com
              </a>

              <a
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                <DATA.contact.social.LinkedIn.icon className="size-4" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </BlurFade>
      </section>
      <footer className="mt-20 border-t py-8">
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>© {new Date().getFullYear()} {DATA.name}. All rights reserved.</p>
              </div>
              <div className="flex space-x-4">
                <Link href="/sitemap.xml" className="text-sm text-muted-foreground hover:text-foreground">
                  Sitemap
                </Link>
                <Link href="/rss.xml" className="text-sm text-muted-foreground hover:text-foreground">
                  RSS
                </Link>
              </div>
            </div>
          </div>
        </BlurFade>
      </footer>
    </main>
  );
}