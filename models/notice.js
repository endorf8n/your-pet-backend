const { Schema, model } = require("mongoose");
const {
  category,
  titleRegexp,
  nameRegexp,
  dateRegexp,
  sex,
  cityRegexp,
} = require("../constants/notice-constants");
const { handleValidateError } = require("./hooks");

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: category,
      required: [true, "Category pet is required"],
    },
    title: {
      type: String,
      minlength: 3,
      maxlength: 32,
      match: titleRegexp,
      index: "text",
      required: [true, "Title notice is required"],
    },
    name: { 
      type: String,
      minlength: 2,
      maxlength: 16,
      match: nameRegexp,
      required: [true, "Name pet is required"],
    },
    date: {
      type: String,
      match: dateRegexp,
      required: [true, "Date of birth is required"],
    },
    type: {
      type: String,
      minlength: 2,
      maxlength: 16,
      match: nameRegexp,
      required: [true, "Type pet is required"],
    },
    file: {
      type: String,
      required: [true, "File pet is required"],
    },
    sex: {
      type: String,
      enum: sex,
      required: [true, "Sex pet is required"],
    },
    location: {
      type: String,
      match: cityRegexp,
      required: [true, "Location pet is required"],
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    comments: {
      type: String,
      maxlength: 120,
      default: "",
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: "user",
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

noticeSchema.post("save", handleValidateError);

const Notice = model("notice", noticeSchema);

module.exports = Notice;
