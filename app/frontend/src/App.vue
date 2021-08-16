<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>

<style>
html{
  overflow-y: hidden !important;
}

.v-input{
  font-size: 12px !important;
}

.v-label{
  font-size: 12px !important;
}

.v-navigation-drawer__content::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px #5d5d5d;
  background-color: #5d5d5d;
}
.v-navigation-drawer__content::-webkit-scrollbar{
  width: 0px;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb{
  -webkit-box-shadow: inset 0 0 6px #424242;
  background-color: #424242;
}
</style>
