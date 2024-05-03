import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

let env = process.env.ENV.toLowerCase();
let url;

if (env === "development") {
  url = process.env.API_DEV_URL;
} else if (env === "production") {
  url = process.env.API_PROD_URL;
}

async function getSpotifyToken(code, state) {
  let spotifyData = {};
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    data: new URLSearchParams({
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
    },
  };

  try {
    const responseToken = await axios.post(authOptions.url, authOptions.data, {
      headers: authOptions.headers,
    });

    spotifyData.tokenInfo = responseToken.data;

    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${responseToken.data.access_token}`,
        },
      })
      .then((response) => {
        spotifyData.userInfo = response.data;
        return spotifyData;
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud a Spotify API:", error);
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
