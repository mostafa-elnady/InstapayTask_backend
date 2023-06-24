const wallet = require("../database/wallet");


// get All Transaction Of user 
exports.getAllUserTransaction = async(req,res,next) => {
    const userId = req.params.userId;
    wallet.getWalletTransactionsByUserId(userId, (error, results) => {
      if (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json(results);
      }
    });
  }

  