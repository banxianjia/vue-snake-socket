<template>
  <div style="display: flex" v-for="i in row" :key="i">
    <MyBlock v-for="j in col" :key="j" :bg="gameMap[i - 1][j - 1]"></MyBlock>
  </div>
  {{ gameMap }}
</template>
    
<script setup lang='ts'>
import { onBeforeRouteLeave } from "vue-router";
import { computed, onBeforeMount, onBeforeUpdate, onMounted } from "vue";

import { keyDown } from "./control";
import { socket, socketState } from "./socket";
import { renderBlocks } from "./renderBlock";

import MyBlock from "../../components/block.vue";

const row = 10;
const col = 10;
const gameMap = computed(() => {
  return renderBlocks(row, col, socketState.users);
});

onBeforeRouteLeave((to, from) => {
  socket.disconnect();
});
onBeforeUpdate(() => {});
onMounted(() => {});
onBeforeMount(() => {
  socket.emit("setSnake", row, col);
  // socket.emit("start");
  // socket.emit("setMap", row, col);
  keyDown();
});
</script>
    
<style>
</style>
