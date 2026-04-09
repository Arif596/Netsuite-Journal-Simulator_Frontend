const DirhamIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 4h6a7 7 0 0 1 0 14H5z" />
    <line x1="3" y1="10" x2="14" y2="10" />
    <line x1="3" y1="14" x2="14" y2="14" />
  </svg>
);

export function EntriesStats({ total, filtered, totalAmount }) {
  const aedValue = (amount) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <DirhamIcon size={16} />
      {Math.round(amount).toLocaleString("en-US")} AED
    </span>
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: 0,
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      {[
        {
          label: "Total entries",
          value: total,
        },
        {
          label: "Filtered",
          value: filtered,
        },
        {
          label: "Total (AED)",
          value: aedValue(totalAmount),
        },
        {
          label: "Avg (AED)",
          value: filtered ? aedValue(totalAmount / filtered) : "—",
        },
      ].map(({ label, value }, i, arr) => (
        <div
          key={label}
          style={{
            padding: "14px 20px",
            borderRight: i < arr.length - 1 ? "1px solid #f3f4f6" : "none",
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#9ca3af",
              marginBottom: 4,
              fontWeight: 500,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#111827",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
            }}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}
