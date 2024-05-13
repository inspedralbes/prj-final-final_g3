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
  url_api_mongo = import.meta.env.VITE_APP_MONGO_API_PROD_URL;
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
  }
}

async function getLikeEvents() {
  const store = useStores();
  const User = store.getUserInfo();
  try {
    const response = await axios.get(
      `${url_api_mongo}/likeEvents?userId=${User.id}`
    );
    // console.log(response.data);
    return response.data.map((like) => like.eventId);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function likeAnEvent(eventID) {
  const store = useStores();
  const User = store.getUserInfo();
  console.log(`${url_api_mongo}/likeEvent`);
  try {
    const response = await axios.post(`${url_api_mongo}/likeEvent`, {
      userId: User.id,
      eventId: eventID,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function unlikeAnEvent(eventID) {
  const store = useStores();
  const User = store.getUserInfo();
  try {
    const response = await axios.delete(
      `${url_api_mongo}/likeEvent?eventId=${eventID}&userId=${User.id}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function post(content){
  const store = useStores();
  const userID = store.getId()
  try{
    await axios.post(`${url_api_mongo}/posts`, {
      content: content,
      userId: userID
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function deletePost(postID){
  try{
    await axios.delete(`${url_api_mongo}/posts?postId=${postID}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getPosts() {
    const store = useStores();
    const userID = store.getId()

    try{
      const response = await axios.get(`${url_api_mongo}/posts?userId=${userID}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getLikePosts() {
    const store = useStores();
    const userID = store.getId()
    try {
      const response = await axios.get(
        `${url_api_mongo}/likePosts?userId=${userID}`
      );
      return response.data.map((like) => like.postId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

async function likePost(postID){
  const store = useStores();
  const userID = store.getId()
  try{
    await axios.post(`${url_api_mongo}/likePost`, {
      postId: postID,
      userId: userID
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function unlikePost(postID){
  const store = useStores();
  const userID = store.getId()
  try{
    await axios.delete(`${url_api_mongo}/likePost?postId=${postID}&userId=${userID}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const comManager = {
  getEvents,
  likeAnEvent,
  unlikeAnEvent,
  post,
  deletePost,
  getPosts,
  getLikePosts,
  likePost,
  unlikePost,
};

export default comManager;
