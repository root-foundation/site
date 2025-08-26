import React from "react";
import NavLink from "./NavLink";
import { FOOTER_LINKS } from "../lib/links";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        {FOOTER_LINKS.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            isExternal={link.isExternal}
            variant={link.isBlack ? "black" : "default"}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    position: "fixed" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: "60px",
    backgroundColor: "#fbfbfb",
    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footerContent: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
};
