<template>
    <v-navigation-drawer app mobile-breakpoint="0" clipped :width="width" right ref="drawer" id="property-drawer">
        <v-subheader class="my-2"
            ><v-icon class="mr-2">mdi-playlist-edit</v-icon>
            <div class="caption">Properties</div>
        </v-subheader>
        <v-data-table
            id="properties-table"
            :headers="headers"
            :items="properties"
            disable-sort
            disable-pagination
            disable-filtering
            hide-default-footer
            mobile-breakpoint="0"
            no-data-text="No properties available"
        >
            <template v-slot:item.propertyValue="{ item }">
                <v-text-field
                    :readonly="isSimulationRunning"
                    @change="() => propertyChanged(item)"
                    v-model="item.propertyValue"
                    :placeholder="item.propertyName"
                    outlined
                    dense
                    hide-details
                    v-if="item.propertyType === 'STRING' || item.propertyType === 'ANY'"
                ></v-text-field>
                <v-combobox
                    :readonly="isSimulationRunning"
                    @change="() => propertyChanged(item)"
                    v-model="item.propertyValue"
                    :placeholder="item.propertyName"
                    :items="expressionInspector"
                    item-text="text"
                    item-value="value"
                    :filter="customFilter"
                    outlined
                    dense
                    hide-details
                    v-else-if="item.propertyType === 'EXPRESSION'"
                ></v-combobox>
                <v-select
                    :readonly="isSimulationRunning"
                    @change="() => propertyChanged(item)"
                    v-model="item.propertyValue"
                    :placeholder="item.propertyName"
                    outlined
                    dense
                    hide-details
                    v-else-if="item.propertyType === 'BOOLEAN'"
                    :items="['True', 'False']"
                ></v-select>
            </template>
        </v-data-table>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Edge, EntityProperty, GraphNode } from "modeler";
import { builder, simulation } from "@/components/simulation/store/namespaces";
import { BuilderMethods } from "@/components/simulation/store/builder/builder.methods";
import { Watch } from "vue-property-decorator";
import { SimulationMethods } from "@/components/simulation/store/simulation/simulation.methods";
import { SimulationStatus } from "@/components/simulation/domain/simulation-status";
import {ExpressionManager} from "@/components/simulation/domain/expression-manager";

@Component({
    name: "property-bar",
})
export default class PropertyBar extends Vue {
    private width = 280;

    currentExpression: string = "";
    currentOptions: string[] = []

    $refs!: {
        drawer: any;
    };

    mounted() {
        this.setBorderWidth();
        this.setEvents();
        this.currentOptions = Object.keys(this.expressions)
    }

    setBorderWidth() {
        let i = this.$refs.drawer.$el.querySelector(".v-navigation-drawer__border");
        i.style.cursor = "ew-resize";
        i.style.borderWidth = "5px";
    }

    setEvents() {
        const el = this.$refs.drawer.$el;
        const drawerBorder = el.querySelector(".v-navigation-drawer__border");
        drawerBorder.style.cursor = "ew-resize";

        const child = drawerBorder.appendChild(document.createElement("div"));
        child.style.width = "10px";
        child.style.height = "100%";
        const vm = this;

        function resize(e: MouseEvent) {
            document.body.style.cursor = "ew-resize";
            let f = document.body.scrollWidth - e.clientX;
            el.style.width = Math.max(280, f) + "px";
        }

        child.addEventListener(
            "mousedown",
            (e: MouseEvent) => {
                if (e.offsetX < 280) {
                    el.style.transition = "initial";
                    document.addEventListener("mousemove", resize, false);
                }
            },
            false
        );

        document.addEventListener(
            "mouseup",
            () => {
                el.style.transition = "";
                vm.width = el.style.width;
                document.body.style.cursor = "";
                document.removeEventListener("mousemove", resize, false);
            },
            false
        );
    }

    headers = [
        {
            text: "Property",
            align: "start",
            value: "propertyName",
        },
        { text: "Value", value: "propertyValue" },
    ];
    properties: EntityProperty[] = [];

    @Watch("selectedNode")
    onSelectedNodeChanged() {
        if (!!this.selectedNode) {
            this.properties = this.selectedNode.getEntity().properties.map((e) => ({ ...e }));
        } else {
            this.properties = [];
        }
    }

    get isSimulationRunning(): boolean {
        return this.status === SimulationStatus.RUNNING;
    }

    propertyChanged(property: EntityProperty) {
        //this.changeProperty({ component: this.selectedNode!, property });
    }

    getValues(object: {[key: string]: any}) {

      if (object.hasOwnProperty("value")){
        let params = "";
        let rParams = "";
        if (object.hasOwnProperty("params")){
          const p: string[] = object.params;
          if (p.length>0){
            params += "(";
            rParams += "(";
            p.forEach((s)=>{
              params += s + ","
              rParams += 0 + ","
            })
            params = params.substring(0, params.length - 1) + ")";
            rParams = rParams.substring(0, rParams.length - 1) + ")";
          }
        }
        return [{text: object.value + params, value: object.value + rParams, keys: object.value.split(".")}];
      }
      let keys: { text: string, value: string, keys: string[] }[] = [];
      for (const key in object){
        keys = keys.concat(this.getValues(object[key]))
      }
      return keys
    }

    changeOptions(keys: string[]){

    }

    get expressionInspector(){
      return this.getValues(this.expressions);
    }

    customFilter (item: { text: string, value: string, keys: string[] }, queryText: string, itemText: string) {
      const dotsQuery = (queryText.match(/\./g) || []).length;
      const dotsItem = (itemText.match(/\./g) || []).length;
      console.log({item, queryText, itemText, dotsQuery, dotsItem, a: queryText.match(/\./g)})
      return `${itemText}`.includes(queryText);
    }

    @builder.Getter(BuilderMethods.GETTERS.GET_SELECTED)
    selectedNode!: Edge | GraphNode | undefined;

    @builder.Getter(BuilderMethods.GETTERS.GET_AVAILABLE_EXPRESSIONS)
    expressions!: ExpressionManager;

    @builder.Action(BuilderMethods.ACTIONS.CHANGE_PROPERTY)
    changeProperty!: (data: { component: Edge | GraphNode; property: EntityProperty }) => void;

    @simulation.Getter(SimulationMethods.GETTERS.GET_SIMULATOR_STATUS)
    status!: SimulationStatus;
}
</script>

<style>
#properties-table > .v-data-table__wrapper > table > tbody > tr > td {
    font-size: 12px !important;
    font-weight: 400;
}
#properties-table > .v-data-table__wrapper > table > tbody > tr > td > .v-input {
    font-size: 12px !important;
}

#property-drawer {
    user-select: none;
    max-height: calc(100% - 100px) !important;
}
</style>
