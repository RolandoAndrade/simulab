<template>
  <div style="height: 100%" @drop="drop" @drop.prevent @dragover.prevent>
    <canvas id="graph-container" style="width: 100%; height: 100%">
    </canvas>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {NodeCreatorType} from "modeler/nodes/domain/node-creator";
import {Board as MainBoard} from "modeler/boards/domain/board";
import {builder} from "@/components/simulation/store/namespaces";
import {BuilderMethods} from "@/components/simulation/store/builder/builder.methods";
import {DropItemEvent} from "@/components/shared/domain/drop-item-event";


@Component({
  name: 'board',
})
export default class Board extends Vue {
  private board!: MainBoard;

  mounted(){
    const container = document.getElementById("graph-container");
    this.$nextTick(()=>{
      this.startBoard(container!);
    })
  }

  createNode(nodeCreatorType: NodeCreatorType, x?: number, y?: number){

  }

  drop(event: DragEvent) {
    const type: NodeCreatorType = event.dataTransfer!.getData("nodeCreatorType") as NodeCreatorType;
    if (!!type) {
      this.dropCreateNode({
        node: type,
        x: event.offsetX,
        y: event.offsetY
      });
    }
  }

  @builder.Action(BuilderMethods.ACTIONS.START_BOARD)
  startBoard!: (board: HTMLElement) => void;

  @builder.Action(BuilderMethods.ACTIONS.CREATE_NODE)
  dropCreateNode!: (event: DropItemEvent) => void;
}
</script>

<style scoped>

</style>
