import Vue from "vue";

class EventBus extends Vue {
    public readonly CREATE_NODE = "CREATE_NODE"
    public readonly CHANGE_MODE = "CHANGE_MODE"
}

export const eventBus = new EventBus();
