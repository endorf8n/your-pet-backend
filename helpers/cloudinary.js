const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const cloudinaryUploader = async (path, folders='', filename) => {
  const { url } = await cloudinary.uploader.upload(path, {
    folder: folders,
    public_id: filename,
    quality_analysis: true,
    transformation: [
      {
        width: 300,
        height: 300,
        gravity: "auto",
        crop: "fill"
      },
      {fetch_format: "auto"}
    ]
  })
  await fs.unlink(path);

  return url;
}

module.exports = {
  cloudinary,
  cloudinaryUploader,
};
