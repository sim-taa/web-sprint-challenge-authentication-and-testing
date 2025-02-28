const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  checkNewUser,
  authenticateUser,
  validateCredentialsPresent,
} = require("./auth-middleware");
const User = require("../users/user-model");
/*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!
    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }
    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }
    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".
    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
router.post(
  "/register",
  validateCredentialsPresent,
  checkNewUser,
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.createUser({
        username: username,
        password: bcrypt.hashSync(password, 8),
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({
        message: "username and password required",
      });
    }
  }
);
/*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
router.post(
  "/login",
  validateCredentialsPresent,
  authenticateUser,
  (req, res) => {
    console.log("hello from auth-router");
    // try {
    // } catch (error) {
    //   res.status(500).json({
    //     message: "failed to log in",
    //   });
    // }
  }
);

module.exports = router;
