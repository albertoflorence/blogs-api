const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secret_sauce';
const EXPIRES_IN = '1d';

const generate = (data) =>
  jwt.sign(data, SECRET, { expiresIn: EXPIRES_IN });

const decode = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generate, decode,
};
