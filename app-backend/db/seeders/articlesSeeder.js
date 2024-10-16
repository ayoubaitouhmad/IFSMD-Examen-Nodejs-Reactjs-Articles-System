const ArticleCollection = require("../migrations/articles");
const CategoryCollection = require('../migrations/categories')
const {succes} = require('../../utils/cli');
const {faker, el} = require("@faker-js/faker");
const {ObjectId} = require("mongodb");
const FilesCollection = require("../migrations/files");
const UsersCollection = require("../migrations/users");

class CategorySeeder {
    static seed = async () => {
        try {
            const collection = await ArticleCollection.collection();
            const fileCollection = await FilesCollection.collection();
            const userCollection = await UsersCollection.collection();

            const file = await fileCollection.findOne()
            let avatarId = null;
            if (file) {
                avatarId = file._id;
            }

            const user = await userCollection.findOne()
            let userId = null;
            if (file) {
                userId = user._id;
            }




            const fakeArticles = Array(10).fill(null).map(() => ({
                "title": faker.lorem.sentence(),
                "description": faker.lorem.paragraph(),
                "content": faker.lorem.text(),
                "is_featured_blog": false,
                "author_id": userId,
                "views": 0,
                "article_image_id": avatarId,
                "created_at": new Date(),
                "updated_at": new Date(),
            }));
            await collection.insertMany(fakeArticles);
            console.log(succes("✅ " + ArticleCollection.collectionName + " collection seeder finished successfully."));
        } catch (error) {
            if (error.hasOwnProperty("writeErrors")) {
                for (const writeError of error.writeErrors) {
                    if (writeError?.err?.errInfo?.details?.schemaRulesNotSatisfied) {
                        for (const schemaRuleNotSatisfied of writeError.err.errInfo.details.schemaRulesNotSatisfied) {
                            console.log(schemaRuleNotSatisfied);
                        }
                    }
                }
            } else {
                console.log(error)
            }
        }

    }
}


module.exports = CategorySeeder;




