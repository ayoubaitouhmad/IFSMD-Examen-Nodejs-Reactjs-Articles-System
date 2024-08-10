const connection = require('../config/db');
const getConnection = require("../config/db");


class User {
    constructor(id, created_at, email, name, password, profile_image_id, role, updated_at, username) {
        this.id = id;
        this.created_at = created_at;
        this.email = email;
        this.name = name;
        this.password = password;
        this.profile_image_id = profile_image_id;
        this.role = role;
        this.updated_at = updated_at;
        this.username = username;
    }

    async comments(){
        const connection = await getConnection();
        const [results] = await connection.execute('SELECT * FROM articles where author_id=?', [this.id]);
        this.posts = results;
        return results;
    }
}


module.exports = User;


