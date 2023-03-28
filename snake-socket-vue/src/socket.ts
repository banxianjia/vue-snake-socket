import { reactive } from "vue";
import { io } from "socket.io-client";
interface MSG {
    type: string,
    msg: string
}
export const socketState = reactive({
    connected: false,
    msgs: [] as Array<MSG>,
});


export const socket = io("http://localhost:3000");

socket.on("connect", () => {
    socketState.connected = true;
});

socket.on("disconnect", () => {
    socketState.connected = false;
});
socket.on("msg", (data) => {
    socketState.msgs.unshift(data)
    console.log(data)
});

