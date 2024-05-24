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
    store.setLocations(response.data);
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}

async function getEventsByDistance(lat, lon, distance) {
  const store = useStores();
  try {
    const response = await axios.post(`${url_api}/events/byDistance`, {
      latitude: lat,
      longitude: lon,
      distance: distance,
    });
    console.log(response.data.events);
    store.setEvents(response.data.events);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getFilteredEvents(data) {
  const store = useStores();
  try {
    const response = await axios.post(`${url_api}/events/byLocation`, {
      countries: data.countries,
      cities: data.cities,
      venues: data.venues,
    });
    console.log(response.data.events);
    store.setEvents(response.data.events);
    // return response.data.events;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const eventManager = {
  getLocations,
  getEventsByDistance,
  getFilteredEvents,
};

export default eventManager;
