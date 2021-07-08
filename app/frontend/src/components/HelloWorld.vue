<template>
  <div class="fill-height">
    <app-bar></app-bar>
    <nav-bar></nav-bar>
    <property-bar></property-bar>
    <v-main id="main-content" class="fill-height">
      <div class="main-content">
        <v-fade-transition mode="out-in">
          <board></board>
        </v-fade-transition>
      </div>
    </v-main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Board from "@/components/boards/components/Board.vue";
  import AppBar from "@/components/shared/components/layouts/components/AppBar.vue";
  import NavBar from "@/components/shared/components/layouts/components/NavBar.vue";
  import PropertyBar from "@/components/boards/components/PropertyBar.vue";

  export default Vue.extend({
    name: 'HelloWorld',
    components: {PropertyBar, NavBar, AppBar, Board},
    data: () => ({
      opened: true
    })
  })
</script>

<style scoped>
  .main-content{
    height: calc(100% - 8px);
  }
</style>
