import axios from "axios";
import { useStores } from "@/stores/counter.js";

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

async function getEvents() {
  const store = useStores();
  try {
    const response = await axios.get(`${url_api}/events`);
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
  getEvents,
};

export default comManager;
