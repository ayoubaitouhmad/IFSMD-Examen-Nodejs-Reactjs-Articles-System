const getConnection = require("../config/db");
const logger = require("../utils/logger");
const {deleteImage} = require("../services/imageService");


class FileDocument {

    #id;
    #fileName;
    #fileType;
    #filePath;
    #createdAt;
    #updatedAt;


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

    static async findById(id) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute('SELECT * FROM file_document WHERE id=?', [id]);
            await connection.end();


            if (results.length === 0) {
                return null; // Handle user not found
            }


            return FileDocument.fromDatabaseRecord(results[0]);
        } catch (error) {
            logger.error(`Error finding FileDocument by ID ${id}: ${error.message}`);
            return null;
        }
    }

    static fromDatabaseRecord(file) {
        return new FileDocument(
            file.id,
            file.file_name,
            file.file_type,
            file.file_path,
            file.created_at,
            file.updated_at
        );
    }

    async save() {
        try {
            const connection = await getConnection();
            const query = `
                INSERT INTO file_document (file_name, file_type, file_path, created_at, updated_at)
                VALUES (?, ?, ?, NOW(), NOW())
            `;
            const [result] = await connection.execute(query, [
                this.#fileName,
                this.#fileType,
                this.#filePath
            ]);
            this.#id = result.insertId;
            await connection.end();
            return true;
        } catch (error) {
            logger.error(`Error saving file document: ${error.message}`);
            return false;
        }
    }

    static async deleteFileDocument(id) {
        try {
            const connection = await getConnection();
            const query = 'DELETE FROM file_document WHERE id = ?';
            await connection.execute(query, [id]);
            await connection.end();
            return true;
        } catch (error) {
            logger.error(`Error saving file document: ${error.message}`);
            return false;
        }
    }

    async delete() {
        deleteImage(this.#filePath);
        await FileDocument.deleteFileDocument(this.#id);
    }

    static fromUpload(filename, path, mimetype) {
        return new FileDocument(
            null,
            filename,
            mimetype,
            path,
            null,
            null
        );
    }


}


module.exports = FileDocument;