<template>
  <div>
    <v-app-bar color="indigo" id="appbar">
      <AppBar></AppBar>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
      <PageFunctionButton class="hover-button"></PageFunctionButton>
    </v-main>
  </div>
</template>

<script>
// @ is an alias to /src
import AppBar from "@/components/AppBar";
import PageFunctionButton from "@/components/PageFunctionButton";

export default {
  name: "Home",
  components: {
    AppBar,
    PageFunctionButton
  }
};
</script>

<style lang="less" scoped>
.hover-button {
  position: fixed;
  bottom: 15%;
  right: 2%;
}
</style>
