import mongoose from "mongoose";
import { InitUser } from "../utils/initDB";

export default (db: string) => {
  const connect = () => {
    mongoose
      .connect(db)
      .then(() => {
        return console.log(`Successfully connected to Database`);
      })
      .catch((error) => {
        console.log("Error connecting to database: ", error);
        return process.exit(1);
      });
  };
  connect();

  InitUser();

  mongoose.connection.on("disconnected", connect);
};
