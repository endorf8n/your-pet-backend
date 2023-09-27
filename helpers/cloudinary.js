const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const cloudinaryUploader = async (
  path,
  folders = "",
  filename,
  width = 300,
  height = 300
) => {
  const { url } = await cloudinary.uploader.upload(path, {
    folder: folders,
    public_id: filename,
    quality_analysis: true,
    transformation: [
      {
        width,
        height,
        gravity: "auto",
        crop: "fill",
      },
      { fetch_format: "auto" },
    ],
  });
  await fs.unlink(path);

  return url;
};

const getPublicId = (avatarURL) => {
  const parts = avatarURL.split("/");
  const fileWithExtension = parts[parts.length - 1];
  const public_id = fileWithExtension.split(".").slice(0, -1).join(".");
  return public_id;
};

const cloudinaryRemover = async (public_id, folder = "") => {
  await cloudinary.uploader.destroy(`${folder}/${public_id}`, {
    invalidate: true,
    type: "upload",
    resource_type: "image",
  });
};

module.exports = {
  cloudinary,
  cloudinaryUploader,
  cloudinaryRemover,
  getPublicId,
};
