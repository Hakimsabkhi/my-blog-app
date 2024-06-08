import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

// In development mode, use a global variable so the client is not created multiple times
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client instance
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
