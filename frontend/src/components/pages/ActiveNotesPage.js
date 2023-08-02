import React, { useState } from "react";
import '../../styles/components/pages/ActiveNotesPage.css';

import NoteModal from "../ui/NoteModal";
import NotesList from "../layout/NotesList";

const ActiveNotesPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" for adding a new note, "edit" for editing an existing note
  const [refreshNotesKey, setRefreshNotesKey] = useState(0);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const handleOpenModal = () => {
    setModalMode("add");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalMode("add");
    setNoteToEdit(null);
  }

  const handleNoteAdded = () => {
    setRefreshNotesKey(prevKey => prevKey + 1);
    handleCloseModal();
  }

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setModalMode("edit");
    setModalOpen(true);
  };

  return (
    <div className="container">
      <div className="container-header">
        List of Notes
        <div className="buttons-group">
          <button className="note-button" type="button" onClick={handleOpenModal}>Add new note</button>
        </div>
      </div>
      <NotesList refreshNotesKey={refreshNotesKey} isArchived={false} setNotes={setRefreshNotesKey} onEditNote={handleEditNote} />
      <NoteModal isOpen={isModalOpen} onClose={handleCloseModal} mode={modalMode} note={noteToEdit} setNotes={setRefreshNotesKey} onNoteAdded={handleNoteAdded} />
    </div>
  )
}

export default ActiveNotesPage;
