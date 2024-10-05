import store from './authStore'
import authService from '../services/authService';
export default {

    async getAccessToken() {
        await authService.msalInstance.initialize();


        let request = {
          account: authService.msalInstance.getAllAccounts()[0],
          scope: ['User.write'],
        };
  
        try {
            if(msalInstance.getAllAccounts()[0]){
          const tokenResponse = await authService.msalInstance.acquireTokenSilent(request);
          store.commit('setAccessToken', tokenResponse.accessToken);
          return tokenResponse.accessToken
        }
        } catch (error) {
          console.error('Silent token acquisition failed. Using interactive mode');
          let tokenResponse = await authService.msalInstance.acquireTokenPopup(request);
          store.commit('setAccessToken', tokenResponse.accessToken);
        }
        
      },
}