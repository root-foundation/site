import Navbar from "../components/Navbar";
import NavLink from "../components/NavLink";
import { Logo } from "../components/Logo";
import { HOME_PAGE_LINKS } from "../lib/links";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.figmaContainer}>
        <iframe
          className={styles.figmaIframe}
          width="1200"
          height="675"
          src="https://embed.figma.com/slides/cL0Oo6YFNrmNH9jqGDBVH2/RootNet?node-id=1-82&embed-host=share"
          allowFullScreen
          title="RootNet Slides"
        />
      </div>

      <div className={styles.linksContainer}>
        <div className={styles.mobileLogoContainer}>
          <Logo size={40} color="#000000" />
        </div>

        <div className={styles.allLinks}>
          {HOME_PAGE_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              variant={link.isBlack ? "black" : "default"}
              isExternal={link.isExternal}
              className={
                link.href === "/whitepaper" || link.href === "/ai"
                  ? styles.navbarDuplicateLink
                  : ""
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
