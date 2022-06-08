<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6" class="my-3">
        <v-select
          v-model="selectedPlayers"
          :items="playersNames"
          :menu-props="{ maxHeight: '300' }"
          :onchange="onSelectedPlayers(selectedPlayers)"
          label="Pick your player(s)"
          multiple
          chips
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { PlayersInfo } from "../models";

@Component({
  components: {},
})
export default class MatchingPlayers extends Vue {
  @Prop() selectedPosition!: string[];
  @Prop() playersInfo!: PlayersInfo[];

  public playersFiltered: PlayersInfo[] = [];
  public playersNames: string[] = [];
  public selectedPlayers: string[] = [];

  @Watch("selectedPosition")
  filterPlayers() {
    this.playersFiltered = this.playersInfo.filter(
      (player) => this.selectedPosition.indexOf(player.position) !== -1
    );
    this.playersNames = this.playersFiltered.map((player) => player.name);
  }

  @Emit()
  public onSelectedPlayers(selectedPlayers: string) {
    return selectedPlayers;
  }
}
</script>
