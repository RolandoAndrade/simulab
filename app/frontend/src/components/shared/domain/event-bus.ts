import Vue from "vue";

class EventBus extends Vue {
    public readonly CREATE_NODE = "CREATE_NODE"
}

export const eventBus = new EventBus();
