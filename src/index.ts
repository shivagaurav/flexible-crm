import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from "graphql";
import { departments, employees } from "./resolvers/users";


const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.json());

const DepartmentType = new GraphQLObjectType({
    name: "department",
    description: "gives information related to different departments in the organization",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
    })
})

const EmployeeType = new GraphQLObjectType({
    name: "employee",
    description: "gives information about allthe employees working in the organization",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        departmentID: { type: GraphQLNonNull(GraphQLString) },
        departmentInfo: {
            type: DepartmentType,
            description: "gives information related to department in which employee works",
            resolve: (employee) => departments.find(dept => dept.id === employee.departmentID)
        }
    })
});

const rootMutationType = new GraphQLObjectType({
    name: "mutation",
    description: "this is for modifying the data",
    fields: () => ({
        addEmployee: {
            type: EmployeeType,
            description: "add a new employee to the record base",
            args: {
                name: {type: GraphQLString},
                departmentID: {type: GraphQLInt}
            },
            resolve: (parent, args) => {
                const emp = {
                    id: employees.length + 1,
                    name: args.name,
                    departmentID: args.departmentID
                }
                employees.push(emp);
                return emp;
            }
        }
    })
});

const rootQueryType = new GraphQLObjectType({
    name: "query",
    description: "root query for retrieving info from database",
    fields: () => ({
        employee: {
            type: EmployeeType,
            description: "gives information about a single employee",
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => employees.find(emp => emp.id === args.id)
        },
        employees: {
            type: GraphQLList(EmployeeType),
            description: "details of all the employees",
            resolve: () => employees
        }
    })
});

const schema = new GraphQLSchema({
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

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}),
);


// define a route handler for the default home page -traditional rest use case
// app.get( "/", ( req, res ) => {
//     res.send( "Hello world!" );
// } );




// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
