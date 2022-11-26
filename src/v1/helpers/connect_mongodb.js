require("dotenv").config("");
const mongoose = require("mongoose");

const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("---CONNECT MONGODB SUCCESSED!---");
  } catch (error) {
    console.log(error.message);
  }
};

connectMongodb();
