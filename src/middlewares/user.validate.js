const joi = require('joi');

const schema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  image: joi.string(),
});

const create = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = { create };
