<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(position, i) in playersPositions" :key="i" cols="3">
        <v-checkbox
          class="ma-2"
          v-model="selectedPosition"
          :label="position"
          :value="position"
          :onchange="OnSelectedPosition(selectedPosition)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  components: {},
})
export default class SelectPlayerPosition extends Vue {
  @Prop() playersPositions!: string[];

  public selectedPosition: string[] = [];

  @Emit()
  public OnSelectedPosition(selectedPosition: string) {
    return selectedPosition;
  }
}
</script>
