const { Server } = require("socket.io");
const io = new Server({
    cors: {
        origin: "*"
    }
});
io.on("connection", (socket) => {
    console.log(socket.id + "连接成功")
});
io.listen(3000)
console.log('启动socket服务')