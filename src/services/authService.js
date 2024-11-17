// import * as msal from "@azure/msal-browser";
// import axios from "axios";

// class AuthService {
//   constructor() {
//     this.msalInstance = null;
//     this.isInitialized = false;
//   }

//   async initialize() {
//     if (this.isInitialized) return;

//     try {
//       this.msalInstance = new msal.PublicClientApplication({
//         auth: {
//           clientId: 'd0687d64-7333-4d8a-b138-1b067fb8c541',
//           authority: "https://login.microsoftonline.com/2373a921-a6fe-4ee1-a785-838b208582ee",
//           redirectUri: window.location.origin,
//         },
//         cache: {
//           cacheLocation: "localStorage",
//         },
//       });
//       this.isInitialized = true;
//       console.log("MSAL Initialized successfully.");
//     } catch (error) {
//       console.error("Error during MSAL initialization:", error);
//       throw error;
//     }
//   }

//   async isAuthenticated() {
//     try {
//       if (!this.isInitialized) throw new Error("MSAL instance not initialized.");
//       const accounts = this.msalInstance.getAllAccounts();
//       return accounts && accounts.length > 0;
//     } catch (error) {
//       console.error("Error checking authentication status:", error);
//       return false;
//     }
//   }

//   async signIn() {
//     try {
    
//       await this.initialize();

//       const loginResponse = await this.msalInstance.loginPopup({
//         scopes: ["user.read"], 
//       });
//       console.log("Login successful:", loginResponse);
//       return loginResponse.account;
//     } catch (error) {
//       console.error('Error during sign-in:', error);
//       throw error;
//     }
//   }

//   getMsalInstance() {
//     if (!this.msalInstance) {
//       throw new Error('MSAL instance is not initialized.');
//     }
//     return this.msalInstance;
//   }

//   async getUserRole(account) {
//     if (!account) {
//       throw new Error("No account found. Please log in.");
//     }

//     try {
//       const userEmail = account.username;
//       if (!userEmail) {
//         throw new Error("No email found in account details.");
//       }

//       const response = await axios.get("https://infracredit2.pythonanywhere.com/api/v1/users/", {
//         params: { userEmail },
//       });

//       if (!response.data?.data?.role) {
//         throw new Error("User role not found in the API response.");
//       }

//       return response.data.data.role;
//     } catch (error) {
//       console.error("Error retrieving user role:", error.message || error);
//       throw new Error("Unable to retrieve user role. Please try again.");
//     }
//   }

//   async signOut() {
//     try {
//       await this.msalInstance.logout();
//       console.log("Logged out successfully.");
//     } catch (error) {
//       console.error('Error during sign-out:', error);
//     }
//   }
// }

// export default new AuthService();
// export const getUserRole = AuthService.prototype.getUserRole;
// export const isAuthenticated = AuthService.prototype.isAuthenticated;

// import axios from 'axios';
// import { PublicClientApplication } from "@azure/msal-browser";

// class AuthService {
//   constructor() {
//     this.msalInstance = null;
//     this.isInitialized = false;
//     this.isInitializing = false; // Track the initialization in progress
//     this.userRole = 'User';
//     this.userEmail = '';
//   }

//   // Initialize MSAL instance
//   async initialize() {
//     if (this.isInitialized) {
//       console.log("MSAL already initialized.");
//       return; // Skip initialization if already initialized
//     }

//     if (this.isInitializing) {
//       console.log("MSAL initialization already in progress.");
//       // Wait for the current initialization process to finish
//       await this.waitForInitialization();
//       return; // Skip further initialization
//     }

//     this.isInitializing = true; // Mark initialization as in progress
//     try {
//       console.log("Initializing MSAL...");
//       this.msalInstance = new PublicClientApplication({
//         auth: {
//           clientId: 'd0687d64-7333-4d8a-b138-1b067fb8c541',
//           authority: "https://login.microsoftonline.com/2373a921-a6fe-4ee1-a785-838b208582ee",
//           redirectUri: "http://localhost:5174",
//         },
//         cache: {
//           cacheLocation: "localStorage",
//         },
//       });
//       this.isInitialized = true;
//       console.log("MSAL Initialized successfully.");
//     } catch (error) {
//       console.error("Error during MSAL initialization:", error);
//       throw error;
//     } finally {
//       this.isInitializing = false; // Mark initialization as complete
//     }
//   }

