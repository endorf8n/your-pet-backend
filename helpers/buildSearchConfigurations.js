const buildSearchConfigurations = (query) => {
  const {
    category,
    searchQuery = "",
    age,
    sex,
  } = query;
  const searchConfigurations = {};
  const score = {}

  if (category) {
    searchConfigurations.category = category;
  }

  if (sex) {
    searchConfigurations.sex = sex;
  }

  if (searchQuery) {
    searchConfigurations["$text"] = { $search: searchQuery };
    score.score = { $meta: "textScore" };
  }

  if (Array.isArray(age)) {
    const ageFilters = age
      .map((ageValue) => {
        const ageNumber = Number(ageValue);
        if (!Number.isNaN(ageNumber) && ageNumber >= 0) {
          return ageNumber <= 1
            ? { $lte: 1 }
            : ageNumber <= 2
            ? { $lte: 2 }
            : { $gt: 2 };
        }
        return null;
      })
      .filter((ageFilter) => ageFilter !== null);
    console.log(ageFilters);

    if (ageFilters.length > 0) {
      searchConfigurations["$or"] = ageFilters.map((ageFilter) => ({
        age: ageFilter,
      }));
    } else {
      throw HttpError(400, "Bad request, age must be a non-negative number");
    }
  } else if (age) {
    const ageValue = Number(age);

    if (!Number.isNaN(ageValue) && ageValue >= 0) {
      const ageFilter =
        ageValue <= 1 ? { $lte: 1 } : ageValue <= 2 ? { $lte: 2 } : { $gt: 2 };
      searchConfigurations.age = ageFilter;
    } else {
      throw HttpError(400, "Bad request, age must be a non-negative number");
    }
  }

  return { searchConfigurations, score };
}

module.exports = buildSearchConfigurations;