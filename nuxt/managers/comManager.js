import axios from "axios";
import { useAppStore } from "@/stores/counter.js";

let env = import.meta.env.VITE_APP_ENV;
let url;
const store = useAppStore();

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

async function getEvents() {
  try {
    const response = await axios.get(`${url}/api/events`);
    const eventos = response.data.events;
    const eventosAgrupados = {};
    eventos.forEach((evento) => {
      const key = `${evento.artist}-${evento.date}`;
      if (
        !eventosAgrupados[key] ||
        evento.event.length < eventosAgrupados[key].event.length
      ) {
        eventosAgrupados[key] = evento;
      }
    });
    store.setEvents(Object.values(eventosAgrupados));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  // try {
  // const response = await axios.get('http://localhost:8000/api/events');
  // const eventos = response.data.events;
  // const eventosAgrupados = {};
  // eventos.forEach((evento) => {
  // const key = `${evento.artist}-${evento.date}`;
  // if (!eventosAgrupados[key] || evento.event.length < eventosAgrupados[key].event.length) {
  //   eventosAgrupados[key] = evento;
  // }
  // try {
  //       const response = await axios.get(`http://localhost:8080/likeEvents?userId=${User.id}`);
  //       setEventosLike(response.data);
  // } catch (error) {
  //       console.error('Error fetching data:', error);
  // }
  // });
  // this.eventos = Object.values(eventosAgrupados);
  // console.log(this.eventos);
  // } catch (error) {
  // console.error('Error fetching data:', error);
  // }
}

const comManager = {
  getSpotifyToken,
  getGoogleToken,
  getEvents,
};

export default comManager;
