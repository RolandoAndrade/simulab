<template>
  <div class="fill-height">
    <div>
      <v-app-bar app clipped-left></v-app-bar>
    </div>

    <v-navigation-drawer app mini-variant mobile-breakpoint="0" clipped>
      <v-list dense>

      </v-list>
    </v-navigation-drawer>
    <v-main id="main-content" class="fill-height">
      <div class="main-content fill-height">
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

  export default Vue.extend({
    name: 'HelloWorld',
    components: {Board},
    data: () => ({
      opened: true
    })
  })
</script>
