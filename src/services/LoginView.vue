<script>
import authService from './authService';

// const roleRedirectMap = {
//   '1': '/',       // Admin
//   '8': '/',       // User
//   '9': '/km/',    // Knowledge Management
//   '2': '/m/',     // Manager
//   '4': '/it/',    // Information Technology
//   '3': '/hod/'    // Head of Department
// };

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
    };
  },
  async mounted() {
  try {
    await authService.initialize();
    const account = authService.getCurrentAccount(); // Safely get the current account

    if (account) {
      this.account = account;
      console.log(account.idTokenClaims); // Log account claims

      const userRole = await authService.getUserRole(account); // Get user role
      console.log('User Role:', userRole);
    } else {
      console.error("No account found. Please log in.");
      this.$router.push('/login'); // Redirect to login if no account is found
    }
  } catch (error) {
    console.error("Error during MSAL initialization:", error);
  }
},
  // async mounted() {
  //   try {
  //     await authService.initialize();
  //     const msalInstance = authService.getMsalInstance();
  //     const accounts = msalInstance.getAllAccounts();
  //     if (accounts.length) {
  //       this.account = accounts[0];
  //       this.$emit('login', this.account);
  //       await this.handleRedirect(); 
  //     }
  //   } catch (error) {
  //     console.error("Error during MSAL initialization:", error);
  //   }
  // },
  methods: {
    async SignIn() {
      try {
        await authService.initialize();
        const account = await authService.signIn();
        this.account = account;
        this.$emit('login', this.account);
        await this.handleRedirect(); 
      } catch (error) {
        console.error("Error during sign in:", error);
      }
    },
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
    // async handleRedirect() {
    //   try {
    //     const userRole = await authService.getUserRole(this.account);
    //     const redirectPath = roleRedirectMap[userRole] || '/';
        
    //     this.$router.replace(redirectPath);
    //   } catch (error) {
    //     console.error("Error during role-based redirection:", error);
    //     this.$router.replace('/login');  
    //   }
    // }
    async handleRedirect() {
  try {
    if (!this.account) {
      throw new Error("Account is not available");
    }

    const userRole = await authService.getUserRole(this.account);

    if (!userRole) {
      console.error("No role assigned to the user");
      this.$router.replace('/login');  
    } else {
      const redirectPath = roleRedirectMap[userRole] || '/';
      this.$router.replace(redirectPath);
    }
  } catch (error) {
    console.error("Error during role-based redirection:", error);
    this.$router.replace('/login');  // Redirect to login if error occurs
  }
}

  },
};
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Aladin">

  <div class="split left">
    <div class="centered">
      <div class="row" style="margin: 20px;">
        <div class="col m-auto">
          <img src="../assets/InfraCredit.svg" alt="" width="150" height="50">
        </div>
      </div>

      <div class="loginElements">
        <h1>Login</h1>
        <button class="loginBtn" @click="SignIn">Login</button>
      </div>
    </div>
  </div>

  <div class="split right">
    <div class="centered">
      <img src="../assets/banner.png" alt="">
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
