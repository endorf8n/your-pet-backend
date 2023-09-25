const New = require("../models/new");
const { ctrlWrapper } = require("../decorators");
const { HttpError } = require("../helpers");

const getNews = async (req, res) => {
  const news = await New.find(
    {},
    { uuid: 1, title: 1, description: 1, url: 1, image_url: 1, published_at: 1 }
  ).sort({ published_at: -1 });
  if (news.length === 0) {
    throw HttpError(404, "Sorry, news not found");
  }
  res.status(200).json(news);
};

module.exports = {
  getNews: ctrlWrapper(getNews),
};
