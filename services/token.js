const jwt = require("jsonwebtoken");

const generateJWToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  return accessToken;
};

module.exports = generateJWToken;
