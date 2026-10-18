
import { useState } from "react";

function PrimaryBtn({
  children,
  onClick,
  variant = "white",
  size = "md",
  disabled = false,
  type = "button",
}) {
  const [hov, setHov] = useState(false);

  const px = size === "sm" ? "14px 20px" : "12px 30px";
  const fs = size === "sm" ? 12 : 13;

  const variants = {
    white: {
      bg: "#f5f5f5",
      hoverBg: "#e8e8e8",
      color: "#080808",
      border: "1px solid transparent",
    },
    ghost: {
      bg: "transparent",
      hoverBg: "#1c1c1c",
      color: "#888",
      hoverColor: "#ccc",
      border: "1px solid #252525",
    },
    green: {
      bg: "#3ddc84",
      hoverBg: "#2ec870",
      color: "#080808",
      border: "1px solid transparent",
    },
    outline: {
      bg: "transparent",
      hoverBg: "#151515",
      color: "#888",
      hoverColor: "#f5f5f5",
      border: "1px solid #333",
    },
  };

  const selected = variants[variant] || variants.white;
  const isHovered = hov && !disabled;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: isHovered ? selected.hoverBg : selected.bg,
        color: disabled
          ? "#555"
          : isHovered
            ? selected.hoverColor || selected.color
            : selected.color,
        border: selected.border,
        padding: px,
        borderRadius: 100,
        fontFamily: "Outfit, sans-serif",
        fontWeight: 700,
        fontSize: fs,
        letterSpacing: 0.4,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "all 0.18s ease",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
      }}
    >
      {children}
    </button>
  );
}

export default PrimaryBtn;
