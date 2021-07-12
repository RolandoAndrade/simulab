<template>
  <div class="fill-height">
    <system-bar>
      <template slot="simulation">
        <app-bar></app-bar>
        <items-bar></items-bar>
        <property-bar></property-bar>
        <v-main id="main-content" class="fill-height">
          <div class="main-content">
            <v-fade-transition mode="out-in">
              <board></board>
            </v-fade-transition>
          </div>
        </v-main>
      </template>
    </system-bar>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Board from "@/components/boards/components/Board.vue";
  import ItemsBar from "@/components/boards/components/ItemsBar.vue";
  import PropertyBar from "@/components/boards/components/PropertyBar.vue";
  import AppBar from "@/components/boards/components/AppBar.vue";
  import SystemBar from "@/components/shared/components/layouts/components/SystemBar.vue";

  export default Vue.extend({
    name: 'HelloWorld',
    components: {SystemBar, AppBar, PropertyBar, ItemsBar, Board},
    data: () => ({
      opened: true,
      tab: null
    })
  })
</script>

<style scoped>
  .main-content{
    height: calc(100% - 8px);
  }
</style>
