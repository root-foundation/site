import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import NavLink from "./NavLink";
import { MAIN_NAV_LINKS, LOGO_LINK } from "../lib/links";

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        {/* Logo */}
        <Link href={LOGO_LINK.href} style={styles.logoLink}>
          <Logo size={28} color="#000000" />
        </Link>

        {/* Navigation Links for landing page */}
        <div style={styles.navLinks}>
          {MAIN_NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              variant={link.isBlack ? "black" : "default"}
              isExternal={link.isExternal}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: "relative" as const,
    padding: 0,
    zIndex: 200,
    display: "block",
  },
  navContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    maxWidth: "100%",
  },
  logoLink: {
    display: "block",
    textDecoration: "none",
    cursor: "pointer",
  },
  navLinks: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
};
