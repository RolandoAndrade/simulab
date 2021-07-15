<template>
  <div class="fill-height">
    <system-bar>
      <template slot="simulation">
        <simulation-view></simulation-view>
      </template>
      <template slot="reports">
        <simulation-bar></simulation-bar>
      </template>
    </system-bar>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import SystemBar from "@/components/shared/components/layouts/components/SystemBar.vue";
  import SimulationView from "@/components/simulation/views/SimulationView.vue";
  import SimulationBar from "@/components/simulation/components/SimulationBar.vue";

  export default Vue.extend({
    name: 'HelloWorld',
    components: {SimulationBar, SimulationView, SystemBar},
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
