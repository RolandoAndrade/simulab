<template>
  <v-navigation-drawer app mobile-breakpoint="0" clipped width="280px" right>
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
</style>
