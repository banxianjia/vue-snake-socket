const { Server } = require("socket.io");
const snake = require("./snake");
const food = require("./foods");
const { hMove, checkRoom } = require("./func");
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
            row: args.row,
            col: args.col,
            max: args.maxUser,
            num: 1,
            users: new Map(),
            food: {}
        }
        rooms.push(roomInfo)
        console.log(socket.id + "创建了房间")
    })
    socket.on("joinRoom", (args, cb) => {
        const id = rooms.findIndex(room => room.roomId === args.roomId)
        if (id != -1) {
            if (rooms[id].max > rooms[id].num) {
                socket.join(args.roomId)
                console.log(socket.id + "加入了房间")
                cb({ type: "success", msg: "成功进入房间" })
            }
            else {
                cb({ type: "error", msg: "房间人数已满！！！！" })
            }
        } else {
            cb({ type: "error", msg: "房间号不存在！！！" })
        }

    })
    socket.once("setSnake", (name, bg) => {
        console.log("收到" + socket.id + "设置蛇消息")
        const id = checkRoom(socket, rooms)
        if (id != -1) {
            const roomInfo = rooms[id]
            const user = new snake(roomInfo.row, roomInfo.col, name, bg)
            roomInfo.users.set(socket.id, user)
            socket.emit("keepUsers", [...roomInfo.users.values()])
            socket.to(roomInfo.roomId).emit("keepUsers", [...roomInfo.users.values()])
        }
    })

    socket.once("setFoods", () => {
        console.log("收到" + socket.id + "设置食物消息")
        const id = checkRoom(socket, rooms)
        if (id != -1) {
            const roomInfo = rooms[id]
            roomInfo.food = new food(roomInfo.row, roomInfo.col, [...roomInfo.users.values()])
            socket.emit("keepFoods", roomInfo.food)
            socket.to(roomInfo.roomId).emit("keepFoods", roomInfo.food)
        }
    })
    socket.on("getRC", () => {
        console.log("收到" + socket.id + "获取宽高消息")
        const id = checkRoom(socket, rooms)
        if (id != -1) {
            const roomInfo = rooms[id]
            socket.emit("keepRC", roomInfo.row, roomInfo.col)
            socket.to(roomInfo.roomId).emit("keepRC", roomInfo.row, roomInfo.col)
        }
    })
    socket.on("getFoods", () => {
        console.log("收到" + socket.id + "获取食物消息")
        const id = checkRoom(socket, rooms)
        if (id != -1) {
            const roomInfo = rooms[id]
            socket.emit("keepFoods", roomInfo.food)
        }
    })

    socket.on("moveLeft", (cb) => hMove(socket, rooms, 0, cb))
    socket.on("moveRight", (cb) => hMove(socket, rooms, 1, cb))
    socket.on("moveTop", (cb) => hMove(socket, rooms, 2, cb))
    socket.on("moveBottom", (cb) => hMove(socket, rooms, 3, cb))

});
io.listen(3000)
console.log('启动socket服务')