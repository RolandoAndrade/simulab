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

  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'status-bar',
})
export default class StatusBar extends Vue {
  status: string = "STOPPED";

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
}
</script>

<style scoped>
.status-text{
  font-size: 10px!important;
}

.status-label{
  width: 125px;
}
</style>

<style>
#status-bar{
  border-top: rgb(224,224,224) 1px solid !important;
  border-left: rgb(224,224,224) 1px solid !important;
  background: white;
  z-index: 1 !important;
}
</style>
