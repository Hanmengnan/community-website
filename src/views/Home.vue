<template>
  <div class="full-size">
    <v-app-bar color="primary" id="appbar">
      <AppBar></AppBar>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
      <PageFunctionButton class="hover-button"></PageFunctionButton>
    </v-main>
    <v-footer color="primary" padless>
      <div class="footer">
        <div
          style="display: flex; justify-content: center; align-items: center; width: 25%"
        >
          <div>Design By</div>
          <div class="master-container">
            <v-chip link color="primary" href="https://www.wendau.com">
              Sigelion
            </v-chip>
            <div>&</div>
            <v-chip color="primary" href="http://miracleremake.com/"
              >Miracle
            </v-chip>
          </div>
        </div>
      </div>
    </v-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import AppBar from "@/components/base/AppBar";
import PageFunctionButton from "@/components/base/PageFunctionButton";

export default {
  name: "Home",
  components: {
    AppBar,
    PageFunctionButton
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common";
.hover-button {
  position: fixed;
  bottom: 15%;
  right: 2%;
}
.footer {
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  color: white;
  .master-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
