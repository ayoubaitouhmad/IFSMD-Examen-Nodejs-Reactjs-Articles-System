const getConnection = require("../config/db");
const Comment = require("../models/commentModel");
const User = require("./userModel");

class Article {
    constructor(id, title, content , comment = [] , createdAt = null) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }

    async comment() {
        const connection = await getConnection();
        const [results] = await connection.execute('SELECT * FROM comments WHERE article_id=?', [this.id]);
        await connection.end();

        await  connection.end();
        return await Promise.all(results.map(async (comment) => {
            const commentModel = new Comment(
                comment.id, comment.comment, comment.author_id, comment.article_id
            );
            await commentModel.fetchAuthor();
            return commentModel;
        }));
    }

    async fetchComments() {
        this.comments = await this.comment();
    }

    talk() {

    }

    async fetchAuthor() {
        const connection = await getConnection();
        const [results] = await connection.execute('SELECT * FROM users where id=1');
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
        await  connection.end();

    }

    static async posts() {
        const connection = await getConnection();
        const [results] = await connection.execute('SELECT * FROM articles');
        await  connection.end();
        return await Promise.all(results.map(async (post) => {
            const postModel = new Article(post.id, post.title, post.content ,'', post.created_at   );
            await postModel.fetchComments();
            await postModel.fetchAuthor();
            return postModel;

        }));
    }
    static async latestPosts() {
        const connection = await getConnection();
        const [results] = await connection.execute('SELECT * FROM articles ORDER BY created_at DESC LIMIT 5');
        await  connection.end();
        return await Promise.all(results.map(async (post) => {
            const postModel = new Article(post.id, post.title, post.content ,'', post.created_at   );
            await postModel.fetchComments();
            await postModel.fetchAuthor();
            return postModel;

        }));
    }

    static async mostViewedArticles() {
        const connection = await getConnection();
        const [results] = await connection.execute('SELECT * FROM articles ORDER BY created_at DESC LIMIT 6');
        await  connection.end();
        return await Promise.all(results.map(async (post) => {
            const postModel = new Article(post.id, post.title, post.content ,'', post.created_at   );
            await postModel.fetchComments();
            await postModel.fetchAuthor();
            return postModel;

        }));
    }

    static async filterByCreatedDate(date) {
        const connection = await getConnection();
        const [results] = await connection.execute('select * from articles where date(created_at) >= date(?)' , [date]);
        await  connection.end();
        return await Promise.all(results.map(async (post) => {
            const postModel = new Article(post.id, post.title, post.content ,'', post.created_at   );
            await postModel.fetchComments();
            await postModel.fetchAuthor();
            return postModel;

        }));
    }


    static async findById(id) {
        const connection = await getConnection();
        const [results] = await connection.execute('SELECT * FROM articles where id=?', [id]);
        await  connection.end();
        return new Article(results[0].id, results[0].title, results[0].content);
    }

}

module.exports = Article;
