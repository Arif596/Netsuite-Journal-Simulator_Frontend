export function validateJournalForm(form) {
  const errors = {};

  if (!form.date) {
    errors.date = "Date is required";
  } else if (new Date(form.date) > new Date()) {
    errors.date = "Date cannot be in the future";
  }

  if (form.amount === "" || form.amount === null) {
    errors.amount = "Amount is required";
  } else if (isNaN(Number(form.amount))) {
    errors.amount = "Please enter a valid number";
  } else if (Number(form.amount) <= 0) {
    errors.amount = "Amount must be greater than 0";
  } else if (Number(form.amount) > 10000000) {
    errors.amount = "Amount too large";
  }

  if (!form.account) {
    errors.account = "Please select an account";
  }

  if (!form.memo || form.memo.trim() === "") {
    errors.memo = "Memo is required";
  } else if (form.memo.trim().length < 5) {
    errors.memo = "Memo must be at least 5 characters";
  } else if (form.memo.length > 200) {
    errors.memo = "Memo cannot exceed 200 characters";
  }

  return errors;
}

export const hasErrors = (errors) => Object.keys(errors).length > 0;
