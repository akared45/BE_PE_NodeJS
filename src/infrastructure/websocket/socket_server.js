const { Server } = require("socket.io");
const socketAuthMiddleWare = require("./socket_middleware");

const { sendMessageUseCase } = require("../config/dependencies");

let io;

const initializeSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    io.use(socketAuthMiddleWare);

    io.on("connection", (socket) => {
        const user = socket.data.user;
        console.log(`User ${user.id} connected for Chat`);
        socket.on("join_appointment", (appointmentId) => {
            socket.join(appointmentId);
            console.log(`User ${user.id} joined room ${appointmentId}`);
        });
        socket.on("send_message", async (data) => {
            try {
                const messageResponse = await sendMessageUseCase.execute({
                    senderId: user.id,
                    appointmentId: data.appointmentId,
                    content: data.content,
                    type: 'text'
                });
                io.to(data.appointmentId).emit("new_message", messageResponse);

                console.log(`Msg saved & sent to room ${data.appointmentId}`);

            } catch (error) {
                console.error("Chat Error:", error.message);
                socket.emit("error_message", { message: error.message });
            }
        });

        socket.on("disconnect", () => {
            console.log(`User ${user.id} disconnected`);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) throw new Error("Socket.io not initialized!");
    return io;
};

module.exports = { initializeSocket, getIO };