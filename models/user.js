const { Schema, model } = require("mongoose");

const { handleValidateError, runUpdateValidators } = require("./hooks");
const {
  emailRegexp,
  passwordRegexp,
  birthdayRegexp,
  phoneRegexp,
  cityRegexp,
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

    avatarURL: {
      type: String,
      default: "",
    },

    birthday: {
      type: String,
      match: birthdayRegexp,
      default: null,
    },

    phone: {
      type: String,
      match: phoneRegexp,
      default: null,
    },

    city: {
      type: String,
      match: cityRegexp,
      default: null,
    },

    // pet: {
    //   type: Schema.Types.ObjectId,
    //   ref: "pet",
    //   default: [],
    // },

    // notice: {
    //   type: Schema.Types.ObjectId,
    //   ref: "notice",
    //   default: [],
    // },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleValidateError);

userSchema.pre("findOneAndUpdate", runUpdateValidators);

userSchema.post("findOneAndUpdate", handleValidateError);

const User = model("user", userSchema);

module.exports = User;
