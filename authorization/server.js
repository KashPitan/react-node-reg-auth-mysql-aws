const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { Sequelize } = require("sequelize");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const searchRoutes = require("./routes/searchRoutes");

const BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const morgan = require("morgan");

const Cors = require("cors");

const sequelize = new Sequelize(
  process.env.RDS_DATABASE,
  process.env.RDS_USERNAME,
  process.env.RDS_PASSWORD,
  {
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(function (err) {
    console.log("Databse connection has been established successfully.");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

const App = express();

//parse body of api routes
App.use(BodyParser.json());

//parse/read the cookies sent with the requests
App.use(cookieParser());

//enable cross origin requests to this server
App.use(Cors({ credentials: true, origin: "http://localhost:5000" }));

//morgan middleware for logging http requests
App.use(morgan("tiny"));

//routes from routes folder
App.use("/auth", authRoutes);
App.use("/profile", profileRoutes);
App.use("/search", searchRoutes);

App.listen(process.env.PORT || 4000, function () {
  if (process.env.PORT) {
    console.log(process.env.PORT);
  } else {
    console.log("listening on port 4000");
  }
});

module.exports = App;
