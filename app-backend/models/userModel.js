const getConnection = require("../config/db");
const logger = require("../utils/logger");
const FileDocument = require("./fileDocument");


class User {
    #id;
    #username;
    #name;
    #bio;
    #role;
    #email;
    #password;
    #profileImageId;
    #profileImage;
    #createdAt;
    #updatedAt;

    static get TABLE_NAME() {
        return "users";
    }


    get profileImageId() {
        return this.#profileImageId;
    }

    set profileImageId(profileImageId) {
        this.#profileImageId = profileImageId;
    }

    get bio() {
        return this.#bio;
    }

    set bio(bio) {
        this.#bio = bio;
    }

    get email() {
        return this.#email;
    }

    set email(email) {
        this.#email = email;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }


    get createdAt() {
        let date = new Date(this.#createdAt);
        if (date instanceof Date && !isNaN(date)) {
            const options = {day: 'numeric', month: 'long', year: 'numeric'};
            return date.toLocaleDateString('en-US', options);
        }
        return  this.createdAt;

    }

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

    async getProfileImage() {
        return this.#profileImage =
            this.#profileImageId ?
                (await FileDocument.findById(this.#profileImageId)).details()
                : null
            ;
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
            profileImage: this.#profileImage ?? {
                filePath: 'blank.png'
            },
            createdAt: this.createdAt,
            updatedAt: this.#updatedAt,
            // Omitting password for security reasons
        };
    }

    detailsForArticle() {

        return {
            id: this.#id,
            username: this.#username,
        };
    }


    static async findById(id) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute(`SELECT * FROM ${User.TABLE_NAME} WHERE id=?`, [id]);
            await connection.end();

            if (results.length === 0) {
                return null; // Handle user not found
            }
            let user = this.fromDatabaseRecord(results[0]);
            await user.getProfileImage();
            return user;
        } catch (error) {
            logger.error(`Error finding user by ID ${id}: ${error.message}`);
            return null;
        }
    }

    static async findByEmailAndPassword(email, password) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute(`SELECT *
                                                        FROM ${User.TABLE_NAME}
                                                        WHERE email = ?
                                                          and password = ?`, [email, password]);
            await connection.end();
            if (results.length === 0) {
                return null; // Handle user not found
            }
            let user = this.fromDatabaseRecord(results[0]);
            await user.getProfileImage();


            return user.details();

        } catch (error) {
            logger.error(`findByEmailAndPassword ${email}: ${error.message}`);
            return null;
        }
    }

    static async findByUsername(username) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute(`SELECT * FROM ${User.TABLE_NAME} WHERE username=?`, [username]);
            await connection.end();

            if (results.length === 0) {
                return null; // Handle user not found
            }
            const user = this.fromDatabaseRecord(results[0]);
            await user.getProfileImage();
            return user.details();
        } catch (error) {
            logger.error(`Error finding user by username ${username}: ${error.message}`);
            return null;
        }
    }

    static async findUserArticles(id) {
        try {
            const Article = require("./Article");
            const connection = await getConnection();
            const [results] = await connection.execute(`SELECT * FROM ${Article.TABLE_NAME} WHERE author_id=? order by created_at desc`, [id]);
            await connection.end();
            return await Promise.all(results.map(async (post) => {
                let postModel = Article.fromDatabaseRecord(post);
                await postModel.getImage();
                return postModel.details();
            }));


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


    async save() {
        try {
            const connection = await getConnection();
            const query = `
                UPDATE ${User.TABLE_NAME}
                SET username=?,
                    name=?,
                    bio=?,
                    role=?,
                    email=?,
                    profile_image_id=?,
                    updated_at=NOW()
                WHERE id = ?
            `;
            await connection.execute(query, [
                this.#username,
                this.#name,
                this.#bio,
                this.#role,
                this.#email,
                this.#profileImageId,
                this.#id
            ]);
            await connection.end();
            return true;
        } catch (error) {
            logger.error(`Error saving user: ${error.message}`);
            return false;
        }
    }


}

module.exports = User;
