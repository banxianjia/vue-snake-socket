<template>
  <div style="display: flex" v-for="i in socketState.row" :key="i">
    <MyBlock
      v-for="j in socketState.col"
      :key="j"
      :bg="gameMap[i - 1][j - 1]"
    ></MyBlock>
  </div>
  <div style="display: flex">
    <MyScoreBoard
      v-for="(user, index) in socketState.users"
      :key="index"
      :user="user"
    ></MyScoreBoard>
  </div>
</template>
    
<script setup lang='ts'>
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { computed, onBeforeMount, onBeforeUpdate, onMounted } from "vue";

import { keyDown } from "./control";
import { socket, socketState } from "./socket";
import { renderBlocks } from "./renderBlock";

import MyBlock from "../../components/block.vue";
import MyScoreBoard from "../../components/scoreboard.vue";

const route = useRoute();

console.log("组合式 API 中的 setup() 钩子会在所有选项式 API 钩子之前调用");

const gameMap = computed(() => {
  return renderBlocks(socketState.users, socketState.foods);
});
onBeforeRouteLeave((to, from) => {
  socket.disconnect();
});
onBeforeUpdate(() => {});
onMounted(() => {
  console.log("挂载");
});
onBeforeMount(async () => {
  console.log("挂载之前");
  console.log(route.query);

  keyDown();
});
</script>
    
<style>
</style>
