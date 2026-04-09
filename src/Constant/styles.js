export const labelStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#555",
  display: "block",
  marginBottom: 6,
  borderRadius: "10px",
};

export const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  border: "2px solid #000",
  borderRadius: "10px",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "clamp(12px, 1vw, 13px)",
  padding: "clamp(10px,1.5vw,13px) clamp(12px,1.5vw,16px)",
  background: "#fafafa",
  boxSizing: "border-box",
};
export const inputErrorStyle = {
  ...inputStyle,
  border: "2px solid #ef4444",
  background: "#fff5f5",
};
export const errorTextStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 10,
  color: "#ef4444",
  marginTop: 4,
  letterSpacing: "0.05em",
};
