import { useEffect, useState } from 'react';
import Axios from 'axios';

import Loading from '../layout/Loading';

import '../../styles/components/ui/NoteModal.css';

const NoteModal = ({ isOpen, onClose, mode, note, onNoteAdded, setNotes }) => {
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    if (mode === "edit" && note) {
      setTitle(note.title);
      setTextContent(note.content);
      fetchCategoriesForNote(note.id);
      setIsAddingNote(false)
    } else {
      setTitle("");
      setTextContent("");
      setCategories([]);
      setIsAddingNote(true);
    }
  }, [mode, note]);

  const fetchCategoriesForNote = async(noteId) => {
    try {
      const response = await Axios.get(`http://localhost:8080/api/notes/categories/${noteId}`);
      const categories = response.data.map((category) => ({
        id: category.id,
        name: category.name
      }));
      setCategories(categories);
    } catch(e) {
      alert('Error fetching categories for note:', e)
    }
  }

  const createCategory = async (categoryName) => {
    try {
      const existingCategory = await Axios.get(
        `http://localhost:8080/api/categories/getCategoryByName/${categoryName}`
      );

      if (existingCategory.data) {
        return existingCategory.data.id;
      } else {
        const response = await Axios.post("http://localhost:8080/api/categories/addCategory", {
          categories: [categoryName],
        });
        return response.data[0];
      }
    } catch (error) {
      console.error('Error creating category:', error);
      return null;
    }
  };

  const handleAddCategory = async () => {
    const categoryInputValue = document.querySelector('.note-categories').value.trim();
    if (categoryInputValue !== "") {
      const cleanedCategory = categoryInputValue.replace(/\s+/g, '-');

      const isCategoryAdded = categories.some(category => category.name === cleanedCategory);
      if (isCategoryAdded) {
        alert(`Category "${cleanedCategory}" has already been added to this note.`);
        return;
      }
      try {
        const newCategoryId = await createCategory(cleanedCategory);
        setCategories((prevCategories) => [...prevCategories, { id: newCategoryId, name: cleanedCategory }]);
        document.querySelector('.note-categories').value = "";
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.name !== categoryToRemove.name)
    );
  };

  const addOrUpdateNote = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const categoryIds = categories.map((category) => category.id);
  
      if (mode === "add") {
        await Axios.post("http://localhost:8080/api/notes/addNote", {
          title,
          content: textContent,
          categories: categoryIds,
        });
        onNoteAdded();
        onClose();
        resetCategories();
      } else if (mode === "edit" && note) {
        await Axios.put(`http://localhost:8080/api/notes/update/${note.id}`, {
          title,
          content: textContent,
          categories: categoryIds,
        });
      }
  
      setIsLoading(false);
      onClose();
      fetchData();
    } catch (e) {
      setIsLoading(false);
      alert(`Error ${mode === "add" ? "adding" : "updating"} note: ` + e.message);
    }
  };

  const resetCategories = () => {
    setCategories([]);
  }

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
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && isAddingNote) {
      setTitle("");
      setTextContent("");
      resetCategories();
      setIsLoading(false);
    }
  }, [isOpen, isAddingNote]);
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      {isLoading && <Loading />}
      <div className={`modal-content ${isLoading ? "hidden" : "active"}`} onClick={(e) => e.stopPropagation()}>
        <h2>{mode === "add" ? "Add New Note" : "Edit Note"}</h2>
        <form className='note-form'>
          <label className='note-label'>Note Title:</label>
          <input
            className='note-title'
            type="text"
            placeholder='Shopping list'
            value={title}
            maxLength={80}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className='note-label'>Note Content:</label>
          <textarea
            className='note-content'
            rows="4"
            placeholder='Eggs, tomatoes, milk, beef...'
            value={textContent}
            maxLength={255}
            onChange={(e) => setTextContent(e.target.value)}
          ></textarea>

          <label className='note-label'>Categories (optional, spaces will be replaced with dashes):</label>
          <div className="category-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <span className='close-icon' onClick={() => handleRemoveCategory(category)}>X</span>
                {category.name.trim()}
              </div>
            ))}
          </div>
          <input
            className='note-categories'
            type="text"
            placeholder='Food, Groceries, Shopping...'
            maxLength={15}
          />
          <button type='button' className='submit-button' onClick={handleAddCategory}>Add Category</button>

          <div className='button-group'>
            <button onClick={addOrUpdateNote} className='submit-button'>{mode === "add" ? "Save Note" : "Update Note"}</button>
            <button type='button' className='cancel-button' onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;