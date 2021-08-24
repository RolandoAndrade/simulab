<template>
  <v-navigation-drawer app mobile-breakpoint="0" clipped :width="width" right ref="drawer" id="property-drawer">
      <v-subheader class="my-2"><v-icon class="mr-2">mdi-playlist-edit</v-icon>
        <div class="caption">Properties</div>
      </v-subheader>
      <v-data-table
          id="properties-table"
          :headers="headers"
          :items="properties"
          disable-sort disable-pagination disable-filtering
          hide-default-footer
          mobile-breakpoint="0"
          no-data-text="No properties available"
      >
        <template v-slot:item.propertyValue="{ item }">
          <v-text-field v-model="item.propertyValue"  :placeholder="item.propertyName" outlined dense hide-details v-if="item.type === 'STRING'"></v-text-field>
          <v-autocomplete v-model="item.propertyValue" :placeholder="item.propertyName" outlined dense hide-details v-else-if="item.type === 'EXPRESSION'"></v-autocomplete>
          <v-select v-model="item.propertyValue" :placeholder="item.propertyName" outlined dense hide-details v-else-if="item.type === 'BOOLEAN'" :items="['True', 'False']"></v-select>
        </template>
      </v-data-table>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {ModelerEvents} from "modeler/shared/events/modeler.events";
import {SelectedNodeEvent} from "modeler/shared/events/selected-node.event";
import {SelectedPathEvent} from "modeler/shared/events/selected-path.event";
import {Edge, EntityProperty, GraphNode} from "modeler";
import {builder} from "@/components/simulation/store/namespaces";
import {BuilderMethods} from "@/components/simulation/store/builder/builder.methods";
import {Watch} from "vue-property-decorator";


@Component({
  name: 'property-bar',
})
export default class PropertyBar extends Vue {
  private width = 280;

  $refs!: {
    drawer: any
  }

  mounted(){
    this.setBorderWidth()
    this.setEvents();
  }

  setBorderWidth() {
    let i = this.$refs.drawer.$el.querySelector(
        ".v-navigation-drawer__border"
    );
    i.style.cursor = "ew-resize";
    i.style.borderWidth = "5px";
  }

  setEvents() {
    const el = this.$refs.drawer.$el;
    const drawerBorder = el.querySelector(".v-navigation-drawer__border");
    drawerBorder.style.cursor = "ew-resize";

    const child = drawerBorder.appendChild(document.createElement("div"))
    child.style.width = "10px";
    child.style.height = "100%"
    const vm = this;

    function resize(e: MouseEvent) {
      document.body.style.cursor = "ew-resize";
      let f = document.body.scrollWidth - e.clientX
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
      text: 'Property',
      align: 'start',
      value: 'propertyName',
    },
    { text: 'Value', value: 'propertyValue' },
  ];
  properties: EntityProperty[] = []

  @Watch("selectedNode")
  onSelectedNodeChanged() {
    if (!!this.selectedNode) {
      this.properties = this.selectedNode.getEntity().properties
    } else {
      this.properties = [];
    }
  }

  @builder.Getter(BuilderMethods.GETTERS.GET_SELECTED)
  selectedNode!: Edge | GraphNode | undefined;
}
</script>

<style>
#properties-table > .v-data-table__wrapper > table > tbody > tr > td{
  font-size: 12px !important;
  font-weight: 400;
}
#properties-table  > .v-data-table__wrapper > table > tbody > tr > td > .v-input{
  font-size: 12px !important;
}

#property-drawer {
  user-select: none;
  max-height: calc(100% - 100px) !important;
}
</style>
