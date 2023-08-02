const dbConfig = require('../../database/dbConfig');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql'
}
)

sequelize.authenticate()
.then(() => {
  console.log('connected...')
})
.catch(err => {
  console.log('error: ' + err)
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.notes = require('./noteModel')(sequelize, DataTypes);
db.categories = require('./categoryModel')(sequelize, DataTypes);
db.note_categories = require('./noteCategoryModel')(sequelize, DataTypes);

const Note = db.notes;
const Category = db.categories;
const NoteCategory = db.note_categories;

Note.belongsToMany(Category, { through: NoteCategory });
Category.belongsToMany(Note, { through: NoteCategory });

db.sequelize.sync({force: true})
.then(() => {
  console.log('done!')
})

module.exports = db;
