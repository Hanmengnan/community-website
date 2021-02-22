<template>
  <div class="full-size page-container">
    <v-card class="login-card" elevation="10">
      <div class="banner-container">
        <v-card class="banner-card" color="primary">
          <div class="title">
            <slot name="title"></slot>
          </div>
          <slot name="banner"></slot>
        </v-card>
      </div>
      <div class="input-container">
        <div class="each-input" v-for="(item, index) in items" :key="index">
          <BaseInput
            v-on:change="item.value = $event"
            :title="item.title"
            :icon="item.icon"
          ></BaseInput>
        </div>
      </div>
      <div class="button-container">
        <v-btn depressed tile width="50%" v-on:click="buttons[0].action">
          {{ buttons[0].title }}
        </v-btn>
        <v-btn
          depressed
          tile
          color="primary"
          width="50%"
          v-on:click="buttons[1].action"
        >
          {{ buttons[1].title }}
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "Login&Register",
  props: {
    items: {
      type: Object,
      required: true
    },
    buttons: {
      type: Array,
      required: false
    }
  },
  components: {
    BaseInput
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common";
@import "~@/assets/css/varibale";

.page-container:extend(.flex-layout) {
  flex-direction: column;
  justify-content: center;

  .login-card:extend(.flex-layout) {
    flex-direction: column;
    width: 25%;
    height: 50%;

    .banner-container {
      display: block;
      width: 100%;
      height: 10%;

      .banner-card:extend(.flex-layout) {
        position: absolute;
        flex-direction: column;
        justify-content: center;
        width: 90%;
        height: 40%;
        top: -30%;
        left: 5%;

        .title {
          margin-bottom: 10%;
          color: @default-font-color;
          font-size: @default-font*1.5;
        }
      }
    }

    .input-container:extend(.flex-layout) {
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      height: 65%;
      .each-input {
        width: 90%;
      }
    }

    .button-container:extend(.flex-layout) {
      width: 90%;
      height: 15%;
    }
  }
}
</style>
