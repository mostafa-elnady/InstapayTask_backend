const express = require("express");
const router = express.Router();
const walletController = require('../controllers/walletController')


//get All Transaction of user
router.get("/:userId", walletController.getAllUserTransaction);



module.exports = router;
