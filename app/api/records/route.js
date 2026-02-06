import { connectionToDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {

const session = await getServerSession(authOptions);
if(!session){
  return Response.json({error:"unathourized access"},{status:401})
}

  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

 if (!eventId || !ObjectId.isValid(eventId)) {
    return Response.json({ error: "Invalid eventId" }, { status: 400 });
  }

  const { db } = await connectionToDatabase();
  const recordsList = await db
    .collection("records")
    .find({ eventId: new ObjectId(eventId) })
    .toArray();

  return Response.json(recordsList);
}

export async function POST(req) {
const session = getServerSession(authOptions);

if(!session){
  return Response.json({error:"unathourized access"},{status:401})
}



  try {
    const recordValues = await req.json();

    const { db } = await connectionToDatabase();

    await db.collection("records").insertOne({
      name: recordValues.name,
      money: recordValues.money,
      eventId:new ObjectId (recordValues.eventId),
      createdAt: new Date(),
    });

    return Response.json({
      message: "record added successfully",
    });
  } catch (err) {
    return Response.json({
      error: `failed to add record: ${err}`,
    });
  }
}

export async function DELETE(req) {
const session = getServerSession(authOptions);
if(!session){
  return Response.json({error:"unathourized access"},{status:401})
}


  try {
    const recordId = await req.json();
    const { db } = await connectionToDatabase();
    const result = await db.collection("records").deleteOne({ _id: new ObjectId(recordId) });
    
    if (result.delteCount === 0)
      return Response.json({ message: "Record not found" });

    return Response.json({ message: "record removed succasfully" });
  } catch (err) {
    return Response.json({ message: `something bad happened: ${err}` });
  }
}
