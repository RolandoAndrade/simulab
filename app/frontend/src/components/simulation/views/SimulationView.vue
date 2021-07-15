<template>
  <div class="fill-height">
    <simulation-bar></simulation-bar>
    <items-bar></items-bar>
    <property-bar></property-bar>
    <v-main id="main-content" class="fill-height">
      <div class="main-content">
        <v-fade-transition mode="out-in">
          <board></board>
        </v-fade-transition>
      </div>
    </v-main>
    <status-bar></status-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import SimulationBar from "@/components/simulation/components/SimulationBar.vue";
import ItemsBar from "@/components/simulation/components/ItemsBar.vue";
import PropertyBar from "@/components/simulation/components/PropertyBar.vue";
import Board from "@/components/simulation/components/Board.vue";
import StatusBar from "@/components/simulation/components/StatusBar.vue";

@Component({
  name: 'simulation-view',
  components: {StatusBar, Board, PropertyBar, ItemsBar, SimulationBar},
})
export default class SimulationView extends Vue {

}
</script>

<style scoped>
.main-content{
  height: 100%;
}
</style>
