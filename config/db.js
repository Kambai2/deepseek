import moongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };

export default async function connectToDB() {
    if (cached.conn)  return cached.conn;
    if (!cached.promise) {
        cached.promise = moongoose.connect(process.env.MONGODB_URI).then((mongoose) => mongoose); 
    }
    try{
cached.conn = await cached.promise;
    } catch (error) {
         console.error("Error connecting to MongoDB:", error);
    }
    return cached.conn 
}