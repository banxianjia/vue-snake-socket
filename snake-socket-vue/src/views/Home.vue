<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import { socket } from "./Game/socket";
import type { res } from "./Game/type";
const showCreate: Ref<Boolean> = ref(false);
const showJoin: Ref<Boolean> = ref(false);
const maxUsers: Ref<number> = ref(2);
const roomNum: Ref<number> = ref(0);
const row: Ref<number> = ref(10);
const col: Ref<number> = ref(10);
const userName: Ref<string> = ref("");
const userBg: Ref<string> = ref("#ffffff");
const router = useRouter();
onMounted(() => {
  socket.connect();
});
function joinRoomBtn() {
  showCreate.value = false;
  showJoin.value = true;
}
function createRoomBtn() {
  showJoin.value = false;
  showCreate.value = true;
}
function myCancel(mode: number) {
  if (mode === 0) {
    showCreate.value = false;
  } else if (mode === 1) {
    showJoin.value = false;
  }
}
function myConfirm(mode: number) {
  if (userName.value && userBg.value != "#ffffff") {
    if (mode === 0) {
      // 创建房间确认
      const room = Math.floor(Math.random() * 9000 + 1000);
      if(maxUsers.value>6){
        maxUsers.value = 6
      }
      else if(maxUsers.value<2){
        maxUsers.value = 2
      }
      socket.emit("createRoom", {
        roomId: room,
        maxUser: maxUsers.value,
        row: row.value,
        col: col.value,
      });
      socket.emit("setSnake", userName.value, userBg.value);
      socket.emit("setFoods");
      socket.emit("getRC");
      router.push({
        name: "room",
        query: { roomId: room },
      });
    } else if (mode === 1) {
      // 加入房间确认
      const room = roomNum.value;
      socket.emit("joinRoom", { roomId: room }, (res: res) => {
        if (res.type == "success") {
          socket.emit("setSnake", userName.value, userBg.value);
          socket.emit("getFoods");
          socket.emit("getRC");
          router.push({ name: "room", query: { roomId: room } });
        } else if (res.type == "error") {
          alert(res.msg);
        }
      });
    }
  } else {
    alert("请选择颜色和填写昵称");
  }
}
</script>

<template>
  <div>
    <h1>贪吃蛇多人联机小游戏</h1>
    <div style="display: flex">
      <div
        style="
          width: 300px;
          height: 200px;
          background-color: aqua;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 10px;
        "
      >
        <button @click="createRoomBtn">创建房间</button>
        <button @click="joinRoomBtn">加入房间</button>
      </div>
      <div class="panel" v-if="showCreate">
        <div>
          设置房间最大人数:
          <input type="number" v-model="maxUsers" max="6" min="2" />
        </div>
        <div>
          设置地图高度:
          <input type="number" v-model="row" max="50" min="10" />
        </div>
        <div>
          设置地图宽度:
          <input type="number" v-model="col" max="50" min="10" />
        </div>
        <div>
          为自己取个名字:
          <input v-model="userName" />
        </div>
        <div>
          为自己选个颜色:
          <input type="color" v-model="userBg" />
        </div>
        <div>
          <button @click="myCancel(0)">取消</button>
          <button @click="myConfirm(0)">确认</button>
        </div>
      </div>
      <div class="panel" v-if="showJoin">
        <div>
          输入房间号:
          <input type="number" v-model="roomNum" max="9999" min="1000" />
        </div>
        <div>
          为自己取个名字:
          <input v-model="userName" />
        </div>
        <div>
          为自己选个颜色:
          <input type="color" v-model="userBg" />
        </div>
        <div>
          <button @click="myCancel(1)">取消</button>
          <button @click="myConfirm(1)">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  width: 100px;
}
.panel {
  min-width: 200px;
  min-height: 100px;
  background-color: rgb(162, 226, 226);
}
@media (min-width: 1024px) {
}
</style>
