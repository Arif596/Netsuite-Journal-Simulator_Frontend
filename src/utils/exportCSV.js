export function exportCSV(filtered) {
  const rows = [["ID", "Date", "Account", "Amount", "Memo", "Status"]];
  filtered.forEach((e) => {
    const d = e.lines.find((l) => l.type === "debit");
    rows.push([
      e.journalEntryId || e.id,
      e.date,
      d?.account || "",
      d?.amount || 0,
      e.memo || "",
      e.status,
    ]);
  });
  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  a.download = "journal-entries.csv";
  a.click();
}
