export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Azur Lane DB",
  description: "A custom frontend database from the official Azur Lane wiki.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "dev1",
      href: "/dev1",
      dev: true,
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
