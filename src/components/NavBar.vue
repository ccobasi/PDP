<script>
// import authService from '../services/authService';
// export default {

import authService from '../services/authService';

export default {
  name: 'NavBar',
  data() {
    return {
      account: undefined,
    };
  },
  async mounted() {
    try {
      await authService.initialize();
      const msalInstance = authService.getMsalInstance();
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length) {
        this.account = accounts[0];
        this.$emit('login', this.account);
        this.$router.replace(this.$route.query.redirect || '/');
      }
    } catch (error) {
      console.error("Error during MSAL initialization:", error);
    }
  },
  methods: {
    async SignOut() {
      try {
        await authService.initialize();
        await authService.signOut();
        this.account = undefined;
        this.$emit('logout');
        this.$router.replace('/login');
      } catch (error) {
        console.error("Error during sign out:", error);
      }
    },
  },
};



// import { onMounted, ref } from 'vue';
// import axios from 'axios'; 

// const notifications = ref([]);

// async function fetchNotifications() {
//   try {
//     const response = await axios.get('/api/notifications'); 
//     notifications.value = response.data;
//   } catch (error) {
//     console.error('Error fetching notifications:', error);
//     // Handle errors appropriately (e.g., display an error message to the user)
//   }
// }

// onMounted(()=>{
//   fetchNotifications(); 
// })

</script>


<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Aladin:wght@400&display=swap" />
  <div class="pageheader d-flex justify-content-between align-items-center">
    <div class="logo">
      <img src="../assets/Group.png" alt="brand_logo">
    </div>
    <div class="brand">
      Personalized Development Platform

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
        <span @click="SignOut"> Logout </span>
      </div>
    </div>
  </div>
  <!-- <div class="notifications">
    <h2>Notifications</h2>
    <ul v-if="notifications.length > 0">
      <li v-for="notification in notifications" :key="notification.RecordId">
        <div class="notification-details">
          <span class="notification-type">{{ notification.NotificationType }}</span>
          <p>{{ notification.Description }}</p>
        </div>
        </li>
    </ul>
    <p v-else>No notifications yet.</p>
  </div> -->
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
  font-family: 'Inter', sans-serif;
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
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
}
@media screen and (max-width: 768px) {
  .pageheader {
    overflow-x: hidden;
  }
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
</style>

