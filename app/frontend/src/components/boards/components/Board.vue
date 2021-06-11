<template>
  <div style="height: 100%">
    <div id="graph-container" style="width: 100%; height: 100%">
    </div>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {graphFactory} from "@/components/shared/infrastructure/graph-factory";

@Options({
  name: "board",
})

export default class Board extends Vue {
  mounted(){
    const container = document.getElementById("graph-container");
    const board = graphFactory.createBoard(container!);
  }
}

</script>

<style scoped>
</style>

