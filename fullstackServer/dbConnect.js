const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");

module.exports = async () => {
  let mongoUri =
  "mongodb+srv://mdatabase56:05e0oXM1YqmgyE6a@cluster0.w2beg4n.mongodb.net/?retryWrites=true&w=majority";

  try {
    const connect = await mongoose.connect(mongoUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};