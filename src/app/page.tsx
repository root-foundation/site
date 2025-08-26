"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if we should show the presentation (desktop only)
  const shouldShowPresentation = windowWidth > 768; // Hide on mobile/tablet

  return (
    <div style={containerStyle}>
      <Navbar />

      <main style={mainStyle}>
        {shouldShowPresentation ? (
          <div style={figmaContainer}>
            <iframe
              style={figmaIframeStyle}
              width="1200"
              height="675"
              src="https://embed.figma.com/slides/cL0Oo6YFNrmNH9jqGDBVH2/RootNet?node-id=1-82&embed-host=share"
              allowFullScreen
              title="RootNet Slides"
            />
          </div>
        ) : (
          <div style={mobilePlaceholderStyle}>
            <h2 style={mobileTitleStyle}>RootNet</h2>
            <p style={mobileDescriptionStyle}>
              View the full presentation on desktop for the best experience.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#fafafa",
  fontFamily:
    'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  display: "flex",
  flexDirection: "column",
  paddingTop: "60px", // Account for fixed navbar
  paddingBottom: "60px", // Account for fixed footer
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem 1rem",
  minHeight: "calc(100vh - 120px)", // Ensure enough space for the iframe
};

const figmaContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px",
};

const figmaIframeStyle: React.CSSProperties = {
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "1200px",
  height: "675px",
  minHeight: "500px",
};

// Mobile placeholder styles
const mobilePlaceholderStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "3rem 2rem",
  maxWidth: "600px",
  margin: "0 auto",
};

const mobileTitleStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  fontWeight: "700",
  color: "#333",
  marginBottom: "1rem",
  fontFamily: "inherit",
};

const mobileDescriptionStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  color: "#666",
  lineHeight: "1.6",
  fontFamily: "inherit",
};
