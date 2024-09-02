const getConnection = require("../config/db");
const User = require("../models/userModel");
const {sign} = require("jsonwebtoken");
const {info} = require("../utils/logger");
const {join, extname} = require("node:path");
const {IMAGES_UPLOAD_DUR} = require("../config/imageStorage");
const {createReadStream, readdir} = require("node:fs");
const sharp = require("sharp");
const { dirname } = require('path');


exports.streamImage = async (req, res) => {
    const imageName = req.params.name;
    const width = req.query.w ? parseInt(req.query.w) : null;
    const height = req.query.h ? parseInt(req.query.h) : null;
    const directoryPath = join(dirname(require.main.filename), IMAGES_UPLOAD_DUR);

    readdir(directoryPath, (err, files) => {
        if (err) {

            return res.status(500).json(
                {
                    message: 'Unable to scan directory',
                    appDir
                });
        }
        const matchedFile = files.find(file => file.startsWith(imageName));

        if (!matchedFile) {
            return res.status(404).json({message: 'Image not found'});
        }

        const imagePath = join(directoryPath, matchedFile);
        const fileExtension = extname(matchedFile).toLowerCase();
        let contentType = 'application/octet-stream'; // Default content type
        if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
            contentType = 'image/jpeg';
        } else if (fileExtension === '.png') {
            contentType = 'image/png';
        } else if (fileExtension === '.gif') {
            contentType = 'image/gif';
        }


        res.setHeader('Content-Type', contentType);
        const readStream = createReadStream(imagePath);

        if (width && height) {
            const transform = sharp()
                .resize(width, height, {
                    fit: sharp.fit.cover, // Ensures the image covers the entire specified area
                    position: sharp.position.center, // Centers the crop
                });

            readStream.pipe(transform).pipe(res);
        } else {
            readStream.pipe(res);
        }



        readStream.on('error', (streamErr) => {

            res.status(500).json({message: 'Error streaming image'});
        });
    });
};


