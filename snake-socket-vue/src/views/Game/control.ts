

// 对游戏的各种操作

import { socket, socketState } from "./socket";
import type { res } from "./type";




// 监听键盘
export function keyDown() {
    document.onkeydown = (e) => {
        // 事件对象兼容
        let e1 =
            e || event || window.event || arguments.callee.caller.arguments[0];
        // console.log(e1);
        if (e1 && e1.keyCode == 37) {
            // ←键
            socket.emit("moveLeft", (res: res) => {
                if (res && res.type == "error") {
                    alert(res.msg)
                }
            })
        } else if (e1 && e1.keyCode == 39) {
            // →键
            socket.emit("moveRight", (res: res) => {
                if (res && res.type == "error") {
                    alert(res.msg)
                }
            })
        } else if (e1 && e1.keyCode == 38) {
            // ↑键
            socket.emit("moveTop", (res: res) => {
                if (res && res.type == "error") {
                    alert(res.msg)
                }
            })
        } else if (e1 && e1.keyCode == 40) {
            // ↓键
            socket.emit("moveBottom", (res: res) => {
                if (res && res.type == "error") {
                    alert(res.msg)
                }
            })
        }
    };
}



