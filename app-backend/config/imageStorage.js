const multer = require('multer');
// Target uploading folder
const IMAGES_UPLOAD_DUR= process.env.IMAGES_UPLOAD_DUR;

// create separated disk only for file type image
// this will help if we need more disks in the future like (docs,pdf,aws ...)
const imageStorage = multer.diskStorage({
    destination: IMAGES_UPLOAD_DUR,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

module.exports = { imageStorage ,  IMAGES_UPLOAD_DUR };
