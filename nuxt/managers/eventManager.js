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
    // console.log(response.data.events);
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
    if (store.getLoggedIn()) {
      const likedEventIds = await getLikeEvents();

      Object.values(eventosAgrupados).forEach((evento) => {
        evento.like = likedEventIds.includes(evento.id);
      });

      store.setEvents(Object.values(eventosAgrupados));
    } else {
      store.setEvents(Object.values(eventosAgrupados));
    }
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
    // console.log(response.data.events);
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
    if (store.getLoggedIn()) {
      const likedEventIds = await getLikeEvents();

      Object.values(eventosAgrupados).forEach((evento) => {
        evento.like = likedEventIds.includes(evento.id);
      });

      store.setEvents(Object.values(eventosAgrupados));
    } else {
      store.setEvents(Object.values(eventosAgrupados));
    }
    // return response.data.events;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getEventsByName(data) {
  const store = useStores();
  try {
    const response = await axios.post(`${url_api}/events/search`, {
      param: data,
    });
    // console.log(response.data.events);
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
    if (store.getLoggedIn()) {
      const likedEventIds = await getLikeEvents();

      Object.values(eventosAgrupados).forEach((evento) => {
        evento.like = likedEventIds.includes(evento.id);
      });

      store.setEvents(Object.values(eventosAgrupados));
    } else {
      store.setEvents(Object.values(eventosAgrupados));
    }
    // return response.data.events;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getEventsByIds(ids) {
  try {
    // Realiza la solicitud GET a la API con la cadena de IDs
    const response = await axios.post(`${url_api}/events/byId`, {
      ids: ids,
    });
    console.log("Response by id:", response.data.events);
    return response.data.events;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getLikeEvents(id) {
  const store = useStores();
  let user = store.getUserInfo().id;

  if (id) {
    user = id;
  }

  try {
    const response = await axios.get(
      `${url_api_mongo}/likeEvents?userId=${user}`
    );

    console.log("Id:", id);
    if (id) {
      const events = await getEventsByIds(
        response.data.map((like) => like.eventId)
      );
      console.log("Events:", events);
      return events;
    } else {
      return response.data.map((like) => like.eventId);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const eventManager = {
  getLocations,
  getEventsByDistance,
  getFilteredEvents,
  getEventsByName,
  getLikeEvents,
};

export default eventManager;
