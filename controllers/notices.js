const Notice = require("../models/notice");
const { ctrlWrapper } = require("../decorators");
const {
  noticeAddSchema,
  noticeAddSellSchema,
  getNoticesSchema,
  userGetNoticesSchema,
} = require("../schemas/notices");
const {
  HttpError,
  cloudinaryUploader,
  cloudinaryRemover,
  getPublicId,
  buildSearchConfigurations,
  buildPaginationOptions,
} = require("../helpers");
const noticeConst = require("../constants/notice-constants");
const { countPetAge, formattedDate, normalizedDate } = require("../helpers");

const getNotices = async (req, res) => {
  const { error } = getNoticesSchema.validate(req.query);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { searchConfigurations } = buildSearchConfigurations(req.query);
  const { skip, page, limit } = buildPaginationOptions(req.query);
  console.log(searchConfigurations)
  const total = await Notice.countDocuments(searchConfigurations);
  const totalPages = Math.ceil(total / limit);
  if (total === 0 || page > totalPages) {
    throw HttpError(404, "Notiсes not found for your request");
  }

  const notices = await Notice.find(searchConfigurations,'', {
    skip,
    limit,
  })
    .populate({
      path: "owner",
      select: { email: 1, phone: 1 },
    })
    .sort({ createdAt: -1 });

  res.status(200).json({ page, limit, total, totalPages, notices });
};

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId, { age: 0 }).populate({
    path: "owner",
    select: { email: 1, phone: 1 },
  });
  if (!notice) {
    throw HttpError(404, "Notice not found");
  }
  const formatDate = formattedDate(notice.date);

  res.status(200).json({
    notice,
    formatDate,
  });
};

const getUserNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = userGetNoticesSchema.validate(req.query);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { searchConfigurations } = buildSearchConfigurations(req.query);
  const { skip, page, limit } = buildPaginationOptions(req.query);
  searchConfigurations.owner = owner;

  const total = await Notice.countDocuments(searchConfigurations);
  const totalPages = Math.ceil(total / limit);
  if (total === 0 || page > totalPages) {
    throw HttpError(404, "Notiсes not found for your request");
  }

  const notices = await Notice.find(searchConfigurations, '', {
    skip,
    limit,
  })
    .populate({
      path: "owner",
      select: { email: 1, phone: 1 },
    })
    .sort({ createdAt: -1 });

  res.status(200).json({ page, limit, total, totalPages, notices });
};

const addNotice = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "missing fields");
  }

  if (!req.file) {
    throw HttpError(400, "Bad request, image file is required");
  }

  const { _id: owner } = req.user;
  const { category, price, date } = req.body;
  const { path, filename } = req.file;
  let noticeData = {};
  
  if (!noticeConst.category.includes(category)) {
    throw HttpError(
      400,
      "Bad request, category must be sell, lost-found or in-good-hands"
    );
  }

  if (category === "sell") {
    const { error } = noticeAddSellSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    noticeData.price = Number(price);
  }

  if (category === "lost-found" || category === "in-good-hands") {
    const { error } = noticeAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
  }

  const file = await cloudinaryUploader(path, "pets", filename);
  const dateBirth = normalizedDate(date);
  const age = countPetAge(dateBirth);

  noticeData = {
    ...req.body,
    date: dateBirth,
    age,
    file,
    owner,
  };

  const notice = await Notice.create({ ...noticeData });
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

const getNoticesFromFavorites = async (req, res) => {
  const { _id } = req.user;

  const { error } = userGetNoticesSchema.validate(req.query);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { searchConfigurations } = buildSearchConfigurations(req.query);
  const { skip, page, limit } = buildPaginationOptions(req.query);
  searchConfigurations.favorites = { $in: [_id] };

  const total = await Notice.countDocuments(searchConfigurations);
  const totalPages = Math.ceil(total / limit);
  if (total === 0 || page > totalPages) {
    throw HttpError(404, "Notiсes not found for your request");
  }

  const notices = await Notice.find(searchConfigurations, '', {
    skip,
    limit,
  })
    .populate({
      path: "owner",
      select: { email: 1, phone: 1 },
    })
    .sort({ createdAt: -1 });

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

  if (notice.file) {
    const public_id = getPublicId(notice.file);
    await cloudinaryRemover(public_id, "pets");
  }

  res.status(200).json({
    message: "Success your notice deleted",
  });
};

module.exports = {
  getNotices: ctrlWrapper(getNotices),
  addNotice: ctrlWrapper(addNotice),
  getNoticeById: ctrlWrapper(getNoticeById),
  updateNoticeFavorites: ctrlWrapper(updateNoticeFavorites),
  getNoticesFromFavorites: ctrlWrapper(getNoticesFromFavorites),
  removeNoticeFavorites: ctrlWrapper(removeNoticeFavorites),
  getUserNotices: ctrlWrapper(getUserNotices),
  removeNotice: ctrlWrapper(removeNotice),
};
