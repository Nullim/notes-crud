const NoteController = require('../controllers/noteController');

const router = require('express').Router();

router.post('/addNote', NoteController.addNote);
router.get('/active', NoteController.getAllActiveNotes);
router.get('/archived', NoteController.getAllArchivedNotes);

router.get('/:id', NoteController.getNote);
router.put('/update/:id', NoteController.updateNote);
router.put('/archive/:id', NoteController.archiveNote);
router.delete('/:id', NoteController.deleteNote);

module.exports = router
