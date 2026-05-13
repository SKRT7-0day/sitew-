import { MongoClient } from 'mongodb';

// تم وضع الرابط هنا مباشرة مع تصحيح كلمة السر
const uri = "mongodb+srv://Skrt:Jeiwbe8e64v59ng@cluster0.q8h8j2h.mongodb.net/skrt7_db?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db('skrt7_db');
    const collection = db.collection('settings');

    if (req.method === 'GET') {
      const data = await collection.findOne({ name: 'global_stats' });
      return res.status(200).json(data || { totalJoins: 1200 });
    } 
    
    if (req.method === 'POST') {
      await collection.updateOne(
        { name: 'global_stats' },
        { $inc: { totalJoins: 1 } },
        { upsert: true }
      );
      return res.status(200).json({ success: true });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

