<template>
  <v-navigation-drawer app mobile-breakpoint="0" clipped width="80px">
    <v-list dense class="my-2">
      <v-list-item class="px-2 mb-4 ml-n1">
        <v-subheader>
          <v-col class="text-center">
            <v-icon class="mx-auto" small>mdi-sitemap</v-icon>
            <div>Items</div>
          </v-col>
        </v-subheader>
      </v-list-item>
      <v-list-item class="pa-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Path" plain block @click="()=>createPath()">
          <v-img :src="require('@/assets/queue-components/path.png')" width="30px"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="pa-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Model Entity" plain block  @click="()=>createNode(nodeCreatorType.ENTITY_EMITTER)">
          <v-img :src="require('@/assets/queue-components/model-entity.png')" max-width="13px"  :draggable="true" @dragstart="(event)=>this.dragStart(event, nodeCreatorType.ENTITY_EMITTER)"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="pa-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Source" plain block @click="()=>createNode(nodeCreatorType.SOURCE)">
          <v-img :src="require('@/assets/queue-components/source.png')" width="30px" :draggable="true" @dragstart="(event)=>this.dragStart(event, nodeCreatorType.SOURCE)"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="pa-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Server" plain block @click="()=>createNode(nodeCreatorType.SERVER)">
          <v-img :src="require('@/assets/queue-components/server.png')" width="30px" :draggable="true" @dragstart="(event)=>this.dragStart(event, nodeCreatorType.SERVER)"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="pa-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Sink" plain block  @click="()=>createNode(nodeCreatorType.SINK)">
          <v-img :src="require('@/assets/queue-components/sink.png')" width="30px" :draggable="true" @dragstart="(event)=>this.dragStart(event, nodeCreatorType.SINK)"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="pa-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Separator" plain block>
          <v-img :src="require('@/assets/queue-components/separator.png')" width="30px"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="pa-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Combinator" plain block>
          <v-img :src="require('@/assets/queue-components/combinator.png')" width="30px"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="pa-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Label" plain block>
          <v-img :src="require('@/assets/queue-components/label.png')" width="30px"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="pa-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Delete" plain block @click="()=>eraseMode()">
          <v-img :src="require('@/assets/queue-components/eraser.png')" width="20px"></v-img>
        </hint-button>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TooltipButton from "@/components/shared/components/buttons/TooltipButton.vue";
import HintButton from "@/components/shared/components/buttons/HintButton.vue";
import {eventBus} from "@/components/shared/domain/event-bus";
import {NodeCreatorType} from "modeler/nodes/domain/node-creator";
import {BoardMode} from "../../../../../modeler/src/boards/domain/board-mode";

@Component({
  name: 'items-bar',
  components: {HintButton, TooltipButton},
})
export default class ItemsBar extends Vue {

  get nodeCreatorType(): typeof NodeCreatorType {
    return NodeCreatorType
  }

  createNode(type: NodeCreatorType){
    eventBus.$emit(eventBus.CREATE_NODE, type)
  }

  createPath(){
    eventBus.$emit(eventBus.CHANGE_MODE, BoardMode.CREATING_PATH_MODE);
  }

  eraseMode(){
    eventBus.$emit(eventBus.CHANGE_MODE, BoardMode.ERASING_MODE);
  }

  dragStart(event: DragEvent, type: NodeCreatorType){
    event.dataTransfer!.setData("nodeCreatorType", type)
  }
}
</script>

<style scoped>

</style>
