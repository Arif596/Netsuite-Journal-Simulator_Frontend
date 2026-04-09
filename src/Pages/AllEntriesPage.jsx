import { useEffect } from "react";
import { useJournal } from "../Context/Journalcontext";
import AllEntriesHeader from "../Components/AllEntriesHeader";
import AllEntriesFilter from "../Components/AllEntriesFilter";

function AllEntriesPage() {
  const { state, fetchAllEntries } = useJournal();

  useEffect(() => {
    fetchAllEntries();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f8", padding: "32px 24px" }}>
      <AllEntriesHeader />
      <AllEntriesFilter allEntries={state.allEntries} />
    </div>
  );
}

export default AllEntriesPage;