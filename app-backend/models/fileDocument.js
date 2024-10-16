const getConnection = require("../config/db");
const logger = require("../utils/logger");
const {deleteImage} = require("../services/imageService");
const FileCollection = require("../db/migrations/files");
const {ObjectId} = require("mongodb");


class MoFileModel {
    #id;
    #fileName;
    #fileType;
    #filePath;
    #createdAt;
    #updatedAt;
    static get TABLE_NAME() {
        return process.env.DB_FILES_TABLE_NAME;
    }
    get id() {
        return this.#id;
    }
    get fileName() {
        return this.#fileName;
    }
    get fileType() {
        return this.#fileType;
    }
    get filePath() {
        return this.#filePath;
    }
    get createdAt() {
        return this.#createdAt;
    }
    get updatedAt() {
        return this.#updatedAt;
    }
    set id(id) {
        this.#id = id;
    }
    set fileName(fileName) {
        this.#fileName = fileName;
    }
    set fileType(fileType) {
        this.#fileType = fileType;
    }
    set filePath(filePath) {
        this.#filePath = filePath;
    }
    set createdAt(createdAt) {
        this.#createdAt = createdAt;
    }
    set updatedAt(updatedAt) {
        this.#updatedAt = updatedAt;
    }
    constructor(id, fileName, fileType, filePath, createdAt, updatedAt) {
        this.#id = id;
        this.#fileName = fileName;
        this.#fileType = fileType;
        this.#filePath = filePath;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }
    // Public getter for article details
    details() {
        return {
            id: this.#id,
            fileName: this.#fileName,
            fileType: this.#fileType,
            filePath: this.#filePath,
            fileAbsolutePath: '',
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt,
        };
    }

    static fromDatabaseRecord(file) {
        return new MoFileModel(
            file._id,
            file.file_name,
            file.file_type,
            file.file_path,
            file.created_at,
            file.updated_at
        );
    }

    static fromUpload(filename, path, mimetype) {
        return new MoFileModel(
            null,
            filename,
            mimetype,
            path,
            new Date(),
            new Date()
        );
    }

    static async findById(id) {
        try {
            const collection = await FileCollection.collection();
            const result = await collection.findOne({ _id: new ObjectId(id) });
            if(result === null) {
                return null;
            }
            return  MoFileModel.fromDatabaseRecord(result);
        } catch (error) {
            logger.error(`Error finding FileDocument by ID ${id}: ${error.message}`);
            return null;
        }
    }

    async save() {
        try {
            const collection = await FileCollection.collection();
            const document = {
                file_name: this.#fileName,
                file_type: this.#fileType,
                file_path: this.#filePath,
                created_at: new Date(),
                updated_at: new Date()
            };
            const result = await collection.insertOne(document);
            this.#id = result.insertedId;
            return true;
        } catch (error) {
            logger.error(`Error saving file document: ${error.message}`);
            return false;
        }
    }

    static async deleteFileDocument(id) {
        try {
            const collection = await FileCollection.collection();
            await collection.deleteOne({ _id: new ObjectId(id) });
            return true;
        } catch (error) {
            logger.error(`Error deleting file document: ${error.message}`);
            return false;
        }
    }

    async delete() {
        // TODO : re-code delete file, Error deleting file: ENOENT: no such file or directory,
        // deleteImage(this.#filePath);
        await MoFileModel.deleteFileDocument(this.#id);
    }
}


module.exports = MoFileModel;