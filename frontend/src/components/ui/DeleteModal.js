import Axios from 'axios';
import { useEffect, useState } from 'react';

import Loading from '../layout/Loading';

import '../../styles/components/ui/ConfirmModal.css'

const DeleteModal = ({ isOpen, onClose, note, setNotes, fetchCategories }) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteNote = (event) => {
    event.preventDefault();
    setIsLoading(true);

    Axios.delete(`http://localhost:8080/api/notes/${note.id}`)
      .then(() => {
        setIsLoading(false);
        onClose();
        fetchCategories();
        fetchData();
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Error deleting note: " + error.message);
      });
  };

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:8080/api/notes/active');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
      {
      isLoading && 
        <Loading />
      }
      <div className={`confirm-modal ${isLoading ? "hidden" : "active"}`}>
        <h2 className='confirm-modal-header'>Delete Note</h2>
        <p className='confirm-modal-text'>Are you sure you want to delete this note?</p>
        <div className="confirm-modal-buttons">
          <button onClick={deleteNote} className="delete-btn">Delete</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;
