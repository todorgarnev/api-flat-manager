import mongoose from "mongoose";
import config from "../../config/default";

const connect = async () => {
  const dbUri: string = config.MONGODB;

  try {
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB is connected ⚡");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connect;