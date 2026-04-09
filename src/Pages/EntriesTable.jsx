import React from "react";
import { useJournal } from "../Context/Journalcontext";
import { exportCSV } from "../utils/exportCSV";
import { EntriesStats } from "../Components/EntriesStats";
import { EntriesFilter } from "../Components/EntriesFilter";
import { useEntriesFilter } from "../hooks/useEntriesFilter";
import { AccountBadge } from "../Components/AccountBadge";

function EntriesTable() {
  const { state, fetchEntries } = useJournal();
  const {
    search,
    setSearch,
    accountFilter,
    setAccountFilter,
    sortKey,
    handleSort,
    arrow,
    clearFilters,
    uniqueAccounts,
    filtered,
    totalAmount,
  } = useEntriesFilter(state.entries);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        marginTop: 32,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid #f3f4f6",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 600,
              color: "#111827",
            }}
          >
            Journal Entries
          </h2>
          {state.showEntries && (
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "#6b7280",
                marginTop: 2,
              }}
            >
              {filtered.length} of {state.entries.length} entries
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {state.entries.length > 0 && (
            <button
              onClick={() => exportCSV(filtered)}
              style={{
                padding: "7px 14px",
                background: "#fff",
                color: "#374151",
                border: "1px solid #d1d5db",
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              ↓ Export CSV
            </button>
          )}
          <button
            onClick={fetchEntries}
            disabled={state.loading}
            style={{
              padding: "7px 16px",
              background: state.loading ? "#f3f4f6" : "#111827",
              color: state.loading ? "#9ca3af" : "#fff",
              border: "1px solid transparent",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 500,
              cursor: state.loading ? "not-allowed" : "pointer",
            }}
          >
            {state.loading
              ? "Loading…"
              : state.showEntries
                ? "Refresh"
                : "Load Entries"}
          </button>
        </div>
      </div>

      {state.showEntries && state.entries.length > 0 && (
        <EntriesStats
          total={state.entries.length}
          filtered={filtered.length}
          totalAmount={totalAmount}
        />
      )}

      {state.showEntries && state.entries.length > 0 && (
        <EntriesFilter
          search={search}
          setSearch={setSearch}
          accountFilter={accountFilter}
          setAccountFilter={setAccountFilter}
          uniqueAccounts={uniqueAccounts}
          clearFilters={clearFilters}
        />
      )}

      {!state.showEntries && (
        <div style={{ textAlign: "center", padding: "56px 24px" }}>
          <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.25 }}>
            🧾
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#374151",
              marginBottom: 6,
            }}
          >
            No entries loaded
          </div>
          <div style={{ fontSize: 13, color: "#9ca3af" }}>
            Click "Load Entries" to fetch recent journal entries
          </div>
        </div>
      )}

      {state.showEntries && filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px 24px",
            color: "#6b7280",
            fontSize: 13,
          }}
        >
          No entries match your search.
        </div>
      )}

      {state.showEntries && filtered.length > 0 && (
        <div
          style={{ overflowX: "auto", borderRadius: 12, overflow: "hidden" }}
        >
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}
          >
            <thead>
              <tr
                style={{
                  background: "rgb(30, 45, 107)",
                  color: "#f4fafa",
                  borderBottom: "1px solid #e5e7eb",
                  borderTop: "10px",
                }}
              >
                {[
                  { key: "#", label: "#", align: "left", width: 48 },
                  { key: "id", label: "Entry ID", align: "left", width: null },
                  { key: "date", label: "Date", align: "left", width: null },
                  { key: "acc", label: "Account", align: "left", width: null },
                  {
                    key: "amount",
                    label: "Amount",
                    align: "right",
                    width: null,
                  },
                  { key: "memo", label: "Memo", align: "left", width: null },
                  {
                    key: "status",
                    label: "Status",
                    align: "left",
                    width: null,
                  },
                ].map(({ key, label, align, width },index,arr) => (
                  <th
                    key={key}
                    onClick={() =>
                      ["id", "date", "amount"].includes(key) && handleSort(key)
                    }
                    style={{
                      padding: "10px 16px",
                      textAlign: align,
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#9ca3af",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      cursor: ["id", "date", "amount"].includes(key)
                        ? "pointer"
                        : "default",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                      width: width || "auto",
                      borderRadius:
                        index === 0
                          ? "12px 0 0 0"
                          : index === arr.length - 1
                            ? "0 12px 0 0"
                            : 0,
                    }}
                  >
                    {label}
                    {arrow(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry, i) => {
                const debit = entry.lines.find((l) => l.type === "debit");
                return (
                  <tr
                    key={entry.journalEntryId || entry.id}
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      background: "#fff",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f9fafb")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#fff")
                    }
                  >
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: 13,
                        color: "#d1d5db",
                        fontWeight: 500,
                        width: 48,
                      }}
                    >
                      {i + 1}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: 12,
                        color: "#6b7280",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {entry.journalEntryId || entry.id || ""}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: 13,
                        color: "#374151",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {entry.date}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <AccountBadge account={debit?.account} />
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        textAlign: "right",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#111827",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ₨ {Number(debit?.amount || 0).toLocaleString("en-PK")}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: 13,
                        color: "#6b7280",
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={entry.memo}
                    >
                      {entry.memo || "—"}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          background: "#dcfce7",
                          color: "#15803d",
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "3px 9px",
                          borderRadius: 20,
                        }}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr
                style={{
                  background: "#f9fafb",
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <td
                  colSpan={4}
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  Total — {filtered.length}{" "}
                  {filtered.length === 1 ? "entry" : "entries"}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    textAlign: "right",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#111827",
                    whiteSpace: "nowrap",
                  }}
                >
                  ₨ {Math.round(totalAmount).toLocaleString("en-PK")}
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

export default EntriesTable;
