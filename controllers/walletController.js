const wallet = require("../database/wallet");

// get All Transaction Of user
exports.getAllUserTransaction = async (req, res, next) => {
  const userId = req.params.userId;
  wallet.getWalletTransactionsByUserId(userId, (error, results) => {
    if (error) {
      console.error("Error retrieving transactions:", error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
};

// transfer money from one wallet to another
exports.addtransaction = async (req, res, next) => {
  const { user_id_transfer, user_id_trensfered, money } = req.body;
  wallet.AddTransaction(
    user_id_transfer,
    user_id_trensfered,
    money,
    (error, results) => {
      if (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ error: "An error occurred" });
      } else {
        res.json({ message: "Transaction created successfully", results });
      }
    }
  );
};
