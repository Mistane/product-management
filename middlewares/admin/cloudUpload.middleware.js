const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadCloud = async (req, res, next) => {
  if (!req.file) return next();
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) resolve(result);
        else reject(error);
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  try {
    const result = await streamUpload(req);
    console.log(result);
    req.body[req.file.fieldname] = result.secure_url;
    next();
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    next(err);
  }
};

module.exports = uploadCloud;
