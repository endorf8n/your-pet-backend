const { Schema, model } = require('mongoose');
const { handleValidateError } = require("./hooks");

const noticeSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  }
);

noticeSchema.post("save", handleValidationError);
const Notice = model("notice", noticeSchema);

module.exports = Notice;