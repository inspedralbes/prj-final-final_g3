import { io } from "socket.io-client";

const URL = "http://localhost:8085";

export const socket = io({
  path: "/socket",
});

export default socket;
