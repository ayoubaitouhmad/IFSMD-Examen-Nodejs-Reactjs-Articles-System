const mongoDbConnection = require("../mongoDbConnection");
const FileCollection = require("../migrations/files");
const {succes} = require("../../utils/cli");



class FileSeeder {
    static seed = async () => {
        try {
            const collection = await FileCollection.collection();
            const sampleFiles = [
                {
                    file_name: "sample_image_1.jpg",
                    file_type: "image/jpeg",
                    file_path: "/uploads/images/sample_image_1.jpg",
                    storage: "local",
                    path: "/uploads/images",
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    file_name: "sample_document.pdf",
                    file_type: "application/pdf",
                    file_path: "/uploads/documents/sample_document.pdf",
                    storage: "local",
                    path: "/uploads/documents",
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ];
            await collection.insertMany(sampleFiles);
            console.log(succes("✅ " + FileCollection.collectionName + " collection seeder finished successfully."));
        } catch (error) {
            if(error.hasOwnProperty("writeErrors")){
                for (const writeError of error.writeErrors) {
                    if(writeError?.err?.errInfo?.details?.schemaRulesNotSatisfied){
                        for (const schemaRuleNotSatisfied of writeError.err.errInfo.details.schemaRulesNotSatisfied) {
                            console.log(schemaRuleNotSatisfied);
                        }
                    }
                }
            }else {
                console.log(error)
            }
        }

    }
}


module.exports = FileSeeder;
