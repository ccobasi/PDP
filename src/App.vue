<script setup>
// import { onMounted } from "vue";
// import authService from "@/services/authService";
import NavBar from "@/components/NavBar.vue";

// onMounted(async () => {
//   try {
//     console.log("Initializing MSAL...");
//     await authService.initialize(); 
//     console.log("MSAL initialized successfully");
//   } catch (error) {
//     console.error("Error during MSAL initialization:", error);
//   }
// });
</script>

<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
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