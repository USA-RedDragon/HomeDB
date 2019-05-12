// db config for sequelize cli
module.exports = {
  "username": (process.env.MYSQL_USER || 'homedb'),
  "password": (process.env.MYSQL_PASSWORD || 'homedb'),
  "database": (process.env.MYSQL_DATABASE || 'homedb'),
  "host": (process.env.MYSQL_HOST || 'localhost'),
  "dialect": 'mysql'
}