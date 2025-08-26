"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import styles from "./SideBar.module.css";

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

interface SideBarProps {
  content: string;
}

export default function SideBar({ content }: SideBarProps) {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>(
    []
  );
  const [activeId, setActiveId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    // Parse the HTML content to extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Only get H2 tags for the table of contents
    const h2Headings = doc.querySelectorAll("h2");

    const toc: TableOfContentsItem[] = Array.from(h2Headings).map(
      (heading) => ({
        id: heading.id || "",
        text: heading.textContent || "",
        level: 2, // All are H2s now
      })
    );

    setTableOfContents(toc);

    // Extract the first H1 as the title
    const firstH1 = doc.querySelector("h1");
    if (firstH1) {
      setTitle(firstH1.textContent || "");
    }
  }, [content]);

  useEffect(() => {
    if (tableOfContents.length === 0) return;

    // Set up intersection observer to track which heading is active
    const observerOptions = {
      rootMargin: "-150px 0px -75% 0px", // More conservative margins to reduce conflicts with scroll handler
      threshold: 0.1, // Small threshold to ensure we only trigger on meaningful intersections
    };

    let lastActiveId = "";

    const updateActiveId = (newActiveId: string) => {
      if (newActiveId !== lastActiveId) {
        lastActiveId = newActiveId;
        setActiveId(newActiveId);
      }
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Only react to entries that are becoming visible, not those leaving
      const enteringEntries = entries.filter(
        (entry) => entry.isIntersecting && entry.intersectionRatio > 0
      );

      if (enteringEntries.length > 0) {
        // Sort by position in the document (top to bottom)
        enteringEntries.sort((a, b) => {
          const rectA = a.boundingClientRect;
          const rectB = b.boundingClientRect;
          return rectA.top - rectB.top;
        });

        // Set the topmost intersecting heading as active
        const topEntry = enteringEntries[0];
        updateActiveId(topEntry.target.id);
      }
      // Don't do anything when headings leave the intersection zone
      // Let the scroll handler manage that
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all headings
    tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Add scroll listener for immediate updates
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Find the current active heading based on scroll position
      let activeHeadingId: string | null = null;

      // Find the last heading that has been scrolled past (+ some buffer)
      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const item = tableOfContents[i];
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const headingTop = rect.top + scrollTop;

          // If this heading is above or near the top of the viewport (with 150px buffer)
          if (headingTop <= scrollTop + 150) {
            activeHeadingId = element.id;
            break; // Found the active heading, stop looking
          }
        }
      }

      // If no heading is found above the viewport, use the first one
      if (!activeHeadingId && tableOfContents.length > 0) {
        activeHeadingId = tableOfContents[0].id;
      }

      if (activeHeadingId) {
        updateActiveId(activeHeadingId);
      }
    };

    // Throttle scroll events for better performance
    let scrollTimeout: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 5); // Faster response time
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Initial check
    handleScroll();

    // Handle URL hash on page load
    const handleInitialHash = () => {
      const hash = window.location.hash.substring(1); // Remove the # symbol
      if (hash && tableOfContents.some((item) => item.id === hash)) {
        // Small delay to ensure content is rendered
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const elementRect = element.getBoundingClientRect();
            const offsetTop = elementRect.top + window.pageYOffset - 100;
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
            setActiveId(hash);
          }
        }, 100);
      }
    };

    // Check for hash on initial load
    handleInitialHash();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", throttledHandleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [tableOfContents]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset to account for visual positioning
      const elementRect = element.getBoundingClientRect();
      const offsetTop = elementRect.top + window.pageYOffset - 100; // 100px offset for better visual alignment

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Update the URL with the hash
      const newUrl = `${window.location.pathname}${window.location.search}#${id}`;
      window.history.pushState(null, "", newUrl);

      // Immediately set active to provide instant feedback
      setActiveId(id);
    }
  };

  const handleTitleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Remove hash from URL when going back to top
    const newUrl = `${window.location.pathname}${window.location.search}`;
    window.history.pushState(null, "", newUrl);
  };

  const handleTocScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 0);
  };

  if (tableOfContents.length === 0) {
    return null;
  }

  return (
    <nav className={styles.sidebar}>
      {/* Top Section */}
      <div className={styles.topSection}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logoLink}>
            <Logo size={28} color="#000000" />
          </Link>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Title Section */}
        <div className={styles.titleSection}>
          <button
            className={styles.titleButton}
            onClick={handleTitleClick}
            type="button"
          >
            {title}
          </button>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>
      </div>

      {/* Bottom Section - Table of Contents */}
      <div
        className={`${styles.bottomSection} ${
          isScrolled ? styles.bottomSectionScrolled : ""
        }`}
        onScroll={handleTocScroll}
      >
        <div className={styles.tocList}>
          {tableOfContents.map((item) => (
            <div
              key={item.id}
              className={`${styles.tocItem} ${styles.tocItemH2} ${
                activeId === item.id ? styles.tocItemActive : ""
              }`}
            >
              <button
                className={styles.tocLink}
                onClick={() => handleClick(item.id)}
                type="button"
              >
                {item.text}
              </button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
