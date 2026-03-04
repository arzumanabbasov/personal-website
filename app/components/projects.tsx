import Link from 'next/link'
import { getProjects } from 'app/projects/utils'

export function Projects() {
  let allProjects = getProjects()

  return (
    <div>
      {allProjects.map((project) => (
        <Link
          key={project.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/projects/${project.slug}`}
        >
          <div className="w-full flex flex-col">
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {project.metadata.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {project.metadata.summary}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
