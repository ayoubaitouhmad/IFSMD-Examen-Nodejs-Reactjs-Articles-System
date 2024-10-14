const FileCollection = require("./files");
const UserCollection = require("./users");
const ArticleCollection = require("./articles");
const CategoryCollection = require("./categories");
const ArticleCategoryCollection = require("./articleCategory");

async function run() {
    await FileCollection.migrateCollection();
    await UserCollection.migrateCollection();
    await ArticleCollection.migrateCollection();
    await CategoryCollection.migrateCollection();
    await ArticleCategoryCollection.migrateCollection();
}

run()
    .catch(e => console.log(e))
    .then(() => console.log('Collections created'))
    .finally(() => {process.exit()});