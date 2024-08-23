const getConnection = require("../config/db");
const logger = require("../utils/logger");

class FileDocument {

    #id;
    #fileName;
    #fileType;
    #filePath;
    #createdAt;
    #updatedAt;


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


            return FileDocument.fromDatabaseRecord(results[0]).details();
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
}



module.exports =FileDocument;