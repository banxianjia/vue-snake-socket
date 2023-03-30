<script setup lang="ts">
import { io } from "socket.io-client";
import { onMounted, ref, type Ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { socket, socketState } from "./Game/socket";
const showCreate: Ref<Boolean> = ref(false);
const showJoin: Ref<Boolean> = ref(false);
const maxUsers: Ref<number> = ref(2);
const roomNum: Ref<number> = ref(0);
const router = useRouter();
onMounted(() => {
  socket.connect();
});
function joinRoomBtn() {
  showJoin.value = true;
}
function createRoomBtn() {
  showCreate.value = true;
}
function myCancel(mode: number) {
  if (mode === 0) {
    showCreate.value = false;
  } else if (mode === 1) {
    showJoin.value = false;
  }
}
async function myConfirm(mode: number) {
  if (mode === 0) {
    // 创建房间确认
    const room = Math.floor(Math.random() * 9000 + 1000);
    socket.emit("createRoom", { roomId: room, maxUser: maxUsers.value });
    router.push({ name: "room", query: { roomId: room } });
  } else if (mode === 1) {
    // 加入房间确认
    const room = roomNum.value;
    await socket.emit("joinRoom", { roomId: room });
    if (socketState.msgs[0].type === "error") {
      alert(socketState.msgs[0].msg);
    } else if (socketState.msgs[0].type === "success") {
      router.push({ name: "room", query: { roomId: room } });
    }
  }
}
</script>

<template>
  <main>
    <h1>贪吃蛇多人联机小游戏</h1>
    <div
      style="
        width: 300px;
        height: 200px;
        background-color: aqua;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
    >
      <button @click="createRoomBtn">创建房间</button>
      <button @click="joinRoomBtn">加入房间</button>
    </div>
  </main>
  <div class="panel" v-if="showCreate">
    设置房间最大人数:
    <input type="number" v-model="maxUsers" max="6" min="2" />
    <div style="position: absolute; bottom: 0">
      <button @click="myCancel(0)">取消</button>
      <button @click="myConfirm(0)">确认</button>
    </div>
  </div>
  <div class="panel" v-if="showJoin">
    输入房间号:
    <input type="number" v-model="roomNum" max="9999" min="1000" />
    <div style="position: absolute; bottom: 0">
      <button @click="myCancel(1)">取消</button>
      <button @click="myConfirm(1)">确认</button>
    </div>
  </div>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}
button {
  width: 100px;
}
.panel {
  position: fixed;
  top: 100px;
  left: 400px;
  width: 200px;
  height: 100px;
  background-color: rgb(162, 226, 226);
}
@media (min-width: 1024px) {
}
</style>
