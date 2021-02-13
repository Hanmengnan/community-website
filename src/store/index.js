import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authed: false,
    authority: 0,
    userName: "",
    avatarUrl: ""
  },
  mutations: {
    login(state, payload) {
      state.authed = true;
      state.authority = payload.authority;
      state.userName = payload.userName;
      state.avatarUrl = payload.avatarUrl;
    }
  },
  actions: {},
  modules: {}
});
