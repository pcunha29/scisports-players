<style lang="scss" scoped>
.info-wrapper p {
  margin-bottom: 0;
}
</style>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(player, index) in players"
        :key="index"
        cols="4"
        class="d-flex"
      >
        <v-card
          class="mb-10 transparent"
          width="100%"
          max-width="330px"
          min-height="150px"
          elevation="3"
        >
          <v-card-title>
            <span class="headline">{{ player.name }}</span>
            <v-icon class="ml-2">mdi-account</v-icon>
          </v-card-title>
          <v-card-text class="d-flex flex-column info-wrapper">
            <p>
              <strong>Nationality: </strong>
              <country-flag
                :country="
                  player.nationality === 'ENG' ? 'gb-eng' : player.nationality
                "
              />
            </p>
            <p><strong>Position: </strong>{{ player.position }}</p>
            <p><strong>Age: </strong>{{ player.age }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import CountryFlag from "vue-country-flag";
import { PlayersInfo } from "../models";

@Component({
  components: { CountryFlag },
})
export default class SelectPlayer extends Vue {
  @Prop() selectedPlayers!: string[];
  @Prop() playersInfo!: PlayersInfo[];

  public players: PlayersInfo[] = [];

  @Watch("selectedPlayers")
  filterPlayers() {
    this.players = this.playersInfo.filter(
      (player) => this.selectedPlayers.indexOf(player.name) !== -1
    );
  }
}
</script>
