import React from "react";
import NavLink from "./NavLink";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <NavLink href="https://github.com" isExternal>
          Source
        </NavLink>
        <NavLink href="/notify" isExternal variant="black">
          Get notified
        </NavLink>
        <NavLink href="https://twitter.com" isExternal>
          Follow
        </NavLink>
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
