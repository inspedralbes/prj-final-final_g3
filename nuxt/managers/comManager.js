import axios from "axios";

let env = import.meta.env.VITE_APP_ENV;
let url;

if (env.toLowerCase() === "development") {
  url = import.meta.env.VITE_APP_API_DEV_URL;
} else if (env.toLowerCase() === "production") {
  url = import.meta.env.VITE_APP_API_PROD_URL;
}

const comManager = {};

export default comManager;
