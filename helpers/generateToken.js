const { JWT_SECRET, JWT_REFRESH_TOKEN } = process.env;
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN, {
    expiresIn: "30d",
  });

  return {token, refreshToken}
};

module.exports = generateToken;