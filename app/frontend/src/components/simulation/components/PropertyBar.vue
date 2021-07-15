<template>
  <v-navigation-drawer app mobile-breakpoint="0" clipped :width="width" right ref="drawer" id="property-drawer">
      <v-subheader class="my-2"><v-icon class="mr-2">mdi-playlist-edit</v-icon>Properties</v-subheader>
      <v-data-table
          id="properties-table"
          :headers="headers"
          :items="properties"
          disable-sort disable-pagination disable-filtering
          hide-default-footer
          mobile-breakpoint="0"
      >
        <template v-slot:item.propertyValue="{ item }">
          <v-text-field :placeholder="item.propertyName" outlined dense hide-details v-if="item.type === 'STRING'"></v-text-field>
          <v-autocomplete :placeholder="item.propertyName" outlined dense hide-details v-else-if="item.type === 'EXPRESSION'"></v-autocomplete>
          <v-select :placeholder="item.propertyName" outlined dense hide-details v-else-if="item.type === 'BOOLEAN'" :items="['True', 'False']"></v-select>
        </template>
      </v-data-table>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

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
    this.setEvents()
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
  properties = [
    {
      propertyName: 'Name',
      propertyValue: 'Lorem ipsum',
      type: "STRING"
    },
    {
      propertyName: 'Arrival time',
      propertyValue: 'Lorem ipsum',
      type: "EXPRESSION"
    },
    {
      propertyName: 'Enabled',
      propertyValue: 'Lorem ipsum',
      type: "BOOLEAN"
    },
  ]
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
  z-index: 10;
  max-height: calc(100% - 100px) !important;
}
</style>
