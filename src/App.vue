<style lang="scss" scoped>
@import "./scss/variables.scss";
.main {
  background: $color_primary_op10;
}
.transparent {
  background: transparent;
}
</style>

<template>
  <v-app>
    <top-banner />

    <v-main class="main">
      <h1 class="text-center my-10">
        Lets choose one player from a large available list
      </h1>

      <v-container>
        <v-stepper v-model="step" vertical class="transparent">
          <v-stepper-step :complete="step > 1" step="1">
            Select a position or multiple positions
          </v-stepper-step>
          <v-stepper-content step="1">
            <select-player-position
              :playersPositions="playersPositions"
              @on-selected-position="OnSelectedPosition"
            />
            <v-btn color="primary" @click="step = 2"> Continue </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2">
            Select the desired players
          </v-stepper-step>

          <v-stepper-content step="2">
            <matching-players
              :playersInfo="playersInfo"
              :selectedPosition="selectedPosition"
              @on-selected-players="onSelectedPlayers"
            />
            <v-btn color="primary" @click="step = 3"> Continue </v-btn>
            <v-btn text @click="step = 1"> Back </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 3" step="3">
            Finally, select your favorite Player
          </v-stepper-step>

          <v-stepper-content step="3">
            <select-player
              :playersInfo="playersInfo"
              :selectedPlayers="selectedPlayers"
            />
            <v-btn color="primary" @click="step = 4"> Continue </v-btn>
            <v-btn text @click="step = 3"> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

import TopBanner from "./layout/TopBanner.vue";
import SelectPlayerPosition from "./components/SelectPlayerPosition.vue";
import MatchingPlayers from "./components/MatchingPlayers.vue";
import SelectPlayer from "./components/SelectPlayer.vue";
import { PlayersInfo } from "./models";

@Component({
  components: {
    TopBanner,
    SelectPlayerPosition,
    MatchingPlayers,
    SelectPlayer,
  },
})
export default class App extends Vue {
  public playersInfo: PlayersInfo[] = [];
  public playersPositions: string[] = [];

  public selectedPosition: string[] = [];
  public selectedPlayers: string[] = [];
  public step = 1;

  async beforeMount() {
    await axios
      .get(
        "https://raw.githubusercontent.com/vgshenoy/football-players/master/players.json"
      )
      .then((response) => {
        this.playersInfo = response.data;
      });

    const positions = this.playersInfo.map((player: { position: string }) => {
      return player.position;
    });
    this.playersPositions = [...new Set(positions)];
  }

  public OnSelectedPosition(selectedPosition: string[]) {
    return (this.selectedPosition = selectedPosition);
  }

  public onSelectedPlayers(selectedPlayers: string[]) {
    return (this.selectedPlayers = selectedPlayers);
  }
}
</script>
