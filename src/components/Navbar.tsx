import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import NavLink from "./NavLink";

interface NavbarProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export default function Navbar({ onMenuToggle, isMenuOpen }: NavbarProps) {
  const isEssayPage = onMenuToggle !== undefined;

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        {/* Logo */}
        <Link href="/" style={styles.logoLink}>
          <Logo size={28} color="#000000" />
        </Link>

        {/* Conditional content based on page type */}
        {isEssayPage ? (
          /* Menu button for essay pages */
          <button
            onClick={onMenuToggle}
            style={{
              ...styles.menuButton,
              ...(isMenuOpen ? styles.menuButtonOpen : {}),
            }}
            type="button"
            aria-label="Toggle menu"
          >
            <div style={styles.menuIcon}>
              <span
                style={{
                  ...styles.menuLine,
                  ...(isMenuOpen ? styles.menuLineTopOpen : {}),
                }}
              ></span>
              <span
                style={{
                  ...styles.menuLine,
                  ...(isMenuOpen ? styles.menuLineMiddleOpen : {}),
                }}
              ></span>
              <span
                style={{
                  ...styles.menuLine,
                  ...(isMenuOpen ? styles.menuLineBottomOpen : {}),
                }}
              ></span>
            </div>
          </button>
        ) : (
          /* Navigation Links for landing page */
          <div style={styles.navLinks}>
            <NavLink href="/whitepaper">Whitepaper</NavLink>
            <NavLink href="/ai">AI</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    height: "60px",
    backgroundColor: "#fbfbfb",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
    zIndex: 200,
    display: "block",
  },
  navContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    padding: "0 20px",
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
  menuButton: {
    backgroundColor: "transparent",
    border: "none",
    padding: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    transition: "background-color 0.2s ease",
  },
  menuButtonOpen: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  menuIcon: {
    width: "24px",
    height: "18px",
    position: "relative" as const,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
  },
  menuLine: {
    width: "100%",
    height: "2px",
    backgroundColor: "#000000",
    borderRadius: "1px",
    transition: "all 0.3s ease",
    transformOrigin: "center",
  },
  menuLineTopOpen: {
    transform: "translateY(8px) rotate(45deg)",
  },
  menuLineMiddleOpen: {
    opacity: 0,
  },
  menuLineBottomOpen: {
    transform: "translateY(-8px) rotate(-45deg)",
  },
};
