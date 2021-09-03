<template>
  <div>
    <v-app-bar id="app-bar" app outlined flat clipped-right clipped-left class="app-bar" color="white">
      <v-row no-gutters align="center">
        <v-subheader class="ma-0 pa-0">
          <v-col class="text-center">
            <v-icon class="mx-auto">mdi-reload</v-icon>
            <div>Simulation</div>
          </v-col>
        </v-subheader>
        <simulation-time></simulation-time>
        <v-divider vertical class="mx-2"></v-divider>

        <v-card
            flat
            color="transparent"
            class="pa-0 flex"
            min-width="150"
        >

          <v-subheader class="small-text pa-0 mx-auto my-n5">Simulation Speed</v-subheader>
          <v-slider
              max="2"
              min="0.1"
              step="0.1"
              thumb-label
              ticks
              hide-details
              v-model="params.speed"
          ></v-slider>
        </v-card>

        <v-divider vertical class="mx-2"></v-divider>
        <hint-button tip-color="primary" color="primary" tip-text="Play" outlined :disabled="simulationRunning" fab x-small class-style="mx-1">
          <v-icon color="primary">
            mdi-play
          </v-icon>
        </hint-button>
        <hint-button tip-color="primary" color="primary" tip-text="Next Step" :disabled="simulationRunning" outlined fab x-small class-style="mx-1">
          <v-icon color="primary">
            mdi-arrow-right
          </v-icon>
        </hint-button>
        <hint-button tip-color="primary" color="primary" tip-text="Fast Forward" :disabled="simulationRunning" outlined fab x-small class-style="mx-1">
          <v-icon color="primary">
            mdi-fast-forward
          </v-icon>
        </hint-button>
        <hint-button tip-color="red" color="red" tip-text="Pause" outlined :disabled="!simulationRunning" fab x-small class-style="mx-1">
          <v-icon color="stop">
            mdi-pause
          </v-icon>
        </hint-button>
        <hint-button tip-color="red" color="red" tip-text="Stop" outlined :disabled="!simulationRunning" fab x-small class-style="mx-1">
          <v-icon color="stop">
            mdi-stop
          </v-icon>
        </hint-button>

      </v-row>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import TooltipButton from "@/components/shared/components/buttons/TooltipButton.vue";
import HintButton from "@/components/shared/components/buttons/HintButton.vue";
import SimulationTime from "@/components/simulation/components/SimulationTime.vue";
import {simulation} from "@/components/simulation/store/namespaces";
import {SimulationMethods} from "@/components/simulation/store/simulation/simulation.methods";
import {SimulationParams} from "@/components/simulation/domain/simulation-params";

@Component({
  name: 'simulation-bar',
  components: {SimulationTime, HintButton, TooltipButton},
})
export default class SimulationBar extends Vue {
  private simulationRunning = false;

  @simulation.Getter(SimulationMethods.GETTERS.GET_SIMULATION_PARAMS)
  params!: SimulationParams;
}
</script>

<style scoped>
.small-text{
  font-size: 10px;
}

</style>

<style>
#app-bar{
  border-bottom: rgb(224,224,224) 1px solid !important;
  background: white;
}
</style>
