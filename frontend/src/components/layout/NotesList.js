import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import NoteModal from '../ui/NoteModal';
import DeleteModal from '../ui/DeleteModal';
import NoteCard from '../ui/NoteCard';
import Loading from './Loading';

import ArchiveNoteModal from '../ui/ArchiveNoteModal';

import '../../styles/components/layout/NotesList.css';

const NotesList = ({ refreshNotesKey, isArchived }) => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isArchiveModalOpen, setArchiveModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
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

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories/all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const fetchNotesByCategory = useCallback(async (categoryName) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/notes/categories/name/${categoryName}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes by category:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    fetchCategories()
  }, [refreshNotesKey, fetchData, fetchCategories]);

  useEffect(() => {
    if (selectedCategory) {
      fetchNotesByCategory(selectedCategory); 
    } else {
      fetchData();
    }
  }, [selectedCategory, fetchData, fetchNotesByCategory, fetchCategories]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleOpenDeleteModal = (note) => {
    setNoteToDelete(note);
  };

  const handleOpenArchiveModal = (note) => {
    setNoteToArchive(note);
    setArchiveModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    setArchiveModalOpen(false);
    setModalMode("add");
    setNoteToEdit(null);
    setNoteToDelete(null);
    setSelectedCategory('');

    fetchCategories();
    fetchData();
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isArchived === true && notes.length === 0 ? (
        <p className='no-display-info'>No notes have been archived yet!</p>
      ) : notes.length === 0 ? (
        <div>
          <div className={`${isArchived ?'hide-menu' : 'category-menu'}`}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
          </select>
          </div>
          <p className='no-display-info'>No notes here!</p>
        </div>
      ) : (
        <div>
          <div className={`${isArchived ?'hide-menu' : 'category-menu'}`}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
          </select>
        </div>
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
        </div>
      )}
      <DeleteModal
       isOpen={Boolean(noteToDelete)} 
       onClose={() => setNoteToDelete(null)} 
       note={noteToDelete} 
       setNotes={setNotes}
       fetchCategories={fetchCategories} 
       />
      <NoteModal isOpen={isModalOpen} onClose={handleCloseModal} mode={modalMode} note={noteToEdit} setNotes={setNotes} />
      <ArchiveNoteModal isOpen={isArchiveModalOpen} onClose={handleCloseModal} note={noteToArchive} setNotes={setNotes} />
    </div>
  );
}

export default NotesList;
