import { connectionToDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  const session= await getServerSession(authOptions)
  if(!session){
    return Response.json({error :"unathurizod access"},{status:401})
  }
  try {
    const { db } = await connectionToDatabase();
    const events = await db.collection("events").find({}).toArray();

    return Response.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return Response.json(
      { error: "Failed To Fetch the events" },
      { status: 500 }
    );
  }
}

export async function POST(req) {

   const session= await getServerSession(authOptions)
  if(!session){
    return Response.json({error :"unathurizod access"},{status:401})
  }

  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const date = formData.get("date");
    const avatar = formData.get("avatar");


    let result;

      if (!name || typeof name !== 'string' || name.length > 100) {
    return Response.json({ error: "Invalid name" }, { status: 400 });
  }
  
  if (!date || isNaN(Date.parse(date))) {
    return Response.json({ error: "Invalid date" }, { status: 400 });
  }
  
  // Sanitize inputs
  const sanitizedName = name.trim();

    if (avatar instanceof File){

      if (avatar.size > 5 * 1024 * 1024) {
    return Response.json({ error: "File too large" }, { status: 400 });
  }
  
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(avatar.type)) {
    return Response.json({ error: "Invalid file type" }, { status: 400 });
  }
      
     // extracting the raw binary data form the file object
    const arrayBuffer = await avatar.arrayBuffer();
    // convert the data to a buffer so node js can write it somewhere
    const buffer = Buffer.from(arrayBuffer);

    // Uploading the image to cloud storage
     result = await new Promise((resolve, reject) => {
      // stream is the destination where data  will be written

      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });
    }

    

    const { db } = await connectionToDatabase();

    const insertResult =await db.collection("events").insertOne({
      name,
      date,
      avatar: result?.secure_url || null,
      createdAt: new Date(),
    });

    return Response.json({
      message: "event added successfully",
      name,
      date,
      avatar: result?.secure_url,
      _id:insertResult.insertedId
    });
  } catch (error) {
    console.error("Error adding event:", error);
    return Response.json({ message: "failed to add event" }, { status: 500 });
  }
}

export async function DELETE(req) {

 const session= await getServerSession(authOptions)
  if(!session){
    return Response.json({error :"unathurizod access"},{status:401})
  }

  try {
    const { db } = await connectionToDatabase();
    const id  = await req.json();

    // the steps for Deleting the image form cloudinary

    const event = await db
      .collection("events")
      .findOne({ _id: new ObjectId(id) });
    if (!event) {
      return Response.json({ error: "Event not found" }, { status: 404 });
    }

    const imageURL = event.avatar;

    if (imageURL) {
      const publicId = imageURL.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    const record =await db.collection("records").find({}).toArray()
   
    await db.collection("records").deleteMany({ eventId:new ObjectId(id) });

    
    await db.collection("events").deleteOne({ _id: new ObjectId(id) });

    return Response.json({ message: "Event has been deleted" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return Response.json(
      { error: "failed to delete the event" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {

 const session= await getServerSession(authOptions)
  if(!session){
    return Response.json({error :"unathurizod access"},{status:401})
  }

  try {
    
    const { db } = await connectionToDatabase();


    const formData = await req.formData();
    const id = formData.get("id");
    const newName = formData.get("name");
    const newDate = formData.get("date");
    const  newAvatar = formData.get("avatar");
    

  const existingEvents= await db.collection("events").findOne({_id:new ObjectId(id)})
  if(!existingEvents){
    Response.json({error: "event Not Found!"},{status:404})
  }
  

    let newAvatarUrl=existingEvents.avatar;
    if (newAvatar instanceof File) {
     
      const imageURL = existingEvents.avatar;

      if (imageURL) {
      
        const publicId = imageURL.split("/").pop().split(".")[0];
       const deleteResult = await cloudinary.uploader.destroy(publicId);
       
      }
      
      const arrayBuffer = await newAvatar.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
       const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (error, result) => {
            if (error) {
              console.log("Cloudinary upload error :",error)
              reject(error);
            }
            
            else{
            
               resolve(result);
            }
          })
          .end(buffer);
      });
      newAvatarUrl = result?.secure_url;
      
    }


    const updatedData = {
      name: newName,
      date: newDate,
      avatar: newAvatarUrl,
    };
   
     await db
      .collection("events")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
     
    
    return Response.json({ message: "Event updated",newAvatarUrl });
  } catch (error) {
    return Response.json({ error: "Failed to update event" }, { status: 500 });
  }
}
