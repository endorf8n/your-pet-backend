const { Schema, model } = require("mongoose");

const { handleValidateError } = require("./hooks");

const { birthdayRegexp } = require("../constants/user-constants");

const petSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
    },

    dateOfBirth: {
      type: String,
      match: birthdayRegexp,
      required: [true, "Date of birth is required"],
    },

    type: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, "Type is required"],
    },

    comments: {
      type: String,
      maxlength: 180,
    },

    petURL: {
      type: String,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post("save", handleValidateError);

const Pet = model("pet", petSchema);

module.exports = Pet;
