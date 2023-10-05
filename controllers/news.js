const New = require("../models/new");
const { ctrlWrapper } = require("../decorators");
const { HttpError, buildPaginationOptions } = require("../helpers");
const { getNewsSchema } = require("../schemas/news");

const getNews = async (req, res) => {
  const { error } = getNewsSchema.validate(req.query);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { skip, page, limit } = buildPaginationOptions(req.query);
  const { searchQuery = "" } = req.query;
  const searchConfigurations = {};

  if (searchQuery) {
    searchConfigurations.title = { $regex: searchQuery, $options: "i" };
  }

  const total = await New.countDocuments(searchConfigurations);
  const totalPages = Math.ceil(total / limit);
  if (total === 0 || page > totalPages ) {
    throw HttpError(404, "News not found for your request")
  }

  const news = await New.find(searchConfigurations)
    .select("uuid title description url image_url published_at")
    .skip(skip)
    .limit(limit)
    .sort({ published_at: -1 });
  
  res.status(200).json({ page, limit, total, totalPages, news});
};

module.exports = {
  getNews: ctrlWrapper(getNews),
};
