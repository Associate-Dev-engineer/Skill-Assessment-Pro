import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_ATLAS_URL, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn; // 🔑 MUST return something
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    throw error;
  }
};

export default connectDB;
