import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { getDeparmentDetails } from "../resolvers/departments";

export const DepartmentType = new GraphQLObjectType({
    name: "department",
    description: "gives information related to different departments in the organization",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
    })
});

export const EmployeeType = new GraphQLObjectType({
    name: "employee",
    description: "gives information about all the employees working in the organization",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        departmentID: { type: GraphQLNonNull(GraphQLString) },
        departmentInfo: {
            type: DepartmentType,
            description: "gives information related to department in which employee works",
            resolve: async (employee) =>{
                const departments = await getDeparmentDetails();
                return departments.find((dept: any) => dept.id === employee.departmentID)
            }
        }
    })
});