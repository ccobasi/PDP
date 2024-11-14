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

// const account = msalInstance.getAllAccounts()[0];
// console.log(account.idTokenClaims);  // Log the claims

// const initialize = async () => {
//   await msalInstance.initialize();
// };

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

// // const getUserRole = async (account) => {
// //   try {
// //     const role = account?.idTokenClaims?.role;
    
// //     if (!role) {
// //       throw new Error("User role not found in ID token claims");
// //     }
// //     return role;
// //   } catch (error) {
// //     console.error("Error retrieving user role:", error);
// //     throw error;
// //   }
// // };
// const getUserRole = async (account) => {
//   try {
//     // Ensure the account exists
//     if (!account) {
//       throw new Error("No account found. Please log in.");
//     }

//     const role = account?.idTokenClaims?.role || account?.idTokenClaims?.roles?.[0]; // Check if role is available
//     if (!role) {
//       throw new Error("User role not found in ID token claims");
//     }

//     return role;
//   } catch (error) {
//     console.error("Error retrieving user role:", error);
//     throw error;
//   }
// };



// export default {
//   initialize,
//   getMsalInstance,
//   signIn,
//   signOut,
//   getUserRole,
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

const getUserRole = async (account) => {
  try {
    
    if (!account) {
      throw new Error("No account found. Please log in.");
    }

    
    console.log("ID Token Claims: ", account.idTokenClaims);

    const role = account.idTokenClaims?.role || account.idTokenClaims?.roles?.[0];
    
    if (!role) {
      throw new Error("User role not found in ID token claims");
    }

    return role;
  } catch (error) {
    console.error("Error retrieving user role:", error);
    throw error;
  }
};

const getCurrentAccount = () => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    return accounts[0];
  }
  return null; // Return null if no account is found
};

// Use this function to log the account and its claims
const logAccountClaims = () => {
  const account = getCurrentAccount();
  if (account) {
    console.log(account.idTokenClaims);  // Log the claims
  } else {
    console.error("No account found.");
  }
};

export default {
  initialize,
  getMsalInstance,
  signIn,
  signOut,
  getUserRole,
  getCurrentAccount,
  logAccountClaims,
};
