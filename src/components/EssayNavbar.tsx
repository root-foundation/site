import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { LOGO_LINK } from "../lib/links";

interface EssayNavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function EssayNavbar({
  onMenuToggle,
  isMenuOpen,
}: EssayNavbarProps) {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        {/* Logo */}
        <Link href={LOGO_LINK.href} style={styles.logoLink}>
          <Logo size={28} color="#000000" />
        </Link>

        {/* Menu button */}
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
    padding: 16,
    zIndex: 200,
    display: "block",
    backgroundColor: "rgba(252, 252, 252, 0.8)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
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
