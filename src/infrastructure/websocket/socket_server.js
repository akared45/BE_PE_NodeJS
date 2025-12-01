const { Server } = require('socket.io');

let io;

const initializeSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);
        socket.on("join_room", (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room: ${roomId}`);
            socket.emit("receive_message", {
                sender: "System",
                content: `Chào mừng bạn vào phòng ${roomId}`,
                timestamp: new Date()
            });
        })
        socket.on("send_message", (data) => {
            console.log("Message received:", data);
            socket.to(data.roomId).emit("receive_message", data);
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = { initializeSocket, getIO };