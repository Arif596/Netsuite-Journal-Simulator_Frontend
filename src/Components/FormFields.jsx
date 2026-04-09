import { ACCOUNTS } from "../Constant/accounts";
import {
  inputStyle,
  inputErrorStyle,
  labelStyle,
  errorTextStyle,
} from "../Constant/styles";
import { Send, Loader2 } from "lucide-react";

export function DateAmountRow({ form, set, errors }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
      gap: "clamp(10px, 2vw, 16px)"
    }}>
      <div>
        <label style={labelStyle}>Date</label>
        <input
          type="date"
          value={form.date}
          onChange={set("date")}
          style={errors?.date ? inputErrorStyle : inputStyle}
        />
        {errors?.date && <p style={errorTextStyle}>⚠ {errors.date}</p>}
      </div>
      <div>
        <label style={labelStyle}>Amount (AED)</label>
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={form.amount}
          onChange={set("amount")}
          style={errors?.amount ? inputErrorStyle : inputStyle}
        />
        {errors?.amount && <p style={errorTextStyle}>⚠ {errors.amount}</p>}
      </div>
    </div>
  );
}

export function AccountSelect({ value, onChange, error }) {
  return (
    <div>
      <label style={labelStyle}>Account</label>
      <select
        value={value}
        onChange={onChange}
        style={{
          ...(error ? inputErrorStyle : inputStyle),
          appearance: "none",
          cursor: "pointer",
        }}
      >
        <option value="">— Select Account —</option>
        {ACCOUNTS.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      {error && <p style={errorTextStyle}>⚠ {error}</p>}
    </div>
  );
}

export function MemoField({ value, onChange, error }) {
  return (
    <div>
      <label style={labelStyle}>
        Memo
        <span style={{ color: "#9ca3af", fontWeight: 400, marginLeft: 8 }}>
          {value.length}/200
        </span>
      </label>
      <textarea
        placeholder="Describe this transaction..."
        value={value}
        onChange={onChange}
        rows={3}
        style={{
          ...(error ? inputErrorStyle : inputStyle),
          resize: "vertical",
          lineHeight: 1.6,
        }}
      />
      {error && <p style={errorTextStyle}>⚠ {error}</p>}
    </div>
  );
}

export function SubmitButton({ submitting }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      style={{
        padding: "14px 28px",
        background: submitting ? "#ccc" : "#000",
        color: "#fff",
        border: "2px solid #000",
        borderRadius: 20,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: submitting ? "not-allowed" : "pointer",
        boxShadow: submitting ? "none" : "3px 3px 0 #888",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {submitting ? (
        <>
          <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
          Posting...
        </>
      ) : (
        <>
          <Send size={16} />
          Post Journal Entry
        </>
      )}
    </button>
  );
}