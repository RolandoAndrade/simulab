import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

export const socketConnection = SocketIO(process.env.VUE_APP_SERVER_HOST);

Vue.config.productionTip = false;

Vue.use(
    new VueSocketIO({
        debug: true,
        connection: socketConnection,
        vuex: {
            store,
            actionPrefix: "SOCKET_",
        },
    })
);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
