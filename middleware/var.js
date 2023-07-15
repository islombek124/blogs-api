const jwt = require("jsonwebtoken");
const User = require("../modules/UserSchema");

module.exports = async function (req, res, next) {
  const isToken = req.cookies.token ? true : false;
  res.locals.token = isToken;
  if (req.cookies.token) {
    const { userId } = jwt.decode(req.cookies.token);
    const user = await User.findById(userId);
    res.locals.isUserAdmin = user.role === "admin" ? true : false;
  }
  next();
};
