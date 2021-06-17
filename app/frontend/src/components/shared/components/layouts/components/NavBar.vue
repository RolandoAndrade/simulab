<template>
  <v-navigation-drawer app mini-variant mobile-breakpoint="0" clipped>
    <v-list dense>

    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'nav-bar',
})
export default class NavBar extends Vue {

}
</script>

<style scoped>

</style>
