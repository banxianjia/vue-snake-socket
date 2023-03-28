<template>
  <div style="display: flex" v-for="i in 20" :key="i">
    <MyBlock v-for="j in 20" :key="j" :bg="allBlockBgs[i - 1][j - 1]"></MyBlock>
  </div>
</template>
    
<script setup lang='ts'>
import { io } from "socket.io-client";
import { onBeforeRouteLeave } from "vue-router";
import { onBeforeMount, onMounted, ref, type Ref } from "vue";

import food from "./food";
import snake from "./snake";
import { getInitBlockBg, renderSnake, renderFood } from "./renderBlock";

import MyBlock from "../../components/block.vue";
import { socket } from "@/socket";
const allBlockBgs: Ref<Array<Array<string>>> = ref(getInitBlockBg(20, 20));
onBeforeRouteLeave((to, from) => {
  socket.disconnect();
});
onMounted(() => {});
onBeforeMount(() => {
  // 创建蛇
  let user = new snake(20, 20);
  // socket.emit("sendInfo", user);
  let users: Array<snake> = [];
  users.push(user);
  // socket.on("getUsers", () => {});
  // 创建食物
  let foods = new food(20, 20, users);
  renderSnake(users, allBlockBgs.value);
  renderFood(foods, allBlockBgs.value);
  keyDown(user, foods, allBlockBgs.value, users);
});
// 监听键盘
function keyDown(
  user: snake,
  foods: food,
  blockBgs: Array<Array<string>>,
  users: Array<snake>
) {
  if (!user.over) {
    document.onkeydown = (e) => {
      // 事件对象兼容
      let e1 =
        e || event || window.event || arguments.callee.caller.arguments[0];
      // console.log(e1);
      if (e1 && e1.keyCode == 37 && user.fx != 0) {
        // ←键
        user.moveLeft(foods, blockBgs, users);
      } else if (e1 && e1.keyCode == 39 && user.fx != 1) {
        // →键
        user.moveRight(foods, blockBgs, users);
      } else if (e1 && e1.keyCode == 38 && user.fx != 2) {
        // ↑键
        user.moveTop(foods, blockBgs, users);
      } else if (e1 && e1.keyCode == 40 && user.fx != 3) {
        // ↓键
        user.moveBottom(foods, blockBgs, users);
      }
    };
  }
}
</script>
    
<style>
</style>
