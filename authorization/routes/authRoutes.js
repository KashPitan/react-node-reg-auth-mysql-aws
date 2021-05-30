const Express = require("express");
const Router = Express.Router();
const { check } = require("express-validator");
const dotenv = require("dotenv");
const validatePasswords = require("../middleware/validatePasswords");

const authController = require("../controllers/authController");

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
  authController.register_post
);

Router.post(
  "/login",
  [
    check("email", "Please enter an email").notEmpty(),
    check("password", "Please enter password").notEmpty(),
  ],
  authController.login_post
);

Router.get("/logout", authController.logout_get);

Router.post("/token", authController.token_post);

module.exports = Router;
