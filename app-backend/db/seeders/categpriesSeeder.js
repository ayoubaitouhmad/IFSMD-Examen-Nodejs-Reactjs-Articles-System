const CategoryCollection = require('../migrations/categories')
const {succes} = require('../../utils/cli');


class CategorySeeder {
    static seed = async ()=> {
        try {
            const collection = await CategoryCollection.collection();
            const categoryNames = [
                'Technology', 'Health', 'Travel', 'Food', 'Lifestyle', 'Education', 'Finance', 'Fitness', 'Entertainment',
                'Politics', 'Science', 'Music', 'Fashion', 'Business', 'Sports', 'Parenting', 'DIY', 'Photography',
                'Gaming', 'Marketing'
            ];
            const categoryDocuments = categoryNames.map(name => ({
                name: name,
                description: name,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await collection.insertMany(categoryDocuments);
            console.log(succes("✅ "+CategoryCollection.collectionName + " collection seeder finished successfully."));
        }catch(err) {
            console.log(err)
        }

    }
}



module.exports = CategorySeeder;




