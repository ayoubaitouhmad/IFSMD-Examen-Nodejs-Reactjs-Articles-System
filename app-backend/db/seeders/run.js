const CategorySeeder = require('./categpriesSeeder');
const UserSeeder = require("./userSeeder");
const ArticlesSeeder = require("./articlesSeeder");
const FileSeeder = require("./filesSeeder");
const ArticleCategorySeeder = require("./articleCategorySeeder");

const {succes} = require('../../utils/cli');

async function run() {
    console.log(succes("Start seeding database \n "))
    await FileSeeder.seed();
    await CategorySeeder.seed();
    await UserSeeder.seed();
    await ArticlesSeeder.seed();
    await ArticleCategorySeeder.seed();
    console.log(succes("\n End seeding database"));
}

run()
    .catch(err => console.log(err))
    .finally(() => {
        process.exit(0);
    });
;