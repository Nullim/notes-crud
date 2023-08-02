import React from "react";
import '../../styles/components/pages/ArchivedNotesPage.css';

import NotesList from "../layout/NotesList";

const ArchivedNotesPage = () => {
  return (
    <div className="container">
      <div className="container-header">
        List of Archived Notes
      </div>
      <NotesList isArchived={true} />
    </div>
  )
}

export default ArchivedNotesPage;
