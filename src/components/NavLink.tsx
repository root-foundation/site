import React from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
}

export default function NavLink({
  href,
  children,
  isExternal = false,
}: NavLinkProps) {
  const linkProps = isExternal
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        style: linkStyle,
      }
    : {
        href,
        style: linkStyle,
      };

  if (isExternal) {
    return <a {...linkProps}>{children}</a>;
  }

  return <Link {...linkProps}>{children}</Link>;
}

const linkStyle: React.CSSProperties = {
  color: "#666",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 400,
  transition: "color 0.2s ease",
  cursor: "pointer",
};
