<template>
  <div
    :style="{
      width: 18 + 'px',
      height: 18 + 'px',
      backgroundColor: bg,
      marginTop: 1 + 'px',
      marginLeft: 1 + 'px',
    }"
  ></div>
</template>
    
<script lang='ts'>
export default {
  props: {
    bg: {
      type: String,
      default: "#A9A9A9",
    },
  },
};
</script>
    
<style>
</style>