import mongoose from "mongoose";

type DBConnectOptions = {
  isConnected?: number;
}

const connection: DBConnectOptions = {};

async function dbConnect(): Promise<void>{
  if (connection.isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("response after connection to db",db);
    console.log("response after connection to db",db.connections);
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Failed to connect to the database");
    process.exit(1);
  }
}

export default dbConnect;