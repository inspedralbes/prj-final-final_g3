import { defineStore } from "pinia";

export const useStores = defineStore("counter", {
  state: () => ({
    loggedIn: false,
    infoOnRegister: {},
    userInfo: {
      id: null,
      name: "",
      surnames: "",
      nickname: "",
      email: "",
      token: "",
    },
    events: [],
  }),
  persist: {
    storage: persistedState.localStorage,
    paths: ["userInfo", "loggedIn"],
  },
  actions: {
    // SETTERS
    setUserInfo(userInfo) {
      this.userInfo.id = userInfo.id;
      this.userInfo.name = userInfo.name;
      this.userInfo.surnames = userInfo.surnames;
      this.userInfo.nickname = userInfo.nickname;
      this.userInfo.email = userInfo.email;
      this.userInfo.token = userInfo.token;
    },
    setLoggedIn(value) {
      this.loggedIn = value;
    },
    setEvents(events) {
      this.events = events;
    },
    setInfoOnRegister(info) {
      this.infoOnRegister = info;
    },
    // GETTERS
    getUserInfo() {
      return this.userInfo;
    },
    getLoggedIn() {
      return this.loggedIn;
    },
    getInfoOnRegister() {
      return this.infoOnRegister;
    },
  },
});
