const { Schema, model } = require("mongoose");
const { handleValidateError } = require("./hooks");

const newSchema = new Schema(
  {
    uuid: {
      type: String,
      required: [true, "uuid news is required"],
    },
    title: {
      type: String,
      required: [true, "Title news is required"],
    },
    description: {
      type: String,
      required: [true, "Description news is required"],
    },
    keywords: {
      type: String,
      default: "",
    },
    snippet: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      required: [true, "Source url is required"],
    },
    image_url: {
      type: String,
      required: [true, "Image url is required"],
    },
    language: {
      type: String,
      default: "en",
    },
    published_at: {
      type: String,
      required: [true, "Published at is required"],
    },
    source: {
      type: String,
      default: "",
    },
    categories: {
      type: [String],
      default: [],
    },
    relevance_score: {
      type: String,
      default: null,
    },
    locale: {
      type: String,
      default: "us",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

newSchema.post("save", handleValidateError);

const New = model("new", newSchema);

module.exports = New;
