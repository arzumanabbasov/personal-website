import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { getProjects } from 'app/projects/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let projects = getProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  let project = getProjects().find((project) => project.slug === slug)
  if (!project) {
    return
  }

  let {
    title,
    summary: description,
    image,
  } = project.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${baseUrl}/projects/${project.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Project({ params }) {
  const { slug } = await params
  let project = getProjects().find((project) => project.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            headline: project.metadata.title,
            description: project.metadata.summary,
            image: project.metadata.image
              ? `${baseUrl}${project.metadata.image}`
              : `/og?title=${encodeURIComponent(project.metadata.title)}`,
            url: `${baseUrl}/projects/${project.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {project.metadata.title}
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 mb-8">
        {project.metadata.summary}
      </p>
      {(project.metadata.demo || project.metadata.github) && (
        <div className="flex gap-4 mb-8">
          {project.metadata.demo && (
            <a
              href={project.metadata.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Demo
            </a>
          )}
          {project.metadata.github && (
            <a
              href={project.metadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
      )}
      <article className="prose">
        <CustomMDX source={project.content} />
      </article>
    </section>
  )
}
