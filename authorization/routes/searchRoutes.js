const Express = require("express");
const Router = Express.Router();
const dotenv = require("dotenv");

const { auth } = require("../middleware/auth");

const searchController = require("../controllers/searchController");

dotenv.config();

//get personal user data: route protected
Router.get("/user", /*auth,*/ searchController.user_search_get);

module.exports = Router;
