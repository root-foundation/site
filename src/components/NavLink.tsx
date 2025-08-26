import React from "react";
import Link from "next/link";
import styles from "./NavLink.module.css";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
  variant?: "default" | "black";
  className?: string;
}

export default function NavLink({
  href,
  children,
  isExternal = false,
  variant = "default",
  className = "",
}: NavLinkProps) {
  const linkClassName = variant === "black" ? styles.linkBlack : styles.link;
  const combinedClassName = `${linkClassName} ${className}`.trim();

  const linkProps = isExternal
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: combinedClassName,
      }
    : {
        href,
        className: combinedClassName,
      };

  if (isExternal) {
    return <a {...linkProps}>{children}</a>;
  }

  return <Link {...linkProps}>{children}</Link>;
}
