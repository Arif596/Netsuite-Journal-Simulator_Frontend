import { createContext, useContext, useReducer } from "react";

const initialState = {
  entries: [],
  loading: false,
 allEntries: [], 
  submitting: false,
  toast: null,
  showEntries: false,
};
const BASE_URL = "https://netsuite-journal-simulator-bakend.onrender.com";
const API_URL = "http://localhost:3000";
function journalReducer(state, action) {
  switch (action.type) {
    case "SET_SUBMITTING":
      return { ...state, submitting: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ENTRIES":
      return { ...state, entries: action.payload, showEntries: true };
      case "SET_ALL_ENTRIES":                                 
      return { ...state, allEntries: action.payload };
    case "TOGGLE_ENTRIES":
      return { ...state, showEntries: !state.showEntries };
    case "SET_TOAST":
      return { ...state, toast: action.payload };
    case "CLEAR_TOAST":
      return { ...state, toast: null };
    default:
      return state;
  }
}

const JournalContext = createContext(null);

export function JournalProvider({ children }) {
  const [state, dispatch] = useReducer(journalReducer, initialState);

  const showToast = (type, message, id = null) => {
    dispatch({ type: "SET_TOAST", payload: { type, message, journalEntryId:id } });
    setTimeout(() => dispatch({ type: "CLEAR_TOAST" }), 5000);
  };

  const submitEntry = async (formData) => {
    dispatch({ type: "SET_SUBMITTING", payload: true });
    try {
      const res = await fetch(`${API_URL}/api/journal-entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        
      });
      console.log("res",res)
      const data = await res.json();
      if (!res.ok || !data.success) {
        showToast("error", data.message || "Submission failed");
        return false;
      }
      showToast("success", data.message, data.journalEntryId);
      return true;
    } catch {
      showToast("error", "Network error — is the server running?");
      return false;
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
    }
  };
  const fetchEntries = async () => {
    if (state.showEntries && state.entries.length) {
      dispatch({ type: "TOGGLE_ENTRIES" });
      return;
    }
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await fetch(`${API_URL}/api/journal-entries`);
      const data = await res.json();
       console.log("getEntries",res)
      if (data.success) {
        dispatch({ type: "SET_ENTRIES", payload: data.data });
      } else {
        showToast("error", "Failed to fetch entries");
      }
    } catch {
      showToast("error", "Network error — is the server running?");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
const fetchAllEntries = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await fetch(`${API_URL}/api/journal-entries/all`);
      const data = await res.json();

      if (data.success) {
        dispatch({ type: "SET_ALL_ENTRIES", payload: data.data });
      } else {
        showToast("error", "Failed to fetch all entries");
      }
      console.log('All Entry',res)
       console.log("First entry:", data.data[0]);
    } catch {
      showToast("error", "Network error — is the server running?");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <JournalContext.Provider value={{ state, submitEntry, fetchEntries,fetchAllEntries  }}>
      {children}
    </JournalContext.Provider>
  );
}
export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournal must be used inside <JournalProvider>");
  }
  return context;
}
