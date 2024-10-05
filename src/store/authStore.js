import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    msalConfig: {
      auth: {
        clientId: 'd0687d64-7333-4d8a-b138-1b067fb8c541',
        authority: "https://login.microsoftonline.com/2373a921-a6fe-4ee1-a785-838b208582ee",
      },
      cache: {
        cacheLocation: 'localStorage',
      },
    },
    accessToken: '',
    signedInUseremail: '',
    signedInUserRole: undefined,
  }),
  actions: {
    setAccessToken(token) {
      this.accessToken = token;
    },
  },
});
