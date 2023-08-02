import React from 'react';

import '../../styles/components/ui/NoteCard.css';

const NoteCard = ({ note, formatDate, handleEditNote, handleOpenDeleteModal, handleOpenArchiveModal }) => {
  return (
    <div key={note.id} className='note-card'>
      <div className='display-title'>{note.title}</div>
      <p>Last updated: {formatDate(note.updatedAt)}</p>
      {
        note.archived ? 
          <div className='note-button-group'>
            <button className='note-button' onClick={() => handleOpenArchiveModal(note)}>Restore</button> 
            <button className='note-button' onClick={() => handleOpenDeleteModal(note)}>Delete</button>
          </div>  
          : 
          <div className='note-button-group'>
            <button className='note-button' onClick={() => handleEditNote(note)}>Edit</button>
            <button className='note-button' onClick={() => handleOpenArchiveModal(note)}>Archive</button> 
            <button className='note-button' onClick={() => handleOpenDeleteModal(note)}>Delete</button>
          </div>
      }
    </div>
  );
};

export default NoteCard;