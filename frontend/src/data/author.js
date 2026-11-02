// Named author for all editorial content. Google's quality guidelines for
// finance (YMYL) content expect a real person, not an organization.
// Edit the fields below — every article, guide and schema picks them up.

export const AUTHOR = {
  name: "Kashif Mahi",
  jobTitle: "Founder & Editor, Cavicord",
  bio: "Kashif founded Cavicord to make comparing certificates of deposit as simple as comparing airfares. He checks each listed APY against the bank's or credit union's own published rate page, shows the date each table was last verified, and writes the site's guides and articles.",
  url: "/about#author",
  sameAs: ["https://github.com/kashifmahi"],
};

export const authorSchema = (siteUrl) => ({
  "@type": "Person",
  name: AUTHOR.name,
  jobTitle: AUTHOR.jobTitle,
  description: AUTHOR.bio,
  url: `${siteUrl}${AUTHOR.url}`,
  sameAs: AUTHOR.sameAs,
  worksFor: { "@type": "Organization", name: "Cavicord", url: siteUrl },
});

export const publisherSchema = (siteUrl) => ({
  "@type": "Organization",
  name: "Cavicord",
  legalName: "Zodic LLC",
  url: siteUrl,
  logo: { "@type": "ImageObject", url: `${siteUrl}/logo192.png` },
});
