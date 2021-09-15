<template>
    <div>
        <div class="date-selector">
            <v-text-field
                class="caption mx-1"
                outlined
                dense
                hide-details
                label="Starting time"
                type="datetime-local"
                v-model="params.startingTime"
            ></v-text-field>
        </div>

        <div class="date-selector">
            <v-menu bottom origin="center center" transition="scale-transition" :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        id="ending-time-field"
                        class="caption mx-1"
                        :value="endingDate"
                        :type="isEndADateTime ? 'datetime-local' : 'text'"
                        outlined
                        dense
                        hide-details
                        label="Ending time"
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-card width="300px" class="pt-2">
                    <v-subheader class="pa-4"
                        ><v-icon class="mr-2">mdi-calendar</v-icon>Ending time selection</v-subheader
                    >
                    <v-radio-group v-model="dateSelected" class="ma-0 pa-0">
                        <v-list>
                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-radio :value="true"> </v-radio>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="endDate"
                                                class="caption mx-1"
                                                outlined
                                                dense
                                                hide-details
                                                label="Date"
                                                type="datetime-local"
                                                :disabled="!dateSelected"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-radio :value="false"> </v-radio>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-row no-gutters>
                                        <v-col cols="5">
                                            <v-text-field
                                                class="caption mx-1"
                                                v-model="time.time"
                                                outlined
                                                dense
                                                hide-details
                                                label="Time"
                                                type="number"
                                                :disabled="dateSelected"
                                                :min="0"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="7">
                                            <v-select
                                                class="caption mx-1"
                                                v-model="time.unit"
                                                outlined
                                                dense
                                                hide-details
                                                label="Unit"
                                                :disabled="dateSelected"
                                                :items="['Seconds', 'Minutes', 'Hours', 'Days']"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-radio-group>
                </v-card>
            </v-menu>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Time } from "@/components/shared/domain/time";
import { simulation } from "@/components/simulation/store/namespaces";
import { SimulationMethods } from "@/components/simulation/store/simulation/simulation.methods";
import { SimulationParams } from "@/components/simulation/domain/simulation-params";

@Component({
    name: "simulation-time",
})
export default class SimulationTime extends Vue {
    startDate = new Date().toISOString().slice(0, 11) + "12:00:00";

    endDate = this.startDate;

    dateSelected = true;

    time: Time = new Time();

    private get isEndADateTime() {
        return this.dateSelected;
    }

    private get isEndATime() {
        return !this.dateSelected;
    }

    get endingDate(): string {
        if (this.isEndADateTime) {
            return this.endDate;
        }
        return this.time.toString();
    }

    @Watch("endingDate")
    onEndingDateChange(value: string) {
        this.params.endingTime = this.endingDate;
    }

    @simulation.Getter(SimulationMethods.GETTERS.GET_SIMULATION_PARAMS)
    params!: SimulationParams;
}
</script>

<style scoped>
.date-selector {
    width: 200px;
    display: inline-block;
}

label[for="ending-time-field"] {
    font-size: 12px;
}
</style>
