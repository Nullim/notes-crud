import { useEffect, useState } from 'react';
import Axios from 'axios';

import Loading from '../layout/Loading';

import '../../styles/components/ui/NoteModal.css';

const EditNoteModal = ({ isOpen, onClose, note, setNotes }) => {
  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [originalTextContent, setOriginalTextContent] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setOriginalTitle(note.title);
      setTextContent(note.content);
      setOriginalTextContent(note.content);
    }
  }, [note]);

  const update = (event) => {
    event.preventDefault();
    setIsLoading(true);

    Axios.put(`http://localhost:8080/api/notes/update/${note.id}`, {
      title,
      content: textContent
    })
      .then(() => {
        setIsLoading(false);
        onClose();
        fetchData();
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Error updating note: " + error.message);
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
      setTitle(originalTitle);
      setTextContent(originalTextContent);
    }
  }, [isOpen, originalTextContent, originalTitle]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      {
      isLoading && 
        <Loading />
      }
      <div className={`modal-content ${isLoading ? "hidden" : "active"}`} onClick={(e) => e.stopPropagation()}>
        <h2>Edit Note</h2>
        <form className='note-form'>
          <label className='note-label'>Note Title:</label>
          <input
            className='note-title'
            type="text"
            placeholder='Shopping list'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className='note-label'>Note Content:</label>
          <textarea
            className='note-content'
            rows="4"
            placeholder='Eggs, tomatoes, milk, beef...'
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
          ></textarea>

          <div className='button-group'>
            <button onClick={update} className='submit-button'>Update Note</button>
            <button type='button' className='cancel-button' onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;
