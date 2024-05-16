import axios from "axios";
import { useStores } from "@/stores/counter.js";

let env = import.meta.env.VITE_APP_ENV;
let url_api;
let url_api_mongo;

if (env.toLowerCase() === "development") {
  url_api = import.meta.env.VITE_APP_API_DEV_URL;
  url_api_mongo = import.meta.env.VITE_APP_MONGO_API_DEV_URL;
} else if (env.toLowerCase() === "production") {
  url_api = import.meta.env.VITE_APP_API_PROD_URL;
  url_api_mongo = import.meta.env.VITE_APP_API_PROD_MONGO_URL;
}

async function getLocations() {
  const store = useStores();
  try {
    const response = await axios.get(`${url_api}/events/locations`);
    // store.setLocations(response.data);
    console.log("Locations fetched:", response.data);
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}

const eventManager = {
  getLocations,
};

export default eventManager;
