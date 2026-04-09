function Footer() {
  return (
    <footer
      style={{
        background: "#111827",
        borderRadius: "0 0 12px 12px",
        padding: "14px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#2eb866",
          }}
        ></div>
        <span
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Journal Entry System · Node + React
        </span>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <span
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Docs
        </span>
        <span
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Support
        </span>
        <span
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          © 2026
        </span>
      </div>
    </footer>
  );
}

export default Footer;
