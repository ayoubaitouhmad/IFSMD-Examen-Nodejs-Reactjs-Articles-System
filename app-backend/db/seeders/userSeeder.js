const UserCollection = require("../migrations/users");
const {faker, el, fa} = require("@faker-js/faker");
const  {ObjectId} = require("mongodb");
const {succes} = require('../../utils/cli');
const MoUser = require("../../models/MoUserModel");
const FilesCollection = require("../migrations/files");





class UserSeeder {
    static seed = async ()=> {
        try {
            const collection = await UserCollection.collection();
            const fakePerson = faker.person;
            const fakeInternet = faker.internet;
            const fakeEmail = fakeInternet.email();


            const fileCollection = await FilesCollection.collection();
            const  fileModel = await  fileCollection.findOne()
            let avatarId = null;
            if(fileModel){
                avatarId = fileModel._id;
            }



            const fakeData = Array(6).fill(null).map(() => ({
                username: fakeInternet.userName(),
                name: fakePerson.fullName() + " " + fakePerson.lastName(),
                bio: fakePerson.bio(),
                role: fakePerson.jobTitle(),
                email: fakeEmail,
                password: MoUser.generatePassword(12),
                profile_image_id: avatarId,
                created_at: new Date(),
                updated_at: new Date(),
            }));
            fakeData.push({
                username: "mrx",
                name: "mrx",
                bio: "mrx",
                role: fakePerson.jobTitle(),
                email: "ayoubaithmad77@gmail.com",
                password: "ayoubaithmad77@gmail.com",
                profile_image_id: avatarId,
                created_at: new Date(),
                updated_at: new Date(),
            });
            await collection.insertMany(fakeData);

            console.log(succes("✅ "+UserCollection.collectionName + " collection seeder finished successfully."));
        }catch(err) {
            console.log(err)
        }

    }
}


module.exports = UserSeeder;




