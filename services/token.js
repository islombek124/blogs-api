const jwt = require("jsonwebtoken");

const generateJWToken = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    "440a087e773915d1610bbfbe4b9f49b327f015c046c8d12db6994dee11bce502e952a696f54ee6be95f1f0830f649c89b30c1689ef946f8fefe8d2366ac53c28",
    {
      expiresIn: "30d",
    }
  );

  return accessToken;
};

module.exports = generateJWToken;
