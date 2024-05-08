import axios from "axios";

let env = import.meta.env.VITE_APP_ENV;
let url_api;
let url_api_mongo;

if (env.toLowerCase() === "development") {
  url_api = import.meta.env.VITE_APP_API_DEV_URL;
  url_api_mongo = import.meta.env.VITE_APP_API_DEV_MONGO_URL;
} else if (env.toLowerCase() === "production") {
  url = import.meta.env.VITE_APP_API_PROD_URL;
  url_api_mongo = import.meta.env.VITE_APP_API_PROD_MONGO_URL;
}

async function getSpotifyToken(code, state) {
  let spotifyData = {};
  const clientId = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET;

  const authHeader = "Basic " + btoa(`${clientId}:${clientSecret}`);

  const authOptions = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    data: new URLSearchParams({
      code: code,
      redirect_uri: import.meta.env.VITE_APP_SPOTIFY_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authHeader,
    },
  };

  try {
    const responseToken = await axios.post(authOptions.url, authOptions.data, {
      headers: authOptions.headers,
    });

    spotifyData.tokenInfo = responseToken.data;

    // Devolver una nueva promesa para esperar la solicitud GET
    return new Promise((resolve, reject) => {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${responseToken.data.access_token}`,
          },
        })
        .then((response) => {
          spotifyData.userInfo = response.data;
          resolve(spotifyData);
        })
        .catch((error) => {
          console.error("Error making request to Spotify API:", error);
          reject(error);
        });
    });
  } catch (error) {
    console.error("Error during Spotify authentication:", error);
    throw new Error("Failed to authenticate with Spotify");
  }
}

async function getGoogleToken(urlParams) {
  let googleData = {};
  const authOptions = {
    url: "https://oauth2.googleapis.com/token",
    data: new URLSearchParams({
      code: urlParams.code,
      client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
      client_secret: import.meta.env.VITE_APP_GOOGLE_CLIENT_SECRET,
      redirect_uri: import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
      scope: "openid profile email",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const responseToken = await axios.post(authOptions.url, authOptions.data, {
      headers: authOptions.headers,
    });

    googleData.tokenInfo = responseToken.data;

    // Devolver una nueva promesa para esperar la solicitud GET
    return new Promise((resolve, reject) => {
      axios
        .get("https://openidconnect.googleapis.com/v1/userinfo", {
          headers: {
            Authorization: `Bearer ${responseToken.data.access_token}`,
          },
        })
        .then((response) => {
          googleData.userInfo = response.data;
          resolve(googleData);
        })
        .catch((error) => {
          console.error("Error making request to Google API:", error);
          reject(error);
        });
    });
  } catch (error) {
    console.error("Error during Google authentication:", error);
    throw new Error("Failed to authenticate with Google");
  }
}

const authManager = {
  getSpotifyToken,
  getGoogleToken,
};

export default authManager;
