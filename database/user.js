const db = require('../database/db')
const bcrypt = require('bcryptjs')

//get all users
const getAllUsers = (callback)=>{
    db.query('SELECT * FROM users',callback)
}

//check if email already exist
const checkEmailExists = (email, callback) => {
    db.query('SELECT COUNT(*) AS count FROM users WHERE email = ?', email, (err, results) => {
      if (err) {
        callback(err);
      } else {
        const count = results[0].count;
        callback(null, count > 0);
      }
    });
  };

//register
  const registerUser = (userData, callback) => {
    const { email, password, firstName, lastName, mobile, national_id } = userData;
  
    checkEmailExists(email, (err, emailExists) => {
      if (err) {
        callback(err);
      } else if (emailExists) {
        callback('Email already exists');
      } else {
        // Hash the password before storing it in the database
        const hashedPassword = bcrypt.hashSync(password, 10);
  
        // Create a new user object
        const user = {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          mobile,
          national_id,
        };
  
        // Insert the user into the database
        db.query('INSERT INTO users SET ?', user, callback);
      }
    });
  };

//login
const loginUser = (email, password, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
      if (err) {
        callback(err);
      } else {
        if (results.length === 0) {
          callback('User not found');
        } else {
          const user = results[0];
          const isPasswordValid = bcrypt.compareSync(password, user.password);
          if (isPasswordValid) {
            callback(null, user);
          } else {
            callback('Invalid password');
          }
        }
      }
    });
  };

module.exports = {getAllUsers,registerUser , loginUser}