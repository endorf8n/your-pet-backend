const { Schema, model } = require("mongoose");

const { handleValidateError } = require("./hooks");

const friendSchema = new Schema(
  {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    addressUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    address: {
      type: String,
    },
    workDays: {
      type: Array,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

friendSchema.post("save", handleValidateError);

const Friend = model("friend", friendSchema);

module.exports = Friend;
