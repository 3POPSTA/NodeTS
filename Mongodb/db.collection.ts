import { MongoClient, Db } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

async function main(): Promise<void> {
  try {
    // Connect to MongoDB
    await client.connect();

    // Select the database
    const db: Db = client.db('mydb');

    // Create a collection
    await db.createCollection('customers');

    console.log('Collection created successfully!');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error:', error.message);
    } else {
      console.log('Error:', error);
    }
  } finally {
    // Close the connection
    await client.close();
  }
}

main();

export {};
