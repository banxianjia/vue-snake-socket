import { reactive, ref, shallowRef, type Ref, computed } from "vue";
import { io } from "socket.io-client";
import type { snake } from "./type";



interface MSG {
    type: string,
    msg: string
}
export const socketState = reactive({
    connected: false,
    msgs: [] as Array<MSG>,
    users: [] as Array<snake>
    // foods: {} as food
});


export let socketUsers = [];

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
socket.on("keepUsers", (users) => {
    console.log(users)
    socketState.users = users
    // console.log(socketUsers)
})

// socket.on("keepFood", (food) => {
//     socketState.foods = food

// })
