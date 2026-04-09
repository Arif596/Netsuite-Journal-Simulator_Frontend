import { useState, useMemo } from "react";

export function useEntriesFilter(entries) {
  const [search, setSearch] = useState("");
  const [accountFilter, setAccountFilter] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState(-1);
  const getEntryId = (entry) => entry.id || entry.journalEntryId || "";

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => d * -1);
    else {
      setSortKey(key);
      setSortDir(-1);
    }
  };

  const arrow = (key) =>
    sortKey === key ? (sortDir === -1 ? " ↓" : " ↑") : "";

  const clearFilters = () => {
    setSearch("");
    setAccountFilter("");
  };

  const uniqueAccounts = useMemo(
    () => [
      ...new Set(
        entries
          .map((e) => e.lines?.find((l) => l.type === "debit")?.account)
          .filter(Boolean),
      ),
    ],
    [entries],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return entries
      .filter((e) => {
        const debit = e.lines?.find((l) => l.type === "debit");
        const entryId = getEntryId(e);

        const matchQ =
          !q ||
          entryId.toLowerCase().includes(q) ||
          (debit?.account || "").toLowerCase().includes(q) ||
          (e.memo || "").toLowerCase().includes(q);

        const matchAcc = !accountFilter || debit?.account === accountFilter;
        return matchQ && matchAcc;
      })
      .sort((a, b) => {
        const debitA = a.lines?.find((l) => l.type === "debit");
        const debitB = b.lines?.find((l) => l.type === "debit");

        if (sortKey === "amount") {
          return sortDir * ((debitA?.amount || 0) - (debitB?.amount || 0));
        }
        if (sortKey === "date") {
          return sortDir * (new Date(a.date) - new Date(b.date));
        }
        if (sortKey === "id") {
          const idA = getEntryId(a);
          const idB = getEntryId(b);
          return sortDir * idA.localeCompare(idB);
        }
        return 0;
      });
  }, [entries, search, accountFilter, sortKey, sortDir]);

  const totalAmount = useMemo(
    () =>
      filtered.reduce(
        (sum, e) =>
          sum + (e.lines?.find((l) => l.type === "debit")?.amount || 0),
        0,
      ),
    [filtered],
  );

  return {
    search,
    setSearch,
    accountFilter,
    setAccountFilter,
    sortKey,
    sortDir,
    handleSort,
    arrow,
    clearFilters,
    uniqueAccounts,
    filtered,
    totalAmount,
  };
}
