const Joi = require("joi");

const getNewsSchema = Joi.object({
  searchQuery: Joi.string(),
  page: Joi.string(),
  limit: Joi.string(),
})

module.exports = { getNewsSchema };