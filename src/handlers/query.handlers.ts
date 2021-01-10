import { GraphQLInt, GraphQLObjectType, GraphQLList } from "graphql";
import { getEmployeeDetails } from "../resolvers/employees";
import { employees } from "../resolvers/users";
import { EmployeeType } from "./types";

// adding  all the retrieving calls in this type
export const rootQueryType = new GraphQLObjectType({
    name: "query",
    description: "root query for retrieving info from database",
    fields: () => ({
        // employee: {
        //     type: EmployeeType,
        //     description: "gives information about a single employee",
        //     args: {
        //         id: {type: GraphQLInt}
        //     },
        //     resolve: (parent, args) => employees.find(emp => emp.id === args.id)
        // },
        employees: {
            type: GraphQLList(EmployeeType),
            description: "details of all the employees",
            resolve: async () => await getEmployeeDetails()
        }
    })
});