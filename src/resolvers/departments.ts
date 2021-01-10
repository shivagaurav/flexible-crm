import { dbConn } from "../database/connect";

export async function getDeparmentDetails(): Promise<any[]> {
    try {
        const departments: any[] = [];
        // below line needs to be improvised!!
        const cursor = dbConn.collection("departments").find({}, { projection: { _id: 0, id: 1, name: 1, description: 1 } });
        await cursor.forEach(val => departments.push(val));
        return departments;
    } catch(err) {
        console.log('error when retieving department data ', err);
    }
}
