import Link from "next/link";

export default function Home() {
  return (
    <div style={containerStyle}>
      <main style={mainStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Root Foundation</h1>
          <p style={subtitleStyle}>Essays and Documentation</p>
        </div>

        <div style={essayLinksStyle}>
          <Link href="/whitepaper" style={linkStyle}>
            <div style={cardStyle}>
              <h2 style={cardTitleStyle}>Whitepaper</h2>
              <p style={cardDescStyle}>
                Technical whitepaper from the Root Foundation
              </p>
            </div>
          </Link>

          <Link href="/ai" style={linkStyle}>
            <div style={cardStyle}>
              <h2 style={cardTitleStyle}>AI Essay</h2>
              <p style={cardDescStyle}>Essay on AI from the Root Foundation</p>
            </div>
          </Link>
        </div>
      </main>
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
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
};

const mainStyle: React.CSSProperties = {
  maxWidth: "800px",
  width: "100%",
  textAlign: "center",
};

const headerStyle: React.CSSProperties = {
  marginBottom: "4rem",
};

const titleStyle: React.CSSProperties = {
  fontSize: "3rem",
  fontWeight: 700,
  color: "#1a202c",
  marginBottom: "1rem",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  color: "#4a5568",
  fontWeight: 400,
};

const essayLinksStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "2rem",
  maxWidth: "600px",
  margin: "0 auto",
};

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "inherit",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  cursor: "pointer",
  border: "1px solid #e2e8f0",
} as React.CSSProperties & {
  ":hover"?: React.CSSProperties;
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 600,
  color: "#1a202c",
  marginBottom: "0.5rem",
};

const cardDescStyle: React.CSSProperties = {
  fontSize: "1rem",
  color: "#4a5568",
  lineHeight: 1.5,
};
