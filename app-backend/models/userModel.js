const connection = require('../config/db');
const getConnection = require("../config/db");


class User {


    constructor(id, email, name, password, role, username, profile_image_id, created_at, updated_at) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
        this.username = username;
        this.profileImageId = profile_image_id;
        this.createdAt = created_at;
        this.updatedAt = updated_at;
    }


    async comments() {
        const connection = await getConnection();
        const [results] = await connection.execute('SELECT * FROM articles where author_id=?', [this.id]);
        this.posts = results;
        return results;
    }

    static async findById(id) {
        const connection = await getConnection();
        const [results] = await connection.execute('SELECT * FROM users where id=?', [id]);
        let userData = results[0];
        await connection.end();
        const userMoedel  = new User(
            userData.id,
            userData.email,
            userData.name,
            userData.password,
            userData.role,
            userData.username,
            userData.profile_image_id,
            userData.created_at,
            userData.updated_at,
        );
        await userMoedel.comments();
        return userMoedel;
    }
}


module.exports = User;


