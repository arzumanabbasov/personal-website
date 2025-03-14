import { Icons } from "@/components/icons";
import { Description } from "@radix-ui/react-dialog";
import { url } from "inspector";
import { HomeIcon, NotebookIcon, ThumbsDown, VideoIcon, FolderIcon } from "lucide-react";
import { title } from "process";

export const DATA = {
  name: "Arzuman Abbasov",
  initials: "PN",
  url: "https://github.com/arzumanabbasov",
  location: "Baku, Azerbaijan",
  locationLink: "https://www.google.com/maps/place/odisha",
  description:
    "Mahcine Learning Engineer",
  summary: "I am a data scientist and aspiring entrepreneur with a focus on AI, MLOps, and operational research. Currently, I am working in the banking industry, specifically at [Kapital Bank](https://www.kapitalbank.az), where I am enhancing my business knowledge and working towards integrating AI to replace traditional business roles.",
  avatarUrl: "/hi.webp",
  skills: [
    "Python",
    "PostgreSQL",
    "Scala",
    "Tensorflow",
    "Power BI",
    "MongoDB",
    "Torch",
    "git",
    "Linux",
    "RestAPI",
    "AI API",
    "Machine Learning",
    "Data Science",
    "Cloud Computing",
    "MLOps",
    "AI Engineering",
    "Agile Software Development"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/projects", icon: FolderIcon, label: "Projects" },
    { href: "https://arzumanabbasov.gumroad.com/", icon: Icons.shop, label: "Gadgets" },
    //{ href: "/chat", icon: Icons.openai, label: "Chat"}
  ],
  contact: {
    email: "a.arzuman313@gmail.com",
    tel: "+994 50 709 04 18",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/arzumanabbasov",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/arzuman/",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:a.arzuman313@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Kapital Bank",
      href: "https://kapitalbank.az",
      badges: [],
      location: "Baku, Azerbaijan",
      title: "Data Scientist",
      logoUrl: "/kapitalbank.png",
      start: "2024",
      end: "Present",
      description:
        "Worked on document processing systems, optimizing storage and conversion pipelines for diverse document formats. Explored database solutions to efficiently store and retrieve structured and unstructured financial documents.",
    },
    {
      company: "BIRainy",
      href: "https://birainy.com",
      badges: [],
      location: "Baku, Azerbaijan",
      title: "Data Scientist",
      logoUrl: "/birainy.png",
      start: "2023",
      end: "2024",
      description:
        "Developed fraud detection models, optimized financial transaction routes, and contributed to AI-driven business intelligence solutions. Worked on predictive modeling projects that improved decision-making in financial analytics.",
    },
  ],

  education: [
    {
      school: "Azerbaijan State Oil and Industry University",
      href: "https://asoiu.edu.az/",
      degree: "B.Tech in Infomation Technology",
      logoUrl: "https://www.timeshighereducation.com/sites/default/files/asoiu_logo_dark_2.png",
      start: "2021",
      end: "2025",
    },
  ],
  projects: [
    {
      title: "Wallpaper App",
      href: "https://www.wallpaperz.in/",
      dates: "January 2025 - February 2025",
      active: true,
      description:
        "A modern wallpaper discovery platform where you can find stunning wallpapers and generate images with AI.",
      technologies: [
        "Next.js",
        "Git",
        "TailwindCSS",
        "Framer-motion",
        "TypeScript",
        "Imagekit",
        "shadcnUI",
        "DreamStudio",
        "Stability AI",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.wallpaperz.in/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/StarKnightt/wallpaperz",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://video.gumlet.io/6745e593080b60408ca085f7/67c1a4d7db58848016a8b73e/download.mp4",
    },
  ],
} as const;
