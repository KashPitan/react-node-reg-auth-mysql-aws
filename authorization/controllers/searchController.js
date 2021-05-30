const User = require("../models/UserModel");
const { Op } = require("sequelize");

// dotenv.config();

module.exports.user_search_get = async (req, res, next) => {
  console.log("user search route hit");
  try {
    const { searchText } = req.query;

    //find any and all users that have a username or
    // email that match or contain the search query
    let users = await User.findAll({
      attributes: { exclude: ["password", "refresh_token"] },
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${searchText}%` } },
          { email: { [Op.like]: `%${searchText}%` } },
        ],
      },
      raw: true,
    });

    console.log(users);
    if (!users) {
      return res.status(400).send({
        errors: [{ msg: "Found no matching users" }],
      });
    }
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errors: [{ msg: "Server Error" }] });
  }
};
