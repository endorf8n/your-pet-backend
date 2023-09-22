const { ctrlWrapper } = require('../decorators');

const getAllNotices = async (req, res, next) => {
  
}

module.exports = {
  getAllNotices: ctrlWrapper(getAllNotices),
}