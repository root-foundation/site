"use client";

import React, { useState, useEffect } from "react";
import styles from "./EssayPage.module.css";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import MermaidRenderer from "./MermaidRenderer";

interface EssayPageProps {
  title: string;
  content: string;
}

export default function EssayPage({ title, content }: EssayPageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    // Check on initial load
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div
      className={`${styles.container} ${
        isMobile && isSidebarOpen ? styles.sidebarOpen : ""
      }`}
    >
      {/* Show navbar only on mobile */}
      {isMobile && (
        <Navbar onMenuToggle={handleMenuToggle} isMenuOpen={isSidebarOpen} />
      )}

      {/* Sidebar - desktop always visible, mobile overlay when open */}
      <SideBar
        content={content}
        isOpen={isMobile ? isSidebarOpen : true}
        onClose={handleSidebarClose}
        isMobile={isMobile}
      />

      <div className={styles.contentContainer}>
        <main className={styles.main}>
          <div className={styles.content}>
            <MermaidRenderer content={content} />
          </div>
        </main>
      </div>
    </div>
  );
}
