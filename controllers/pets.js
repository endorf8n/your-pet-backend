const Pet = require("../models/pet");

const {
  HttpError,
  cloudinaryUploader,
  cloudinaryRemover,
  getPublicId,
  formattedDate,
  normalizedDate,
} = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const addPet = async (req, res) => {
  const { _id: owner } = req.user;

  const body = req.body;

  if (!body) {
    throw HttpError(400);
  }

  let petURL = "";

  if (req.file) {
    const { path, filename } = req.file;
    petURL = await cloudinaryUploader(path, "owner-pets", filename, 161, 161);
  }

  const normDateOFBirth = normalizedDate(body.dateOfBirth);

  const data = {
    ...body,
    dateOfBirth: normDateOFBirth,
    owner,
    petURL,
  };

  const result = await Pet.create(data);

  if (!result) {
    throw HttpError(404);
  }

  const { name, dateOfBirth, type, comments, _id } = result;

  const formattedDateOfBirth = formattedDate(dateOfBirth);

  res.status(201).json({
    _id,
    name,
    dateOfBirth: formattedDateOfBirth,
    type,
    comments,
    petURL,
  });
};

const deleteById = async (req, res) => {
  const { petId } = req.params;
  const result = await Pet.findByIdAndDelete(petId);

  if (!result) {
    throw HttpError(404, `Pet with ${petId} not found`);
  }

  if (result.petURL) {
    const public_id = getPublicId(result.petURL);
    await cloudinaryRemover(public_id, "owner-pets");
  }

  res.json({
    message: "Pet information deleted",
  });
};

module.exports = {
  addPet: ctrlWrapper(addPet),
  deleteById: ctrlWrapper(deleteById),
};
