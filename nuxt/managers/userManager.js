import axios from "axios";

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

const userManager = {
  updateUser,
};

export default userManager;
