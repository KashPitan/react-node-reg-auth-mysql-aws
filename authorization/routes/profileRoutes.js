const Express = require("express");
const Router = Express.Router();
const dotenv = require("dotenv");

const { auth } = require("../middleware/auth");

const profileController = require("../controllers/profileController");

dotenv.config();

//get personal user data: route protected
Router.get("/me", auth, profileController.me_get);

module.exports = Router;
