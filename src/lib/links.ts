export interface LinkConfig {
  label: string;
  href: string;
  isExternal?: boolean;
  isBlack?: boolean;
}

// Main navigation links (appear in main navbar)
export const MAIN_NAV_LINKS: LinkConfig[] = [
  {
    label: "Whitepaper",
    href: "/whitepaper",
    isBlack: true,
  },
  {
    label: "AI",
    href: "/ai",
    isBlack: true,
  },
];

// Home page links (appear on landing page)
export const HOME_PAGE_LINKS: LinkConfig[] = [
  {
    label: "Whitepaper",
    href: "/whitepaper",
    isBlack: true,
  },
  {
    label: "On AI",
    href: "/ai",
    isBlack: true,
  },
  {
    label: "Deck",
    href: "https://www.figma.com/deck/cL0Oo6YFNrmNH9jqGDBVH2/RootNet?node-id=1-82&t=SbFLkJf1lxJFINDu-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    isExternal: true,
    isBlack: true,
  },
  {
    label: "Follow",
    href: "https://x.com/onrootnet",
    isExternal: true,
    isBlack: false,
  },
  {
    label: "Source",
    href: "https://github.com/root-foundation",
    isExternal: true,
    isBlack: false,
  },
];

// Footer links
export const FOOTER_LINKS: LinkConfig[] = [
  {
    label: "Source",
    href: "https://github.com/root-foundation",
    isExternal: true,
    isBlack: false,
  },
  {
    label: "Get notified",
    href: "",
    isExternal: true,
    isBlack: true,
  },
  {
    label: "Follow",
    href: "https://x.com/onrootnet",
    isExternal: true,
    isBlack: false,
  },
];

// Special links
export const LOGO_LINK: LinkConfig = {
  label: "Home",
  href: "/",
};

// Helper function to determine if a link is external based on href
export function isExternalLink(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  );
}

// Helper function to get link props with automatic external detection
export function getLinkProps(linkConfig: LinkConfig) {
  const isExternal = linkConfig.isExternal ?? isExternalLink(linkConfig.href);

  return {
    href: linkConfig.href,
    isExternal,
    children: linkConfig.label,
  };
}
