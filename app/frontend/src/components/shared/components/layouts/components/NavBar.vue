<template>
  <v-navigation-drawer app mobile-breakpoint="0" clipped width="100px">
    <v-list dense class="my-2">
      <v-list-item class="mb-2">
        <v-subheader>
          <v-col class="text-center">
            <v-icon class="mx-auto">mdi-sitemap</v-icon>
            <div>Items</div>
          </v-col>
        </v-subheader>
      </v-list-item>
      <v-list-item class="my-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Source" plain block @click="()=>createSource()">
          <v-img :src="require('@/assets/queue-components/source.png')" width="30px" :draggable="true" @dragstart="(event)=>this.dragStart(event, nodeCreatorType.SOURCE)"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="my-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Server" plain block @click="()=>createServer()">
          <v-img :src="require('@/assets/queue-components/server.png')" width="30px" :draggable="true" @dragstart="(event)=>this.dragStart(event, nodeCreatorType.SERVER)"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="my-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Sink" plain block>
          <v-img :src="require('@/assets/queue-components/sink.png')" width="30px"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="my-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Separator" plain block>
          <v-img :src="require('@/assets/queue-components/separator.png')" width="30px"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="my-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Combinator" plain block>
          <v-img :src="require('@/assets/queue-components/combinator.png')" width="30px"></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item class="my-2">
        <hint-button tip-color="grey" color="transparent" tip-text="Path" plain block @click="()=>changeMode()">
          <v-img :src="require('@/assets/queue-components/path.png')" width="30px"></v-img>
        </hint-button>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import TooltipButton from "@/components/shared/components/buttons/TooltipButton.vue";
import HintButton from "@/components/shared/components/buttons/HintButton.vue";
import {eventBus} from "@/components/shared/domain/event-bus";
import {NodeCreatorType} from "modeler/nodes/domain/node-creator";

@Component({
  name: 'nav-bar',
  components: {HintButton, TooltipButton},
})
export default class NavBar extends Vue {

  get nodeCreatorType(): typeof NodeCreatorType {
    return NodeCreatorType
  }

  createSource(){
    eventBus.$emit(eventBus.CREATE_NODE, NodeCreatorType.SOURCE)
  }
  createServer(){
    eventBus.$emit(eventBus.CREATE_NODE, NodeCreatorType.SERVER)
  }
  changeMode(){
    eventBus.$emit(eventBus.CHANGE_MODE, true);
  }

  dragStart(event: DragEvent, type: NodeCreatorType){
    event.dataTransfer!.setData("nodeCreatorType", type)
  }
}
</script>

<style scoped>

</style>
