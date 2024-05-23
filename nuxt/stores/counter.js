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
      nickname: "",
      birthdate: "",
      followedUsers: [],
    },
    events: [],
    chatUser: {},
    locations: [],
    distance: 50,
    userLocation: {},
    individualPostInfo: {},
  }),
  persist: {
    storage: persistedState.localStorage,
    paths: ["userInfo", "loggedIn", "events", "locations", "userLocation"],
  },

  actions: {
    /* -------------------------------------------------------------------------- */
    /*                                   SETTERS                                  */
    /* -------------------------------------------------------------------------- */
    setUserInfo(userInfo) {
      this.userInfo.id = userInfo.id;
      this.userInfo.name = userInfo.name;
      this.userInfo.surnames = userInfo.surnames;
      this.userInfo.nickname = userInfo.nickname;
      this.userInfo.email = userInfo.email;
      this.userInfo.token = userInfo.token;
      this.userInfo.nickname = userInfo.nickname;
      this.userInfo.birthdate = userInfo.birthdate;
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
    setLogout() {
      this.userInfo = {};
      this.loggedIn = false;
    },
    setChatUser(user) {
      this.chatUser = user;
    },    
    setFollowedUsers(followedUsers) {
      this.followedUsers = followedUsers;
    },
    setLocations(locations) {
      this.locations = locations.locations;
    },
    setUserLocation(location) {
      this.userLocation = location;
      console.log(this.userLocation);
    },

    /* -------------------------------------------------------------------------- */
    /*                                   GETTERS                                  */
    /* -------------------------------------------------------------------------- */
    getId() {
      return this.userInfo.id;
    },
    getUserInfo() {
      return this.userInfo;
    },
    getLoggedIn() {
      return this.loggedIn;
    },
    getInfoOnRegister() {
      return this.infoOnRegister;
    },
    getToken() {
      return this.userInfo.token;
    },
    getEvents() {
      return this.events;
    },
    getChatUser() {
      return this.chatUser;
    },
    getLocations() {
      return this.locations;
    },
    getUserLocation() {
      return this.userLocation;
    },
  },
});
