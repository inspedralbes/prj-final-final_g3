import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.API_URL;

async function insertMessage(message) {
  try {
    const response = await axios.post(url, {
      chat_id : message.chat_id,
      user_id : message.id,
      content : message.content,
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
