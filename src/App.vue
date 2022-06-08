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
            <v-btn text @click="step = 1"> Go Back </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 3" step="3">
            Finally, select your favorite Player
          </v-stepper-step>

          <v-stepper-content step="3">
            <select-player
              :playersInfo="playersInfo"
              :selectedPlayers="selectedPlayers"
            />
          </v-stepper-content>
        </v-stepper>
        <p></p>

        <div>
          <strong class="mr-5 mt-2">Previous Player selected:</strong>
          <v-tooltip bottom v-if="previousPlayer">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                <span>{{ previousPlayer.name }}</span>
              </v-btn>
            </template>
            <p>
              <strong>Nationality: </strong>
              <country-flag
                :country="
                  previousPlayer.nationality === 'ENG'
                    ? 'gb-eng'
                    : previousPlayer.nationality
                "
              />
            </p>
            <p>
              <strong>Age: </strong>

              <span>{{ previousPlayer.age }}</span>
            </p>
            <p>
              <strong>Position: </strong>
              <span>{{ previousPlayer.position }}</span>
            </p>
          </v-tooltip>
          <span v-else>Please choose a player</span>
        </div>
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
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import CountryFlag from "vue-country-flag";

@Component({
  components: {
    TopBanner,
    SelectPlayerPosition,
    MatchingPlayers,
    SelectPlayer,
    CountryFlag,
  },
})
export default class App extends Vue {
  public playersInfo: PlayersInfo[] = [];
  public playersPositions: string[] = [];

  public previousPlayer: string[] = [];
  public selectedPosition: string[] = [];
  public selectedPlayers: string[] = [];
  public step = 1;

  getPreviousSelectedPlayer() {
    this.previousPlayer = this.$cookies.get("selectedPlayer");
    console.log(this.previousPlayer);
  }

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

    this.getPreviousSelectedPlayer();
  }

  public OnSelectedPosition(selectedPosition: string[]) {
    return (this.selectedPosition = selectedPosition);
  }

  public onSelectedPlayers(selectedPlayers: string[]) {
    return (this.selectedPlayers = selectedPlayers);
  }
}
</script>
