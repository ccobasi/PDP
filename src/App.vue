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
  background: #fafafb;
}
</style>