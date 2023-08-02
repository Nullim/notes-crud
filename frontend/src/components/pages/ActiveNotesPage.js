import React, { useState } from "react";
import '../../styles/components/pages/ActiveNotesPage.css';

import AddNoteModal from "../ui/AddNoteModal";
import NotesList from "../layout/NotesList";

const ActiveNotesPage = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [refreshNotesKey, setRefreshNotesKey] = useState(0);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  }

  const handleNoteAdded = () => {
    setRefreshNotesKey(prevKey => prevKey + 1);
    handleCloseAddModal();
  }

  return (
    <div className="container">
      <div className="container-header">
        List of Notes
        <div className="buttons-group">
          <button className="note-button" type="button" onClick={handleOpenAddModal}>Add new note</button>
        </div>
      </div>
      <NotesList refreshNotesKey={refreshNotesKey} isArchived={false} setNotes={setRefreshNotesKey} />
      <AddNoteModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onNoteAdded={handleNoteAdded} />
    </div>
  )
}

export default ActiveNotesPage;