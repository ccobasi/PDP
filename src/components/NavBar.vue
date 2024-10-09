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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pageheader::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  top: 95px;
  width: 100%;
  height: 5px;
  background: linear-gradient(to right, #237dbd, #46b55e);
}

.brand {
  font-size: 28px;
  font-weight: 700;
  color: var(--Primary, #227cbf);
}

.subheader {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar,
.logout {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.logo img {
  width: auto;
  height: 60px;
}

.avatar .profile-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.logo {
  font-family: Roboto, sans-serif;
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
  font-family: Roboto;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
}

@media screen and (max-width: 1024px) {
  .logo img {
    width: 80%;
    height: auto;
  }
}

@media screen and (max-width: 768px) {
  .pageheader {
    overflow-x: hidden;
  }

  .pageheader::after {
    top: 105px;
  }

  .logo img {
    width: 40%;
    height: auto;
  }

  .brand {
    font-size: 22px;
    margin: 10px 0;
  }

  .subheader {
    font-size: 14px;
    gap: 10px;
  }

  .avatar .profile-image,
  .logout img {
    width: 24px;
    height: 24px;
  }
}

@media screen and (max-width: 576px) {
  .pageheader {
    padding: 15px;
    flex-direction: column;
  }

  .logo img {
    width: 35%;
  }

  .brand {
    font-size: 18px;
  }

  .subheader {
    font-size: 12px;
    flex-direction: column;
    gap: 8px;
  }

  .avatar .profile-image,
  .logout img {
    width: 20px;
    height: 20px;
  }

  .logout span,
  .avatar span {
    font-size: 12px;
  }
}

@media screen and (max-width: 400px) {
  .pageheader {
    padding: 10px;
  }

  .logo img {
    width: 30%;
  }

  .brand {
    font-size: 16px;
  }

  .subheader {
    font-size: 10px;
    gap: 5px;
  }

  .avatar .profile-image,
  .logout img {
    width: 18px;
    height: 18px;
  }

  .logout span,
  .avatar span {
    font-size: 10px;
  }
}
</style>

