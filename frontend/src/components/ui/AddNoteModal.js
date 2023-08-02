import { useEffect, useState } from 'react';
import Axios from 'axios';

import Loading from '../layout/Loading';

import '../../styles/components/ui/NoteModal.css'

const AddNoteModal = ({ isOpen, onClose, onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [categories, setCategories] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const add = (e) => {
    e.preventDefault();
    setIsLoading(true);

    Axios.post("http://localhost:8080/api/notes/addNote", {
      title: title,
      content: textContent,
      categories: categories.split(",").map((category) => category.trim())
    })
      .then(() => {
        setIsLoading(false);
        onNoteAdded();
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.data.message) {
          alert("Error adding note: " + error.response.data.message);
        } else {
          alert("An error occurred while adding the note: " + error.message);
        }
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
    <div className="modal-overlay">
      {
      isLoading && 
        <Loading />
      }
      <div className={`modal-content ${isLoading ? "hidden" : "active"}`} onClick={(e) => e.stopPropagation()}>
        <h2>Add New Note</h2>
        <form className='note-form'>
          <label className='note-label'>Note Title:</label>
          <input className='note-title' type="text" placeholder='Shopping list' 
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <label className='note-label'>Note Content:</label>
          <textarea className='note-content' rows="4" placeholder='Eggs, tomatoes, milk, beef...'
            onChange={(e) => {
              setTextContent(e.target.value);
            }}
          ></textarea>

          <label className='note-label'>Categories (use commas to separate):</label>
          <input className='note-categories' type="text" placeholder='Food, Groceries, Shopping...'
            onChange={(e) => {
              setCategories(e.target.value);
            }}
          />

          <div className='button-group'>
            <button onClick={add} className='submit-button'>Save Note</button>
            <button type='button' className='cancel-button' onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteModal;