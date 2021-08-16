const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/menuItemImage/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-itemmenu-${file.originalname}`);
  },
});

var memberInsertProperty = multer({ 
    storage: storage, 
    limits: {
        fileSize: 10000000
    },
    fileFilter: imageFilter });
module.exports = memberInsertProperty;

var unsignedMemberInsertProperty = multer({ 
  storage: storage, 
  limits: {
      fileSize: 10000000
  },
  fileFilter: imageFilter });
module.exports = unsignedMemberInsertProperty;


