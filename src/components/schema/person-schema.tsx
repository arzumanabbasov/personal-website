import { DATA } from "@/data/resume";

export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Arzuman Abbasov",
          alternateName: ["Arzuman", "Abbasov"],
          description: DATA.description,
          image: `public/me.png`,
          url: DATA.url,
          sameAs: [
            DATA.contact.social.GitHub.url,
            DATA.contact.social.LinkedIn.url,
          ],
          jobTitle: "Machine Learning Engineer",
          worksFor: {
            "@type": "Organization",
            name: "Kapital Bank"
          },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Azerbaijan State Oil and Industry Univeristy"
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Baku",
            addressCountry: "Azerbaijan"
          },
          email: DATA.contact.email,
          telephone: DATA.contact.tel,
          knowsAbout: DATA.skills
        })
      }}
    />
  );
}
