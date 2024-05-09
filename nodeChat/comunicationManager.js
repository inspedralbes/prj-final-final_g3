import axios from "axios";

const url = `http://laravel/api/messages/`;

async function insertMessage(message) {
  try {
    const response = await axios.post(url, {
      chat_id : message.chat_id,
      user_id : message.id,
      content : message.content,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

const manager = {
  insertMessage,
};

export default manager;
