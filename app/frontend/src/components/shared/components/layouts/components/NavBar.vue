<template>
  <v-navigation-drawer app mobile-breakpoint="0" clipped width="85px">

    <v-list dense class="my-2">
      <v-list-item>
        <hint-button tip-color="grey" color="transparent" tip-text="Source" small plain>
          <v-img :src="require('@/assets/queue-components/source.png')" width="30px" height="20px" ></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item>
        <hint-button tip-color="grey" color="transparent" tip-text="Server" small plain>
          <v-img :src="require('@/assets/queue-components/server.png')" width="30px" height="20px" ></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item>
        <hint-button tip-color="grey" color="transparent" tip-text="Sink" small plain>
          <v-img :src="require('@/assets/queue-components/sink.png')" width="30px" height="20px" ></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item>
        <hint-button tip-color="grey" color="transparent" tip-text="Separator" small plain>
          <v-img :src="require('@/assets/queue-components/separator.png')" width="30px" height="20px" ></v-img>
        </hint-button>
      </v-list-item>
      <v-list-item>
        <hint-button tip-color="grey" color="transparent" tip-text="Combinator" small plain>
          <v-img :src="require('@/assets/queue-components/combinator.png')" width="30px" height="20px" ></v-img>
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

@Component({
  name: 'nav-bar',
  components: {HintButton, TooltipButton},
})
export default class NavBar extends Vue {

}
</script>

<style scoped>

</style>
