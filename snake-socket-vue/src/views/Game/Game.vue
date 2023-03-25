<template>
  <div style="display: flex" v-for="i in 20" :key="i">
    <MyBlock v-for="j in 20" :key="j" :bg="allBlockBgs[i - 1][j - 1]"></MyBlock>
  </div>
</template>
    
<script setup lang='ts'>
import { onBeforeMount } from "vue";

import food from "./food";
import snake from "./snake";
import { getAllBlockBg } from "./renderBlock";

import MyBlock from "../../components/block.vue";

let allBlockBgs: Array<Array<string>> = [];
onBeforeMount(() => {
  // 创建蛇
  let user1 = new snake(20, 20);
  let user2 = new snake(20, 20);
  let users: Array<snake> = [];
  users.push(user1);
  users.push(user2);
  // 创建食物
  let foods = new food(20, 20, users);
  allBlockBgs = getAllBlockBg(20, 20, users, foods);
});
</script>
    
<style>
</style>
