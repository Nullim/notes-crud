import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import EditNoteModal from '../ui/EditNoteModal';
import DeleteModal from '../ui/DeleteModal';
import NoteCard from '../ui/NoteCard';
import Loading from './Loading';

import '../../styles/components/layout/NotesList.css';
import ArchiveNoteModal from '../ui/ArchiveNoteModal';


const NotesList = ({ refreshNotesKey, isArchived }) => {
  const [notes, setNotes] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setArchiveModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [noteToArchive, setNoteToArchive] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/notes/${isArchived ? 'archived' : 'active'}`);
      setNotes(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false)
  }, [isArchived]);

  useEffect(() => {
    fetchData();
  }, [refreshNotesKey, isArchived, fetchData]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setEditModalOpen(true);
  };

  const handleOpenDeleteModal = (note) => {
    setNoteToDelete(note);
    setDeleteModalOpen(true);
  };

  const handleOpenArchiveModal = (note) => {
    setNoteToArchive(note);
    setArchiveModalOpen(true);
  }

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setArchiveModalOpen(false);
    fetchData();
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isArchived === true && notes.length === 0 ? (
        <p className='no-display-info'>No notes have been archived yet!</p>
      ) : notes.length === 0 ? (
        <p className='no-display-info'>No notes have been added yet! Why not make one?</p>
      ) : (
        <div className='notes-list'>
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              formatDate={formatDate}
              handleEditNote={handleEditNote}
              handleOpenDeleteModal={handleOpenDeleteModal}
              handleOpenArchiveModal={handleOpenArchiveModal}
            />
          ))}
        </div>
      )}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={handleCloseModal} note={noteToDelete} setNotes={setNotes} />
      <EditNoteModal isOpen={isEditModalOpen} onClose={handleCloseModal} note={noteToEdit} setNotes={setNotes} />
      <ArchiveNoteModal isOpen={isArchiveModalOpen} onClose={handleCloseModal} note={noteToArchive} setNotes={setNotes} />
    </div>
  );
}

export default NotesList;
