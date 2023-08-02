import Axios from 'axios';
import { useEffect, useState } from 'react';

import Loading from '../layout/Loading';

import '../../styles/components/ui/ConfirmModal.css'

const ArchiveNoteModal = ({ isOpen, onClose, note, setNotes }) => {
  const [isLoading, setIsLoading] = useState(false);

  const archive = (event) => {
    event.preventDefault();
    setIsLoading(true);

    Axios.put(`http://localhost:8080/api/notes/archive/${note.id}`)
      .then(() => {
        setIsLoading(false);
        onClose();
        setNotes(prevKey => prevKey + 1)
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Error archiving note: " + error.message);
      });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen])
  
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      { isLoading && <Loading /> }
      {
        note.archived ? (
          <div className={`confirm-modal ${isLoading ? "hidden" : "active"}`}>
            <h2 className='confirm-modal-header'>Restore Note</h2>
            <p className='confirm-modal-text'>
              Are you sure you want to restore this note? You will be able to edit this note again.
            </p>
            <div className="confirm-modal-buttons">
              <button onClick={archive} className="confirm-btn">Restore</button>
              <button onClick={onClose} className="cancel-btn">Cancel</button>
            </div>
          </div>
        ) : (
          <div className={`confirm-modal ${isLoading ? "hidden" : "active"}`}>
            <h2 className='confirm-modal-header'>Archive Note</h2>
            <p className='confirm-modal-text'>
              Are you sure you want to archive this note? You won't be able to edit this note until it's restored again.
            </p>
            <div className="confirm-modal-buttons">
              <button onClick={archive} className="confirm-btn">Archive</button>
              <button onClick={onClose} className="cancel-btn">Cancel</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ArchiveNoteModal;
