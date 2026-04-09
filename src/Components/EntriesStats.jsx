export function EntriesStats({ total, filtered, totalAmount }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 0, borderBottom: "1px solid #f3f4f6" }}>
      {[
        { label: "Total entries", value: total },
        { label: "Filtered",      value: filtered },
        { label: "Total (PKR)",   value: "₨ " + Math.round(totalAmount).toLocaleString("en-PK") },
        { label: "Avg (PKR)",     value: filtered ? "₨ " + Math.round(totalAmount / filtered).toLocaleString("en-PK") : "—" },
      ].map(({ label, value }, i, arr) => (
        <div key={label} style={{ padding: "14px 20px", borderRight: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4, fontWeight: 500 }}>{label}</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#111827", letterSpacing: "-0.02em" }}>{value}</div>
        </div>
      ))}
    </div>
  );
}