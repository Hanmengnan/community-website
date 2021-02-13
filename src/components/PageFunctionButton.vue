<template>
  <v-speed-dial v-model="fab" open-on-hover>
    <template v-slot:activator>
      <v-btn color="blue darken-2" dark fab>
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>
    <v-btn fab small dark color="green" v-on:click="refreshPage()">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-btn fab small dark color="indigo" href="#appbar">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: "PageFunctionButton",
  data() {
    return {
      fab: false
    };
  },
  methods: {
    refreshPage: function() {
      document.location.reload(true);
    }
  }
};
</script>

<style scoped></style>
