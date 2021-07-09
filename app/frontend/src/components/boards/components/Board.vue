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
import {SourceNodeCreator} from "modeler/nodes/infrastructure/canvas-node/queue-components/source";


@Component({
  name: 'board',
})
export default class Board extends Vue {
  mounted(){
    const container = document.getElementById("graph-container");
    this.$nextTick(()=>{
      const board = graphFactory.createBoard(container!);
      board.createNode(new SourceNodeCreator({
        name: "Source 1",
        properties: {

        }
      }))
    })

  }
}
</script>

<style scoped>

</style>
