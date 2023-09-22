const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { noticeId } = req.params;
  if (!isValidObjectId(noticeId)) {
    return next(HttpError(404, `${noticeId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
