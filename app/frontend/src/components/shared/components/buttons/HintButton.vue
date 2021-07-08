<template>
  <v-tooltip bottom fixed :color="tipColor">
    <template v-slot:activator="{ on }">
      <v-btn v-bind="props"
             v-on="on"
             class="elevation-0"
      >
        <slot>
        </slot>
      </v-btn>
    </template>
    <span style="font-size: 12px">{{ tipText }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import { VBtn } from 'vuetify/lib';

@Component({
  name: 'hint-button',
})
export default class HintButton extends VBtn {
  @Prop({ type: String, required: false, default: "primary" })
  public tipColor!: string;

  @Prop({ type: String, required: false, default: "" })
  public tipText!: string;

  get props(){
    return this.$props
  }
}
</script>

<style scoped>

</style>
