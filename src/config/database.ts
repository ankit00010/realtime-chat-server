import { MongoClient } from "mongodb";

let client:MongoClient;

export async function initializeMongo() {
  try {
    let mongoURI = process.env.MONGO_URI ||""

  

 client = new MongoClient(mongoURI);
    await client.connect();
    console.log("Connected to the MongoDB database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

export function getClient() {
  return client;
}
