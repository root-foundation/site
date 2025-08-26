"use client";

import { useEffect, useRef } from "react";

interface MermaidRendererProps {
  content: string;
}

export default function MermaidRenderer({ content }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderMermaid = async () => {
      if (!containerRef.current) return;

      try {
        // Dynamic import to avoid SSR issues
        const mermaid = (await import("mermaid")).default;

        // Initialize mermaid with configuration
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          themeVariables: {
            fontFamily: "var(--font-inter, sans-serif)",
          },
        });

        // Set content only if not already set
        if (containerRef.current.innerHTML !== content) {
          containerRef.current.innerHTML = content;
        }

        // Find all mermaid diagrams and render them
        const diagrams = containerRef.current.querySelectorAll(".mermaid");

        for (let i = 0; i < diagrams.length; i++) {
          const diagram = diagrams[i] as HTMLElement;
          const diagramText = diagram.textContent || "";

          if (diagramText.trim() && !diagram.getAttribute("data-processed")) {
            try {
              const diagramId = `diagram-${Date.now()}-${i}`;
              const { svg } = await mermaid.render(diagramId, diagramText);
              diagram.innerHTML = svg;
              diagram.setAttribute("data-processed", "true");

              // Ensure the rendered SVG is visible and properly sized
              const svgElement = diagram.querySelector("svg");
              if (svgElement) {
                svgElement.style.height = "auto";
                svgElement.style.display = "block";

                // Only constrain width on larger screens, allow natural size on mobile
                if (window.innerWidth > 1024) {
                  svgElement.style.maxWidth = "100%";
                  svgElement.style.width = "100%";
                }
              }
            } catch (error) {
              console.error("Error rendering mermaid diagram:", error);
              diagram.innerHTML = `<div style="color: red; border: 1px solid red; padding: 1rem; border-radius: 4px;">
                Error rendering diagram: ${
                  error instanceof Error ? error.message : "Unknown error"
                }
              </div>`;
            }
          }
        }
      } catch (error) {
        console.error("Error loading mermaid:", error);
      }
    };

    // Add a small delay to ensure DOM is stable before rendering
    const timeoutId = setTimeout(() => {
      renderMermaid();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [content]);

  return <div ref={containerRef} style={containerStyle} />;
}

// Organized styles below the component
const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  overflowX: "auto", // Allow horizontal scrolling for large diagrams
  boxSizing: "border-box",
};
