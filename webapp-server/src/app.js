import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();
const httpServer = createServer(app);

//creating the instance of the socket
const io = new Server(httpServer, {
    pingTimeout: 60000, //this is inorder to use the optimum bandwidth ... it will close automatically if new events are triggered for specified duration
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});

//assigning the "io" reference with the app instance
app.set("io", io);

//set the cors
// global middlewares
app.use(
    cors({
        origin:
            process.env.CORS_ORIGIN === "*"
                ? "*" // This might give CORS error for some origins due to credentials set to true
                : process.env.CORS_ORIGIN?.split(","), // For multiple cors origin for production.
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes middleware
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// common error handling middleware
app.use(errorHandler);
export {
    httpServer
};