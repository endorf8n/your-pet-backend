const Notice = require("../models/notice");
const { ctrlWrapper } = require("../decorators");
const { noticeAddSchema, noticeAddSellSchema } = require("../schemas/notices");
const { HttpError, cloudinaryUploader } = require("../helpers");
const noticeConst = require("../constants/notice-constants");

const getNotices = async (req, res) => {
  const { page = 1, limit = 12, category, searchQuery = "" } = req.query;
  const skip = (page - 1) * limit;
  const searchConfigurations = {};
  const score = {};

  if (!noticeConst.category.includes(category)) {
    throw HttpError(
      400,
      "Bad request, category must be sell, lost-found or in-good-hands"
    );
  }
  searchConfigurations.category = category;

  if (searchQuery) {
    searchConfigurations["$text"] = { $search: searchQuery };
    score.score = { $meta: "textScore" };
  }
  
  const total = await Notice.countDocuments(searchConfigurations);
  const totalPages = Math.ceil(total / limit);
  if (total === 0 || page > totalPages ) {
    throw HttpError(404, "Noties not found for your request")
  }
  
  const notices = await Notice.find(searchConfigurations, score, {
    skip,
    limit,
  }).populate({
    path: "owner",
    select: { email: 1, phone: 1 },
  }).sort({ ...score, createdAt: -1 });

  res.status(200).json({ page, limit, total, totalPages, notices });
};

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId).populate({
    path: "owner",
    select: { email: 1, phone: 1 },
  });
  if (!notice) {
    throw HttpError(404, "Notice not found");
  }

  res.status(200).json({
    notice,
  });
};

const getUserNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const total = await Notice.countDocuments({ owner });
  const totalPages = Math.ceil(total / limit);
  if (total === 0 || page > totalPages) {
    throw HttpError(404, "Your notice not found for your request");
  }

  const notices = await Notice.find({ owner }, "", { skip, limit }).sort({
    createdAt: -1,
  });

  res.status(200).json({ page, limit, total, totalPages, notices });
};

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;
  const { category, price } = req.body;
  const { path, filename } = req.file;

  if (category === "sell") {
    const { error } = noticeAddSellSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const file = await cloudinaryUploader(path, "pets", filename);
    const notice = await Notice.create({
      ...req.body,
      price: Number(price),
      file,
      owner,
    });

    res.status(201).json(notice);
  }

  const { error } = noticeAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const file = await cloudinaryUploader(path, "pets", filename);
  const notice = await Notice.create({ ...req.body, file, owner });

  res.status(201).json(notice);
};

const updateNoticeFavorites = async (req, res) => {
  const { noticeId } = req.params;
  const { _id } = req.user;

  const notice = await Notice.findByIdAndUpdate(
    noticeId,
    { $addToSet: { favorites: _id } },
    {
      new: true,
    }
  );
  if (!notice) {
    throw HttpError(404, "Notice not found");
  }

  res.status(200).json(notice);
};

const removeNoticeFavorites = async (req, res) => {
  const { noticeId } = req.params;
  const { _id } = req.user;

  const notice = await Notice.findByIdAndUpdate(
    noticeId,
    { $pull: { favorites: _id } },
    { new: true }
  );
  if (!notice) {
    throw HttpError(404, "Notice not found");
  }

  res.status(200).json(notice);
};

const getNoticesInFavorites = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const total = await Notice.countDocuments({ favorites: { $in: [_id] } });
  const totalPages = Math.ceil(total / limit);
  if (total === 0 || page > totalPages) {
    throw HttpError(404, "Your notice not found for your request");
  }

  const notices = await Notice.find({ favorites: { $in: [_id] } }, "", {
    skip,
    limit,
  });

  res.status(200).json({ page, limit, total, totalPages, notices });
};

const removeNotice = async (req, res) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;

  const notice = await Notice.findById(noticeId);
  if (!notice) {
    throw HttpError(404, "Notice not found");
  }

  if (notice.owner.toString() !== owner.toString()) {
    throw HttpError(403, "You are not allowed to delete this notice");
  }
  await Notice.findByIdAndDelete(noticeId);

  res.status(200).json({
    message: "Success your notice deleted",
  });
};

module.exports = {
  getNotices: ctrlWrapper(getNotices),
  addNotice: ctrlWrapper(addNotice),
  getNoticeById: ctrlWrapper(getNoticeById),
  updateNoticeFavorites: ctrlWrapper(updateNoticeFavorites),
  getNoticesInFavorites: ctrlWrapper(getNoticesInFavorites),
  removeNoticeFavorites: ctrlWrapper(removeNoticeFavorites),
  getUserNotices: ctrlWrapper(getUserNotices),
  removeNotice: ctrlWrapper(removeNotice),
};
