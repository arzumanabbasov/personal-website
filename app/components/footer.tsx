function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

const socialLinks = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/arzuman', label: 'LinkedIn' },
  { name: 'X', url: 'https://x.com/@arzumanfr', label: 'X' },
  { name: 'GitHub', url: 'https://github.com/arzumanabbasov', label: 'GitHub' },
  { name: 'Email', url: 'mailto:me@arzuman.co', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="mb-16 mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-700 relative z-10">
      <div className="flex gap-4 mb-8">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target={link.name === 'Email' ? undefined : '_blank'}
            rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            title={link.label}
          >
            <span className="text-sm">{link.name}</span>
            <ArrowIcon />
          </a>
        ))}
      </div>
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  )
}
