const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(12);
exports.HashPassword = (password) => bcrypt.hashSync(password, salt);

exports.ComparePasswords = async (password, hashed_password) => {
  return await bcrypt.compare(password, hashed_password);
};
exports.createToken = (user) =>
  jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "30s" });

exports.createRefreshToken = (user) =>
  jwt.sign(user, process.env.REFRESH_SECRET_KEY, { expiresIn: "8h" });
