const Joi = require("joi");

const { birthdayRegexp } = require("../constants/user-constants");

const addPetSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name of pet is required",
  }),

  dateOfBirth: Joi.string().pattern(birthdayRegexp).required().messages({
    "string.pattern.base":
      "Please enter your pet's date of birth in the format DD-MM-YYYY",
    "any.erquired": "The date of birth is required",
  }),

  type: Joi.string().min(2).max(20).required().messages({
    "string.min": "Type must be at least {#limit} characters long",
    "string.max": "Type must be no more than {#limit} characters",
    "any required": "Type is required",
  }),

  petImage: Joi.any().messages({
    "any.required": "PetImage is required",
  }),

  comments: Joi.string().max(180).messages({
    "string.max": "Comments must be no more than {#limit} characters",
  }),
});

module.exports = {
  addPetSchema,
};
