<template>
  <div class="user-data">
    <p
      :style="{
        backgroundColor: user.bg as string,
        width: 10 + 'px',
        height: 10 + 'px',
      }"
    ></p>
    <div>
      <p>昵称：{{ user.name }}</p>
    </div>
    <div>
      <p>得分：{{ user.point }}</p>
    </div>
    <div>
      <p>等级：{{ user.level }}</p>
    </div>
  </div>
</template>
    
<script setup lang='ts'>
import type { snake } from "@/views/Game/type";

const props = defineProps<{
  user: snake;
}>();
</script>
    
<style scoped>
.user-data {
  width: 100px;
  height: 100px;
  margin-top: 10px;
  margin-left: 10px;
}
p {
  padding: 0;
}
</style>