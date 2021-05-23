const User = require("../models/UserModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/auth");
const { validationResult } = require("express-validator");
const Bcrypt = require("bcryptjs");

module.exports.register_post = async (req, res, next) => {
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
};

module.exports.login_post = async (req, res, next) => {
  const errors = validationResult(req);
  //if there are errors return error array
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    //checks to see if the user with the input email exists
    let user = await User.findOne({
      attributes: { exclude: ["password", "refresh_token"] },
      where: { email },
      raw: true,
    });
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

      console.log(user);
      //send ok status, set cookies,send message response
      //httponly flag helps protect against xss attacks
      //expiry set to 1 minute for test
      res
        .status(200)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 60000),
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
        })
        .send({ accessToken, refreshToken, msg: "Login Successful", user });
    } else {
      return res
        .status(400)
        .send({ errors: [{ msg: "Password is incorrect" }] });
    }
  } catch (err) {
    res.status(500).send({ errors: [{ msg: "Server Error" }] });
  }
};

module.exports.logout_get = async (req, res, next) => {
  if (req.cookies) {
    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .send({ msg: "successfully logged out" });
  } else {
    res.status(403).send({ msg: "not logged in" });
  }
};

module.exports.token_post = async (req, res, next) => {
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
};
