<template>
  <div>
    <v-app-bar app clipped-left clipped-right color="white" outlined>

      <v-row no-gutters align="center">
        <v-subheader class="ma-0 pa-0">
          <v-col class="text-center">
            <v-icon class="mx-auto">mdi-reload</v-icon>
            <div>Simulation</div>
          </v-col>
        </v-subheader>
        <tooltip-button tip-color="grey" color="grey" title="Play" outlined>
          <v-icon color="grey">
            mdi-play
          </v-icon>
        </tooltip-button>
        <tooltip-button tip-color="grey" color="grey" title="Stop" outlined>
          <v-icon color="grey">
            mdi-stop
          </v-icon>
        </tooltip-button>
        <v-col>
          <v-text-field class="caption mx-1" outlined dense hide-details></v-text-field>
        </v-col>
        <v-col>
          <v-text-field class="caption mx-1" outlined dense hide-details></v-text-field>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <tooltip-button title="Save Model" tip-color="grey">
        <v-icon color="grey">mdi-floppy</v-icon>
      </tooltip-button>
      <tooltip-button title="Import Model" tip-color="grey">
        <v-icon color="grey">mdi-upload</v-icon>
      </tooltip-button>
      <tooltip-button title="Settings" tip-color="grey">
        <v-icon color="grey">mdi-cog</v-icon>
      </tooltip-button>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import TooltipButton from "@/components/shared/components/buttons/TooltipButton.vue";

@Component({
  name: 'app-bar',
  components: {TooltipButton},
})
export default class AppBar extends Vue {

}
</script>

<style scoped>
</style>
