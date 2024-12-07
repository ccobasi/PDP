<template>
  <div class="pageheader d-flex justify-content-between align-items-center">
    <div class="logo">
      <img src="../assets/Group.png" alt="brand_logo" />
    </div>
    <div class="brand">Personalized Development Platform</div>
    <div class="subheader d-flex align-center gap-4">
      <v-badge content="2" color="green-darken-1">
        <v-icon icon="mdi-bell-outline" size="large" />
      </v-badge>
      <div class="avatar">
        <img src="../assets/images/ellipse.png" alt="" class="profile-image" />
        <span v-if="account">{{ formattedDisplayName }}</span>
      </div>
      <div class="logout">
        <img src="../assets/images/frame67.svg" alt="" />
        <span @click="SignOut"> Logout </span>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '../services/authService';

export default {
  name: 'NavBar',
  data() {
    return {
      account: undefined,
      userRole: null,
    };
  },
  computed: {
    formattedDisplayName() {
      if (this.account && this.account.name) {
        const nameParts = this.account.name.split(' ');
        const firstName = nameParts[0]; 
        const lastName = nameParts[nameParts.length - 1]; 
        return `${firstName} ${lastName}`; 
      }
      return ''; 
    },
  },
  async mounted() {
    try {
   
      await authService.initialize();

      const msalInstance = authService.getMsalInstance();
      const accounts = msalInstance.getAllAccounts();

      if (accounts.length) {
        this.account = accounts[0];
        this.userRole = await authService.getUserRole(this.account); // Fetch user role from authService
      }
    } catch (error) {
      console.error("Error during MSAL initialization:", error);
    }
  },
  methods: {
     async SignOut() {
      try {
        await authService.signOut();
      } catch (error) {
        console.error("Error during sign-out:", error);
        alert("Sign-out failed. Please try again.");
      }
    },
  },
};
</script>



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
  cursor: context-menu;
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

@media screen and (max-width: 576px) {
  .pageheader {
    padding: 10px;
  }

  .pageheader::after {
    top: 85px;
  }

  .logo img {
    width: 30%;
  }

  .brand {
    font-size: 16px;
  }

  .subheader {
    display: none !important;
    font-size: 10px;
    gap: 5px;
    background: bisque;
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

@media screen and (max-width: 400px) {
  .pageheader {
    padding: 10px;
  }

  .pageheader::after {
    top: 85px;
  }

  .logo img {
    width: 30%;
  }

  .brand {
    font-size: 16px;
  }

  .subheader {
    display: none !important;
    font-size: 8px;
    gap: 5px;
    background: bisque;
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

