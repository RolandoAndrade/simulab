<template>
  <div class="fill-height">
    <v-system-bar app color="blue" height="40px">
      <div class="app-title">SimThesis</div>

      <hint-button tip-text="Simulation View" tip-color="primary" :color="selectedView === 0?'white':'primary'"
                   tile fab elevation="0" @click="()=>changeView(0)" small>
        <v-icon :color="selectedView === 0?'primary':'white'"  small class="mx-auto">mdi-reload</v-icon>
      </hint-button>
      <hint-button tip-text="Report View" tip-color="primary" :color="selectedView === 1?'white':'primary'"
                   tile fab elevation="0" @click="()=>changeView(1)" small>
        <v-icon :color="selectedView === 1?'primary':'white'" small class="mx-auto">mdi-file</v-icon>
      </hint-button>

      <v-spacer></v-spacer>
      <v-divider vertical dark class="mr-2"></v-divider>
      <hint-button tip-text="Save Model" tip-color="primary" icon color="white">
        <v-icon color="white" small class="mx-auto">mdi-floppy</v-icon>
      </hint-button>
      <hint-button tip-text="Import Model" tip-color="primary" icon color="white">
        <v-icon color="white" small class="mx-auto">mdi-upload</v-icon>
      </hint-button>
      <hint-button tip-text="Settings" tip-color="primary" icon color="white">
        <v-icon color="white" small class="mx-auto">mdi-cog</v-icon>
      </hint-button>
    </v-system-bar>
    <v-scale-transition group leave-absolute>
      <div class="fill-height" v-show="selectedView===0" key="simulation">
        <slot name="simulation">

        </slot>
      </div>
      <div class="fill-height" v-show="selectedView===1" key="reports">
        <slot name="reports">

        </slot>
      </div>
      <div class="fill-height" v-show="selectedView===3" key="data">
        <slot name="data">

        </slot>
      </div>
    </v-scale-transition>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import HintButton from "@/components/shared/components/buttons/HintButton.vue";

@Component({
  name: 'system-bar',
  components: {HintButton},
})
export default class SystemBar extends Vue {

  private selectedView: number = 0

  private changeView(view: number){
    this.selectedView = view
  }
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
