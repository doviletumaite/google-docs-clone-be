import express from "express";
import cors from "cors";
import http from "http";
import listEndpoints from "express-list-endpoints";
import { Server } from "socket.io";
import  mongoose  from "mongoose";
import document from "./schema/document.js"
import userRouter from "./routers/userRouter.js";
import documentRouter from "./routers/documentRouter.js";

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
app.use("/user", userRouter)
app.use("/document", documentRouter)

const io = new Server(server, { transports: ["websocket", "polling"], cors: corsOptions });

io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document)
     socket.on("send-changes", delta => {
    socket.broadcast.to(documentId).emit("receive-changes", delta)
  })
   socket.on("save-document", async data =>{
   await document.findByIdAndUpdate(documentId, {data})
  })
  })
   console.log("socket connected")
})

async function findOrCreateDocument(id) {
  if (id = null) return
  const thisDocument = await document.findById(id)
  if (thisDocument) return thisDocument
   return await document.create({document})
}

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on("connected", () => {
  console.log("connected with MONGO");
  server.listen(PORT, () => {
    console.log(`server running well :] on port ${PORT}`);
    console.table(listEndpoints(app));
  });
});
