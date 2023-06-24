const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


//get All users
router.get("/", userController.getAllUsers);

//register
router.post("/register", userController.register);

//login
router.post("/login", userController.login);

module.exports = router;
