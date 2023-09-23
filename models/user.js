const { Schema, model } = require("mongoose");

const { handleValidateError, runUpdateValidators } = require("./hooks");
const {
  emailRegexp,
  passwordRegexp,
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

    avatarURL: {
      type: String,
      default: defaultAvatar,
    },

    birthday: {
      type: String,
      match: birthdayRegexp,
      default: "00-00-0000",
    },

    phone: {
      type: String,
      match: phoneRegexp,
      default: "+38000000000",
    },

    city: {
      type: String,
      match: cityRegexp,
      default: "",
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
