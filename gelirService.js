const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function addGelir(userId, amount, currency, category, note, frequency) {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db('monay');
  const gelirler = db.collection('gelirler');

  const gelir = {
    userId,
    amount,
    currency,
    category,
    note,
    frequency,
    createdAt: new Date()
  };

  const result = await gelirler.insertOne(gelir);
  client.close();
  return result.insertedId;
}

module.exports = { addGelir };