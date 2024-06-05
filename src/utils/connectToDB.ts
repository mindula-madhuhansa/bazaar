import mongoose from "mongoose";

export async function connectToDB() {
  return mongoose.connect(process.env.MONGO_DB_URI as string);
}
