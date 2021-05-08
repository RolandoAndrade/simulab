<template>
  <div>
    <div id="graph-container" :style="`position:relative;overflow:hidden;width:321px; height:241px;background-image:url('${require('@/assets/modeler/grid.gif')}'); background-repeat: repeat`">
    </div>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {GraphFactoryMXGraph} from "@/components/graphs/shared/factories/infrastructure/graph-factory.mxgraph";

@Options({
  name: "board",
})

export default class Board extends Vue {
  mounted(){
    const container = document.getElementById("graph-container");
    const board = new GraphFactoryMXGraph().createBoard(container!);
  }
}

</script>

<style scoped>

</style>

