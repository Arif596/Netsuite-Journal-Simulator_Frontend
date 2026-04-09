function AllEntriesTable({
  paginated = [],
  sorted = [],
  allEntries = [],
  totalPages = 0,
  page,
  setPage,
  PAGE_SIZE,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortKey,
  sortDir,
  handleSort,
  exportCSV,
}) {
  const SortIcon = ({ col }) => {
    if (sortKey !== col)
      return (
        <span style={{ color: "rgba(255,255,255,0.3)", marginLeft: 4 }}>↕</span>
      );
    return (
      <span style={{ color: "#2eb866", marginLeft: 4 }}>
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  };
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
      {/* D shape */}
      <path d="M5 4h6a7 7 0 0 1 0 14H5z" />

      {/* horizontal lines */}
      <line x1="3" y1="10" x2="14" y2="10" />
      <line x1="3" y1="14" x2="14" y2="14" />
    </svg>
  );
  const sortableColumns = [
    { key: "#", sortable: false },
    { key: "Date", sortable: true, sortId: "date" },
    { key: "Memo", sortable: true, sortId: "memo" },
    { key: "Account", sortable: false },
    { key: "Debit", sortable: true, sortId: "amount" },
    { key: "Credit", sortable: false },
    { key: "Status", sortable: true, sortId: "status" },
  ];

  const btnStyle = (active) => ({
    padding: "8px 16px",
    background: active ? "#1e2d6b" : "#fff",
    color: active ? "#fff" : "#1e2d6b",
    border: "1.5px solid #1e2d6b",
    borderRadius: 7,
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    fontWeight: 700,
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    transition: "all 0.15s",
  });
  const formatAED = (amount) => {
    if (amount === null || amount === undefined) return "—";

    return `AED ${Number(amount).toLocaleString("en-AE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  const getEntryId = (entry, index) =>
    entry.id || entry.journalEntryId || `${entry.date}-${index}`;
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 16,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 13,
                color: "#9aa0b4",
              }}
            >
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search memo, account, date..."
              style={{
                paddingLeft: 30,
                paddingRight: 12,
                paddingTop: 8,
                paddingBottom: 8,
                border: "1.5px solid #d0d5e8",
                borderRadius: 7,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: "#1e2d6b",
                width: 230,
                outline: "none",
              }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1.5px solid #d0d5e8",
              borderRadius: 7,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: "#1e2d6b",
              background: "#fff",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="ALL">All Status</option>
            <option value="POSTED">Posted</option>
          </select>
        </div>

        <button onClick={exportCSV} style={btnStyle(false)}>
          ↓ Export CSV
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(30,45,107,0.10)",
          border: "1px solid #e2e6f0",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          <thead>
            <tr style={{ background: "#1e2d6b", color: "#fff" }}>
              {sortableColumns.map(({ key, sortable, sortId }) => (
                <th
                  key={key}
                  onClick={() => sortable && handleSort(sortId)}
                  style={{
                    padding: "14px 18px",
                    textAlign: "left",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.75)",
                    cursor: sortable ? "pointer" : "default",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {key}
                  {sortable && <SortIcon col={sortId} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((entry, i) => {
                const debitLine = entry.lines?.find((l) => l.type === "debit");
                const creditLine = entry.lines?.find(
                  (l) => l.type === "credit",
                );
                const globalIndex = (page - 1) * PAGE_SIZE + i;
                const entryStatus = entry.status || "DRAFT"; // Fixed: fallback for status

                return (
                  <tr
                    key={getEntryId(entry)} // Fixed: using helper function
                    style={{
                      borderBottom: "1px solid #eef0f6",
                      background: i % 2 === 0 ? "#fff" : "#f7f9fd",
                      transition: "background 0.15s",
                    }}
                  >
                    <td
                      style={{
                        padding: "13px 18px",
                        fontSize: 11,
                        color: "#9aa0b4",
                      }}
                    >
                      {globalIndex + 1}
                    </td>
                    <td
                      style={{
                        padding: "13px 18px",
                        fontSize: 11,
                        color: "#1e2d6b",
                      }}
                    >
                      {entry.date || "—"}
                    </td>
                    <td
                      style={{
                        padding: "13px 18px",
                        fontSize: 11,
                        color: "#333",
                        maxWidth: 220,
                      }}
                    >
                      {entry.memo || "—"}
                    </td>
                    <td
                      style={{
                        padding: "13px 18px",
                        fontSize: 11,
                        color: "#1e2d6b",
                        fontWeight: 600,
                      }}
                    >
                      {debitLine?.account || "—"}
                    </td>
                    <td
                      style={{
                        padding: "13px 18px",
                        fontSize: 11,
                        color: "#2eb866",
                        fontWeight: 700,
                      }}
                    >
                      
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <DirhamIcon size={14} />
                          {(debitLine?.amount)}
                        </div>
                     
                    </td>
                    <td
                      style={{
                        padding: "13px 18px",
                        fontSize: 11,
                        color: "#e05c5c",
                        fontWeight: 700,
                      }}
                    >
                      
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <DirhamIcon size={14} />
                          {(creditLine?.amount)}
                        </div>
                      
                    </td>
                    <td style={{ padding: "13px 18px" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: 9,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          background:
                            entryStatus === "POSTED"
                              ? "rgba(46,184,102,0.12)"
                              : "rgba(255,215,0,0.18)",
                          color:
                            entryStatus === "POSTED" ? "#2eb866" : "#b8860b",
                        }}
                      >
                        {entryStatus}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "48px",
                    textAlign: "center",
                    color: "#9aa0b4",
                    fontSize: 12,
                  }}
                >
                  {search || statusFilter !== "ALL"
                    ? "No matching entries found"
                    : "No entries found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer: count + pagination */}
        {sorted.length > 0 && (
          <div
            style={{
              padding: "12px 18px",
              background: "#f7f9fd",
              borderTop: "1px solid #eef0f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: "#9aa0b4",
                fontFamily: "'IBM Plex Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {sorted.length} entries
              {(search || statusFilter !== "ALL") &&
                ` (filtered from ${allEntries.length})`}
            </span>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    ...btnStyle(false),
                    padding: "5px 12px",
                    opacity: page === 1 ? 0.4 : 1,
                    cursor: page === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 || p === totalPages || Math.abs(p - page) <= 1,
                  )
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, idx) =>
                    p === "..." ? (
                      <span
                        key={`dots-${idx}`}
                        style={{
                          fontSize: 11,
                          color: "#9aa0b4",
                          padding: "0 4px",
                        }}
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        style={{
                          ...btnStyle(page === p),
                          padding: "5px 10px",
                          minWidth: 32,
                        }}
                      >
                        {p}
                      </button>
                    ),
                  )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    ...btnStyle(false),
                    padding: "5px 12px",
                    opacity: page === totalPages ? 0.4 : 1,
                    cursor: page === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllEntriesTable;
