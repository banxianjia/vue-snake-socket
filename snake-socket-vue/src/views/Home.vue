<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from "vue-router";
const router = useRouter();
function joinRoomBtn() {}
function createRoomBtn() {}
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
  <div class="panel">创建房间面板</div>
  <div class="panel">加入房间面板</div>
  <RouterLink to="/room">前往游戏</RouterLink>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}
button {
  width: 100px;
}
@media (min-width: 1024px) {
}
</style>
