const getConnection = require("../config/db");
const logger = require("../utils/logger");
const CategoryCollection = require("../db/migrations/categories");
const {ObjectId} = require("mongodb");

class Category {
    #id;
    #name;
    #description;
    #createdAt;
    #updatedAt;
    static get TABLE_NAME() {
        return process.env.DB_CATEGORIES_TABLE_NAME;
    }
    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }
    get name() {
        return this.#name;
    }
    get nameForUrl() {
        return this.name.toLowerCase().replace(' ', '-');
    }
    set name(value) {
        this.#name = value;
    }
    get description() {
        return this.#description;
    }
    set description(value) {
        this.#description = value;
    }
    get createdAt() {
        return this.#createdAt;
    }
    set createdAt(value) {
        this.#createdAt = value;
    }
    get updatedAt() {
        return this.#updatedAt;
    }
    set updatedAt(value) {
        this.#updatedAt = value;
    }

    constructor(id, name, description, createdAt, updatedAt) {
        this.#id = id;
        this.#name = name;
        this.#description = description;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;

    }

    details() {
        return {
            id: this.id,
            name: this.name,
            nameForUrl: this.nameForUrl,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }


    static fromDatabaseRecord(category) {
        return new Category(
            category._id,
            category.name,
            category.description,
            category.created_at,
            category.updated_at,
        );
    }
    static async fromDatabaseRecords(documents , attrs = []){
        return  documents.map(document => {
            const CategoryModel = Category.fromDatabaseRecord(document).details();
            if(attrs.length){
                for (const attr of attrs) {
                    CategoryModel[attr.attrName] = document[attr.source]
                }
            }
            return CategoryModel;
        });
    }

    static async findById(id) {
        try {
            const collection = await  CategoryCollection.collection();
            const result = await collection.findOne({ _id: new ObjectId(id) });
            if(result == null){
                return  null;
            }
            return Category.fromDatabaseRecord(result) ;
        } catch (error) {
            logger.error(`Error finding article by ID ${id}: ${error.message}`);
            return null;
        }
    }

    static async all() {
        const collection = await  CategoryCollection.collection();
        const results = await collection.find({}).toArray();
        return Category.fromDatabaseRecords(results, [
            {
                attrName : "ArticlesCount",
                source : "articles_count",
            }
        ]);
    }


    static async allWithArticlesCount() {
        const collection = await CategoryCollection.collection();
        const results = await collection.aggregate([
            {
                $lookup: {
                    from: "article_category",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "article_categories"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    articles_count: { $size: "$article_categories" }
                }
            },
            {
                $group: {
                    _id: "$name",
                    categories: { $push: "$$ROOT" }
                }
            },
            {
                $unwind: "$categories"
            },
            {
                $replaceRoot: {
                    newRoot: "$categories"
                }
            }
        ]).toArray();

        return Category.fromDatabaseRecords(results, [
            {
                attrName : "ArticlesCount",
                source : "articles_count",
            }
        ]);
    };
}

module.exports = Category;
