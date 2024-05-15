import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.API_URL;

async function insertMessage(message) {
  try {
    const response = await axios.post(url, {
      chat_id: message.chat_id,
      nameChat: message.nameChat,
      user_id: message.user_id,
      contact_id: message.contact_id,
      content: message.content,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const manager = {
  insertMessage,
};

export default manager;
