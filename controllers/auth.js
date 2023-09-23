const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  const user = await User.findById(userId).select(
    "-createdAt -updatedAt -id -token"
  );
  if (!user) {
    throw new HttpError(404, `User with ${userId} not found`);
  }
  const pets = await Pet.find({ owner: userId }).select(
    "-createdAt -updatedAt -owner -id"
  );

  res.json({
    user,
    pets,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  editProfile: ctrlWrapper(editProfile),
  getCurrent: ctrlWrapper(getCurrent),
};
