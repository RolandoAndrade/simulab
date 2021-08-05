<template>
  <div style="height: 100%" @drop="drop" @drop.prevent @dragover.prevent>
    <canvas id="graph-container" style="width: 100%; height: 100%">
    </canvas>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {graphFactory} from "@/components/shared/infrastructure/graph-factory";
import {NodeCreatorType} from "modeler/nodes/domain/node-creator";
import {Board as MainBoard} from "modeler/boards/domain/board";
import {eventBus} from "@/components/shared/domain/event-bus";


@Component({
  name: 'board',
})
export default class Board extends Vue {
  private board!: MainBoard;

  mounted(){
    const container = document.getElementById("graph-container");
    this.$nextTick(()=>{
      this.board = graphFactory.createBoard(container!);
    })
    eventBus.$on(eventBus.CREATE_NODE, this.createNode.bind(this))
    eventBus.$on(eventBus.CHANGE_MODE, (mode: boolean)=>{
      this.board.setPathCreation(mode)
    })
  }

  createNode(nodeCreatorType: NodeCreatorType, x?: number, y?: number){
    this.board.createNode(graphFactory.createNodeCreator(nodeCreatorType, {
      name: "Source 1",
      properties: {

      }
    }), x, y)
  }

  drop(event: DragEvent){
    const type: NodeCreatorType = event.dataTransfer!.getData("nodeCreatorType") as NodeCreatorType;
    if (!!type) {
      this.createNode(type, event.offsetX, event.offsetY);
    }
  }
}
</script>

<style scoped>

</style>
