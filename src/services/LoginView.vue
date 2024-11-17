<!-- <script>
import authService from './authService';
import logo from "@/assets/InfraCredit.svg";
import banner from "@/assets/banner.png";

const roleRedirectMap = {
  "IT Admin": "/it/",
  "Manager": "/m/",
  "Knowledge Manager": "/km/",
  "HOD": "/hod/",
  "User": "/",
};

export default {
  name: "LoginView",
  data() {
    return {
      account: null,
      userRole: "User", 
      logo,
      banner,
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    try {
      await authService.initialize(); 
      const isAuthenticated = await authService.isAuthenticated();
      
      if (isAuthenticated) {
        const account = authService.getMsalInstance().getAllAccounts()[0];
        this.account = account;

        const userRole = await this.checkUserRole(account);
        if (userRole) {
          this.handleRedirection(userRole);
        }
      }
    } catch (error) {
      console.error("Error initializing MSAL:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async SignIn() {
      this.loading = true;
      try {
        const account = await authService.signIn();
        this.account = account;

        const userRole = await this.checkUserRole(account);
        if (userRole) {
          this.handleRedirection(userRole);
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        alert("Unable to sign in. Please try again.");
      } finally {
        this.loading = false;
      }
    },
    async checkUserRole(account) {
      if (!account) {
        console.error("No account found for role check");
        return null;
      }
      try {
        const userRole = await authService.getUserRole(account);
        console.log("User Role:", userRole);
        return userRole || "User"; 
      } catch (error) {
        console.error("Error retrieving user role:", error);
        return "User";
      }
    },
    handleRedirection(userRole) {
      const redirectPath = roleRedirectMap[userRole] || "/";
      console.log(`Redirecting user to: ${redirectPath}`);
      this.$router.replace(redirectPath);
    },
  },
};
</script> -->
<!-- <script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import authService from "@/services/authService";
import logo from "@/assets/InfraCredit.svg";
import banner from "@/assets/banner.png";

const account = ref(undefined);
const userRole = ref(undefined); 
const loading = ref(false);
const router = useRouter();

const roleRedirectMap = {
  "IT Admin": "/it/",
  "Manager": "/m/",
  "Knowledge Manager": "/km/",
  "HOD": "/hod/",
  "User": "/",
};

const SignIn = async () => {
  loading.value = true;
  try {
    console.log("Starting login popup...");
    const msalAccount = await authService.signIn();
    if (msalAccount) {
      account.value = msalAccount;
      await authService.getUserRole(msalAccount);  
      userRole.value = authService.userRole; 
      handleRedirection(userRole.value);
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
  } finally {
    loading.value = false;
  }
};

const handleRedirection = (role) => {
  const redirectPath = roleRedirectMap[role] || "/";
  console.log(`Redirecting user to: ${redirectPath}`);
  router.replace(redirectPath);
};

onMounted(() => {
  console.log("Component mounted!");
});
</script> -->
<!-- src/components/LoginView.vue -->

<script>
import authService from './authService';
import logo from "@/assets/InfraCredit.svg";
import banner from "@/assets/banner.png";

const roleRedirectMap = {
  "IT Admin": "/it/",
  "Manager": "/m/",
  "Knowledge Manager": "/km/",
  "HOD": "/hod/",
  "User": "/",
};

export default {
  name: 'LoginView',
  data() {
    return {
      account: undefined,
      logo,
      banner,
      loading: false,
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
        await this.handleRedirect(); 
      }
    } catch (error) {
      console.error("Error during MSAL initialization:", error);
    }
  },
  methods: {
    async SignIn() {
      if (this.loading) return; 
      this.loading = true; 
      try {
        await authService.initialize();
        const account = await authService.signIn();
        this.account = account;
        this.$emit('login', this.account);
        await this.handleRedirect(); 
      } catch (error) {
        console.error("Error during sign in:", error);
      } finally {
        this.loading = false; 
      }
    },
    async SignOut() {
      this.loading = true; 
      try {
        await authService.initialize();
        await authService.signOut();
        this.account = undefined;
        this.$emit('logout');
        this.$router.replace('/login');
      } catch (error) {
        console.error("Error during sign out:", error);
      } finally {
        this.loading = false; 
      }
    },
    async handleRedirect() {
      try {
        const userRole = await authService.getUserRole(this.account); 
        const redirectPath = roleRedirectMap[userRole] || '/login'; 
        
        this.$router.replace(redirectPath);
      } catch (error) {
        console.error("Error during role-based redirection:", error);
        this.$router.replace('/login');  
      }
    }
  },
};
</script>


<template>
  <div class="split left">
    <div class="centered">
      <div class="row" style="margin: 20px;">
        <div class="col m-auto">
          <img :src="logo" alt="InfraCredit Logo" width="150" height="50" />
        </div>
      </div>

      <div class="loginElements">
        <h1>Login</h1>
        <button class="loginBtn" @click="SignIn" :disabled="loading">Sign In</button>
        <!-- <button class="loginBtn" @click="SignIn" :disabled="loading">
          <span v-if="loading">Loading...</span>
          <span v-else>Login</span>
        </button> -->
      </div>
    </div>
  </div>

  <div class="split right">
    <div class="centered">
      <img :src="banner" alt="Banner Image" />
    </div>
  </div>
</template>


<style scoped>
.split {
  height: 100%;
  width: 50%;
  position: fixed;

  top: 0;
  overflow-x: hidden;
}

.split:first-child {
  padding: 30px;
}

.pageheadertext {
  width: 200px;
  cursor: context-menu;
}

.left {
  left: 0;
  z-index: 1;
  background-color: white;
}

.right {
  z-index: 3;
  right: 0;
  background-color: white;
  background-image: url("../assets/banner.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.loginElements {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  align-self: stretch;
  margin-top: 30%;
}

.loginElements h1 {
  width: 143.41px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 58px;
  text-align: center;
  color: #000000;
}

.loginElements h4 {
  width: 640px;
  height: 24px;
  left: 0px;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #227cbf;
}

.loginBtn {
  display: flex;
  height: 50px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  background: var(--Gradient, linear-gradient(90deg, #227cbf 0%, #47b65c 100%));
  margin-left: 30px;
  margin-right: 30px;

  color: #fff;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}

.loginBtn:hover {
  background: linear-gradient(90deg, #47b65c 0%, #227cbf 100%);
  transition: 0.7s;
}
.col {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: 640px;
  height: 50px;
}
.col img {
  margin-left: 40%;
}

@media (max-width: 1190px) {
  .Mainheader {
    width: 100%;
    background: #ffffff;
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    grid-gap: 0vw;
    margin: 0px;
  }

  .Mainheader img {
    margin: -5px 20px 0px 1vw;
  }
}
</style>
