import axios from "axios";

let env = import.meta.env.VITE_APP_ENV;
let url;

if (env.toLowerCase() === "development") {
  url = import.meta.env.VITE_APP_API_DEV_URL;
} else if (env.toLowerCase() === "production") {
  url = import.meta.env.VITE_APP_API_PROD_URL;
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

const comManager = {
  getSpotifyToken,
};

export default comManager;
