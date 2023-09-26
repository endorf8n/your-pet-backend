const New = require("../models/new");
const { ctrlWrapper } = require("../decorators");
const { HttpError } = require("../helpers");

const getNews = async (req, res) => {
  const { page = 1, limit = 6, searchQuery = "" } = req.query;
  const skip = (page - 1) * limit;
  const searchConfigurations = {};
  const score = {};

  if (searchQuery) {
    searchConfigurations["$text"] = { $search: searchQuery };
    score.score = { $meta: "textScore" };
  }

  const total = await New.countDocuments(searchConfigurations);
  const totalPages = Math.ceil(total / limit);
  if (total === 0 || page > totalPages ) {
    throw HttpError(404, "News not found for your request")
  }

  const news = await New.find(searchConfigurations, score)
    .select("uuid title description url image_url published_at")
    .skip(skip)
    .limit(limit)
    .sort({ ...score, published_at: -1 });
  
  res.status(200).json({ page, limit, total, totalPages, news});
};

module.exports = {
  getNews: ctrlWrapper(getNews),
};
