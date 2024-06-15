"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uri = process.env.MONGODB_URI;
let client;
let clientPromise;
if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}
// In development mode, use a global variable so the client is not created multiple times
if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new mongodb_1.MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
}
else {
    // In production mode, create a new client instance
    client = new mongodb_1.MongoClient(uri);
    clientPromise = client.connect();
}
exports.default = clientPromise;
