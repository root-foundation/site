import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoCircleProps {
  size: number;
  color: string;
  profilePic?: string;
  style?: React.CSSProperties;
  thickness?: number;
}

const LogoCircle: React.FC<LogoCircleProps> = ({
  size,
  color,
  profilePic,
  style,
  thickness,
}) => {
  const strokeWidth = thickness !== undefined ? thickness : size * 0.1; // Use thickness param or default to 4px stroke for 40px diameter = 0.1 ratio

  return (
    <div
      style={{ ...styles.circleContainer, width: size, height: size, ...style }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={styles.circleSvg}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth / 2}
          fill={profilePic ? "none" : "transparent"}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </svg>
      {profilePic && (
        <Image
          src={profilePic}
          alt="Profile"
          width={size - strokeWidth * 2}
          height={size - strokeWidth * 2}
          style={{
            ...styles.profileImage,
            borderRadius: (size - strokeWidth * 2) / 2,
          }}
        />
      )}
    </div>
  );
};

interface LogoProps {
  size?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 40, color = "white" }) => {
  const overlap = size * 0.5; // -20px overlap for 40px diameter = 0.5 ratio

  return (
    <div style={styles.logoContainer}>
      <LogoCircle
        size={size}
        color={color}
        style={{ marginRight: -overlap / 2 }}
      />
      <LogoCircle
        size={size}
        color={color}
        style={{ marginLeft: -overlap / 2 }}
      />
    </div>
  );
};

interface LogoWithTextProps {
  color?: string;
}

const LogoWithText: React.FC<LogoWithTextProps> = ({ color = "white" }) => {
  return (
    <Link href="/" style={styles.logoWithTextLink}>
      <div style={styles.logoWithTextContainer}>
        <Logo size={16} color={color} />
        <span style={{ ...styles.logoText, color }}>RootNet</span>
      </div>
    </Link>
  );
};

const styles = {
  circleContainer: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  circleSvg: {
    position: "absolute" as const,
    top: 0,
    left: 0,
  },
  profileImage: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    objectFit: "cover" as const,
    filter: "grayscale(1)",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    padding: 0,
  },
  logoWithTextLink: {
    textDecoration: "none",
    cursor: "pointer",
    display: "block",
  },
  logoWithTextContainer: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    gap: "6px",
  },
  logoText: {
    fontSize: "16px",
    fontWeight: 460,
    margin: 0,
  },
};

export { LogoCircle, Logo, LogoWithText };
export default Logo;
