import { connectionToDatabase } from "@/app/lib/mongodb";

export async function GET(){
    try{
        const {db} =await connectionToDatabase()

        const collections=await db.listCollections().toArray();

        return Response.json({
            message:"succefly connected To Database",
            collections:collections.map(col=>col.name)
        })
    }
    catch(error){
        return Response.json({message:"Database connection Failed", error:error.message},{status:500})
    }
}