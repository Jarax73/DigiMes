/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const dotenv = require("dotenv");
const passport = require("passport");
const Message = require("./models/discussion");
dotenv.config();
// const User = require("./models/users");
const userRoutes = require("./routes/users");
const discussionsRoutes = require("./routes/discussion");
const cors = require("cors");
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3008",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

let clientSocketIds = [];
let connectedUsers = [];

io.on("connection", (socket) => {
    // socket.on("send_message", (data) => {
    //     console.log(data);
    //     if (sendUserSocket) {
    //         Message.find().then((result) => {
    //             socket.to(sendUserSocket).emit("msg_received", result);
    //         });
    //     }
    // });

    socket.on("logged_in", (user) => {
        // console.log(user.id);
        clientSocketIds.push({ socket: socket, userId: user._id });
        connectedUsers = connectedUsers.filter((item) => item._id != user._id);
        connectedUsers.push({ ...user, socket: socket.id });
        io.emit("updated_list", connectedUsers);
    });

    socket.on("update_user", (data) => {
        console.log(data);
    });

    socket.on("private_message", (data) => {
        const messages = new Message(data);
        messages.save();
        // console.log(data.socketTo);
        socket.to(data.socketTo).emit("private_message", data);
    });

    // console.log(`User connected: ${socket.id}`);

    // Message.find().then((result) => {
    //     socket.emit("output_messages", result);
    // });

    socket.on("disconnect", () => {
        // console.log("User disconnected");
        connectedUsers = connectedUsers.filter(
            (item) => item.sockedId !== socket.id
        );
        io.emit("updated_list", connectedUsers);
    });
});

server.listen(port, () => {
    console.log("listening on port " + port);
});

require("./controllers/passport");

mongoose
    .connect(`${process.env.MONGO_CONNECT}`)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    response.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// app.use("/api/user", todiscuss);
app.use("/api/", userRoutes);
app.use("/api/discussions", discussionsRoutes);

module.exports = app;
