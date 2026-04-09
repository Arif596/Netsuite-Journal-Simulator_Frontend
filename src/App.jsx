import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useJournal } from "./Context/Journalcontext";
import Toast from "./Constant/ToastContainer";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import JournalEntries from "./Pages/JournalEntries";
import EntriesTable from "./Pages/EntriesTable";
import AllEntriesPage from "./Pages/AllEntriesPage"; // ← NEW

function App() {
  const { state } = useJournal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0ede6; min-height: 100vh; }
        input:focus, select:focus, textarea:focus { background: #fff !important; box-shadow: 3px 3px 0 #000; outline: none; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <Toast toast={state.toast} />

      <Routes>
        {/* Main Page */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <main
                style={{
                  maxWidth: "min(92vw, 2200px)", 
                  margin: "0 auto",
                  padding: "clamp(20px, 4vw, 40px) clamp(12px, 3vw, 24px)",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    border: "2px solid #000",
                    padding: "32px",
                    borderRadius: "10px",
                    boxShadow: "6px 6px 0 #000",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ marginBottom: 28 }}>
                    <div
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        color: "#888",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      Double-entry accounting
                    </div>
                    <h2
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 24,
                        letterSpacing: "0.06em",
                      }}
                    >
                      Post New Entry
                    </h2>
                    <p
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 11,
                        color: "#888",
                        marginTop: 4,
                      }}
                    >
                      Debit → Selected Account &nbsp;|&nbsp; Credit → Bank
                      Account
                    </p>
                  </div>
                  <JournalEntries />
                </div>
                <EntriesTable />
              </main>
              <Footer />
            </>
          }
        />

        {/* All Entries Page */}
        <Route path="/all-entries" element={<AllEntriesPage />} />
      </Routes>
    </>
  );
}

export default App;
