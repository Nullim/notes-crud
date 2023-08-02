module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'Silver W0lf',
  DB: 'notes_database',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}