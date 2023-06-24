const mysql = require("mysql");



// connecting to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  connectionLimit: 10,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connecting to database ");
});

module.exports = connection;
