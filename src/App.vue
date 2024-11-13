<script setup>
import {  RouterView } from 'vue-router'
import NavBar from '../src/components/NavBar.vue';
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped>
.wrapper {
  padding: 20px 50px;
  background: #eee;
}
@media only screen and (max-width: 768px) {
  .wrapper {
    align-self: stretch;
  }
}

@media only screen and (max-width: 400px) {
  .wrapper {
    width: 100%;
    overflow-x: hidden;
  }
}
</style>