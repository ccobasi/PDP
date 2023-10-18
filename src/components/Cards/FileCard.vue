<script setup>

</script>

<template>
  <form action="">
    <div class="d-flex justify-content-end mb-2 ">

      <v-btn class="text-none" color="blue" prepend-icon="mdi-export-variant" variant="text">
        Upload
      </v-btn>
    </div>
    <div v-for="item in 3" class="d-flex p-2 border border-2 rounded justify-content-between align-items-center mb-2">
      <div>
        <p class="mb-0">Document</p>
        <p class="mb-0"><small class="text-muted"> 5mb</small></p>
      </div>
      <v-btn class="text-none" color="blue" prepend-icon="mdi-eye-outline" variant="text">
        View
      </v-btn>
    </div>

    <div class="d-flex justify-content-end mr-2 mt-3">
      <button type="submit" class="submit-button">Update</button>
    </div>
  </form>
</template>

<style scoped>
input,
select {
  padding: 10px 20px 10px 10px;
  align-items: center;

  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
}
</style>
