import { useNavigate } from "react-router-dom";

function AllEntriesHeader() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 28,
    }}>
      <div>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          color: "#2eb866",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          margin: "0 0 4px",
        }}>
          General Ledger
        </p>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 32,
          color: "#1e2d6b",
          margin: 0,
          letterSpacing: "0.03em",
        }}>
          All Journal Entries
        </h1>
      </div>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          background: "#1e2d6b",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          fontWeight: 700,
          cursor: "pointer",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        ← Back
      </button>
    </div>
  );
}

export default AllEntriesHeader;