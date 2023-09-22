const Notice = require("../models/notice");
const { ctrlWrapper } = require("../decorators");

const getAllNotices = async (req, res, next) => {
  const notices = await Notice.find();
  res.status(200).json({ message: "your Notices", notices });
};

const addNotice = async (req, res) => {
  // const { error } = contactAddSchema.validate(req.body);
  // if (error) {
  //   throw httpError(400, error.message);
  // }

  const notice = await Notice.create({ ...req.body });
  res.status(201).json(notice);
};

module.exports = {
  getAllNotices: ctrlWrapper(getAllNotices),
};
