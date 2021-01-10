import {Db, MongoClient} from "mongodb";

// Replace the following with your Atlas connection string
export let dbConn: Db;
export let mongoClient: MongoClient;
export async function establishConnToMongo(dbUrl: string) {
    try {
        mongoClient = new MongoClient(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        await mongoClient.connect();
        dbConn = mongoClient.db("crm");
        console.log("database connected to server ");
    } catch (err) {
        console.log(err.stack);
    }
}
