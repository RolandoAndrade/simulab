<template>
  <div class="fill-height">
    <v-system-bar app color="blue" height="40px">
      <div class="app-title">SimThesis</div>
      <v-spacer></v-spacer>
      <hint-button tip-text="Simulation View" tip-color="primary" icon color="white" tile>
        <v-icon color="white" small>mdi-reload</v-icon>
      </hint-button>
      <hint-button tip-text="Report View" tip-color="primary" icon color="white" tile>
        <v-icon color="white" small>mdi-file</v-icon>
      </hint-button>
      <v-divider vertical dark class="mx-2"></v-divider>
      <hint-button tip-text="Save Model" tip-color="primary" icon color="white">
        <v-icon color="white" small>mdi-floppy</v-icon>
      </hint-button>
      <hint-button tip-text="Import Model" tip-color="primary" icon color="white">
        <v-icon color="white" small>mdi-upload</v-icon>
      </hint-button>
      <hint-button tip-text="Settings" tip-color="primary" icon color="white">
        <v-icon color="white" small>mdi-cog</v-icon>
      </hint-button>
    </v-system-bar>
    <slot name="simulation">

    </slot>
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
