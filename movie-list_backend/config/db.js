import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connection is successful: ${conn.connection.host}`);
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
  }
};

export default connectDB;
