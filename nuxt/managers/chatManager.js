import axios from "axios";

let env = import.meta.env.VITE_APP_ENV;
let url_api;
let url_api_mongo;

if (env.toLowerCase() === "development") {
  url_api = import.meta.env.VITE_APP_API_DEV_URL;
  url_api_mongo = import.meta.env.VITE_APP_MONGO_API_DEV_URL;
} else if (env.toLowerCase() === "production") {
  url = import.meta.env.VITE_APP_API_PROD_URL;
  url_api_mongo = import.meta.env.VITE_APP_API_PROD_MONGO_URL;
}

async function getAllMessages(idChat) {
  try {
    const response = await axios.get(`${url_api}/messages/${idChat}`, {
      chat_id: idChat,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function checkChat(user_id, contact_id) {
  try {
    const response = await axios.post(`${url_api}/chats/search`, {
      user_id: user_id,
      contact_id: contact_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const comChat = {
  checkChat,
  getAllMessages,
};

export default comChat;
