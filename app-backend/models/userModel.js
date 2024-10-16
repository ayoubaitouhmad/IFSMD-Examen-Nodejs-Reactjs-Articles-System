const logger = require("../utils/logger");
const MoFileModel = require("./MoFileModel");
const {sendEmail} = require("../services/emailService");
const {ObjectId} = require("mongodb");
const ResetPasswordEmail = require("../emails/resetPasswordEmail");
const crypto = require('crypto');
const FileCollection = require("../db/migrations/files");
const UserCollection = require("../db/migrations/users");
const {th} = require("@faker-js/faker");

class MoUser {
    static collectionName = process.env.MONGODB_DB_USERS_TABLE_NAME;






    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get bio() {
        return this._bio;
    }

    set bio(value) {
        this._bio = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get profileImageId() {
        return this._profileImageId;
    }

    set profileImageId(value) {
        this._profileImageId = value;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(value) {
        this._createdAt = value;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set updatedAt(value) {
        this._updatedAt = value;
    }


    constructor(
        id = null,
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
        this.id = id;
        this.username = username;
        this.name = name;
        this.bio = bio;
        this.role = role;
        this.email = email;
        this.password = password;
        this.profileImageId = profileImageId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromDatabaseRecord(user) {
        return new MoUser(
            user._id,
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

    static fromRegister(name, username, email, password) {
        return new MoUser(
            null,
            username,
            name,
            null,
            null,
            email,
            password,
            null,
            new Date(),
            new Date(),
        );
    }

    async getProfileImage() {
        if (this.profileImageId) {
            this.profileImage = await MoFileModel.findById(this.profileImageId);
        }
        this.profileImage = null;
    }

    details() {
        return {
            id: this.id,
            username: this.username,
            name: this.name,
            bio: this.bio,
            role: this.role,
            email: this.email,
            profileImageId: this.profileImageId,
            profileImage: this.profileImage ?? {
                filePath: 'blank.png'
            },
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    detailsForArticle() {
        return {
            id: this.id,
            username: this.username,
        };
    }

    static async findById(id) {
        try {
            const collection = await UserCollection.collection();
            const result = await collection.findOne({_id: new ObjectId(id)});
            if (result === null) {
                return null;
            }
            const userModel = MoUser.fromDatabaseRecord(result);
            await userModel.getProfileImage();
            return userModel;
        } catch (error) {
            logger.error(`Error finding user by ID ${id}: ${error.message}`);
            return null;
        }
    }

    static async findByEmailAndPassword(email, password) {
        try {
            const collection = await UserCollection.collection();
            const user = await collection.findOne({email, password});
            if (user === null) {
                return null;
            }
            const moUser = MoUser.fromDatabaseRecord(user);
            await moUser.getProfileImage();
            return moUser;
        } catch (error) {
            logger.error(`findByEmailAndPassword ${email}: ${error.message}`);
            return null;
        }
    }

    static async findByUsername(username) {
        try {
            const collection = await UserCollection.collection();
            const user = await collection.findOne({username});
            if (!user) {
                return null;
            }
            const moUser = MoUser.fromDatabaseRecord(user);
            await moUser.getProfileImage();
            return moUser;
        } catch (error) {
            logger.error(`Error finding user by username ${username}: ${error.message}`);
            return null;
        }
    }

    // static async findUserArticles(id) {
    //     try {
    //         const collection = await UserCollection.collection();
    //         const articles = await collection.find({author_id: id}).sort({created_at: -1}).toArray();
    //
    //         return await Promise.all(articles.map(async (post) => {
    //             let postModel = Article.fromDatabaseRecord(post);
    //             await postModel.getImage();
    //             return postModel.details();
    //         }));
    //     } catch (error) {
    //         logger.error(`Error finding articles for user ${id}: ${error.message}`);
    //         return null;
    //     }
    // }


    async save() {
        try {
            const collection = await UserCollection.collection();
            if (this.id) {
                await collection.updateOne(
                    {_id: this.id},
                    {
                        $set: {
                            username: this.username,
                            name: this.name,
                            bio: this.bio,
                            role: this.role,
                            email: this.email,
                            password: this.password,
                            profile_image_id: this.profileImageId,
                            updated_at: new Date()
                        }
                    }
                );
                await this.getProfileImage();
                return this.details();
            } else {
                const result = await collection.insertOne({
                    username: this.username,
                    name: this.name,
                    email: this.email,
                    role: this.role,
                    password: this.password,
                    created_at: new Date(),
                    profile_image_id: this.profileImageId !== null ? this.profileImageId : null,
                    updated_at: new Date()
                });
                this.id = result.insertedId;
                await this.getProfileImage();
                return this.details();
            }

        } catch (error) {
            if (error.errInfo) {
                console.clear();
                // console.log(JSON.stringify(error))
                console.log(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied)
                console.log(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0])
            } else {
                console.log(error)
            }
            return false;
        }
    }

    static generatePassword(length) {
        return crypto.randomBytes(length).toString('base64').slice(0, length);
    }

    async sendResetPasswordEmail() {
        try {
            const newPassword = MoUser.generatePassword(12);
            await sendEmail(
                this.email,
                'Get a new password',
                ResetPasswordEmail(newPassword)
            );
            this.password = newPassword;
            await this.save();
            return true;
        } catch (error) {
            logger.error(`Error sending email: ${error.message}`);
            return null;
        }
    }




}

module.exports = MoUser;
