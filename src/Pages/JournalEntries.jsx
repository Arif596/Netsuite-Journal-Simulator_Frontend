import React from "react";
import { useJournalForm } from "../hooks/useJournalForm";
import { DateAmountRow, AccountSelect, MemoField, SubmitButton } from "../Components/FormFields";

function JournalEntries() {
  const { form, set, handleSubmit, submitting, errors } = useJournalForm();

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <DateAmountRow form={form} set={set} errors={errors} />
        <AccountSelect value={form.account} onChange={set("account")} error={errors.account} />
        <MemoField value={form.memo} onChange={set("memo")} error={errors.memo} />
        <SubmitButton submitting={submitting} />
      </div>
    </form>
  );
}

export default JournalEntries;