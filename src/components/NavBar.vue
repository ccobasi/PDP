<script setup>

</script>


<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Aladin:wght@400&display=swap" />
  <div class="pageheader d-flex justify-content-between align-items-center">
    <div class="logo">
      <img src="../assets/Group.png" alt="brand_logo">
    </div>
    <div class="brand">
      Personalized Development Plan

    </div>
    <div class="subheader d-flex align-center gap-4">
      <v-badge content=2 color="green-darken-1">
        <v-icon icon="mdi-bell-outline" size="large" />
      </v-badge>
      <div class="avatar">
        <img src="../assets/images/ellipse.png" alt="" class="profile-image">
        <span> John Snow </span>
      </div>
      <div class="logout">
        <img src="../assets/images/frame67.svg" alt="">
        <span> Logout </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pageheader {
  background: #fff;
  padding: 20px 50px;
}

.pageheader .brand {
  height: 45.62px;
  width: 500px;
}

.subheader {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}

.avatar,
.logout {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.avatar .profile-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.logo {
  font-family: 'Aladin';
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 24px;

  background: linear-gradient(90deg, #227cbf 0%, #47b65c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.brand {
  color: var(--Primary, #227cbf);
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
}
</style>

