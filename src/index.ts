import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "graphql";
import { establishConnToMongo, mongoClient } from "./database/connect";
import { rootQueryType } from "./handlers/query.handlers";
import { rootMutationType } from "./handlers/mutation.handlers";


const app = express();
const port = 8080; // default port to listen

dotenv.config();

// connect to mongo db
establishConnToMongo(process.env.DB_URL);

app.use(bodyParser.json());

const schema = new GraphQLSchema({
    query: rootQueryType,
    mutation: rootMutationType
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}),
);


// start the server and listen
const server = app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

// graceful termination of server
process.on('SIGINT', () => {
    console.log('sig term process...');
    server.close(() => {
        console.log('stopping the server');
        mongoClient.close();
        console.log('mongo db connection closed....');
    })

});