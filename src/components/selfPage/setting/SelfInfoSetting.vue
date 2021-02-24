<template>
  <div class="container full-size">
    <div class="background-img">
      <img src="http://kodo.wendau.com/%E9%A2%9C%E8%89%B23.jpg" alt="back" />
      <v-btn text class="edit-background">
        <v-icon large color="white">mdi-camera</v-icon>
      </v-btn>
    </div>
    <div class="user-container">
      <div class="user-avatar">
        <v-img
          src="http://kodo.wendau.com/%E7%9B%B8%E4%BF%A1%E6%9C%AA%E6%9D%A5.jpg"
          :aspect-ratio="1"
        ></v-img>
        <v-btn text fab class="edit-avatar">
          <v-icon large color="white">mdi-camera</v-icon>
        </v-btn>
      </div>
      <div class="user-info">
        <div class="info-row" v-for="(info, index) in infos" :key="index">
          <div class="info-container">
            <div style="width: 20%;margin-right: 5%">
              <strong>{{ info.title }}</strong>
            </div>
            <div class="info-show" v-if="!info.edit">
              {{ info.placeholder }}
              <v-btn text fab small @click="info.edit = true">
                <v-icon>mdi-pen</v-icon>
              </v-btn>
            </div>
            <div class="info-show" v-if="info.edit">
              <div style="width: 70%">
                <v-text-field
                  outlined
                  hide-details
                  dense
                  :value="info.placeholder"
                  :placeholder="info.placeholder"
                ></v-text-field>
              </div>
              <v-btn color="primary" depressed @click="info.edit = false">
                确定
              </v-btn>
              <v-btn depressed @click="info.edit = false">
                取消
              </v-btn>
            </div>
          </div>
          <v-divider></v-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelfInfoSetting",
  data() {
    return {
      infos: {
        nickName: {
          title: "昵称",
          placeholder: "siegelion",
          edit: false
        },
        sex: {
          title: "性别",
          placeholder: "男",
          edit: true
        },
        describe: {
          title: "一句话描述自己",
          placeholder: "bababababa",
          edit: false
        }
      }
    };
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common";
.container {
  .background-img {
    position: relative;
    width: 100%;
    height: 30%;
    img {
      width: 100%;
      height: 100%;
    }
    .edit-background {
      position: absolute;
      top: 10%;
      right: 1%;
    }
  }
  .user-container {
    position: relative;
    width: 100%;
    height: 70%;
    .user-avatar {
      position: absolute;
      border: white solid 3px;
      width: 22%;
      height: 50%;
      top: -20%;
      margin-left: 5%;
      .edit-avatar {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .user-info:extend(.flex-layout) {
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
      padding-left: 30%;
      padding-top: 3%;
      .info-row {
        width: 100%;
        height: 20%;
        .info-container:extend(.flex-layout) {
          justify-content: flex-start;
          width: 100%;
          height: 99%;
          .info-show:extend(.flex-layout) {
            width: 75%;
          }
        }
      }
    }
  }
}
</style>
