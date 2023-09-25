const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/user");
const Pet = require("../models/pet");

const { HttpError, cloudinaryUploader } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    name: user.name,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const editProfile = async (req, res) => {
  const { _id } = req.user;
  const userData = req.body;

  if (userData.email && userData.email !== req.user.email) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw HttpError(409, "Email is already in use");
    }
  }

  let avatarURL;
  if (req.file) {
    const { path, filename } = req.file;
    avatarURL = await cloudinaryUploader(path, "avatars", filename);
    userData.avatarURL = avatarURL;
  }

  const editedUser = await User.findByIdAndUpdate(_id, userData, {
    new: true,
  });

  if (!editedUser) {
    throw HttpError(404, `User with ${_id} not found`);
  }

  const { name, email, phone, city, birthday } = editedUser;

  res.json({
    name,
    email,
    phone,
    city,
    birthday,
    avatarURL: avatarURL || editedUser.avatarURL,
  });
};

const getCurrent = async (req, res) => {
  const { _id: userId } = req.user;

  const userData = await User.aggregate([
    { $match: { _id: userId } },
    {
      $lookup: {
        from: "pets",
        localField: "_id",
        foreignField: "owner",
        as: "pets",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        password: 1,
        avatarURL: 1,
        birthday: 1,
        phone: 1,
        city: 1,
        pets: {
          $map: {
            input: "$pets",
            as: "pet",
            in: {
              _id: "$$pet._id",
              name: "$$pet.name",
              dateOfBirth: "$$pet.dateOfBirth",
              type: "$$pet.type",
              comments: "$$pet.comments",
              petURL: "$$pet.petURL",
            },
          },
        },
      },
    },
  ]);

  const result = {
    user: userData[0],
  };
  res.json(result);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  editProfile: ctrlWrapper(editProfile),
  getCurrent: ctrlWrapper(getCurrent),
};
