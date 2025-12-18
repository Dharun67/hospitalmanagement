const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: "./config.env" });

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("DATABASE SUCCESSFULLY CONNECTED"))
  .catch(err => console.error(err));

const clearDatabase = async () => {
  try {
    // Wait for connection to be established
    await new Promise((resolve) => {
      if (mongoose.connection.readyState === 1) {
        resolve();
      } else {
        mongoose.connection.once('open', resolve);
      }
    });
    
    // Drop all collections
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.drop();
    }
    
    console.log('Database cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();