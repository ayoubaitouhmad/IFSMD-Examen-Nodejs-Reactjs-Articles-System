
exports.checkIfCollectionExists = async  (db, collectionName) => {
    const collections = await db.listCollections({name: collectionName}).toArray();
    return collections.length > 0;
}