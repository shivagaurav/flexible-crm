"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const app = express_1.default();
const port = 8080; // default port to listen
const departments = [
    { id: 1, name: "testing", description: "responsible for mainting product quality" },
    { id: 2, name: "development", description: "respoonsible for delivering new features" },
    { id: 3, name: "marketing", description: "makes the public know about the product" },
    { id: 4, name: "research", description: "decides to take on the new experimental features" },
    { id: 5, name: "operations", description: "takes responsibility for achieving goals and deadlines" },
    { id: 6, name: "testing", description: "takes care of hr related activities" }
];
const employees = [
    { id: 1, name: "luke", departmentID: 1 },
    { id: 2, name: "jake", departmentID: 2 },
    { id: 3, name: "Mia", departmentID: 1 },
    { id: 4, name: "Julia", departmentID: 3 },
    { id: 5, name: "oliver", departmentID: 4 },
    { id: 6, name: "uday", departmentID: 3 },
    { id: 7, name: "adnan", departmentID: 2 },
    { id: 8, name: "gaurav", departmentID: 5 },
    { id: 9, name: "malia", departmentID: 2 },
    { id: 10, name: "scott", departmentID: 6 }
];
const DepartmentType = new graphql_1.GraphQLObjectType({
    name: "department",
    description: "gives information related to different departments in the organization",
    fields: () => ({
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        name: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        description: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    })
});
const EmployeeType = new graphql_1.GraphQLObjectType({
    name: "employee",
    description: "gives information about allthe employees working in the organization",
    fields: () => ({
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        name: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        departmentID: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        departmentInfo: {
            type: DepartmentType,
            description: "gives information related to department in which employee works",
            resolve: (employee) => departments.find(dept => dept.id === employee.departmentID)
        }
    })
});
const rootMutationType = new graphql_1.GraphQLObjectType({
    name: "mutation",
    description: "this is for modifying the data",
    fields: () => ({
        addEmployee: {
            type: EmployeeType,
            description: "add a new employee to the record base",
            args: {
                name: { type: graphql_1.GraphQLString },
                departmentID: { type: graphql_1.GraphQLInt }
            },
            resolve: (parent, args) => {
                const emp = {
                    id: employees.length + 1,
                    name: args.name,
                    departmentID: args.departmentID
                };
                employees.push(emp);
                return emp;
            }
        }
    })
});
const rootQueryType = new graphql_1.GraphQLObjectType({
    name: "query",
    description: "root query for retrieving info from database",
    fields: () => ({
        employee: {
            type: EmployeeType,
            description: "gives information about a single employee",
            args: {
                id: { type: graphql_1.GraphQLInt }
            },
            resolve: (parent, args) => employees.find(emp => emp.id === args.id)
        },
        employees: {
            type: graphql_1.GraphQLList(EmployeeType),
            description: "details of all the employees",
            resolve: () => employees
        }
    })
});
const schema = new graphql_1.GraphQLSchema({
    query: rootQueryType,
    mutation: rootMutationType
});
// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: "employeedetails",
//         fields: () => ({
//             message: {
//                 type: GraphQLString,
//                 resolve: () => "employee-details"
//             }
//         })
//     })
// });
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema,
    graphiql: true
}));
// define a route handler for the default home page -traditional rest use case
// app.get( "/", ( req, res ) => {
//     res.send( "Hello world!" );
// } );
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map