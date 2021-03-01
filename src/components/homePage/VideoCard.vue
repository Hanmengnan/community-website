<template>
  <div class="cover-container full-size">
    <img class="video-cover" :src="src" alt="视频封面" />
    <img
      class="play-button"
      src="http://kodo.wendau.com/%E4%B8%8B%E8%BD%BD.png"
      alt="paly"
    />
  </div>
</template>

<script>
export default {
  name: "VideoCard",
  data() {
    return {
      title: "第一个视频",
      src:
        "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/808a976601ca5c999a07494e3b57086c",
      tags: [
        {
          tagName: "逼逼1111"
        },
        {
          tagName: "逼逼2222"
        },
        {
          tagName: "逼逼"
        }
      ],
      classify: "第一个视频",
      author: "siegelion",
      createTime: ""
    };
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common";
.cover-container:extend(.flex-layout) {
  justify-content: center;
  .video-cover {
    max-height: 99%;
    max-width: 60%;
  }
  .play-button {
    position: absolute;
    width: 50px;
    height: 50px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
