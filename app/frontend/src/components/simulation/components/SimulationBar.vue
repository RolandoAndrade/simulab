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

        <div class="date-selector">
          <v-text-field class="caption mx-1" outlined dense hide-details label="Starting time" type="datetime-local"></v-text-field>
        </div>
        <div class="date-selector">
            <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
                :close-on-content-click="false"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field id="ending-time-field" class="caption mx-1" outlined dense hide-details label="Ending time" v-on="on" readonly></v-text-field>
              </template>
              <v-card width="300px" class="pt-2">
                <v-subheader class="pa-4"><v-icon class="mr-2">mdi-calendar</v-icon>Ending time selection</v-subheader>
                <v-radio-group v-model="dateSelected" class="ma-0 pa-0">
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-radio :value="true">
                        </v-radio>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-row no-gutters>
                          <v-col cols="12">
                            <v-text-field class="caption mx-1" outlined dense hide-details label="Date" type="datetime-local" :disabled="!dateSelected"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-radio :value="false">
                        </v-radio>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-row no-gutters>
                          <v-col cols="5">
                            <v-text-field class="caption mx-1" outlined dense hide-details label="Time" type="number" :disabled="dateSelected"></v-text-field>
                          </v-col>
                          <v-col cols="7">
                            <v-select class="caption mx-1" outlined dense hide-details label="Unit" :disabled="dateSelected" :items="[
                      'Seconds',
                      'Minutes',
                      'Hours',
                      'Days'
                  ]"></v-select>
                          </v-col>
                        </v-row>
                      </v-list-item-content>

                    </v-list-item>
                  </v-list>
                </v-radio-group>
              </v-card>


            </v-menu>

        </div>

        <v-divider vertical class="mx-2"></v-divider>

        <v-card
            flat
            color="transparent"
            class="pa-0"
            width="200"
        >

          <v-subheader class="small-text pa-0 mx-auto my-n5">Simulation Speed</v-subheader>
          <v-slider
              max="2"
              min="0.1"
              step="0.1"
              thumb-label inverse-label ticks
              hide-details
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

@Component({
  name: 'simulation-bar',
  components: {HintButton, TooltipButton},
})
export default class SimulationBar extends Vue {
  private simulationRunning = false;

  dateSelector = false

  dateSelected = true
}
</script>

<style scoped>
.date-selector{
  width: 200px;
}

.small-text{
  font-size: 10px;
}

</style>

<style>
#app-bar{
  border-bottom: rgb(224,224,224) 1px solid !important;
  background: white;
}

label[for="ending-time-field"]{
  font-size: 12px;
}
</style>
