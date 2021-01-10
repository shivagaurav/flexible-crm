import { dbConn } from "../database/connect";

export async function getEmployeeDetails(): Promise<any[]> {
    try {
        const employees: any[] = [];
        // below line needs to be improvised!!
        const cursor = dbConn.collection("employees").find({}, { projection: { _id: 0, id: 1, name: 1, departmentID: 1 } });
        await cursor.forEach(val => employees.push(val));
        console.log('this is from graphql');
        return employees;
    } catch(err) {
        console.log('error when retieving employee data ', err);
    }
}