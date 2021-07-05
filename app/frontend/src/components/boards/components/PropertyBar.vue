<template>
  <v-navigation-drawer app mobile-breakpoint="0" clipped width="200px" right>

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

</style>
