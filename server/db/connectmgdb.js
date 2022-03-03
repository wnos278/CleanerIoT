const { MongoClient } = require('mongodb');

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */


// Connec to MongoDB
// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
//     const uri = "mongodb://wnos278:12345@localhost:27017/?authSource=test&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
//     const client = new MongoClient(uri);

//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();

//         // Make the appropriate DB calls
//         await  listDatabases(client);

//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };
const uri = "mongodb://wnos278Admin:12345@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
exports.insertData = async (data) => {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db("admin");
        let collection = db.collection('messages');
        await collection.insertOne(data);
        return 1;
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
    return null;
}

exports.selectManyDataWithTimeStamp = async (time_begin, time_end) => {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db("admin");
        let collection = db.collection('messages');
        var query = { "timestamp": { $gte: time_begin, $lt: time_end } };
        var sorttime = {"timestamp" : 1};
        let res = await collection.find(query).sort(sorttime).toArray();
        return res;
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
    return null;
}

// main().catch(console.error);