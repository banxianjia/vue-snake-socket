const { Server } = require("socket.io");
const snake = require("./snake");
const food = require("./foods");
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
            num: 1,
            users: new Map(),
            maps: [[]],
            food: {}
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
    socket.on("setSnake", (row, col) => {
        console.log("收到" + socket.id + "设置蛇消息")
        const user = new snake(row, col)
        let roomId = Array.from(socket.rooms)[1]// 获取房间号
        const id = rooms.findIndex(room => room.roomId === roomId)
        if (id != -1) {
            rooms[id].users.set(socket.id, user)
            socket.emit("keepUsers", [...rooms[id].users.values()])
            socket.to(roomId).emit("keepUsers", [...rooms[id].users.values()])
        }
    })

    socket.on("setMap", (row, col, bg) => {
        console.log("收到" + socket.id + "设置地图消息")
        let roomId = Array.from(socket.rooms)[1]// 获取房间号
        const id = rooms.findIndex(room => room.roomId === roomId)
        if (id != -1) {
            rooms[id].maps = new Array(row).fill(0).map(() => new Array(col).fill(bg))
        }
    })
    socket.on("setFood", (row, col, bg) => {
        console.log("收到" + socket.id + "设置食物消息")
        let roomId = Array.from(socket.rooms)[1]// 获取房间号
        const id = rooms.findIndex(room => room.roomId === roomId)
        if (id != -1) {
            rooms[id].food = new food(row, col, [...rooms[id].users.values()])
        }
    })

    socket.on("moveLeft", () => {
        console.log("收到" + socket.id + "左移动消息")
        let roomId = Array.from(socket.rooms)[1]// 获取房间号
        const id = rooms.findIndex(room => room.roomId === roomId)
        if (id != -1) {
            let self = rooms[id].users.get(socket.id)
            self.moveLeft();
            rooms[id].users.set(socket.id, self)
            socket.emit("keepUsers", [...rooms[id].users.values()])
            socket.to(roomId).emit("keepUsers", [...rooms[id].users.values()])
        }
    })
    socket.on("moveRight", () => {
        console.log("收到" + socket.id + "右移动消息")
        let roomId = Array.from(socket.rooms)[1]// 获取房间号
        const id = rooms.findIndex(room => room.roomId === roomId)
        if (id != -1) {
            let self = rooms[id].users.get(socket.id)
            self.moveRight();
            rooms[id].users.set(socket.id, self)
            socket.emit("keepUsers", [...rooms[id].users.values()])
            socket.to(roomId).emit("keepUsers", [...rooms[id].users.values()])
        }
    })
    socket.on("moveTop", () => {
        console.log("收到" + socket.id + "上移动消息")
        let roomId = Array.from(socket.rooms)[1]// 获取房间号
        const id = rooms.findIndex(room => room.roomId === roomId)
        if (id != -1) {
            let self = rooms[id].users.get(socket.id)
            self.moveTop();
            rooms[id].users.set(socket.id, self)
            socket.emit("keepUsers", [...rooms[id].users.values()])
            socket.to(roomId).emit("keepUsers", [...rooms[id].users.values()])
        }
    })
    socket.on("moveBottom", () => {
        console.log("收到" + socket.id + "下移动消息")
        let roomId = Array.from(socket.rooms)[1]// 获取房间号
        const id = rooms.findIndex(room => room.roomId === roomId)
        if (id != -1) {
            let self = rooms[id].users.get(socket.id)
            self.moveBottom();
            rooms[id].users.set(socket.id, self)
            socket.emit("keepUsers", [...rooms[id].users.values()])
            socket.to(roomId).emit("keepUsers", [...rooms[id].users.values()])
        }
    })


});
io.listen(3000)
console.log('启动socket服务')