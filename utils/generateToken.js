const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");

function generateToken(user) {
  const payload = {
    subject: user._id,
    username: user.username,
    email: user.email,
  };
  const secret = JWT_SECRET;

  const option = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, option);
}

module.exports = { generateToken };
