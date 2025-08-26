import type { MDXComponents } from "mdx/types";
import React from "react";

// Utility function to generate id from text content
const generateId = (children: any): string => {
  const text =
    typeof children === "string"
      ? children
      : React.Children.toArray(children).join(" ");

  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

// Custom H1 component with lines on each side
const GrandTitle = ({ children, ...props }: any) => {
  const id = generateId(children);

  return (
    <div style={grandTitleContainerStyle}>
      <div style={lineStyle}></div>
      <h1 id={id} style={grandTitleStyle} {...props}>
        {children}
      </h1>
      <div style={lineStyle}></div>
    </div>
  );
};

// Custom H2 component with id
const SubTitle = ({ children, ...props }: any) => {
  const id = generateId(children);

  return (
    <h2 id={id} {...props}>
      {children}
    </h2>
  );
};

// Custom Image component with 100% width
const ResponsiveImage = ({ src, alt, ...props }: any) => {
  return (
    <img
      src={src}
      alt={alt || ""}
      style={{
        display: "block",
        width: "100%",
        maxWidth: 600,
        marginTop: "2rem",
        marginBottom: "2rem",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      {...props}
    />
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: GrandTitle,
    h2: SubTitle,
    img: ResponsiveImage,
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        target={href?.startsWith("#") ? "_self" : "_blank"}
        rel={href?.startsWith("#") ? undefined : "noopener noreferrer"}
        {...props}
      >
        {children}
      </a>
    ),
    hr: (props) => (
      <hr
        {...props}
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          marginTop: "3rem",
          marginBottom: "3rem",
          width: "100%",
        }}
      />
    ),
  };
}

// Organized styles below the component
const grandTitleContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  marginTop: "9rem",
  marginBottom: "3rem",
  gap: "2rem",
};

const grandTitleStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 500,
  letterSpacing: "-0.04em",
  textTransform: "uppercase",
  textAlign: "center",
  margin: 0,
  whiteSpace: "nowrap",
  flexShrink: 0,
};

const lineStyle: React.CSSProperties = {
  flex: 1,
  height: "1px",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  minWidth: "20px",
};
