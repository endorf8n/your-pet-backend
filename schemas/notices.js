const Joi = require("joi");
const {
  titleRegexp,
  nameRegexp,
  dateRegexp,
  sex,
  cityRegexp,
  category,
} = require("../constants/notice-constants");

const noticeAddSchema = Joi.object({
  category: Joi.string()
    .valid(...category)
    .required()
    .messages({
      "string.valid.base": "Category must be sell, lost-found or in-good-hands",
      "any.required": "Category pet is required",
    }),
  title: Joi.string()
    .min(4)
    .max(64)
    .pattern(titleRegexp)
    .required()
    .messages({
      "string.min": "Title notice must be at least {#limit} characters long",
      "string.max": "Title notice must be no more than {#limit} characters",
      "string.pattern.base": "The title notice must contain only letters",
      "any.required": "Title notice is required",
    }),
  name: Joi.string()
    .min(2)
    .max(16)
    .pattern(nameRegexp)
    .required()
    .messages({
      "string.min": "Name pet must be at least {#limit} characters long",
      "string.max": "Name pet must be no more than {#limit} characters",
      "string.pattern.base": "The name pet must contain only letters",
      "any.required": "Name pet is required",
    }),
  type: Joi.string()
    .min(2)
    .max(16)
    .pattern(nameRegexp)
    .required()
    .messages({
      "string.min": "Type pet must be at least {#limit} characters long",
      "string.max": "Type pet must be no more than {#limit} characters",
      "string.pattern.base": "The type pet must contain only letters",
      "any.required": "Type pet is required",
    }),
  date: Joi.string()
    .pattern(dateRegexp)
    .required()
    .messages({
      "string.pattern.base": "Date of birth pet must be in the format DD-MM-YYYY",
      "any.required": "Date of birth pet is required",
    }),
  file: Joi.any()
    .messages({
      "any.required": "File is required",
    }),
  sex: Joi.string()
    .valid(...sex)
    .required()
    .messages({
      "string.valid.base": "Sex must be male or female",
      "any.required": "Sex pet is required",
    }),
  location: Joi.string()
    .pattern(cityRegexp)
    .required()
    .messages({
      "string.pattern.base":
        "Please enter the name of a city with a capital letter at the beginning.",
      "any.required": "Location pet is required",
    }),
  comments: Joi.string().max(120)

});

const noticeAddSellSchema = Joi.object({
  price: Joi.string()
  .required()
  .invalid('0')
  .messages({
    'string.invalid': 'Price must not be 0',
    "any.required": "Price pet is required",
  }),
  category: Joi.string()
    .valid(...category)
    .required()
    .messages({
      "string.valid.base": "Category must be sell, lost-found or in-good-hands",
      "any.required": "Category pet is required",
    }),
  title: Joi.string()
    .min(3)
    .max(32)
    .pattern(titleRegexp)
    .required()
    .messages({
      "string.min": "Title notice must be at least {#limit} characters long",
      "string.max": "Title notice must be no more than {#limit} characters",
      "string.pattern.base": "The title notice must contain only letters",
      "any.required": "Title notice is required",
    }),
  name: Joi.string()
    .min(2)
    .max(16)
    .pattern(nameRegexp)
    .required()
    .messages({
      "string.min": "Name pet must be at least {#limit} characters long",
      "string.max": "Name pet must be no more than {#limit} characters",
      "string.pattern.base": "The name pet must contain only letters",
      "any.required": "Name pet is required",
    }),
  type: Joi.string()
    .min(2)
    .max(16)
    .pattern(nameRegexp)
    .required()
    .messages({
      "string.min": "Type pet must be at least {#limit} characters long",
      "string.max": "Type pet must be no more than {#limit} characters",
      "string.pattern.base": "The type pet must contain only letters",
      "any.required": "Type pet is required",
    }),
  date: Joi.string()
    .pattern(dateRegexp)
    .required()
    .messages({
      "string.pattern.base": "Date of birth pet must be in the format DD-MM-YYYY",
      "any.required": "Date of birth pet is required",
    }),
  file: Joi.any()
    .messages({
      "any.required": "File is required",
    }),
  sex: Joi.string()
    .valid(...sex)
    .required()
    .messages({
      "string.valid.base": "Sex must be male or female",
      "any.required": "Sex pet is required",
    }),
  location: Joi.string()
    .pattern(cityRegexp)
    .required()
    .messages({
      "string.pattern.base":
        "Please enter the name of a city with a capital letter at the beginning.",
      "any.required": "Location pet is required",
    }),
  comments: Joi.string().max(120)
});

const noticesGetSchema = Joi.object({
  category: Joi.string()
    .valid(...category)
    .required()
    .messages({
      "string.valid.base": "Category must be sell, lost-found or in-good-hands",
      "any.required": "Category pet is required",
    }),
  sex: Joi.string()
    .valid(...sex)
    .messages({
      "string.valid.base": "Sex must be male or female",
    }),
  searchQuery: Joi.string(),
  age: Joi.string(),
  page: Joi.string(),
  limit: Joi.string(),
})

module.exports = {
  noticeAddSchema,
  noticeAddSellSchema,
  noticesGetSchema
}