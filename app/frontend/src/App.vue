<template>
    <v-app>
        <v-snackbar :timeout="5000" v-model="showMessage" :color="color" top>{{ message }}</v-snackbar>
        <router-view />
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "App",

    data: () => ({
        message: "",
        color: "",
        showMessage: false,
    }),

    sockets: {
        disconnect() {
            this.color = "error";
            this.message = "You are disconnected";
            this.showMessage = true;
        },
        reconnect() {
            this.color = "primary";
            this.message = "Connection reestablished";
            this.showMessage = true;
            console.log("socket connected");
        },
    } as any,
} as any);
</script>

<style>
html {
    overflow-y: hidden !important;
}

.v-input {
    font-size: 12px !important;
}

.v-label {
    font-size: 12px !important;
}

.v-navigation-drawer__content::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #5d5d5d;
    background-color: #5d5d5d;
}
.v-navigation-drawer__content::-webkit-scrollbar {
    width: 0px;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px #424242;
    background-color: #424242;
}
</style>
