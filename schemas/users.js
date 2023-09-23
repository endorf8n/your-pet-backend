const Joi = require("joi");

const {
  emailRegexp,
  passwordRegexp,
  birthdayRegexp,
  phoneRegexp,
  cityRegexp,
} = require("../constants/user-constants");

const userRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(16).required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegexp)
    .required()
    .messages({
      "string.min": "Password must be at least {#limit} characters long",
      "string.max": "Password must be no more than {#limit} characters",
      "string.pattern.base":
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
      "any.required": "Password is required",
    }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegexp)
    .required()
    .messages({
      "string.min": "Password must be at least {#limit} characters long",
      "string.max": "Password must be no more than {#limit} characters",
      "string.pattern.base":
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
      "any.required": "Password is required",
    }),
});

const userEditProfileSchema = Joi.object({
  name: Joi.string(),

  email: Joi.string().pattern(emailRegexp).messages({
    "string.pattern.base": "Please enter a valid email address",
  }),
  birthday: Joi.string().pattern(birthdayRegexp).messages({
    "string.pattern.base":
      "Please enter your date of birth in the format DD-MM-YYYY",
  }),
  phone: Joi.string().pattern(phoneRegexp).messages({
    "string.pattern.base":
      "Please enter your phone number in the format +380xxxxxxxxx",
  }),
  city: Joi.string().pattern(cityRegexp).messages({
    "string.pattern.base":
      "Please enter the name of a city with a capital letter at the beginning.",
  }),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userEditProfileSchema,
};
