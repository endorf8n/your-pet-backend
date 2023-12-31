const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const queryString = require("query-string");
const User = require("../models/user");
const {
  HttpError,
  cloudinaryUploader,
  cloudinaryRemover,
  getPublicId,
  normalizedDate,
  formattedDate,
  generateRandomPassword,
  generateToken,
} = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const {
  JWT_REFRESH_TOKEN,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET_KEY,
  FRONTEND_URL,
  BASE_URL,
} = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const birthday = new Date();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    birthday,
  });
  const { token, refreshToken } = generateToken(newUser._id);
  await User.findByIdAndUpdate(newUser._id, { token, refreshToken });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    token,
    refreshToken,
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

  const { token, refreshToken } = generateToken(user._id);

  await User.findByIdAndUpdate(user._id, { token, refreshToken });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.json({
    token,
    refreshToken,
    name: user.name,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "", refreshToken: "" });
  res.clearCookie("refreshToken");

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
    avatarURL = await cloudinaryUploader(path, "avatars", filename, 182, 182);
    userData.avatarURL = avatarURL;
  }
  const formatBirthday = normalizedDate(userData.birthday);

  const editedUser = await User.findByIdAndUpdate(
    _id,
    { ...userData, birthday: formatBirthday },
    {
      new: true,
    }
  );

  if (!editedUser) {
    throw HttpError(404, `User with ${_id} not found`);
  }

  if (req.user.avatarURL) {
    const public_id = getPublicId(req.user.avatarURL);
    await cloudinaryRemover(public_id, "avatars");
  }
  const { name, email, phone, city, birthday } = editedUser;
  const formattedBirthday = formattedDate(birthday);

  res.json({
    user: {
      name,
      email,
      phone,
      city,
      birthday: formattedBirthday,
      avatarURL: avatarURL || editedUser.avatarURL,
    },
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
        avatarURL: 1,
        birthday: { $dateToString: { format: "%d.%m.%Y", date: "$birthday" } },
        phone: 1,
        city: 1,
        pets: {
          $map: {
            input: "$pets",
            as: "pet",
            in: {
              _id: "$$pet._id",
              name: "$$pet.name",
              dateOfBirth: {
                $dateToString: {
                  format: "%d.%m.%Y",
                  date: "$$pet.dateOfBirth",
                },
              },
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

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: OAUTH_CLIENT_ID,
    redirect_uri: `${BASE_URL}/api/users/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.host}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET_KEY,
      redirect_uri: `${BASE_URL}/api/users/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { email, given_name } = userData.data;
  const user = await User.findOne({ email });

  if (!user) {
    const password = generateRandomPassword();
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: given_name,
      email,
      password: hashPassword,
    });

    const { token, refreshToken } = generateToken(newUser._id);
    await User.findByIdAndUpdate(newUser._id, { token, refreshToken });
    res.cookie("token", token, {
      maxAge: 23 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.redirect(
      `${FRONTEND_URL}/login?token=${token}&refreshToken=${refreshToken}`
    );
  }

  const { token, refreshToken } = generateToken(user._id);
  await User.findByIdAndUpdate(user._id, { token, refreshToken });
  res.cookie("token", token, {
    maxAge: 23 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return res.redirect(
    `${FRONTEND_URL}/login?token=${token}&refreshToken=${refreshToken}`
  );
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw HttpError(401, "Not authorized: Refresh token is missing");
  }

  const { id } = jwt.verify(refreshToken, JWT_REFRESH_TOKEN);
  const user = await User.findById(id);

  if (!user) {
    throw HttpError(401, "Invalid refresh token");
  }

  const { token: newToken, refreshToken: newRefreshToken } = generateToken(
    user._id
  );

  res.cookie("refreshToken", newRefreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  await User.findByIdAndUpdate(user._id, {
    token: newToken,
    refreshToken: newRefreshToken,
  });

  res.json({
    token: newToken,
    refreshToken: newRefreshToken,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  editProfile: ctrlWrapper(editProfile),
  getCurrent: ctrlWrapper(getCurrent),
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
  refreshToken: ctrlWrapper(refreshToken),
};
