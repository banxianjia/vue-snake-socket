import { reactive } from "vue";
import { io } from "socket.io-client";
import type { MSG, food, res, rooms, snake } from "./type";




export const socketState = reactive({
    connected: false,
    users: [] as Array<snake>,
    foods: {} as food,
    room: {} as rooms,
    row: 10,
    col: 10,
    speed: 1000
});



export const socket = io("http://localhost:3000");

socket.on("keepUsers", (users) => {
    // console.log(users)
    socketState.users = users

})
socket.on("keepFoods", (food) => {
    // console.log("food")
    socketState.foods = food

})
socket.on("keepRC", (r, c) => {
    socketState.row = r
    socketState.col = c
})
socket.on("keepSpeed", (speed) => {
    socketState.speed = speed
})

socket.on("connect", () => {
    socketState.connected = true;

});
socket.on("disconnect", () => {
    socketState.connected = false;
});