import axios from 'axios';


const getUserRoleFromAuth = async (account) => {
  const email =
    account?.idTokenClaims?.preferred_username ||
    account?.idTokenClaims?.upn ||
    account?.idTokenClaims?.email; 

  if (!email) {
    console.error("Email is undefined");
    return null;
  }

  try {
    const response = await axios.get(`https://infracredit2.pythonanywhere.com/api/v1/users?email=${email}`);

    if (response.data.status) {
      const user = response.data.data.find((user) => user.email === email); 
      if (user) {
        return user.role.option; 
      } else {
        throw new Error("User not found");
      }
    } else {
      throw new Error("Error fetching user data");
    }
  } catch (error) {
    console.error("Error in getUserRoleFromAuth:", error.response || error.message);
    return null;
  }
};


export default getUserRoleFromAuth;
