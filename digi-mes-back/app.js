/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const dotenv = require("dotenv");
const passport = require("passport");
// const Message = require("./models/discussion");
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
        origin:
            process.env.NODE_ENV === "production"
                ? process.env.REACT_APP_PROD_URL
                : process.env.REACT_APP_DEV_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});
const clientSocketId = [];
const connectedUsers = [];
const getSocketByUserId = (userId) => {
    let socket = "";
    for (let i = 0; i < clientSocketId.length; i++) {
        if (clientSocketId[i].userId === userId) {
            socket = clientSocketId[i].socket;
            break;
        }
    }
    return socket;
};
io.on("connection", (socket) => {
    // console.log(`User connected: ${socket.id}`);
    socket.on("logged_in", (user) => {
        console.log(user);
        clientSocketId.push({ socket: socket, userId: user.id });
        connectedUsers.filter((item) => item.id !== user.id);
        connectedUsers.push({ ...user, socketId: socket.id });
        console.log(clientSocketId);
        io.emit("update_list", connectedUsers);
    });

    socket.on("create", (data) => {
        console.log(data.room);
        socket.join(data.room);
        let withSocket = getSocketByUserId(data.friendId);
        console.log(withSocket);
        socket.broadcast.to(withSocket.id).emit("invite", { room: data });
    });

    socket.on("join_room", (data) => socket.join(data.room.room));
    socket.on("message", (data) => {
        socket.broadcast.to(data.room).emit("message", data);
    });
    socket.on("disconnection", () => {
        connectedUsers.remove({ ...user, socketId: socket.id });
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
