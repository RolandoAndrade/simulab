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
</style>
