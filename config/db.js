import mongoose from "mongoose";

const globalAny = global;
let cached = globalAny.mongoose || { conn: null, promise: null };

export default async function connectToDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI).then((m) => m);
    }
    try {
        cached.conn = await cached.promise;
        globalAny.mongoose = cached;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
    return cached.conn;
}