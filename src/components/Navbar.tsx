import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        {/* Logo */}
        <Link href="/" style={styles.logoLink}>
          <Logo size={28} color="#000000" />
        </Link>

        {/* Navigation Links for landing page */}
        <div style={styles.navLinks}>
          <NavLink href="/whitepaper" variant="black">
            Whitepaper
          </NavLink>
          <NavLink href="/ai" variant="black">
            AI
          </NavLink>
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
