const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv/config");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users.router");
const walletRouter = require("./routes/wallet.router")
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

const app = express();

// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(cors());
app.options("*", cors);


// middleware to Parse incoming request
app.use(bodyParser.json());

app.use(express.json());
// for logging request
app.use(morgan("dev"));

// jwt
app.use(authJwt());

// error handlers
app.use(errorHandler);
//routes
app.use("/users", userRouter);
app.use("/wallets", walletRouter);

const port = process.env.PORT;
app.listen(port || 5000, () => {
  console.log(`express app running on port ${port} successfully`);
});
