const Pet = require("../models/pet");

const { HttpError, cloudinaryUploader } = require("../helpers");
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
    petURL = await cloudinaryUploader(path, "owner-pets", filename);
  }
  const data = {
    ...body,
    owner,
    petURL,
  };

  const result = await Pet.create(data);

  if (!result) {
    throw HttpError(404);
  }

  const { name, dateOfBirth, type, comments, _id } = result;

  res.status(201).json({
    _id,
    name,
    dateOfBirth,
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
  res.json({
    message: "Pet information deleted",
  });
};

module.exports = {
  addPet: ctrlWrapper(addPet),
  deleteById: ctrlWrapper(deleteById),
};
