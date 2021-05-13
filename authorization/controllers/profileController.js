const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports.me_get = async (req, res, next) => {
  const token = req.token;

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
};
