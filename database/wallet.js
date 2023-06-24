const db = require("../database/db");

//get all user Transaction
const getWalletTransactionsByUserId = (userId, callback) => {
  const query =
    "SELECT * FROM wallet WHERE user_id_transfer = ? OR user_id_trensfered = ?";
  db.query(query, [userId, userId], (error, results) => {
    if (error) {
      console.error("Error retrieving transactions:", error);
      callback(error);
    } else {
      callback(null, results);
    }
  });
};


// transfer money from one wallet to another
 const AddTransaction = (user_id_transfer, user_id_trensfered, money, callback) => {
    const query = 'INSERT INTO wallet (user_id_transfer, user_id_trensfered, money) VALUES (?, ?, ?)';
    pool.query(query, [user_id_transfer, user_id_trensfered, money], (error, results) => {
      if (error) {
        console.error('Error creating transaction:', error);
        callback(error);
      } else {
        callback(null, results);
      }
    });
  };


module.exports = {
  getWalletTransactionsByUserId,
  AddTransaction
};

// To get the list of previous transactions for a user, create a GET endpoint:

// app.get('/users/:userId/transactions', (req, res) => {
//     const userId = req.params.userId;
//     const query = 'SELECT * FROM transactions WHERE sender_id = ? OR receiver_id = ?';
//     pool.query(query, [userId, userId], (error, results) => {
//       if (error) {
//         console.error('Error retrieving transactions:', error);
//         res.status(500).json({ error: 'An error occurred' });
//       } else {
//         res.json(results);
//       }
//     });
//   });

// To transfer money from one wallet to another, create a POST endpoint:
// app.post('/transactions', (req, res) => {
//     const { senderId, receiverId, amount } = req.body;
//     const query = 'INSERT INTO transactions (sender_id, receiver_id, amount) VALUES (?, ?, ?)';
//     pool.query(query, [senderId, receiverId, amount], (error, results) => {
//       if (error) {
//         console.error('Error creating transaction:', error);
//         res.status(500).json({ error: 'An error occurred' });
//       } else {
//         res.json({ message: 'Transaction created successfully' });
//       }
//     });
//   });
