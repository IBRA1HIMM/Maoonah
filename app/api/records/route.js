import { connectionToDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");
  const { db } = await connectionToDatabase();
  const recordsList = await db
    .collection("records")
    .find({ eventId: eventId })
    .toArray();

  return Response.json(recordsList);
}

export async function POST(req) {
  try {
    const recordValues = await req.json();

    const { db } = await connectionToDatabase();

    await db.collection("records").insertOne({
      name: recordValues.name,
      money: recordValues.money,
      eventId: recordValues.eventId,
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
