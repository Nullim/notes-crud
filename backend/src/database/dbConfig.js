module.exports = {
  HOST: 'localhost',
  USER: 'your_mysql_username',
  PASSWORD: 'your_myseql_password',
  DB: 'your_mysql_database_name',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}