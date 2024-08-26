// imageService.js
const multer = require("multer");
const path = require("path");
const { imageStorage, IMAGES_UPLOAD_DUR} = require('../config/imageStorage');
const {unlink} = require("node:fs");

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const uploadImage = multer({
    storage: imageStorage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');


const deleteImage = (path)=>{
    let fullPath = IMAGES_UPLOAD_DUR+path;
    unlink(fullPath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
        } else {
            console.log(`File deleted: ${fullPath}`);
        }
    });
}


module.exports = { uploadImage  , deleteImage};
