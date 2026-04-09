export function EntriesFilter({ search, setSearch, accountFilter, setAccountFilter, uniqueAccounts, clearFilters }) {
  return (
    <div style={{ display: "flex", gap: 10, padding: "14px 20px", borderBottom: "1px solid #f3f4f6", flexWrap: "wrap" }}>
      <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 15, pointerEvents: "none" }}>⌕</span>
        <input
          type="text"
          placeholder="Search ID, account, memo…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: "1px solid #d1d5db", borderRadius: 7, fontSize: 13, color: "#111827", background: "#f9fafb", outline: "none", boxSizing: "border-box" }}
        />
      </div>
      <select
        value={accountFilter}
        onChange={(e) => setAccountFilter(e.target.value)}
        style={{ padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 7, fontSize: 13, color: "#374151", background: "#f9fafb", cursor: "pointer", outline: "none" }}
      >
        <option value="">All accounts</option>
        {uniqueAccounts.map((a) => <option key={a} value={a}>{a}</option>)}
      </select>
      {(search || accountFilter) && (
        <button
          onClick={clearFilters}
          style={{ padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: 7, fontSize: 13, cursor: "pointer", background: "#fff", color: "#6b7280" }}
        >
          Clear
        </button>
      )}
    </div>
  );
}