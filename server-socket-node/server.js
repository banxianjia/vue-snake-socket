const { Server } = require("socket.io");
const io = new Server({
    cors: {
        origin: "*"
    }
});
let rooms = []

io.on("connection", (socket) => {
    console.log(socket.id + "连接成功")
    socket.on("disconnect", (reason) => {
        console.log(reason)
    })
    socket.on("createRoom", (args) => {
        socket.join(args.roomId)
        const roomInfo = {
            roomId: args.roomId,
            max: args.maxUser,
            num: 1
        }
        rooms.push(roomInfo)
        console.log(socket.id + "创建了房间")
    })
    socket.on("joinRoom", (args) => {
        const id = rooms.findIndex(room => room.roomId === args.roomId)
        if (id != -1) {
            if (rooms[id].max > rooms[id].num) {
                socket.join(args.roomId)
                console.log(socket.id + "加入了房间")
                socket.emit("msg", {
                    type: "success",
                    msg: "成功进入房间"
                })
            }
            else {
                socket.emit("msg", {
                    type: "error",
                    msg: "房间人数已满！！！！"
                })
            }
        } else {
            socket.emit("msg", {
                type: "error",
                msg: "房间号不存在！！！"
            })
        }

    })
    socket.on("sendUser", (user) => {
        console.log("收到" + socket.id + "的蛇信息")
    })
});
io.listen(3000)
console.log('启动socket服务')