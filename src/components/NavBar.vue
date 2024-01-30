<script setup>

</script>


<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Aladin:wght@400&display=swap" />
  <div class="pageheader d-flex justify-content-between align-items-center">
    <div class="logo">
      <img src="../assets/Group.png" alt="brand_logo">
    </div>
    <div class="brand">
      People Development Platform

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

.pageheader::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  top: 82px;
  width: 100%;
  height: 5px; /* Adjust height to control the thickness of the gradient border */
  background: linear-gradient(to right, #237dbd, #46b55e); /* Adjust colors as needed */
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
@media screen and (max-width: 768px) {
  .navbar-nav {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .navbar-nav .nav-item {
    margin-top: 10px;
    margin-right: 0;
  }

  .logo img {
    width: 50%;
    height: 20%;
  }
  .brand {
    font-size: 18px;
  }
}

/*label {
  
}

.navbar {
  
}

.navbar-nav .nav-item:first-child .nav-link {
  
}

.nav-item {
  
}

.nav-link {
  
}

.link {
  
}

.active::after {
  
}*/
</style>

