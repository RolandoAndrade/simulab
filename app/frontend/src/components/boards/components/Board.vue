<template>
  <div style="height: 100%">
    <div id="graph-container" style="width: 100%; height: 100%">
    </div>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {GraphFactoryMXGraph} from "@/components/graphs/shared/factories/infrastructure/graph-factory.mxgraph";
import {GraphFactoryDiagramsJs} from "@/components/graphs/shared/factories/infrastructure/graph-factory.diagrams-js";
import {GraphFactoryGoJS} from "@/components/graphs/shared/factories/infrastructure/graph-factory.gojs";

@Options({
  name: "board",
})

export default class Board extends Vue {
  mounted(){
    const container = document.getElementById("graph-container");
    const board = new GraphFactoryGoJS().createBoard(container!);
  }
}

</script>

<style scoped>
</style>

