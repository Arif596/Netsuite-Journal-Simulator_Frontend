import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export default function Toast({ toast }) {
  const [progress, setProgress] = useState(100);
  const [visible, setVisible] = useState(false);

  const isSuccess = toast?.type === "success";

  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    setProgress(100);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) { clearInterval(interval); return 0; }
        return p - 2;
      });
    }, 60); 

    return () => clearInterval(interval);
  }, [toast]);

  if (!toast || !visible) return null;

  return (
    <div style={{
      position: "fixed",
      top: 24,
      right: 24,
      zIndex: 999,
      background: "#fff",
      border: "2px solid #000",
      borderRadius: 12,
      padding: "14px 16px",
      maxWidth: 360,
      minWidth: 280,
      boxShadow: "4px 4px 0 #000",
      animation: "slideIn 0.2s ease",
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      overflow: "hidden",
    }}>
      <div style={{
        width: 32,
        height: 32,
        background: isSuccess ? "#7FB77E" : "#DB1A1A",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        {isSuccess
          ? <CheckCircle size={16} color="#fff" />
          : <XCircle size={16} color="#fff" />
        }
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          fontWeight: 700,
          color: isSuccess ? "#166534" : "#991b1b",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 3,
        }}>
          {isSuccess ? "Posted" : "Error"}
        </div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          color: "#374151",
        }}>
          {toast.message}
        </div>
        {toast.journalEntryId  && (
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            color: "#9ca3af",
            marginTop: 5,
          }}>
            ID: {toast.journalEntryId }
          </div>
        )}
      </div>
      <button
        onClick={() => setVisible(false)}
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#9ca3af",
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <X size={14} />
      </button>
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 3,
        width: `${progress}%`,
        background: isSuccess ? "#7FB77E" : "#DB1A1A",
        borderRadius: "0 0 0 10px",
        transition: "width 0.06s linear",
      }} />
    </div>
  );
}