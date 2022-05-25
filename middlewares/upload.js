const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/badges");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, "badge" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

let upload = multer({
  storage: storage,

  fileFilter: fileFilter,
});

module.exports = upload.single("badgeImage");
