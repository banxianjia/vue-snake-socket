// 碰撞检测
exports.collide = (user, users) => {
    console.log("碰撞检测");
    let h = [user.site[0].x, user.site[0].y];
    let snake_site = [];
    users.forEach(user => {
        snake_site = snake_site.concat(user.site);
    })
    // console.log(snake_site);
    let result = snake_site.filter(crd => crd.x === h[0] && crd.y === h[1])
    if (result.length >= 2) {
        console.log("蛇头碰到蛇体了！！！！");
        user.over = true
    }
}
// 吃食物
// hi 头行，hj 头列 ti 移动前尾行 tj 移动前尾列
exports.eat = (socket, foods, user) => {
    // 蛇头坐标
    let h = [user.site[0].x, user.site[0].y];
    if (h[0] === foods.site.x && h[1] === foods.site.y) {
        /** 吃食物蛇各数据变化机制 */
        // renderClearFood(foods, )
        // renderSnake(socketState.users);
        // renderFood(new food(10, 10, users))
        // console.log(this);
        user.speed = user.speed - 100
        socket.emit("keepSpeed", user.speed)
        console.log(user.bg + "发送speed")
        console.log(user.bg + "吃到食物")
        return true
    }
    return false;
}

// 上下左右移动,mode:执行类型：0，1，2，3 左右上下
const reFx = [1, 0, 3, 2]
const food = require("./foods");
exports.hMove = (socket, rooms, mode, cb = () => { }) => {
    console.log("收到" + socket.id + "移动" + mode + "消息")
    const id = this.checkRoom(socket, rooms);
    if (id != -1) {
        const roomInfo = rooms[id]
        let self = roomInfo.users.get(socket.id)
        if (self.over) {
            cb({ type: "error", msg: "您已死亡！！！！！" })
        }
        else if (self.fx != reFx[mode]) {
            self.fx = mode
            this.collide(self, [...roomInfo.users.values()])
            // self.moveBottom();
            switch (mode) {
                case 0:
                    self.moveLeft();
                    break;
                case 1:
                    self.moveRight();
                    break;
                case 2:
                    self.moveTop();
                    break;
                case 3:
                    self.moveBottom();
                    break;
            }

            if (this.eat(socket, roomInfo.food, self)) {
                roomInfo.food = new food(roomInfo.row, roomInfo.col, [...roomInfo.users.values()])
                socket.emit("keepFoods", rooms[id].food)
                socket.to(roomInfo.roomId).emit("keepFoods", roomInfo.food)
            }
            roomInfo.users.set(socket.id, self)
            socket.emit("keepUsers", [...roomInfo.users.values()])
            socket.to(roomInfo.roomId).emit("keepUsers", [...roomInfo.users.values()])
        }
    }
}

// 检查房间是否存在
exports.checkRoom = (socket, rooms) => {
    let roomId = Array.from(socket.rooms)[1]// 获取房间号
    const id = rooms.findIndex(room => room.roomId === roomId)
    return id;
}