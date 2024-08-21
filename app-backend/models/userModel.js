const getConnection = require("../config/db");
const logger = require("../utils/logger");
const Article = require("./Article");

class User {
    #id;
    #username;
    #name;
    #bio;
    #role;
    #email;
    #password;
    #profileImageId;
    #createdAt;
    #updatedAt;

    constructor(
        id,
        username,
        name,
        bio,
        role,
        email,
        password,
        profileImageId,
        createdAt,
        updatedAt
    ) {
        this.#id = id;
        this.#username = username;
        this.#name = name;
        this.#bio = bio;
        this.#role = role;
        this.#email = email;
        this.#password = password;
        this.#profileImageId = profileImageId;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    details() {
        return {
            id: this.#id,
            username: this.#username,
            name: this.#name,
            bio: this.#bio,
            role: this.#role,
            email: this.#email,
            profileImageId: this.#profileImageId,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt,
            // Omitting password for security reasons
        };
    }

    static async findById(id) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute('SELECT * FROM users WHERE id=?', [id]);
            await connection.end();

            if (results.length === 0) {
                return null; // Handle user not found
            }

            return this.fromDatabaseRecord(results[0]).details();
        } catch (error) {
            logger.error(`Error finding user by ID ${id}: ${error.message}`);
            return null;
        }
    }

    static async findByUsername(username) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute('SELECT * FROM users WHERE username=?', [username]);
            await connection.end();

            if (results.length === 0) {
                return null; // Handle user not found
            }

            return this.fromDatabaseRecord(results[0]).details();
        } catch (error) {
            logger.error(`Error finding user by username ${username}: ${error.message}`);
            return null;
        }
    }

    static async findUserArticles(id) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute('SELECT * FROM articles WHERE author_id=?', [id]);
            await connection.end();

            return results.map(post => Article.loadFromDatabase(post).details());
        } catch (error) {
            logger.error(`Error finding articles for user ${id}: ${error.message}`);
            return null;
        }
    }

    static fromDatabaseRecord(user) {
        return new User(
            user.id,
            user.username,
            user.name,
            user.bio,
            user.role,
            user.email,
            user.password,
            user.profile_image_id,
            user.created_at,
            user.updated_at,
        );
    }
}

module.exports = User;
