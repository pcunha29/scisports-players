<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="SCI Sports Logo"
        class="shrink"
        contain
        src="https://www.hypesportsinnovation.com/wp-content/uploads/LG_SciSports-Logo-400x220-1.png"
        transition="scale-transition"
        width="160"
      />
      <span>FE Technical Assignment </span>
    </div>

    <v-spacer></v-spacer>

    <v-btn
      href="https://github.com/pcunha29/scisports-players"
      target="_blank"
      text
    >
      <span class="mr-2">Check repository</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class TopBanner extends Vue {}
</script>
