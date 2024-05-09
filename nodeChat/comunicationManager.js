import axios from "axios";

const url = `http://localhost:8000/api/messages/`;

async function insertMessage(message) {
  console.log("insertMessage");
  try {
    const response = await axios.get("http://localhost:8000/api/");
    console.log(response);
    // const response = await axios.post(url, {
    //   chat_id : message.chat_id,
    //   user_id : message.id,
    //   content : message.content,
    // });
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
}

const manager = {
  insertMessage,
};

export default manager;
