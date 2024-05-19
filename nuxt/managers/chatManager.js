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
    const response = await axios.post(`${url_api_mongo}/chat`, {
      user_id: user_id,
      contact_id: contact_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getFirst10Messages(chat_id) {
  try {
    const response = await axios.get(`${url_api_mongo}/messages`, {
      params: {
        chat_id: chat_id
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getMessages(chat_id, message_id) {

  try{
    const response = await axios.get(`${url_api_mongo}/get10messages`, {
      params: {
        chat_id: chat_id,
        message_id: message_id
      }
    });
    return response.data;
  }catch(error){
    console.log(error);
  }
}


const comChat = {
  checkChat,
  getAllMessages,
  getFirst10Messages,
  getMessages
};

export default comChat;
