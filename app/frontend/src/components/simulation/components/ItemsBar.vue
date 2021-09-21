<template>
    <v-navigation-drawer
        app
        mobile-breakpoint="0"
        clipped
        width="80px"
        :class="isSimulationRunning ? 'running-drawer' : ''"
    >
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
                <hint-button
                    tip-color="grey"
                    color="transparent"
                    tip-text="Path"
                    :plain="!isCreatingPathModeEnabled"
                    class-style="elevation-0"
                    block
                    @click="() => createPath()"
                    :disabled="isSimulationRunning"
                >
                    <v-img :src="require('@/assets/queue-components/path.png')" width="30px"></v-img>
                </hint-button>
            </v-list-item>
            <v-list-item class="pa-2">
                <hint-button
                    tip-color="grey"
                    color="transparent"
                    tip-text="Model Entity"
                    plain
                    block
                    @click="() => createNode(nodeCreatorType.ENTITY_EMITTER)"
                    :disabled="isSimulationRunning"
                >
                    <v-img
                        :src="require('@/assets/queue-components/model-entity.png')"
                        max-width="13px"
                        :draggable="true"
                        @dragstart="(event) => this.dragStart(event, nodeCreatorType.ENTITY_EMITTER)"
                    ></v-img>
                </hint-button>
            </v-list-item>
            <v-list-item class="pa-2">
                <hint-button
                    tip-color="grey"
                    color="transparent"
                    tip-text="Source"
                    plain
                    block
                    @click="() => createNode(nodeCreatorType.SOURCE)"
                    :disabled="isSimulationRunning"
                >
                    <v-img
                        :src="require('@/assets/queue-components/source.png')"
                        width="30px"
                        :draggable="true"
                        @dragstart="(event) => this.dragStart(event, nodeCreatorType.SOURCE)"
                        :disabled="isSimulationRunning"
                    ></v-img>
                </hint-button>
            </v-list-item>
            <v-list-item class="pa-2">
                <hint-button
                    tip-color="grey"
                    color="transparent"
                    tip-text="Server"
                    plain
                    block
                    @click="() => createNode(nodeCreatorType.SERVER)"
                    :disabled="isSimulationRunning"
                >
                    <v-img
                        :src="require('@/assets/queue-components/server.png')"
                        width="30px"
                        :draggable="true"
                        @dragstart="(event) => this.dragStart(event, nodeCreatorType.SERVER)"
                    ></v-img>
                </hint-button>
            </v-list-item>
            <v-list-item class="pa-2">
                <hint-button
                    tip-color="grey"
                    color="transparent"
                    tip-text="Sink"
                    plain
                    block
                    @click="() => createNode(nodeCreatorType.SINK)"
                    :disabled="isSimulationRunning"
                >
                    <v-img
                        :src="require('@/assets/queue-components/sink.png')"
                        width="30px"
                        :draggable="true"
                        @dragstart="(event) => this.dragStart(event, nodeCreatorType.SINK)"
                    ></v-img>
                </hint-button>
            </v-list-item>
            <v-list-item class="pa-2">
                <hint-button
                    tip-color="grey"
                    color="transparent"
                    tip-text="Label"
                    plain
                    block
                    :disabled="isSimulationRunning"
                    @click="() => createNode(nodeCreatorType.LABEL)"
                >
                    <v-img :src="require('@/assets/queue-components/label.png')" width="30px"
                           draggable
                           @dragstart="(event) => this.dragStart(event, nodeCreatorType.LABEL)"></v-img>
                </hint-button>
            </v-list-item>
            <v-list-item class="pa-2">
                <hint-button
                    tip-color="grey"
                    color="transparent"
                    tip-text="Delete"
                    :plain="!isDeletingModeEnabled"
                    class-style="elevation-0"
                    block
                    @click="() => eraseMode()"
                    :disabled="isSimulationRunning"
                >
                    <v-img :src="require('@/assets/queue-components/eraser.png')" width="20px"></v-img>
                </hint-button>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TooltipButton from "@/components/shared/components/buttons/TooltipButton.vue";
import HintButton from "@/components/shared/components/buttons/HintButton.vue";
import { NodeCreatorType } from "modeler/nodes/domain/node-creator";
import { BoardMode } from "../../../../../modeler/src/boards/domain/board-mode";
import { builder, simulation } from "@/components/simulation/store/namespaces";
import { BuilderMethods } from "@/components/simulation/store/builder/builder.methods";
import { DropItemEvent } from "@/components/shared/domain/drop-item-event";
import { SimulationMethods } from "@/components/simulation/store/simulation/simulation.methods";
import { SimulationStatus } from "@/components/simulation/domain/simulation-status";

@Component({
    name: "items-bar",
    components: { HintButton, TooltipButton },
})
export default class ItemsBar extends Vue {
    get nodeCreatorType(): typeof NodeCreatorType {
        return NodeCreatorType;
    }

    createNode(type: NodeCreatorType) {
        this.createNodeRequest({
            node: type,
        });
    }

    createPath() {
        this.changeModeRequest(BoardMode.CREATING_PATH_MODE);
    }

    eraseMode() {
        this.changeModeRequest(BoardMode.ERASING_MODE);
    }

    dragStart(event: DragEvent, type: NodeCreatorType) {
        event.dataTransfer!.setData("nodeCreatorType", type);
    }

    get isDeletingModeEnabled() {
        return this.getBoardMode === BoardMode.ERASING_MODE;
    }

    get isCreatingPathModeEnabled() {
        return this.getBoardMode === BoardMode.CREATING_PATH_MODE;
    }

    get isSimulationRunning(): boolean {
        return this.status === SimulationStatus.RUNNING || this.status === SimulationStatus.PAUSED;
    }

    @builder.Action(BuilderMethods.ACTIONS.CREATE_NODE)
    createNodeRequest!: (params: DropItemEvent) => void;

    @builder.Action(BuilderMethods.ACTIONS.CHANGE_MODE)
    changeModeRequest!: (mode: BoardMode) => void;

    @builder.Getter(BuilderMethods.GETTERS.GET_BOARD_MODE)
    getBoardMode!: BoardMode;

    @simulation.Getter(SimulationMethods.GETTERS.GET_SIMULATOR_STATUS)
    status!: SimulationStatus;
}
</script>

<style scoped>
.running-drawer {
    opacity: 0.3;
}
</style>
