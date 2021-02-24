<template>
  <v-main class="full-size">
    <div class="full-size container pic-container">
      <img class="alarm-pic" src="~@/assets/img/404.png" alt="404" />
    </div>
  </v-main>
</template>

<script></script>
<style lang="less" scoped>
@import "~@/assets/css/common";
.pic-container:extend(.flex-layout) {
  justify-content: center;
}
.alarm-pic {
  width: 58%;
  height: 65%;
}
</style>