//   // Wait for initialization to complete
//   async waitForInitialization() {
//     return new Promise(resolve => {
//       const interval = setInterval(() => {
//         if (this.isInitialized) {
//           clearInterval(interval);
//           resolve();
//         }
//       }, 50); // Check every 50ms for initialization completion
//     });
//   }

//   // Sign in the user
//   async signIn() {
//     try {
//       // Ensure MSAL is initialized before signing in
//       console.log("Checking if MSAL is initialized...");
//       await this.initialize(); // Ensure initialization is complete before sign-in

//       console.log("Starting login popup...");
//       const loginResponse = await this.msalInstance.loginPopup({
//         scopes: ["user.read"],
//       });

//       console.log("Login successful:", loginResponse);

//       if (loginResponse && loginResponse.account) {
//         this.userEmail = loginResponse.account.username;  
//         console.log("Account received:", loginResponse.account);
//         return loginResponse.account;
//       } else {
//         console.error("No account returned in login response.");
//         throw new Error("Login failed. No account returned.");
//       }
//     } catch (error) {
//       console.error("Error during sign-in:", error);
//       throw error;
//     }
//   }

//   // Fetch user role based on email
//   async getUserRole(account) {
//     try {
//       if (!account || !account.username) {
//         throw new Error("Account or email not available.");
//       }

//       const email = account.username;
//       const response = await axios.get(`https://infracredit2.pythonanywhere.com/api/v1/users/?email=${email}`);

//       if (response.data && response.data.data && response.data.data.length > 0) {
//         const userData = response.data.data[0];
//         this.userRole = userData.role?.option || 'User'; 
//         console.log('User Role:', this.userRole);
//       } else {
//         console.error('User role not found in the response');
//         this.userRole = 'User';  
//       }
//     } catch (error) {
//       console.error('Error retrieving user role:', error);
//       this.userRole = 'User';  
//     }
//   }

//   // Get the MSAL instance (useful for other MSAL operations)
//   getMsalInstance() {
//     if (!this.msalInstance) {
//       throw new Error('MSAL instance is not initialized.');
//     }
//     return this.msalInstance;
//   }

//   // Check if the user is authenticated
//   async isAuthenticated() {
//     try {
//       if (!this.isInitialized) throw new Error("MSAL instance not initialized.");
//       const accounts = this.msalInstance.getAllAccounts();
//       return accounts && accounts.length > 0;
//     } catch (error) {
//       console.error("Error checking authentication status:", error);
//       return false;
//     }
//   }

//   // Sign out the user
//   async signOut() {
//     if (!this.isInitialized) {
//       console.error("MSAL is not initialized. Initializing now...");
//       await this.initialize();
//     }

//     try {
//       await this.msalInstance.logoutRedirect();
//       console.log("Sign-out successful");
//     } catch (error) {
//       console.error("Error during sign-out:", error);
//     }
//   }
// }

// export default new AuthService();
// export const getUserRole = AuthService.prototype.getUserRole;
// export const isAuthenticated = AuthService.prototype.isAuthenticated;

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
  const account = msalInstance.getAllAccounts()[0]; 
  const logoutRequest = {
    account: account,
    postLogoutRedirectUri: window.location.origin + '/login', 
  };
  
  try {
    await msalInstance.logoutRedirect(logoutRequest); 
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
};

const getUserRole = async (account) => {
   if (!account || !account.name) {
    throw new Error('Account is not defined or does not have a name');
  }
  try {
    const response = await fetch(`https://infracredit2.pythonanywhere.com/api/v1/users/?email=${account.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${account.idToken}` 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user role');
    }

    const data = await response.json();

    if (data.status && data.data.length > 0) {
      return data.data[0].role.option; 
    } else {
      throw new Error('User  role not found');
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};


export default {
  initialize,
  getMsalInstance,
  signIn,
  signOut,
  getUserRole,
};
