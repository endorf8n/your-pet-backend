const Friend = require("../models/friend");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const getFriends = async (req, res) => {
  const result = await Friend.find();

  if (!result) {
    throw HttpError(404);
  }

  res.json({
    friends: [...result],
  });
};

module.exports = {
  getFriends: ctrlWrapper(getFriends),
};
