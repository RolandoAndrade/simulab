<template>
  <div>
    <v-app-bar app clipped-left clipped-right color="primary" outlined>
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

}
</script>

<style scoped>

</style>
