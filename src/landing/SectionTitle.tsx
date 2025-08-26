import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

export default function SectionTitle({
  children,
  ...props
}: SectionTitleProps) {
  return (
    <h2 style={sectionTitleStyle} {...props}>
      {children}
    </h2>
  );
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 600,
  marginTop: "2rem",
  marginBottom: "1rem",
  color: "#1a202c",
};
