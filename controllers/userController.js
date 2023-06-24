const user = require("../database/user");
const { validateRegister, validateLogin } = require("../validations/validator");
const secret = process.env.secret;
const jwt = require("jsonwebtoken");

//get all users
exports.getAllUsers = async (req, res, next) => {
  user.getAllUsers((err, users) => {
    if (err) return res.status(500).json({ message: "Internal Server Error " });
    res.status(200).json(users);
  });
};

//user register
exports.register = async (req, res, next) => {
  const { error } = validateRegister(req.body);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message);
    return res.status(400).json({ error: errorMessage });
  }

  const { email, password, firstName, lastName, mobile, national_id } =
    req.body;

  const userData = {
    email,
    password,
    firstName,
    lastName,
    mobile,
    national_id,
  };

  user.registerUser(userData, (err) => {
    if (err) {
      if (err === "Email already exists") {
        res.status(400).json({ error: "Email already exists" });
      } else {
        console.error(err);
        res.status(500).json({ error: "Failed to register user" });
      }
    } else {
      res.status(200).json({ message: "User registered successfully" });
    }
  });
};

//login user
exports.login = async (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message);
    return res.status(400).json({ error: errorMessage });
  }

  const { email, password } = req.body;

  user.loginUser(email, password, (err, user) => {
    if (err === "User not found") {
      res.status(404).json({ error: "User not found" });
    } else if (err === "Invalid password") {
      res.status(401).json({ error: "Invalid password" });
    } else if (err) { 
      console.error(err);
      res.status(500).json({ error: "Failed to login" });
    } else {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        secret,
        {
          expiresIn: "1d",
        }
      );
      console.log(typeof user);
      res
        .status(200)
        .send( { ...user, token } );
    }
  });
};
