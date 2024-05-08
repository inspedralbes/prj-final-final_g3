import axios from "axios";

const url = `http://localhost:8000/api/messages`;

function getMessages() {
  return axios.get(url);
}

const manager = {
    getMessages,
};

export default manager;