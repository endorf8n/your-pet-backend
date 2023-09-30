const { Schema, model } = require("mongoose");

const { handleValidateError, runUpdateValidators } = require("./hooks");
const {
  emailRegexp,
  birthdayRegexp,
  phoneRegexp,
  cityRegexp,
  defaultAvatar,
} = require("../constants/user-constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: true,
    },

    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },

    token: String,

    refreshToken: String,

    avatarURL: {
      type: String,
      default: defaultAvatar,
    },

    birthday: {
      type: Date,
    },

    phone: {
      type: String,
      match: phoneRegexp,
      default: "+380000000000",
    },

    city: {
      type: String,
      match: cityRegexp,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleValidateError);

userSchema.pre("findOneAndUpdate", runUpdateValidators);

userSchema.post("findOneAndUpdate", handleValidateError);

const User = model("user", userSchema);

module.exports = User;
