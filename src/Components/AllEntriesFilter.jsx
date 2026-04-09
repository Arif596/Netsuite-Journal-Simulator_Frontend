import { useEffect, useState, useMemo } from "react";
import AllEntriesTable from "./AllEntriesTable";

const PAGE_SIZE = 10;

function AllEntriesFilter({ allEntries }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    let data = [...(allEntries || [])];
    if (statusFilter !== "ALL") {
      data = data.filter((e) => e.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (e) =>
          e.memo?.toLowerCase().includes(q) ||
          e.date?.includes(q) ||
          String(e.id || e.journalEntryId || "").toLowerCase().includes(q) ||
          e.lines?.some((l) => l.account?.toLowerCase().includes(q))
      );
    }
    return data;
  }, [allEntries, search, statusFilter]);
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal, bVal;
      if (sortKey === "date") {
        aVal = a.date || "";
        bVal = b.date || "";
      } else if (sortKey === "memo") {
        aVal = a.memo || "";
        bVal = b.memo || "";
      } else if (sortKey === "amount") {
        aVal = a.lines?.find((l) => l.type === "debit")?.amount || 0;
        bVal = b.lines?.find((l) => l.type === "debit")?.amount || 0;
      } else if (sortKey === "status") {
        aVal = a.status || "";
        bVal = b.status || "";
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, sortKey, sortDir]);
  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };
  const exportCSV = () => {
    const headers = [
      "#",
      "Date",
      "Memo",
      "Account (Debit)",
      "Debit",
      "Account (Credit)",
      "Credit",
      "Status",
    ];
    const rows = sorted.map((entry, i) => {
      const debitLine = entry.lines?.find((l) => l.type === "debit");
      const creditLine = entry.lines?.find((l) => l.type === "credit");
      return [
        i + 1,
        entry.date || "",
        `"${(entry.memo || "").replace(/"/g, '""')}"`,
        debitLine?.account || "",
        debitLine ? Number(debitLine.amount).toFixed(2) : "",
        creditLine?.account || "",
        creditLine ? Number(creditLine.amount).toFixed(2) : "",
        entry.status || "",
      ].join(",");
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "journal_entries.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AllEntriesTable
      paginated={paginated}
      sorted={sorted}
      allEntries={allEntries || []}
      totalPages={totalPages}
      page={page}
      setPage={setPage}
      PAGE_SIZE={PAGE_SIZE}
      search={search}
      setSearch={setSearch}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      sortKey={sortKey}
      sortDir={sortDir}
      handleSort={handleSort}
      exportCSV={exportCSV}
    />
  );
}

export default AllEntriesFilter;