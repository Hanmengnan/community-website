<template>
  <div class="container">
    <slot></slot>
    <div class="row other-row">
      <v-icon color="green" v-if="state1">mdi-check-circle</v-icon>
      <v-icon color="red" v-else>mdi-alert-circle</v-icon>
      <div>领取数字账号</div>
      <div>唯一标识您身份的ID</div>
      <v-btn depressed rounded color="primary">点击复制</v-btn>
    </div>
    <v-divider></v-divider>

    <div class="row other-row">
      <v-icon color="green" v-if="state2">mdi-check-circle</v-icon>
      <v-icon color="red" v-else>mdi-alert-circle</v-icon>
      <div>绑定微信</div>
      <div>
        <v-btn depressed small fab color="success">
          <v-icon>mdi-wechat</v-icon>
        </v-btn>
      </div>
      <v-btn depressed rounded color="primary">未绑定</v-btn>
    </div>
    <v-divider></v-divider>

    <div class="row">
      <v-icon color="green" v-if="state3">mdi-check-circle</v-icon>
      <v-icon color="red" v-else>mdi-alert-circle</v-icon>
      <div>设置登录密码</div>
      <div>
        <base-input title="请输入密码" icon="" hide-details="true"></base-input>
      </div>
      <v-btn depressed rounded color="primary">确认修改</v-btn>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "SecuritySetting",
  components: { BaseInput },
  data() {
    return {
      state1: false,
      state2: false,
      state3: true
    };
  }
};
</script>

<style lang="less" scoped>
.container {
  .row {
    display: grid;
    grid-template-columns: 1fr 5fr 5fr 2fr;
    align-items: center;
    margin: 10px;
  }
  .other-row {
    margin: 16px 10px 16px 10px;
  }
}
</style>
