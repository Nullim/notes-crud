const dbConfig = require('../../database/dbConfig');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
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
