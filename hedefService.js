const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function addHedef(userId, amount, category, currency, note) {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db('monay');
  const hedefler = db.collection('hedefler');

  const hedef = {
    userId,
    amount,
    category,
    currency,
    note,
    createdAt: new Date()
  };

  const result = await hedefler.insertOne(hedef);
  client.close();
  return result.insertedId;
}

module.exports = { addHedef };