"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

interface NavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function Navbar({ onMenuToggle, isMenuOpen }: NavbarProps) {
  const handleMenuClick = () => {
    onMenuToggle();
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        {/* Logo */}
        <Link href="/" style={styles.logoLink}>
          <Logo size={28} color="#000000" />
        </Link>

        {/* Menu Toggle Button */}
        <button
          onClick={handleMenuClick}
          style={styles.menuButton}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            data-testid="geist-icon"
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            style={styles.menuIcon}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.75 4H1V5.5H1.75H14.25H15V4H14.25H1.75ZM1.75 10.5H1V12H1.75H14.25H15V10.5H14.25H1.75Z"
              fill="currentColor"
            />
          </svg>
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
  menuButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    transition: "background-color 0.2s ease",
  },
  menuIcon: {
    color: "#000000",
  },
};
