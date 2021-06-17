<template>
  <v-navigation-drawer app mobile-breakpoint="0" clipped width="80px">
    <v-list dense class="my-2">
      <v-list-item>
        <tooltip-button tip-color="grey" color="grey" title="Play" outlined>
          <v-icon color="grey">
            mdi-play
          </v-icon>
        </tooltip-button>
      </v-list-item>
      <v-list-item>
        <tooltip-button tip-color="grey" color="grey" title="Stop" outlined>
          <v-icon color="grey">
            mdi-stop
          </v-icon>
        </tooltip-button>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list dense class="my-2">
      <v-list-item>
        <tooltip-button tip-color="grey" color="grey" title="Router">
          <v-avatar size="30">
            <v-img :src="require('@/assets/queue-components/router.png')"></v-img>
          </v-avatar>
        </tooltip-button>
      </v-list-item>
      <v-list-item>
        <tooltip-button tip-color="grey" color="grey" title="Server">
            <v-img :src="require('@/assets/queue-components/server.png')" width="35px" height="25px" ></v-img>
        </tooltip-button>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import TooltipButton from "@/components/shared/components/buttons/TooltipButton.vue";

@Component({
  name: 'nav-bar',
  components: {TooltipButton},
})
export default class NavBar extends Vue {

}
</script>

<style scoped>

</style>
