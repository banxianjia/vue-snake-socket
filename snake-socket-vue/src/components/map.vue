<template>
  <div style="display: flex" v-for="i in row" :key="i">
    <MyBlock v-for="j in col" :key="j" :bg="blockBg(i, j)"></MyBlock>
  </div>
</template>
    
<script setup lang='ts'>
import MyBlock from "./block.vue";
const props = defineProps({
  row: {
    type: Number,
    default: 20,
  },
  col: {
    type: Number,
    default: 20,
  },
  snakes: {
    type: Object,
  },
});
function blockBg(r: number, c: number): string {
  return "#A9A9A9";
}
</script>
    
<style>
</style>