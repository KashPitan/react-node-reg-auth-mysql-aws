const Express = require("express");
const Router = Express.Router();
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { auth } = require("../middleware/auth");

dotenv.config();

//get personal user data: route protected
Router.get("/me", auth, async (req, res, next) => {
  console.log("hello");
  const header = req.header("Authorization");
  const token = header && header.split(" ")[1];

  try {
    //get current users id
    let decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    let id = decodedToken.user.id;
    let user = await User.findOne({ where: { email: id }, raw: true });
    if (!user) {
      return res.status(400).send({
        errors: [{ msg: "Account does not exist" }],
      });
    }

    //remove info that could be a security risk if sent back to client
    delete user.refresh_token;
    delete user.password;

    res.status(200).send({ user });
  } catch (err) {
    res.status(500).send({ errors: [{ msg: "Server Error" }] });
  }
});

module.exports = Router;
