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
        <tooltip-button tip-color="grey" color="grey" title="Play" outlined v-if="!simulationRunning">
          <v-icon color="grey">
            mdi-play
          </v-icon>
        </tooltip-button>
        <tooltip-button tip-color="grey" color="grey" title="Stop" outlined v-if="simulationRunning">
          <v-icon color="grey">
            mdi-stop
          </v-icon>
        </tooltip-button>
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
                <v-text-field class="caption mx-1" outlined dense hide-details label="Ending time" v-on="on" readonly></v-text-field>
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
  private simulationRunning = false;

  dateSelector = false

  dateSelected = true
}
</script>

<style scoped>
.date-selector{
  width: 200px;
}
</style>
