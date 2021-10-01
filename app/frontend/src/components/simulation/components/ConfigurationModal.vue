<template>
  <v-dialog v-model="opened" width="400">
    <v-card>
      <v-card-title>
        <div class="config-title"><v-icon class="pr-2">mdi-cog</v-icon>Configuration</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form class="pa-4">
          <v-row align="center" class="my-2">
            <v-switch label="Use seed" v-model="useSeed">
            </v-switch>
            <v-text-field class="ml-10" label="Seed" :disabled="!useSeed" v-model="seed" type="number" :min="0"></v-text-field>
          </v-row>

        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <div class="caption text-center grey--text mx-auto">SimThesis V1.0.0 - Rolando Andrade</div>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Watch} from "vue-property-decorator";
import {Time} from "@/components/shared/domain/time";
import {simulation} from "@/components/simulation/store/namespaces";
import {SimulationMethods} from "@/components/simulation/store/simulation/simulation.methods";
import {SimulationParams} from "@/components/simulation/domain/simulation-params";
import {SimulationStatus} from "@/components/simulation/domain/simulation-status";

@Component({
  name: "configuration-modal",
})
export default class ConfigurationModal extends Vue {
  opened: boolean = false;

  useSeed: boolean = false;


  seed: number = 0;

  openModal() {
    this.opened = true;
  }

  @Watch("useSeed")
  onUseSeedChanged(value: boolean){
    if (value) {
      this.setSeed(this.seed);
    } else {
      this.setSeed(null!)
    }
  }

  @Watch("seed")
  onSeedChanged(value: number){
    if (value) {
      this.setSeed(this.seed);
    }
  }

  @simulation.Action(SimulationMethods.ACTIONS.CHANGE_SEED)
  setSeed!:(seed: number)=>void;
}
</script>

<style scoped>
.config-title {
  color: rgba(0, 0, 0, 0.6);
  font-weight: normal;
}
</style>