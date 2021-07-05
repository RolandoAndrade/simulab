<template>
  <v-navigation-drawer app mobile-breakpoint="0" clipped width="200px" right>
      <v-subheader><v-icon class="mr-2">mdi-playlist-edit</v-icon>Properties</v-subheader>
      <table class="caption property-table">
        <thead class="property-title">
        <tr>
          <td class="pa-1 property-name">Property</td>
          <td class="pa-1 property-value">Value</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="property-name">Name</td>
          <td class="property-value"><v-text-field class="caption" hide-details dense></v-text-field></td>
        </tr>
        </tbody>
      </table>
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

}
</script>

<style scoped>

td{
  border: solid 1px red;
}

.property-title{
  background: #f0f0f0;
  color: rgba(0, 0, 0, 0.6);
}
.property-name{
  width: 80px;
}
.property-value{
  width: 120px;
}
</style>
