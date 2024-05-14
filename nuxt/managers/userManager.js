import axios from "axios";
import { useStores } from "@/stores/counter.js";

let env = import.meta.env.VITE_APP_ENV;
let url_api;

if (env.toLowerCase() === "development") {
  url_api = import.meta.env.VITE_APP_API_DEV_URL;
} else if (env.toLowerCase() === "production") {
  url = import.meta.env.VITE_APP_API_PROD_URL;
}

async function updateUser(user, token) {
  try {
    const response = await axios.put(
      `${url_api}/updateInfo`,
      {
        name: user.name,
        nickname: user.nickname,
        surnames: user.surnames,
        email: user.email,
        birthdate: user.birthdate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

async function logout(){
  const store = useStores();
  try{
    const response = await axios.post(`${url_api}/logout`, {
      headers: {
        Authorization: `Bearer ${store.getToken()}`
      }
    });
    console.log(response);
    store.setLogout();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getFollowers() {
  const store = useStores();
  try {
    console.log(store.getToken());
    await axios.get(`${url_api}/users/followers/${store.getId()}`, {
      headers: {
        Authorization: `Bearer ${store.getToken()}`,
      },
    });
    return response.data.count;
  } catch (error) {
    console.error("Error fetching followers:", error);
  }
} 

async function getFollowed() {
  const store = useStores();
  try {
    const response = await axios.get(`${url_api}/users/followed/${store.getId()}`, {
      headers: {
        Authorization: `Bearer ${store.getToken()}`,
      },
    });
    return response.data.count;
  } catch (error) {
    console.error("Error fetching followers:", error);
  }
} 


const userManager = {
  updateUser,
  logout,
  getFollowers,
  getFollowed,
};

export default userManager;
