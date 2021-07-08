<template>
  <div style="height: 100%">
    <canvas id="graph-container" style="width: 100%; height: 100%">
    </canvas>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {graphFactory} from "@/components/shared/infrastructure/graph-factory";

@Component({
  name: 'board',
})
export default class Board extends Vue {
  mounted(){
    const container = document.getElementById("graph-container");
    this.$nextTick(()=>{
      const board = graphFactory.createBoard(container!);
    })

  }
}
</script>

<style scoped>

</style>
