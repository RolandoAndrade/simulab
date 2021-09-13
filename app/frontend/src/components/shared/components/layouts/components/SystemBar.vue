<template>
  <div class="fill-height">
    <v-system-bar app color="blue" height="40px">
      <div class="app-title">SimThesis</div>
      <hint-button tip-text="Simulation View" tip-color="primary" :color="selectedView === 0?'white':'primary'"
                   tile elevation="0" @click="()=>changeView(0)" x-small height="40px">
        <v-icon :color="selectedView === 0?'primary':'white'"  small class="px-1 mx-auto">mdi-reload</v-icon>
      </hint-button>
      <hint-button tip-text="Result View" tip-color="primary" :color="selectedView === 1?'white':'primary'"
                   tile elevation="0" @click="()=>changeView(1)" x-small height="40px">
        <v-icon :color="selectedView === 1?'primary':'white'" small class="px-1 mx-auto">mdi-file-chart-outline</v-icon>
      </hint-button>
      <hint-button tip-text="Data View" tip-color="primary" :color="selectedView === 2?'white':'primary'"
                   tile elevation="0" @click="()=>changeView(2)" x-small height="40px">
        <v-icon :color="selectedView === 2?'primary':'white'" small class="px-1 mx-auto">mdi-database</v-icon>
      </hint-button>
      <hint-button tip-text="Definitions View" tip-color="primary" :color="selectedView === 3?'white':'primary'"
                   tile elevation="0" @click="()=>changeView(3)" x-small height="40px">
        <v-icon :color="selectedView === 3?'primary':'white'" small class="px-1 mx-auto">mdi-variable</v-icon>
      </hint-button>

      <v-spacer></v-spacer>
      <v-divider vertical dark class="mr-2"></v-divider>
      <hint-button tip-text="Save Model" tip-color="primary" icon color="white">
        <v-icon color="white" small class="mx-auto" @click="save">mdi-floppy</v-icon>
      </hint-button>
      <hint-button tip-text="Import Model" tip-color="primary" icon color="white">
        <v-icon color="white" small class="mx-auto">mdi-upload</v-icon>
      </hint-button>
      <hint-button tip-text="Settings" tip-color="primary" icon color="white">
        <v-icon color="white" small class="mx-auto">mdi-cog</v-icon>
      </hint-button>
    </v-system-bar>
    <v-tabs-items v-model="selectedView" class="fill-height">
      <v-tab-item class="fill-height">
        <div class="fill-height" key="simulation">
          <slot name="simulation">

          </slot>
        </div>
      </v-tab-item>
      <v-tab-item class="fill-height">
        <div class="fill-height" key="reports">
          <slot name="reports">

          </slot>
        </div>
      </v-tab-item>
      <v-tab-item class="fill-height">
        <div class="fill-height" key="data">
          <slot name="data">

          </slot>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import HintButton from "@/components/shared/components/buttons/HintButton.vue";
import {builder} from "@/components/simulation/store/namespaces";
import {BuilderMethods} from "@/components/simulation/store/builder/builder.methods";

@Component({
  name: 'system-bar',
  components: {HintButton},
})
export default class SystemBar extends Vue {

  private selectedView: number = 0

  private changeView(view: number){
    this.selectedView = view
  }

  @builder.Action(BuilderMethods.ACTIONS.SAVE_EXPERIMENT)
  save!: ()=>void;
}
</script>

<style scoped>
.app-title{
  font-size: 15px;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  font-weight: 500;
  letter-spacing: 1px;
  color: white
}
</style>
