import express from "express";
import cors from "cors";
import http from "http";
import listEndpoints from "express-list-endpoints";
import { Server } from "socket.io";

const app = express();
const whiteList = ["http://localhost:3000" ];
const corsOptions = {
  origin: (origin, callback) => {

    if (whiteList.some((allowedUrl) => allowedUrl === origin)) {
      callback(null, true);
    } else {
      const error = new Error("Not allowed by cors!");
      error.status = 403;
      callback(error);
    }
  },
};
app.use(cors());

app.use(express.json());
const PORT = process.env.PORT;
const server = http.createServer(app);

const io = new Server(server, { transports: ["websocket", "polling"], cors: corsOptions });
io.on("connection", socket => {

})
server.listen(PORT, () => {
    console.log(`server running well :] on port ${PORT}`);
    console.table(listEndpoints(app));
  });