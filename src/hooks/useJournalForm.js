import { useState } from "react";
import { useJournal } from "../Context/Journalcontext";
import { validateJournalForm, hasErrors } from "../utils/validation";

export function useJournalForm() {
  const { state, submitEntry } = useJournal();
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    amount: "",
    account: "",
    memo: "",
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateJournalForm(form);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    const success = await submitEntry({
      ...form,
      amount: Number(form.amount),
    });
    if (success) {
      setForm((f) => ({ ...f, amount: "", memo: "" }));
      setErrors({});
    }
  };

  return { form, set, handleSubmit, submitting: state.submitting, errors };
}
