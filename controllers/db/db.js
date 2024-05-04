const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URL;
    // Connect to MongoDB
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
