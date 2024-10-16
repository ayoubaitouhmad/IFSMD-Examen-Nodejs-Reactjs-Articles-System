const FileCollection = require("./files");
const UserCollection = require("./users");
const ArticleCollection = require("./articles");
const CategoryCollection = require("./categories");
const ArticleCategoryCollection = require("./articleCategory");
const {succes} = require("../../utils/cli");

async function run() {
    console.log(succes("Start migration database \n "))
    await FileCollection.migrateCollection();
    await UserCollection.migrateCollection();
    await ArticleCollection.migrateCollection();
    await CategoryCollection.migrateCollection();
    await ArticleCategoryCollection.migrateCollection();
    console.log(succes("\n End migration "));
}

run()
    .catch(e => console.log(e))
    .then(() => console.log('Collections created'))
    .finally(() => {process.exit()});