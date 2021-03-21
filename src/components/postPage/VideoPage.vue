<template>
  <div id="video-player"></div>
</template>

<script>
import DPlayer from "dplayer";
export default {
  name: "VideoPage",
  props: {
    contentData: {
      type: Object,
      required: true
    }
  },
  watch: {
    contentData: {
      handler() {
        new DPlayer({
          container: document.getElementById("video-player"),
          logo: "/favicon.ico",
          video: {
            url: this.contentData.videoUrl
          }
        });
      },
      deep: true
    }
  }
};
</script>

<style scoped></style>
