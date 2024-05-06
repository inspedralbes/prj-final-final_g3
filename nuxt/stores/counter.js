import { defineStore } from "pinia";

export const useStores = defineStore("counter", {
  state: () => ({
    loggedIn: false,
    userInfo: {
      id: null,
      name: "",
      surnames: "",
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
    setUserInfo(userInfo) {
      this.userInfo.id = userInfo.id;
      this.userInfo.name = userInfo.name;
      this.userInfo.surnames = userInfo.surnames;
      this.userInfo.email = userInfo.email;
      this.userInfo.token = userInfo.token;
    },
    setLoggedIn(value) {
      this.loggedIn = value;
    },
    setEvents(events) {
      this.events = events;
    },
    getUserInfo() {
      return this.userInfo;
    },
    getLoggedIn() {
      return this.loggedIn;
    },
  },
});
