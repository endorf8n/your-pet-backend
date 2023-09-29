const buildPaginationOptions = (query) => {
  const { page = 1, limit = 12 } = query
  const skip = (page - 1) * limit;
  return { skip, page, limit };
}

module.exports = buildPaginationOptions;