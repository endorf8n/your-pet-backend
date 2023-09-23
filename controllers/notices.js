const Notice = require("../models/notice");
const { ctrlWrapper } = require("../decorators");
const { noticeAddSchema, noticeAddSellSchema } = require("../schemas/notices");
const { HttpError, cloudinaryUploader } = require("../helpers");
const fs = require("fs/promises");

const getAllNotices = async (req, res, next) => {
  const notices = await Notice.find();
  res.status(200).json({ message: "your Notices", notices });
};

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId).populate("owner", "email");
  if (!notice) {
    throw HttpError(404);
  }
  res.status(200).json({
    notice,
  });
};

const getUserNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const notices = await Notice.find({ owner }, "", { skip, limit }).populate(
    "owner",
    "email"
  );
  if (!notices) {
    throw HttpError(404);
  }
  res.status(200).json({page, limit, total: notices.length, notices});
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
    throw HttpError(404);
  }
  res.status(200).json(notice);
};

const getNoticesInFavorites = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const notices = await Notice.find({ favorites: { $in: [_id] } }, "", {
    skip,
    limit,
  }).populate({ path: "favorites", select: "email" });
  if (!notices) {
    throw HttpError(404);
  }
  res.status(200).json({page, limit, total: notices.length, notices});
};

const removeNoticeFavorites = async (req, res) => {
  const { noticeId } = req.params;
  const { _id } = req.user;
  const notice = await Notice.findByIdAndUpdate(
    noticeId,
    { $pull: { favorites: _id } },
    {
      new: true,
    }
  );
  if (!notice) {
    throw HttpError(404);
  }
  res.status(200).json(notice);
}

const removeNotice = async (req, res) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;
  const notice = await Notice.findById(noticeId);
  if (!notice) {
    throw HttpError(404);
  }

  if (notice.owner.toString() !== owner.toString()) {
    throw HttpError(403, 'You are not allowed to delete this notice')
  }
  await Notice.findByIdAndDelete(noticeId);

  res.status(200).json({
    message: 'Success your notice deleted'
  })
}

module.exports = {
  getAllNotices: ctrlWrapper(getAllNotices),
  addNotice: ctrlWrapper(addNotice),
  getNoticeById: ctrlWrapper(getNoticeById),
  updateNoticeFavorites: ctrlWrapper(updateNoticeFavorites),
  getNoticesInFavorites: ctrlWrapper(getNoticesInFavorites),
  removeNoticeFavorites: ctrlWrapper(removeNoticeFavorites),
  getUserNotices: ctrlWrapper(getUserNotices),
  removeNotice: ctrlWrapper(removeNotice),
};
