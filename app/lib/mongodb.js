import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI; 
const DB_NAME=process.env.DB_NAME;

let cachedClient=null;
let cachedDB=null;

export async function connectionToDatabase(){
    if(cachedClient&&cachedDB){ 
        return {client:cachedClient,db:cachedDB}
    }
    const client=new MongoClient(MONGODB_URI);
    await client.connect();
    const db=client.db(DB_NAME);
    cachedClient=client;
    cachedDB=db;

    return{client,db};
}