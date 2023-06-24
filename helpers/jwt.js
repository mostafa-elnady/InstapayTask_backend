const { expressjwt: expressJwt } = require("express-jwt");

const authJwt = () => {
  const secret = process.env.secret;

  return expressJwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: /users(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /wallets(.*)/, methods: ["GET", "OPTIONS"] },
      `/users/login`,
      `/users/register`,
    ],
  });
};

module.exports = authJwt