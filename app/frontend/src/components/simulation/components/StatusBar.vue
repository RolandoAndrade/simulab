<template>
  <v-app-bar bottom app flat color="white" id="status-bar" dense>
    <div class="status-label">
      <v-subheader v-if="showStopped">
        <v-icon color="red" class="mr-2">
          mdi-stop-circle-outline
        </v-icon>
        <div class="status-text red--text">Stopped</div>
      </v-subheader>
      <v-subheader v-else-if="showPaused">
        <v-icon color="red" class="mr-2">
          mdi-pause-circle-outline
        </v-icon>
        <div class="status-text red--text">Paused</div>
      </v-subheader>
      <v-subheader v-else-if="showRunning">
        <v-icon color="primary" class="mr-2">
          mdi-play-circle-outline
        </v-icon>
        <div class="status-text blue--text">Running...</div>
      </v-subheader>
      <v-subheader v-else-if="showFinished">
        <v-icon color="green" class="mr-2">
          mdi-flag
        </v-icon>
        <div class="status-text green--text">Finished</div>
      </v-subheader>
    </div>


    <v-divider vertical class="mx-1"></v-divider>
    <v-col v-if="showRunning || showPaused || showFinished">
      <div class="progress-text">{{time}} ({{progress}}% completed)</div>
      <v-progress-linear
          :key="progress"
          buffer-value="100"
          color="primary"
          background-color="#eee"
          :value="progress"
      ></v-progress-linear>
    </v-col>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import {simulation} from "@/components/simulation/store/namespaces";
import {SimulationMethods} from "@/components/simulation/store/simulation/simulation.methods";
import {SimulationStatus} from "@/components/simulation/domain/simulation-status";
import {SimulationStats} from "@/components/simulation/domain/simulation-stats";
import {SimulationParams} from "@/components/simulation/domain/simulation-params";

@Component({
  name: 'status-bar',
})
export default class StatusBar extends Vue {

  get showPaused(): boolean{
    return this.status === "PAUSED"
  }

  get showStopped(): boolean{
    return this.status === "STOPPED"
  }

  get showRunning(): boolean{
    return this.status === "RUNNING"
  }

  get showFinished(): boolean{
    return this.status === "FINISHED"
  }

  get progress(): number {
    if (this.stats.stopTime <= 0){
      return 0;
    }
    return parseFloat(""+((this.stats.time / this.stats.stopTime) * 100).toFixed(2))
  }

  get time(){
    const date = new Date(this.params.startingTime).getTime();
    const add = this.stats.time * 1000
    return new Date(date + add).toLocaleString();
  }

  @simulation.Getter(SimulationMethods.GETTERS.GET_SIMULATOR_STATUS)
  status!: SimulationStatus;

  @simulation.Getter(SimulationMethods.GETTERS.GET_SIMULATION_STATS)
  stats!: SimulationStats;


  @simulation.Getter(SimulationMethods.GETTERS.GET_SIMULATION_PARAMS)
  params!: SimulationParams;


}
</script>

<style scoped>
.status-text{
  font-size: 10px!important;
}

.status-label{
  width: 125px;
}

.progress-text{
  font-size: 10px!important;
  color: grey;
  padding-bottom: 5px;
}
</style>

<style>
#status-bar{
  border-top: rgb(224,224,224) 1px solid !important;
  border-left: rgb(224,224,224) 1px solid !important;
  background: white;
  z-index: 1 !important;
}

.v-progress-linear__bar, .v-progress-linear__bar__determinate {
  transition: none;
}
</style>
