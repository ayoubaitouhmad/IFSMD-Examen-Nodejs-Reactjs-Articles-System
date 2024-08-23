// imageStorage.js
const multer = require('multer');
const IMAGES_UPLOAD_DUR= "./uploads/images/";
const imageStorage = multer.diskStorage({
    destination: IMAGES_UPLOAD_DUR,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

module.exports = { imageStorage ,  IMAGES_UPLOAD_DUR };
