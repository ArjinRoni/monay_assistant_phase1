const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function addHarcama(userId, amount, group, category, currency, note, expenseEmotion) {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db('monay');
  const harcamalar = db.collection('harcamalar');

  const harcama = {
    userId,
    amount,
    group,
    category,
    currency,
    note,
    expenseEmotion,
    createdAt: new Date()
  };

  const result = await harcamalar.insertOne(harcama);
  client.close();
  return result.insertedId;
}

module.exports = { addHarcama };