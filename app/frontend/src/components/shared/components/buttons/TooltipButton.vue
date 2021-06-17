<template>
  <v-tooltip bottom fixed :color="tipColor?tipColor: color">
    <template v-slot:activator="{ on }">
      <v-btn
          :disabled="disabled"
          :outlined="outlined"
          fab
          :plain="!outlined && !filled"
          :color="color"
          v-on="on"
          @click="click"
          x-small
          elevation="0"
          class="mx-2"
          :dark="dark"
          :loading="loading"
      >
        <slot>
        </slot>
      </v-btn>
    </template>
    <span style="font-size: 12px">{{ title }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Emit, Prop} from 'vue-property-decorator';

@Component({
  name: 'tooltip-button',
})


export default class TooltipButton extends Vue {
  @Prop({ type: String, required: false })
  public title!: string;

  @Prop({ type: String, required: false, default: "primary" })
  public color!: string;

  @Prop({ type: String, required: false, default: undefined })
  public tipColor!: string;

  @Prop({ type: Boolean, required: false, default: false })
  public dark!: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  public disabled!: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  public filled!: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  public outlined!: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  public loading!: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  public text!: boolean;

  @Emit("click")
  click() {}
}
</script>

<style scoped>

</style>
