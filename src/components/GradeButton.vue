<script setup>
const {status }= defineProps(["status"])
</script>

<template>
  <span v-if="status != 'done'" style=" background-color: rgb(255, 250, 214); color: orange;" class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
    <i class="dot " style="background: orange;"></i>
    Orange
  </span>
  <span v-else-if="status === 'done'" style="background-color: rgb(216, 251, 216); color:green" class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
    <i class="dot" style="background: green"></i>
    Green
  </span>
  <span v-else-if="grade === 'amber'" style="background-color: rgb(255, 250, 214); color: orange;" class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
    <i class="dot" style="background: red;"></i>
    Amber
  </span>
  <!-- <span v-else-if="grade === 'blue'" style="background-color: aliceblue; color:blue" class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
    <i class="dot" style="background: blue;"></i>
    Blue
  </span> -->
</template>

<style scoped>
.grade-btn {
  min-width: 45px;
  max-width: 65px;
  border-radius: 40px;
}
.dot {
  display: inline-block;
  border-radius: 50%;
  padding: 5px;
}
</style>