// multer setup
import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();
// const fpDestination = path.join(__dirname, "public/img");
const fpDestination = "public/img/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //check if file/folder exist, if not create one
    !fs.existsSync(fpDestination) &&
      fs.mkdirSync(fpDestination, { recursive: true });
    cb(null, fpDestination);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filepath = uniqueSuffix + "-" + file.originalname;
    cb(null, filepath);
  },
});

//filter to images only
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|jif|webp|heic|avif/;

  const extName = path.extname(file.originalname).toLowerCase();
  const isAllowedExt = allowedFileTypes.test(extName);

  const mimeType = allowedFileTypes.test(file.mimetype);

  if (isAllowedExt && mimeType) {
    cb(null, true);
  } else {
    cb(
      new Error("Only jpeg, jpg, png, jif, webp, hiec files are allowed"),
      false
    );
  }
};

export const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, //2MB
  // limits: { fileSize: 74 * 1024 }, //74KB
});

// const upload = multer({ dest: "uploads/" });
// multer setup end
