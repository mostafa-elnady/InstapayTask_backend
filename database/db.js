const mysql = require('mysql')


// connecting to database
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"instapay-task",
    connectionLimit: 10

})

connection.connect((err)=>{
    if(err) throw err
    console.log('connecting to database ')
})


module.exports = connection;

