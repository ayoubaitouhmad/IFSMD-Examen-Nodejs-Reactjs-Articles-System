const connection = require('../config/db');
const getConnection = require("../config/db");
const User = require("./userModel");


class Comment {
    author;

    constructor(id, comment, author_id, article_id) {
        this.id = id;
        this.comment = comment;
        this.author_id = author_id;
        this.article_id = article_id;
    }

    async fetchAuthor() {

        const connection = await getConnection();
        const [results] = await connection.execute('SELECT * FROM users where id=?', [this.author_id]);
        if (results.length) {
            this.author = new User(
                results[0].id,
                results[0].created_at,
                results[0].email,
                results[0].name,
                results[0].password,
                results[0].profile_image_id,
                results[0].role,
                results[0].updated_at,
                results[0].username
            );
        }

    }

}


module.exports = Comment;


