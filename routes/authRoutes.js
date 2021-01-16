const Express = require("express");
const User = require("../models/UserModel");
const Router = Express.Router();
const { check, validationResult } = require("express-validator");
const Bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const validatePasswords = require("../middleware/validatePasswords");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/auth");

dotenv.config();

//when the user registers
Router.post(
  "/register",
  [
    check("username", "Username required").not().isEmpty(),
    check("email", "Include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with at least 6 characters"
    ).isLength({ min: 6 }),
    validatePasswords,
  ],
  async (req, res, next) => {
    //store error messages in array
    const errors = validationResult(req);

    //if there are errors return error array
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).send({
          errors: [{ msg: "Account already exists" }],
        });
      }

      //creates a user if the details given are valid
      user = await User.create(req.body);

      res.status(200).send({ msg: "User Created" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }
  }
);

Router.post(
  "/login",
  [
    check("email", "Please enter an email").notEmpty(),
    check("password", "Please enter password").notEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    //if there are errors return error array
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;

      //checks to see if the user with the input email exists
      let user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).send({
          errors: [{ msg: "Account with entered email does not exist" }],
        });
      }

      //checks if the password entered matches the user found
      let passwordMatch = Bcrypt.compareSync(password, user.password);

      //if the password matches create the jwt
      if (passwordMatch) {
        let payload = {
          user: {
            id: email,
          },
        };

        let accessToken = generateAccessToken(payload);
        let refreshToken = generateRefreshToken(payload);

        //send ok status, set cookies,send message response
        //httponly flag helps protect against xss attacks
        res
          .status(200)
          .cookie("accessToken", accessToken, { httponly: true })
          .cookie("refreshToken", refreshToken, { httponly: true })
          .send({ accessToken, refreshToken, msg: "Login Successful" });
      } else {
        return res
          .status(400)
          .send({ errors: [{ msg: "Password is incorrect" }] });
      }
    } catch (err) {
      res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }
  }
);

Router.post("/token", async (req, res, next) => {
  const refreshToken = req.body.token;

  if (refreshToken === null) return res.status(401);
  try {
    //get email from request body
    const email = req.body.id;
    //checks to see if the user with the input email exists
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({
        errors: [{ msg: "Account does not exist" }],
      });
    }

    //check refresh token matches the one from the account before
    //creating a new access token
    const refreshTokenFromDB = user.refresh_token;
    if (refreshTokenFromDB !== refreshToken) {
      return res.status(400).send({
        errors: [{ msg: "Refresh token is not valid" }],
      });
    }

    let payload = {
      user: {
        email: email,
      },
    };
    let accessToken = generateAccessToken(payload);

    res
      .status(200)
      .cookie("accessToken", accessToken, { httponly: true, overwrite: true })
      .send({ accessToken, msg: "Access token successfully refreshed" });
  } catch (err) {
    res.status(500).send({ errors: [{ msg: "Server Error" }] });
  }
});

module.exports = Router;
