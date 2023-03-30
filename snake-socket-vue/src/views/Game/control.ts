

// 对游戏的各种操作

import { socket } from "./socket";




// 监听键盘
export function keyDown() {
    document.onkeydown = (e) => {
        // 事件对象兼容
        let e1 =
            e || event || window.event || arguments.callee.caller.arguments[0];
        // console.log(e1);
        if (e1 && e1.keyCode == 37) {
            // ←键
            socket.emit("moveLeft")
        } else if (e1 && e1.keyCode == 39) {
            // →键
            socket.emit("moveRight")
        } else if (e1 && e1.keyCode == 38) {
            // ↑键
            socket.emit("moveTop")
        } else if (e1 && e1.keyCode == 40) {
            // ↓键
            socket.emit("moveBottom")
        }
    };
}



