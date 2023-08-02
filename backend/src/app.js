const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const NoteRouter = require('./module/routes/noteRouter');
const CategoryRouter = require('./module/routes/categoryRouter');

app.use('/api/notes', NoteRouter);
app.use('/api/categories', CategoryRouter);


// This route is used for testing purposes.
app.get('/', (req, res) => {
  res.json({ message: 'hello' })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
