import Navbar from "../components/Navbar";
import NavLink from "../components/NavLink";
import { Logo } from "../components/Logo";
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
          <NavLink
            href="/whitepaper"
            variant="black"
            className={styles.navbarDuplicateLink}
          >
            Whitepaper
          </NavLink>
          <NavLink
            href="/ai"
            variant="black"
            className={styles.navbarDuplicateLink}
          >
            On AI
          </NavLink>
          <NavLink href="#presentation" variant="black">
            Deck
          </NavLink>
          <NavLink href="/notify" isExternal variant="black">
            Get notified
          </NavLink>
          <NavLink href="https://twitter.com" isExternal>
            Follow
          </NavLink>
          <NavLink href="https://github.com" isExternal>
            Source
          </NavLink>
        </div>
      </div>
    </div>
  );
}
