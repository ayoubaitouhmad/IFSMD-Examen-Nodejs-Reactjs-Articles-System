const ArticleCategoryCollection = require('../migrations/articleCategory')
const MoCategoryModel = require("../../models/MoCategoryModel");
const MoArticleModel = require("../../models/MoArticle");
const MoArticleCategory = require("../../models/MoArticleCategory");

const {succes} = require('../../utils/cli');

class ArticleCategorySeeder {
    static seed = async ()=> {
        try {


            const categories = await MoCategoryModel.all();
            const articles = await MoArticleModel.articles();
            for (const article of articles) {
                for (const category of categories) {
                  await ( new MoArticleCategory(
                      category.id,
                        article.id,
                    )).save();
                }
            }




            console.log(succes("✅ "+ArticleCategoryCollection.collectionName + " collection seeder finished successfully."));
        }catch(err) {
            console.log(err)
        }

    }
}



module.exports = ArticleCategorySeeder;




