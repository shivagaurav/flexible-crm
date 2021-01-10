import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { employees } from "../resolvers/users";
import { EmployeeType } from "./types";

// adding all the db modification changes in this type
export const rootMutationType = new GraphQLObjectType({
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