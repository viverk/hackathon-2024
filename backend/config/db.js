const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connecté...");
  } catch (error) {
    console.error(error.message);
    // Sortie du processus avec un échec
    process.exit(1);
  }
};

module.exports = connectDB;
