const ACCOUNT_COLORS = {
  "Travel Expense":  { bg: "#dbeafe", color: "#1e40af" },
  "Office Supplies": { bg: "#dcfce7", color: "#166534" },
  "Utilities":       { bg: "#fef9c3", color: "#854d0e" },
  "Marketing":       { bg: "#ede9fe", color: "#5b21b6" },
  "Equipment":       { bg: "#fee2e2", color: "#991b1b" },
  "Sales Revenue":   { bg: "#d1fae5", color: "#065f46" },
  "Revenue":         { bg: "#cffafe", color: "#155e75" },
};

export function AccountBadge({ account }) {
  const col = ACCOUNT_COLORS[account] || { bg: "#f3f4f6", color: "#374151" };
  return (
    <span style={{ background: col.bg, color: col.color, fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap" }}>
      {account || "—"}
    </span>
  );
}