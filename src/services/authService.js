// import { PublicClientApplication } from '@azure/msal-browser';
// import store from '../store/store'
// import Emitter from 'tiny-emitter';
// import router from '../router';
// import administrationsService from '../services/administrationsService'


// export default {
    
//     async mounted() {
//     if (store.state.msalConfig) {
//       this.msalInstance = new PublicClientApplication(store.state.msalConfig);
//     } else {
//       console.warn('msalConfig not available in store yet.');
//     }
//   },
//     emitter: new Emitter(),
//     account: [],

//     async SignIn() {
//         try {
//             await this.msalInstance.loginPopup({});
//             const accounts = this.msalInstance.getAllAccounts();
//             if (accounts.length) {
//             this.account = accounts[0];

//             const userRole = await administrationsService.getLoggedInUser(this.account.username).roleName;
//             const userLevel = await administrationsService.getLoggedInUser(this.account.username).levelDescription;
//             const userEmail = this.account.username;

//             store.signedInUserRole = userRole;
//             store.signedInUserLevel = userLevel;
//             store.signedInUserEmail = userEmail;

//             let userFullName;
//             if (this.account.name.split(" ")[2]) {
//                 userFullName = this.account.name.split(" ")[0] + " " + this.account.name.split(" ")[2];
//             } else {
//                 userFullName = this.account.name.split(" ")[0] + " " + this.account.name.split(" ")[1];
//             }
//             store.signedInUserName = userFullName;

//             this.emitter.emit('login', this.account);
//             router.replace('/'); 
//             }
//         } catch (error) {
//             console.error(`error during authentication: ${error}`);
//         }
// },

//     async SignOut() {
//         await this.msalInstance
//             .logoutPopup({})
//             .then(() => {
//                 this.emitter.emit('logout', 'logging out');
//                 store.signedInUserEmail = ''
//                 store.signedInUserRole = ''
//                 store.signedInUserLevel = ''
//                 this.account = undefined
//                 router.push('/login')
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     },
// }

// import * as msal from "@azure/msal-browser";

// const msalConfig = {
//   auth: {
//     clientId: 'd0687d64-7333-4d8a-b138-1b067fb8c541',
//     authority: "https://login.microsoftonline.com/2373a921-a6fe-4ee1-a785-838b208582ee",
//     redirectUri: window.location.origin,
//   },
//   cache: {
//     cacheLocation: 'localStorage',
//   },
// };

// const msalInstance = new msal.PublicClientApplication(msalConfig);

// const getMsalInstance = () => {
//   return msalInstance;
// };

// const signIn = async () => {
//   const loginRequest = {
//     scopes: ["user.read"],
//   };
//   try {
//     const loginResponse = await msalInstance.loginPopup(loginRequest);
//     return loginResponse.account;
//   } catch (error) {
//     console.error("Error during sign in:", error);
//     throw error;
//   }
// };

// const signOut = async () => {
//   const logoutRequest = {
//     account: msalInstance.getAllAccounts()[0],
//   };
//   try {
//     await msalInstance.logoutPopup(logoutRequest);
//   } catch (error) {
//     console.error("Error during sign out:", error);
//     throw error;
//   }
// };

// export default {
//   getMsalInstance,
//   signIn,
//   signOut,
// };
import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: 'd0687d64-7333-4d8a-b138-1b067fb8c541',
    authority: "https://login.microsoftonline.com/2373a921-a6fe-4ee1-a785-838b208582ee",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

const initialize = async () => {
  await msalInstance.initialize();
};

const getMsalInstance = () => {
  return msalInstance;
};

const signIn = async () => {
  const loginRequest = {
    scopes: ["user.read"],
  };
  try {
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    return loginResponse.account;
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
};

const signOut = async () => {
  const logoutRequest = {
    account: msalInstance.getAllAccounts()[0],
  };
  try {
    await msalInstance.logoutPopup(logoutRequest);
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
};

export default {
  initialize,
  getMsalInstance,
  signIn,
  signOut,
};
