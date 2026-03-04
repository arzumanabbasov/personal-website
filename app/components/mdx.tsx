import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

function Table({ data }) {
  if (!data || !data.headers || !data.rows) {
    return null
  }
  
  let headers = data.headers.map((header, index) => (
    <th key={index} className="border border-neutral-200 dark:border-neutral-700 px-3 py-2 text-left font-semibold">{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex} className="border border-neutral-200 dark:border-neutral-700 px-3 py-2">{cell}</td>
      ))}
    </tr>
  ))

  return (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-neutral-100 dark:bg-neutral-900">
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
  // If width and height are not provided, use unoptimized img tag
  if (!props.width || !props.height) {
    return <img alt={props.alt} className="rounded-lg" {...props} />
  }
  return (
    <Image 
      alt={props.alt} 
      className="rounded-lg" 
      style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
      {...props} 
    />
  )
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function YouTube({ id, title = 'YouTube video' }) {
  return (
    <div className="my-8 flex justify-center">
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      />
    </div>
  )
}

function Button({ href, children, variant = 'primary' }) {
  const styles = {
    primary: 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-300',
    secondary: 'border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800',
  }
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors mr-3 mb-3 no-underline ${styles[variant] || styles.primary}`}
    >
      {children}
    </a>
  )
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      React.createElement('a', {
        href: `#${slug}`,
        className: 'anchor',
      }, children)
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  YouTube,
  Button,
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
