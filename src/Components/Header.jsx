import { useJournal } from "../Context/Journalcontext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { state, fetchEntries } = useJournal();
  const navigate = useNavigate();

  return (
    <header style={{
      background: "#1e2d6b",
      color: "#fff",
      borderRadius: "12px 12px 0 0",
      overflow: "hidden",
      borderBottom: "3px solid #2eb866",
    }}>
      <div style={{
        background: "rgba(0,0,0,0.2)",
        padding: "6px 28px",
        display: "flex",
        gap: 20,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
          Double-Entry Accounting
        </span>
        <span style={{ fontSize: 9, color: "#2eb866", textTransform: "uppercase", letterSpacing: "0.12em" }}>
          ● System Active
        </span>
      </div>
      <div style={{ padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 40, background: "#2eb866", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#ffd700", textTransform: "uppercase", marginBottom: 3 }}>
              General Ledger
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.03em", margin: 0, lineHeight: 1 }}>
              Journal Entry
            </h1>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

          {/* Export Button */}
          {/* <button style={{
            padding: "8px 14px",
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 6,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10, cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.06em"
          }}>
            Export
          </button> */}

          <button
            onClick={fetchEntries}
            style={{
              padding: "8px 16px",
              background: "#ffd700",
              color: "#000",
              border: "none",
              borderRadius: 6,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.06em"
            }}>
            {state.showEntries ? "Hide Entries" : "View Recent"}
          </button>
          <button
            onClick={() => navigate("/all-entries")}
            style={{
              padding: "8px 16px",
              background: "#2eb866",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
            {/* Table Icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M3 15h18M9 3v18" />
            </svg>
            All Entries
          </button>

          <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />

          <button style={{
            width: 34, height: 34,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>

          <button style={{
            width: 34, height: 34,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative"
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span style={{
              position: "absolute", top: 6, right: 6,
              width: 6, height: 6,
              background: "#ff4444",
              borderRadius: "50%",
              border: "1.5px solid #1e2d6b"
            }} />
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;