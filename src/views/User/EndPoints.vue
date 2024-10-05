<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const posts = ref({});

onMounted(async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    posts.value = response.data; 
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }


});


</script>
<template>
  <div class="" v-for="post in posts" :key="post.id">
    <h2>{{post.id}} {{ post.title}}</h2>
    <p>{{post.body}} </p>
  </div>
</template>

