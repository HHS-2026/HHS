
function Divider({ label, color = "#1a1a1a", labelColor = "#666" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "8px 0",
        width: "100%",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          flex: 1,
          height: 1,
          background: color,
        }}
      />

      {label && (
        <span
          style={{
            fontSize: 10,
            color: labelColor,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {label}
        </span>
      )}

      <div
        aria-hidden="true"
        style={{
          flex: 1,
          height: 1,
          background: color,
        }}
      />
    </div>
  );
}

export default Divider;
