<template>
  <MyMap></MyMap>
</template>
    
<script setup lang='ts'>
import MyMap from "../components/map.vue";
// 蛇背景色池
const snakesBgs = ["#FFB6C1", "#DC143C", "#EE82EE", "#800080"];
// 坐标接口
interface CRD {
  x: number;
  y: number;
}
// 随机初始化蛇位置
function randomInitSnakeSite(row: number, col: number): Array<CRD> {
  const xi = Math.floor(Math.random() * (row - 2));
  const yi = Math.floor(Math.random() * (col - 2));
  const type = [
    [
      { x: xi, y: yi },
      { x: xi, y: yi + 1 },
      { x: xi, y: yi + 2 },
    ], // 横排
    [
      { x: xi, y: yi },
      { x: xi + 1, y: yi },
      { x: xi + 2, y: yi },
    ], // 竖排
  ];
  const siteIndex = Math.floor(Math.random() * 2);
  return type[siteIndex];
}
class snake {
  site: Array<CRD>;
  bg: String;
  constructor(row: number, col: number, snakesSites?: Array<CRD>) {
    // 初始化蛇颜色
    const bgIndex = Math.floor(Math.random() * snakesBgs.length);
    this.bg = snakesBgs[bgIndex];
    // 初始化蛇位置
    this.site = randomInitSnakeSite(row, col);
  }
}
</script>
    
<style>
</style>
