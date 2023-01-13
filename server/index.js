const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);






















// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });


// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express()
// app.use(express.urlencoded())
// app.use(express.json())
// app.use(cors())

// mongoose.connect("mongodb://localhost:27017/mykeeperAppDB", {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("DB connected"))

// const keeperSchema = mongoose.Schema({
//     title: String,
//     description: String
// })

// const Keeper = new mongoose.model("Keeper", keeperSchema)


// app.get("/api/getAll", (req, res) => {
//     Keeper.find({}, (err, keeperList) => {
//         if(err){
//             console.log(err)
//         } else {
//             res.status(200).send(keeperList)
//         }
//     })
// })

// app.post("/api/addNew", (req, res) => {
//     const { title, description } = req.body
//     const keeperObj = new Keeper({
//         title,
//         description
//     })
//     keeperObj.save( err => {
//         if(err){
//             console.log(err)
//         }
//         Keeper.find({}, (err, keeperList) => {
//             if(err){
//                 console.log(err)
//             } else {
//                 res.status(200).send(keeperList)
//             }
//         })
//     })

// })

// app.post("/api/delete", (req, res) => {
//     const { id } = req.body
//     Keeper.deleteOne({ _id: id}, () => {
//         Keeper.find({}, (err, keeperList) => {
//             if(err){
//                 console.log(err)
//             } else {
//                 res.status(200).send(keeperList)
//             }
//         })
//     })

// })

// app.listen( 3001, () => {
//     console.log("Backend created at port 3001")
// })
