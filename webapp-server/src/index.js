//setting up the env file at first
import dotenv from "dotenv";
dotenv.config({ path: '.env' });

//importing the dependencies
import { httpServer } from "./app.js";
import connectDB from "./db/index.js";

const startServer = () => {
    httpServer.listen(process.env.PORT || 8080, () => {
        console.info(
            `Server is listening at: http://localhost:${process.env.PORT || 8080
            }`
        );
        console.log("Server is running on port: " + process.env.PORT);
    });
};

try {
    await connectDB();
    startServer();
  } catch (err) {
    console.log("Mongo db connect error: ", err);
  }