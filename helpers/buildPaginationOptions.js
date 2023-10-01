const HttpError = require('./HttpError');

const buildPaginationOptions = (query) => {
  const { page = 1, limit = 12 } = query
  const skip = (page - 1) * limit;
  if (skip < 0) {
    throw HttpError(400, "Page cannot be a negative number")
  }
  return { skip, page, limit };
}

module.exports = buildPaginationOptions;